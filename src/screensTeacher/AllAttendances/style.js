import styled from 'styled-components';

// Container principal para o componente
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

// Div que contém as seções de conteúdo
export const ContainerDivs = styled.div`
    width: 100%;
    height: auto;
    max-width: 1000px; /* Limita a largura do conteúdo */
    padding: 20px;
    padding-top: 30px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    box-sizing: border-box;

    /* Para garantir que o conteúdo fique centralizado em telas maiores */
    display: flex;
    flex-direction: column;
    text-align: center;
    //align-items: center;

    svg {
        //width: 100%;
      display: flex;
      align-items: center;
    }
    
    @media (max-width: 1024px) {
        width: 90%; /* A largura será 90% da tela em dispositivos menores */
    }
    @media (max-width: 768px) {
        width: 100%; /* A largura será 100% da tela em dispositivos muito pequenos */
        padding: 10px;
        padding-top: 30px;
    }
`;

// Área de input para seleção de bimestre
export const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
`;

// Estilização do campo de input
export const Input = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: 100%;
    max-width: 400px;
`;

// Estilo para o label do input
export const Label = styled.label`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
`;

// Estilo do select de bimestre
export const Select = styled.select`
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 14px;
    color: #333;
    width: 100%;
    background-color: #f9f9f9;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #007bff;
        background-color: #e7f0ff;
    }
`;

// Estilização da lista de alunos
export const List = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
`;

// Estilo do item de cada aluno (para alunos sem ficha individual)
export const EmpStdt = styled.div`
    padding: 15px 20px;
    background-color: #e1f7fa;  /* Cor de fundo azul claro para stdt */
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #b3e5fc;  /* Efeito hover para um azul mais intenso */
    }

    @media (max-width: 375px)  {
      padding: 13px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      padding: 13px;
    }
    
`;

// Estilo do item de cada aluno (para alunos com ficha individual)
export const EmpChecked = styled.div`
    padding: 12px 20px;
    background-color: #c8e6c9;  /* Cor de fundo verde claro para checked */
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #a5d6a7;  /* Efeito hover para um verde mais intenso */
    }

    @media (max-width: 375px)  {
      padding: 4px;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      padding: 6px;
    }
`;

// Estilo do texto do aluno
export const Span = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: #333;

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
    }
`;

// Estilo do botão para voltar
export const ToGoBack = styled.div`
    margin-top: 20px;
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

export const AddButton = styled.button`
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
        background-color: #45a049;
    }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
`;

export const ModalButton = styled.button`
  margin-top: 1.5rem;
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;