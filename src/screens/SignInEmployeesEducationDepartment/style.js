import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 90vh; /* ← alterado */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
`;

export const InputArea = styled.form`
  border-radius: 20px;
  display: flex;
  width: 40%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 15px;
  font-size: 20px;

  background-color: #e6f3ff;
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.4);

  @media screen and (max-width: 768px) {
    width: 70%;
    padding: 40px;
    gap: 20px;
  }
`;

export const Area = styled.div`
  display: flex;
  width: 450px;
  height: 40px;
  margin-bottom: 10px;
  background-color: #d0e9ff;
  border-radius: 30px;
  align-items: center;
  justify-content: center;

  @media (max-width: 375px) {
    width: 300px;
    height: 45px;
  }

  @media (min-width: 375px) and (max-width: 768px) {
    width: 330px;
    height: 45px;
  }
`;

export const Input = styled.input`
  width: 90%;
  height: 20px;
  font-size: 16px;
  background-color: transparent;
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;
`;

export const Btt = styled.button`
  height: 50px;
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #007bff;
  color: white;
  font-size: 20px;
  border-radius: 30px;
  border: none;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
  }
`;

export const AccessTopButton = styled.button`
  align-self: flex-end;
  margin: 20px 0 10px 0; /* cima, direita, baixo, esquerda */
  padding: 10px 18px;
  border: 2px solid #007bff;
  border-radius: 8px;
  background-color: transparent;
  color: #007bff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #007bff;
    color: white;
  }

  @media (max-width: 600px) {
    width: 100%;
    text-align: center;
    margin-top: 40px;
  }
`;
