import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 15%;
  padding-right: 15%;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Emp = styled.div`
  width: 90%; 
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;
export const ProfilePhoto= styled.div`
    width: 100px;
    height: 120px;
    background-color: red;
`;
export const Pro = styled.div`
    gap: 20px;
    display: flex;
`;
export const ProfileInfo = styled.div`
    display: grid;
`;
export const EmployeeInfo = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
export const DivButtomEdit = styled.div`
`;

export const TitleInfo = styled.div`
  width: 90%;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const DivInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  width: 90%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Span = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Matter = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  span {
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

export const DivAddEmp = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 40px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
  }
`;

export const AddEmp = styled.div`
  display: flex;
  justify-content: center;
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
