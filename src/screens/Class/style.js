import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 90vh;
  padding-top: 20px;
  background: #eef4f7;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 0px;
  }
`;

export const ContainerDivs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 20px;
  padding: 0px;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding-top: 10px;
  }
`;

export const Search = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.08);
  border: 1px solid #e6eef1;

  @media (max-width: 768px) {
    width: 97%;
    padding: 10px;
  }

  label {
    font-weight: 600;
    color: #003e4f;
    font-size: 15px;
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
  padding: 12px 14px;
  border: 1px solid #b8c6cc;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  background: #fbfbfb;
  transition: 0.3s;

  &:focus {
    border-color: #007bff;
    background: #fff;
    box-shadow: 0 0 4px rgba(0,123,255,0.4);
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const FormFilter = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Select = styled.select`
  padding: 12px 14px;
  border: 1px solid #b8c6cc;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  background: #fbfbfb;
  transition: 0.3s;

  &:focus {
    border-color: #007bff;
    background: #fff;
    box-shadow: 0 0 4px rgba(0,123,255,0.4);
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 40%;
  gap: 20px;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.08);
  border: 1px solid #e6eef1;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #003e4f;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 97%;
    padding: 10px;
  }
`;

export const DivNewEmp = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
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

  @media (max-width: 768px) {
    padding: 10px 18px;
  }
`;

export const Emp = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f3fafd 100%);
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid #dde8ec;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.12);
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Span = styled.span`
  display: block;
  font-size: 17px;
  font-weight: 600;
  color: #003e4f;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
