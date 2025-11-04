import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clssInfo, FinalConcepts, indexGrades, /*updateGrade,*/ GetGradeFinalConcepts, GetMatter, GetMatterDetails, FinalConceptsEdit, DestroyFinalGrade } from '../../Api'

import {
    Container,
    ContainerDivs,
    List,
    ListChecked,
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

    InputArea,
    Input,
    //Button,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    Label,
    LegendBox,
    Info,
    DivBimTable,
    DivBimRow,
    DivBimHeader,
    DivBimCell,
    BoxButton,
    EmpEdit,
    BlurBackground,
    ModalContainer,
} from './style';

import {
} from '../../components/Inputs'
import LoadingSpinner from '../../components/Loading'

import { SlActionUndo } from "react-icons/sl";

const Finalconcepts = () => {

    const navigate = useNavigate()
    const [open, setopen] = useState('aberto')
    const [Namematter, setNameMatter] = useState([])
    const [year, setYear] = useState('');
    const [$Class, set$Class] = useState(null);
    const [id_matter, setSelectMatter] = useState('');
    const [matter, setMatter] = useState([]);
    const [id_employee, setid_employee] = useState('');
    const [id_class, setId_class] = useState('')
    const [studentGrade, setStudentGrade] = useState('');
    const [stdt, setStdt] = useState([])
    const [checked, setChecked] = useState([])
    const [id_teacher, setId_teacher] = useState([])
    const [namestudent, setNamestudent] = useState('')
    const [update_id_grade, setUpdateIdGrade] = useState(null);
    const [update_studentGrade, setUpdateStudentGrade] = useState(null);
    // const [Selectmatter, setSelectMatter] = useState([])
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const [iStQuarter, setiStQuarter] = useState([]);
    const [iiNdQuarter, setiiNdQuarter] = useState([]);
    const [iiiRdQuarter, setIIIrdQuarter] = useState([]);
    const [ivThQuarter, setIVthQuarter] = useState([]);

    const [RegentTeacher, setclassRegentTeacher] = useState([]);
    const [RegentTeacher02, setclassRegentTeacher02] = useState([]);
    const [physicalEducation, setphysicalEducationTeacher] = useState([]);

    const [confirmModal, setConfirmModal] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);

            const idSchool = sessionStorage.getItem("id-school");
            const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
            const classRegentTeacher02 = sessionStorage.getItem("classRegentTeacher02");
            const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");
            const Id_employee = localStorage.getItem("Id_employee");
            const id_teacher = JSON.parse(localStorage.getItem("Id_employee"));
            //const currentYear = new Date().getFullYear().toString();
            const id_cla$$ = sessionStorage.getItem("class-info");
            const Selectmatt = sessionStorage.getItem("Selectmatt");

            if (Selectmatt) {
                setSelectMatter(Selectmatt)
            }

            setclassRegentTeacher(JSON.parse(classRegentTeacher))
            setclassRegentTeacher02(JSON.parse(classRegentTeacher02))
            setphysicalEducationTeacher(JSON.parse(physicalEducationTeacher))

            const resClass = await clssInfo(id_cla$$);
            set$Class(resClass)
            const $yearClass = resClass.data.data.find(clss => {
                return clss.year
            })
            setid_employee(id_teacher);
            setYear($yearClass.year); // Certifique-se de que o ano é definido aqui.
            setId_class(id_cla$$);
            setId_teacher(JSON.parse(Id_employee))

            if (resClass?.data?.data && resClass.data.data.length > 0) {
                const turma = resClass.data.data[0];
                console.log("turma:", turma);

                if (id_teacher !== physicalEducationTeacher) {
                    setopen(turma.dailyStatus["4º BIMESTRE"].regentTeacher);
                } else {
                    setopen(turma.dailyStatus["4º BIMESTRE"].physicalEducationTeacher);
                }
            } else {
                console.warn("❌ resClass veio vazio ou sem dados:", resClass);
            }

            if (year && id_class && id_matter) {
                const grades = await indexGrades(year, id_class, id_matter)
                if (grades) {
                    console.log("grades", grades.data.data);

                    // Filtra os objetos para cada bimestre
                    const firstQuarter = grades.data.data.filter(res => res.bimonthly === "1º BIMESTRE");
                    const secondQuarter = grades.data.data.filter(res => res.bimonthly === "2º BIMESTRE");
                    const thirdQuarter = grades.data.data.filter(res => res.bimonthly === "3º BIMESTRE");
                    const fourthQuarter = grades.data.data.filter(res => res.bimonthly === "4º BIMESTRE");

                    // Atualiza os estados com os arrays filtrados
                    setiStQuarter(firstQuarter);
                    setiiNdQuarter(secondQuarter);
                    setIIIrdQuarter(thirdQuarter)
                    setIVthQuarter(fourthQuarter)

                    console.log("1º Bimestre", firstQuarter);
                    console.log("2º Bimestre", secondQuarter);
                }
            }

            if (id_matter && year) {
                console.log("year", year, "id_matter", id_matter)
                const resGrade = await GetGradeFinalConcepts(year, id_matter)
                //const resClass = $Class//await clssInfo(id_class)
                //console.log('resCLass', resClass, "$Class", $Class)
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

                const Matter = await GetMatterDetails(id_matter)
                if (Matter) {
                    setNameMatter(Matter.data.name)
                    console.log("nameMatter", Matter)
                } else {
                    setErrorMessage('Erro, Verifique os dados e tente novamente.');
                }

                setStdt(student)
                setChecked(checkedStudent)

                sessionStorage.setItem("Selectmatt", id_matter)
                console.log("resGrade", resGrade.data)
                console.log("GradeRealized", GradeRealized)
                console.log("checkedStudent", checkedStudent)
                console.log("student", student)
            }

            const res = await GetMatter(JSON.parse(idSchool));
            if (classRegentTeacher === Id_employee) {
                const filterMatter = res.data.data.filter(res => {
                    if (res.name !== 'EDUCAÇÃO FÍSICA') {
                        if (res !== null) {
                            return res
                        }
                    }
                    return null
                })
                setMatter(filterMatter);
                console.log("filterMatter professor regent", filterMatter)
            } else if (classRegentTeacher02 === Id_employee) {
                const filterMatter = res.data.data.filter(res => {
                    if (res.name !== 'EDUCAÇÃO FÍSICA') {
                        if (res !== null) {
                            return res
                        }
                    }
                    return null
                })
                setMatter(filterMatter);
                console.log("filterMatter professor regent", filterMatter)
            } else if (physicalEducationTeacher === Id_employee) {
                const filterMatter = res.data.data.filter(res => {
                    if (res.name === 'EDUCAÇÃO FÍSICA') {
                        if (res !== null) {
                            return res
                        }
                    }
                    return null
                })
                setMatter(filterMatter);
                console.log("filterMatter", filterMatter)
            }

            setLoading(false);
        })();
    }, [id_class, id_matter, year,]);

    console.log("checked", checked)
    console.log("stdt", stdt)

    console.log("iStQuarter", iStQuarter)
    console.log("iiNdQuarter", iiNdQuarter)
    console.log("iiiRdQuarter", iiiRdQuarter)
    console.log("ivThQuarter", ivThQuarter)

    const handleGrade = async (stdt) => {
        setLoading(true)

        console.log("year", year)
        const id_student = stdt._id
        console.log("year", year, "studentGrade", studentGrade, "id_student", id_student, "id_teacher", id_teacher, "id_matter", id_matter)
        if (RegentTeacher === id_teacher) {

            const id_teacher02 = RegentTeacher02
            const res = await FinalConcepts(year, studentGrade, id_matter, id_employee, id_teacher02, id_student, id_class)
            if (res) {
                const resGrade = await GetGradeFinalConcepts(year, id_matter)
                const resClass = $Class//await clssInfo(id_class)
                console.log('resCLass', resClass, "$Class", $Class)
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
            const res = await FinalConcepts(year, studentGrade, id_matter, RegentTeacher, id_teacher02, id_student, id_class)
            if (res) {
                const resGrade = await GetGradeFinalConcepts(year, id_matter)
                const resClass = $Class//await clssInfo(id_class)
                console.log('resCLass', resClass, "$Class", $Class)
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
            const res = await FinalConcepts(year, studentGrade, id_matter, id_employee, id_teacher02, id_student, id_class)

            if (res) {
                const resGrade = await GetGradeFinalConcepts(year, id_matter)
                const resClass = $Class//await clssInfo(id_class)
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
    }

    const startEditing = (stdt) => {
        setUpdateStudentGrade(stdt.studentGrade);
        setUpdateIdGrade(stdt._id);
        setNamestudent(stdt)
    };

    const saveEdit = async () => {
        setLoading(true)
        console.log("update_id_grade", update_id_grade, "update_studentGrade", update_studentGrade)
        await FinalConceptsEdit(update_id_grade, update_studentGrade)
        window.location.reload()
        setLoading(false)
    };

    const Finalyze = () => {
        setLoading(true)
        navigate(-1);
    }

    const Return = () => {
        navigate(-1)
    };

    const handleDeleteClick = (grade) => {
        setSelectedGrade(grade);
        setConfirmModal(true);
    };

    const handleConfirm = async () => {
        if (selectedGrade) {
            console.log("selected", selectedGrade._id)
            await DestroyFinalGrade(selectedGrade._id);
            window.location.reload(); // 🔄 Recarrega a página inteira
        }
        setConfirmModal(false);
        setSelectedGrade(null);
    };

    const handleCancel = () => {
        setConfirmModal(false);
        setSelectedGrade(null);
    };

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>

                    <ContainerDivs>
                        <h2>Grade Final</h2>
                        {open === 'aberto' ? (
                            <ContainerStudent>
                                {id_matter &&
                                    <DataSelected>
                                        <SlActionUndo fontSize={'30px'} onClick={Return} />
                                        <Info>
                                            <p>Grade Final</p>
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
                                }
                                {stdt.length > 0 && !update_id_grade &&
                                    <>
                                        <List>
                                            {
                                                stdt
                                                    .sort((a, b) => a.name.localeCompare(b.name)) // Ordena em ordem alfabética
                                                    .map(stdt =>
                                                        <>
                                                            <Emp
                                                                key={stdt._id}
                                                            >
                                                                <Span>{stdt.name}</Span>
                                                                <DivBimTable>
                                                                    <DivBimRow>
                                                                        <DivBimHeader>1º Bim</DivBimHeader>
                                                                        <DivBimCell grade={iStQuarter.find((q) => q.id_student._id === stdt._id)?.studentGrade || "N/A"}>
                                                                            {iStQuarter.find((q) => q.id_student._id === stdt._id)?.studentGrade || "N/A"}
                                                                        </DivBimCell>
                                                                    </DivBimRow>
                                                                    <DivBimRow>
                                                                        <DivBimHeader>2º Bim</DivBimHeader>
                                                                        <DivBimCell grade={iiNdQuarter.find((q) => q.id_student._id === stdt._id)?.studentGrade || "N/A"}>
                                                                            {iiNdQuarter.find((q) => q.id_student._id === stdt._id)?.studentGrade || "N/A"}
                                                                        </DivBimCell>
                                                                    </DivBimRow>
                                                                    <DivBimRow>
                                                                        <DivBimHeader>3º Bim</DivBimHeader>
                                                                        <DivBimCell grade={iiiRdQuarter.find((q) => q.id_student._id === stdt._id)?.studentGrade || "N/A"}>
                                                                            {iiiRdQuarter.find((q) => q.id_student._id === stdt._id)?.studentGrade || "N/A"}
                                                                        </DivBimCell>
                                                                    </DivBimRow>
                                                                    <DivBimRow>
                                                                        <DivBimHeader>4º Bim</DivBimHeader>
                                                                        <DivBimCell grade={ivThQuarter.find((q) => q.id_student._id === stdt._id)?.studentGrade || "N/A"}>
                                                                            {ivThQuarter.find((q) => q.id_student._id === stdt._id)?.studentGrade || "N/A"}
                                                                        </DivBimCell>
                                                                    </DivBimRow>
                                                                </DivBimTable>
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
                                                    )
                                            }
                                        </List>
                                    </>
                                }

                                {
                                    checked.length > 0 && !update_id_grade &&
                                    <>
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
                                                                <DivBimTable>
                                                                    <DivBimRow>
                                                                        <DivBimHeader>1º Bim</DivBimHeader>
                                                                        <DivBimCell grade={iStQuarter.find((q) => q.id_student._id === stdt.id_student._id)?.studentGrade || "N/A"}>
                                                                            {iStQuarter.find((q) => q.id_student._id === stdt.id_student._id)?.studentGrade || "N/A"}
                                                                        </DivBimCell>
                                                                    </DivBimRow>
                                                                    <DivBimRow>
                                                                        <DivBimHeader>2º Bim</DivBimHeader>
                                                                        <DivBimCell grade={iiNdQuarter.find((q) => q.id_student._id === stdt.id_student._id)?.studentGrade || "N/A"}>
                                                                            {iiNdQuarter.find((q) => q.id_student._id === stdt.id_student._id)?.studentGrade || "N/A"}
                                                                        </DivBimCell>
                                                                    </DivBimRow>
                                                                    <DivBimRow>
                                                                        <DivBimHeader>3º Bim</DivBimHeader>
                                                                        <DivBimCell grade={iiiRdQuarter.find((q) => q.id_student._id === stdt.id_student._id)?.studentGrade || "N/A"}>
                                                                            {iiiRdQuarter.find((q) => q.id_student._id === stdt.id_student._id)?.studentGrade || "N/A"}
                                                                        </DivBimCell>
                                                                    </DivBimRow>
                                                                    <DivBimRow>
                                                                        <DivBimHeader>4º Bim</DivBimHeader>
                                                                        <DivBimCell grade={ivThQuarter.find((q) => q.id_student._id === stdt.id_student._id)?.studentGrade || "N/A"}>
                                                                            {ivThQuarter.find((q) => q.id_student._id === stdt.id_student._id)?.studentGrade || "N/A"}
                                                                        </DivBimCell>
                                                                    </DivBimRow>
                                                                    <DivBimRow>
                                                                        <DivBimHeader>Final</DivBimHeader>
                                                                        <DivBimCell grade={stdt.studentGrade}>{stdt.studentGrade}</DivBimCell>
                                                                    </DivBimRow>
                                                                </DivBimTable>
                                                                <Btt02 onClick={() => startEditing(stdt)} >Editar</Btt02>
                                                                <Btt02 onClick={() => handleDeleteClick(stdt)}>Deletar</Btt02>
                                                            </Emp>
                                                        </>
                                                    ))
                                            }

{confirmModal && (
                                            <BlurBackground>
                                                <ModalContainer>
                                                    <h3>
                                                        Tem certeza que deseja deletar o conceito de{" "}
                                                        <strong>{selectedGrade?.id_student?.name}</strong>?
                                                    </h3>
                                                    <div>
                                                        <button style={{
                                                            backgroundColor: 'red',
                                                            color: 'white'
                                                        }}
                                                            onClick={handleConfirm}
                                                        >Sim</button>
                                                        <button onClick={handleCancel}>Não</button>
                                                    </div>
                                                </ModalContainer>
                                            </BlurBackground>
                                        )}
                                        </ListChecked>
                                    </>
                                }

                                {update_id_grade && (
                                    <EditContainer>
                                        <h3>Editando Nota</h3>
                                        {console.log("editingStudent", namestudent.id_student.name)}
                                        <EmpEdit>
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
                                        </EmpEdit>
                                        <BoxButton>
                                            <Btt02 onClick={saveEdit}>Salvar</Btt02>
                                            <Btt02 onClick={() => setUpdateIdGrade(null)}>Cancelar</Btt02>
                                        </BoxButton>

                                    </EditContainer>
                                )}
                                {!update_id_grade && id_matter &&
                                    <Btt02 onClick={Finalyze}>
                                        Finalizar
                                    </Btt02>
                                }
                            </ContainerStudent>
                        ) : (
                            <p>4º Bimestre fechado, para editar contate o Diretor ou Supervisor.</p>
                        )}
                    </ContainerDivs>

                    {
                        stdt.length <= 0 && checked.length <= 0
                        &&
                        <ContainerDivs>
                            <h2>Selecione a Disciplina</h2>
                            <InputArea>
                                <Input>
                                    <Label>Disciplina</Label>
                                    <Select
                                        id="id-matter"
                                        value={id_matter}
                                        onChange={(e) => setSelectMatter(e.target.value)}
                                    >
                                        <option value="">Selecione</option>
                                        {matter.map(res => (
                                            <option value={res._id}>{res.name}</option>
                                        ))
                                        }
                                    </Select>
                                </Input>
                                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                {/*<Button onClick={handleList}>Definir</Button>*/}
                                <ToGoBack onClick={Finalyze}>
                                    <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                                    <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                                </ToGoBack>
                            </InputArea>
                        </ContainerDivs>
                    }
                </>
            }
        </Container >
    )
}

export default Finalconcepts