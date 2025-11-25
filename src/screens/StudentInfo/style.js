import styled from 'styled-components';

/* PALETA */
const primary = "#16a34a";
const primaryHover = "#128338";
const danger = "#d9534f";
const dangerHover = "#c9302c";

/* ==================== CONTAINER GERAL ==================== */
export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f3f4f6;

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 420px) {
    padding: 10px 8px;
  }
`;

/* ==================== ÁREA CENTRAL (CARD) ==================== */
export const ContainerDivs = styled.div`
  width: 100%;
  max-width: 980px; /* mantem alinhamento com conteúdo */
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0;
  box-sizing: border-box;
`;

/* ==================== BUSCA / FILTRO (se existir) ==================== */
export const Search = styled.div`
  width: 100%;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  box-shadow: 0 3px 6px rgba(0,0,0,0.04);
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 12px;
    gap: 10px;
  }
`;

/* Form wrappers (keeps original names present) */
export const FormSearch = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormFilter = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

/* ==================== INPUTS / SELECTS ==================== */
export const AreaEmp = styled.div`
  display: flex;
  width: 100%;
  margin-top: 6px;
`;

export const InputEmp = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 15px;
  box-sizing: border-box;
  background: #fff;

  &:focus {
    outline: none;
    border-color: ${primary};
    box-shadow: 0 0 0 4px rgba(22,163,74,0.08);
  }

  @media (max-width: 420px) {
    padding: 8px 10px;
    font-size: 14px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 15px;
  background: #fff;

  &:focus {
    outline: none;
    border-color: ${primary};
    box-shadow: 0 0 0 4px rgba(22,163,74,0.08);
  }

  @media (max-width: 420px) {
    padding: 8px 10px;
    font-size: 14px;
  }
`;

/* ==================== LIST / ITEMS ==================== */
export const List = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
`;

export const Emp = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  cursor: pointer;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
  word-break: break-word;
  box-sizing: border-box;

  &:hover {
    transform: translateX(3px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    background: #f8fffa;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
  }
`;

export const Span = styled.span`
  font-size: 15px;
  color: #1f2937;
  display: block;
  word-break: break-word;

  @media (max-width: 420px) {
    font-size: 14px;
  }
`;

/* ==================== BUTTONS ==================== */
const btnBase = `
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  box-sizing: border-box;
`;

export const Btt02 = styled.button`
  ${btnBase}
  background: ${primary};
  color: #fff;

  &:hover { background: ${primaryHover}; transform: translateY(-1px); }
`;

export const Btt01 = styled.button`
  ${btnBase}
  background: ${danger};
  color: #fff;

  &:hover { background: ${dangerHover}; transform: translateY(-1px); }
`;

/* Button (usado em vários lugares) */
export const Button = styled.button`
  ${btnBase}
  background: ${primary};
  color: #fff;
  width: 100%;
  max-width: 280px;

  &:hover { background: ${primaryHover}; }

  @media (max-width: 420px) {
    max-width: 100%;
    padding: 9px 12px;
    font-size: 14px;
  }
`;

/* ButtonRemove variant if used */
export const ButtonRemove = styled.button`
  ${btnBase}
  background: ${danger};
  color: #fff;

  &:hover { background: ${dangerHover}; }
`;

/* Container for new employee button aligned */
export const DivNewEmp = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

/* ==================== PROFILE (STUDENT INFO) ==================== */
export const EmployeeInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Pro = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 10px;
    flex-direction: row;
    align-items: center;
  }

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProfilePhoto = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: #e6eef0;
  border: 3px solid ${primary};
  flex-shrink: 0;

  @media (max-width: 420px) {
    width: 70px;
    height: 70px;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  font-size: 15.2px;
  color: #111827;

  @media (max-width: 420px) {
    font-size: 14px;
  }
`;

export const DivButtomEdit = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  width: 100%;
`;

/* ==================== INPUT / FORM LAYOUTS ==================== */
export const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 14px;
  background: #fafafa;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;

  h3 { margin: 0; font-size: 16px; color: #0f172a; }

  @media (max-width: 420px) {
    padding: 10px;
    h3 { font-size: 15px; }
  }
`;

export const Label = styled.label`
  font-weight: 600;
  color: #0f172a;
  font-size: 14px;
`;

/* ==================== MESSAGES ==================== */
export const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 13px;
  text-align: center;
`;

/* ==================== CALENDAR / TABLES / MODAL ==================== */
export const ContainerCalendar = styled.div`
  width: 100%;
  max-width: 980px;   /* mesma largura do ContainerDivs */
  margin: 0 auto;     /* centraliza */
  box-sizing: border-box;
  background-color: #fff;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  box-shadow: 0 3px 6px rgba(0,0,0,0.04);

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 420px) {
    padding: 10px 8px;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHeader = styled.thead`
  background: #f8fafc;
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eef2f7;
  vertical-align: middle;
  word-break: break-word;
`;

export const TableBody = styled.tbody`
  display: table-row-group;
  width: 100%;
`;

/* TableRow can be used in modal or list */
export const TableRow = styled.tr`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .botões {
    display: flex;
    gap: 50px;
  }
`;

/* ==================== STATUS CHIPS / SELECTS ==================== */
export const StatusChip = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 13px;
  color: #fff;
  background: ${({ status }) => status === 'ativo' ? '#16a34a' : status === 'transferido' ? '#f59e0b' : '#ef4444'};
`;

export const SelectStatus = styled.select`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
`;

/* ==================== CHIP / MENU ITEM ==================== */
export const Chip = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 600;
  color: #fff;
  background: ${props => props.color === 'ativo' ? '#16a34a' : props.color === 'transferido' ? '#f59e0b' : props.color === 'inativo' ? '#ef4444' : primary};
`;

export const MenuItem = styled.div`
  padding: 8px 14px;
  border-radius: 8px;
  transition: background .12s;
  cursor: pointer;

  &:hover { background: #f3f4f6; }
`;

/* ==================== MODAL ==================== */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  -webkit-overflow-scrolling: touch;
`;

export const ModalContent = styled.div`
  width: 560px;
  max-width: calc(100% - 24px);
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(2,6,23,0.12);
  box-sizing: border-box;
`;

/* ==================== UTILS / SMALL LAYOUTS ==================== */
export const AddMatterSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const WarningBox = styled.div`
  padding: 12px;
  background: #fffbeb;
  border-radius: 8px;
  border: 1px solid #fbe7a1;
  color: #92400e;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 420px) {
    justify-content: center;
  }
`;

export const TableCellSmall = styled.td`
  padding: 8px;
  font-size: 14px;
`;

/* Botão de cancelar (presente em alguns modais) */
export const ButtonCancel = styled.button`
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  margin-top: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  box-sizing: border-box;
  background: #6b7280; /* cinza */
  color: #fff;

  &:hover {
    background: #4b5563;
    transform: translateY(-1px);
  }

  @media (max-width: 420px) {
    padding: 9px 12px;
    font-size: 14px;
  }
`;

