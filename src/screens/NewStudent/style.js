import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  width: 100%;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const ContainerDivs = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 10px;;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-size: 14px;
    color: #333;
  }
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const Btt01 = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ToGoBack = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  cursor: pointer;
`;

export const SignMessageButtonText = styled.span`
  font-size: 14px;
  color: #666;
`;

export const SignMessageButtonTextBold = styled.span`
  font-size: 14px;
  color: #000;
  font-weight: bold;
  margin-left: 5px;
`;
