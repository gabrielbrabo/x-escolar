import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clssInfo, GetNumericalGrade, GetGradeActivity } from '../../Api'

import {
    Container,
    ContainerDivs,
    //List,
    ListChecked,
    Emp,
    //EmpEdit,
    Span,
    //SpanEdit,
    Conceito,
    //Input,
    //Btt01,
    //Btt02,
    Grade,
    ContainerStudent,
    //EditContainer,
    //ErrorMessage,
    DataSelected,
    //Select,
    LegendBox,
    Info,
    //BoxBtt,
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

    const [/*id_bim*/, setIdBim] = useState('');
    const [/*quarterIdKey*/, setQuarterIdKey] = useState('');

    const [/*id_class*/, setId_class] = useState([])
    //const [studentGrade, setStudentGrade] = useState([]);
    //const [id_iStQuarter, setId_iStQuarter] = useState('');
    const [stdt, setStdt] = useState([])
    const [studentTransferMap, setstudentTransferMap] = useState([]);

    const [checked, setChecked] = useState([])
    const [/*id_teacher*/, setId_teacher] = useState([])
    //const [namestudent, setNamestudent] = useState('')
    //const [update_id_grade, setUpdateIdGrade] = useState(null);
    //const [update_studentGrade, setUpdateStudentGrade] = useState(null);
    const [loading, setLoading] = useState(false);
    //const [errorMessage, setErrorMessage] = useState([]);

    //const [excludedStudents, setExcludedStudents] = useState([]);
    //const [grades, setGrades] = useState([]); // Estado para armazenar as notas individuais

    //const [RegentTeacher, setclassRegentTeacher] = useState([]);
    //const [RegentTeacher02, setclassRegentTeacher02] = useState([]);
    //const [physicalEducation, setphysicalEducationTeacher] = useState([]);

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

            //setclassRegentTeacher(sessionData.classRegentTeacher);
            //setclassRegentTeacher02(sessionData.classRegentTeacher02);
            //setphysicalEducationTeacher(sessionData.physicalEducationTeacher);
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
                   // const attRealized = await resGrade.data.data.map(res => res.id_student._id);
                    const checkedStudent = resGrade.data.data; // lista dos alunos com nota lançada

                    const resClass = await clssInfo(idClass);
                    console.log('cont stdt', resClass.data.data);

                    // Ordena os estudantes da turma por nome
                    const student = resClass.data.data
                        .find(res => res)?.id_student
                        ?.sort((a, b) => a.name.localeCompare(b.name)) || [];

                    const transferStdtMap = resClass.data.data.find(res => {
                        return res
                    }).transferStudents
                    setstudentTransferMap(transferStdtMap)

                    setChecked(checkedStudent);
                    setStdt(student);


                    console.log("resGrade", checkedStudent)
                    //console.log("students", student)

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
    //console.log("stdt", stdt)

    console.log("totalGrade", totalGrade,)

    const Return = () => {
        navigate(-1)
    };

    const normalizeString = (str) => {
        return str
            .normalize("NFD") // Separa caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/[^\w\s]/gi, "") // Remove pontuações
            .toUpperCase(); // Converte para maiúsculas
    };

    console.log('studentTransferMap', studentTransferMap)

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
                        {
                            <>
                                {checked.length > 0 ? (

                                    <ListChecked>
                                        <p>Total de Alunos: {stdt.length}</p>
                                        <p>Alunos Tranferidos: {studentTransferMap.length}</p>
                                        <p>Notas Adicionadas: {checked.length}</p>
                                        {
                                            checked
                                                .sort((a, b) => normalizeString(a.id_student.name).localeCompare(normalizeString(b.id_student.name))) // Ordena em ordem alfabética
                                                .map(stdt => {
                                                    const studentGrade = (stdt.studentGrade.toString().replace(',', '.')) || '-';
                                                    let gradeColor = 'blue'; // Padrão: azul para notas iguais ou maiores que a média

                                                    if (studentGrade < (totalGrade * 0.6)) {
                                                        gradeColor = 'red'; // Se a nota for menor que a média, fica vermelha
                                                    } else if (studentGrade >= (totalGrade * 0.9)) {
                                                        gradeColor = '#1d7f14'; // Se for igual ou maior que 80% da nota total, fica verde
                                                    }

                                                    return (
                                                        <Emp key={stdt._id}>
                                                            <Span>{stdt.id_student.name}</Span>
                                                            <Grade className='nota'>
                                                                <Conceito style={{ color: gradeColor }}>
                                                                    {studentGrade}
                                                                </Conceito>
                                                            </Grade>

                                                        </Emp>
                                                    );
                                                })
                                        }
                                        <ToGoBack onClick={Return}>
                                            <SignMessageButtonText>Voltar para as</SignMessageButtonText>
                                            <SignMessageButtonTextBold>Avaliações</SignMessageButtonTextBold>
                                        </ToGoBack>
                                    </ListChecked>
                                ) : (
                                    <p>Não há notas adicionadas!</p>
                                )
                                }
                            </>
                        }
                    </ContainerStudent>
                </ContainerDivs>
            }
        </Container>
    )
}

export default IndexAttendance