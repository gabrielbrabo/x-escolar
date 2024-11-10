import styled from 'styled-components';

export const RecordContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const RecordHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`;

export const RecordTitle = styled.h2`
    font-size: 18px;
    font-weight: bold;
    color: #333;
`;

export const RecordDescription = styled.div`
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    text-align: justify;
    margin-top: 20px;
    padding: 10px;

    p {
        margin: 8px 0;
        text-indent: 1.25cm; // Recuo para a primeira linha de cada parágrafo
        line-height: 1.5;    // Espaçamento entre linhas
    }
`;

export const ContainerSpan = styled.div`
    display: flex;
`;

export const Span = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    padding: 10px;
    width: 100%;
    justify-content: flex-start;
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

    @media print {
        display: none; // Oculta na impressão
    }
`;

// Estilo do botão para voltar
export const ToGoBack = styled.div`
    margin-top: 70px;
    text-align: center;
    cursor: pointer;
    color: #007bff;

    &:hover {
        color: #0056b3;
    }
`;

// Estilo do texto do botão para voltar
export const SignMessageButtonText = styled.span`
    font-size: 14px;
    font-weight: 400;
`;

// Estilo do texto em negrito do botão para voltar
export const SignMessageButtonTextBold = styled.span`
    font-size: 14px;
    font-weight: 600;
`;
