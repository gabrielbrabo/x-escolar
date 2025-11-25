import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-height: 88vh;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8fafc;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: hidden; /* <-- Evita rolagem lateral */

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ContainerEmp = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

// ---------------- LISTA ----------------
export const List = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  > p {
    font-size: 15.5px;
    font-weight: 600;
    color: #334155;
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    > p {
      font-size: 14px;
    }
  }
`;

export const Emp = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 14px 16px;
  gap: 10px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #3b82f6;
  border-radius: 8px;
  cursor: pointer;
  transition: all .2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);

  &:hover {
    background-color: #f1f5f9;
    transform: translateX(2px);
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
  }
`;

export const Span = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;

  @media (max-width: 768px) {
    font-size: 14.5px;
  }
`;

// ---------------- FILTRO / BUSCA ----------------
export const Search = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 15px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const FormSearch = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  label {
    color: #475569;
    font-weight: 600;
    font-size: 14.8px;
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    width: 100%;
    label {
      font-size: 14px;
    }
  }
`;

export const FormFilter = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  label {
    color: #475569;
    font-weight: 600;
    font-size: 14.8px;
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    width: 100%;
    label {
      font-size: 14px;
    }
  }
`;

export const Area = styled.div`
  margin-top: 2px;
`;

export const InputEmp = styled.input`
  height: 38px;
  width: 100%;
  padding: 0 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 15px;
  background-color: #fff;
  transition: border .2s, box-shadow .2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59,130,246,0.25);
  }
`;

export const Select = styled.select`
  margin-top: 2px;
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 15px;
  background-color: #fff;
  transition: border .2s, box-shadow .2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59,130,246,0.25);
  }
`;

// ---------------- BOTÃO ----------------
export const DivNewEmp = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 10px 0;
  margin-bottom: 5px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    justify-content: center;
  }
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
