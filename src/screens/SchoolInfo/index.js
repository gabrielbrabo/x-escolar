import React, { useState, useEffect } from 'react'
import { /*useNavigate,*/ useParams } from 'react-router-dom'
import {
    indexSchool
} from '../../Api'

import {
    Container,
    ContainerDivs,
    Info,
    Details,
    ContDiv,
    ButtonContainer,
    Context,
    LoadingSpinnerContainer,
} from './style';

import LoadingSpinner from '../../components/Loading'

import Employees from '../Employees/index';
import Student from '../Student/index';
import Class from '../Class/index';
import AnnualCalendar from '../AnnualCalendar/index';
import Matter from '../Matter/index';

const SchoolInformation = () => {

    //const navigate = useNavigate()
    const [School, setSchool] = useState([]);
    const [activePage, setActivePage] = useState(() => {
        return localStorage.getItem('activePage') || 'staff';
    });

    const [loading, setLoading] = useState(false);
    const { id } = useParams()


    useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await indexSchool(id)
            console.log("res info schools", res.data.data)
            setSchool(res.data.data)
            setLoading(false);
        })()

    }, [id])

    const handlePageChange = (page) => {
        setActivePage(page);
        localStorage.setItem('activePage', page);
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

    const renderPage = () => {
        switch (activePage) {
            case 'staff':
                return <Employees />; // substitua com seu componente real
            case 'students':
                return <Student />;
            case 'classes':
                return <Class />;
           case 'bimesters':
                return <AnnualCalendar />;
             case 'components':
                return <Matter />;
            default:
                return null;
        }
    };

    const isActive = (component) => activePage === component;

    return (
        <Container>
            {loading ? (
                <LoadingSpinnerContainer>
                    <LoadingSpinner />
                </LoadingSpinnerContainer>
            ) : (
                <ContainerDivs>
                    <Details
                        style={{
                            background: bgColor, // Aplica o gradiente como fundo
                            color: textColor, // Aplica a cor do texto calculada
                        }}
                    >
                        <Info style={{ color: textColor }}>{School.name}</Info>
                        <Info style={{ color: textColor }}>
                            Forma de Avaliação:{' '}
                            {School.assessmentFormat === 'grade' && 'Notas'}
                            {School.assessmentFormat === 'concept' && 'Conceitos'}
                        </Info>
                    </Details>
                    <ContDiv>
                        <ButtonContainer>
                            <button
                                className={isActive('staff') ? 'active' : ''}
                                onClick={() => handlePageChange('staff')}
                            >
                                Funcionário
                            </button>
                            <button
                                className={isActive('students') ? 'active' : ''}
                                onClick={() => handlePageChange('students')}
                            >
                                Alunos
                            </button>
                            <button
                                className={isActive('classes') ? 'active' : ''}
                                onClick={() => handlePageChange('classes')}
                            >
                                Turmas
                            </button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <button
                                className={isActive('bimesters') ? 'active' : ''}
                                onClick={() => handlePageChange('bimesters')}
                            >
                                Bimestres
                            </button>
                            <button
                                className={isActive('components') ? 'active' : ''}
                                onClick={() => handlePageChange('components')}
                            >
                                Componentes curriculares
                            </button>
                        </ButtonContainer>
                    </ContDiv>
                    <Context>
                        {renderPage()}
                    </Context>
                </ContainerDivs>
            )}
        </Container>
    );
}

export default SchoolInformation;