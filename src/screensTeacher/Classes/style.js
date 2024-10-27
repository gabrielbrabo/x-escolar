import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
`;

export const ContainerDivs = styled.div`
    width: 100%;
    max-width: 1000px;
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const StudentSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
`;

export const ContainerTable = styled.div`
     padding-left: 20px;
    border-bottom: 1px solid #ccc;
    background-color: #f0f0f0;
`;

export const TableRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
   
`;

export const Span = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 10px;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px; // Espaço entre as linhas

    div {
        height: 8px;
        display: flex;
        align-items: center;
    }

    p {
        margin-left: 5px; // Espaço entre o rótulo e o valor
        font-weight: bold;
    }
`;


export const DateCell = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    text-align: left;
`;

export const DescriptionCell = styled.div`
    display: table-cell;
    padding: 10px;
    text-align: left;
    width: 80%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

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
    margin-left: auto; // Posiciona o botão à direita
    &:hover {
        background-color: #0056b3;
    }
`;
