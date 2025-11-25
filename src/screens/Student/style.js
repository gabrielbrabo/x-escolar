import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 20px;
  overflow-x: clip; /* Evita rolagem lateral totalmente */

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const ContainerDivs = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const Search = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  background-color: #ffffff;
  padding: 18px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  box-shadow: 0 3px 6px rgba(0,0,0,0.06);
  box-sizing: border-box;

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const FormSearch = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  label {
    margin-left: 10px;
    font-weight: 500;
    font-size: 14px;
  }
`;

export const AreaEmp = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
`;

export const InputEmp = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 15px;
  transition: all .2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 5px rgba(59,130,246,0.4);
  }
`;

export const FormFilter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;

  label {
    margin-left: 10px;
    font-weight: 500;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  font-size: 15px;
  border: 1px solid #ccc;
  transition: all .2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 5px rgba(59,130,246,0.4);
  }
`;

export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 45vh;
  background-color: #ffffff;
  padding: 18px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  box-shadow: 0 3px 6px rgba(0,0,0,0.06);
  box-sizing: border-box;

  @media (max-width: 768px) {
    min-height: 55vh;
    padding: 10px;
  }
`;

export const DivNewEmp = styled.div`
  align-self: flex-end;
  margin-bottom: 10px;
`;

export const Btt02 = styled.button`
  padding: 10px 20px;
  background-color: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all .25s ease;

  &:hover {
    background-color: #2563eb;
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Emp = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  background-color: #fff;

  &:hover {
    background-color: #eaf8ff;
    box-shadow: 0px 2px 8px rgba(0, 123, 255, 0.25);
    transform: translateX(2px);
  }

  @media (max-width: 768px) {
    padding: 8px;
    //flex-direction: column;
    align-items: flex-start;
    gap: 3px;
  }
`;

export const Span = styled.span`
  flex: 1;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;
