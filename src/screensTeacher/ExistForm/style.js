import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    height: auto;
    width: 100%;
    background-color: #f4f4f9;
    padding: 20px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 0; /* A largura será 100% da tela em dispositivos muito pequenos */
    }
`;

export const RecordContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: 15px;
        width: 90%;
    }

    @media print {
        box-shadow: none;
        background-color: white;
        padding: 0;
        margin: 0;
        width: 100%;
        max-width: none;
    }
`;

export const RecordHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    @media print {
        margin-bottom: 0;
    }
`;

export const RecordTitle = styled.h2`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;

    @media print {
        font-size: 20px;
        color: black;
    }
`;

export const RecordDescription = styled.div`
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    text-align: justify;
    margin-top: 20px;
    width: 100%;

    p {
        margin: 8px 0;
        text-indent: 1.25cm;
        line-height: 1.5;
        color: black;
    }

    @media print {
        font-size: 14px;
        color: black;
        margin-top: 0;
    }
`;

export const ContainerSpan = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }

    /* Remova a linha abaixo para que o conteúdo apareça na impressão */
    /* @media print {
        display: none;
    } */
`;

export const ContainerDelet = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 30px;

`;

export const ContainerSpanEdit = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }

    @media print {
        display: none;
    }
`;

export const Span = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    padding: 3px;
    align-items: flex-start;
    gap: 15px;

    div {
        height: 8px;
        display: flex;
        align-items: center;
    }

    p {
        margin-left: 5px;
        font-weight: bold;
    }

    @media (max-width: 345px)  {
      font-size: 9px; /* Smartphones pequenos */
    }
    @media (min-width: 345px) and (max-width: 481px) {
      font-size: 8pt; /* Smartphones pequenos */
    }

    @media (min-width: 481px) and (max-width: 768px) {
      font-size: 9pt; /* Tablets */
    }

    @media print {
        font-size: 14px;
        color: black;
        p {
            font-weight: normal;
        }
    }
`;
export const BoxButton = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    padding-top: 15px;

    @media print {
        font-size: 14px;
        color: black;
        p {
            font-weight: normal;
        }
    }
`;

export const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 345px)  {
      font-size: 12px; /* Smartphones pequenos */
    }
    @media (min-width: 345px) and (max-width: 481px) {
      font-size: 11pt; /* Smartphones pequenos */
    }

    @media print {
        display: none;
    }
`;

export const ButtonEdit = styled(Button)`
    margin: 0;
`;

export const ToGoBack = styled.div`
    margin-top: 70px;
    text-align: center;
    cursor: pointer;
    color: #007bff;

    &:hover {
        color: #0056b3;
    }

    @media print {
        display: none;
    }
`;

export const SignMessageButtonText = styled.span`
    font-size: 14px;
    font-weight: 400;

    @media print {
        display: none;
    }
`;

export const SignMessageButtonTextBold = styled.span`
    font-size: 14px;
    font-weight: 600;

    @media print {
        display: none;
    }
`;

export const Input = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    gap: 20px;

    @media (max-width: 768px) {
        padding: 0;
        gap: 5px;
    }

    @media print {
        display: none;
    }
`;

export const StyledQuillContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;

    .ql-container {
        border-radius: 4px;
    }
    .ql-editor {
        min-height: 200px;
        font-size: 16px;
        line-height: 1.6;
    }
    .ql-toolbar {
        border-radius: 4px 4px 0 0;
    }

    @media (max-width: 768px) {
        .ql-editor {
            min-height: 150px;
            font-size: 14px;
        }
    }

    @media print {
        display: none;
    }
`;

export const EditContainer = styled(RecordContainer)`
    @media (max-width: 768px) {
        width: 100%;
    }

    @media print {
        display: none;
    }
`;

export const PrintButton = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    margin-left: auto;

    &:hover {
        background-color: #218838;
    }

    @media print {
        display: none;
    }
`;