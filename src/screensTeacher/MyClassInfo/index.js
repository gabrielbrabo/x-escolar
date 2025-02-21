import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { clssInfo } from '../../Api'

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
    ContainerDivs
} from './style';
import LoadingSpinner from '../../components/Loading'

const MyCla$$Info = () => {

    const navigate = useNavigate()
    const [clss, setClss] = useState([])
    //const [NameMatter, setNameMatter] = useState([])
    const [stdt, setStdt] = useState([])
    const { id_class } = useParams();
    const { id_teacher } = useParams();
    const [loading, setLoading] = useState(false);
    //console.log(currentYear)

    useEffect(() => {
        (async () => {
            setLoading(true);
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
            console.log("physicalEducationTeacher", physicalEducationTeacher);

            sessionStorage.removeItem("attendance_ idmatter")
            sessionStorage.removeItem("selectedDate")
            sessionStorage.removeItem("day")
            sessionStorage.removeItem("month")
            sessionStorage.removeItem("year")

            //console.log("matter", res.data.data)
            setLoading(false)
        })()

    }, [id_class, id_teacher])

    const StudentInformation = async (stdt) => {
        setLoading(true);
        navigate(`/student/info/${stdt._id}`)
        setLoading(false);
    }

    console.log("student", stdt)

    stdt.sort(function (a, b) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    })

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
                            <ClassInfo style={{color: textColor}}>{clss.serie}</ClassInfo>
                            <ClassInfo style={{color: textColor}}>Turno: {clss.shift}</ClassInfo>
                        </ClassDetails>
                    ))}
                    <ButtonContainer>
                        <button onClick={() => { navigate(/*'/test-attendance'*/'/attendance') }}>Frequência</button>
                        <button onClick={() => { navigate('/classes') }}>Aulas</button>
                        <button onClick={() => { navigate('/grade') }}>Conceitos</button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <button onClick={() => { navigate('/individual-form') }}>Ficha Individual</button>
                        <button onClick={() => { navigate('/final-concepts') }}>Conceitos Finais</button>
                    </ButtonContainer>
                    <StudentSection>
                        <h2 style={{ color: "#158fa2" }}>Alunos</h2>
                        <p>Total de alunos: {stdt.length}</p>
                        {stdt.length > 0 ? (
                            stdt.map(stdt => (
                                <StudentItem onClick={() => StudentInformation(stdt)}>{stdt.name}</StudentItem>
                            ))
                        )
                            :
                            (
                                <InfoText>Não há nenhum estudante</InfoText>
                            )
                        }
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
                </ContainerDivs>
            }
        </Container>
    )
}

export default MyCla$$Info