import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 13px;
    box-sizing: border-box;

    @media print {
        padding: 0; // Remove padding na impressão
        margin: 0; // Remove margin na impressão
    }
`;

export const ContainerDivs = styled.div`
    width: 100%;
    max-width: 1000px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin: 0 auto; // Centraliza no papel durante impressão
    padding: 15px; // Adicionei padding para a versão normal

    @media (max-width: 768px) {
        padding: 15px;
    }

    @media print {
        box-shadow: none; // Remove a sombra na impressão
        padding: 0; // Remove padding na impressão
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

    @media print {
        h2 {
            font-size: 20px; // Ajusta o tamanho da fonte na impressão
        }
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

    @media print {
        margin-top: 10px; // Ajusta a margem na impressão
        display: table; // Assegura que exiba como tabela
    }
`;

export const ContainerTable = styled.div`
    padding: 10px;
    border-bottom: 1px solid #FF5733;
    background-color: #f0f0f0;
    width: 100%;
    max-width: 100%;

    @media print {
        border-bottom: none; // Remove a borda na impressão
    }
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
    color: #158fa2;

    @media print {
        font-size: 12px; // Ajusta a fonte na impressão
    }
`;

export const DescriptionCell = styled.div`
    max-width: 100%; // Garante que não ultrapasse 100%
    word-wrap: break-word;
    overflow-wrap: break-word;
    text-align: left;
    flex: 3;
    position: relative;

    .description {
        transition: height 0.3s ease;

        &.collapsed {
            height: 10px;
        }

        &.expanded {
            height: auto;
        }

        @media print {
            height: auto; // Força a exibição completa na impressão
            white-space: pre-wrap; // Mantém a formatação
            word-wrap: break-word; // Permite quebra de linha
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 8px 0;
    }

    > div:last-child {
        margin-top: 10px;
    }
`;

export const InfoText = styled.div`
    color: #777;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;

    @media print {
        display: none; // Oculta na impressão
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

export const ButtonEdit = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background-color: #0056b3;
    }

    @media print {
        display: none; // Oculta na impressão
    }
`;

export const Register = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media print {
        display: none; // Oculta na impressão
    }
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

    @media print {
        display: none; // Oculta na impressão
    }
`;

export const EditContainer = styled.div`
    background-color: #f9f9f9;
    border: 2px solid #FF5733;
    padding: 15px;
    border-radius: 8px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    h3 {
        margin: 0;
        margin-bottom: 10px;
        color: #333;
    }

    input,
    textarea {
        width: 100%;
        margin-bottom: 10px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 14px;
        box-sizing: border-box;
    }

    textarea {
        resize: vertical;
        height: 250px;
    }

    .BoxBtt {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-evenly;
    }

    button {
        align-self: flex-start;
        margin-right: 10px;
    }

    @media (max-width: 768px) {
        padding: 10px;

        h3 {
            font-size: 18px;
        }

        button {
            width: 100%;
            margin-bottom: 5px;
        }
    }

    @media print {
        display: none; // Oculta na impressão
    }
`;

export const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media print {
        display: none; // Oculta na impressão
    }
`;

export const PrintOnly = styled.div`
    display: none; // Esconde por padrão
    @media print {
        display: block; // Mostra apenas durante a impressão
    }
`;

export const HiddenOnPrint = styled.div`
    display: block; // Mostra por padrão
    @media print {
        display: none; // Esconde durante a impressão
    }
`;

export const ExpandedDescription = styled.div`
    @media print {
        white-space: pre-wrap; // Mantém a formatação
        word-wrap: break-word; // Permite quebra de linha
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

  @media print {
        display: none; // Oculta o botão na impressão
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