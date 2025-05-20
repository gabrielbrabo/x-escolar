import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 90vh;
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

  background-color: #f9fdfb;
  box-shadow: 0 0 20px rgba(102, 187, 106, 0.2);

  @media screen and (max-width: 768px) {
    width: 75%;
    padding: 40px;
    gap: 20px;
  }
`;

export const Area = styled.div`
  display: flex;
  width: 450px;
  height: 45px;
  margin-bottom: 10px;
  background-color: #e6f4ec;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;

  @media (max-width: 375px) {
    width: 280px;
    height: 45px;
  }

  @media (min-width: 375px) and (max-width: 768px) {
    width: 320px;
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
  background-color: #66bb6a;
  color: white;
  font-size: 20px;
  font-weight: 600;
  border-radius: 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;

  &:hover {
    background-color: #57a55d;
  }
`;

export const AccessTopButton = styled.button`
  //align-self: flex-end;
  margin: 20px 0; /* espaço acima e abaixo */
  padding: 10px 18px;
  border: 2px solid #2e7d32;
  border-radius: 8px;
  background-color: transparent;
  color: #2e7d32;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #2e7d32;
    color: white;
  }

  @media (max-width: 600px) {
    width: 100%;
    text-align: center;
    margin-top: 40px; /* espaço específico no topo no mobile */
  }
`;
