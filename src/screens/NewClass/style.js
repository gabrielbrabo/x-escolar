import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-top: 30px;
  min-height: 90vh;
  background-color: #f5f5f5;
`;

export const InputArea = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 92%;

  label {
    font-size: 14px;
    margin-bottom: 5px;
    color: #333;
    display: block;
  }

  @media (max-width: 768px) {
    padding: 5px;
    width: 95%;
  }
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Btt01 = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ToGoBack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const SignMessageButtonText = styled.span`
  font-size: 14px;
  color: #333;
`;

export const SignMessageButtonTextBold = styled.span`
  font-size: 14px;
  color: #007bff;
  font-weight: bold;
  margin-left: 5px;
`;
