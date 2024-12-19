import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clssInfo, RegisterGradeVthQuarter, getVthQuarter,  GetGradeVthQuarter, updateGrade } from '../../Api'

import {
    Container,
    ContainerDivs,
    List,
    Emp,
    Span,
    //InputGrade,
    Btt01,
    Btt02,
    Grade,
    ContainerStudent,
    EditContainer,
    ErrorMessage,
    DataSelected,
    Select,
    LegendBox,
    Info
} from './style';

import {
} from '../../components/Inputs'
import LoadingSpinner from '../../components/Loading'

const IndexAttendance = () => {

    const navigate = useNavigate()
    const [Namematter, setNameMatter] = useState([])
    const [year, setYear] = useState('');
    const [bimonthly, setBimonthly] = useState([]);
    const [totalGrade, setTotalGrade] = useState([]);
    const [averageGrade, setAverageGrade] = useState([]);
    const [id_matter, setMatter] = useState('');
    const [id_class, setId_class] = useState([])
    const [studentGrade, setStudentGrade] = useState([]);
    const [id_vThQuarter, setId_vThQuarter] = useState('');
    const [stdt, setStdt] = useState([])
    const [checked, setChecked] = useState([])
    const [id_teacher, setId_teacher] = useState([]) 
    const [namestudent, setNamestudent] = useState('')
    const [update_id_grade, setUpdateIdGrade] = useState(null);
    const [update_studentGrade, setUpdateStudentGrade] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);

            const idSchool = sessionStorage.getItem("id-school");
            const id_teacher = localStorage.getItem("Id_employee");
            const currentYear = sessionStorage.getItem("yearGrade");
            const id_bimonthly = sessionStorage.getItem("id-V")
            const nameMatter = sessionStorage.getItem("nameMatter")
            const id_mttr = sessionStorage.getItem("Selectmatter")
            const id_class = sessionStorage.getItem("class-info")
            // const resClass = await clssInfo(id_class)
            const VthQuarter = await getVthQuarter(year, JSON.parse(idSchool))

            setMatter(id_mttr)
            setYear(currentYear)
            setId_vThQuarter(id_bimonthly)

            const bim = await VthQuarter.data.data.map(res => {
                return res.bimonthly

            })
            const tg = await VthQuarter.data.data.map(res => {
                return res.totalGrade
            })
            const ag = await VthQuarter.data.data.map(res => {
                return res.averageGrade
            })

            const bimString = bim.join(' '); // Transformar 'tg' em uma string separada por vírgulas
            const tgString = tg.join(' '); // Transformar 'tg' em uma string separada por vírgulas
            const agString = ag.join(' '); // Transformar 'ag' em uma string separada por vírgulas
            console.log("nameMatter2", nameMatter)

            console.log('tg', tgString, "ag", agString)
            setNameMatter(nameMatter)
            setId_class(id_class)
            setBimonthly(bimString)
            setTotalGrade(tgString)
            setAverageGrade(agString)
            setId_teacher(JSON.parse(id_teacher))

            if (id_matter && year && id_vThQuarter && id_class) {
                setLoading(true);
                const resGrade = await GetGradeVthQuarter(year, id_matter, id_vThQuarter, id_class)
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

            setLoading(false);
        })()
    }, [year, id_vThQuarter, id_matter])

    const handleGrade = async (stdt) => {
        setLoading(true)
        const id_student = stdt._id
        console.log("year", year, "bimonthly", bimonthly, "totalGrade", totalGrade, "averageGrade", averageGrade, "studentGrade", studentGrade, "id_iiNdQuarter", id_vThQuarter, "id_student", id_student, "id_teacher", id_teacher, "id_matter", id_matter)
        const res = await RegisterGradeVthQuarter(year, bimonthly, totalGrade, averageGrade, studentGrade, id_vThQuarter, id_student, id_teacher, id_matter, id_class)
        if (res) {
            const resGrade = await  GetGradeVthQuarter(year, id_matter, id_vThQuarter, id_class)
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

    const startEditing = (stdt) => {
        setUpdateStudentGrade(stdt.studentGrade);
        setUpdateIdGrade(stdt._id);
        setNamestudent(stdt)
    };

    const saveEdit = async () => {
        setLoading(true)
        await updateGrade(update_id_grade, update_studentGrade)
        window.location.reload()
        //setLoading(false)
    };

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
                    <h2>Grade Bimestral</h2>
                    <ContainerStudent>
                        <DataSelected>
                        <Info>
                                <p>Bimestre: 5º Bimestre</p>
                                <p>Disciplina: {Namematter}</p>
                            </Info>
                            <LegendBox>
                                <h3>Legenda</h3>
                                <p><strong>A</strong> - Alcançou com êxito as capacidades básicas</p>
                                <p><strong>B</strong> - Alcançou satisfatoriamente as capacidades básicas</p>
                                <p><strong>C</strong> - Alcançou parcialmente as capacidades básicas</p>
                                <p><strong>D</strong> - Não alcançou as capacidades básicas</p>
                            </LegendBox>
                        </DataSelected>
                        {!update_id_grade &&
                            <>
                                <List>
                                    {
                                        stdt.map(stdt => (
                                            <>
                                                <Emp
                                                    key={stdt._id}
                                                >
                                                    <Span>{stdt.name}</Span>
                                                    <Grade>
                                                        <p>Conceito:</p>
                                                        <Select
                                                            //id="position"
                                                            //value={update_studentGrade}
                                                            onChange={(e) => setStudentGrade(e.target.value)}
                                                        >
                                                            <option value="">Selecione</option>
                                                            <option value="A">A</option>
                                                            <option value="B">B</option>
                                                            <option value="C">C</option>
                                                            <option value="D">D</option>
                                                        </Select>
                                                        {/*<span>pts</span>*/}
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
                                                        <p>Conceito: </p>
                                                        <p>{stdt.studentGrade}</p>
                                                        {/*<span>pts</span>*/}
                                                    </Grade>
                                                    <Btt02 onClick={() => startEditing(stdt)} >Editar</Btt02>
                                                </Emp>
                                            </>
                                        ))
                                    }
                                </List>
                            </>
                        }
                        {update_id_grade && (
                            <EditContainer>
                                <h3>Editando Nota</h3>
                                {console.log("editingStudent", namestudent.id_student.name)}
                                <Emp>
                                    <Span>{namestudent.id_student.name}</Span>
                                    <Grade>
                                        <p>Concenito: </p>
                                        <Select
                                            //id="position"
                                            value={update_studentGrade}
                                            onChange={(e) => setUpdateStudentGrade(e.target.value)}
                                        >
                                            <option value="">Selecione</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </Select>
                                        {/*<span>pts</span>*/}
                                    </Grade>
                                </Emp>
                                <Btt02 onClick={saveEdit}>Salvar</Btt02>
                                <Btt02 onClick={() => setUpdateIdGrade(null)}>Cancelar</Btt02>
                            </EditContainer>
                        )}
                        {!update_id_grade &&
                            <Btt02 onClick={Finalyze}>
                                Finalizar
                            </Btt02>
                        }
                    </ContainerStudent>
                </ContainerDivs>
            }
        </Container>
    )
}

export default IndexAttendance