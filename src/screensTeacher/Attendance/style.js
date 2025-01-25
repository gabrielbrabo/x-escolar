import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
`;

export const ContainerDivs = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 20px;
    flex-direction: column;
`;

export const ContainerStudent = styled.div`
    width: 92%;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 1000px;
    padding: 10px;
    gap: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
`;

export const DataSelected = styled.div`
    width: 100%;
`;

export const DivButton = styled.div`
    width: 100%;
    padding-bottom: 30px;
    display: flex;
    justify-content: flex-end;
    gap: 20px;

    @media(max-width: 768px) {
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
        content: 'Chamadas Finalizadas'; /* Texto da borda */
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
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 35px;
    gap: 15px;
    min-width: 90%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    padding: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
    gap: 30px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        text-align: center;
        padding-bottom: 30px;
        color: white;
    }
`;

export const Span = styled.button`
    border: none;
    font-size: 16px;
    color: #333;
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
    background-color: #158fa2;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
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
    gap: 50px;
    justify-content: space-between;
    @media(max-width: 768px) {
        gap: 10px;
    }
`;