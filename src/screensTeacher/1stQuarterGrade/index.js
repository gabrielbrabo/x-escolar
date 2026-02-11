import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clssInfo, RegisterNumericalGrade, getIstQuarter, GetNumericalGradeIstQuarter, updateNumericalGrade } from '../../Api'

import {
    Container,
    ContainerDivs,
    List,
    ListChecked,
    Emp,
    EmpEdit,
    Span,
    SpanEdit,
    Conceito,
    Input,
    Btt01,
    Btt02,
    Grade,
    ContainerStudent,
    EditContainer,
    ErrorMessage,
    DataSelected,
    //Select,
    LegendBox,
    Info,
    BoxBtt,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './style';

import {
} from '../../components/Inputs'
import LoadingSpinner from '../../components/Loading'

import { SlActionUndo } from "react-icons/sl";

const IndexAttendance = () => {

    const navigate = useNavigate()
    const [open, setopen] = useState()
    const [Namematter, setNameMatter] = useState([])
    const [year, setYear] = useState('');
    const [bimonthly, setBimonthly] = useState([]);
    const [totalGrade, setTotalGrade] = useState([]);
    const [averageGrade, setAverageGrade] = useState([]);
    const [id_matter, setMatter] = useState('');
    const [id_class, setId_class] = useState([])
    //const [studentGrade, setStudentGrade] = useState([]);
    const [id_iStQuarter, setId_iStQuarter] = useState('');
    const [stdt, setStdt] = useState([])
    const [checked, setChecked] = useState([])
    const [id_teacher, setId_teacher] = useState([])
    const [namestudent, setNamestudent] = useState('')
    const [update_id_grade, setUpdateIdGrade] = useState(null);
    const [update_studentGrade, setUpdateStudentGrade] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const [grades, setGrades] = useState([]); // Estado para armazenar as notas individuais

    const [RegentTeacher, setclassRegentTeacher] = useState([]);
    const [RegentTeacher02, setclassRegentTeacher02] = useState([]);
    const [physicalEducation, setphysicalEducationTeacher] = useState([]);

    const [assessmentRegime, setAssessmentRegime] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);

            const idSchool = sessionStorage.getItem("id-school");
            const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
            const classRegentTeacher02 = sessionStorage.getItem("classRegentTeacher02");
            const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");
            setAssessmentRegime(sessionStorage.getItem('assessmentRegime'))

            setclassRegentTeacher(JSON.parse(classRegentTeacher))
            setclassRegentTeacher02(JSON.parse(classRegentTeacher02))
            setphysicalEducationTeacher(JSON.parse(physicalEducationTeacher))

            const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
            const open = await IstQuarter.data.data.map(res => {
                return res.statusSupervisor

            }).find(res => {
                return res
            })
            setopen(open)
            console.log("open", open)

            const id_teacher = localStorage.getItem("Id_employee");
            const currentYear = sessionStorage.getItem("yearGrade");
            const id_bimonthly = sessionStorage.getItem("id-I")
            const nameMatter = sessionStorage.getItem("nameMatter")
            const id_mttr = sessionStorage.getItem("Selectmatter")
            const id_class = sessionStorage.getItem("class-info")
            // const resClass = await clssInfo(id_class)
            console.log(IstQuarter)

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

            console.log('tg', tgString, "ag", agString)
            setNameMatter(nameMatter)
            setId_class(id_class)
            setBimonthly(bimString)
            setTotalGrade(tgString)
            setAverageGrade(agString)
            setId_teacher(JSON.parse(id_teacher))

            if (id_matter && year && id_iStQuarter && id_class) {
                //setLoading(true);
                const resGrade = await GetNumericalGradeIstQuarter(year, id_matter, id_iStQuarter, id_class)
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
    }, [year, id_iStQuarter, id_matter, averageGrade, totalGrade])

    console.log("checked", checked)
    console.log("stdt", stdt)

    console.log("totalGrade", totalGrade, "averageGrade", averageGrade,)


    const handleGrade = async () => {
        setLoading(true)
        if (!grades || grades.length === 0) {
            alert("Nenhuma nota foi cadastrada!");
            setLoading(false)
            return;
        }

        // Lista de todos os estudantes da turma
        const studentIds = stdt.map(student => student._id);
        console.log('studentIds', studentIds)
        // Lista de estudantes que já receberam nota
        const studentsWithGrades = grades.map(grade => grade.studentId);
        console.log("studentsWithGrades", studentsWithGrades)

        // Verifica se todos os estudantes da turma receberam nota
        const allStudentsGraded = studentIds.every(studentId =>
            studentsWithGrades.includes(studentId)
        );
        console.log("allStudentsGraded", allStudentsGraded)
        if (!allStudentsGraded) {
            alert("Nem todos os estudantes receberam nota! Verifique antes de enviar.");
            setLoading(false)
            return;
        }

        const res = await RegisterNumericalGrade(grades)
        if (res) {
            console.log("notas adicionadas", grades)
            window.location.reload()
        } else {
            setErrorMessage('Erro, Verifique os dados e tente novamente.')
        }

        //setLoading(false)
    }

    const startEditing = (stdt) => {
        setUpdateStudentGrade(stdt.studentGrade);
        setUpdateIdGrade(stdt._id);
        setNamestudent(stdt)
    };

    const saveEdit = async () => {
        setLoading(true)
        await updateNumericalGrade(update_id_grade, update_studentGrade)
        window.location.reload()
        //setLoading(false)
    };

    const Return = () => {
        navigate(-2)
    };

    const handleInputChange = (e, studentId) => {
        let value = e.target.value.replace(".", ","); // Substitui ponto por vírgula
        value = value.replace(/[^0-9,]/g, ""); // Permite apenas números e uma única vírgula

        if ((value.match(/,/g) || []).length <= 1) {
            const numericValue = parseFloat(value.replace(",", "."));
            if (RegentTeacher === id_teacher) {
                const id_teacher02 = RegentTeacher02
                setGrades(prevGrades => {
                    // Remove a nota se o campo estiver vazio
                    if (value.trim() === "") {
                        return prevGrades.filter(item => item.studentId !== studentId);
                    }

                    if (numericValue >= 0 && numericValue <= 100) {
                        // Verifica se o aluno já tem uma nota no array
                        const existingIndex = prevGrades.findIndex(item => item.studentId === studentId);

                        if (existingIndex !== -1) {
                            // Se já existir, atualiza a nota
                            const updatedGrades = [...prevGrades];
                            updatedGrades[existingIndex].value = value;
                            return updatedGrades;
                        } else {
                            // Se não existir, adiciona um novo objeto
                            return [...prevGrades, {
                                studentId,
                                value,
                                year,
                                bimonthly,
                                id_iStQuarter,
                                id_teacher,
                                id_teacher02,
                                id_matter,
                                id_class
                            }];
                        }
                    }
                    return prevGrades;
                });
            } else if (RegentTeacher02 === id_teacher) {
                const id_teacher02 = RegentTeacher02
                setGrades(prevGrades => {
                    // Remove a nota se o campo estiver vazio
                    if (value.trim() === "") {
                        return prevGrades.filter(item => item.studentId !== studentId);
                    }

                    if (numericValue >= 0 && numericValue <= 100) {
                        // Verifica se o aluno já tem uma nota no array
                        const existingIndex = prevGrades.findIndex(item => item.studentId === studentId);

                        if (existingIndex !== -1) {
                            // Se já existir, atualiza a nota
                            const updatedGrades = [...prevGrades];
                            updatedGrades[existingIndex].value = value;
                            return updatedGrades;
                        } else {
                            // Se não existir, adiciona um novo objeto
                            return [...prevGrades, {
                                studentId,
                                value,
                                year,
                                bimonthly,
                                id_iStQuarter,
                                id_teacher: RegentTeacher,
                                id_teacher02,
                                id_matter,
                                id_class
                            }];
                        }
                    }
                    return prevGrades;
                });
            } else if (physicalEducation === id_teacher) {
                const id_teacher02 = null;
                setGrades(prevGrades => {
                    // Remove a nota se o campo estiver vazio
                    if (value.trim() === "") {
                        return prevGrades.filter(item => item.studentId !== studentId);
                    }

                    if (numericValue >= 0 && numericValue <= 100) {
                        // Verifica se o aluno já tem uma nota no array
                        const existingIndex = prevGrades.findIndex(item => item.studentId === studentId);

                        if (existingIndex !== -1) {
                            // Se já existir, atualiza a nota
                            const updatedGrades = [...prevGrades];
                            updatedGrades[existingIndex].value = value;
                            return updatedGrades;
                        } else {
                            // Se não existir, adiciona um novo objeto
                            return [...prevGrades, {
                                studentId,
                                value,
                                year,
                                bimonthly,
                                id_iStQuarter,
                                id_teacher,
                                id_teacher02,
                                id_matter,
                                id_class
                            }];
                        }
                    }
                    return prevGrades;
                });
            }
        }
    };

    console.log('grades', grades)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    <h2>Grade Bimestral</h2>
                    {open === 'aberto' ? (
                        <ContainerStudent>
                            <DataSelected>
                                <SlActionUndo fontSize={'30px'} onClick={Return} />
                                <Info>
                                    {assessmentRegime === 'BIMESTRAL' && (
                                        <p>1º Bimestre</p>
                                    )}
                                    {assessmentRegime === 'TRIMESTRAL' && (
                                        <p>1º Trimestre</p>
                                    )}
                                    <p>Disciplina: {Namematter}</p>
                                </Info>
                                <LegendBox>
                                    <h3>Legenda</h3>
                                    <p>Nota Total: <strong style={{ color: '#1d7f14' }}>{totalGrade}</strong></p>
                                    <p>Nota Média: <strong style={{ color: 'blue' }}>{averageGrade}</strong></p>
                                </LegendBox>
                            </DataSelected>
                            {!update_id_grade &&
                                <>
                                    <List>
                                        {
                                            stdt
                                                .sort((a, b) => a.name.localeCompare(b.name)) // Ordena em ordem alfabética
                                                .map(stdt => (
                                                    <>
                                                        <Emp
                                                            key={stdt._id}
                                                        >
                                                            <Span>{stdt.name}</Span>
                                                            <Grade>
                                                                <p>Nota:</p>
                                                                <Input
                                                                    type='number'
                                                                    placeholder="N/A"
                                                                    value={grades[stdt._id]}
                                                                    onChange={(e) => handleInputChange(e, stdt._id)}
                                                                />
                                                            </Grade>
                                                            {/*<Btt01 onClick={() => handleGrade(stdt)}>Definir</Btt01>*/}
                                                        </Emp>
                                                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                                    </>
                                                ))
                                        }
                                        {checked.length <= 0
                                            &&
                                            <BoxBtt>
                                                <Btt01 onClick={handleGrade}>Adicionar Notas</Btt01>
                                            </BoxBtt>
                                        }

                                    </List>
                                    {checked.length > 0
                                        &&
                                        <ListChecked>
                                            {
                                                checked
                                                    .sort((a, b) => a.id_student.name.localeCompare(b.id_student.name)) // Ordena em ordem alfabética
                                                    .map(stdt => {
                                                        const studentGrade = stdt.studentGrade;
                                                        let gradeColor = 'blue'; // Padrão: azul para notas iguais ou maiores que a média

                                                        if (studentGrade < averageGrade) {
                                                            gradeColor = 'red'; // Se a nota for menor que a média, fica vermelha
                                                        } else if (studentGrade >= (totalGrade * 0.9)) {
                                                            gradeColor = '#1d7f14'; // Se for igual ou maior que 80% da nota total, fica verde
                                                        }

                                                        return (
                                                            <Emp key={stdt._id}>
                                                                <Span>{stdt.id_student.name}</Span>
                                                                <Grade>
                                                                    <Conceito style={{ color: gradeColor }}>
                                                                        {studentGrade}
                                                                    </Conceito>
                                                                    <span>pts</span>
                                                                </Grade>
                                                                <Btt02 onClick={() => startEditing(stdt)}>Editar</Btt02>
                                                            </Emp>
                                                        );
                                                    })
                                            }
                                            <ToGoBack onClick={Return}>
                                                <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                                                <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                                            </ToGoBack>
                                        </ListChecked>
                                    }
                                </>
                            }
                            {update_id_grade && (
                                <EditContainer>
                                    <h3>Editando Nota</h3>
                                    {console.log("editingStudent", namestudent.id_student.name)}
                                    <EmpEdit>
                                        <SpanEdit>{namestudent.id_student.name}</SpanEdit>
                                        <Grade id='nota'>
                                            <p>Nota:</p>
                                            <Input
                                                placeholder="N/A"
                                                value={update_studentGrade}
                                                onChange={(e) => setUpdateStudentGrade(e.target.value)}
                                            />
                                        </Grade>
                                    </EmpEdit>
                                    <Btt02 onClick={saveEdit}>Salvar</Btt02>
                                    <Btt02 onClick={() => setUpdateIdGrade(null)}>Cancelar</Btt02>
                                </EditContainer>
                            )}
                            {/*!update_id_grade &&
                                <Btt02 onClick={Finalyze}>
                                    Finalizar
                                </Btt02>*/
                            }
                        </ContainerStudent>
                    ) : (
                        <p>1º Bimestre fechado, para editar contate o Diretor ou Supervisor.</p>
                    )}
                </ContainerDivs>
            }
        </Container>
    )
}

export default IndexAttendance