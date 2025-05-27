import styled from "styled-components";
//import { createGlobalStyle } from 'styled-components';

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
  width: 400px;
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
    width: 200px;
    font-size: 9pt; /* Smartphones pequenos */
    padding: 0;
  }
  @media (min-width: 375px) and (max-width: 768px) {
    width: 200px;
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
    // Verificar o valor das props
    console.log('result props:', props);  // Log para verificar se as props estão sendo passadas corretamente

    // Certificar-se de que as props são válidas antes de usá-las
    const grade = parseFloat(props.grade);  // Converte a nota para número
    const average = parseFloat(props.averageGrade);  // Converte a média para número
    const total = parseFloat(props.totalGrade);  // Converte a nota total para número

    // Log para verificar se as props são válidas
    console.log('result grade:', grade, 'average:', average, 'total:', total);

    if (!isNaN(grade) && !isNaN(average) && !isNaN(total)) {
      if (grade >= 0.9 * total) {
        return '#1d7f14';  // Verde (maior ou igual a 90% da nota total)
      } else if (grade < average) {
        return 'red';  // Vermelho (menor que a média)
      } else {
        return 'blue';  // Azul (maior ou igual à média)
      }
    }
    return 'black';  // Caso o valor não seja um número válido
  }};
  font-weight: bold;
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