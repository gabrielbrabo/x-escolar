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
  min-height: 60vh;
  max-width: 600px;
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
  cursor: pointer;
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

export const FormSearch = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  label {
    margin-bottom: 5px;
  }
`;

export const AreaEmp = styled.div`
  display: flex;
  align-items: center;
`;

export const Add = styled.div`
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
  margin-top: 20px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
`;
export const Button = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    gap: 10px;
`;

export const AddTeacher = styled.div`
  margin-bottom: 20px;
`;

export const Btt01 = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c9302c;
  }
  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;
export const ButtonCancel = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;
  align-items: flex-end;
`;
export const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
