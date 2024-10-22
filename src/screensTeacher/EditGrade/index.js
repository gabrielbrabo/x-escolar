import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clssInfo, RegisterGradeIIIrdQuarter, getIIIrdQuarter, GetGradeIIIrdQuarter } from '../../Api'

import {
    Container,
    ContainerDivs,
    List,
    Emp,
    Span,
    InputGrade,
    Btt01,
    Btt02,
    Grade,
    ContainerStudent,
    ErrorMessage,
    DataSelected
} from './style';

import {
} from '../../components/Inputs'
import LoadingSpinner from '../../components/Loading'

const IndexAttendance = () => {

    const navigate = useNavigate()
    const [Namematter, setNameMatter] = useState([])
    
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);


            setLoading(false);
        })()
    }, [])

    const handleGrade = async (stdt) => {
        setLoading(true)
        const id_student = stdt._id
        console.log("year", year, "bimonthly", bimonthly, "totalGrade", totalGrade, "averageGrade", averageGrade, "studentGrade", studentGrade, "id_iiNdQuarter", id_iiiRdQuarter, "id_student", id_student, "id_teacher", id_teacher, "id_matter", id_matter)
        const res = await RegisterGradeIIIrdQuarter(year, bimonthly, totalGrade, averageGrade, studentGrade, id_iiiRdQuarter, id_student, id_teacher, id_matter, id_class)
        if (res) {
            const resGrade = await GetGradeIIIrdQuarter(year, id_matter, id_iiiRdQuarter, id_class)
            const resClass = await clssInfo(id_class)
            const GradeRealized = await resGrade.data.data.map(res => {
                return res.id_student._id
            })
            const checkedStudent = await resGrade.data.data.map(res => {
                return res
            })
            const student = await resClass.data.data.find(res => {
                return res
            }).id_student.map(res => {
                return res
            }).filter(studentId => {
                if (!GradeRealized.includes(studentId._id)) {
                    return studentId
                }
                return null
            })
            setStdt(student)
            setChecked(checkedStudent)
            console.log("res", res)
            console.log("GradeRealized", GradeRealized)
            console.log("checkedStudent", checkedStudent)
            console.log("student", student)
            console.log("resGrade", resGrade)
            console.log("resClass", resClass)
            setErrorMessage('')
        } else {
            setErrorMessage('Erro, Verifique os dados e tente novamente.');
        }
        //console.log("res", res)
        setStudentGrade([])
        console.log("res", setStudentGrade)
        setLoading(false)
    }

    const Finalyze = () => {
        setLoading(true)
        navigate(-2);
    }

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    <h2>Grade 3º Bimestre</h2>
                    <ContainerStudent>
                        <DataSelected>
                            <p>Bimestre: 3º Bimestre</p>
                            <p>Disciplina: {Namematter}</p>
                        </DataSelected>
                        <List>
                            {
                                stdt.map(stdt => (
                                    <>
                                        <Emp
                                            key={stdt._id}
                                        >
                                            <Span>{stdt.name}</Span>
                                            <Grade>
                                                <p>nota:</p>
                                                <InputGrade
                                                    type='number'
                                                    onChange={(e) => setStudentGrade(e.target.value)}
                                                    maxLength={3}
                                                />
                                                <span>pts</span>
                                            </Grade>
                                            <Btt01 onClick={() => handleGrade(stdt)}>Definir</Btt01>
                                        </Emp>
                                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                    </>
                                ))
                            }
                        </List>
                        <h3>Checked</h3>
                        <List>

                            {
                                checked.map(stdt => (
                                    <>
                                        <Emp
                                            key={stdt._id}
                                        >
                                            <Span>{stdt.id_student.name}</Span>
                                            <Grade>
                                                <p>nota:</p>
                                                <p>{stdt.studentGrade}</p>
                                                <span>pts</span>
                                            </Grade>
                                            <Btt02 >Editar</Btt02>
                                        </Emp>
                                    </>
                                ))
                            }
                        </List>
                        <Btt02 onClick={Finalyze}>
                            Finalizar
                        </Btt02>
                    </ContainerStudent>
                </ContainerDivs>
            }
        </Container>
    )
}

export default IndexAttendance