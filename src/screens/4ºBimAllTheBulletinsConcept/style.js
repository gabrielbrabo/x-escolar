import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const ContainerDivs = styled.div`
  width: 90%;
  max-width: 900px;
  padding: 20px;
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 0px;
    padding-top: 15px;
  }
`;

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
`;

export const Input = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: 100%;
    max-width: 400px;
`;

export const Label = styled.label`
font-size: 16px;
font-weight: 600;
color: #333;
margin-bottom: 8px;
`;

// Estilo do select de bimestre
export const Select = styled.select`
padding: 10px;
border-radius: 4px;
border: 1px solid #ccc;
font-size: 14px;
color: #333;
width: 100%;
background-color: #f9f9f9;
transition: all 0.3s ease;

&:focus {
    outline: none;
    border-color: #007bff;
    background-color: #e7f0ff;
}
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

export const DivAddEmp = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
  }

  break-after: page;
  page-break-after: always;

  &:last-child {
    break-after: auto;
    page-break-after: auto;
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

export const DadosStdt = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  span {
    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
    }
    @media (min-width: 375px) and (max-width: 450px) {
      font-size: 10pt; /* Smartphones pequenos */
    }
    @media (min-width: 450px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
    }
  }

  @media (max-width: 768px) {
    width: 98%;
    padding: 3px;
  }
`;

export const SpanFrequency = styled.div`
  width: 80%;
  height: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  gap: 10px;
  margin-top: 30px;

  @media (max-width: 768px) {
    height: 15px;
    position: relative;
  }
  /* Estilize o spinner de carregamento aqui */
`;

export const LegendBox = styled.div`
  //display: grid;
  //flex-direction: column;
  max-width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
      text-align: center;
  }

  p {
  }

  @media (max-width: 375px)  {
    font-size: 9pt; /* Smartphones pequenos */
    padding: 0;
  }
  @media (min-width: 375px) and (max-width: 768px) {
    font-size: 10pt; /* Smartphones pequenos */
    padding: 0;
  }

    @media(max-width: 768px) {
      margin-top: 35px;
    }
`;

export const DivDados = styled.div`
  background-color: #fafafa;
  width: 100%;
  padding: 5px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  border-bottom: 1px solid #6a0dad;
  border-top: 1px solid #6a0dad;

  @media (max-width: 768px) {
    padding: 0px;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 900%;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    
  align-items: center;
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

export const DivSignatureArea = styled.div`
  display: none;

  @media print {
    display: flex;
    justify-content: space-around;
    margin-top: 60px;
    padding: 20px;
  }
`;

export const SignatureBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Line = styled.div`
  width: 200px;
  border-bottom: 1px solid #000;
  margin-bottom: 8px;
`;

export const DivBimTable = styled.div`
  display: flex;
  justify-content: center;

  @media(max-width: 768px) {
        width: 100%;
    }
`;

export const Emp = styled.div`
  display: flex;
  //align-items: center;
  justify-content: space-around;
  padding: 10px;
  border-bottom: 1px solid #6a0dad;
  font-size: 1.2em;

  &:last-child {
    border-bottom: none;
  }

  p {
    margin: 0;
    font-weight: bold;
    color: #555;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
  }
`;

export const DivNameMatter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const SpanNameMatter = styled.span`
  font-weight: bold;
  color: #333;
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
  z-index: 10; /* garante que o botão fique por cima */
  &:hover {
    background-color: #45a049;
  }
  @media (max-width: 768px) {
    padding: 8px 16px;
  }
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
        props.grade === 'C' ? 'orange' : 'black';
  }};
  font-weight: bold;
`;

export const ContLogo = styled.div`
  position: relative;
  display: flex;
  justify-content: center; /* centraliza o h2 */
  width: 100%;
  padding-bottom: 60px;

  @media (max-width: 600px) {
    padding-bottom: 40px;
    //flex-direction: column;
    align-items: center;
  }

`;
export const Preview = styled.img`
  position: absolute;
  left: 0;
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-left: 20px;

  @media (max-width: 600px) {
    //position: static;
    width: 80px;
    height: 80px;
    margin: 10px;
    //display: block;
  }
  
`;

const GlobalStyle = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden; /* Oculta todos os elementos da página */
      margin: 0;
      padding: 0;
    }

    #containerDivs, #containerDivs * {
      visibility: visible; /* Mostra apenas o conteúdo de DivAddEmp */
    }
    ${ContainerDivs} {
      //display: flex;
      justify-content: center;
      padding-top: 0;
    }

    #containerDivs {
      //position: absolute;
      width: 100%; /* Certifique-se de que ocupa toda a largura */
      height: auto; /* Permite o ajuste automático da altura */
      box-sizing: border-box; /* Inclui o padding e a borda na largura total */
    }

    ${SpanFrequency} {
      visibility: visible;
      width: 90%;
      height: 0px;
      display: flex;
      justify-content: center;
      position: absolute;
      
      margin-left: 250px;

      color: #000; /* Ajuste a cor se necessário */
    }
    ${AddEmp} {
      margin-bottom: 50px;
    }
    ${LegendBox} {
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 5px;
      h3 {
        font-size: 1em;
      }
      p {
        font-size: 0.9em;
      }

    }
    
    @page {
      size: A4; /* Define o tamanho do papel */
      margin: 10mm; /* Ajuste as margens conforme necessário */
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

    ${Emp} {
      display: flex !important;
      justify-content: space-between;
      flex-direction: row !important;
      //width: 100%;
      padding: 5px;
    }


    ${Grade} {
      display: flex;
      margin: 0;
      padding: 0;
      //width: 80%;
      justify-content: flex-start;
    }
    
   ${DivNameMatter} {
      margin: 0;
      padding: 0;
      height: 0px;
    }

    ${DivBimHeader} {
      font-size: 0.7em;
    }
    
    ${DivBimCell} {
      font-size: 0.7em;
    }

    ${SpanNameMatter} { /* Ajuste a margem inferior para evitar quebra de página */
      font-size: 0.8em;
    }

    ${ContLogo} { /* Ajuste a margem inferior para evitar quebra de página */
      position: relative;
      display: flex;
      justify-content: center; /* centraliza o h2 */
      padding-bottom: 0px;
    }
    ${Preview} { /* Ajuste a margem inferior para evitar quebra de página */
      position: absolute;
      left: 0;
      height: 120px;
    }

    /*${SpanTotalGrade}, ${SpanAverageGrade}, ${SpanGradeStudent} {
      font-size: 0.5em; 
    }*/
  }
`;

export default GlobalStyle;