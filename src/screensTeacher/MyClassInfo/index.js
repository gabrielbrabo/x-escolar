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
    closeBimesterDiary,
    CreateDialy,
    CreateRepoCard,
    CreateDailyConcept,
    CreateRepoCardConcept,
    getSchoolYear
} from '../../Api'

import {
    Container,
    ClassDetails,
    ClassInfo,
    ButtonContainer,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    //MatterSection,
    //MatterItem,
    StudentSection,
    StudentItem,
    InfoText,
    ContainerDivs,
    AddImpre,
    ContainerModal,
    ModalContent,
    Input,
    Label,
    Select,
    DiaryWrapper,
    DiaryBimester,
    StatusLine,
    ModalBackground,
    ModalContainer,
    ModalButton,
    //ButtonWrapper,
    //BlurModal,
    //AlertBox,
} from './style';
import LoadingSpinner from '../../components/Loading'

const MyCla$$Info = () => {

    const navigate = useNavigate()
    const [year, setyear] = useState('');
    const [assessmentFormat, setassessmentFormat] = useState('');
    const [clss, setClss] = useState([])
    const [DailyClass, setDailyClass] = useState([])
    const [stdt, setStdt] = useState([])
    const [studentTransferMap, setstudentTransferMap] = useState([]);

    const [classRegentEmployee, setclassRegentEmployee] = useState([])

    const [nameSchool, setnameSchool] = useState([])

    const [AllBimBull, setBimAllBull] = useState(false);

    const [bimonthly, setBimonthly] = useState([]);

    const [idTeacher, setId_teacher] = useState('')
    const [RegentTeacher, setclassRegentTeacher] = useState([]);
    const [RegentTeacher02, setclassRegentTeacher02] = useState([]);
    const [physicalEducation, setphysicalEducationTeacher] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [selectedBimester, setSelectedBimester] = useState(null);
    const [selectedField, setSelectedField] = useState(null);

    const [showRegentWarning, setShowRegentWarning] = useState(false);

    //const [showAlert, setShowAlert] = useState(false);

    const { id_class } = useParams();
    const { id_teacher } = useParams();
    const [loading, setLoading] = useState(false);
    //console.log(currentYear)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school");
            const schoolYear = await getSchoolYear(JSON.parse(idSchool))
            setyear(schoolYear.data.data)
            const nameSchool = sessionStorage.getItem('School')
            setnameSchool(nameSchool)
            const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
            setassessmentFormat($assessmentFormat)
            sessionStorage.removeItem("Selectbimonthly");
            sessionStorage.removeItem("Selectmatt")
            console.log('useParamsClass', id_class)
            console.log('useParamsTeacher', id_teacher)
            const resClass = await clssInfo(id_class)
            console.log("resClass", resClass.data.data)

            const Daily = await resClass.data.data.find(res => {
                return res
            }).dailyStatus
            //console.log("Daily", Daily)
            setDailyClass(Daily)
            //const res = await GetInfoMyClass(id_class, id_teacher)
            //console.log(res.data.data)
            const student = await resClass.data.data.find(res => {
                return res
            }).id_student.map(res => {
                if (res) {
                    return (res)
                } else {
                    return null
                }
            })
            setStdt(student)
            setClss(resClass.data.data)
            //setNameMatter(res.data.data)

            const transferStdtMap = resClass.data.data.find(res => {
                return res
            }).transferStudents
            setstudentTransferMap(transferStdtMap)

            const classRegentTeacher = await resClass.data.data.find(res => {
                return res
            }).classRegentTeacher.map(res => {
                return (res)
            }).find(res => {
                if (res) {
                    sessionStorage.setItem("classRegentTeacher", JSON.stringify(res._id))

                    setclassRegentTeacher(res._id)
                    return (res)
                } else {
                    return null
                }
            })
            setclassRegentEmployee(classRegentEmployee)

            const classRegentTeacher02 = await resClass.data.data.find(res => {
                return res
            }).classRegentTeacher02.map(res => {
                return (res)
            }).find(res => {
                if (res) {
                    sessionStorage.setItem("classRegentTeacher02", JSON.stringify(res._id))

                    setclassRegentTeacher02(res._id)
                    return (res)
                } else {
                    return null
                }
            })

            const physicalEducationTeacher = await resClass.data.data.find(res => {
                return res
            }).physicalEducationTeacher.map(res => {
                return (res)
            }).find(res => {
                if (res) {
                    sessionStorage.setItem("physicalEducationTeacher", JSON.stringify(res._id))

                    setphysicalEducationTeacher(res._id)
                    return (res)
                } else {
                    return null
                }
            })
            const idTeacher = JSON.parse(localStorage.getItem("Id_employee") || '""'); // Remove aspas extras
            setId_teacher(idTeacher);

            console.log("classRegentTeacher", classRegentTeacher);
            console.log("classRegentTeacher02", classRegentTeacher02);
            console.log("physicalEducationTeacher", physicalEducationTeacher);

            sessionStorage.removeItem("attendance_ idmatter")
            sessionStorage.removeItem("selectedDate")
            sessionStorage.removeItem("day")
            sessionStorage.removeItem("month")
            sessionStorage.removeItem("year")
            const $yearClass = resClass.data.data.find(clss => {
                return clss.year
            })
            //const year = new Date().getFullYear();
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

            //console.log("matter", res.data.data)
            setLoading(false)
        })()

    }, [id_class, id_teacher, classRegentEmployee, year])

    //console.log("isRegente", isRegente, "isRegente02", isRegente02, "isEdFisica", isEdFisica)


    const StudentInformation = async (stdt) => {
        setLoading(true);
        navigate(`/student/info/${stdt._id}`)
        setLoading(false);
    }

    console.log("student", stdt)

    const normalizeString = (str) => {
        return str
            .normalize("NFD") // Separa caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/[^\w\s]/gi, "") // Remove pontuações
            .toUpperCase(); // Converte para maiúsculas
    };

    stdt.sort((a, b) => normalizeString(a.name).localeCompare(normalizeString(b.name)));

    const messageButtonClick = () => {
        navigate(-1);
    };

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Função para gerar o fundo com gradiente aleatório
    const getStoredColor = () => {
        let storedColor = sessionStorage.getItem("backgroundColor");

        if (!storedColor) {
            // Gerar um gradiente aleatório diretamente aqui
            const color1 = getRandomColor();
            const color2 = getRandomColor();
            const angle = Math.floor(Math.random() * 360); // Rotaciona o gradiente aleatoriamente
            storedColor = `linear-gradient(${angle}deg, ${color1}, ${color2})`; // Salva o gradiente gerado
            sessionStorage.setItem("backgroundColor", storedColor);
        }

        return storedColor;
    };

    // Determina a cor de fundo baseada no índice salvo
    const bgColor = getStoredColor();

    // Função para determinar a cor do texto baseada no brilho do fundo
    const getTextColor = (bgColor) => {
        if (!bgColor) return "#FFF"; // Se não houver cor, usa o branco como padrão

        // Quando o fundo for gradiente, podemos calcular a média das cores
        const regex = /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/i;
        const matches = bgColor.match(regex);

        if (!matches) return "#FFF"; // Se não conseguir processar, usa o branco

        const r = parseInt(matches[1], 16);
        const g = parseInt(matches[2], 16);
        const b = parseInt(matches[3], 16);

        // Calcula o brilho com base na fórmula YIQ
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? "#000" : "#FFF"; // Se o fundo for claro, o texto será preto, caso contrário branco
    };


    const textColor = getTextColor(bgColor)

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

    const confirmCloseDiary = (bimester, field) => {
        setSelectedBimester(bimester);
        setSelectedField(field);
        setShowModal(true);
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

    const seeDiary = async (bimester) => {

        const Bimester = bimonthly.find(item => item.bimonthly === bimester);

        navigate(`/bimonthly-diary/${bimester}/${id_class}/${Bimester._id}`)
        console.log("see diary", bimester)
    }

    /*const handleViewCompleteDiary = () => {
        const allClosed = Object.keys(DailyClass).every((bimestre) => {
            const status = DailyClass[bimestre];
            console.log(`${bimestre}:`, status);

            const regent = status.regentTeacher?.trim().toLowerCase();
            //const pe = status.physicalEducationTeacher?.trim().toLowerCase();

            return regent === "fechado" //&& pe === "fechado";
        });

        console.log("allClosed:", allClosed);

        if (!allClosed) {
            setShowAlert(true);
        } else {
            console.log("Ver diário completo");
            const yearClass = clss.year
           navigate(`/annual-diary/${id_class}/${yearClass}`)
        }
    };*/

    const clickAttendance = () => {
        //if (physicalEducation !== id_teacher) {
            navigate('/attendance')
        //} else {
            //setShowRegentWarning(true); // mostra a modal
        //}
    }

    console.log("Daily", DailyClass)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    {clss.map((clss) => (
                        <ClassDetails
                            key={clss._id}
                            style={{
                                background: bgColor, // Aplica o gradiente como fundo
                                color: textColor, // Aplica a cor do texto calculada
                            }}
                        >
                            <ClassInfo style={{ color: textColor }}>{clss.serie}</ClassInfo>
                            <ClassInfo style={{ color: textColor }}>Turno: {clss.shift}</ClassInfo>
                        </ClassDetails>
                    ))}
                    <ButtonContainer>

                        <button onClick={clickAttendance}>Frequência</button>
                        <button onClick={() => { navigate('/classes') }}>Aulas</button>
                        {assessmentFormat !== 'grade'
                            ?
                            (
                                <button onClick={() => { navigate('/grade') }}>Conceitos</button>
                            ) : (
                                <button onClick={() => { navigate('/grade') }}>Avaliações</button>
                            )
                        }
                    </ButtonContainer>
                    {assessmentFormat !== 'grade'
                        &&
                        <ButtonContainer>
                            <button onClick={() => { navigate('/individual-form') }}>Ficha Individual</button>
                            <button onClick={() => { navigate('/final-concepts') }}>Conceitos Finais</button>
                        </ButtonContainer>
                    }
                    <DiaryWrapper>
                        <h2 style={{ color: "#158fa2", marginBottom: "10px" }}>Diário da Turma</h2>
                        {Object.entries(DailyClass).map(([bimester, status], index) => (
                            <DiaryBimester key={index}>
                                <h3>{bimester}</h3>
                                <StatusLine>
                                    {(RegentTeacher === idTeacher || RegentTeacher02 === idTeacher) && status.regentTeacher === "aberto" && (
                                        <>
                                            <strong>Professor Regente:<span style={{ color: status.regentTeacher === "aberto" ? "green" : "red" }}>
                                                {status.regentTeacher}
                                            </span>
                                            </strong>
                                            <button onClick={() => confirmCloseDiary(bimester, "regentTeacher")}>Fechar Bimestre</button>
                                        </>
                                    )}
                                    {physicalEducation === idTeacher && status.physicalEducationTeacher === "aberto" && (
                                        <>
                                            <strong>Ed. Física:<span style={{ color: status.physicalEducationTeacher === "aberto" ? "green" : "red" }}>
                                                {status.physicalEducationTeacher}
                                            </span>
                                            </strong>
                                            <button onClick={() => confirmCloseDiary(bimester, "physicalEducationTeacher")}>Fechar Bimestre</button>
                                        </>
                                    )}
                                    {(RegentTeacher === idTeacher || RegentTeacher02 === idTeacher) && status.regentTeacher === "fechado" && (
                                        <>
                                            <strong>Professor Regente:<span style={{ color: status.regentTeacher === "aberto" ? "green" : "red" }}>
                                                {status.regentTeacher}
                                            </span>
                                            </strong>
                                            <button onClick={() => seeDiary(bimester)}>Ver Diário</button>
                                        </>
                                    )}
                                    {physicalEducation === idTeacher && status.physicalEducationTeacher === "fechado" && (
                                        <>
                                            <strong>Ed. Física:<span style={{ color: status.physicalEducationTeacher === "aberto" ? "green" : "red" }}>
                                                {status.physicalEducationTeacher}
                                            </span>
                                            </strong>
                                            <button onClick={() => seeDiary(bimester)}>Ver Diário</button>
                                        </>
                                    )}
                                </StatusLine>
                            </DiaryBimester>
                        ))}
                        {/*<ButtonWrapper>
                            <button onClick={handleViewCompleteDiary}>Ver Diário Completo</button>
                        </ButtonWrapper>
                        {showAlert && (
                            <BlurModal>
                                <AlertBox>
                                    <p>Para visualizar o diário completo, é necessário que o diário de todos os bimestres estejam fechados.</p>
                                    <button onClick={() => setShowAlert(false)}>Ok</button>
                                </AlertBox>
                            </BlurModal>
                        )}*/}
                    </DiaryWrapper>

                    {showModal && (
                        <div style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(5px)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 999
                        }}>
                            <div style={{
                                backgroundColor: 'white',
                                padding: '30px',
                                borderRadius: '10px',
                                maxWidth: '400px',
                                textAlign: 'center',
                                boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                            }}>
                                <h3>Tem certeza que deseja fechar o diário?</h3>
                                <p style={{ marginTop: '10px' }}>
                                    Verifique se todas as informações deste bimestre foram lançadas corretamente.
                                </p>
                                <p style={{ marginTop: '10px', fontWeight: 'bold', color: 'red' }}>
                                    Após o fechamento, apenas o supervisor ou diretor poderá reabrir o bimestre.
                                </p>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                    <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px' }}>
                                        Cancelar
                                    </button>
                                    <button onClick={() => {
                                        handleClose(selectedBimester, selectedField);
                                        setShowModal(false);
                                    }} style={{ padding: '8px 16px', backgroundColor: '#158fa2', color: '#fff', border: 'none', borderRadius: '4px' }}>
                                        Confirmar Fechamento
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <StudentSection>
                        <h2 style={{ color: "#158fa2" }}>Alunos</h2>
                        <AddImpre>
                            <p onClick={PrintableAttendanceSheet}>Imprimir Lista de Presença</p>
                        </AddImpre>
                        <AddImpre>
                            <p onClick={PrintableAllTheBulletinsGrades}>Emitir boletins da turma</p>
                        </AddImpre>
                        <p>Total de alunos: {stdt.length}</p>
                        {studentTransferMap.length > 0 && <p>Total de Alunos Transferidos: {studentTransferMap.length}</p>}
                        {stdt.length > 0 ? (
                            stdt.map(stdt => (
                                <StudentItem onClick={() => StudentInformation(stdt)}>
                                    {stdt.name}
                                    {stdt.status === "inativo" && (
                                        <span style={{ color: "red", marginLeft: "8px", fontWeight: "bold" }}>
                                            {stdt.status}
                                        </span>
                                    )}
                                    {stdt.status === "ativo" && (
                                        <span style={{ color: "green", marginLeft: "8px", fontWeight: "bold" }}>
                                            {stdt.status}
                                        </span>
                                    )}
                                </StudentItem>
                            ))
                        )
                            :
                            (
                                <InfoText>Não há nenhum estudante</InfoText>
                            )
                        }

                        {studentTransferMap.length > 0 && (
                            <>
                                <>⚠️ Alunos Transferidos e Remanejados</>
                                {studentTransferMap.map(stdt => (
                                    <StudentItem key={stdt._id} onClick={() => StudentInformation(stdt)}>
                                        {stdt.name}
                                        <span style={{ color: "orange", marginLeft: "8px", fontWeight: "bold" }}>
                                            {stdt.status}
                                        </span>
                                    </StudentItem>
                                ))}
                            </>
                        )}
                    </StudentSection>
                    {
                        /* <MatterSection>
                             <h2>Materias</h2>
 
                             {
                                 NameMatter.map(employee => (
                                     <div key={employee._id}>
                                         <MatterItem>{employee.name_matter}</MatterItem>
                                     </div>
                                 ))
                             }
                         </MatterSection>*/
                    }
                    <ToGoBack onClick={messageButtonClick}>
                        <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                        <SignMessageButtonTextBold>Lista de Turmas</SignMessageButtonTextBold>
                    </ToGoBack>

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
                                        ))},
                                        <option value="FinalConcepts">Resultado Final</option>
                                    </Select>
                                    <ButtonContainer>
                                        <button onClick={() => setBimAllBull(false)}>Cancelar</button>
                                    </ButtonContainer>
                                </Input>
                            </ModalContent>
                        </ContainerModal>
                    )}
                    {showRegentWarning && (
                        <ModalBackground>
                            <ModalContainer>
                                <h2>Atenção!</h2>
                                <p>O lançamento das frequências é exclusivo do professor regente. No entanto, elas serão exibidas tanto no diário do professor de Educação Física quanto no diário do professor regente.</p>
                                <ModalButton onClick={() => setShowRegentWarning(false)}>Fechar</ModalButton>
                            </ModalContainer>
                        </ModalBackground>
                    )}
                </ContainerDivs>
            }
        </Container>
    )
}

export default MyCla$$Info