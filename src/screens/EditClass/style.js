import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    min-height: 90vh;
    width: 100%;
    background-color: #f5f5f5;
    @media (max-width: 768px) {
    padding: 0px;
  }
`;

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    width: 92%;
    max-width: 400px;
    @media (max-width: 768px) {
    width: 96%;
    padding: 5px;
  }
`;

export const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const Btt01 = styled.button`
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 25px;
    
    &:hover {
        background-color: #0056b3;
    }
`;

export const ToGoBack = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const SignMessageButtonText = styled.span`
    color: #555;
`;

export const SignMessageButtonTextBold = styled.span`
    color: #007bff;
    font-weight: bold;
    margin-left: 5px;
`;
export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
