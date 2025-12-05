import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { clssInfo, RegisterGradeIstQuarter, getIstQuarter, GetGradeIstQuarter, updateGrade, GetMatter, GetMatterDetails } from '../../Api'

import {
    Container,
    ContainerDivs,
    List,
    ListChecked,
    Emp,
    Span,
    Conceito,
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
    Info,
    AreaWrapper,
    Area,
    ContSelect
} from './style';

import {
} from '../../components/Inputs'
import LoadingSpinner from '../../components/Loading'

import { SlActionUndo } from "react-icons/sl";

const IndexAttendance = () => {

    const navigate = useNavigate()
    const [open, setopen] = useState('aberto')
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

    const [RegentTeacher, setclassRegentTeacher] = useState([]);
    const [RegentTeacher02, setclassRegentTeacher02] = useState([]);
    const [physicalEducation, setphysicalEducationTeacher] = useState([]);

    const [matter, setMttr] = useState([])
    const [selectedMatter, setSelectedMatter] = useState("")

    const [showMatterUpdated, setShowMatterUpdated] = useState(false);

    const location = useLocation();
    const { employee } = location.state || {};
    console.log("id employee", employee)

    useEffect(() => {
        (async () => {
            setLoading(true);

            const idSchool = sessionStorage.getItem("id-school");
            const id_teacher = employee;
            const currentYear = sessionStorage.getItem("yearGrade");
            const id_bimonthly = sessionStorage.getItem("id-I")
            const nameMatter = sessionStorage.getItem("nameMatter")
            const id_mttr = sessionStorage.getItem("Selectmatter")
            const id_class = sessionStorage.getItem("class-info")
            // const resClass = await clssInfo(id_class)

            const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
            const classRegentTeacher02 = sessionStorage.getItem("classRegentTeacher02");
            const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");

            setclassRegentTeacher(JSON.parse(classRegentTeacher))
            setclassRegentTeacher02(JSON.parse(classRegentTeacher02))
            setphysicalEducationTeacher(JSON.parse(physicalEducationTeacher))
            setMatter(id_mttr)
            setYear(currentYear)

            const IstQuarter = await getIstQuarter(currentYear, JSON.parse(idSchool))
            setId_iStQuarter(id_bimonthly)


            // Busca a turma direto com o idClass do sessionStorage
            const resClass = await clssInfo(id_class);

            if (resClass?.data?.data && resClass.data.data.length > 0) {
                const turma = resClass.data.data[0];
                console.log("turma:", turma);

                if (JSON.stringify(id_teacher) !== physicalEducationTeacher) {
                    setopen(turma.dailyStatus["1º BIMESTRE"].regentTeacher);
                } else {
                    setopen(turma.dailyStatus["1º BIMESTRE"].physicalEducationTeacher);
                }
            } else {
                console.warn("❌ resClass veio vazio ou sem dados:", resClass);
            }

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
            setId_teacher(id_teacher)

            if (id_mttr && currentYear && id_iStQuarter && id_class) {
                setLoading(true);
                const resGrade = await GetGradeIstQuarter(currentYear, id_mttr, id_iStQuarter, id_class)
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

            const res = await GetMatter(JSON.parse(idSchool));

            console.log("disciplinas", res.data.data)
            if (classRegentTeacher === JSON.stringify(id_teacher)) {
                const filterMatter = res.data.data.filter(res => {
                    if (res.name !== 'EDUCAÇÃO FÍSICA') {
                        if (res !== null) {
                            return res
                        }
                    }
                    return null
                })
                setMttr(filterMatter);
                console.log("filterMatter professor regent", filterMatter)
            } else if (classRegentTeacher02 === JSON.stringify(id_teacher)) {
                const filterMatter = res.data.data.filter(res => {
                    if (res.name !== 'EDUCAÇÃO FÍSICA') {
                        if (res !== null) {
                            return res
                        }
                    }
                    return null
                })
                setMttr(filterMatter);
                console.log("filterMatter professor regent", filterMatter)
            } else if (physicalEducationTeacher === JSON.stringify(id_teacher)) {
                const filterMatter = res.data.data.filter(res => {
                    if (res.name === 'EDUCAÇÃO FÍSICA') {
                        if (res !== null) {
                            return res
                        }
                    }
                    return null
                })
                setMttr(filterMatter);
                console.log("filterMatter", filterMatter)
            }
        })()
    }, [year, id_iStQuarter, id_matter, employee])

    useEffect(() => {
        const changed = sessionStorage.getItem("matterChanged");

        if (changed === "true") {
            setShowMatterUpdated(true);

            // remover para evitar mostrar de novo no próximo reload
            sessionStorage.removeItem("matterChanged");

            // esconder o card depois de 5s
            setTimeout(() => {
                setShowMatterUpdated(false);
            }, 10000);
        }
    }, []);

    // atualiza conceito local de um aluno (não envia)
    const handleConceptChange = (studentId, value) => {
        setStdt(prev => prev.map(s => s._id === studentId ? { ...s, concept: value } : s))
    }

    console.log("checked", checked)
    console.log("stdt", stdt)

    // função para recarregar checked e stdt (DRY)
    const refreshGradesAndStudents = async () => {
        try {
            const resGrade = await GetGradeIstQuarter(year, id_matter, id_iStQuarter, id_class)
            const resClass = await clssInfo(id_class)
            const GradeRealized = resGrade.data.data.map(res => res.id_student._id)
            const checkedStudent = resGrade.data.data.map(res => res)
            const student = resClass.data.data.find(res => res).id_student
                .map(res => res)
                .filter(studentId => !GradeRealized.includes(studentId._id))
                .map(s => ({ ...s, concept: "" }))
            setStdt(student)
            setChecked(checkedStudent)
            setErrorMessage('')
        } catch (err) {
            console.error(err)
            setErrorMessage('Erro ao atualizar listas.')
        }
    }

    console.log("checked", checked)
    console.log("stdt", stdt)

    /*const handleGrade = async (stdt) => {
        console.log("classRegentTeacher:", RegentTeacher);
        console.log("classRegentTeacher02:", RegentTeacher02);
        console.log("physicalEducationTeacher:", physicalEducation);
        console.log("id_teacher:", id_teacher);

        setLoading(true)
        if (RegentTeacher === id_teacher) {
            console.log("$$$RegentTeacher", RegentTeacher)
        } else if (RegentTeacher02 === id_teacher) {
            console.log("$$$RegentTeacher02", RegentTeacher02)
        } else if (physicalEducation === id_teacher) {
            console.log("$$$physicalEducation", physicalEducation)
        }
        const id_student = stdt._id
        console.log("year", year, "bimonthly", bimonthly, "totalGrade", totalGrade, "averageGrade", averageGrade, "studentGrade", studentGrade, "id_iStQuarter", id_iStQuarter, "id_student", id_student, "id_teacher", id_teacher, "id_matter", id_matter)
        if (RegentTeacher === id_teacher) {

            const id_teacher02 = RegentTeacher02
            const res = await RegisterGradeIstQuarter(year, bimonthly, studentGrade, id_iStQuarter, id_student, id_teacher, id_teacher02, id_matter, id_class)
            if (res) {
                const resGrade = await GetGradeIstQuarter(year, id_matter, id_iStQuarter, id_class)
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

            console.log("filterMatter professor regent", RegentTeacher)
        } else if (RegentTeacher02 === id_teacher) {
            console.log("filterMatter professor regent02", RegentTeacher02)

            //setId_teacher(RegentTeacher)

            const id_teacher02 = RegentTeacher02
            const res = await RegisterGradeIstQuarter(year, bimonthly, studentGrade, id_iStQuarter, id_student, RegentTeacher, id_teacher02, id_matter, id_class)
            if (res) {
                const resGrade = await GetGradeIstQuarter(year, id_matter, id_iStQuarter, id_class)
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

        } else if (physicalEducation === id_teacher) {
            console.log("filterMatter", physicalEducation)
            const id_teacher02 = null;
            const res = await RegisterGradeIstQuarter(
                year,
                bimonthly,
                studentGrade,
                id_iStQuarter,
                id_student,
                id_teacher,
                id_teacher02, // Se `id_teacher02` existir, envia; senão, envia string vazia
                id_matter,
                id_class
            )
            if (res) {
                const resGrade = await GetGradeIstQuarter(year, id_matter, id_iStQuarter, id_class)
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
        }

        setLoading(false)
    }*/

    // --- NOVA FUNÇÃO: envia todos os conceitos preenchidos em stdt de uma vez ---
    const handleFinalize = async () => {

        if (stdt.some(s => !s.concept || s.concept.trim() === "")) {
            alert("Atenção: Existem alunos sem conceito definido!");
        }

        const toSend = stdt.filter(s => s.concept && s.concept.trim() !== "")

        if (toSend.length === 0) {
            setErrorMessage('Preencha ao menos um conceito antes de finalizar.')
            return;
        }

        setLoading(true)
        setErrorMessage('')

        try {
            const promises = toSend.map(s => {
                console.log("year", year, "bimonthly", bimonthly, "totalGrade", totalGrade, "averageGrade", averageGrade, "id_iStQuarter", id_iStQuarter, "id_student", s._id, "id_teacher", id_teacher, "id_matter", id_matter)

                // cria cópias locais corretas para evitar conflito
                let teacher01 = id_teacher;
                let teacher02 = null;

                if (RegentTeacher === teacher01) {
                    teacher02 = RegentTeacher02;
                }
                else if (RegentTeacher02 === teacher01) {
                    teacher02 = RegentTeacher02;
                    teacher01 = RegentTeacher; // troca local sem afetar o global!
                }
                else if (physicalEducation === teacher01) {
                    teacher02 = null;
                }

                return RegisterGradeIstQuarter(
                    year,
                    bimonthly,
                    s.concept,
                    id_iStQuarter,
                    s._id,
                    teacher01,
                    teacher02,
                    id_matter,
                    id_class
                )
            })

            await Promise.all(promises)
            await refreshGradesAndStudents()
            setErrorMessage('')
        }
        catch (err) {
            console.error(err)
            setErrorMessage('Erro ao enviar conceitos. Tente novamente.')
        }
        finally {
            setLoading(false)
        }

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

    /*const Finalyze = () => {
        setLoading(true)
        navigate(-2);
    }*/

    const Return = () => {
        navigate(-2)
    };

    const handleDefineMatter = async () => {
        if (!selectedMatter) {
            alert("Selecione uma matéria.");
            return;
        }

        const Matter = await GetMatterDetails(selectedMatter)

        sessionStorage.setItem("Selectmatter", selectedMatter);
        if (Matter) {
            const nameMatter = Matter.data.name
            sessionStorage.setItem("nameMatter", nameMatter)
            console.log("nameMatter", nameMatter)
        } else {
            setErrorMessage('Erro, Verifique os dados e tente novamente.');
        }
        sessionStorage.setItem("matterChanged", "true");
        window.location.reload();
    };

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    <h2>Grade Bimestral</h2>
                    {open === 'aberto' ? (
                        <>
                            <AreaWrapper>
                                <Area>
                                    <h3>Selecionar Outra Disciplina</h3>

                                    <Select
                                        id="id-matter"
                                        value={selectedMatter}
                                        onChange={(e) => setSelectedMatter(e.target.value)}
                                    >
                                        <option value="">Selecione a disciplina</option>
                                        {matter.map(res => (
                                            <option key={res._id} value={res._id}>
                                                {res.name}
                                            </option>
                                        ))}
                                    </Select>

                                    <Btt02 onClick={handleDefineMatter}>
                                        Definir
                                    </Btt02>
                                </Area>
                            </AreaWrapper>
                            <ContainerStudent>
                                <DataSelected>
                                    <SlActionUndo fontSize={'30px'} onClick={Return} />
                                    <Info>
                                        <p>Bimestre: 1º Bimestre</p>
                                        <p>Disciplina: {Namematter}</p>
                                    </Info>
                                    <LegendBox>
                                        <h3>Legenda</h3>
                                        <p><strong style={{ color: '#1d7f14' }}>A</strong> - Alcançou com êxito as capacidades básicas</p>
                                        <p><strong style={{ color: 'blue' }}>B</strong> - Alcançou satisfatoriamente as capacidades básicas</p>
                                        <p><strong style={{ color: 'orange' }}>C</strong> - Alcançou parcialmente as capacidades básicas</p>
                                        <p><strong style={{ color: 'red' }}>D</strong> - Não alcançou as capacidades básicas</p>
                                    </LegendBox>
                                </DataSelected>
                                {!update_id_grade &&
                                    <>
                                        <List>
                                            {
                                                stdt
                                                    .sort((a, b) => a.name.localeCompare(b.name)) // Ordena em ordem alfabética
                                                    .map(stdtItem => (
                                                        <React.Fragment key={stdtItem._id}>
                                                            <Emp>
                                                                <Span>{stdtItem.name}</Span>
                                                                <Grade>
                                                                    <ContSelect>
                                                                        <p>Conceito:</p>
                                                                        <Select
                                                                            value={stdtItem.concept}
                                                                            onChange={(e) => handleConceptChange(stdtItem._id, e.target.value)}
                                                                            disabled={stdtItem.concept === "-"}  // 🔒 DESATIVA O SELECT SE O CHECKBOX TIVER ATIVADO
                                                                        >
                                                                            <option value="">Selecione</option>
                                                                            <option value="A">A</option>
                                                                            <option value="B">B</option>
                                                                            <option value="C">C</option>
                                                                            <option value="D">D</option>
                                                                        </Select>
                                                                    </ContSelect>
                                                                    {/* CHECKBOX QUE VOCÊ PEDIU */}
                                                                    <label style={{ marginTop: "6px", display: "flex", alignItems: "center" }}>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={stdtItem.concept === "-"}
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    // Envia "-" como conceito
                                                                                    handleConceptChange(stdtItem._id, "-");
                                                                                } else {
                                                                                    // Desmarca → limpa o conceito
                                                                                    handleConceptChange(stdtItem._id, "");
                                                                                }
                                                                            }}
                                                                        />
                                                                        <span style={{ marginLeft: "6px" }}>
                                                                            Não adicionar nota para este aluno
                                                                        </span>
                                                                    </label>
                                                                </Grade>
                                                            </Emp>
                                                            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                                        </React.Fragment>
                                                    ))
                                            }

                                            {/* Botão Finalizar agora envia todos os conceitos preenchidos */}
                                            {stdt.length > 0 && !update_id_grade &&
                                                <Btt01 onClick={handleFinalize}>
                                                    Finalizar
                                                </Btt01>
                                            }
                                        </List>
                                        <ListChecked>

                                            {
                                                checked
                                                    .sort((a, b) => a.id_student.name.localeCompare(b.id_student.name)) // Ordena em ordem alfabética
                                                    .map(stdt => (
                                                        <>
                                                            <Emp
                                                                key={stdt._id}
                                                            >
                                                                <Span>{stdt.id_student.name}</Span>
                                                                <Grade>
                                                                    <p>Conceito: </p>
                                                                    <Conceito grade={stdt.studentGrade}>{stdt.studentGrade}</Conceito>
                                                                    {/*<span>pts</span>*/}
                                                                </Grade>
                                                                <Btt02 onClick={() => startEditing(stdt)} >Editar</Btt02>
                                                            </Emp>
                                                        </>
                                                    ))
                                            }
                                        </ListChecked>
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
                                                    disabled={update_studentGrade === "-"} // 🔥 DESATIVA QUANDO MARCADO
                                                >
                                                    <option value="">Selecione</option>
                                                    <option value="A">A</option>
                                                    <option value="B">B</option>
                                                    <option value="C">C</option>
                                                    <option value="D">D</option>
                                                </Select>
                                                {/*<span>pts</span>*/}
                                                {/* CHECKBOX */}
                                                <label
                                                    style={{
                                                        marginTop: "6px",
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={update_studentGrade === "-"}  // ✔ correto
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setUpdateStudentGrade("-");   // ✔ define sem nota
                                                            } else {
                                                                setUpdateStudentGrade("");    // ✔ limpa conceito
                                                            }
                                                        }}
                                                    />
                                                    <span style={{ marginLeft: "6px" }}>
                                                        Não adicionar nota para este aluno
                                                    </span>
                                                </label>
                                            </Grade>
                                        </Emp>
                                        <Btt02 onClick={saveEdit}>Salvar</Btt02>
                                        <Btt02 onClick={() => setUpdateIdGrade(null)}>Cancelar</Btt02>
                                    </EditContainer>
                                )}
                                {/*!update_id_grade &&
                                    <Btt02 onClick={Finalyze}>
                                        Finalizar
                                    </Btt02>
                                */}
                            </ContainerStudent>
                        </>
                    ) : (
                        <p>1º Bimestre fechado, para editar contate o Diretor ou Supervisor.</p>
                    )}
                    {showMatterUpdated && (
                        <div style={{
                            position: "fixed",
                            top: "120px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#4caf50",
                            color: "#fff",
                            padding: "12px 20px",
                            borderRadius: "8px",
                            zIndex: 9999,
                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                            fontWeight: "bold"
                        }}>
                            A disciplina foi alterada com sucesso.
                        </div>
                    )}
                </ContainerDivs>
            }
        </Container>
    )
}

export default IndexAttendance