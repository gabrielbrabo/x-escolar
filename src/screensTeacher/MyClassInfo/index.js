import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetInfoMyClass, clssInfo } from '../../Api'

import {
    Container,
    //List,
    Emp,
    Matter,
    DivInfo,
    Span,
    //Search,
    DivAddEmp,
    //AddEmp,
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
} from '../../components/Buttons';

const Student = () => {

    const navigate = useNavigate()
    const [clss, setClss] = useState([])
    const [NameMatter, setNameMatter] = useState([])
    const [stdt, setStdt] = useState([])
    const { id_class } = useParams();
    const { id_teacher } = useParams();
    //console.log(currentYear)

    useEffect(() => {
        (async () => {
            console.log('useParamsClass', id_class)
            console.log('useParamsTeacher', id_teacher)
            //const id_class = sessionStorage.getItem("MyClassInfo")
            //const id_teacher = sessionStorage.getItem("Id_employee")
            const resClass = await clssInfo(id_class)
            const res = await GetInfoMyClass(id_class, id_teacher)
            console.log(res.data.data)
            const student = resClass.data.data.find(res => {
                return res
            }).id_student.map(res => {
                if (res) {
                    return (res)
                } else {
                    return null
                }
            })
            setStdt(student)
            setClss(resClass.data.data)
            setNameMatter(res.data.data)

            sessionStorage.removeItem("attendance_ idmatter")
            sessionStorage.removeItem("selectedDate")
            sessionStorage.removeItem("day")
            sessionStorage.removeItem("month")
            sessionStorage.removeItem("year")

            console.log("matter", res.data.data)
        })()

    }, [id_class, id_teacher])

    console.log("student", stdt)

    return (
        <Container>
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
            <User>
                <Btt02 onClick={() => { navigate('/attendance') }}>Chamada</Btt02>
            </User>

            {
                //employee.length > 0                
                //?
                <DivInfo>
                    <DivAddEmp>
                    </DivAddEmp>
                    <Emp>Materias em que da aula nessa Turma:</Emp>
                    <Matter>

                        {
                            NameMatter.map(employee => (
                                <div key={employee._id}>
                                    <Span>{employee.name_matter}</Span>
                                </div>
                            ))
                        }
                    </Matter>
                </DivInfo>
            }
            {
                stdt.length > 0
                    ?
                    <DivInfo>
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
                        <Emp>Estudantes:</Emp>
                        <Matter>
                            <>Não há nenhum estudantes</>
                        </Matter>
                    </DivInfo>
            }

        </Container>
    )
}

export default Student