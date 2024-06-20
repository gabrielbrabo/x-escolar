import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {StdtInfo} from '../../Api'

import {
    Container,
    //List,
    Emp,
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
    const [student, setStudent] = useState([])
    //const [busca, setBusca] = useState("")
    //const [filter, setFilter] = useState()
    const {id_student} = useParams()
    console.log(currentYear)

    useEffect(() => {
        (async () => {
            //const id_student = sessionStorage.getItem("StudentInformation")
            const res = await StdtInfo(id_student)
            setStudent(res.data.data)
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
            setClss(clss)
        })()
         
    }, [ currentYear, id_student ] )

    console.log("clas", Clss)

    return (
        <Container>
            <User>

            </User>
            {
                student.map(student => (
                    <Emp key={student._id} >
                        <Span>Nome: {student.name}</Span>
                        <Span>RG: {student.rg}</Span>
                        <Span>RS: {student.registerStudent}</Span>
                    </Emp>
                ))
            }

            {
                Clss.map(clss => (
                    <Emp key={clss._id} >
                        <Span>Turma: {clss.serie}</Span>
                        <Span>Nivel: {clss.level}</Span>
                        <Span>Turno: {clss.shift}</Span>
                        <Span>Ano: {clss.year}</Span>
                    </Emp>
                ))
            }
        </Container>
    )
}
  
export default Student