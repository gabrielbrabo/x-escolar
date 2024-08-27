import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  padding: 20px;
  background-color: #f0f2f5;

  @media (max-width: 768px) {
    height: auto;
    padding: 10px;
  }
`;

export const InputArea = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const Btt01 = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const ToGoBack = styled.div`
  margin-top: 20px;
  text-align: center;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

export const SignMessageButtonText = styled.span`
  color: #555;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const SignMessageButtonTextBold = styled.span`
  color: #007bff;
  font-size: 14px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
