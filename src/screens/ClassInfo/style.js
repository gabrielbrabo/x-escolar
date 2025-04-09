import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

export const ContainerDivs = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;
  @media (max-width: 1200px) {
  //  max-width: 90%;
  }
  @media (max-width: 768px) {
    padding-top: 10px;
    padding-left: 0;
    padding-right: 0;
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
  gap: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const DivNewEmp = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const DivButtomEdit = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
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
    width: 100%;
    max-width: 1000px;
    display: flex;
    justify-content: space-between;
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
    width: 96%;
    padding: 5px;
  }
`;

export const ProfileInfo = styled.div`
    min-width: 50%;
  max-width: 420px;
  overflow: hidden;
`;

export const Span = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const DivInfo = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  @media (max-width: 768px) {
    width: 96%;
    padding: 5px;
  }
`;

export const TitleInfo = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 16px;
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

export const AddImpre = styled.div`
  display: flex;
  justify-content: flex-end;
  p {
    color: #8000ff; /* roxo vibrante */
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: #a64dff; /* roxo mais claro ao passar o mouse */
      text-decoration: underline;
    }
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

export const LoadingSpinner = styled.div`
  /* Estilos para o spinner de carregamento */
`;
