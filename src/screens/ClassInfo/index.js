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
    Btt02
    //FormFilter,
    //FormSearch
    // Input
} from './style';

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
            }).addTeacher.map(res => {
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

    console.log("student", stdt)

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
                                    <Btt02>Editar</Btt02>
                                </DivButtomEdit>
                            </Emp>
                        ))
                    }

                    {
                        stdt.length > 0
                            ?
                            <DivInfo>
                                <TitleInfo>Estudantes:</TitleInfo>
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
                                            <Span>{stdt.name}</Span>
                                        ))
                                    }
                                </Matter>
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

                    {
                        employee.length > 0
                            ?
                            <DivInfo>
                                <TitleInfo>Professores:</TitleInfo>
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
                                            <div key={employee._id}>
                                                <Span>{employee.name_matter}: {employee.name_teacher}</Span>
                                            </div>
                                        ))
                                    }
                                </Matter>
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
                </ContainerDivs>
            }
        </Container>
    )
}

export default Cla$$Info