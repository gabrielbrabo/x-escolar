import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetClass } from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    DivNewEmp,
    User,
    FormFilter,
    FormSearch
    // Input
} from './style';

import {
    AreaEmp,
    InputEmp,
    Select
} from '../../components/Inputs'

import {
    Btt02,
} from '../../components/Buttons';

import LoadingSpinner from '../../components/Loading'

const Cla$$ = () => {

    const navigate = useNavigate()
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState([])
    const [Clss, setClss] = useState([])
    const [busca, setBusca] = useState("")
    const [filter, setFilter] = useState()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school")
            const resClass = await GetClass(JSON.parse(idSchool))
            //setStudent(response.data.data)
            setClss(resClass.data.data)

            const Year = resClass.data.data.map(y => {
                return y.year
            }).filter((valor, indice, self) => {
                return self.indexOf(valor) === indice
            })
            setYear(Year)
            console.log(resClass.data.data)
            setLoading(false);
        })()
    }, [])

    Clss.sort(function (a, b) {
        if (a.serie < b.serie) return -1
        if (a.serie > b.serie) return 1
        return 0
    })

    year.sort(function (a, b) {
        if (a < b) return -1
        if (a > b) return 1
        return 0
    })

    if (!filter) {
        setLoading(true);
        setFilter(currentYear.toString())
        setLoading(false);
    }

    const NewClass = async () => {
        navigate('/new/class')
    }

    const classInformation = async (Clss) => {
        setLoading(true);
        sessionStorage.removeItem('ClassInformation')
        sessionStorage.setItem("ClassInformation", Clss._id)
        sessionStorage.removeItem("serieClass")
        sessionStorage.setItem("serieClass", Clss.serie)
        navigate(`/class/info/${Clss._id}`)
        setLoading(false);
    }

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <User>

                    </User>
                    <Search>
                        <FormSearch>
                            <label>Buscar Turma</label>
                            <AreaEmp>
                                <InputEmp
                                    type="text"
                                    placeholder='Buscar por nome'
                                    value={busca}
                                    onChange={
                                        (e) => setBusca(e.target.value)
                                    }
                                />
                            </AreaEmp>
                        </FormSearch>
                        <FormFilter>
                            <label>Filtra por Ano: </label>
                            <Select id="position"
                                value={filter}
                                onChange={
                                    (e) => setFilter(e.target.value)
                                }
                            >
                                <option value=''>{currentYear}</option>
                                {
                                    year.map(c => (
                                        <option value={c}>{c}</option>
                                    ))
                                }
                            </Select>
                        </FormFilter>
                    </Search>
                    <List>
                        <DivNewEmp>
                            <Btt02 onClick={NewClass}>Nova Turma</Btt02>
                        </DivNewEmp>

                        {
                            Clss.filter((fil) => {
                                if (!filter) {
                                    return (fil)
                                }
                                if (fil.year === filter) {
                                    return (fil)
                                }
                                return null
                            }).filter((val) => {
                                if (!busca) {
                                    return (val)
                                } else if (val.serie.includes(busca.toUpperCase())) {
                                    return (val)
                                }
                                return null
                            }).map(Clss => (
                                <Emp
                                    onClick={() =>
                                        classInformation(Clss)
                                    }
                                    key={Clss._id}
                                >
                                    <Span>{Clss.serie}</Span>
                                </Emp>
                            ))
                        }
                    </List>
                </>
            }
        </Container>
    )
}

export default Cla$$