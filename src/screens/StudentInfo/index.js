import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    StdtInfo,
    //DestroyStudent,
    getIstQuarter,
    getIIndQuarter,
    getIIIrdQuarter,
    getIVthQuarter,
    getVthQuarter,
    getVIthQuarter,
    updateStatus,
    getSchoolYear,
    GetNumGrade,
    createHistoryGrade,
    GetMatter,
    DestroyNumericalGrade,
    updateNumericalGrade,
    clssInfo,
    getAssessmentRegime
} from '../../Api'
import Calendar from '../../components/CalendarUI/Calendar'

import {
    Container,
    //List,
    Emp,
    Span,
    ContainerDivs,
    Pro,
    //ProfilePhoto,
    ProfileInfo,
    EmployeeInfo,
    DivButtomEdit,
    Btt02,
    Btt01,
    ButtonCancel,
    //AddMatterSection,
    //WarningBox,
    Button,
    //ButtonRemove,
    //ActionButtons,
    //FormFilter,
    //FormSearch
    Input,
    Label,
    Select,
    ErrorMessage,
    ContainerCalendar,
    TableRow,
    //TableCell,
    Chip,
    //MenuItem,
    //TableBody,
    ModalOverlay,
    ModalContent,
    HistoricGradeContainer,
    HistoricGradeRow,
    HistoricModalContent,
    HistoricModalOverlay,
    EmptyHistoricMessage,
    // HistoricModalHeader,
    AddHistoricButton,
    ModalActions,
    ButtonSecondary,
    BlurBackground,
    ModalContainer,
    EditContainer,
    EmpEdit,
    Grade,
    EditOverlay,
    HeaderRow,
    DivTopActions,
    SchoolDivider
} from './style';

/*import {
AreaEmp,
InputEmp,
Select
} from '../../components/Inputs'

import {
Btt02, 
}from '../../components/Buttons';*/
import LoadingSpinner from '../../components/Loading'
//import { DatePicker } from "@mui/x-date-pickers";
//import dayjs from "dayjs";

