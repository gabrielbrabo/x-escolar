import styled from 'styled-components';

export const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 5px;
`;

export const ListChecked = styled.div`
    border-top: 2px solid #1d7f14; /* Borda da lista */
    margin: 20px 0;
    width: 100%;
    padding: 10px;
    position: relative; /* Necessário para o título */
    
    &:before {
        content: 'Conceito adicionado'; /* Texto da borda */
        position: absolute;
        top: -15px; /* Ajuste conforme necessário */
        left: 50%;
        transform: translateX(-50%); /* Centraliza o texto */
        background: white; /* Fundo para que o texto não fique atrás da borda */
        padding: 0 3px; /* Espaçamento lateral */
        font-weight: bold; /* Negrito para destaque */
        color: #ccc; /* Cor do texto */
    }

`;

export const Emp = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    gap: 3px;
    border-radius: 5px;
    margin-bottom: 35px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 375px)  {
    }
    @media (min-width: 375px) and (max-width: 768px) {
    }

    @media(max-width: 768px) {
        display: grid;
    }
`;

export const EmpEdit = styled.div`
     display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 35px;
    gap: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media(max-width: 768px) {
        width: 100%;
        gap: 10px;
        padding: 0;
    }
`;

export const Conceito = styled.div`
    color: ${({ grade }) => {
        switch (grade) {
            case 'A': return '#1d7f14';
            case 'B': return 'blue';
            case 'C': return 'orange';
            case 'D': return 'red';
            default: return 'black';
        }
    }};
    font-weight: bold;

    @media (max-width: 375px)  {
      font-size: 11pt; /* Smartphones pequenos */
      padding: 3px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 13pt; /* Smartphones pequenos */
      padding: 5px;
    }
`;



export const Span = styled.div`
    display: flex;
    align-items: center;
    border: none;
    width: 400px;
    height: 90%;
    font-size: 16px;
    color: #333;
    overflow-y: hidden;
    white-space: nowrap;

    @media (max-width: 375px)  {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        width: auto;
    }
    @media (min-width: 375px) and (max-width: 450px) {
      font-size: 11pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        width: auto;
    }
    @media (min-width: 450px) and (max-width: 768px) {
      font-size: 12pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        width: auto;
    }

`;

export const DivBim = styled.div`
    display: flex;
`;

export const DivBimTable = styled.div`
  display: flex;
  border-collapse: collapse;

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

  color: ${({ grade }) => {
        switch (grade) {
            case 'A': return '#1d7f14';
            case 'B': return 'blue';
            case 'C': return 'orange';
            case 'D': return 'red';
            default: return 'black';
        }
    }};
    font-weight: bold;
`;

///// novo 
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const ContainerDivs = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 20px;
    flex-direction: column;

    @media(max-width: 768px) {
        padding: 0;
    }
`;

export const ContainerStudent = styled.div`
    width: 94%;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 1000px;
    padding: 20px;
    gap: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;

    @media(max-width: 768px) {
      padding: 10px;
    }
`;

export const AreaWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end; /* Desktop → direita */
    margin-right: 500px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        justify-content: center; /* Mobile → central */
        margin-right: 0px;
    }
`;

export const Area = styled.div`
    width: 500px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    /* Alinhamento no desktop → à direita */
    align-items: center;
    //justify-content: center ;

    h3 {
        //width: 100%;
        font-size: 18px;
        margin-bottom: 0px;
        margin-top: 0px;
        text-align: center;
    }

    /* Mobile → centraliza no topo */
    @media (max-width: 768px) {
        align-items: center;
        width: 100%;

        h3 {
            text-align: center;
        }
    }
`

export const DataSelected = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    //padding-right: 20px;

    @media(max-width: 768px) {
        flex-direction: column;
    }
`;
export const DivButton = styled.div`
    width: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
    justify-content: flex-end;
    gap: 20px;

    @media(max-width: 768px) {
        justify-content: center;
        align-items: center;
    }
`;

export const Matter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 10px;
`;

export const DivInfo = styled.div`
    background-color: #f1f1f1;
    width: 90%;
    max-width: 600px;
    padding: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        text-align: center;
        padding-bottom: 30px;
    }
`;
export const DivInfoDate = styled.div`
    background-color: #f1f1f1;
    width: 90%;
    max-width: 600px;
    padding: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
    gap: 30px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        text-align: center;
        padding-bottom: 30px;
    }
`;

export const Select = styled.select`
  width: 100%;
  height: 55px;
  //padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 0;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 3px;
    }
    
  @media (max-width: 768px) {
    //padding: 8px;
  }
`;

export const SpanChecked = styled.button`
    display: flex;
    align-items: center;
    gap: 20px;
    border: none;
    font-size: 16px;
    color: #333;
`;

export const Btt02 = styled.button`
    padding: 10px;
    width: 90px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 5px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 8px;
    }

    @media(min-width: 600px) {
        padding: 10px ;
    }
`;
export const Btt01 = styled.button`
    padding: 10px;
    width: 90px;background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 5px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 8px;
    }

    @media(min-width: 600px) {
        padding: 10px ;
    }
`;

export const SelectorContainer = styled.div`
    margin-bottom: 20px;
`;

export const EditContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    h3 {
        text-align: center;
    }

    select {
        width: 80%;
        max-width: 400px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
`;
export const InputGrade = styled.input`
    width: 60px;
`;
export const Grade = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: center;
    justify-content: center;
    //margin-right: 100px;

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 3px;
      gap: 0px;
      margin-right: 0px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 6px;
      gap: 0px;
      margin-right: 0px;
    }
`;
export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;


export const Info = styled.div`
    color: #158fa2;
`;

export const LegendBox = styled.div`
    max-width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        margin: 0px;
        text-align: center;
    }

    p {
        margin: 5px;
    }

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 0;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
    }
`;

export const BlurBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0,0,0,0.3);

  h3 {
    margin-bottom: 1.5rem;
  }

  div {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    background: #0056b3;
  }
`;

export const ContSelect = styled.div`
  display: flex;
  width: 100%;
`;


///// codigo antigo

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

export const InputArea = styled.div`
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    padding: 15px;
    gap: 40px;
  }
`;
export const Input = styled.div`
  width: 100%;
`;

export const Button = styled.button`
  background-color: #28a745;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;

        &:hover {
            background-color: #218838;
        }
`;

export const ToGoBack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const Label = styled.label`
  align-self: flex-start;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const BoxButton = styled.div`
    display: flex;
    gap: 100px;
    justify-content: space-between;
    @media(max-width: 768px) {
        gap: 80px;
    }
`;

export const ContConcept = styled.div`
    display: flex;
    gap: 30px;
    @media(max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }
`;