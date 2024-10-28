import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 13px;
    box-sizing: border-box;
`;

export const ContainerDivs = styled.div`
    width: 100%;
    max-width: 1000px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: 15px;
    }
`;

export const StudentSection = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;

    h2 {
        margin-bottom: 10px;
        color: #333;
    }
`;

export const Table = styled.div`
    display: table;
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    @media (max-width: 768px) {
        display: block;
    }
`;

export const ContainerTable = styled.div`
    padding: 10px;
    border-bottom: 1px solid #ccc;
    background-color: #f0f0f0;
    width: 100%;
    max-width: 100%;
`;

export const TableRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }
`;

export const Span = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 10px;
    justify-content: flex-start;
    align-items: flex-start;

    div {
        display: flex;
        align-items: center;
        height: 13px;
    }

    p {
        margin-left: 5px;
        font-weight: bold;
    }
`;

export const DateCell = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 15px;
    text-align: left;
    flex: 1;
`;

export const DescriptionCell = styled.div`
    max-width: 100%;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    text-align: left;
    flex: 3;

    .description {
        transition: height 0.3s ease; // Transição suave para altura

        &.collapsed {
            height: 10px; // Altura fixa quando colapsada
        }

        &.expanded {
            height: auto; // Altura se adapta ao conteúdo quando expandida
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 8px 0;
    }
    
    > div:last-child {
        margin-top: 10px; // Ajuste o valor conforme necessário
    }
`;

// Outros estilos...



export const InfoText = styled.div`
    color: #777;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`;

export const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    margin-left: auto;
    &:hover {
        background-color: #0056b3;
    }
`;

export const Register = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const ButtonReg = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 20px;

    &:hover {
        background-color: #218838;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 8px 15px;
        font-size: 13px;
    }
`;
