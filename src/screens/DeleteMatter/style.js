import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

export const Search = styled.div`
  margin-bottom: 20px;
`;

export const FormSearch = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
    font-size: 16px;
    color: #333;
  }
`;

export const AreaEmp = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InputEmp = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const List = styled.div`
  display: grid;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Emp = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  flex: 1;
  min-width: 200px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const Span = styled.span`
  font-size: 16px;
  color: #333;
`;

export const Add = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px); /* Efeito de blur no fundo */
  background-color: rgba(0, 0, 0, 0.4); /* Adiciona uma cor de fundo semitransparente */
  z-index: 9999;
`;

export const AddTeacher = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  > * {
    display: block;
    margin: 10px 0;
    font-size: 16px;
    color: #333;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const Btt01 = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
