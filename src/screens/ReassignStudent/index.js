import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clssInfo, GetClass, ReassignStudent } from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    FormSearch,
    //Add,
    Btt01,
    AreaEmp,
    InputEmp,
    //DivButtonAdd,
    //Div,
    Btt02,
    ButtonCancel,
    //ConfirmContainer,
    //ConfirmContent,
    ConfirmTitle,
    //ConfirmButtonGroup,
    //ConfirmButton,
    Overlay,
    ModalContent,
    ButtonGroup,
    Button,
} from './style';

import LoadingSpinner from '../../components/Loading'

const RemoveStudent = () => {

    const navigate = useNavigate()
    //const currentYear = new Date().getFullYear();
    const [student, setStudent] = useState([])
    const [/*serie*/, setSerie] = useState("")
    const [busca, setBusca] = useState("")

    const [Clss, setClss] = useState([]);
    const [NewClass, setNewClass] = useState([]);
    const [Name_Class, setName_Class] = useState();
    //const [name_teacher, setName_Teacher] = useState("")
    const [name_student, setName_Student] = useState("")
    const [ReassignStdt, setReassignStdt] = useState("")
    const [id_class, setId_class] = useState("")
    const [loading, setLoading] = useState(false);

    //const [id_matter, setId_matter] = useState("")
    //const [addTeacher, setId_addTeacher] = useState("")

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school");
            //const idClassTransfer = sessionStorage.getItem("idClassTransfer");
            const resClass = await GetClass(JSON.parse(idSchool));
            setClss(resClass.data.data);

            const id = sessionStorage.getItem("ClassInformation")
            setSerie(sessionStorage.getItem("serieClass"))
            const res = await clssInfo(id)
            //setStudent(response.data.data)
            //setClss(resClass.data.data)

            const student = res.data.data.find(res => {
                return res
            }).id_student.map(res => {
                if (res) {
                    return (res)
                } else {
                    return null
                }
            })
            /*const studentAdded = student.find( res => {
                return res
            })*/
            setStudent(student)
            setId_class(id)
            // setId_student(studentAdded._id)
            setLoading(false);
        })()

    }, [])

    const normalizeString = (str) => {
        return str
            .normalize("NFD") // Separa caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/[^\w\s]/gi, "") // Remove pontuações
            .toUpperCase(); // Converte para maiúsculas
    };

    student.sort((a, b) => normalizeString(a.name).localeCompare(normalizeString(b.name)));


    /*year.sort(function (a, b) {
        if(a < b) return -1
        if(a > b) return 1
        return 0
    })*/

    /*if(!filter) {
        setFilter(currentYear.toString())
    }*/

    const SignClick = async () => {
        setLoading(true);
        const res = await ReassignStudent(ReassignStdt, id_class, NewClass)
        if (res) {
            alert('Aluno remanejado com sucesso.')
            navigate(-1);
        }
        // console.log("id_student", id_student)
        console.log("id_class", id_class)
        //setName_Student('')
        setLoading(false);
    }

    const Remove = async (student) => {
        setLoading(true);
        setReassignStdt(student._id)
        setName_Student(student.name)
        setLoading(false);
    }

    const remanejed = async (Clss) => {
        setLoading(true);
        setNewClass(Clss._id)
        setName_Class(Clss.serie)
        setLoading(false);
    }

    const Return = async () => {
        setLoading(true);
        window.location.reload()
        navigate(-1);
        setLoading(false);
    }

    const Cancel = async () => {
        navigate(-1);
    }

    console.log("ReassignStdt", ReassignStdt)
    console.log("id_class", id_class)
    console.log("NewClass", NewClass)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    {!ReassignStdt &&
                        <>

                            <Search>
                                <FormSearch>
                                    <label>Buscar</label>
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
                            </Search>
                            <h3>Selecione o aluno a ser remanejado!</h3>
                            <List>

                                {
                                    student.filter((val) => {
                                        if (!busca) {
                                            return (val)
                                        } else if (val.name.includes(busca.toUpperCase())) {
                                            return (val)
                                        }
                                        return null
                                    }).map(student => (
                                        <Emp
                                            onClick={() =>
                                                Remove(student)
                                            }
                                            key={student._id}
                                        >
                                            <Span>{student.name}</Span>
                                            {/* Verificação do status do aluno */}
                                            {student.status === "ativo" && (
                                                <Span style={{ marginLeft: '10px', color: 'green', fontWeight: 'bold' }}>Ativo</Span>
                                            )}
                                            {student.status === "inativo" && (
                                                <Span style={{ marginLeft: '10px', color: 'red', fontWeight: 'bold' }}>Inativo</Span>
                                            )}
                                        </Emp>
                                    ))
                                }
                            </List>
                        </>
                    }
                    {
                        ReassignStdt.length > 0
                        &&
                        <>
                            <Search>
                                <FormSearch>
                                    <label>Buscar Turma</label>
                                    <AreaEmp>
                                        <InputEmp
                                            type="text"
                                            placeholder="Buscar por nome"
                                            value={busca}
                                            onChange={(e) => setBusca(e.target.value)}
                                        />
                                    </AreaEmp>
                                </FormSearch>
                            </Search>
                            <h3>Selecione a nova truma do aluno!</h3>
                            <List>
                                {Clss
                                    .filter((val) => (!busca || val.serie.includes(busca.toUpperCase())))
                                    .filter((val) => val._id !== id_class) // Filtra apenas os diferentes de id_class
                                    .map((Clss) => (
                                        <Emp
                                            onClick={() => remanejed(Clss)}
                                            key={Clss._id}
                                        >
                                            <Span style={{ color: "#003e4f" }}>{Clss.serie}</Span>
                                        </Emp>
                                    ))}
                            </List>
                        </>
                    }
                    {
                        NewClass.length > 0
                        &&
                        <Overlay>
                            <ModalContent>
                                <ConfirmTitle>O aluno {name_student} sera remanejado para a turma {Name_Class}</ConfirmTitle>
                                <ButtonGroup>
                                    <Button onClick={SignClick}>Remanejar</Button>
                                    <Btt01 onClick={Return}>Cancelar</Btt01>
                                </ButtonGroup>
                            </ModalContent>
                        </Overlay>

                    }
                </>
            }
            <ButtonCancel>
                <Btt02 onClick={Cancel}>Cancelar</Btt02>
            </ButtonCancel>
        </Container>
    )
}

export default RemoveStudent