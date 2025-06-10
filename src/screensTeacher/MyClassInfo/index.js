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
} from './style';
import LoadingSpinner from '../../components/Loading'

const MyCla$$Info = () => {

    const navigate = useNavigate()
    const [assessmentFormat, setassessmentFormat] = useState('');
    const [clss, setClss] = useState([])
    //const [NameMatter, setNameMatter] = useState([])
    const [stdt, setStdt] = useState([])
    const [studentTransferMap, setstudentTransferMap] = useState([]);

    const [classRegentEmployee, setclassRegentEmployee] = useState([])

    const [nameSchool, setnameSchool] = useState([])

    const [AllBimBull, setBimAllBull] = useState(false);

    const [bimonthly, setBimonthly] = useState([]);

    const { id_class } = useParams();
    const { id_teacher } = useParams();
    const [loading, setLoading] = useState(false);
    //console.log(currentYear)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school");
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
                    return (res)
                } else {
                    return null
                }
            })

            console.log("classRegentTeacher", classRegentTeacher);
            console.log("classRegentTeacher02", classRegentTeacher02);
            console.log("physicalEducationTeacher", physicalEducationTeacher);

            sessionStorage.removeItem("attendance_ idmatter")
            sessionStorage.removeItem("selectedDate")
            sessionStorage.removeItem("day")
            sessionStorage.removeItem("month")
            sessionStorage.removeItem("year")

            const year = new Date().getFullYear();
            const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
            const IIndQuarter = await getIIndQuarter(year, JSON.parse(idSchool))
            const IIIrdQuarter = await getIIIrdQuarter(year, JSON.parse(idSchool))
            const IVthQuarter = await getIVthQuarter(year, JSON.parse(idSchool))
            const VthQuarter = await getVthQuarter(year, JSON.parse(idSchool))
            const VIthQuarter = await getVIthQuarter(year, JSON.parse(idSchool))

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

    }, [id_class, id_teacher, classRegentEmployee])

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
                        <button onClick={() => { navigate(/*'/test-attendance'*/'/attendance') }}>Frequência</button>
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
                </ContainerDivs>
            }
        </Container>
    )
}

export default MyCla$$Info