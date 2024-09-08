import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ContainerDivs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 93%;
  max-width: 600px;
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const DivAddEmp = styled.div`
  background-color: #f9f9f9;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const AddEmp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  h3 {
    font-size: 1.2em;
  }

  @media (max-width: 768px) {

    h3 {
      margin-bottom: 10px;
    }
  }
`;

export const Btt02 = styled.button`
   background-color: #007BFF;
  color: white;
  border: none;
  height: 37px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
  @media (max-width: 768px) {
    padding:  8px;
  }
`;

export const DivDados = styled.div`
  width: 100%;

  p {
    font-size: 1em;
  }

  @media (max-width: 768px) {
    p {
      font-size: 0.9em;
    }
  }
`;