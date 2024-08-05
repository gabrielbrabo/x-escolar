import styled from 'styled-components';

// Container principal para a página de empregados
export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
export const ContainerEmp = styled.div`
    width: 90%;
`;

// Estilo para a lista de empregados
export const List = styled.div`
  width: 80%;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 10px;
    width: 95%;
  }
`;

// Estilo para cada empregado na lista
export const Emp = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 10px 0px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Estilo para o nome do empregado
export const Span = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #333;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Container para as seções de busca e filtro
export const Search = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

// Container para o formulário de busca
export const FormSearch = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Container para o formulário de filtro
export const FormFilter = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;

// Área para o input de busca
export const Area = styled.div`
  margin-top: 10px;
`;

// Estilo para o select de filtro
export const Select = styled.select`
  margin-top: 10px;
  width: 95%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Botão para adicionar novo empregado
export const DivNewEmp = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// Exportando os componentes InputEmp e Btt02 do mesmo arquivo de estilo
export const InputEmp = styled.input`
  padding: 10px;
  width: 95%;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Btt02 = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;
