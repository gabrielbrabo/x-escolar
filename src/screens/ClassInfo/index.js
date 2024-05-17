import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {clssInfo} from '../../Api'

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
    User,
    //FormFilter,
    //FormSearch
   // Input
} from './style';

/*import {
    AreaEmp,
    InputEmp,
    Select
} from '../../components/Inputs'*/

import {
    Btt02, 
}from '../../components/Buttons';

const Student = () => {

    const navigate = useNavigate()
    const currentYear = new Date().getFullYear().toString();
    //const [year, setYear] = useState([])
    const [clss, setClss] = useState([])
    const [employee, setEmployee] = useState([])
    //const [matter, setMatter] = useState("")
    const [stdt, setStdt] = useState([])
    console.log(currentYear)

    useEffect(() => {
        (async () => {
            const id_class = sessionStorage.getItem("ClassInformation")
            const res = await clssInfo(id_class)
            setClss(res.data.data)
            console.log(res.data.data)
            const student = res.data.data.find( res => {
                return res
            }).id_student.map( res => {
                if (res) {
                    return (res)   
                } else {
                    return null
                }
            })
            const employee = res.data.data.find( res => {
                return res
            }).addTeacher.map( res => {
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
        })()
         
    }, [  ] )

    const addStudent = async () => {
        navigate('/add/student')
    }

    const addTeacher = async () => {
        navigate('/add/teacher')
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
            <User>

            </User>
            {
                clss.map(clss => (
                    <Emp key={clss._id} >
                        <Span>Serie: {clss.serie}</Span>
                        <Span>Nivel: {clss.level}</Span>
                        <Span>Turno: {clss.shift}</Span>
                        <Span>Numero da Sala: {clss.classroom_number}</Span>
                    </Emp>
                ))
            }
            
            {
                employee.length > 0                
                ?
                <DivInfo>
                    <DivAddEmp>
                        <AddEmp>
                            <Btt02 onClick={addTeacher}>Add Prefessor</Btt02>
                        </AddEmp>
                        <AddEmp>
                            <Btt02 onClick={RemoveTeacher}>Remover</Btt02>
                        </AddEmp>
                    </DivAddEmp>
                    <Emp>Professores:</Emp>
                    <Matter>

                        {
                            employee.map(employee => (
                                <div key = {employee._id}>
                                    <Span>{employee.name_teacher}: {employee.name_matter}</Span>
                                </div>
                            ))
                        }
                    </Matter>
                </DivInfo>
                :
                <DivInfo>
                    <DivAddEmp>
                        <AddEmp>
                            <Btt02 onClick={addTeacher}>Add Prefessor</Btt02>
                        </AddEmp>
                    </DivAddEmp>
                    <Emp>Professores:</Emp>
                    <Matter>
                        <>Não há nenhum Professor</>
                    </Matter>
                </DivInfo>
            }
            {
                stdt.length > 0                
                ?
                <DivInfo>
                    <DivAddEmp>
                        <AddEmp>
                            <Btt02 onClick={addStudent}>Add Aluno</Btt02>
                        </AddEmp>
                        <AddEmp>
                            <Btt02 onClick={RemoveStudent}>Remover</Btt02>
                        </AddEmp>
                    </DivAddEmp>
                    <Emp>Estudantes:</Emp>
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
                    <DivAddEmp>
                        <AddEmp>
                            <Btt02 onClick={addStudent}>Add Aluno</Btt02>
                        </AddEmp>
                    </DivAddEmp>
                    <Emp>Estudantes:</Emp>
                    <Matter>
                        <>Não há nenhum estudante</>
                    </Matter>
                </DivInfo>
            }
           
        </Container>
    )
}
  
export default Student