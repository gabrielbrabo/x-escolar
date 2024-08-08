import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  padding-left: 15%;
  padding-right: 15%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding-left: 10%;
    padding-right: 10%;
  }
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Emp = styled.div`
  width: 92%;
  min-height: 150px;
  max-width: 600px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;

  @media (max-width: 1024px) {
    max-width: 700px;
  }

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
  }
`;

export const EmployeeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Pro = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfilePhoto = styled.div`
  width: 80px;
  height: 80px;
  background-color: #ddd;
  border-radius: 50%;
  margin-right: 15px;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  max-width: 420px;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 820px) {
    max-width: 350px;
  }

  @media (max-width: 760px) {
    max-width: 200px;
  }

  @media (max-width: 350px) {
    max-width: 142px;
  }
`;

export const DivButtomEdit = styled.div`
  display: flex;
  align-items: center;
`;

export const DivInfo = styled.div`
  width: 92%;
  max-width: 600px;
  min-height: 120px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;

  @media (max-width: 1024px) {
    max-width: 700px;
  }

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
  }
`;

export const TitleInfo = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 16px;
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
  width: 100%;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const AddEmp = styled.div`
  display: flex;
  justify-content: center;
`;
export const ContainerDivs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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
  margin-top: 90px;
  justify-content: center;
  align-items: flex-end;
`;

export const DivShowMatter = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
