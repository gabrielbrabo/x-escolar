import React, { useState, useEffect } from 'react'
import { GetStudent } from '../../Api'
import { GetClass } from '../../Api'
import { useNavigate } from 'react-router-dom'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    DivNewEmp,
    FormFilter,
    FormSearch,
    AreaEmp,
    InputEmp,
    Btt02,
    Select,
    ContainerDivs
} from './style';

import LoadingSpinner from '../../components/Loading'

const Student = () => {

    const navigate = useNavigate()
    const currentYear = new Date().getFullYear().toString();
    const [student, setStudent] = useState([])
    const [Clss, setClss] = useState([])
    const [busca, setBusca] = useState("")
    const [filter, setFilter] = useState()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school")
            const response = await GetStudent(JSON.parse(idSchool))
            const resClass = await GetClass(JSON.parse(idSchool))
            const Year = resClass.data.data.map(y => {
                if (y.year === currentYear) {
                    return y
                }
                return undefined
            }).filter(y => {
                return y !== undefined;
            })
            setStudent(response.data.data)
            setClss(Year)
            setLoading(false);
        })()
    }, [currentYear])
    //console.log("clss",Clss)
    student.sort(function (a, b) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    })

    if (filter) {
        /*student.map((fil) => {
            const fltr = fil.id_class.map(f => {
                if(f === filter) {
                    return (fil)
                }
                return null
            }).filter (y => {
                return y !== null;
            })
            if(fltr.length > 0) {
                console.log('fil', fltr)
                //setFilClass(fltr)
            }
            return fltr
        })*/
    }

    const NewStudent = async () => {
        navigate('/new/student')
    }

    const StudentInformation = async (student) => {
        setLoading(true);
        navigate(`/student/info/${student._id}`)
        setLoading(false);
    }

    //console.log('res', student)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    <Search>
                        <FormSearch>
                            <label>Buscar Aluno</label>
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
                            <label>Filtra por Turma: </label>
                            <Select id="position"
                                value={filter}
                                onChange={
                                    (e) => setFilter(e.target.value)
                                }
                            >
                                <option value="">Todos</option>
                                {
                                    Clss.map(c => (
                                        <option value={c._id}>{c.serie}</option>
                                    ))
                                }
                            </Select>
                        </FormFilter>
                    </Search>
                    <List>
                        <DivNewEmp>
                            <Btt02 onClick={NewStudent}>Novo Aluno</Btt02>
                        </DivNewEmp>

                        {
                            student.filter((fil) => {
                                if (!filter) {
                                    return (fil)
                                }
                                const filClass = fil.id_class.map((f) => {
                                    if (f === filter) {
                                        return (fil)
                                    }
                                    return null
                                }).filter(y => {
                                    return y !== null;
                                })
                                if (filClass.length > 0) {
                                    return filClass
                                }
                                return null
                            }).filter((val) => {
                                if (!busca) {
                                    return (val)
                                } else if (val.name.includes(busca.toUpperCase())) {
                                    return (val)
                                }
                                return null
                            }).map(student => (
                                <Emp
                                    onClick={() =>
                                        StudentInformation(student)
                                    }
                                    key={student._id}
                                >
                                    <Span>{student.name}</Span>
                                </Emp>
                            ))
                        }
                    </List>
                </ContainerDivs>
            }
        </Container>
    )
}

export default Student