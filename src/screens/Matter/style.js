import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const List = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
`;

export const Emp = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Span = styled.span`
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
  @media (max-width: 768px) {
    font-size: 14px;
    max-width: 70%;
  }
`;

export const Search = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

export const DivNewEmp = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const DivAddEmp = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 20px;
  @media (max-width: 768px) {
  }
`;

export const FormSearch = styled.form`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 5px;
  }
`;

export const AreaEmp = styled.div`
  display: flex;
  align-items: center;
`;

export const InputEmp = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const Btt02 = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
