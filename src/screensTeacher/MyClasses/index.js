import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmpInfo } from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    FormFilter,
    FormSearch,
    AreaEmp,
    InputEmp,
    Select,
    ContainerDivs
} from './style';
import LoadingSpinner from '../../components/Loading'

const MyCla$$ = () => {

    const navigate = useNavigate()
    const currentYear = new Date().getFullYear().toString();
    const [Clss, setClss] = useState([])
    const [filter, setFilter] = useState()
    const [busca, setBusca] = useState()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_employee = localStorage.getItem("Id_employee")
            const res = await EmpInfo(JSON.parse(id_employee))
            const clss = res.data.info.find(res => {
                return res
            }).map(res => {
                if (res.id_class.year === currentYear) {
                    return (res)
                } else {
                    return null
                }
            }).filter(res => {
                if (! null) {
                    return (res)
                } else {
                    return null
                }
            })
            setClss(clss)
            setLoading(false);
        })()

    }, [currentYear])

    const MyClassInformation = (clss) => {
        setLoading(true);
        const id_teacher = JSON.parse(localStorage.getItem("Id_employee"))
        if (clss) {
            const map = Clss.map(res => {
                if (res.id_class.serie === clss) {
                    return res.id_class._id
                }
                return null
            }).filter(res => {
                if (! null) {
                    return (res)
                } else {
                    return null
                }
            }).filter((valor, indice, self) => {
                if (self.indexOf(valor) === indice) {
                    return valor
                }
                return null
            })
            sessionStorage.setItem("class-info", map)
            navigate(`/myclassesinfo/${map}/${id_teacher}`)
            console.log("clss", map)
        }
        setLoading(false);
    }

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
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
                            <label>Filtra por Turno: </label>
                            <Select id="position"
                                value={filter}
                                onChange={
                                    (e) => setFilter(e.target.value)
                                }
                            >
                                <option value="">Todos</option>
                                <option value="MATUTINO">MATUTINO</option>
                                <option value="VESPERTINO">VESPERTINO</option>
                                <option value="NOTURNO">NOTURNO</option>
                            </Select>
                        </FormFilter>
                    </Search>
                    <List>
                        {
                            Clss.filter((fil) => {
                                if (!filter) {
                                    return (fil)
                                }
                                if (fil.id_class.shift === filter) {
                                    return (fil)
                                }
                                return null
                            }).filter((val) => {
                                if (!busca) {
                                    return (val)
                                } else if (val.id_class.serie.includes(busca.toUpperCase())) {
                                    return (val)
                                }
                                return null
                            }).map(c => {
                                return c.id_class.serie
                            }).filter((valor, indice, self) => {
                                return self.indexOf(valor) === indice
                            }).map(clss => (
                                <Emp
                                    onClick={() =>
                                        MyClassInformation(clss)
                                    }
                                    key={clss}
                                >
                                    <Span>{clss}</Span>
                                </Emp>
                            ))
                        }
                    </List>
                </ContainerDivs>
            }
        </Container>
    )
}

export default MyCla$$