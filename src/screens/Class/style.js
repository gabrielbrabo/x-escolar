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
  width: 100%;
  max-width: 1000px;
  gap: 20px;
  padding: 0px;
  
  @media (max-width: 768px) {
    padding-top: 10px;
  }
`;

export const User = styled.div`
  /* Estilos para o componente User */
`;

export const Search = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 97%;
    padding: 5px;
  }
`;

export const FormSearch = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AreaEmp = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputEmp = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const FormFilter = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 40%;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 97%;
    padding: 5px;
  }
`;

export const DivNewEmp = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
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

export const Emp = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
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

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoadingSpinner = styled.div`
  /* Estilos para o spinner de carregamento */
`;
