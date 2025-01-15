import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f5;
`;

export const ContainerDivs = styled.div`
  width: 90%;
  max-width: 900px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;

  @media print {
    /* Apenas o conteúdo do ContainerDivs será visível na impressão */
    visibility: visible;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

export const DivAddEmp = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
  }
`;

export const AddEmp = styled.div`
  background-color: #007bff;
  color: white;
  padding: 5px;
  border-radius: 8px;

  h3 {
    margin: 0;
    font-size: 1.5em;
  }
`;

export const DivDados = styled.div`
  background-color: #fafafa;
  width: 100%;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Emp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 1.2em;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  p {
    margin: 0;
    font-weight: bold;
    color: #555;
  }
`;

export const DivNameMatter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

export const Grade = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const DadosStdt = styled.div`
  display: flex;
  padding: 10px;
  gap: 5px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const SpanNameMatter = styled.span`
  font-weight: bold;
  color: #333;
`;

export const SpanTotalGrade = styled.span`
  color: #28a745;
`;

export const SpanAverageGrade = styled.span`
  color: #007bff;
`;

export const SpanGradeStudent = styled.span`
  color: ${props => {
    return props.grade === 'A' ? '#1d7f14' :
      props.grade === 'B' ? 'blue' :
        props.grade === 'C' ? 'orange' :
          props.grade === 'D' ? 'red' : 'black';
  }};
  font-weight: bold;
`;

export const SpanFrequency = styled.div`
  width: 80%;
  height: 0px;
  display: flex;
  justify-content: center;
  position: absolute;

  @media (max-width: 768px) {
    height: 15px;
    position: relative;
  }
  /* Estilize o spinner de carregamento aqui */
`;

export const LoadingSpinner = styled.div`
  /* Estilize o spinner de carregamento aqui */
`;

export const ToGoBack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  margin-bottom: 20px;
  cursor: pointer;

  @media print {
    display: none; /* Ocultar na impressão */
  }
`;

export const SignMessageButtonText = styled.span`
  color: #333;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SignMessageButtonTextBold = styled.span`
  color: #333;
  font-weight: bold;
  margin-left: 5px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const PrintButton = styled.button`
  display: flex;
  left: 70%;
  position: absolute;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

export const LegendBox = styled.div`
    max-width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        margin: 0px;
    }

    p {
        margin: 0px;
        font-size: 15px;
        text-align: left; /* Garante o alinhamento à esquerda */
    }

    @media(max-width: 768px) {
      margin-top: 10px;
    }
`;

export const DivBimTable = styled.div`
  display: flex;

  @media(max-width: 768px) {
        max-width: 90%;
    }
`;

export const DivBimRow = styled.div`
  display: grid;
  border: 0px solid #ddd;
`;

export const DivBimHeader = styled.div`
  display: table-cell;
  text-align: center;
  font-weight: bold;
  padding: 3px;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
`;

export const DivBimCell = styled.div`
  display: table-cell;
  text-align: center;
  padding: 3px;
  border: 1px solid #ddd;
  color: ${props => {
    return props.grade === 'A' ? '#1d7f14' :
      props.grade === 'B' ? 'blue' :
        props.grade === 'C' ? 'orange' :
          props.grade === 'D' ? 'red' : 'black';
  }};
`;

const GlobalStyle = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden; /* Oculta todos os elementos da página */
    }

    #containerDivs, #containerDivs * {
      visibility: visible; /* Mostra apenas o conteúdo de DivAddEmp */
    }
    ${ContainerDivs} {
      display: flex;
      justify-content: center;
    }

    #containerDivs {
      position: absolute;
      width: 80%; /* Certifique-se de que ocupa toda a largura */
      height: auto; /* Permite o ajuste automático da altura */
      box-sizing: border-box; /* Inclui o padding e a borda na largura total */
    }

    ${SpanFrequency} {
      visibility: visible;
      width: 90%;
      height: 0px;
      display: flex;
      justify-content: flex-end;
      position: absolute;

      color: #000; /* Ajuste a cor se necessário */
    }
    ${LegendBox} {
      h3 {
        font-size: 1em;
      }
      p {
        font-size: 0.7em;
      }

    }
    
    @page {
      size: A4; /* Define o tamanho do papel */
      margin: 0mm; /* Ajuste as margens conforme necessário */
    }

    .no-print {
      display: none; /* Ocultar botões ou elementos com a classe no-print */
    }

    h2, h3 {
      font-size: 1.5em; /* Ajuste os tamanhos de fonte para impressão */
    }

    span {
      font-size: 0.8em;
    }

    ${List} {
      padding: 0;
    }

    ${Emp} { /* Ajuste a margem inferior para evitar quebra de página */ 
      display: flex;
      width: 100%;
      padding: 10px;
    }

    ${Grade} {
      margin: 0;
      padding: 0;
      width: 80%;
      justify-content: flex-end;
    }
    
    ${DivNameMatter} {
      margin: 0;
      padding: 0;
      height: 0px;
    }

    ${DivBimHeader} {
      font-size: 0.5em;
    }
    
    ${DivBimCell} {
      font-size: 0.5em;
    }

    ${SpanNameMatter} { /* Ajuste a margem inferior para evitar quebra de página */
      font-size: 0.6em;
    }

    ${SpanTotalGrade}, ${SpanAverageGrade}, ${SpanGradeStudent} {
      font-size: 0.5em; /* Ajuste os tamanhos de fonte para impressão */
    }
  }
`;


export default GlobalStyle;
