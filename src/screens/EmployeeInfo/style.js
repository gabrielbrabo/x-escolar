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
  max-width: 1000px;
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
  max-width: 1000px;
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
    max-width: 1000px;
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

export const AddMatterSection = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  gap: 10px;
  margin-top: 20px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const WarningBox = styled.div`
  padding: 15px;
  background-color: #ffeb3b;
  color: #333;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 10px;
  font-size: 16px;
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin: 10px;
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
export const ButtonRemove= styled.button`
  width: 100%;
  padding: 15px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c9302c;
  }
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

export const Label = styled.label`
  align-self: flex-start;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 14px;
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

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90%;
  max-width: 400px;
`;

export const ClassList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
`;

export const ClassItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;