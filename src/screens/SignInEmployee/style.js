import styled from 'styled-components';

// === CONTAINER GERAL ===
export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 90px); /* ← subtrai o header */
  background-color: #f9fdfb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3vh;
  box-sizing: border-box;
  overflow: hidden; /* impede rolagem */
  padding: 0 16px;

  @media (max-width: 768px) {
    height: calc(100vh - 65px); /* header menor no mobile */
  }
`;


// === FORMULÁRIO DE LOGIN ===
export const InputArea = styled.form`
  width: clamp(320px, 40%, 460px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 3vh 2vw;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  gap: 2.5vh;
  transition: all 0.3s ease;

  &:focus-within {
    transform: scale(1.01);
    box-shadow: 0 0 25px rgba(102, 187, 106, 0.25);
  }
`;

// === CAMPOS DE INPUT ===
export const Area = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  background-color: #e6f4ec;
  border-radius: 30px;
  padding: 0 14px;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus-within {
    background-color: #d9efe1;
  }
`;

export const Input = styled.input`
  width: 100%;
  font-size: clamp(15px, 1.8vw, 18px);
  background-color: transparent;
  border: none;
  outline: none;
  padding: 8px;
  color: #333;
  font-family: 'Inter', sans-serif;

  &::placeholder {
    color: #777;
  }
`;

// === BOTÃO PRINCIPAL ===
export const Btt = styled.button`
  width: 100%;
  height: 52px;
  margin-top: 1vh;
  background-color: #43a047;
  color: #fff;
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 600;
  border-radius: 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(67, 160, 71, 0.25);

  &:hover {
    background-color: #388e3c;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    height: 50px;
  }
`;

// === BOTÃO SUPERIOR (SEMED / TROCA DE LOGIN) ===
export const AccessTopButton = styled.button`
  margin-top: 2vh;
  padding: 10px 22px;
  border: 2px solid #2e7d32;
  border-radius: 10px;
  background-color: transparent;
  color: #2e7d32;
  font-weight: 600;
  font-size: clamp(14px, 1.8vw, 18px);
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.5px;

  &:hover {
    background-color: #2e7d32;
    color: #fff;
    box-shadow: 0 4px 12px rgba(46, 125, 50, 0.25);
  }

  @media (max-width: 600px) {
    width: 100%;
    text-align: center;
    padding: 12px;
  }
`;

// === MENSAGEM DE TEXTO (ESQUECEU SENHA ETC) ===
export const SignMessageButton = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: clamp(14px, 1.6vw, 17px);
  color: #555;
  margin-bottom: 10px;

  &:hover span:last-child {
    color: #2e7d32;
    text-decoration: underline;
  }
`;

export const SignMessageButtonText = styled.span`
  margin-right: 4px;
`;

export const SignMessageButtonTextBold = styled.span`
  font-weight: bold;
  color: #2e7d32;
  transition: 0.3s;
`;
