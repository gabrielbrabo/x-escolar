import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { clssInfo } from '../../Api'

import {
    Container,
    //List,
    Emp,
    Matter,
    DivInfo,
    Span,
    //Search,
    DivAddEmp,
    AddEmp,
    ContainerDivs,
    TitleInfo,
    DivButtomEdit,
    ProfileInfo,
    Btt02,
    //DivShowMatter,
    //ButtonCancel,
    //Btt01
} from './style';

//import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";

import LoadingSpinner from '../../components/Loading'

const Cla$$Info = () => {

    const navigate = useNavigate()
    const currentYear = new Date().getFullYear().toString();
    //const [year, setYear] = useState([])
    const [clss, setClss] = useState([])
    const [employee, setEmployee] = useState([])
    //const [matter, setMatter] = useState("")
    const [stdt, setStdt] = useState([])
    const [loading, setLoading] = useState(false);
    //const [showStudent, setShowStudent] = useState(false);
    //const [showTeacher, setShowTeacher] = useState(false);
    const { id_class } = useParams();
    console.log(currentYear)

    useEffect(() => {
        (async () => {
            setLoading(true);
            console.log('useParamsClass', id_class)
            //const id_clas = sessionStorage.getItem("ClassInformation")
            const res = await clssInfo(id_class)
            setClss(res.data.data)
            console.log(res.data.data)
            const student = res.data.data.find(res => {
                return res
            }).id_student.map(res => {
                if (res) {
                    return (res)
                } else {
                    return null
                }
            })
            const employee = res.data.data.find(res => {
                return res
            }).id_employee.map(res => {
                if (res) {
                    return (res)
                } else {
                    return (null)
                }
            })
            /*const matter = res.data.data.find( res => {
                return res
            }).id_matter.map( res => {
                if (res) {
                    return (res.name)   
                } else {
                    return (null)
                }
            })*/

            setEmployee(employee)
            setStdt(student)
            //setMatter(matter)
            console.log("id_matter", employee)
            //console.log("matter", matter)
            setLoading(false);
        })()

    }, [id_class])

    const addStudent = async () => {
        navigate('/add/student')
    }

    const addTeacher = async () => {
        navigate(`/add/teacher/${id_class}`)
    }
    const RemoveTeacher = async () => {
        navigate('/remove/teacher')
    }
    const RemoveStudent = async () => {
        navigate('/remove/student')
    }

    const Edit = async () => {
        navigate('/edit-class')
    }
    
    const handleEmployee = async ( employee ) => {
        sessionStorage.setItem("EmployeeInformation", employee._id)
        navigate(`/employee/info/${employee._id}`)
    }
    
    const StudentInformation = async (stdt) => {
        setLoading(true);
        navigate(`/student/info/${stdt._id}`)
        setLoading(false);
    }
    
    console.log("student", stdt)
    console.log("employee", employee)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    {
                        clss.map(clss => (
                            <Emp key={clss._id} >
                                <ProfileInfo>
                                    <Span>Serie: {clss.serie}</Span>
                                    <Span>Nivel: {clss.level}</Span>
                                    <Span>Turno: {clss.shift}</Span>
                                    <Span>Numero da Sala: {clss.classroom_number}</Span>
                                </ProfileInfo>
                                <DivButtomEdit>
                                    <Btt02 onClick={Edit}>Editar</Btt02>
                                </DivButtomEdit>
                            </Emp>
                        ))
                    }

                    {
                        employee.length > 0
                            ?
                            <DivInfo>
                                <TitleInfo>Professores:</TitleInfo>
                                {/*!showTeacher &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowTeacher(true) }}>Ver Professores <TiArrowDownThick fontSize={'17px'} /></Btt02>
                                    </DivShowMatter>
                                    */
                                }
                                {
                                    <>
                                        <DivAddEmp>
                                            <AddEmp>
                                                <Btt02 onClick={addTeacher}>Add Prefessor</Btt02>
                                            </AddEmp>
                                            <AddEmp>
                                                <Btt02 onClick={RemoveTeacher}>Remover</Btt02>
                                            </AddEmp>
                                        </DivAddEmp>
                                        <Matter>

                                            {
                                                employee.map(employee => (
                                                    <div onClick={ () => handleEmployee(employee) } key={employee._id}>
                                                        <Span>{employee.name}</Span>
                                                    </div>
                                                ))
                                            }
                                        </Matter>
                                        {
                                            /*<DivShowMatter>
                                            <Btt02 onClick={() => { setShowTeacher(false) }}>Fecha<TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>
                                        */
                                        }
                                    </>
                                }
                            </DivInfo>
                            :
                            <DivInfo>
                                <TitleInfo>Professores:</TitleInfo>
                                <DivAddEmp>
                                    <AddEmp>
                                        <Btt02 onClick={addTeacher}>Add Prefessor</Btt02>
                                    </AddEmp>
                                </DivAddEmp>
                                <Matter>
                                    <>Não há nenhum Professor</>
                                </Matter>
                            </DivInfo>
                    }

{
                        stdt.length > 0
                            ?
                            <DivInfo>
                                <TitleInfo>Estudantes:</TitleInfo>
                                {/*!showStudent &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowStudent(true) }}>Ver Alunos <TiArrowDownThick fontSize={'17px'} /></Btt02>
                                    </DivShowMatter>
                                    */
                                }
                                {
                                    <>
                                        <DivAddEmp>
                                            <AddEmp>
                                                <Btt02 onClick={addStudent}>Add Aluno</Btt02>
                                            </AddEmp>
                                            <AddEmp>
                                                <Btt02 onClick={RemoveStudent}>Remover</Btt02>
                                            </AddEmp>
                                        </DivAddEmp>
                                        <Matter>
                                            {
                                                stdt.map(stdt => (
                                                    <Span onClick={() => StudentInformation(stdt)}>{stdt.name}</Span>
                                                ))
                                            }
                                        </Matter>
                                        {
                                            /*<DivShowMatter>
                                            <Btt02 onClick={() => { setShowStudent(false) }}>Fecha<TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>
                                        */
                                        }
                                    </>
                                }
                            </DivInfo>
                            :
                            <DivInfo>
                                <TitleInfo>Estudantes:</TitleInfo>
                                <DivAddEmp>
                                    <AddEmp>
                                        <Btt02 onClick={addStudent}>Add Aluno</Btt02>
                                    </AddEmp>
                                </DivAddEmp>
                                <Matter>
                                    <>Não há nenhum estudante</>
                                </Matter>
                            </DivInfo>
                    }

                    {/* <ButtonCancel>
                        <Btt01 >Remover Turma</Btt01>
                    </ButtonCancel>*/}
                </ContainerDivs>
            }
        </Container>
    )
}

export default Cla$$Info