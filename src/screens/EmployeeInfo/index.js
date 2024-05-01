import React, {useState, useEffect} from 'react'
//import { useNavigate } from 'react-router-dom'
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
    User,
    //FormFilter,
    //FormSearch
   // Input
} from './style';

/*import {
    AreaEmp,
    InputEmp,
    Select
} from '../../components/Inputs'

import {
    Btt02, 
}from '../../components/Buttons';*/

const Student = () => {

    //const navigate = useNavigate()
    const currentYear = new Date().getFullYear().toString();
    //const [year, setYear] = useState([])
    const [Clss, setClss] = useState([])
    const [employee, setEmployee] = useState([])
    const [matter, setMatter] = useState("")
    //const [filter, setFilter] = useState()
    console.log(currentYear)

    useEffect(() => {
        (async () => {
            const id_employee = sessionStorage.getItem("EmployeeInformation")
            const res = await EmpInfo(id_employee)
            setEmployee(res.data.data)
            //console.log(res.data.data)
            const clss = res.data.data.find( res => {
                return res
            }).id_class.map( res => {
                if (res.year === currentYear) {
                    return (res)   
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

    console.log("clas", matter)

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
                matter.length > 0 
                &&
                <DivInfo>
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
                Clss.length > 0
                &&
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
            }
        </Container>
    )
}
  
export default Student