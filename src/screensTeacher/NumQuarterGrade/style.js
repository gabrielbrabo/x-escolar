import styled from 'styled-components';

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
export const DataSelected = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 95%;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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

export const List = styled.div`
    display: flex;
    flex-direction: column;
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
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    gap: 3px;
    border-radius: 5px;
    margin-bottom: 35px;
    min-width: 90%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 375px)  {
      padding: 0px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      padding: 0px;
    }
`;

export const EmpEdit = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    //gap: 3px;
    border-radius: 5px;
    margin-bottom: 35px;
    min-width: 90%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    #nota {
      width: 45%;
    }


    @media (max-width: 375px)  {
      padding: 0px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      padding: 0px;
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
  padding: 10px;
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

export const Span = styled.div`
    display: flex;
    align-items: center;
    border: none;
    width: 500px;
    height: 90%;
    font-size: 16px;
    color: #333;

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        //max-width: 140px;
    }
    @media (min-width: 375px) and (max-width: 450px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        
       // max-width: 160px;
    }
    @media (min-width: 450px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        
        //max-width: 230px;
    }
`;

export const SpanEdit = styled.div`
    display: flex;
    align-items: center;
    border: none;
    width: 100%;
    height: 90%;
    font-size: 16px;
    color: #333;

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        //max-width: 140px;
    }
    @media (min-width: 375px) and (max-width: 450px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        
       // max-width: 160px;
    }
    @media (min-width: 450px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
      overflow-y: hidden;
        white-space: nowrap;
        
        //max-width: 230px;
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
    width: 70%;
    background-color: #28a745;
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
      
      width: 90%;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 8px;
      width: 90%;
    }

    @media(min-width: 600px) {
        padding: 10px ;
    }
`;

export const SelectorContainer = styled.div`
    margin-bottom: 20px;
`;

export const EditContainer = styled.div`
   // width: 100%;
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
    gap: 3px;
    align-items: center;
    justify-content: center;

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 3px;
      gap: 0px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 6px;
      gap: 0px;
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
    display: flex;
    flex-direction: column;
    max-width: 400px;
    height: 80px;
    align-items: center;
    justify-content: center;
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

export const Input = styled.input`
  width: 35%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (max-width: 768px) {
  }
`;
export const BoxBtt = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: center;
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
export const BoxDescr = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;