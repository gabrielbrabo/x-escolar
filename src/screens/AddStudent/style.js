import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  min-height: 90vh;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

export const Search = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
`;

export const FormSearch = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-size: 16px;
    color: #333;
  }

  @media (max-width: 768px) {
    label {
      font-size: 14px;
    }
  }
`;

export const AreaEmp = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputEmp = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

export const Add = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  width: 100%;
  min-height: 100%;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

export const DivButtonAdd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 50px;
`;

export const Btt01 = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

export const List = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

export const Emp = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const Span = styled.span`
  font-size: 16px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Btt02 = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c9302c;
  }
  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

export const ButtonCancel = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;
  align-items: flex-end;
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

export const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: 0.3s;
    }

    button:first-child {
        background: #28a745;
        color: white;
    }

    button:last-child {
        background: #dc3545;
        color: white;
    }

    button:hover {
        opacity: 0.8;
    }
`;

// Estilo para a janela de aviso
export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

// Estilo da caixa de diálogo
/*export const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;*/

// Estilo do título ou mensagem
export const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

// Estilo dos botões
/*export const DivButtonAdd = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;*/

