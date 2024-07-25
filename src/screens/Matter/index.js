import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetMatter } from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    DivNewEmp,
    DivAddEmp,
    User,
    //FormFilter,
    FormSearch
    // Input
} from './style';

import {
    AreaEmp,
    InputEmp,
    // Select
} from '../../components/Inputs'

import {
    Btt02,
} from '../../components/Buttons';

import LoadingSpinner from '../../components/Loading'

const Matter = () => {

    const navigate = useNavigate()
    //const currentYear = new Date().getFullYear();
    //const [year, setYear] = useState([])
    const [matter, setMatter] = useState([])
    const [busca, setBusca] = useState("")
    const [loading, setLoading] = useState(false);
    //const [filter, setFilter] = useState()

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school")
            //const response = await GetStudent(JSON.parse(idSchool))
            const res = await GetMatter(JSON.parse(idSchool))
            //setStudent(response.data.data)
            setMatter(res.data.data)
            console.log(res)
            setLoading(false);
        })()
    }, [])

    matter.sort(function (a, b) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    })

    const NewMatter = async () => {
        navigate('/new/matter')
    }
    const DeleteMatter = async () => {
        navigate('/delete/matter')
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
                            <label>Buscar Materia</label>
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
                        {/*<FormFilter>
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
                    </FormFilter>*/}
                    </Search>
                    <List>
                        <DivAddEmp>
                            <DivNewEmp>
                                <Btt02 onClick={NewMatter}>Nova Materia</Btt02>
                            </DivNewEmp>
                            <DivNewEmp>
                                <Btt02 onClick={DeleteMatter}>Apagar Materia</Btt02>
                            </DivNewEmp>
                        </DivAddEmp>
                        {
                            matter/*.filter((fil) => {
                        if(!filter){
                            return (fil)
                        }
                        if(fil.year === filter) {
                            return (fil)
                        }
                        return null
                    })*/.filter((val) => {
                                if (!busca) {
                                    return (val)
                                } else if (val.name.includes(busca.toUpperCase())) {
                                    return (val)
                                }
                                return null
                            }).map(matter => (
                                <Emp key={matter._id} >
                                    <Span>{matter.name}</Span>
                                </Emp>
                            ))
                        }
                    </List>
                </>
            }
        </Container>
    )
}

export default Matter