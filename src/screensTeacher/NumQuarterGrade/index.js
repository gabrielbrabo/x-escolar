import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clssInfo, RegisterNumericalGrade, GetNumericalGrade, GetGradeActivity, updateNumericalGrade } from '../../Api'

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
    BoxDescr
} from './style';

import {
} from '../../components/Inputs'
import LoadingSpinner from '../../components/Loading'

import { SlActionUndo } from "react-icons/sl";

const IndexAttendance = () => {

    const navigate = useNavigate()
    // const [open, setopen] = useState()
    const [Namematter, setNameMatter] = useState([])
    const [year, setYear] = useState('');
    const [Descricao, setDescricao] = useState([]);
    const [tipo, setTipo] = useState([]);
    const [bimonthly, setBimonthly] = useState([]);
    const [totalGrade, setTotalGrade] = useState([]);
    //const [averageGrade, setAverageGrade] = useState([]);
    const [id_matter, setMatter] = useState('');
    const [idActivity, setIdActivity] = useState('');

    const [id_bim, setIdBim] = useState('');
    const [quarterIdKey, setQuarterIdKey] = useState('');

    const [id_class, setId_class] = useState([])
    //const [studentGrade, setStudentGrade] = useState([]);
    //const [id_iStQuarter, setId_iStQuarter] = useState('');
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

    useEffect(() => {
        (async () => {
            setLoading(true);

            const sessionData = {
                idActivity: sessionStorage.getItem("id-activity"),
                classRegentTeacher: JSON.parse(sessionStorage.getItem("classRegentTeacher")),
                classRegentTeacher02: JSON.parse(sessionStorage.getItem("classRegentTeacher02")),
                physicalEducationTeacher: JSON.parse(sessionStorage.getItem("physicalEducationTeacher")),
                currentYear: sessionStorage.getItem("yearGrade"),
                idMatter: sessionStorage.getItem("Selectmatter")
            };

            const idTeacher = JSON.parse(localStorage.getItem("Id_employee"));

            setclassRegentTeacher(sessionData.classRegentTeacher);
            setclassRegentTeacher02(sessionData.classRegentTeacher02);
            setphysicalEducationTeacher(sessionData.physicalEducationTeacher);
            setMatter(sessionData.idMatter);
            setYear(sessionData.currentYear);
            setIdActivity(sessionData.idActivity);
            setId_teacher(idTeacher);
            if (idActivity) {
                const res = await GetGradeActivity(idActivity);
                if (res.data.data) {
                    console.log('activity$$$', res.data);
                    console.log("Resposta completa:", res.data.data[0]);


                    const firstActivity = res.data.data[0] || {};
                    const idClass = firstActivity.id_class?._id;
                    setId_class(idClass);
                    const resGrade = await GetNumericalGrade(idActivity)
                    const attRealized = await resGrade.data.data.map(res => res.id_student._id);
                    const checkedStudent = await resGrade.data.data.map(res => {
                        return res
                    })
                    const resClass = await clssInfo(idClass);
                    console.log('cont stdt', resClass.data.data)
                    const student = await resClass.data.data.find(res => res).id_student
                        .filter(studentId => !attRealized.includes(studentId._id))
                        .sort((a, b) => a.name.localeCompare(b.name)); // Ordena `stdt` em ordem alfabética

                        setChecked(checkedStudent)
                        setStdt(student);

                    console.log("resGrade", checkedStudent)
                    console.log("students", student)

                    setDescricao(res.data.data.map(res => res.descricao));
                    setTotalGrade(res.data.data.map(res => res.valor));
                    const firstBimonthly = res.data.data.find(item => item.bimonthly !== null && item.bimonthly !== undefined);
                    setBimonthly(firstBimonthly ? firstBimonthly.bimonthly : "");
                    setNameMatter(res.data.data.map(res => res.id_matter.name));
                    setTipo(res.data.data.map(res => res.tipo));

                    const bimestreMapping = {
                        "1º BIMESTRE": "id_iStQuarter",
                        "2º BIMESTRE": "id_iiNdQuarter",
                        "3º BIMESTRE": "id_iiiRdQuarter",
                        "4º BIMESTRE": "id_ivThQuarter",
                        "5º BIMESTRE": "id_vThQuarter",
                        "6º BIMESTRE": "id_viThQuarter",
                    };

                    const quarterIdKey = bimestreMapping[firstActivity.bimonthly];
                    setQuarterIdKey(quarterIdKey);

                    if (quarterIdKey) {
                        const idBim = firstActivity[quarterIdKey]?._id;
                        setIdBim(idBim);
                        console.log("idBim", idBim);
                    } else {
                        console.error("Bimestre inválido:", firstActivity.bimonthly);
                    }
                }

                setLoading(false);
            }

            setLoading(false);
        })();
    }, [year, id_matter, idActivity]);

    console.log("checked", checked)
    console.log("stdt", stdt)

    console.log("totalGrade", totalGrade,)


    const handleGrade = async () => {
        setLoading(true)
        //console.log("grades111", grades)
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

        setLoading(false)
    }

    const startEditing = (stdt) => {
        setUpdateStudentGrade(stdt.studentGrade);
        // setOriginalValor(stdt.studentGrade); // Salva o valor antes da edição
        setUpdateIdGrade(stdt._id);
        setNamestudent(stdt)
    };

    const saveEdit = async () => {
        setLoading(true);

        const editedGrade = parseFloat(update_studentGrade.toString().replace(',', '.')) || 0;
        const maxGrade = parseFloat(totalGrade.toString().replace(',', '.')) || 0;

        console.log("Nota editada:", editedGrade);
        console.log("Nota máxima:", maxGrade);

        if (editedGrade > maxGrade) {
            setErrorMessage('Erro: A nota não pode ultrapassar o valor total da avaliação.');
        } else {
            await updateNumericalGrade(update_id_grade, editedGrade);
            window.location.reload();
        }

        setLoading(false);
    };


    const Return = () => {
        navigate(-1)
    };

    const handleInputChange = (e, studentId) => {

        if (!e || !e.target) {
            console.error("Erro: Evento não recebido corretamente!", e);
            return;
        }

        console.log("Evento recebido:", e); // 🟢 Verifica se o evento está chegando

        const inputValue = e.target.value;

        if (inputValue === undefined) {
            console.error("Erro: e.target.value está indefinido!", e.target);
            return;
        }

        console.log("Valor digitado:", inputValue); // 🔥 Isso precisa aparecer!

        let value = inputValue.replace(".", ",").replace(/[^0-9,]/g, "");
        console.log("Valor formatado:", value)
        console.log("Teste studentId:", studentId);

        if ((value.match(/,/g) || []).length <= 1) {
            const numericValue = parseFloat(value.replace(",", "."));

            /* if (isNaN(numericValue) || numericValue > totalGrade) {
                 alert("Nota inválida:", numericValue);
                 return setGrades(prevGrades => ({ ...prevGrades, studentId: "", })); // Limpa o campo
                 
             }*/

            if (RegentTeacher === id_teacher) {
                const id_teacher02 = RegentTeacher02
                setGrades(prevGrades => {
                    console.log("Antes da atualização:", prevGrades);
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

                            console.log("Depois da atualização:", updatedGrades);
                            return updatedGrades;
                        } else {

                            console.log("Nova lista de notas:", prevGrades);
                            // Se não existir, adiciona um novo objeto
                            return [...prevGrades, {
                                studentId,
                                idActivity,
                                value,
                                year,
                                bimonthly,
                                [quarterIdKey]: id_bim,
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
                                idActivity,
                                value,
                                year,
                                bimonthly,
                                [quarterIdKey]: id_bim,
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
                                idActivity,
                                value,
                                year,
                                bimonthly,
                                [quarterIdKey]: id_bim,
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
                    {/*<h2>Grade Bimestral</h2>*/}
                    <ContainerStudent>
                        <DataSelected>
                            <SlActionUndo fontSize={'30px'} onClick={Return} />
                            <BoxDescr>
                                <Info>
                                    <p>Descrição: {Descricao}</p>
                                    <p>Disciplina: {Namematter}</p>
                                    <p>Tipo: {tipo}</p>
                                    <p>Bimestre: {bimonthly}</p>
                                </Info>
                                <LegendBox>
                                    <h3>Legenda</h3>
                                    <p>Valor da Avaliação: <strong style={{ color: '#1d7f14' }}>{totalGrade}</strong></p>
                                </LegendBox>
                            </BoxDescr>
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
                                                                max={totalGrade} // Impede valores maiores no campo
                                                                onChange={(e) => {

                                                                    let numericValue = parseFloat(e.target.value);

                                                                    // Impede que valores maiores que totalGrade sejam digitados
                                                                    if (numericValue > totalGrade) {
                                                                        e.target.value = ""; // Limpa o campo se ultrapassar
                                                                        return;
                                                                    }

                                                                    handleInputChange(e, stdt._id)
                                                                    console.log('dados a ser enviados', e.target.value, stdt._id)
                                                                }

                                                                }
                                                            />
                                                        </Grade>
                                                        {/*<Btt01 onClick={() => handleGrade(stdt)}>Definir</Btt01>*/}
                                                    </Emp>
                                                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                                </>
                                            ))
                                    }
                                    {stdt.length > 0
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
                                                    const studentGrade = (stdt.studentGrade.toString().replace(',', '.')) || 0;
                                                    let gradeColor = 'blue'; // Padrão: azul para notas iguais ou maiores que a média

                                                    if (studentGrade < (totalGrade * 0.6)) {
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
                                            <SignMessageButtonText>Voltar para as</SignMessageButtonText>
                                            <SignMessageButtonTextBold>Avaliações</SignMessageButtonTextBold>
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
                                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

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
                </ContainerDivs>
            }
        </Container>
    )
}

export default IndexAttendance