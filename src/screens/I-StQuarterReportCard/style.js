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
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Emp = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export const DadosStdt = styled.div`
  display: flex;
  padding: 10px;
  gap: 5px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const Grade = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
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
  color: ${({ grade, average }) => (grade < average ? 'red' : 'blue')};
  font-weight: bold;
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
      height: 40px;
      border-bottom: 1px solid #ccc;
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
