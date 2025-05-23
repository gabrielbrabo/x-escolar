import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 80px;
    width: 100%;

`;

export const ContainerDivs = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media(max-width: 768px) {
        padding: 0;
    }
`;

export const ContainerStudent = styled.div`
    width: 95%;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 1000px;
    padding: 10px;
    gap: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;

    @media(max-width: 768px) {
        padding: 5px;
    }
`;

export const DataSelected = styled.div`
    width: 100%;
`;

export const DivButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    //align-items: flex-start;
    gap: 20px;

    @media(max-width: 768px) {
        //align-items: flex-start;
    }
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 20px;
`;

export const ListChecked = styled.div`
    border-top: 2px solid #1d7f14; /* Borda da lista */
    margin: 20px 0;
    width: 100%;
    padding: 10px;
    position: relative; /* Necessário para o título */
    
    &:before {
        content: 'Chamadas Finalizadas'; /* Texto da borda */
        position: absolute;
        top: -15px; /* Ajuste conforme necessário */
        left: 50%;
        transform: translateX(-50%); /* Centraliza o texto */
        background: white; /* Fundo para que o texto não fique atrás da borda */
        padding: 0 3px; /* Espaçamento lateral */
        font-weight: bold; /* Negrito para destaque */
        color: #ccc; /* Cor do texto */

        @media (max-width: 345px)  {
            font-size: 13px; /* Smartphones pequenos */
        }
        @media (min-width: 345px) {
            font-size: 10pt; /* Smartphones pequenos */
        }

        @media (min-width: 481px) and (max-width: 768px) {
            font-size: 11pt; /* Tablets */
        }
    }
`;


export const Emp = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 30px;
    gap: 15px;
    min-width: 90%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f0f0f0;

    @media(max-width: 768px) {
        width: 100%;
        gap: 2px;
        margin-bottom: 25px;
        padding: 0;
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
        gap: 2px;
        padding: 0;
    }
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
    background-color: #158fa2;
    width: 90%;
    max-width: 600px;
    padding: 15px;
    padding-top: 40px;
    padding-bottom: 40px;
    gap: 30px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        text-align: center;
        padding-bottom: 30px;
        color: wheat;
    }
`;

export const Span = styled.button`
    border: none;
    font-size: 16px;
    color: #333;

    @media (max-width: 375px)  {
        width: 90%;
      font-size: 9pt; /* Smartphones pequenos */
      padding: 0;
    }
    @media (min-width: 375px) and (max-width: 768px) {
        width: 90%;
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
    }
`;

export const SpanChecked = styled.button`
    display: flex;
    align-items: center;
    gap: 20px;
    border: none;
    font-size: 16px;
    color: #333;

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 0;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
    }
`;

export const Btt02 = styled.button`
    padding: 10px;
    background-color: #158fa2;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 375px)  {
      font-size: 8pt; /* Smartphones pequenos */
      padding: 6px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 7px;
    }

    @media(min-width: 600px) {
        padding: 10px;
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

// Componente para a lista de chamada
export const AttendanceList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    margin-top: 20px;
`;

export const AttendanceItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-radius: 5px;
    background-color: ${props => (props.checked ? '#d4edda' : '#f8d7da')};
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

export const AttendanceButton = styled.button`
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.present {
        background-color: #28a745; /* Verde para presença */
        color: white;

        &:hover {
            background-color: #218838; /* Escuro para presença */
        }
    }

    &.absent {
        background-color: #dc3545; /* Vermelho para ausência */
        color: white;

        &:hover {
            background-color: #c82333; /* Escuro para ausência */
        }
    }
`;

export const BoxButton = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    .nota {
      display: flex;
    }
    .Presence {
        display: flex;
        border: 2px solid #008000; /* Verde forte */
        //background-color: #d4edda; /* Verde claro para contraste */
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); /* Sombra verde para destacar */
        padding: 5px;
        border-radius: 8px;
    }
    .Absence {
        display: flex;
        border: 2px solid #cc0000; /* Vermelho forte */
        //background-color: #f8d7da; /* Vermelho claro para contraste */
        box-shadow: 0 0 5px rgba(204, 0, 0, 0.5); /* Sombra vermelha para destacar */
        padding: 5px;
        border-radius: 8px;
    }
    .justifi {
      display: flex;
      border: 2px solid #6a0dad; /* Roxo forte */
        //background-color: #e6ccff; /* Lilás suave para contraste */
        box-shadow: 0 0 5px rgba(106, 13, 173, 0.5); /* Sombra roxa para destacar */
        padding: 3px;
        border-radius: 8px;
    }
    .not {
        display: flex;
        border: 2px solid #2c2c2c; /* Cinza quase preto */
        //background-color: #1e1e1e; /* Fundo escuro */
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* Sombra discreta */
        padding: 3px;
        border-radius: 8px;
    }
    .check {
      display: flex;
      gap: 10px;
    }

    label {
        @media (min-width: 1024px) {
            font-size: 17px;

            input {
                width: 20px;
                height: 20px;
            }
        }
    }


    @media(max-width: 768px) {
        gap: 10px;
    }
`;

export const BoxButtonEdit = styled.div`
    display: flex;
    gap: 100px;
    justify-content: space-between;
`;

export const BoxButtonStatus = styled.div`
    display: flex;
    padding: 20px;
    gap: 20px;
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