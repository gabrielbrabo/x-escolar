import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
    @media (max-width: 768px) {
        padding: 0;
    }
`;

export const ContainerDivs = styled.div`
  width: 94%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const Search = styled.div`
    width: 100%;
   display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const FormSearch = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AreaEmp = styled.div`
display: flex;
align-items: center;
flex-direction: column;
width: 100%;
    margin-top: 5px;
`;

export const InputEmp = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 92%;
`;

export const FormFilter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
    }
`;

export const Select = styled.select`
    padding: 10px;
    border-radius: 5px;
    width: 92%;
    border: 1px solid #ccc;
`;

export const List = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 45vh;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        
        padding: 5px;
        min-height: 60vh;
    }
`;

export const DivNewEmp = styled.div`
    align-self: flex-end;
    margin-bottom: 10px;
`;

export const Btt02 = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const Emp = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f5f5f5;
    }

    @media (max-width: 768px) {
    padding: 3px;
  }
`;

export const Span = styled.span`
    flex: 1;
    text-align: left;
    font-size: 16px;
`;
