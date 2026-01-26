import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import {
    GetStudentHistory,
    UpdateStudentHistory,
    GetMatter,
    CreateManualHistory,
    updateManualHistory,
    createCertificate,
    getCertificateByStudent,
    updateCertificate,
    fetchLogo
} from '../../Api'
import LoadingSpinner from '../../components/Loading'
import {
    Container,
    ContainerHistory,
    Header,
    SchoolName,
    Title,
    StudentInfo,
    Table,
    SchoolBlock,
    InfoRow,   // 👈 novo
    ModalOverlay,
    ModalContainer,
    ModalTitle,
    Section,
    ExtraSubjectRow,
    Label,
    Input,
    Select,
    AddButton,
    RemoveButton,
    Footer,
    CancelButton,
    SaveButton,
    TableScroll,
    ActionButton,
    //HistoryModalContainer,
    //HistoryForm,
    //HistoryFooter,
    EditOverlay,
    EditModal,
    EditTitle,
    EditForm,
    EditSection,
    EditRow,
    EditLabel,
    EditInput,
    //EditSelect,
    EditFooter,
    EditCancelButton,
    EditSaveButton,
    SelectEdit,
    //EditSubjects,
    //EditSubjectRow,
    //EditSubjectName,
    NewHistoryOverlay,
    NewHistoryModal,
    NewHistoryTitle,
    NewHistoryForm,
    NewHistorySection,
    SectionTitle,
    NewHistoryRow,
    NewHistoryLabel,
    NewHistoryInput,
    NewHistorySelect,
    SubjectRow,
    SubjectName,
    SubjectInput,
    NewHistoryFooter,
    CertificateContainer,
    CertificateHeader,
    Brasao,
    HeaderCenter,
    CertificateTitle,
    CertificateText,
    Field,
    CertificateFooter,
    Line,
    CertificateOverlay,
    CertificateModal,
    SignatureSection,
    SignatureRow,
    SignatureBlock,
    SignatureLine,
    SignatureLabel,
    DateRow,
    SignatureSectionCert,
    Preview,
} from './style'
import { GlobalPrintStyle } from './style';