const Student = () => {

    const navigate = useNavigate()
    const [assessmentFormat, setassessmentFormat] = useState('');
    //const currentYear = new Date().getFullYear().toString();
    const [I, setI] = useState([])
    const [II, setII] = useState([])
    const [III, setIII] = useState([])
    const [IV, setIV] = useState([])
    const [V, setV] = useState([])
    const [VI, setVI] = useState([])
    //const [year, setYear] = useState([])
    const [Clss, setClss] = useState([])
    const [student, setStudent] = useState([])
    const [Selectbimonthly, setSelectbimonthly] = useState([])
    const [bimonthly, setbimonthly] = useState([])
    const [Regent, setRegent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [removeStudent, setRemoveStudent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageHistoric, setErrorMessageHistoric] = useState('');

    const [positionAtSchool, setPositionAtSchool] = useState('');
    const [positionAtEducationDepartment, setPositionAtEducationDepartment] = useState('')

    const [selectedStatus, setSelectedStatus] = useState({});
    const [exitDate, setExitDate] = useState(null);

    const [selectedBimId, setSelectedBimId] = useState("");      // guarda o _id
    const [selectedBimName, setSelectedBimName] = useState("");  // guarda o nome do bimestre

    const [openNoClassModal, setOpenNoClassModal] = useState(false);

    const [resHistoricGrade, setresHistoricGrade] = useState()
    const [openHistoricModal, setOpenHistoricModal] = useState(false);
    const [openAddHistoric, setOpenAddHistoric] = useState(false);

    const [matter, setMatter] = useState([])
    const [Selectmatter, setSelectMatter] = useState([])
    const [$schoolYea, set$schoolYea] = useState()
    const [historicGrade, setHistoricGrade] = useState()
    const [SelectbihistoricGrades, setSelectbihistoricGrades] = useState([])
    const [open, setopen] = useState(null)

    const [confirmModal, setConfirmModal] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [update_studentGrade, setUpdateStudentGrade] = useState(null);

    const [update_id_grade, setUpdateIdGrade] = useState(null);

    const [assessmentRegime, setAssessmentRegime] = useState('');

    const { id_student } = useParams()
    //console.log(currentYear)

    useEffect(() => {
        (async () => {
            setLoading(true);

            const idSchool = sessionStorage.getItem("id-school");

            const response = await getAssessmentRegime(JSON.parse(idSchool))

            if (response?.data?.data) {
                setAssessmentRegime(response.data.data)
                sessionStorage.setItem('assessmentRegime', response.data.data);
            }

            const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
            setassessmentFormat($assessmentFormat)

            const positionAtEducationDepartment = localStorage.getItem("positionAtEducationDepartment")
            setPositionAtEducationDepartment(positionAtEducationDepartment)

            // const id_student = sessionStorage.getItem("StudentInformation");
            const schoolYear = await getSchoolYear(JSON.parse(idSchool))
            console.log("schoolYear", schoolYear)
            console.log("idSchool", idSchool)
            console.log("idStudent", id_student)

            if (!idSchool || !id_student) {
                console.error("Dados faltando: idSchool ou id_student");
                return;
            }

            const position = localStorage.getItem('position_at_school');
            setPositionAtSchool(position);
            //sessionStorage.removeItem('StudentInformation')
            sessionStorage.setItem("StudentInformation", id_student)
            const res = await StdtInfo(id_student)
            if (res && res.data) {
                setStudent(res.data.data);
            } else {
                console.error("Resposta inesperada da API:", res);
            }


            const clss = await res.data.data.find(res => {
                return res
            }).id_class.map(res => {
                if (res.year === JSON.stringify(schoolYear.data.data)) {
                    return (res)
                } else {
                    return null
                }
            }).filter(res => {
                if (! null) {
                    return (res)
                } else {
                    return null
                }
            })
            console.log("clss", clss)
            setClss(clss)
            const regent = clss.map(res => {
                return res.classRegentTeacher
            })
            console.log('regent', regent)
            if (regent.length > 0) {
                sessionStorage.setItem("RegentTeacher", regent)
                setRegent(true)
            }


            const IstQuarter = await getIstQuarter(schoolYear.data.data, JSON.parse(idSchool))
            console.log("IstQuarter", IstQuarter)
            const IIndQuarter = await getIIndQuarter(schoolYear.data.data, JSON.parse(idSchool))
            const IIIrdQuarter = await getIIIrdQuarter(schoolYear.data.data, JSON.parse(idSchool))
            const IVthQuarter = await getIVthQuarter(schoolYear.data.data, JSON.parse(idSchool))
            const VthQuarter = await getVthQuarter(schoolYear.data.data, JSON.parse(idSchool))
            const VIthQuarter = await getVIthQuarter(schoolYear.data.data, JSON.parse(idSchool))

            const i = IstQuarter.data.data.find(res => res) || null;
            const ii = IIndQuarter.data.data.find(res => res) || null;
            const iii = IIIrdQuarter.data.data.find(res => res) || null;
            const iv = IVthQuarter.data.data.find(res => res) || null;
            const v = VthQuarter.data.data.find(res => res) || null;
            const vi = VIthQuarter.data.data.find(res => res) || null;

            //const res = await GetMatter(JSON.parse(idSchool));

            setbimonthly([i, ii, iii, iv, v, vi].filter(res => res !== null));

            if (i !== null) {
                setI(i._id);
            }
            if (ii !== null) {
                setII(ii._id);
            }
            if (iii !== null) {
                setIII(iii._id);
            }
            if (iv !== null) {
                setIV(iv._id);
            }
            if (v !== null) {
                setV(v._id);
            }
            if (vi !== null) {
                setVI(vi._id);
            }

            setLoading(false);

            const resMatter = await GetMatter(JSON.parse(idSchool));

            const filterMatter = resMatter.data.data.filter(res => {
                return res
            })

            const physical = clss.map(res => {
                return res.physicalEducationTeacher
            })
            console.log('physical', physical)
            if (regent.length > 0) {
                sessionStorage.setItem("PhysicalEducationTeacher", physical)
                setRegent(true)
            }
            setMatter(filterMatter);
            set$schoolYea(schoolYear.data.data);
        })()
        setLoading(false);
    }, [id_student,])

    if (student) {
        const stdt = student.map(res => {
            return res.name
        })
        sessionStorage.setItem("stdt-name", stdt)
    }

    const Edit = async () => {
        navigate('/edit-student')
    }

    /*const destroyStudent = async () => {
        const idStudent = sessionStorage.getItem("StudentInformation")
        const res = await DestroyStudent(idStudent)
        if (res) {
            alert('Aluno removido com sucesso!')
            navigate(-1);
        }
    }*/

    const signClick = async () => {
        setLoading(true);

        const idClass = await Clss.find(res => res)._id

        if (Selectbimonthly === I) {
            sessionStorage.setItem("id-I", I)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate(`/ist-numerical-grade-card/${idClass}`)
            } else {
                navigate(`/ist-quarter-report-card/${idClass}`)
            }
        } else if (Selectbimonthly === II) {
            sessionStorage.setItem("id-II", II)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate(`/iind-numerical-grade-card/${idClass}`)
            } else {
                navigate(`/iind-quarter-report-card/${idClass}`)
            }
        } else if (Selectbimonthly === III) {
            sessionStorage.setItem("id-III", III)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate(`/iiird-numerical-grade-card/${idClass}`)
            } else {
                navigate(`/iiird-quarter-report-card/${idClass}`)
            }
        } else if (Selectbimonthly === IV) {
            sessionStorage.setItem("id-IV", IV)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate(`/ivth-numerical-grade-card/${idClass}`)
            } else {
                navigate(`/ivth-quarter-report-card/${idClass}`)
            }
        } else if (Selectbimonthly === V) {
            sessionStorage.setItem("id-V", V)
            navigate('/vth-quarter-report-card')
        } else if (Selectbimonthly === VI) {
            sessionStorage.setItem("id-VI", VI)
            navigate(`/vith-quarter-report-card/${idClass}`)
        } else if (Selectbimonthly === 'FinalConcepts') {
            console.log("boletim final", Selectbimonthly)
            //sessionStorage.setItem("id-VI", VI)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate(`/final-numerical-grade-card/${idClass}`)
            } else {
                navigate(`/final-concepts-report-card/${idClass}`)
            }
        } else {
            setErrorMessage('Erro, Verifique os dados e tente novamente.');
        }
        setLoading(false);
    };

    const signClickIndForm = async () => {
        setLoading(true);
        console.log("Selectbimonthly", selectedBimId)
        console.log("selectedBimName", selectedBimName)
        let bim = ""; // declara fora

        if (selectedBimName === "1º BIMESTRE") {
            bim = "id_iStQuarter";
        }
        if (selectedBimName === "2º BIMESTRE") {
            bim = "id_iiNdQuarter";
        }
        if (selectedBimName === "3º BIMESTRE") {
            bim = "id_iiiRdQuarter";
        }
        if (selectedBimName === "4º BIMESTRE") {
            bim = "id_ivThQuarter";
        }
        if (selectedBimName === "Resultado Final") {
            bim = "id_finalConcepts";
        }
        const idStdt = id_student
        const idBim = selectedBimId
        console.log("idstdt", idStdt)
        console.log("bim", bim)
        console.log("idbim", idBim)
        if (bim) {
            navigate(`/indform/${idStdt}/${bim}/${idBim}`)
        } else {
            setErrorMessage('Erro, Verifique os dados e tente novamente.');
        }
        setLoading(false);
    };

    const ReturnHistoryGrade = async () => {
        setLoading(true);

        // 🚨 NÃO EXISTE TURMA
        if (!Clss || Clss.length === 0) {
            setLoading(false);
            setOpenNoClassModal(true);
            return; // ⛔ interrompe tudo aqui
        }

        const bimonthly = SelectbihistoricGrades.bim
        const id_class = await Clss.find(res => res)._id
        const $class = await (await clssInfo(id_class)).data.data
        const dailyStatus = $class
            .map(res => res.dailyStatus[bimonthly].regentTeacher)
            .find(Boolean); // pega o valor válido

        setopen(dailyStatus);
        setopen(dailyStatus)
        console.log("dailyStatus", dailyStatus)
        console.log("bimonthly", bimonthly)
        const resGrades = await GetNumGrade(
            $schoolYea,
            bimonthly,
            id_student
        );
        if (resGrades.data.data) {
            console.log("resGrades", resGrades.data.data)
            const resHistoricGrades = resGrades.data.data
                .filter(res => res.idActivity == null && res.studentGrade != null)
                .map(res => res);
            setresHistoricGrade(resHistoricGrades)
            setOpenHistoricModal(true); // 👈 ABRE A JANELA

        } else {
            setErrorMessageHistoric('Erro, Verifique os dados e tente novamente.');
        }
        setLoading(false);
    };

    const signClickHistoryGrade = async () => {
        setLoading(true);

        console.log("SelectbihistoricGradesbim", SelectbihistoricGrades.bim)
        let bim = ""; // declara fora

        if (SelectbihistoricGrades.bim === "1º BIMESTRE") {
            bim = "id_iStQuarter";
        }
        if (SelectbihistoricGrades.bim === "2º BIMESTRE") {
            bim = "id_iiNdQuarter";
        }
        if (SelectbihistoricGrades.bim === "3º BIMESTRE") {
            bim = "id_iiiRdQuarter";
        }
        if (SelectbihistoricGrades.bim === "4º BIMESTRE") {
            bim = "id_ivThQuarter";
        }
        if (SelectbihistoricGrades.bim === "Resultado Final") {
            bim = "id_finalConcepts";
        }
        const idStdt = id_student
        const idBim = SelectbihistoricGrades._id
        console.log("idstdt", idStdt)
        console.log("bim", bim)
        console.log("idbim", idBim)
        let id_teacher = ''
        if (Selectmatter.name === 'EDUCAÇÃO FÍSICA') {
            id_teacher = sessionStorage.getItem("PhysicalEducationTeacher")
        } else {
            id_teacher = sessionStorage.getItem("RegentTeacher")
        }
        const bimonthly = SelectbihistoricGrades.bim
        const id_matter = Selectmatter._id
        const id_class = Clss.find(res => res)._id
        //console.log("[bim]: idBim", [bim], idBim)

        // 🔒 VALIDAÇÕES
        if (!Selectmatter || !Selectmatter._id) {
            alert('Selecione a matéria.');
            setLoading(false);
            return;
        }

        if (historicGrade === null || historicGrade === undefined || historicGrade === '') {
            alert('Informe a nota do aluno.');
            setLoading(false);
            return;
        }

        if (bim && $schoolYea && historicGrade) {
            try {
                await createHistoryGrade({
                    year: $schoolYea,
                    bimonthly,
                    studentGrade: historicGrade,
                    id_teacher,
                    id_student: idStdt,
                    id_matter,
                    id_class,
                    [bim]: idBim
                })
                // ✅ RECARREGA AS NOTAS DO ALUNO
                await ReturnHistoryGrade();
            } catch (error) {
                if (error.response?.status === 400) {
                    alert(error.response.data.message);
                } else {
                    alert('Erro inesperado ao registrar a nota.');
                }
            }
        } else {
            setErrorMessageHistoric('Erro, Verifique os dados e tente novamente.');
        }
        setOpenAddHistoric(false)
        setSelectMatter([])
        setHistoricGrade([])
        setLoading(false);
    };

    const handleDeleteClick = (grade) => {
        console.log("grade", grade)
        setSelectedGrade(grade);
        setConfirmModal(true);
    };

    const handleConfirm = async () => {
        if (selectedGrade) {
            console.log("selected", selectedGrade._id)
            await DestroyNumericalGrade(selectedGrade._id);
            // ✅ RECARREGA AS NOTAS DO ALUNO
            await ReturnHistoryGrade();
        }
        setConfirmModal(false);
        setSelectedGrade(null);
    };

    const handleCancel = () => {
        setConfirmModal(false);
    };

    const startEditing = (grade) => {

        setUpdateStudentGrade(grade.studentGrade);
        setUpdateIdGrade(grade._id);
        // 👇 FECHA O MODAL QUE ESTÁ COBRINDO A TELA
        setOpenHistoricModal(false);
    };

    const saveEdit = async () => {
        try {

            const editedGrade = parseFloat(
                update_studentGrade.toString().replace(',', '.')
            );

            await updateNumericalGrade(update_id_grade, editedGrade);

            // recarrega as notas
            await ReturnHistoryGrade();

            setUpdateIdGrade(null);

        } catch (error) {
            alert('Erro ao atualizar a nota.');
        }
    };

    const upStatus = async () => {
        if (!selectedStatus.value) {
            alert("Por favor, selecione um status antes de salvar.");
            return; // Sai da função, não continua
        }
        setLoading(true)
        try {
            const { data } = await updateStatus({
                id_student: selectedStatus.id_student,
                status: selectedStatus.value,
                exitDate: exitDate || null,
            });

            console.log("Status atualizado com sucesso!", data);

            window.location.reload()

        } catch (error) {
            console.error("Erro ao atualizar status:", error.response?.data || error.message);
            throw error; // Repassa o erro para tratamento externo
        }
    };

    const handleChangeStatus = (id, value) => {
        setSelectedStatus({ id_student: id, value: value });
    };

    const handleOpenHistory = async () => {
        //alert('historico')
        const studentName = await student.map(student => (student.name))
        if (assessmentFormat === "grade") {
            navigate(`/history/${id_student}/${studentName}`)
        }
        /*if (assessmentFormat === "concept") {
            navigate(`/history-concept/${id_student}/${studentName}`)
        }*/else {
            alert("Disponível em breve")
        }
    }

    const periodText = SelectbihistoricGrades?.bim
        ? (assessmentRegime === "TRIMESTRAL"
            ? SelectbihistoricGrades.bim.replace("BIMESTRE", "TRIMESTRE")
            : SelectbihistoricGrades.bim)
        : "";

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    {removeStudent === false &&
                        <ContainerDivs>
                            {
                                student.map(student => (
                                    <Emp key={student._id} >
                                        <EmployeeInfo>
                                            {((positionAtEducationDepartment) || positionAtSchool === "DIRETOR/SUPERVISOR" || positionAtSchool === "SECRETARIO") &&
                                                <DivTopActions>
                                                    <p onClick={handleOpenHistory}>Histórico Escolar</p>
                                                </DivTopActions>
                                            }
                                            <Pro>
                                                {/*<ProfilePhoto>

                                            </ProfilePhoto>*/}
                                                < ProfileInfo>
                                                    <Span>{student.name}</Span>
                                                    {/*<Span>RG: {student.rg}</Span>*/}
                                                    <Span>Nascimento: {new Date(student.dateOfBirth + "T00:00:00").toLocaleDateString('pt-BR')}</Span>
                                                    <Span>Sexo: {student.sex}</Span>
                                                    <Span>Cpf: {student.cpf}</Span>
                                                    <Span>Rg: {student.rg}</Span>
                                                    <Span>Cor: {student.race}</Span>
                                                    <Span>Matrícula: {student.Registration}</Span>
                                                    <Span>Nome da Mãe: {student.motherName}</Span>
                                                    <Span>celular da Mãe: {student.motherCellPhone}</Span>
                                                    <Span>Nome do Pai: {student.fatherName}</Span>
                                                    <Span>celular do Pai: {student.fatherCellPhone}</Span>
                                                    <Span>Endereço: {student.address}</Span>
                                                    <Span>RS: {student.registerStudent}</Span>
                                                    <Span>Escola: {student.id_school.name}</Span>
                                                    <SchoolDivider />
                                                    {student.admissionDate ? (
                                                        <Span>Data de Admissão: {new Date(student.admissionDate + "T00:00:00").toLocaleDateString('pt-BR')}</Span>
                                                    ) : (
                                                        <Span></Span>
                                                    )}
                                                    <Span style={{ color: "green" }}>Data de Ingresso na Escola: {new Date(student.entryDate + "T00:00:00").toLocaleDateString('pt-BR')}</Span>
                                                    {student.departureDate ? (
                                                        <Span style={{ color: student.status === "concluido" ? "blue" : "red" }}>
                                                            {student.status === "concluido"
                                                                ? "Data de Conclusão: "
                                                                : "Data de Saída: "}
                                                            {new Date(student.departureDate + "T00:00:00").toLocaleDateString('pt-BR')}
                                                        </Span>
                                                    ) : (
                                                        <Span></Span>
                                                    )}
                                                </ProfileInfo>
                                            </Pro>
                                            {(positionAtSchool === "DIRETOR/SUPERVISOR" || positionAtSchool === "SECRETARIO" || positionAtEducationDepartment) &&
                                                <DivButtomEdit>
                                                    <Btt02 onClick={Edit}>Editar</Btt02>
                                                </DivButtomEdit>
                                            }
                                        </EmployeeInfo>
                                    </Emp>
                                ))
                            }

                            {Clss &&
                                Clss.map(clss => (
                                    <Emp key={clss._id} >
                                        <Span>Serie: {clss.serie}</Span>
                                        <Span>Turma: {clss.name}</Span>
                                        {/*<Span>Nivel: {clss.level}</Span>*/}
                                        <Span>Turno: {clss.shift}</Span>
                                        <Span>Ano: {clss.year}</Span>
                                    </Emp>
                                ))
                            }
                            {Regent &&
                                <ContainerCalendar>
                                    <Calendar />
                                </ContainerCalendar>
                            }
                            <Input>
                                <h3>Boletim</h3>
                                <Label>Selecione o periodo e click no botão abaixo.</Label>
                                <Select
                                    id="id-bimonthly"
                                    value={Selectbimonthly}
                                    onChange={(e) => setSelectbimonthly(e.target.value)}
                                >
                                    <option value="">Selecione</option>
                                    {bimonthly
                                        // 🔹 se for trimestral, ignora o 4º bimestre
                                        .filter(res => {
                                            if (assessmentRegime !== 'TRIMESTRAL') return true
                                            return !res.bimonthly.includes('4º')
                                        })
                                        .map(res => (
                                            <option key={res._id} value={res._id}>
                                                {assessmentRegime === 'TRIMESTRAL'
                                                    ? res.bimonthly.replace('BIMESTRE', 'TRIMESTRE')
                                                    : res.bimonthly}
                                            </option>
                                        ))
                                    }

                                    <option value="FinalConcepts">Resultado Final</option>
                                </Select>
                                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                <Button onClick={signClick}>Ver boletim</Button>
                            </Input>

                            {assessmentFormat === "concept" &&
                                <Input>
                                    <h3>Relatório Individual </h3>
                                    <Label>Selecione o periodo e click no botão abaixo.</Label>
                                    <Select
                                        value={selectedBimId}
                                        onChange={(e) => {
                                            const id = e.target.value;
                                            setSelectedBimId(id);

                                            // encontra o bimestre pelo id
                                            const selectedOption = bimonthly.find(res => res._id === id);

                                            if (selectedOption) setSelectedBimName(selectedOption.bimonthly);
                                            else setSelectedBimName(""); // caso selecione "Selecione"
                                        }}
                                    >
                                        <option value="">Selecione</option>
                                        {bimonthly
                                            // 🔹 se for trimestral, ignora o 4º bimestre
                                            .filter(res => {
                                                if (assessmentRegime !== 'TRIMESTRAL') return true
                                                return !res.bimonthly.includes('4º')
                                            })
                                            .map(res => (
                                                <option key={res._id} value={res._id}>
                                                    {assessmentRegime === 'TRIMESTRAL'
                                                        ? res.bimonthly.replace('BIMESTRE', 'TRIMESTRE')
                                                        : res.bimonthly}
                                                </option>
                                            ))
                                        }
                                    </Select>
                                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                    <Button onClick={signClickIndForm}>Ver Relatório </Button>
                                </Input>
                            }
                            {(assessmentFormat === "grade" && (positionAtSchool === "DIRETOR/SUPERVISOR" || positionAtSchool === "SECRETARIO")) &&
                                <HistoricGradeContainer>
                                    <Input>
                                        <h3>Notas provenientes de outras escolas</h3>
                                        <Label>Selecione o periodo e click no botão abaixo.</Label>
                                        <Select
                                            id="id-bimonthly"
                                            value={SelectbihistoricGrades?._id || ""}
                                            onChange={(e) => {
                                                const selected = bimonthly.find(b => b._id === e.target.value)
                                                setSelectbihistoricGrades({
                                                    _id: selected._id,
                                                    bim: selected.bimonthly
                                                })
                                            }}
                                        >
                                            <option value="">Selecione</option>
                                            {bimonthly
                                                // 🔹 se for trimestral, ignora o 4º bimestre
                                                .filter(res => {
                                                    if (assessmentRegime !== 'TRIMESTRAL') return true
                                                    return !res.bimonthly.includes('4º')
                                                })
                                                .map(res => (
                                                    <option key={res._id} value={res._id}>
                                                        {assessmentRegime === 'TRIMESTRAL'
                                                            ? res.bimonthly.replace('BIMESTRE', 'TRIMESTRE')
                                                            : res.bimonthly}
                                                    </option>
                                                ))
                                            }
                                        </Select>
                                        <Button onClick={ReturnHistoryGrade}>Ver notas de outras escolas</Button>
                                    </Input>
                                </HistoricGradeContainer>
                            }
                            {openHistoricModal && (
                                <HistoricModalOverlay>
                                    <HistoricModalContent>
                                        <h3>Notas provenientes de outras escolas</h3>

                                        <HeaderRow>
                                            <h4>{periodText}</h4>

                                            <AddHistoricButton
                                                //disabled={open !== 'aberto'}
                                                onClick={() => {
                                                    if (open !== 'aberto') {
                                                        alert('O bimestre está fechado. Não é possível registrar notas.');
                                                        return;
                                                    }
                                                    setOpenAddHistoric(true);
                                                }}
                                            >
                                                Registrar nota
                                            </AddHistoricButton>
                                        </HeaderRow>
                                        {resHistoricGrade.length === 0 ? (
                                            <EmptyHistoricMessage>
                                                Não há nenhuma nota proveniente de outras escolas para este periodo.
                                            </EmptyHistoricMessage>
                                        ) : (
                                            resHistoricGrade
                                                .slice() // cria cópia para não alterar estado
                                                .sort((a, b) => (a.id_matter?.name || '').localeCompare(b.id_matter?.name || ''))
                                                .map((grade) => (
                                                    <HistoricGradeRow key={grade._id}>
                                                        <span>{grade.id_matter?.name}</span>
                                                        <strong>{grade.studentGrade}</strong>

                                                        <Btt02 onClick={() => {
                                                            if (open !== 'aberto') {
                                                                alert('O bimestre está fechado. Não é possível deletar notas.');
                                                                return;
                                                            }
                                                            handleDeleteClick(grade)
                                                        }}>Deletar</Btt02>
                                                        <Btt02 onClick={() => {
                                                            if (open !== 'aberto') {
                                                                alert('O bimestre está fechado. Não é possível editar notas.');
                                                                return;
                                                            }
                                                            startEditing(grade)
                                                        }}>Editar</Btt02>
                                                    </HistoricGradeRow>
                                                ))
                                        )}

                                        <Button onClick={() => setOpenHistoricModal(false)}>
                                            Fechar
                                        </Button>
                                    </HistoricModalContent>
                                </HistoricModalOverlay>
                            )}
                            {openNoClassModal && (
                                <ModalOverlay>
                                    <ModalContent>
                                        <h3>Acesso indisponível</h3>
                                        <p>
                                            Para acessar as notas provenientes de outras escolas, o aluno precisa estar
                                            vinculado a uma turma nesta escola.
                                            <br /><br />
                                            Caso o aluno tenha sido transferido para outra instituição, as notas lançadas
                                            ficam disponíveis apenas no diário da turma referente ao ano letivo em que
                                            ele esteve vinculado.
                                        </p>

                                        <Btt02 onClick={() => setOpenNoClassModal(false)}>
                                            Entendi
                                        </Btt02>
                                    </ModalContent>
                                </ModalOverlay>
                            )}


                            {confirmModal && (
                                <BlurBackground>
                                    <ModalContainer>
                                        <h3>
                                            Tem certeza que deseja deletar a nota?
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
                            {console.log("update_id_grade", update_id_grade)}
                            {update_id_grade && (
                                <EditOverlay>
                                    <EditContainer>
                                        <h3>Editando Nota</h3>

                                        <EmpEdit>
                                            <Grade id='nota'>
                                                <div className='nota'>
                                                    <p>Nota:</p>
                                                    <input
                                                        placeholder="N/A"
                                                        value={update_studentGrade}
                                                        onChange={(e) => setUpdateStudentGrade(e.target.value)}
                                                    />
                                                </div>
                                            </Grade>
                                        </EmpEdit>

                                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

                                        <Btt02 onClick={saveEdit}>Salvar</Btt02>
                                        <Btt02 onClick={() => {
                                            setUpdateIdGrade(null)
                                            setOpenHistoricModal(true); // 👈 ABRE A JANELA
                                        }}>Cancelar</Btt02>
                                    </EditContainer>
                                </EditOverlay>
                            )}

                            {openAddHistoric && (
                                <HistoricModalOverlay>
                                    <HistoricModalContent>
                                        <h3>Registrar nota provenientes de outras escolas</h3>

                                        <Label>Selecione a Disciplina</Label>
                                        <Select
                                            id="id-matter"
                                            value={Selectmatter?._id || ""}
                                            onChange={(e) => {
                                                const selected = matter.find(m => m._id === e.target.value);
                                                setSelectMatter({
                                                    _id: selected._id,
                                                    name: selected.name
                                                });
                                            }}
                                        >
                                            <option value="">Selecione</option>
                                            {matter.map(res => (
                                                <option value={res._id}>{res.name}</option>
                                            ))
                                            }
                                        </Select>

                                        <Label>Nota do aluno</Label>
                                        <input
                                            type="number"
                                            placeholder="Ex: 17,5"
                                            min="0"
                                            step="0.1"
                                            value={historicGrade}
                                            onWheel={(e) => e.target.blur()}
                                            onKeyDown={(e) => {
                                                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                                    e.preventDefault();
                                                }
                                            }}
                                            onChange={(e) => {
                                                let value = e.target.value.replace(',', '.');

                                                // Impede valores inválidos
                                                if (value === '') {
                                                    setHistoricGrade('');
                                                    return;
                                                }

                                                const numericValue = Number(value);
                                                if (isNaN(numericValue) || numericValue < 0) return;

                                                setHistoricGrade(value);
                                            }}
                                        />

                                        {errorMessageHistoric && <ErrorMessage>{errorMessageHistoric}</ErrorMessage>}

                                        <ModalActions>
                                            <Button onClick={signClickHistoryGrade}>
                                                Registrar
                                            </Button>
                                            <ButtonSecondary onClick={() => setOpenAddHistoric(false)}>
                                                Cancelar
                                            </ButtonSecondary>
                                        </ModalActions>
                                    </HistoricModalContent>
                                </HistoricModalOverlay>
                            )}


                        </ContainerDivs>
                    }
                    {(positionAtSchool === "DIRETOR/SUPERVISOR" || positionAtSchool === "SECRETARIO") && removeStudent === false &&
                        <ButtonCancel>
                            <Btt01 onClick={() => { setRemoveStudent(true) }}>Alterar Status</Btt01>
                        </ButtonCancel>
                    }

                    {removeStudent === true && (

                        <ModalOverlay>
                            <ModalContent>
                                {student.map((student) => (
                                    <TableRow key={student._id}>
                                        <h3>Alterar Status do Aluno</h3>
                                        <p>{student.name}</p>
                                        <Chip color={student.status}>{student.status}</Chip>
                                        <label>Novo Status: </label>
                                        <Select
                                            value={selectedStatus.status}
                                            onChange={(e) => {
                                                handleChangeStatus(student._id, e.target.value)
                                                setExitDate(e.target.value === "transferido" || e.target.value === "inativo" || e.target.value === "concluido" ? new Date().toISOString().split('T')[0] : null);

                                            }}
                                        >
                                            <option value="">Selecione</option>
                                            {student.status !== "ativo" && <option value="ativo">Ativar</option>}
                                            {student.status !== "transferido" && <option value="transferido">Transferir</option>}
                                            {student.status !== "inativo" && <option value="inativo">Inativar</option>}
                                            {student.status !== "concluido" && (
                                                <option value="concluido">Concluir</option>
                                            )}
                                        </Select>

                                        {selectedStatus.value === "transferido" && (
                                            <p style={{ color: "red", fontWeight: "bold" }}>
                                                ⚠ Atenção:
                                                Ao transferir um aluno, ele será removido da turma atual.
                                                Antes de continuar, certifique-se de que todos os dados estão preenchidos corretamente e salvos.
                                            </p>
                                        )}


                                        {selectedStatus.value === "concluido" && (
                                            <p style={{ color: "green", fontWeight: "bold" }}>
                                                ✔ O aluno será marcado como concluído.
                                            </p>
                                        )}

                                        {(selectedStatus.value === "transferido" || selectedStatus.value === "inativo" || selectedStatus.value === "concluido") && (
                                            <div>
                                                <label>
                                                    {selectedStatus.value === "concluido"
                                                        ? "Data de Conclusão: "
                                                        : "Data de Saída: "}
                                                </label>
                                                <input
                                                    type="date"
                                                    value={exitDate}
                                                    onChange={(e) => setExitDate(e.target.value)}
                                                    min="1900-01-01"
                                                    max={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                        )}

                                        <div className='botões'>
                                            <Button
                                                onClick={() => upStatus()}
                                                style={{ background: "#16a34a" }}
                                            >
                                                Salvar
                                            </Button>

                                            <Button
                                                onClick={() => setRemoveStudent(false)}
                                                style={{ background: "#6b7280" }}
                                            >
                                                Cancelar
                                            </Button>
                                        </div>

                                    </TableRow>
                                ))}
                            </ModalContent>
                        </ModalOverlay>
                    )}
                </>
            }
        </Container >
    )
}

export default Student