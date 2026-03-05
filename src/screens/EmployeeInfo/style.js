import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  background: #f4f6f9;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 15px 10px;
  }
`;

export const Emp = styled.div`
  width: 100%;
  max-width: 1000px;
  min-height: 150px;

  background: white;
  border-radius: 12px;

  box-shadow: 0 8px 25px rgba(0,0,0,0.08);

  padding: 25px;

  transition: 0.2s;

  &:hover{
    box-shadow: 0 12px 35px rgba(0,0,0,0.12);
  }

  @media (max-width:1024px){
    max-width: 700px;
  }

  @media (max-width:768px){
    padding:18px;
  }
`;

export const EmployeeInfo = styled.div`
  display:flex;
  flex-direction:column;
  gap:15px;
`;

export const Pro = styled.div`
  display:flex;
  align-items:center;
  gap:18px;
  width:100%;

  @media(max-width:600px){
    flex-direction:column;
    align-items:flex-start;
  }
`;

export const ProfilePhoto = styled.div`
  width:80px;
  height:80px;

  min-width:80px;

  background:#e5e7eb;
  border-radius:50%;

  display:flex;
  align-items:center;
  justify-content:center;

  font-weight:600;
  font-size:22px;
  color:#555;

  box-shadow:0 4px 10px rgba(0,0,0,0.08);

  @media(max-width:768px){
    width:70px;
    height:70px;
  }
`;

export const ProfileInfo = styled.div`
  display:flex;
  flex-direction:column;
  gap:6px;
  width:100%;
  overflow:hidden;
`;

export const DivButtomEdit = styled.div`
  display:flex;
  justify-content:flex-end;
  width:100%;
  margin-top:10px;
`;

export const DivInfo = styled.div`
  width:100%;
  max-width:1000px;

  background:white;

  border-radius:12px;

  box-shadow:0 6px 20px rgba(0,0,0,0.07);

  padding:22px;

  display:flex;
  flex-direction:column;

  gap:12px;

  transition:0.2s;

  &:hover{
    box-shadow:0 10px 28px rgba(0,0,0,0.10);
  }

  @media(max-width:1024px){
    max-width:700px;
  }

  @media(max-width:768px){
    padding:16px;
  }
`;

export const TitleInfo = styled.h3`
  font-size:18px;
  font-weight:600;
  color:#333;
  margin-bottom:10px;

  border-bottom:1px solid #eee;
  padding-bottom:6px;

  @media(max-width:768px){
    font-size:16px;
  }
`;

export const Span = styled.span`
  display:block;
  font-size:15px;
  color:#555;
`;

export const Matter = styled.div`
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  gap:10px;

  span{
    background:#f4f6f9;
    padding:8px 10px;
    border-radius:6px;
    font-size:14px;
  }
`;

export const DivAddEmp = styled.div`
  display:flex;
  justify-content:flex-end;
  width:100%;
  gap:10px;
  margin-top:15px;
`;

export const AddEmp = styled.div`
  display:flex;
  justify-content:center;
`;

export const ContainerDivs = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:20px;
  width:100%;
  max-width:1000px;
`;

export const Btt02 = styled.button`
  background:#2563eb;
  color:white;

  border:none;
  border-radius:8px;

  padding:10px 18px;

  font-weight:500;

  cursor:pointer;

  transition:0.2s;

  &:hover{
    background:#1d4ed8;
  }
`;

export const Btt01 = styled.button`
  background:#ef4444;
  color:white;

  border:none;
  border-radius:8px;

  padding:10px 18px;

  cursor:pointer;

  transition:0.2s;

  &:hover{
    background:#dc2626;
  }
`;

export const ButtonCancel = styled.div`
  display:flex;
  justify-content:center;
  margin-top:50px;
`;

export const DivShowMatter = styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
`;

export const LoadingSpinnerContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:300px;
`;

export const AddMatterSection = styled.div`
  width:100%;
  min-height:200px;

  display:flex;
  align-items:center;
  justify-content:center;

  flex-direction:column;

  gap:12px;

  background:rgba(255,255,255,0.85);

  padding:20px;

  border-radius:10px;
`;

export const WarningBox = styled.div`
  padding:14px 18px;

  background:#fff3cd;

  border:1px solid #ffeeba;

  border-radius:8px;

  font-size:15px;

  text-align:center;

  color:#856404;
`;

export const ActionButtons = styled.div`
  display:flex;
  gap:10px;

  @media(max-width:768px){
    flex-direction:column;
  }
`;

export const Button = styled.button`
  padding:12px;

  border:none;

  border-radius:8px;

  background:#22c55e;

  color:white;

  font-size:15px;

  cursor:pointer;

  transition:0.2s;

  &:hover{
    background:#16a34a;
  }
`;

export const ButtonRemove = styled.button`
  padding:12px;

  border:none;

  border-radius:8px;

  background:#ef4444;

  color:white;

  cursor:pointer;

  transition:0.2s;

  &:hover{
    background:#dc2626;
  }
`;

export const Label = styled.label`
  font-weight:600;
  font-size:14px;
`;

export const Select = styled.select`
  width:95%;

  padding:10px;

  border-radius:6px;

  border:1px solid #ccc;
`;

export const Input = styled.div`
  display:flex;
  flex-direction:column;

  padding:20px;

  width:100%;

  background:#fafafa;

  border-radius:10px;

  border:1px solid #eee;

  gap:10px;
`;

export const ErrorMessage = styled.div`
  color:red;
  font-size:13px;
`;

export const Backdrop = styled.div`
  position:fixed;
  top:0;
  left:0;

  width:100vw;
  height:100vh;

  background:rgba(0,0,0,0.5);

  backdrop-filter:blur(6px);

  display:flex;
  align-items:center;
  justify-content:center;

  z-index:9999;
`;

export const Modal = styled.div`
  background:white;

  padding:25px;

  border-radius:12px;

  width:90%;
  max-width:400px;

  box-shadow:0 15px 35px rgba(0,0,0,0.15);
`;

export const ClassList = styled.ul`
  list-style:none;
  padding:0;
  margin-top:15px;
`;

export const ClassItem = styled.li`
  padding:10px;

  border-radius:6px;

  background:#f3f4f6;

  cursor:pointer;

  margin-bottom:8px;

  transition:0.2s;

  &:hover{
    background:#e5e7eb;
  }
`;