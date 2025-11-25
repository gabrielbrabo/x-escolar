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
    const [positionAtEducationDepartment, setPositionAtEducationDepartment] = useState('')
    const [Clss, setClss] = useState([])
    const [busca, setBusca] = useState("")
    const [filter, setFilter] = useState()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school")
            const positionAtEducationDepartment = localStorage.getItem("positionAtEducationDepartment")
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
            console.log("response", response.data.data)
            setStudent(response.data.data.id_student)
            setClss(Year)
            setPositionAtEducationDepartment(positionAtEducationDepartment)
            setLoading(false);
        })()
    }, [currentYear])
    //console.log("clss",Clss)
    const normalizeString = (str) => {
        return str
            .normalize("NFD") // Separa caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/[^\w\s]/gi, "") // Remove pontuações
            .toUpperCase(); // Converte para maiúsculas
    };

    student.sort((a, b) => normalizeString(a.name).localeCompare(normalizeString(b.name)));

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
        //sessionStorage.removeItem('StudentInformation')
        // sessionStorage.setItem("StudentInformation", student._id)
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
                            <label>Filtra por Turma </label>
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
                        {!positionAtEducationDepartment
                            &&
                            <DivNewEmp>
                                <Btt02 onClick={NewStudent}>Novo Aluno</Btt02>
                            </DivNewEmp>
                        }
                        <p>Total de Alunos: {student.length}</p>

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
                                if (!busca) return val;
                                return normalizeString(val.name).includes(normalizeString(busca));
                            }).sort((a, b) => {
                                // Colocar alunos com status 'ativo' no início, e 'transferido' ou 'inativo' no final
                                if (a.status === "ativo" && b.status !== "ativo") {
                                    return -1; // 'ativo' vem antes
                                } else if (b.status === "ativo" && a.status !== "ativo") {
                                    return 1; // 'ativo' vem depois
                                } else {
                                    return 0; // Mantém a ordem original para os demais status
                                }
                            }).map(student => (
                                <Emp
                                    onClick={() =>
                                        StudentInformation(student)
                                    }
                                    key={student._id}
                                >
                                    <Span style={{ color: "#003e4f" }}>{student.name}</Span>

                                    {/* Verificação do status do aluno */}
                                    {student.status === "ativo" && (
                                        <span style={{ color: "green", marginLeft: "8px", fontWeight: "bold" }}>
                                            {student.status}
                                        </span>
                                    )}
                                    {student.status === "transferido" && (
                                        <span style={{ color: "orange", marginLeft: "8px", fontWeight: "bold" }}>
                                            {student.status}
                                        </span>
                                    )}
                                    {student.status === "inativo" && (
                                        <span style={{ color: "red", marginLeft: "8px", fontWeight: "bold" }}>
                                            {student.status}
                                        </span>
                                    )}
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