import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    clssInfo,
    getIstQuarter,
    getIIndQuarter,
    getIIIrdQuarter,
    getIVthQuarter,
    getVthQuarter,
    getVIthQuarter,
    CreateDialy,
    CreateRepoCard,
    CreateDailyConcept,
    CreateRepoCardConcept,
    closeBimesterDiary,
    reOpenBimesterDiary,
    getSchoolYear
} from '../../Api'

import {
    Container,
    //List,
    Emp,
    Matter,
    DivInfo,
    Span,
    //Search,
    DivAddEmp,
    AddEmp,
    ContainerDivs,
    TitleInfo,
    DivButtomEdit,
    ProfileInfo,
    Btt02,
    AddImpre,
    Input,
    Label,
    Select,
    ButtonContainer,
    ContainerModal,
    ModalContent,
    StatusLine,
    DiaryBimester,
    DiaryWrapper,
    //DivShowMatter,
    //ButtonCancel,
    //Btt01
} from './style';

//import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";

import LoadingSpinner from '../../components/Loading'

const Cla$$Info = () => {

    const navigate = useNavigate()
    const currentYear = new Date().getFullYear().toString();
    const [year, setyear] = useState('');
    const [clss, setClss] = useState([])
    const [DailyClass, setDailyClass] = useState([])
    const [positionAtEducationDepartment, setPositionAtEducationDepartment] = useState('')
    const [positionAtSchool, setPositionAtSchool] = useState(null);
    const [assessmentFormat, setassessmentFormat] = useState('');
    const [yearclss, setyearclss] = useState('')
    const [classRegentEmployee, setclassRegentEmployee] = useState([])
    const [classRegentEmployee02, setclassRegentEmployee02] = useState([])
    const [physicalEducationTeacher, setphysicalEducationTeacher] = useState([])
    //const [matter, setMatter] = useState("")

    const [studentTransfer, setstudentTransfer] = useState()
    const [studentTransferMap, setstudentTransferMap] = useState([])

    const [nameSchool, setnameSchool] = useState([])

    const [stdt, setStdt] = useState([])

    const [bimonthly, setBimonthly] = useState([]);

    const [confirmClose, setConfirmClose] = useState(false);
    const [bimesterToClose, setBimesterToClose] = useState(null);
    const [fieldToClose, setFieldToClose] = useState(null);
    const [confirmReopen, setConfirmReopen] = useState(false);
    const [bimesterToReopen, setBimesterToReopen] = useState(null);
    const [fieldToReopen, setFieldToReopen] = useState(null);

    const [showRemoveTeacherModal, setShowRemoveTeacherModal] = useState(false);
    const [showRemoveTeacher02Modal, setShowRemoveTeacher02Modal] = useState(false);
    const [showRemovePhysicalTeacherModal, setShowRemovePhysicalTeacherModal] = useState(false);

    //const [Selectbimonthly, setSelectbimonthly] = useState();

    const [AllBimBull, setBimAllBull] = useState(false);

    const [loading, setLoading] = useState(false);
    //const [showStudent, setShowStudent] = useState(false);
    //const [showTeacher, setShowTeacher] = useState(false);
    const { id_class } = useParams();

    console.log(currentYear)

    useEffect(() => {
        (async () => {
            setLoading(true);
            console.log('useParamsClass', id_class)
            const position = localStorage.getItem('position_at_school');
            setPositionAtSchool(position);
            const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
            setassessmentFormat($assessmentFormat)
            const idSchool = sessionStorage.getItem("id-school");
            const schoolYear = await getSchoolYear(JSON.parse(idSchool))
            setyear(schoolYear.data.data)
            const nameSchool = sessionStorage.getItem('School')
            const positionAtEducationDepartment = localStorage.getItem("positionAtEducationDepartment")
            setnameSchool(nameSchool)
            setPositionAtEducationDepartment(positionAtEducationDepartment)
            const res = await clssInfo(id_class)
            const Daily = await res.data.data.find(res => {
                return res
            }).dailyStatus
            //console.log("Daily", Daily)
            setDailyClass(Daily)
            setClss(res.data.data)
            console.log('reposta', res.data.data)
            const transferStdtMap = res.data.data.find(res => {
                return res
            }).transferStudents
            setstudentTransferMap(transferStdtMap)
            const Transfer = transferStdtMap.map(res => {
                return res._id
            })
            setstudentTransfer(Transfer)
            const $yearClass = res.data.data.find(clss => {
                return clss.year
            })
            console.log("yearClass", $yearClass)
            setyearclss($yearClass)
            const student = [
                ...new Map(
                    res.data.data.find(res => res)
                        .id_student
                        .filter(res => res.id_class.includes(id_class))
                        .map(res => [res._id, res]) // Usa _id como chave para garantir unicidade
                ).values()
            ];
            console.log("student", student)
            const classRegentEmployee = res.data.data.find(res => {
                return res
            }).classRegentTeacher.map(res => {
                if (res) {
                    return (res)
                } else {
                    return (null)
                }
            })

            const classRegentEmployee02 = res.data.data.find(res => {
                return res
            }).classRegentTeacher02.map(res => {
                if (res) {
                    return (res)
                } else {
                    return (null)
                }
            })

            const physicalEducationTeacher = res.data.data.find(res => {
                return res
            }).physicalEducationTeacher.map(res => {
                if (res) {
                    return (res)
                } else {
                    return (null)
                }
            })
            //RegentTeacher
            setclassRegentEmployee(classRegentEmployee)
            setclassRegentEmployee02(classRegentEmployee02)
            setphysicalEducationTeacher(physicalEducationTeacher)
            setStdt(student)
            //setMatter(matter)
            console.log("classRegentEmployee", classRegentEmployee)
            console.log("physicalEducationTeacher", physicalEducationTeacher)

            // const year = new Date().getFullYear();
            console.log("yearclss", $yearClass.year)
            //console.log("year", year)
            const IstQuarter = await getIstQuarter($yearClass.year, JSON.parse(idSchool))
            const IIndQuarter = await getIIndQuarter($yearClass.year, JSON.parse(idSchool))
            const IIIrdQuarter = await getIIIrdQuarter($yearClass.year, JSON.parse(idSchool))
            const IVthQuarter = await getIVthQuarter($yearClass.year, JSON.parse(idSchool))
            const VthQuarter = await getVthQuarter($yearClass.year, JSON.parse(idSchool))
            const VIthQuarter = await getVIthQuarter($yearClass.year, JSON.parse(idSchool))

            const i = IstQuarter.data.data.find(res => res) || null;
            const ii = IIndQuarter.data.data.find(res => res) || null;
            const iii = IIIrdQuarter.data.data.find(res => res) || null;
            const iv = IVthQuarter.data.data.find(res => res) || null;
            const v = VthQuarter.data.data.find(res => res) || null;
            const vi = VIthQuarter.data.data.find(res => res) || null;

            setBimonthly([i, ii, iii, iv, v, vi].filter(res => res !== null));

            //console.log("matter", matter)
            setLoading(false);
        })()

    }, [id_class, year])


    console.log("studentTransfer", studentTransfer)
    console.log("studentTransferMap", studentTransferMap)

    const addStudent = async () => {
        sessionStorage.setItem("studentTransfer", studentTransfer)
        navigate('/add/student')
    }
    const ReassignStdt = async () => {
        sessionStorage.setItem("idClassTransfer", id_class)
        navigate('/reassign-student')
    }

    const TransferStdt = async () => {
        //sessionStorage.setItem("idClassTransfer", id_class)
        navigate('/transfer-student')
    }

    const addTeacher = async () => {
        navigate(`/add/teacher/${id_class}`)
    }
    const addTeacher02 = async () => {
        navigate(`/add/teacher02/${id_class}`)
    }
    const addPhysicalTeacher = async () => {
        navigate(`/add/physicalteacher/${id_class}`)
    }
    const handleAskRemoveTeacher = () => {
        setShowRemoveTeacherModal(true);
    };

    const handleAskRemoveTeacher02 = () => {
        setShowRemoveTeacher02Modal(true);
    };

    const handleAskRemovePhysicalTeacher = () => {
        setShowRemovePhysicalTeacherModal(true);
    };

    const RemoveTeacher = async () => {
        navigate('/remove/teacher')
    }
    const RemoveTeacher02 = async () => {
        navigate('/remove/teacher02')
    }
    const RemovephysicalTeacher = async () => {
        navigate('/remove/physicalteacher')
    }

    const RemoveStudent = async () => {
        navigate('/remove/student')
    }

    const Edit = async () => {
        navigate('/edit-class')
    }

    const handleEmployee = async (emp) => {
        sessionStorage.setItem("EmployeeInformation", emp._id)
        navigate(`/employee/info/${emp._id}`)
    }

    const handlephysicalEmp = async (physicalEmp) => {
        sessionStorage.setItem("EmployeeInformation", physicalEmp._id)
        navigate(`/employee/info/${physicalEmp._id}`)
    }

    const StudentInformation = async (stdt) => {
        setLoading(true);
        navigate(`/student/info/${stdt._id}`)
        setLoading(false);
    }

    const PrintableAttendanceSheet = async () => {
        setLoading(true);
        const serie = clss.map(clss => {
            return clss.serie
        })
        console.log("resutado a ser eviado", stdt)
        navigate('/printable-attendance-sheet', {
            state: {
                students: stdt,
                schoolName: nameSchool,
                className: serie,
                teacherName: classRegentEmployee
            }
        });
        setLoading(false);
    }

    const PrintableAllTheBulletinsGrades = async () => {
        setBimAllBull(true)
    }

    const handleBimonthlyChange = (e) => {

        const value = e.target.value;

        if (value === "FinalConcepts") {
            if (assessmentFormat === 'grade') {
                navigate(`/allTheFinalBulletins-grades/${id_class}`)
            }
            if (assessmentFormat === 'concept') {
                navigate(`/allTheFinalBulletins-concept/${id_class}`)
            }
            return; // para não continuar o código abaixo
        }

        const selectedBimonthly = JSON.parse(e.target.value);
        const idBim = selectedBimonthly._id
        console.log("selectedBimonthly", selectedBimonthly)
        console.log("assessmentFormat", assessmentFormat)

        if (assessmentFormat === 'grade') {
            if (selectedBimonthly.bimonthly === "1º BIMESTRE") {
                navigate(`/Ist-allTheBulletins-grades/${id_class}/${idBim}`)
            }
            if (selectedBimonthly.bimonthly === "2º BIMESTRE") {
                navigate(`/IInd-allTheBulletins-grades/${id_class}/${idBim}`)
            }
            if (selectedBimonthly.bimonthly === "3º BIMESTRE") {
                navigate(`/IIIrd-allTheBulletins-grades/${id_class}/${idBim}`)
            }
            if (selectedBimonthly.bimonthly === "4º BIMESTRE") {
                navigate(`/IVth-allTheBulletins-grades/${id_class}/${idBim}`)
            }
        }

        if (assessmentFormat === 'concept') {
            if (selectedBimonthly.bimonthly === "1º BIMESTRE") {
                navigate(`/Ist-allTheBulletins-concept/${id_class}/${idBim}`)
            }
            if (selectedBimonthly.bimonthly === "2º BIMESTRE") {
                navigate(`/IInd-allTheBulletins-concept/${id_class}/${idBim}`)
            }
            if (selectedBimonthly.bimonthly === "3º BIMESTRE") {
                navigate(`/IIIrd-allTheBulletins-concept/${id_class}/${idBim}`)
            }
            if (selectedBimonthly.bimonthly === "4º BIMESTRE") {
                navigate(`/IVth-allTheBulletins-concept/${id_class}/${idBim}`)
            }
        }
    };

    const confirmCloseModal = (bimester, field) => {
        setBimesterToClose(bimester);
        setFieldToClose(field);
        setConfirmClose(true);
    };

    const confirmReopenModal = (bimester, field) => {
        setBimesterToReopen(bimester);
        setFieldToReopen(field);
        setConfirmReopen(true);
    };

    const handleClose = async (bimester, field) => {
        setLoading(true);

        const Bimester = bimonthly.find(item => item.bimonthly === bimester);

        console.log("selectedBimonthly", Bimester)
        if (assessmentFormat === 'grade') {
            if (bimester === "1º BIMESTRE") {
                console.log("field", field)
                console.log("Bimonthly", Bimester.bimonthly)
                console.log("idClass", id_class)
                console.log("Id-bimonthly", Bimester._id)
                const createDaily = await CreateDialy({
                    year: Bimester.year,
                    idClass: id_class,
                    id_iStQuarter: Bimester._id
                });
                console.log("createDaily", createDaily)
                const createCard = await CreateRepoCard({
                    year: Bimester.year,
                    idClass: id_class,
                    id_iStQuarter: Bimester._id
                });
                console.log("createCard", createCard)
                if (createDaily && createCard) {
                    const resClose = await closeBimesterDiary(id_class, Bimester.bimonthly, field)
                    if (resClose) {
                        console.log("res", resClose)
                        window.location.reload()
                    }
                }
            }
            if (bimester === "2º BIMESTRE") {
                console.log("field", field)
                console.log("Bimonthly", Bimester.bimonthly)
                console.log("idClass", id_class)
                console.log("Id-bimonthly", Bimester._id)
                const createDaily = await CreateDialy({
                    year: Bimester.year,
                    idClass: id_class,
                    id_iiNdQuarter: Bimester._id
                });
                console.log("createDaily", createDaily)
                const createCard = await CreateRepoCard({
                    year: Bimester.year,
                    idClass: id_class,
                    id_iiNdQuarter: Bimester._id
                });
                console.log("createCard", createCard)
                if (createDaily && createCard) {
                    const resClose = await closeBimesterDiary(id_class, Bimester.bimonthly, field)
                    if (resClose) {
                        console.log("res", resClose)
                        window.location.reload()
                    }
                }
            }
            if (bimester === "3º BIMESTRE") {
                console.log("field", field)
                console.log("Bimonthly", Bimester.bimonthly)
                console.log("idClass", id_class)
                console.log("Id-bimonthly", Bimester._id)
                const createDaily = await CreateDialy({
                    year: Bimester.year,
                    idClass: id_class,
                    id_iiiRdQuarter: Bimester._id
                });
                console.log("createDaily", createDaily)
                const createCard = await CreateRepoCard({
                    year: Bimester.year,
                    idClass: id_class,
                    id_iiiRdQuarter: Bimester._id
                });
                console.log("createCard", createCard)
                if (createDaily && createCard) {
                    const resClose = await closeBimesterDiary(id_class, Bimester.bimonthly, field)
                    if (resClose) {
                        console.log("res", resClose)
                        window.location.reload()
                    }
                }
            }
            if (bimester === "4º BIMESTRE") {
                console.log("field", field)
                console.log("Bimonthly", Bimester.bimonthly)
                console.log("idClass", id_class)
                console.log("Id-bimonthly", Bimester._id)
                const createDaily = await CreateDialy({
                    year: Bimester.year,
                    idClass: id_class,
                    id_ivThQuarter: Bimester._id
                });
                console.log("createDaily", createDaily)
                const createCard = await CreateRepoCard({
                    year: Bimester.year,
                    idClass: id_class,
                    id_ivThQuarter: Bimester._id
                });
                console.log("createCard", createCard)
                if (createDaily && createCard) {
                    const resClose = await closeBimesterDiary(id_class, Bimester.bimonthly, field)
                    if (resClose) {
                        console.log("res", resClose)
                        window.location.reload()
                    }
                }
            }
        }

        if (assessmentFormat === 'concept') {
            if (bimester === "1º BIMESTRE") {
                console.log("field", field)
                console.log("Bimonthly", Bimester.bimonthly)
                console.log("idClass", id_class)
                console.log("Id-bimonthly", Bimester._id)
                const createDaily = await CreateDailyConcept({
                    year: Bimester.year,
                    idClass: id_class,
                    id_iStQuarter: Bimester._id
                });
                console.log("createDaily", createDaily)
                const createCard = await CreateRepoCardConcept({
                    year: Bimester.year,
                    idClass: id_class,
                    id_iStQuarter: Bimester._id
                });
                console.log("createCard", createCard)
                if (createDaily && createCard) {
                    const resClose = await closeBimesterDiary(id_class, Bimester.bimonthly, field)
                    if (resClose) {
                        console.log("res", resClose)
                        window.location.reload()
                    }
                }
            }
            if (bimester === "2º BIMESTRE") {
                console.log("field", field)
                console.log("Bimonthly", Bimester.bimonthly)
                console.log("idClass", id_class)
                console.log("Id-bimonthly", Bimester._id)
                const createDaily = await CreateDailyConcept({
                    year: Bimester.year,
                    idClass: id_class,
                    id_iiNdQuarter: Bimester._id
                });
                console.log("createDaily", createDaily)
                const createCard = await CreateRepoCardConcept({
                    year: Bimester.year,
                    idClass: id_class,
                    id_iiNdQuarter: Bimester._id
                });
                console.log("createCard", createCard)
                if (createDaily && createCard) {
                    const resClose = await closeBimesterDiary(id_class, Bimester.bimonthly, field)
                    if (resClose) {
                        console.log("res", resClose)
                        window.location.reload()
                    }
                }
            }
            if (bimester === "3º BIMESTRE") {
                console.log("field", field)
                console.log("Bimonthly", Bimester.bimonthly)
                console.log("idClass", id_class)
                console.log("Id-bimonthly", Bimester._id)
                const createDaily = await CreateDailyConcept({
                    year: Bimester.year,
                    idClass: id_class,
                    id_iiiRdQuarter: Bimester._id
                });
                console.log("createDaily", createDaily)
                const createCard = await CreateRepoCardConcept({
                    year: Bimester.year,
                    idClass: id_class,
                    id_iiiRdQuarter: Bimester._id
                });
                console.log("createCard", createCard)
                if (createDaily && createCard) {
                    const resClose = await closeBimesterDiary(id_class, Bimester.bimonthly, field)
                    if (resClose) {
                        console.log("res", resClose)
                        window.location.reload()
                    }
                }
            }
            if (bimester === "4º BIMESTRE") {
                console.log("field", field)
                console.log("Bimonthly", Bimester.bimonthly)
                console.log("idClass", id_class)
                console.log("Id-bimonthly", Bimester._id)
                const createDaily = await CreateDailyConcept({
                    year: Bimester.year,
                    idClass: id_class,
                    id_ivThQuarter: Bimester._id
                });
                console.log("createDaily", createDaily)
                const createCard = await CreateRepoCardConcept({
                    year: Bimester.year,
                    idClass: id_class,
                    id_ivThQuarter: Bimester._id
                });
                console.log("createCard", createCard)
                if (createDaily && createCard) {
                    const resClose = await closeBimesterDiary(id_class, Bimester.bimonthly, field)
                    if (resClose) {
                        console.log("res", resClose)
                        window.location.reload()
                    }
                }
            }
        }
    };

    const reOpen = async (bimester, field) => {

        const Bimester = bimonthly.find(item => item.bimonthly === bimester);
        const reopen = await reOpenBimesterDiary(id_class, Bimester.bimonthly, field)
        if (reopen) {
            console.log("res", reopen)
            window.location.reload()
        }
    }

    const seeDiary = async (bimester) => {

        const Bimester = bimonthly.find(item => item.bimonthly === bimester);

        navigate(`/bimonthly-diary/${bimester}/${id_class}/${Bimester._id}`)
        console.log("see diary", bimester)
    }

    console.log("student", stdt)
    console.log("clss", clss)
    //console.log("employee", employee)

    const RemoveTeacherModal = ({ onClose, onConfirm }) => {
        return (
            <div style={{
                position: "fixed",
                inset: 0,
                backdropFilter: "blur(5px)",
                background: "rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999
            }}>
                <div style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "8px",
                    maxWidth: "400px",
                    textAlign: "center"
                }}>
                    <h3>⚠️ Atenção!</h3>
                    <p>Se o professor lecionou em algum bimestre, verifique antes de removê-lo se todos os registros foram preenchidos corretamente e se o diário do bimestre foi fechado.
                    Lembre-se: o nome que fica registrado no diário é sempre do professor que fecha o diário do bimestre.</p>
                    <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
                        <button style={{ background: "#ccc", color: "#000", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }} onClick={onClose}>Cancelar</button>
                        <button style={{ background: "#c82333", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }} onClick={onConfirm}>Confirmar Remoção</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    {
                        clss.map(clss => (
                            <Emp key={clss._id} >
                                <ProfileInfo>
                                    <Span>Serie: {clss.serie}</Span>
                                    <Span>Etapa de Ensino: {clss.level}</Span>
                                    <Span>Turno: {clss.shift}</Span>
                                    {/*<Span>Numero da Sala: {clss.classroom_number}</Span>*/}
                                </ProfileInfo>
                                {clss.year === currentYear && !positionAtEducationDepartment && (
                                    <DivButtomEdit>
                                        <Btt02 onClick={Edit}>Editar</Btt02>
                                    </DivButtomEdit>
                                )}


                            </Emp>
                        ))
                    }

                    <DiaryWrapper>
                        <h2>Diário da Turma</h2>

                        {Object.entries(DailyClass).map(([bimester, status], index) => (
                            <DiaryBimester key={index}>
                                <h3>{bimester}</h3>

                                <StatusLine>
                                    {/* BLOCO PROFESSOR REGENTE */}
                                    {(status.regentTeacher === "aberto" || status.regentTeacher === "fechado") && (
                                        <div style={{ flex: "1 1 100%", marginBottom: "0.5rem" }}>
                                            <strong>
                                                Prof. Regente:{" "}
                                                <span style={{ color: status.regentTeacher === "aberto" ? "green" : "red" }}>
                                                    {status.regentTeacher}
                                                </span>
                                            </strong>
                                            <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.2rem" }}>
                                                {console.log("yearClass", yearclss.year, "year", year)}
                                                {yearclss.year === JSON.stringify(year) && status.regentTeacher === "aberto" && positionAtSchool === 'DIRETOR/SUPERVISOR' && (
                                                    <button onClick={() => confirmCloseModal(bimester, "regentTeacher")} >
                                                        Fechar Bimestre
                                                    </button>
                                                )}
                                                {status.regentTeacher === "fechado" && (
                                                    <>
                                                        {yearclss.year === JSON.stringify(year) && positionAtSchool === 'DIRETOR/SUPERVISOR' &&
                                                            <button onClick={() => confirmReopenModal(bimester, "regentTeacher")}>
                                                                Reabrir
                                                            </button>
                                                        }
                                                        <button onClick={() => seeDiary(bimester)}>
                                                            Ver Diário
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* BLOCO PROFESSOR ED. FÍSICA */}
                                    {(status.physicalEducationTeacher === "aberto" || status.physicalEducationTeacher === "fechado") && (
                                        <div style={{ flex: "1 1 100%" }}>
                                            <strong>
                                                Prof. Ed. Física:{" "}
                                                <span style={{ color: status.physicalEducationTeacher === "aberto" ? "green" : "red" }}>
                                                    {status.physicalEducationTeacher}
                                                </span>
                                            </strong>
                                            <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.2rem" }}>
                                                {yearclss.year === JSON.stringify(year) && status.physicalEducationTeacher === "aberto" && positionAtSchool === 'DIRETOR/SUPERVISOR' && (
                                                    <button onClick={() => confirmCloseModal(bimester, "physicalEducationTeacher")} >
                                                        Fechar Bimestre
                                                    </button>
                                                )}
                                                {status.physicalEducationTeacher === "fechado" && (
                                                    <>
                                                        {yearclss.year === JSON.stringify(year) && positionAtSchool === 'DIRETOR/SUPERVISOR' &&
                                                            <button onClick={() => confirmReopenModal(bimester, "physicalEducationTeacher")}>
                                                                Reabrir
                                                            </button>
                                                        }
                                                        <button onClick={() => seeDiary(bimester)}>
                                                            Ver Diário
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </StatusLine>
                            </DiaryBimester>
                        ))}
                    </DiaryWrapper>

                    {confirmClose && (
                        <ContainerModal>
                            <ModalContent>
                                <h3>⚠️ Atenção</h3>
                                <p>Verifique se todas as informações estão completas. O diário será fechado.</p>
                                <ButtonContainer>
                                    <button style={{ background: 'green' }} onClick={() => {
                                        setConfirmClose(false);
                                        handleClose(bimesterToClose, fieldToClose);
                                    }}>
                                        Confirmar Fechamento
                                    </button>
                                    <button onClick={() => setConfirmClose(false)}>Cancelar</button>
                                </ButtonContainer>
                            </ModalContent>
                        </ContainerModal>
                    )}

                    {confirmReopen && (
                        <ContainerModal>
                            <ModalContent>
                                <h3>⚠️ Atenção</h3>
                                <p>O bimestre será reaberto. Para visualizar o diário novamente, será necessário fechá-lo depois.</p>
                                <ButtonContainer>
                                    <button style={{ background: 'green' }} onClick={() => {
                                        setConfirmReopen(false);
                                        reOpen(bimesterToReopen, fieldToReopen);
                                    }}>
                                        Confirmar Reabertura
                                    </button>
                                    <button onClick={() => setConfirmReopen(false)}>Cancelar</button>
                                </ButtonContainer>
                            </ModalContent>
                        </ContainerModal>
                    )}

                    {
                        classRegentEmployee.length > 0 ? (
                            <DivInfo>
                                <TitleInfo>Professor Regente de Truma:</TitleInfo>
                                {/*!showTeacher &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowTeacher(true) }}>Ver Professores <TiArrowDownThick fontSize={'17px'} /></Btt02>
                                    </DivShowMatter>
                                    */
                                }
                                {
                                    <>
                                        {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                            <DivAddEmp>
                                                {/*<AddEmp>
                                                    <Btt02 onClick={addTeacher}>Add Prefessor</Btt02>
                                                </AddEmp>*/}
                                                <AddEmp>
                                                    <Btt02 onClick={handleAskRemoveTeacher}>Remover</Btt02>

                                                    {showRemoveTeacherModal && (
                                                        <RemoveTeacherModal
                                                            onClose={() => setShowRemoveTeacherModal(false)}
                                                            onConfirm={RemoveTeacher}
                                                        />
                                                    )}
                                                </AddEmp>
                                            </DivAddEmp>
                                        )}
                                        <Matter>

                                            {
                                                classRegentEmployee.map(emp => (
                                                    <div onClick={() => handleEmployee(emp)} key={emp._id}>
                                                        <Span>{emp.name}</Span>
                                                    </div>
                                                ))
                                            }
                                        </Matter>
                                        {
                                            /*<DivShowMatter>
                                            <Btt02 onClick={() => { setShowTeacher(false) }}>Fecha<TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>
                                        */
                                        }
                                    </>
                                }
                            </DivInfo>
                        ) : (
                            <DivInfo>
                                <TitleInfo>Professor Regente de Turma:</TitleInfo>
                                {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                    <DivAddEmp>
                                        <AddEmp>
                                            <Btt02 onClick={addTeacher}>Adicionar</Btt02>
                                        </AddEmp>
                                    </DivAddEmp>
                                )}
                                <Matter>
                                    <>Não há nenhum Professor</>
                                </Matter>
                            </DivInfo>
                        )
                    }
                    {
                        classRegentEmployee02.length > 0 ? (
                            <DivInfo>
                                <TitleInfo>Professor Regente de Turma 02:</TitleInfo>
                                {/*!showTeacher &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowTeacher(true) }}>Ver Professores <TiArrowDownThick fontSize={'17px'} /></Btt02>
                                    </DivShowMatter>
                                    */
                                }
                                {
                                    <>
                                        {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                            <DivAddEmp>
                                                {/*<AddEmp>
                                                    <Btt02 onClick={addTeacher}>Add Prefessor</Btt02>
                                                </AddEmp>*/}
                                                <AddEmp>
                                                    <Btt02 onClick={handleAskRemoveTeacher02}>Remover</Btt02>

                                                    {showRemoveTeacher02Modal && (
                                                        <RemoveTeacherModal
                                                            onClose={() => setShowRemoveTeacher02Modal(false)}
                                                            onConfirm={RemoveTeacher02}
                                                        />
                                                    )}
                                                </AddEmp>
                                            </DivAddEmp>
                                        )}
                                        <Matter>

                                            {
                                                classRegentEmployee02.map(emp => (
                                                    <div onClick={() => handleEmployee(emp)} key={emp._id}>
                                                        <Span>{emp.name}</Span>
                                                    </div>
                                                ))
                                            }
                                        </Matter>
                                        {
                                            /*<DivShowMatter>
                                            <Btt02 onClick={() => { setShowTeacher(false) }}>Fecha<TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>
                                        */
                                        }
                                    </>
                                }
                            </DivInfo>
                        ) : (
                            <DivInfo>
                                <TitleInfo>Professor Regente de Turma 02:</TitleInfo>
                                {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                    <DivAddEmp>
                                        <AddEmp>
                                            <Btt02 onClick={addTeacher02}>Adicionar</Btt02>
                                        </AddEmp>
                                    </DivAddEmp>
                                )}
                                <Matter>
                                    <>Não há nenhum Professor</>
                                </Matter>
                            </DivInfo>
                        )
                    }

                    {
                        physicalEducationTeacher.length > 0 ? (
                            <DivInfo>
                                <TitleInfo>Professor de Educação Fisica:</TitleInfo>
                                {
                                    <>
                                        {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                            <DivAddEmp>
                                                {/*<AddEmp>
                                                    <Btt02 onClick={addTeacher}>Add Prefessor</Btt02>
                                                </AddEmp>*/}
                                                <AddEmp>
                                                    <Btt02 onClick={handleAskRemovePhysicalTeacher}>Remover</Btt02>

                                                    {showRemovePhysicalTeacherModal && (
                                                        <RemoveTeacherModal
                                                            onClose={() => setShowRemovePhysicalTeacherModal(false)}
                                                            onConfirm={RemovephysicalTeacher}
                                                        />
                                                    )}
                                                </AddEmp>
                                            </DivAddEmp>
                                        )}
                                        <Matter>

                                            {
                                                physicalEducationTeacher.map(physicalEmp => (
                                                    <div onClick={() => handlephysicalEmp(physicalEmp)} key={physicalEmp._id}>
                                                        <Span>{physicalEmp.name}</Span>
                                                    </div>
                                                ))
                                            }
                                        </Matter>
                                        {
                                            /*<DivShowMatter>
                                            <Btt02 onClick={() => { setShowTeacher(false) }}>Fecha<TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>
                                        */
                                        }
                                    </>
                                }
                            </DivInfo>
                        ) : (
                            <DivInfo>
                                <TitleInfo>Professor de Educação Fisica:</TitleInfo>
                                {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                    <DivAddEmp>
                                        <AddEmp>
                                            <Btt02 onClick={addPhysicalTeacher}>Adicionar</Btt02>
                                        </AddEmp>
                                    </DivAddEmp>
                                )}
                                <Matter>
                                    <>Não há nenhum Professor</>
                                </Matter>
                            </DivInfo>
                        )
                    }

                    {
                        stdt.length > 0
                            ?
                            <DivInfo>
                                <TitleInfo>Alunos:</TitleInfo>
                                <AddImpre>
                                    <p onClick={PrintableAttendanceSheet}>Imprimir Lista de alunos</p>
                                </AddImpre>
                                <AddImpre>
                                    <p onClick={PrintableAllTheBulletinsGrades}>Emitir boletins da turma</p>
                                </AddImpre>
                                <p>Total de Alunos: {stdt.length}</p>
                                {studentTransferMap.length > 0 && <p>Total de Alunos Transferidos: {studentTransferMap.length}</p>}
                                {/*!showStudent &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowStudent(true) }}>Ver Alunos <TiArrowDownThick fontSize={'17px'} /></Btt02>
                                    </DivShowMatter>
                                    */
                                }
                                {
                                    <>
                                        {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                            <DivAddEmp>
                                                <AddEmp>
                                                    <Btt02 onClick={addStudent}>Adicionar</Btt02>
                                                </AddEmp>
                                                <AddEmp>
                                                    <Btt02 onClick={ReassignStdt}>Remanejar</Btt02>
                                                </AddEmp>
                                                <AddEmp>
                                                    <Btt02 onClick={TransferStdt}>Transferir</Btt02>
                                                </AddEmp>
                                                <AddEmp>
                                                    <Btt02 onClick={RemoveStudent}>Remover</Btt02>
                                                </AddEmp>
                                            </DivAddEmp>
                                        )}
                                        <Matter>
                                            {
                                                stdt
                                                    .sort((a, b) => a.name.localeCompare(b.name)) // Ordena em ordem alfabética
                                                    .map(stdt => {
                                                        return (
                                                            <div key={stdt.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                <Span onClick={() => StudentInformation(stdt)}>{stdt.name}</Span>
                                                                {stdt.status === "inativo" && (
                                                                    <Span style={{ color: 'red', fontWeight: 'bold' }}>Inativo</Span>
                                                                )}
                                                            </div>
                                                        );
                                                    })
                                            }

                                        </Matter>
                                        {studentTransferMap.length > 0 && (
                                            <Matter>
                                                <TitleInfo>⚠️ Alunos Transferidos e Remanejados</TitleInfo>
                                                {studentTransferMap
                                                    .sort((a, b) => a.name.localeCompare(b.name)) // Ordena em ordem alfabética
                                                    .map(stdt => {
                                                        return (
                                                            <div key={stdt.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                <Span onClick={() => StudentInformation(stdt)}>{stdt.name}</Span>
                                                                {stdt.status === "ativo" && (
                                                                    <Span style={{ color: 'blue', fontWeight: 'bold' }}>Remanejado</Span>
                                                                )}
                                                                {stdt.status === "inativo" && (
                                                                    <Span style={{ color: 'blue', fontWeight: 'bold' }}>Remanejado</Span>
                                                                )}
                                                                {stdt.status === "transferido" && (
                                                                    <Span style={{ color: 'orange', fontWeight: 'bold' }}>Transferido</Span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                            </Matter>
                                        )}

                                        {
                                            /*<DivShowMatter>
                                            <Btt02 onClick={() => { setShowStudent(false) }}>Fecha<TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>
                                        */
                                        }
                                    </>
                                }
                            </DivInfo>
                            :
                            <DivInfo>
                                <TitleInfo>Alunos:</TitleInfo>
                                {yearclss.year === currentYear
                                    &&
                                    <DivAddEmp>
                                        <AddEmp>
                                            <Btt02 onClick={addStudent}>Add Aluno</Btt02>
                                        </AddEmp>
                                    </DivAddEmp>
                                }
                                <Matter>
                                    <>Não há nenhum estudante</>
                                </Matter>
                            </DivInfo>
                    }

                    {AllBimBull && (
                        <ContainerModal>
                            <ModalContent>
                                <h2>Selecione o Bimestre</h2>
                                <Input>
                                    <Label>Bimestres</Label>
                                    <Select
                                        id="id-bimonthly"
                                        //value={Selectbimonthly ? JSON.stringify(Selectbimonthly) : ""}
                                        onChange={handleBimonthlyChange}
                                    >
                                        <option value="">Selecione</option>
                                        {bimonthly.map(res => (
                                            <option
                                                key={res._id}
                                                value={JSON.stringify({ _id: res._id, bimonthly: res.bimonthly })}
                                            >
                                                {res.bimonthly}
                                            </option>
                                        ))}
                                        <option value="FinalConcepts">Resultado Final</option>
                                    </Select>
                                    <ButtonContainer>
                                        <button onClick={() => setBimAllBull(false)}>Cancelar</button>
                                    </ButtonContainer>
                                </Input>
                            </ModalContent>
                        </ContainerModal>
                    )}

                    {/* <ButtonCancel>
                        <Btt01 >Remover Turma</Btt01>
                    </ButtonCancel>*/}
                </ContainerDivs>
            }
        </Container >
    )
}

export default Cla$$Info
