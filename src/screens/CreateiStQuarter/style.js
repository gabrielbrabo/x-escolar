import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 90vh;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

export const ContainerDivs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92%;
  max-width: 600px;
  padding: 20px;
  @media (max-width: 1200px) {
    padding: 10px;
  }
  @media (max-width: 768px) {
      padding: 0;
    }
`;

export const DivAddEmp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const AddEmp = styled.div`
  display: flex;
  width: center;
  justify-content: space-between;
`;

export const DivDados = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 600px; /* Largura máxima do componente */
    //height: 370px; /* Largura máxima do componente */
    margin: auto; /* Centraliza horizontalmente */
    background: #f9f9f9; /* Cor de fundo */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra leve */

    @media (max-width: 768px) {
      width: 100%;
      padding: 5px;
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

export const Input = styled.input`
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (max-width: 768px) {
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;