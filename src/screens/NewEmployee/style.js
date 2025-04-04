import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 30px;
    @media (max-width: 768px) {
      padding: 15px;
    }
  
  h2 {
    text-align: center;
  }
`;

export const InputArea = styled.div`
  width: 90%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
    gap: 15px;
  }
`;

export const Label = styled.label`
  align-self: flex-start;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (max-width: 768px) {
    padding: 8px;
  }
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

export const Btt01 = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
  
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

export const ToGoBack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
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

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 12px;
  }
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
