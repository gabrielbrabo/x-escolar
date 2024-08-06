import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmpInfo, removeMatter } from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Add,
    AddTeacher,
    Button,
    Btt01,
    ButtonCancel
} from './style';

import LoadingSpinner from '../../components/Loading'

const RemoveMatter = () => {

    const navigate = useNavigate()
    //const currentYear = new Date().getFullYear();
    //const [student, setStudent] = useState([])
    //const [serie, setSerie] = useState("")
    //const [busca, setBusca] = useState("")
    const [employee, setEmployee] = useState([])
    const [name_employee, setName_employee] = useState("")
    const [id_employee, setId_employee] = useState("")
    const [name_matter, setName_matter] = useState("")
    const [id_matter, setId_matter] = useState("")
    //const [id_class, setId_class] = useState("")
    const [matter, setMatter] = useState([])
    const [loading, setLoading] = useState(false);
    //const [addTeacher, setId_addTeacher] = useState("")

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_employee = sessionStorage.getItem("EmployeeInformation")
            const res = await EmpInfo(id_employee)
            setEmployee(res.data.data)
            setId_employee(id_employee)
            //console.log(res.data.data)
            const mttr = res.data.data.find(res => {
                return res
            }).id_matter.map(res => {
                if (res._id) {
                    return (res)
                } else {
                    return (null)
                }
            }).filter(res => {
                if (! null) {
                    return (res)
                } else {
                    return (null)
                }
            })
            setMatter(mttr)
            setLoading(false);
        })()

    }, [])

    matter.sort(function (a, b) {
        if (a.serie < b.serie) return -1
        if (a.serie > b.serie) return 1
        return 0
    })

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
        const res = await removeMatter(id_matter, id_employee)
        if (res) {
            alert('Aluno Removido com sucesso.')
            navigate(`/employee/info/${id_employee}`)
        }
        //console.log("id_student", id_student)
        //console.log("id_class", id_class)
        setName_matter('')
        setLoading(false);
    }

    const Remove = async (matter) => {
        setLoading(true);
        const nameEmployee = employee.find(emp => {
            return emp
        })
        console.log("nameEmployee", nameEmployee.name)
        setName_matter(matter.name)
        setId_matter(matter._id)
        setName_employee(nameEmployee.name)
        setLoading(false);
    }

    const Return = async () => {
        setLoading(true);
        setName_matter('')
        setName_employee('')
        setId_matter('')
        setLoading(false);
    }
    const Cancel = async () => {
        navigate(-1); 
    }

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <h1>Materias</h1>
                    <List>

                        {
                            matter.map(matter => (
                                <Emp
                                    onClick={() =>
                                        Remove(matter)
                                    }
                                    key={matter._id}
                                >
                                    <Span>{matter.name}</Span>
                                </Emp>
                            ))
                        }
                    </List>
                    {
                        name_matter
                        &&
                        <Add>

                            {
                                <AddTeacher>
                                    <>Tem certeza que deseja remover a Materia {name_matter} do Professor {name_employee} ?</>
                                    <Button>
                                        <Btt01 onClick={SignClick}>Remover</Btt01>
                                        <Btt01 onClick={Return}>Voltar</Btt01>
                                    </Button>
                                </AddTeacher>
                            }
                        </Add>
                    }
                </>
            }
            <ButtonCancel>
                <Btt01 onClick={Cancel}>Cancelar</Btt01>
            </ButtonCancel>
        </Container>
    )
}

export default RemoveMatter