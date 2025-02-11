import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContainerDivs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Label = styled.label`
  padding: 10px;
  font-weight: bold;
  color: wheat;
  font-size: 20px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const InputArea = styled.div`
  width: 92%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 20px;
  background-color: #158fa2;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    padding: 15px;
    gap: 40px;
  }
`;

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

export const InputDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  input {
    width: 300px;
    height: 40px;
  }
`;

export const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 30px;
  margin-bottom: 50px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
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

export const StyledQuillContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px;  /* Centraliza e espaça o editor */

  .ql-container {
    height: 250px;
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
    .quill {
      width: 100%;
    }
    .ql-editor {
      min-height: 150px;
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
        width: 90%; /* Ajusta a largura para tablets e celulares maiores */
    }

    @media (max-width: 480px) {
        width: 90%; /* Ocupa a largura total em telas pequenas */
        .ql-container {
            height: 200px; /* Reduz a altura em dispositivos menores */
        }
    }
`;

export const Span = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    padding: 10px;
    width: 90%;
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

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
    }
`;

// No seu arquivo de estilos (style.js ou style.css)

export const DescriptionContainer = styled.div`
    margin: 20px;
    max-width: 800px; /* Ajuste o tamanho máximo conforme necessário */
    overflow-wrap: break-word; /* Quebra as palavras longas para evitar ultrapassar as bordas */
    text-align: left; /* Alinha o texto à esquerda */
`;

export const SaveButton = styled.button`
    padding: 10px 20px; /* Padding do botão */
    border: none;
    border-radius: 4px; /* Bordas arredondadas do botão */
    background-color: #3e1fdd; /* Cor de fundo do botão */
    color: wheat; /* Cor do texto */
    margin-top: 30px;
    cursor: pointer;
    font-size: 16px; /* Tamanho da fonte */
    transition: background-color 0.3s; /* Efeito de transição */

    &:hover {
        background-color: #0056b3; /* Cor do botão ao passar o mouse */
    }
`;