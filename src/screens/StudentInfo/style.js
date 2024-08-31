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
  max-width: 600px;
  min-height: 50vh;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
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

export const Section = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Emp = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const Span = styled.span`
  display: block;
  margin-bottom: 5px;
  color: #333;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #000;
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

export const AddMatterSection = styled.div`
  width: 100%;
  min-height: 100%;
  max-width: 600px;
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