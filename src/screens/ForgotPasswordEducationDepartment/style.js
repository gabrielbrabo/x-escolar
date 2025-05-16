import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const InputArea = styled.form`
    border-radius: 20px;
    display: flex;
    width: 40%;
    gap: 15px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #1465bb;
    gap: 15px;
    font-size: 20px;
    color: white;

    @media screen and (max-width: 768px) {
        width: 70%;
        padding: 40px;
        gap: 20px;
    }
`;

export const Area = styled.div`
  display: Flex;
  width: 350px;
  height: 40px;
  margin-bottom: 10px;
  background-color: #ebe7eb;
  border-radius: 30px;
  align-items: center;
  justify-content: center; 

  @media screen and (max-width: 768px) {
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

    @media screen and (max-width: 768px) {
        
    }
`;

export const Btt = styled.button`
    height: 50px;
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #8cfa81;
    font-size: 20px;
    border-radius: 30px;
    border: none;
    align-items: center;
    justify-content: center; 
`;

export const WarningContainer = styled.div`
  background-color: #fff3cd; // Cor de fundo do aviso
  border: 1px solid #ffeeba; // Borda do aviso
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
`;

export const WarningMessage = styled.p`
  color: #856404; // Cor do texto do aviso
`;

export const WarningButton = styled.button`
  margin: 10px;
  background-color: #007bff; // Cor do botão
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3; // Cor do botão ao passar o mouse
  }
`;