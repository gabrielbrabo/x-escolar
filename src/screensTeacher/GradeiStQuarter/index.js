import React, { useState, useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
import { clssInfo, RegisterGradeIstQuarter, getIstQuarter, GetGradeIstQuarter } from '../../Api'

import {
    Container,
    ContainerDivs,
    List,
    Emp,
    Span,
    InputGrade,
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

    //const navigate = useNavigate()
    const [Namematter, setNameMatter] = useState([])
    const [year, setYear] = useState([]);
    const [bimonthly, setBimonthly] = useState([]);
    const [totalGrade, setTotalGrade] = useState([]);
    const [averageGrade, setAverageGrade] = useState([]);
    const [id_matter, setMatter] = useState([]);
    const [id_class, setId_class] = useState([])
    const [studentGrade, setStudentGrade] = useState([]);
    const [id_iStQuarter, setId_iStQuarter] = useState([]);
    const [stdt, setStdt] = useState([])
    const [checked, setChecked] = useState([])
    const [id_teacher, setId_teacher] = useState([])
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);

            const idSchool = sessionStorage.getItem("id-school");
            const id_teacher = localStorage.getItem("Id_employee");
            const currentYear = sessionStorage.getItem("yearGrade");
            const id_bimonthly = sessionStorage.getItem("id-I")
            const nameMatter = sessionStorage.getItem("nameMatter")
            const id_mttr = sessionStorage.getItem("Selectmatter")
            const id_class = sessionStorage.getItem("class-info")
           // const resClass = await clssInfo(id_class)
            const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))

            setMatter(id_mttr)
            setYear(currentYear)
            setId_iStQuarter(id_bimonthly)

            const bim = await IstQuarter.data.data.map(res => {
                return res.bimonthly

            })
            const tg = await IstQuarter.data.data.map(res => {
                return res.totalGrade
            })
            const ag = await IstQuarter.data.data.map(res => {
                return res.averageGrade
            })

            const bimString = bim.join(' '); // Transformar 'tg' em uma string separada por vírgulas
            const tgString = tg.join(' '); // Transformar 'tg' em uma string separada por vírgulas
            const agString = ag.join(' '); // Transformar 'ag' em uma string separada por vírgulas
            console.log("nameMatter2", nameMatter)

            /*const student = resClass.data.data.find(res => {
                return res
            }).id_student.map(res => {
                if (res) {
                    return (res)
                } else {
                    return null
                }
            })*/
            console.log('tg', tgString, "ag", agString)
           // setStdt(student)
            setNameMatter(nameMatter)
            setId_class(id_class)
            setBimonthly(bimString)
            setTotalGrade(tgString)
            setAverageGrade(agString)
            setId_teacher(JSON.parse(id_teacher))

            if (id_matter && year && id_iStQuarter ) {
                setLoading(true);
                const resGrade = await GetGradeIstQuarter(year, id_matter, id_iStQuarter)
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
            }

            await setLoading(false);
        })()
    }, [year, id_iStQuarter, id_matter])

    const handleGrade = async (stdt) => {
        setLoading(true)
        const id_student = stdt._id
        console.log("year", year, "bimonthly", bimonthly, "totalGrade", totalGrade, "averageGrade", averageGrade, "studentGrade", studentGrade, "id_iStQuarter", id_iStQuarter, "id_student", id_student, "id_teacher", id_teacher, "id_matter", id_matter)
        const res = await RegisterGradeIstQuarter(year, bimonthly, totalGrade, averageGrade, studentGrade, id_iStQuarter, id_student, id_teacher, id_matter)
        if (res) {
            const resGrade = await GetGradeIstQuarter(year, id_matter, id_iStQuarter)
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

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    <h2>Grade 1º Bimestre</h2>
                    <ContainerStudent>
                        <DataSelected>
                            <p>Bimestre: 1º Bimestre</p>
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
                                            <Btt02 onClick={() => handleGrade(stdt)}>Definir</Btt02>
                                        </Emp>
                                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                    </>
                                ))
                            }
                        </List>
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
                    </ContainerStudent>
                </ContainerDivs>
            }
        </Container>
    )
}

export default IndexAttendance