import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {EmpInfo} from '../../Api'

import {
    Container,
    //List,
    Emp,
    Matter,
    DivInfo,
    Span,
    //Search,
    //DivNewEmp,
    DivAddEmp, 
    User,
    AddEmp,
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
    const [Clss, setClss] = useState([])
    const [employee, setEmployee] = useState([])
    const [matter, setMatter] = useState("")
    //const [filter, setFilter] = useState()
    const [position_at_school, setPosition_at_school] = useState([]);
    //console.log('posi', position_at_school)

    useEffect(() => {
        (async () => {     
            const id_employee = sessionStorage.getItem("EmployeeInformation")
            const res = await EmpInfo(id_employee)
            const position_at_school = res.data.data.map( res => {
                if(res.position_at_school === "GESTOR") {
                    return res.position_at_school
                } else {
                    return null
                }
            }).filter( res => {
                if(! undefined) {
                    return (res)
                } else {
                    return undefined
                }
            })
            if (position_at_school) {
                setPosition_at_school(position_at_school)
            } 
            setEmployee(res.data.data)
            //console.log(res.data.data)
            const clss = res.data.info.find( res => {
                return res
                }).map (res => {
                    if (res.id_class.year === currentYear) {
                        return (res.id_class)   
                    } else {
                        return null
                    }
                }).filter( res => {
                    if(! null) {
                        return (res)
                    } else {
                        return null
                    }
                })
            console.log("cl", clss)
            const mttr = res.data.data.find( res => {
                return res
            }).id_matter.map( res => {
                if (res._id) {
                    return (res)   
                } else {
                    return (null)
                }
            }).filter( res => {
                if(! null) {
                    return (res)
                } else {
                    return (null)
                }
            })
            setClss(clss)
            setMatter(mttr)
        })()
         
    }, [ currentYear ] )

    const add = () => {
        const res = employee.find(employee => {
            return employee
        })
        console.log("res", res._id)
        sessionStorage.removeItem('id_emp')
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('tchrnf')
        sessionStorage.setItem("id_emp", res._id)
        sessionStorage.setItem("name", res.name)
        sessionStorage.setItem("tchrnf", res._id)
        navigate('/add/matter')
    }

    const Remove = async () => {
        navigate('/remove/matter')
    }

    console.log("clas", matter)
    console.log('posi', position_at_school)

    return (
        <Container>
            <User>

            </User>
            {
                employee.map(employee => (
                    <Emp key={employee._id} >
                        <Span>Nome: {employee.name}</Span>
                        <Span>CPF: {employee.cpf}</Span>
                        <Span>Função: {employee.position_at_school}</Span>
                    </Emp>
                ))
            }
            {
                position_at_school.length === 0
                &&
                <div>
                    {matter.length > 0 
                    &&
                    <DivInfo>
                        <DivAddEmp>
                            <AddEmp>
                                <Btt02 onClick={add}>Nova Materia</Btt02>
                            </AddEmp>
                            <AddEmp>
                                <Btt02 onClick={Remove}>Remover</Btt02>
                            </AddEmp>
                        </DivAddEmp>
                        <Emp>Materias:</Emp>
                        <Matter>

                            {
                                matter.map(matter => (
                                    <Span>{matter.name},</Span>
                                ))
                            }
                        </Matter>
                    </DivInfo>
                    }
                    { 
                        matter.length === 0
                        &&
                        <DivInfo>
                            <DivAddEmp>
                                <AddEmp>
                                    <Btt02 onClick={add}>Nova Materia</Btt02>
                                </AddEmp>
                            </DivAddEmp>
                            <Emp>Materias:</Emp>
                            <Matter>
                                <>Sem Materias cadastradas</>
                            </Matter>
                        </DivInfo>
                    }
                    {

                        Clss.length > 0
                        ?
                        <DivInfo>
                            <Emp>Turmas:</Emp>
                            <Matter>

                                {
                                    Clss.map(clss => (
                                        <Span>{clss.serie},</Span>
                                    ))
                                }
                            </Matter>
                        </DivInfo>
                        :
                        <DivInfo>
                            <Emp>Turmas:</Emp>
                            <Matter>
                                <>Este Professor não esta cadastrado em nenhuma turma vá ate turmas selecione a turma e adicione este professor a uma turma</>
                            </Matter>
                        </DivInfo>
                    }
                </div>
            }
        </Container>
    )
}
  
export default Student