const StudentHistory = () => {
    const { id_student, studentName } = useParams()

    const [logoUrl, setLogoUrl] = useState('');
    const [history, setHistory] = useState([])
    const [subjects, setSubjects] = useState([])
    const [editYear, setEditYear] = useState(null)
    const [formYear, setFormYear] = useState(null)
    const [matters, setMatter] = useState([])
    const [assessmentFormat, setassessmentFormat] = useState('');
    const [openNewHistory, setOpenNewHistory] = useState(false)
    const [newHistory, setNewHistory] = useState({
        year: '',
        serie: '',
        nameSchool: '',
        municipality: '',
        state: '',
        grades: {},          // notas por matéria
        totalPresencas: '',  // 👈 NOVO
        totalFaltas: '',      // 👈 NOVO
        dailyWorkload: '',
        annualSchoolDays: '',
        totalGrade: '',     // 👈 NOVO
        averageGrade: ''
    })


    const [openEditManualHistory, setOpenEditManualHistory] = useState(false)
    const [editManualHistory, setEditManualHistory] = useState(null)

    const [openConfirmSave, setOpenConfirmSave] = useState(false)

    const [openCertificateModal, setOpenCertificateModal] = useState(false)

    const [openEditCertificateModal, setOpenEditCertificateModal] = useState(false)

    const [certificate, setCertificate] = useState([])

    const [certificateData, setCertificateData] = useState({
        /* ===== DADOS DO ALUNO ===== */
        nationality: '',
        gender: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        birthCity: '',
        birthState: '',
        motherName: '',
        fatherName: '',

        /* ===== DADOS DA ESCOLA ===== */
        schoolName: '',
        legalStatus: '',
        address: '',
        schoolCity: '',
        schoolState: '',

        /* ===== CERTIFICADO ===== */
        conclusionDate: '',
        legalBasis: '',
        observations: ''
    })

    const [hasCertificate, setHasCertificate] = useState(false)

    const [showWarningModal, setShowWarningModal] = useState(false)
    const [showPrintAlert, setShowPrintAlert] = useState(false)
    const [printType, setPrintType] = useState(null)

    const [loading, setLoading] = useState(true)

    const certificateRef = useRef(null);
    const historyRef = useRef(null);

    useEffect(() => {
        async function loadHistory() {
            try {
                const res = await GetStudentHistory(id_student)

                const data = Array.isArray(res.data)
                    ? res.data
                    : Array.isArray(res.data?.data)
                        ? res.data.data
                        : []

                setHistory(data)

                // extrai todas as matérias existentes
                const materias = new Set()

                data.forEach((year) => {
                    year.reportCard?.forEach((bim) => {
                        if (bim.studentGrade) {
                            Object.keys(bim.studentGrade).forEach((m) =>
                                materias.add(m)
                            )
                        }
                    })
                })

                setSubjects([...materias])
            } catch (err) {
                console.error(err)
                setHistory([])
                setSubjects([])
            } finally {
                setLoading(false)
            }

            const idSchool = sessionStorage.getItem("id-school");

            const res = await GetMatter(JSON.parse(idSchool));
            setMatter(res.data.data || []);
            const assessmentFormat = sessionStorage.getItem("assessmentFormat");
            setassessmentFormat(assessmentFormat)

            try {
                const res = await getCertificateByStudent(id_student)

                if (res?.data) {
                    setHasCertificate(true)
                    setCertificate(res.data)
                }
            } catch (err) {
                if (err.response?.status === 404) {
                    setHasCertificate(false)
                }
            }
            const rawIdSchool = sessionStorage.getItem("id-school");
            const idSchool$ = rawIdSchool
                ? rawIdSchool.replace(/^"+|"+$/g, '')
                : null;

            console.log("idSchool", idSchool$)
            const cachedLogo = localStorage.getItem(`school-logo-${idSchool$}`);
            //const cachedLogoId = localStorage.getItem(`school-logo-id-${idSchool}`);

            if (cachedLogo) {
                console.log('busca pelo storage local')
                setLogoUrl(cachedLogo);
                //setlogoId(cachedLogoId);
            } else {

                console.log('busca no s3')
                const logoRes = await fetchLogo(idSchool$);

                console.log('busca logo', logoRes)
                if (logoRes?.url) {
                    setLogoUrl(logoRes.url);
                    //setlogoId(logoRes._id);
                    localStorage.setItem(`school-logo-${idSchool$}`, logoRes.url);
                    localStorage.setItem(`school-logo-id-${idSchool$}`, logoRes._id);

                }
            }
        }

        loadHistory()
    }, [id_student])

    console.log("history", history)
    console.log("matters", matters)

    if (loading) {
        return (
            <Container style={{ width: '100%' }}>
                <LoadingSpinner />
            </Container>
        )
    }

    if (!history.length) {
        return (
            <Container>
                Nenhum histórico encontrado.
            </Container>
        )
    }

    const handleSaveEdition = async () => {
        try {
            const payload = {}

            if (formYear.studentSituation !== undefined) {
                payload.studentSituation = formYear.studentSituation
            }

            if (formYear.extraSubjects?.length) {
                payload.extraSubjects = formYear.extraSubjects.map(item => ({
                    name: item.name,
                    grade: Number(item.grade)
                }))
            }

            if (formYear.extraWorkingHours !== undefined) {
                payload.extraWorkingHours = Number(formYear.extraWorkingHours)
            }

            if (formYear.absencesOvertime !== undefined) {
                payload.absencesOvertime = Number(formYear.absencesOvertime)
            }

            if (Object.keys(payload).length === 0) {
                alert("Nenhuma alteração realizada")
                return
            }

            await UpdateStudentHistory(editYear._id, payload)

            setHistory(prev =>
                prev.map(item =>
                    item._id === editYear._id
                        ? { ...item, ...payload }
                        : item
                )
            )

            setEditYear(null)
        } catch (err) {
            console.error('Erro ao editar histórico:', err)
            alert(
                err.response?.data?.message ||
                'Erro ao salvar alterações'
            )
        }
    }


    const handleOpenNewHistory = () => {
        setNewHistory({
            year: '',
            serie: '',
            nameStudent: '',
            nameSchool: '',
            municipality: '',
            state: '',
            grades: {},          // notas por matéria
            totalPresencas: '',  // 👈 NOVO
            totalFaltas: '',      // 👈 NOVO
            dailyWorkload: '',
            annualSchoolDays: '',
            totalGrade: '',     // 👈 NOVO
            averageGrade: ''
        })
        setOpenNewHistory(true)
    }

    const currentYear = new Date().getFullYear()

    const yearsList = Array.from(
        { length: 50 },
        (_, i) => (currentYear - 1 - i).toString()
    )

    const handleSaveNewHistory = async () => {
        try {
            //const idSchool = JSON.parse(sessionStorage.getItem("id-school"))
            //const idTeacher = sessionStorage.getItem("id-teacher") // se existir
            //const idClass = sessionStorage.getItem("id-class")     // se existir

            const payload = {
                id_student,
                //id_school: idSchool,
                //idTeacher: idTeacher || null,
                //idClass: idClass || null,

                nameStudent: studentName,
                //nameTeacher: history[0]?.nameTeacher,
                nameSchool: newHistory.nameSchool || history[0]?.nameSchool,
                municipality: newHistory.municipality || history[0]?.municipality,
                state: newHistory.state || history[0]?.state,

                year: newHistory.year,
                serie: newHistory.serie,
                //nameClass: history[0]?.nameClass,

                totalGrade: newHistory.totalGrade,
                averageGrade: newHistory.averageGrade,

                dailyWorkload: newHistory.dailyWorkload,
                annualSchoolDays: newHistory.annualSchoolDays,

                grades: newHistory.grades,

                frequencia: {
                    totalAulas:
                        Number(newHistory.totalPresencas || 0) +
                        Number(newHistory.totalFaltas || 0),

                    totalPresencas: Number(newHistory.totalPresencas || 0),
                    totalFaltas: Number(newHistory.totalFaltas || 0),
                    totalFaltasJustificadas: 0
                }
            }

            console.log("Payload enviado:", payload)

            await CreateManualHistory(payload) // 🔥 endpoint novo

            setOpenNewHistory(false)

            // recarrega histórico
            const res = await GetStudentHistory(id_student)
            setHistory(res.data)

        } catch (error) {
            alert(
                error?.response?.data?.message ||
                "Erro inesperado ao salvar histórico"
            )
        }

    }

    function extractGradesFromReportCard(reportCard = []) {
        const grades = {}

        reportCard.forEach(bim => {
            if (!bim.studentGrade) return

            Object.entries(bim.studentGrade).forEach(([subject, data]) => {
                if (data?.total !== undefined) {
                    grades[subject] = data.total
                }
            })
        })

        return grades
    }

    const handleSaveCertificate = async () => {
        try {

            console.log('birthDay:', certificateData.birthDay)
            console.log('birthMonth:', certificateData.birthMonth)
            console.log('birthYear:', certificateData.birthYear)

            const monthMap = {
                JANEIRO: 0,
                FEVEREIRO: 1,
                MARÇO: 2,
                ABRIL: 3,
                MAIO: 4,
                JUNHO: 5,
                JULHO: 6,
                AGOSTO: 7,
                SETEMBRO: 8,
                OUTUBRO: 9,
                NOVEMBRO: 10,
                DEZEMBRO: 11
            }

            const birthDate = new Date(
                Number(certificateData.birthYear),
                monthMap[certificateData.birthMonth],
                Number(certificateData.birthDay)
            )

            if (isNaN(birthDate.getTime())) {
                alert('Data de nascimento inválida')
                return
            }

            const payload = {
                /* ===== RELAÇÕES ===== */
                student: id_student, // id do aluno
                /* ===== DADOS DO ALUNO ===== */
                studentName,
                nationality: certificateData.nationality,
                gender: certificateData.gender,

                birthDate,

                birthCity: certificateData.birthCity,
                birthState: certificateData.birthState,
                motherName: certificateData.motherName,
                fatherName: certificateData.fatherName,

                /* ===== DADOS ACADÊMICOS ===== */
                course: 'ENSINO FUNDAMENTAL',
                conclusionDate: certificateData.conclusionDate,

                /* ===== DADOS DA ESCOLA ===== */
                schoolName: certificateData.schoolName,
                legalStatus: certificateData.legalStatus,
                address: certificateData.address,
                city: certificateData.schoolCity,
                state: certificateData.schoolState,

                /* ===== CERTIFICADO ===== */
                legalBasis: certificateData.legalBasis,
                observations: certificateData.observations
            }

            await createCertificate(payload)

            alert('Certificado registrado com sucesso ✅')
            setOpenCertificateModal(false)
            window.location.reload()

        } catch (err) {
            console.error(err)
            alert(
                err?.response?.data?.message ||
                'Erro ao registrar certificado'
            )
        }
    }

    const MONTHS = [
        'JANEIRO',
        'FEVEREIRO',
        'MARÇO',
        'ABRIL',
        'MAIO',
        'JUNHO',
        'JULHO',
        'AGOSTO',
        'SETEMBRO',
        'OUTUBRO',
        'NOVEMBRO',
        'DEZEMBRO'
    ]

    const monthName = (monthIndex) => {
        const months = [
            'JANEIRO',
            'FEVEREIRO',
            'MARÇO',
            'ABRIL',
            'MAIO',
            'JUNHO',
            'JULHO',
            'AGOSTO',
            'SETEMBRO',
            'OUTUBRO',
            'NOVEMBRO',
            'DEZEMBRO'
        ]

        return months[monthIndex]
    }

    const handleOpenEditCertificate = async () => {
        try {
            const res = await getCertificateByStudent(id_student)

            const cert = res.data

            const birth = new Date(cert.birthDate)

            setCertificateData({
                nationality: cert.nationality || '',
                gender: cert.gender || '',
                birthDay: birth.getDate(),
                birthMonth: monthName(birth.getMonth()),
                birthYear: birth.getFullYear(),
                birthCity: cert.birthCity || '',
                birthState: cert.birthState || '',
                motherName: cert.motherName || '',
                fatherName: cert.fatherName || '',

                schoolName: cert.schoolName || '',
                legalStatus: cert.legalStatus || '',
                address: cert.address || '',
                schoolCity: cert.city || '',
                schoolState: cert.state || '',

                conclusionDate: cert.conclusionDate?.slice(0, 10) || '',
                legalBasis: cert.legalBasis || '',
                observations: cert.observations || ''
            })

            setOpenEditCertificateModal(true)

        } catch (err) {
            if (err.response?.status === 404) {
                alert('Nenhum certificado encontrado para este aluno')
            } else {
                alert('Erro ao carregar certificado')
            }
        }
    }

    const formatDate = (date) => {
        if (!date) return ''
        const d = new Date(date)
        if (isNaN(d.getTime())) return ''
        return d.toLocaleDateString('pt-BR')
    }

    const getDay = (date) => {
        const d = new Date(date)
        return isNaN(d.getTime()) ? '' : d.getDate()
    }

    const getMonthName = (date) => {
        const d = new Date(date)
        if (isNaN(d.getTime())) return ''

        return d.toLocaleDateString('pt-BR', { month: 'long' })
    }

    const getYear = (date) => {
        const d = new Date(date)
        return isNaN(d.getTime()) ? '' : d.getFullYear()
    }

    const handleSaveEditCertificate = async () => {
        try {
            // 🔹 Monta a data de nascimento corretamente
            const monthIndex = MONTHS.indexOf(certificateData.birthMonth);
            if (monthIndex === -1) {
                return alert('Mês de nascimento inválido');
            }

            const birthDate = new Date(
                certificateData.birthYear,
                monthIndex,
                certificateData.birthDay
            );

            if (isNaN(birthDate.getTime())) {
                return alert('Data de nascimento inválida');
            }

            const payload = {
                nationality: certificateData.nationality,
                gender: certificateData.gender,
                birthDate,
                birthCity: certificateData.birthCity,
                birthState: certificateData.birthState,
                motherName: certificateData.motherName,
                fatherName: certificateData.fatherName,

                schoolName: certificateData.schoolName,
                legalStatus: certificateData.legalStatus,
                address: certificateData.address,
                city: certificateData.schoolCity,
                state: certificateData.schoolState,

                conclusionDate: certificateData.conclusionDate,
                legalBasis: certificateData.legalBasis,
                observations: certificateData.observations
            };

            await updateCertificate(id_student, payload);

            alert('Certificado atualizado com sucesso');
            setOpenEditCertificateModal(false);

            window.location.reload()

        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar certificado');
        }
    };

    const handlePrint = (type) => {

        // 🔍 valida se existe histórico sem situação
        const hasHistoryWithoutSituation = history.some(item => {
            if (item.studentSituation === null || item.studentSituation === undefined) return true
            if (typeof item.studentSituation === 'string' && item.studentSituation.trim() === '') return true
            return false
        })

        if (hasHistoryWithoutSituation) {
            setShowWarningModal(true)
            return
        }

        // ✅ tudo ok → mostra alerta simples
        setPrintType(type)
        setShowPrintAlert(true)

    };

    const proceedToPrint = () => {
        document.body.classList.remove('print-history-only', 'print-full')

        if (printType === 'history') {
            document.body.classList.add('print-history-only')
        }

        if (printType === 'full') {
            document.body.classList.add('print-full')
        }

        setShowPrintAlert(false)

        setTimeout(() => {
            window.print()
        }, 100)
    }

    console.log("certificate", certificate)

    return (
        <Container >
            {/* 🔑 SEMPRE AQUI, NO TOPO */}
            <GlobalPrintStyle />
            <div className="no-print" style={{ marginRight: "10px", marginBottom: "10px", display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <ActionButton
                    style={{ backgroundColor: '#2e7d32' }}
                    onClick={() => handlePrint('history')}
                >
                    Imprimir Histórico
                </ActionButton>
                {hasCertificate && (
                    <ActionButton
                        style={{ backgroundColor: '#424242' }}
                        onClick={() => handlePrint('full')}
                    >
                        Imprimir Certificado
                    </ActionButton>
                )}
            </div>

            {/* ================= CERTIFICADO DE CONCLUSÃO ================= */}
            <CertificateContainer ref={certificateRef} className="print-certificate">
                <div
                    className="no-print"
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: '16px'
                    }}
                >
                    {!hasCertificate && (
                        <ActionButton
                            style={{ backgroundColor: '#6a1b9a' }}
                            onClick={() => setOpenCertificateModal(true)}
                        >
                            Preencher Certificado de Conclusão
                        </ActionButton>
                    )}
                    {hasCertificate && (
                        <ActionButton
                            style={{ backgroundColor: '#1565c0' }}
                            onClick={handleOpenEditCertificate}
                        >
                            Editar Certificado
                        </ActionButton>
                    )}

                </div>

                {/* CABEÇALHO */}
                <CertificateHeader className="certificate-header">
                    <Brasao>
                        {(logoUrl) && (
                            <Preview src={logoUrl} alt="Logo da escola" />
                        )}
                    </Brasao>

                    <HeaderCenter>
                        <Line>
                            <span>{certificate.schoolName}</span>
                        </Line>

                        <Line>
                            <span>{certificate.address}</span>
                        </Line>

                        <Line>
                            <Label>SITUAÇÃO LEGAL:</Label>
                            <span>{certificate.legalStatus}</span>
                        </Line>

                        <Line>
                            <Label>MUNICÍPIO/UF:</Label>
                            <span>{certificate.city} — {certificate.state}</span>
                        </Line>
                    </HeaderCenter>

                </CertificateHeader>

                {/* TÍTULO */}
                <CertificateTitle className='certificate-title'>
                    CERTIFICADO DE CONCLUSÃO DO ENSINO FUNDAMENTAL
                </CertificateTitle>

                {/* TEXTO */}
                <CertificateText className="certificate-text">
                    CERTIFICAMOS QUE{' '}
                    <Field><strong>{certificate.studentName}</strong></Field>, natural de{' '}
                    <Field>{certificate.birthCity}</Field> – UF{' '}
                    <Field>{certificate.birthState}</Field>, de nacionalidade{' '}
                    <Field>{certificate.nationality}</Field>, sexo{' '}
                    <Field>{certificate.gender}</Field>, nascido(a) aos{' '}
                    <Field>{getDay(certificate.birthDate)}</Field> de{' '}
                    <Field>{getMonthName(certificate.birthDate).toUpperCase()}</Field> de{' '}
                    <Field>{getYear(certificate.birthDate)}</Field>, filho(a) de{' '}
                    <Field>{certificate.motherName}</Field> e de{' '}
                    <Field>{certificate.fatherName}</Field>, concluiu, em{' '}
                    <Field>{formatDate(certificate.conclusionDate)}</Field>, o{' '}
                    <strong>ENSINO FUNDAMENTAL</strong>, conforme Histórico Escolar.
                </CertificateText>

                <CertificateFooter className='certificate-footer'>
                    FUNDAMENTAÇÃO LEGAL: {certificate.legalBasis}
                </CertificateFooter>

                <SignatureSectionCert className="print-signature">
                    <SignatureRow>
                        <SignatureBlock>
                            <SignatureLine />
                            <SignatureLabel>Assinatura do(a) Secretário(a)</SignatureLabel>
                        </SignatureBlock>

                        <SignatureBlock>
                            <SignatureLine />
                            <SignatureLabel>Assinatura do(a) Diretor(a)</SignatureLabel>
                        </SignatureBlock>
                    </SignatureRow>

                    <DateRow>
                        <span>Data de expedição: ____ / ____ / ______</span>
                    </DateRow>
                </SignatureSectionCert>

            </CertificateContainer>

            <ContainerHistory ref={historyRef} className="print-history">
                <hr className="no-print" style={{ margin: '24px 0', border: '1px solid #000' }} />

                <Header>
                    <Title>HISTÓRICO ESCOLAR - ENSINO FUNDAMENTAL - ANOS INICIAIS</Title>
                </Header>

                <div
                    className="no-print"
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: '16px'
                    }}
                >
                    <button
                        style={{
                            padding: '10px 16px',
                            background: '#2e7d32',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                        onClick={handleOpenNewHistory}
                    >
                        + Registrar Novo Histórico
                    </button>
                </div>

                <StudentInfo>
                    <div className='strongAluno'>Aluno: {studentName}</div>
                </StudentInfo>

                {history.map((year) => (
                    <SchoolBlock key={year._id}>

                        <TableScroll>
                            {/* BOTÃO EDITAR */}
                            <div className="action-bar no-print" /*style={{ display: 'grid', width: '100%', justifyContent: 'flex-end', /*height: '0px' }}*/>
                                <ActionButton
                                    onClick={() => {
                                        setEditYear(year)
                                        setFormYear({
                                            ...JSON.parse(JSON.stringify(year)),
                                            extraSubjects: year.extraSubjects || []
                                        })
                                    }}
                                >
                                    Complementar Histórico
                                </ActionButton>

                                {year.createdManually && (
                                    <ActionButton
                                        style={{ backgroundColor: '#1565c0' }}
                                        onClick={() => {
                                            // 👇 notas reais vindas do reportCard
                                            const gradesFromReportCard = extractGradesFromReportCard(year.reportCard)

                                            const mergedGrades = {}

                                            // matérias cadastradas atualmente
                                            matters.forEach(m => {
                                                mergedGrades[m.name] = gradesFromReportCard[m.name] ?? ''
                                            })

                                            // matérias antigas que não existem mais no cadastro
                                            Object.keys(gradesFromReportCard).forEach(name => {
                                                if (!(name in mergedGrades)) {
                                                    mergedGrades[name] = gradesFromReportCard[name]
                                                }
                                            })

                                            // 🔹 frequência normalizada
                                            const rawFreq = year.reportCard?.[0]?.frequencia ?? {}

                                            const totalAulas = Number(rawFreq.totalAulas || 0)
                                            const totalPresencas = Number(rawFreq.totalPresencas || 0)
                                            const totalFaltas = Number(rawFreq.totalFaltas || 0)
                                            const totalFaltasJustificadas = Number(rawFreq.totalFaltasJustificadas || 0)

                                            const percentualPresenca =
                                                totalAulas ? ((totalPresencas / totalAulas) * 100).toFixed(2) + '%' : '0%'

                                            const percentualFaltas =
                                                totalAulas
                                                    ? (((totalFaltas + totalFaltasJustificadas) / totalAulas) * 100).toFixed(2) + '%'
                                                    : '0%'

                                            setEditManualHistory({
                                                ...year,
                                                grades: mergedGrades,
                                                frequencia: {
                                                    totalPresencas: year.reportCard?.[0]?.frequencia?.totalPresencas || '',
                                                    totalFaltas: year.reportCard?.[0]?.frequencia?.totalFaltas || '',
                                                    percentualPresenca,
                                                    percentualFaltas
                                                }
                                            })

                                            setOpenEditManualHistory(true)
                                        }}

                                    >
                                        Editar Histórico
                                    </ActionButton>
                                )}

                            </div>

                            {/* ANO / SÉRIE ACIMA DO BLOCO */}
                            <div style={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div><p style={{ margin: 0 }}>{year.serie}</p></div>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <p style={{ margin: 0 }}>Ano:</p>
                                    <p style={{ margin: 0 }}>{year.year}</p>
                                </div>
                            </div>

                            {/* NOME DA ESCOLA */}
                            <SchoolName><span>{year.nameSchool}</span></SchoolName>
                            <SchoolName style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={{ fontWeight: 500 }}>Município: {year.municipality}</span>
                                <span style={{ fontWeight: 500 }}>Estado: {year.state}</span>
                            </SchoolName>

                            <InfoRow>
                                <p>
                                    Nota Total:{' '}
                                    <strong style={{ /*color: '#1d7f14'*/ }}>
                                        {parseFloat(year.totalGrade)}
                                    </strong>
                                </p>

                                <p>
                                    Nota Média:{' '}
                                    <strong style={{ /*color: 'blue'*/ }}>
                                        {parseFloat(year.averageGrade)}
                                    </strong>
                                </p>

                                <p>
                                    Dias Letivos Anuais: <strong>{year.annualSchoolDays}</strong>
                                </p>

                                <p>
                                    CH Anual: <strong>{year.annualSchoolDays * year.dailyWorkload}hrs</strong>
                                </p>
                            </InfoRow>
                            <Table>
                                <thead>
                                    <tr style={{ border: '1px solid #000' }}>

                                        <th style={{ border: '1px solid #000' }}>Componentes Curriculares</th>
                                        {subjects.map((subj) => (
                                            <th
                                                key={subj}
                                                style={{
                                                    minWidth: '25px',       // largura mínima da coluna
                                                    textAlign: 'center',      // alinha texto à esquerda
                                                    justifyContent: 'center',      // alinha texto à esquerda
                                                    padding: '10px 5px',    // espaço interno
                                                    writingMode: 'vertical-rl', // texto na vertical
                                                    transform: 'rotate(180deg)', // rotaciona para ficar diagonal
                                                    whiteSpace: 'nowrap',   // impede quebra de linha
                                                    border: '1px solid #000', // borda da célula
                                                    verticalAlign: 'middle',
                                                }}
                                            >{subj}</th>
                                        ))}
                                        {/* 5 colunas vazias */}
                                        {year.extraSubjects && year.extraSubjects.length > 0 ? (
                                            year.extraSubjects.map((extra, i) => (
                                                <th
                                                    key={`extra-${i}`}
                                                    style={{
                                                        minWidth: '45px',
                                                        textAlign: 'center',
                                                        writingMode: 'vertical-rl',
                                                        transform: 'rotate(180deg)',
                                                        border: '1px solid #000'
                                                    }}
                                                >
                                                    {extra.name}
                                                </th>
                                            ))
                                        ) : (
                                            <th
                                                style={{
                                                    minWidth: '45px',
                                                    border: '1px solid #000'
                                                }}
                                            />
                                        )}

                                        {/* Coluna Total de Carga Horária na diagonal */}
                                        <th
                                            style={{
                                                minWidth: '30px',
                                                padding: '10px 5px',
                                                writingMode: 'vertical-rl',
                                                transform: 'rotate(180deg)',
                                                whiteSpace: 'nowrap',
                                                border: '1px solid #000',
                                                textAlign: 'center',
                                                verticalAlign: 'middle',
                                            }}
                                        >
                                            Total de Carga Horária
                                        </th>

                                        <th
                                            style={{
                                                minWidth: '30px',
                                                padding: '10px 5px',
                                                writingMode: 'vertical-rl',
                                                transform: 'rotate(180deg)',
                                                whiteSpace: 'nowrap',
                                                border: '1px solid #000',
                                                textAlign: 'center',
                                                verticalAlign: 'middle',
                                            }}
                                        >
                                            Situação do Aluno</th> {/* nova coluna */}
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        {/* célula apenas de referência */}
                                        <td ><strong>Aproveitamento</strong></td>

                                        {subjects.map((subj) => (
                                            <td key={subj}>
                                                {renderNotaFinal(year.reportCard, subj)}
                                            </td>
                                        ))}
                                        {/* matérias extras — garante pelo menos 1 coluna */}
                                        {year.extraSubjects && year.extraSubjects.length > 0 ? (
                                            year.extraSubjects.map((extra, i) => (
                                                <td key={`extra-${i}`} style={{ textAlign: 'center' }}>
                                                    {extra.grade}
                                                </td>
                                            ))
                                        ) : (
                                            <td />
                                        )}



                                        {/* Total CH */}
                                        <td
                                            style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle',
                                            }}
                                        >

                                        </td>

                                        {/* Coluna Situação com rowSpan */}
                                        <td
                                            rowSpan={3}
                                            style={{
                                                writingMode: 'vertical-rl',
                                                transform: 'rotate(180deg)',
                                                textAlign: 'center',
                                                verticalAlign: 'middle',
                                                fontWeight: 'bold',
                                                fontSize: '13px',
                                                letterSpacing: '1px',
                                                color:
                                                    year.studentSituation === 'APROVADO'
                                                        ? '#1d7f14'
                                                        : year.studentSituation === 'REPROVADO'
                                                            ? '#c62828'
                                                            : '#1565c0'
                                            }}
                                        >
                                            {year.studentSituation || '—'}
                                        </td>

                                    </tr>
                                    {/* Nova linha de Carga Horária */}
                                    <tr>
                                        <td><strong>Carga Horária</strong></td>
                                        <td colSpan={subjects.length} style={{ textAlign: 'center', /*color: 'green'*/ }}>
                                            {renderCargaHorariaAluno(year.reportCard, year.dailyWorkload)}hrs
                                        </td>
                                        {/* matérias extras — garante 1 célula vazia */}
                                        {year.extraSubjects && year.extraSubjects.length > 0 ? (
                                            <td
                                                colSpan={year.extraSubjects.length}
                                                style={{ textAlign: 'center', /*color: 'green'*/ }}
                                            >
                                                {year.extraWorkingHours || ''}
                                                {year.extraWorkingHours ? 'hrs' : ''}
                                            </td>
                                        ) : (
                                            <td />
                                        )}
                                        {/* Total CH */}
                                        <td
                                            style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle',
                                                //color: '#1d7f14'
                                            }}
                                        >
                                            {renderTotalCargaHoraria(
                                                year.reportCard,
                                                year.dailyWorkload,
                                                year.extraWorkingHours
                                            )}hrs
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Faltas/Horas</strong></td>
                                        <td colSpan={subjects.length} style={{ textAlign: 'center', /*color: 'red'*/ }}>
                                            {renderFaltasHorasAluno(year.reportCard, year.dailyWorkload)}hrs
                                        </td>
                                        {/* matérias extras — garante 1 célula vazia */}
                                        {year.extraSubjects && year.extraSubjects.length > 0 ? (
                                            <td
                                                colSpan={year.extraSubjects.length}
                                                style={{ textAlign: 'center', /*color: 'red'*/ }}
                                            >
                                                {year.absencesOvertime || ''}
                                                {year.absencesOvertime ? 'hrs' : ''}
                                            </td>
                                        ) : (
                                            <td />
                                        )}

                                        <td
                                            rowSpan={1}
                                            style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle',
                                                //color: 'red'
                                            }}
                                        >
                                            {renderTotalFaltasHoras(
                                                year.reportCard,
                                                year.dailyWorkload,
                                                year.absencesOvertime
                                            )}hrs
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>

                        </TableScroll>
                    </SchoolBlock>
                ))}

                <SignatureSection className="print-signature">
                    <SignatureRow>
                        <SignatureBlock>
                            <SignatureLine />
                            <SignatureLabel>Assinatura do(a) Secretário(a)</SignatureLabel>
                        </SignatureBlock>

                        <SignatureBlock>
                            <SignatureLine />
                            <SignatureLabel>Assinatura do(a) Diretor(a)</SignatureLabel>
                        </SignatureBlock>
                    </SignatureRow>

                    <DateRow>
                        <span>Data de expedição: ____ / ____ / ______</span>
                    </DateRow>
                </SignatureSection>

            </ContainerHistory>


            {
                openNewHistory && (
                    <NewHistoryOverlay>
                        <NewHistoryModal onClick={e => e.stopPropagation()}>
                            <NewHistoryTitle>Novo Histórico Escolar</NewHistoryTitle>

                            <NewHistoryForm>

                                {/* ================= DADOS DA ESCOLA ================= */}
                                <NewHistorySection>
                                    <SectionTitle>Dados da Escola</SectionTitle>

                                    <NewHistoryRow>
                                        <NewHistoryLabel>Ano</NewHistoryLabel>
                                        <NewHistorySelect
                                            value={newHistory.year}
                                            onChange={e => setNewHistory({ ...newHistory, year: e.target.value })}
                                        >
                                            <option value="">Selecione o ano</option>
                                            {yearsList.map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </NewHistorySelect>
                                    </NewHistoryRow>

                                    <NewHistoryRow>
                                        <NewHistoryLabel>Escola</NewHistoryLabel>
                                        <NewHistoryInput
                                            value={newHistory.nameSchool}
                                            onChange={e =>
                                                setNewHistory({ ...newHistory, nameSchool: e.target.value.toUpperCase() })
                                            }
                                        />
                                    </NewHistoryRow>

                                    <NewHistoryRow>
                                        <NewHistoryLabel>Município</NewHistoryLabel>
                                        <NewHistoryInput
                                            value={newHistory.municipality}
                                            onChange={e =>
                                                setNewHistory({ ...newHistory, municipality: e.target.value.toUpperCase() })
                                            }
                                        />
                                    </NewHistoryRow>

                                    <NewHistoryRow>
                                        <NewHistoryLabel>Estado</NewHistoryLabel>
                                        <NewHistoryInput
                                            value={newHistory.state}
                                            onChange={e =>
                                                setNewHistory({ ...newHistory, state: e.target.value.toUpperCase() })
                                            }
                                        />
                                    </NewHistoryRow>
                                </NewHistorySection>

                                {/* ================= DADOS ACADÊMICOS ================= */}
                                <NewHistorySection>
                                    <SectionTitle>Dados Acadêmicos</SectionTitle>

                                    <NewHistoryRow>
                                        <NewHistoryLabel>Série</NewHistoryLabel>
                                        <NewHistorySelect
                                            value={newHistory.serie}
                                            onChange={e => setNewHistory({ ...newHistory, serie: e.target.value })}
                                        >
                                            <option value="">Selecione</option>
                                            {assessmentFormat === 'grade' && (
                                                <>
                                                    <option value="1º ANO">1º ANO</option>
                                                    <option value="2º ANO">2º ANO</option>
                                                    <option value="3º ANO">3º ANO</option>
                                                    <option value="4º ANO">4º ANO</option>
                                                    <option value="5º ANO">5º ANO</option>
                                                </>
                                            )}
                                        </NewHistorySelect>
                                    </NewHistoryRow>

                                    <NewHistoryRow>
                                        <NewHistoryLabel>Carga Horária Diária</NewHistoryLabel>
                                        <NewHistoryInput
                                            type="number"
                                            value={newHistory.dailyWorkload}
                                            onChange={e =>
                                                setNewHistory({ ...newHistory, dailyWorkload: e.target.value })
                                            }
                                        />
                                    </NewHistoryRow>

                                    <NewHistoryRow>
                                        <NewHistoryLabel>Dias Letivos</NewHistoryLabel>
                                        <NewHistoryInput
                                            type="number"
                                            value={newHistory.annualSchoolDays}
                                            onChange={e =>
                                                setNewHistory({ ...newHistory, annualSchoolDays: e.target.value })
                                            }
                                        />
                                    </NewHistoryRow>
                                    <NewHistoryRow>
                                        <NewHistoryLabel>Nota Total (Anual)</NewHistoryLabel>
                                        <NewHistoryInput
                                            type="number"
                                            value={newHistory.totalGrade}
                                            onChange={e =>
                                                setNewHistory({ ...newHistory, totalGrade: e.target.value })
                                            }
                                        />
                                    </NewHistoryRow>
                                    <NewHistoryRow>
                                        <NewHistoryLabel>Nota Media (Anual)</NewHistoryLabel>
                                        <NewHistoryInput
                                            type="number"
                                            value={newHistory.averageGrade}
                                            onChange={e =>
                                                setNewHistory({ ...newHistory, averageGrade: e.target.value })
                                            }
                                        />
                                    </NewHistoryRow>
                                </NewHistorySection>

                                {/* ================= NOTAS ================= */}
                                <NewHistorySection>
                                    <SectionTitle>Notas por Matéria</SectionTitle>

                                    {matters.map(matter => (
                                        <SubjectRow key={matter._id}>
                                            <SubjectName>{matter.name}</SubjectName>
                                            <SubjectInput
                                                type="number"
                                                value={newHistory.grades?.[matter.name] || ''}
                                                onChange={e =>
                                                    setNewHistory(prev => ({
                                                        ...prev,
                                                        grades: {
                                                            ...(prev.grades || {}),
                                                            [matter.name]: e.target.value
                                                        }
                                                    }))
                                                }
                                            />
                                        </SubjectRow>
                                    ))}
                                </NewHistorySection>

                                {/* ================= FREQUÊNCIA ================= */}
                                <NewHistorySection>
                                    <SectionTitle>Frequência</SectionTitle>

                                    <NewHistoryRow>
                                        <NewHistoryLabel>Presenças</NewHistoryLabel>
                                        <NewHistoryInput
                                            type="number"
                                            value={newHistory.totalPresencas}
                                            onChange={e =>
                                                setNewHistory({ ...newHistory, totalPresencas: e.target.value })
                                            }
                                        />
                                    </NewHistoryRow>

                                    <NewHistoryRow>
                                        <NewHistoryLabel>Faltas</NewHistoryLabel>
                                        <NewHistoryInput
                                            type="number"
                                            value={newHistory.totalFaltas}
                                            onChange={e =>
                                                setNewHistory({ ...newHistory, totalFaltas: e.target.value })
                                            }
                                        />
                                    </NewHistoryRow>
                                </NewHistorySection>

                            </NewHistoryForm>

                            <NewHistoryFooter>
                                <CancelButton onClick={() => setOpenNewHistory(false)}>
                                    Cancelar
                                </CancelButton>
                                <SaveButton onClick={handleSaveNewHistory}>
                                    Salvar
                                </SaveButton>
                            </NewHistoryFooter>
                        </NewHistoryModal>
                    </NewHistoryOverlay>
                )
            }

            {
                editYear && (
                    <ModalOverlay onClick={() => setEditYear(null)}>
                        <ModalContainer onClick={(e) => e.stopPropagation()}>
                            <ModalTitle>Complementar Histórico Escolar</ModalTitle>

                            {/* MATÉRIAS EXTRAS */}
                            <Section>
                                <h4>Matérias Extras</h4>

                                {formYear.extraSubjects.map((item, index) => (
                                    <ExtraSubjectRow key={index}>
                                        <Input
                                            placeholder="Nome da matéria"
                                            value={item.name}
                                            onChange={e => {
                                                const updated = [...formYear.extraSubjects]
                                                updated[index].name = e.target.value
                                                setFormYear({ ...formYear, extraSubjects: updated })
                                            }}
                                        />

                                        <Input
                                            type="number"
                                            placeholder="Nota"
                                            value={item.grade}
                                            onChange={e => {
                                                const updated = [...formYear.extraSubjects]
                                                updated[index].grade = e.target.value
                                                setFormYear({ ...formYear, extraSubjects: updated })
                                            }}
                                        />

                                        <RemoveButton
                                            onClick={() => {
                                                const updated = [...formYear.extraSubjects]
                                                updated.splice(index, 1)
                                                setFormYear({ ...formYear, extraSubjects: updated })
                                            }}
                                        >
                                            ✕
                                        </RemoveButton>
                                    </ExtraSubjectRow>
                                ))}

                                <AddButton
                                    onClick={() =>
                                        setFormYear({
                                            ...formYear,
                                            extraSubjects: [...formYear.extraSubjects, { name: '', grade: '' }]
                                        })
                                    }
                                >
                                    + Adicionar Matéria Extra
                                </AddButton>
                            </Section>

                            {/* CAMPOS NUMÉRICOS */}
                            <Section>
                                <Label>Carga Horária Extra (horas)</Label>
                                <Input
                                    type="number"
                                    value={formYear.extraWorkingHours || ''}
                                    onChange={e =>
                                        setFormYear({ ...formYear, extraWorkingHours: e.target.value })
                                    }
                                />

                                <Label>Faltas (Horas Extras)</Label>
                                <Input
                                    type="number"
                                    value={formYear.absencesOvertime || ''}
                                    onChange={e =>
                                        setFormYear({ ...formYear, absencesOvertime: e.target.value })
                                    }
                                />

                                <Label>Situação do Aluno</Label>
                                <Select
                                    value={formYear.studentSituation || ''}
                                    onChange={e =>
                                        setFormYear({ ...formYear, studentSituation: e.target.value })
                                    }
                                >
                                    <option value="">Selecione</option>
                                    <option value="APROVADO">Aprovado</option>
                                    <option value="REPROVADO">Reprovado</option>
                                    {/*<option value="TRANSFERIDO">Transferido</option>
                                <option value="DESISTENTE">Desistente</option>*/}
                                </Select>
                            </Section>

                            {/* BOTÕES */}
                            <Footer>
                                <CancelButton onClick={() => setEditYear(null)}>
                                    Cancelar
                                </CancelButton>
                                <SaveButton onClick={handleSaveEdition}>
                                    Salvar
                                </SaveButton>
                            </Footer>
                        </ModalContainer>
                    </ModalOverlay>
                )
            }

            {
                openEditManualHistory && editManualHistory && (
                    <EditOverlay onClick={() => setOpenEditManualHistory(false)}>
                        <EditModal onClick={(e) => e.stopPropagation()}>
                            <EditTitle>Editar Histórico Escolar</EditTitle>

                            <EditForm>
                                <EditSection>
                                    <EditRow>
                                        <EditLabel>Ano</EditLabel>
                                        <SelectEdit
                                            value={editManualHistory.year}
                                            onChange={e =>
                                                setEditManualHistory({
                                                    ...editManualHistory,
                                                    year: e.target.value
                                                })
                                            }
                                        >
                                            <option value="">Selecione o ano</option>

                                            {yearsList.map(year => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </SelectEdit>
                                    </EditRow>
                                    <EditRow>
                                        <EditLabel>Série</EditLabel>
                                        <SelectEdit
                                            value={editManualHistory.serie}
                                            onChange={e =>
                                                setEditManualHistory({
                                                    ...editManualHistory,
                                                    serie: e.target.value
                                                })
                                            }
                                        >
                                            <option value="">Selecione a série</option>

                                            {assessmentFormat === "grade" && (
                                                <>
                                                    <option value="1º ANO">1º ANO</option>
                                                    <option value="2º ANO">2º ANO</option>
                                                    <option value="3º ANO">3º ANO</option>
                                                    <option value="4º ANO">4º ANO</option>
                                                    <option value="5º ANO">5º ANO</option>
                                                </>
                                            )}

                                            {assessmentFormat === "concept" && (
                                                <>
                                                    <option value="MATERNAL">MATERNAL</option>
                                                    <option value="1º PERÍODO">1º PERÍODO</option>
                                                    <option value="2º PERÍODO">2º PERÍODO</option>
                                                </>
                                            )}
                                        </SelectEdit>
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Escola</EditLabel>
                                        <EditInput
                                            value={editManualHistory.nameSchool}
                                            onChange={e =>
                                                setEditManualHistory({
                                                    ...editManualHistory,
                                                    nameSchool: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Município</EditLabel>
                                        <EditInput
                                            value={editManualHistory.municipality}
                                            onChange={e =>
                                                setEditManualHistory({
                                                    ...editManualHistory,
                                                    municipality: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Estado</EditLabel>
                                        <EditInput
                                            value={editManualHistory.state}
                                            onChange={e =>
                                                setEditManualHistory({
                                                    ...editManualHistory,
                                                    state: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <h4>Dados Gerais</h4>

                                    <EditRow>
                                        <EditLabel>Carga Horária Diária (horas)</EditLabel>
                                        <EditInput
                                            type="number"
                                            value={editManualHistory.dailyWorkload ?? ''}
                                            onChange={e =>
                                                setEditManualHistory(prev => ({
                                                    ...prev,
                                                    dailyWorkload: e.target.value
                                                }))
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <Label>Dias Letivos Anuais</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={editManualHistory.annualSchoolDays}
                                            onChange={e =>
                                                setEditManualHistory(prev => ({
                                                    ...prev,
                                                    annualSchoolDays: e.target.value
                                                }))
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Média Anual</EditLabel>
                                        <EditInput
                                            type="number"
                                            value={editManualHistory.averageGrade ?? ''}
                                            onChange={e =>
                                                setEditManualHistory(prev => ({
                                                    ...prev,
                                                    averageGrade: e.target.value
                                                }))
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Nota Total Anual</EditLabel>
                                        <EditInput
                                            type="number"
                                            value={editManualHistory.totalGrade ?? ''}
                                            onChange={e =>
                                                setEditManualHistory(prev => ({
                                                    ...prev,
                                                    totalGrade: e.target.value
                                                }))
                                            }
                                        />
                                    </EditRow>


                                    <h4>Notas por matéria</h4>
                                    {/* ====== MATÉRIAS (NO MESMO CONTAINER) ====== */}
                                    {console.log("editManualHistory", editManualHistory)}
                                    {Object.entries(editManualHistory.grades).map(
                                        ([subject, grade]) => (
                                            <EditRow key={subject}>
                                                <EditLabel>{subject}</EditLabel>
                                                <EditInput
                                                    type="number"
                                                    min="0"
                                                    value={grade}
                                                    onChange={e =>
                                                        setEditManualHistory(prev => ({
                                                            ...prev,
                                                            grades: {
                                                                ...prev.grades,
                                                                [subject]: e.target.value
                                                            }
                                                        }))
                                                    }
                                                />
                                            </EditRow>
                                        )
                                    )}

                                    <h4>Frequência do Aluno</h4>

                                    <EditRow>
                                        <EditLabel>Total de Presenças (Anual)</EditLabel>
                                        <EditInput
                                            type="number"
                                            value={editManualHistory.frequencia.totalPresencas}
                                            onChange={e => {
                                                const presencas = Number(e.target.value)
                                                const totalAulas = Number(editManualHistory.frequencia.totalAulas || 0)
                                                const faltas = Number(editManualHistory.frequencia.totalFaltas || 0)
                                                const justificadas = Number(editManualHistory.frequencia.totalFaltasJustificadas || 0)

                                                setEditManualHistory(prev => ({
                                                    ...prev,
                                                    frequencia: {
                                                        ...prev.frequencia,
                                                        totalPresencas: presencas,
                                                        percentualPresenca:
                                                            totalAulas ? ((presencas / totalAulas) * 100).toFixed(2) + '%' : '0%',
                                                        percentualFaltas:
                                                            totalAulas ? (((faltas + justificadas) / totalAulas) * 100).toFixed(2) + '%' : '0%'
                                                    }
                                                }))
                                            }}
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Total de Faltas (Anual)</EditLabel>
                                        <EditInput
                                            type="number"
                                            value={editManualHistory.frequencia.totalFaltas}
                                            onChange={e => {
                                                const faltas = Number(e.target.value)
                                                const totalAulas = Number(editManualHistory.frequencia.totalAulas || 0)
                                                const presencas = Number(editManualHistory.frequencia.totalPresencas || 0)
                                                const justificadas = Number(editManualHistory.frequencia.totalFaltasJustificadas || 0)

                                                setEditManualHistory(prev => ({
                                                    ...prev,
                                                    frequencia: {
                                                        ...prev.frequencia,
                                                        totalFaltas: faltas,
                                                        percentualPresenca:
                                                            totalAulas ? ((presencas / totalAulas) * 100).toFixed(2) + '%' : '0%',
                                                        percentualFaltas:
                                                            totalAulas ? (((faltas + justificadas) / totalAulas) * 100).toFixed(2) + '%' : '0%'
                                                    }
                                                }))
                                            }}
                                        />
                                    </EditRow>

                                </EditSection>
                            </EditForm>

                            <EditFooter>
                                <EditCancelButton onClick={() => setOpenEditManualHistory(false)}>
                                    Cancelar
                                </EditCancelButton>

                                <EditSaveButton
                                    onClick={() => setOpenConfirmSave(true)}
                                >
                                    Salvar
                                </EditSaveButton>

                            </EditFooter>
                        </EditModal>
                    </EditOverlay>
                )
            }

            {
                openConfirmSave && (
                    <EditOverlay onClick={() => setOpenConfirmSave(false)}>
                        <EditModal
                            onClick={e => e.stopPropagation()}
                            style={{ maxWidth: 420, textAlign: 'center' }}
                        >
                            <EditTitle>Confirmar alteração</EditTitle>

                            <p style={{ margin: '20px 0', fontSize: 15 }}>
                                Deseja realmente salvar as alterações feitas neste histórico escolar?
                            </p>

                            <EditFooter>
                                <EditCancelButton
                                    onClick={() => setOpenConfirmSave(false)}
                                >
                                    Cancelar
                                </EditCancelButton>

                                <EditSaveButton
                                    onClick={async () => {
                                        const payload = {
                                            year: editManualHistory.year,
                                            serie: editManualHistory.serie,
                                            nameSchool: editManualHistory.nameSchool,
                                            municipality: editManualHistory.municipality,
                                            state: editManualHistory.state,
                                            grades: editManualHistory.grades,
                                            dailyWorkload: editManualHistory.dailyWorkload,
                                            annualSchoolDays: editManualHistory.annualSchoolDays,
                                            totalGrade: editManualHistory.totalGrade,
                                            averageGrade: editManualHistory.averageGrade,
                                            reportCard: [
                                                {
                                                    ...editManualHistory.reportCard[0],
                                                    studentGrade: Object.fromEntries(
                                                        Object.entries(editManualHistory.grades).map(
                                                            ([name, grade]) => [
                                                                name,
                                                                { total: Number(grade), atividades: [] }
                                                            ]
                                                        )
                                                    ),
                                                    frequencia: {
                                                        ...editManualHistory.frequencia
                                                    }
                                                }
                                            ]
                                        }

                                        try {
                                            await updateManualHistory(editManualHistory._id, payload)

                                            const res = await GetStudentHistory(id_student)
                                            setHistory(res.data)

                                            setOpenConfirmSave(false)
                                            setOpenEditManualHistory(false)

                                            alert('Histórico atualizado com sucesso')
                                        } catch (err) {
                                            alert(
                                                err?.response?.data?.message ||
                                                'Erro ao atualizar histórico'
                                            )
                                        }
                                    }}
                                >
                                    Confirmar
                                </EditSaveButton>
                            </EditFooter>
                        </EditModal>
                    </EditOverlay>
                )
            }

            {
                openCertificateModal && (
                    <EditOverlay onClick={() => setOpenCertificateModal(false)}>
                        <EditModal onClick={e => e.stopPropagation()}>

                            <EditTitle>Preencher Certificado de Conclusão</EditTitle>

                            <EditForm>

                                {/* ================= DADOS DO ESTABELECIMENTO ================= */}
                                <EditSection>
                                    <h4>Dados do Estabelecimento</h4>

                                    <EditRow>
                                        <EditLabel>Nome do Estabelecimento</EditLabel>
                                        <EditInput
                                            value={certificateData.schoolName}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    schoolName: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Situação Legal</EditLabel>
                                        <EditInput
                                            value={certificateData.legalStatus}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    legalStatus: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Endereço</EditLabel>
                                        <EditInput
                                            value={certificateData.address}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    address: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Município</EditLabel>
                                        <EditInput
                                            value={certificateData.schoolCity}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    schoolCity: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Estado</EditLabel>
                                        <EditInput
                                            value={certificateData.schoolState}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    schoolState: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>
                                </EditSection>

                                {/* ================= DADOS DO ALUNO ================= */}
                                <EditSection>
                                    <h4>Dados Pessoais do Aluno</h4>

                                    <EditRow>
                                        <EditLabel>Nacionalidade</EditLabel>
                                        <EditInput
                                            value={certificateData.nationality}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    nationality: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Sexo</EditLabel>
                                        <Select
                                            value={certificateData.gender}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    gender: e.target.value
                                                })
                                            }
                                        >
                                            <option value="">SELECIONE</option>
                                            <option value="MASCULINO">MASCULINO</option>
                                            <option value="FEMININO">FEMININO</option>
                                        </Select>
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Data de Nascimento</EditLabel>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <EditInput
                                                type="number"
                                                placeholder="Dia"
                                                style={{ width: 80 }}
                                                value={certificateData.birthDay}
                                                onChange={e =>
                                                    setCertificateData({
                                                        ...certificateData,
                                                        birthDay: e.target.value
                                                    })
                                                }
                                            />

                                            <Select
                                                value={certificateData.birthMonth}
                                                onChange={e =>
                                                    setCertificateData({
                                                        ...certificateData,
                                                        birthMonth: e.target.value
                                                    })
                                                }
                                            >
                                                <option value="">SELECIONE O MÊS</option>

                                                {MONTHS.map(month => (
                                                    <option key={month} value={month}>
                                                        {month}
                                                    </option>
                                                ))}
                                            </Select>


                                            <EditInput
                                                type="number"
                                                placeholder="Ano"
                                                style={{ width: 100 }}
                                                value={certificateData.birthYear}
                                                onChange={e =>
                                                    setCertificateData({
                                                        ...certificateData,
                                                        birthYear: e.target.value
                                                    })
                                                }
                                            />
                                        </div>
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Naturalidade (Cidade)</EditLabel>
                                        <EditInput
                                            value={certificateData.birthCity}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    birthCity: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Estado</EditLabel>
                                        <EditInput
                                            value={certificateData.birthState}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    birthState: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Nome da Mãe</EditLabel>
                                        <EditInput
                                            value={certificateData.motherName}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    motherName: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Nome do Pai</EditLabel>
                                        <EditInput
                                            value={certificateData.fatherName}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    fatherName: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>
                                </EditSection>

                                {/* ================= DADOS DO CERTIFICADO ================= */}
                                <EditSection>
                                    <h4>Dados do Certificado</h4>

                                    <EditRow>
                                        <EditLabel>Data de Conclusão</EditLabel>
                                        <EditInput
                                            type="date"
                                            value={certificateData.conclusionDate}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    conclusionDate: e.target.value
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Fundamentação Legal</EditLabel>
                                        <EditInput
                                            value={certificateData.legalBasis}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    legalBasis: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Observações</EditLabel>
                                        <Input
                                            as="textarea"
                                            rows={3}
                                            value={certificateData.observations}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    observations: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>
                                </EditSection>

                            </EditForm>

                            <EditFooter>
                                <EditCancelButton onClick={() => setOpenCertificateModal(false)}>
                                    Cancelar
                                </EditCancelButton>

                                <EditSaveButton onClick={handleSaveCertificate}>
                                    Salvar Certificado
                                </EditSaveButton>
                            </EditFooter>

                        </EditModal>
                    </EditOverlay>
                )
            }

            {
                openEditCertificateModal && (
                    <CertificateOverlay onClick={() => setOpenEditCertificateModal(false)}>
                        <CertificateModal onClick={e => e.stopPropagation()}>
                            <CertificateTitle>Editar Certificado</CertificateTitle>

                            <EditForm>

                                {/* ================= DADOS DO ESTABELECIMENTO ================= */}
                                <EditSection>
                                    <h4>Dados do Estabelecimento</h4>

                                    <EditRow>
                                        <EditLabel>Nome do Estabelecimento</EditLabel>
                                        <EditInput
                                            value={certificateData.schoolName}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    schoolName: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Situação Legal</EditLabel>
                                        <EditInput
                                            value={certificateData.legalStatus}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    legalStatus: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Endereço</EditLabel>
                                        <EditInput
                                            value={certificateData.address}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    address: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Município</EditLabel>
                                        <EditInput
                                            value={certificateData.schoolCity}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    schoolCity: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Estado</EditLabel>
                                        <EditInput
                                            value={certificateData.schoolState}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    schoolState: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>
                                </EditSection>

                                {/* ================= DADOS DO ALUNO ================= */}
                                <EditSection>
                                    <h4>Dados Pessoais do Aluno</h4>

                                    <EditRow>
                                        <EditLabel>Nacionalidade</EditLabel>
                                        <EditInput
                                            value={certificateData.nationality}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    nationality: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Sexo</EditLabel>
                                        <Select
                                            value={certificateData.gender}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    gender: e.target.value
                                                })
                                            }
                                        >
                                            <option value="">SELECIONE</option>
                                            <option value="MASCULINO">MASCULINO</option>
                                            <option value="FEMININO">FEMININO</option>
                                        </Select>
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Data de Nascimento</EditLabel>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <EditInput
                                                type="number"
                                                placeholder="Dia"
                                                style={{ width: 80 }}
                                                value={certificateData.birthDay}
                                                onChange={e =>
                                                    setCertificateData({
                                                        ...certificateData,
                                                        birthDay: e.target.value
                                                    })
                                                }
                                            />

                                            <Select
                                                value={certificateData.birthMonth}
                                                onChange={e =>
                                                    setCertificateData({
                                                        ...certificateData,
                                                        birthMonth: e.target.value
                                                    })
                                                }
                                            >
                                                <option value="">SELECIONE O MÊS</option>

                                                {MONTHS.map(month => (
                                                    <option key={month} value={month}>
                                                        {month}
                                                    </option>
                                                ))}
                                            </Select>

                                            <EditInput
                                                type="number"
                                                placeholder="Ano"
                                                style={{ width: 100 }}
                                                value={certificateData.birthYear}
                                                onChange={e =>
                                                    setCertificateData({
                                                        ...certificateData,
                                                        birthYear: e.target.value
                                                    })
                                                }
                                            />
                                        </div>
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Naturalidade (Cidade)</EditLabel>
                                        <EditInput
                                            value={certificateData.birthCity}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    birthCity: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Estado</EditLabel>
                                        <EditInput
                                            value={certificateData.birthState}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    birthState: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Nome da Mãe</EditLabel>
                                        <EditInput
                                            value={certificateData.motherName}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    motherName: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Nome do Pai</EditLabel>
                                        <EditInput
                                            value={certificateData.fatherName}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    fatherName: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>
                                </EditSection>

                                {/* ================= DADOS DO CERTIFICADO ================= */}
                                <EditSection>
                                    <h4>Dados do Certificado</h4>

                                    <EditRow>
                                        <EditLabel>Data de Conclusão</EditLabel>
                                        <EditInput
                                            type="date"
                                            value={certificateData.conclusionDate}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    conclusionDate: e.target.value
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Fundamentação Legal</EditLabel>
                                        <EditInput
                                            value={certificateData.legalBasis}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    legalBasis: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>

                                    <EditRow>
                                        <EditLabel>Observações</EditLabel>
                                        <Input
                                            as="textarea"
                                            rows={3}
                                            value={certificateData.observations}
                                            onChange={e =>
                                                setCertificateData({
                                                    ...certificateData,
                                                    observations: e.target.value.toUpperCase()
                                                })
                                            }
                                        />
                                    </EditRow>
                                </EditSection>

                            </EditForm>

                            <CertificateFooter>
                                <CancelButton onClick={() => setOpenEditCertificateModal(false)}>
                                    Cancelar
                                </CancelButton>

                                <SaveButton onClick={handleSaveEditCertificate}>
                                    Salvar Alterações
                                </SaveButton>

                            </CertificateFooter>
                        </CertificateModal>
                    </CertificateOverlay>
                )
            }

            {
                showWarningModal && (
                    <ModalOverlay>
                        <ModalContainer>
                            <ModalTitle style={{ color: "red" }}>Atenção</ModalTitle>

                            <p>
                                Existem históricos sem a <strong>situação do aluno</strong>.
                                <br />
                                Identifique qual histórico está incompleto, clique no botão
                                <strong> Complementar Histórico</strong> e informe a situação do aluno
                                antes de realizar a impressão.
                            </p>


                            <Footer>
                                <CancelButton style={{ backgroundColor: "green", color: "white" }} onClick={() => setShowWarningModal(false)}>
                                    Entendi
                                </CancelButton>
                            </Footer>
                        </ModalContainer>
                    </ModalOverlay>
                )
            }

            {
                showPrintAlert && (
                    <ModalOverlay>
                        <ModalContainer>
                            <ModalTitle>Atenção</ModalTitle>

                            <p> Para que o histórico se adeque corretamente à folha, ajuste a <strong>escala de impressão</strong> em <strong>Mais definições</strong>. Isso garante que tanto o conteúdo quanto a fonte se ajustem, evitando cortes ou sobreposição da assinatura. </p>

                            <Footer>
                                <SaveButton onClick={proceedToPrint}>
                                    Entendi
                                </SaveButton>
                            </Footer>
                        </ModalContainer>
                    </ModalOverlay>
                )
            }

        </Container >
    )
}

export default StudentHistory

/* ============================= */
/* CALCULA NOTA FINAL POR MATÉRIA */
/* ============================= */
function renderNotaFinal(reportCard = [], materia) {
    let total = 0
    let encontrou = false

    reportCard.forEach((bim) => {
        const valor = bim.studentGrade?.[materia]?.total
        if (valor !== undefined) {
            total += Number(valor)
            encontrou = true
        }
    })

    return encontrou ? total : '-'
}

function renderCargaHorariaAluno(reportCard = [], dailyWorkload) {
    let totalPresencas = 0

    reportCard.forEach((bim) => {
        totalPresencas += Number(bim.frequencia?.totalPresencas || 0)
    })

    return totalPresencas * Number(dailyWorkload)
}

function renderFaltasHorasAluno(reportCard = [], dailyWorkload) {
    let totalFaltas = 0

    reportCard.forEach((bim) => {
        const faltas = Number(bim.frequencia?.totalFaltas || 0)
        const faltasJustificadas = Number(
            bim.frequencia?.totalFaltasJustificadas || 0
        )

        totalFaltas += faltas + faltasJustificadas
    })

    return totalFaltas * Number(dailyWorkload)
}

function renderTotalCargaHoraria(reportCard = [], dailyWorkload, extraWorkingHours = 0) {
    const cargaRegular = renderCargaHorariaAluno(reportCard, dailyWorkload)
    const cargaExtra = Number(extraWorkingHours) || 0

    return cargaRegular + cargaExtra
}

function renderTotalFaltasHoras(reportCard = [], dailyWorkload, absencesOvertime = 0) {
    const faltasRegulares = renderFaltasHorasAluno(reportCard, dailyWorkload)
    const faltasExtras = Number(absencesOvertime) || 0

    return faltasRegulares + faltasExtras
}
