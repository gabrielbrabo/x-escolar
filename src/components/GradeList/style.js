import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const AttendanceContainer = styled.div`
  text-align: center;
  width: 100%;
  min-height: 80vh;
`;
export const ContInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const CtnrBtt = styled.div`
 display: flex;
 justify-content: end;
  width: 100%;
`;

export const DataBimonthly = styled.div`
 display: flex;
 justify-content: center;
 gap: 20px;
  width: 100%;
`;

export const Button = styled.button`
  width: 150px;
  padding: 15px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #45a049;
  }
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

export const ContTable = styled.table`
  display: flex;
  align-items: center;
  overflow-x: auto; /* Permite rolagem horizontal */
`;

export const Table = styled.table`
  border-collapse: collapse;
  margin: 20px 0;
  background-color: #fff;
  border: 1px solid #ddd;
  width: 100%;
`;

export const TableHeader = styled.thead`

  .matter-cell-0 {
      background-color: #FFD700; /* Amarelo */
  }
  .matter-cell-1 {
      background-color: #ADD8E6; /* Azul Claro */
  }
  .matter-cell-2 {
      background-color: #90EE90; /* Verde Claro */
  }
  .matter-cell-3 {
      background-color: #FFB6C1; /* Rosa Claro */
  }
  .matter-cell-4 {
      background-color: #FFA07A; /* Salmão Claro */
  }
  .matter-cell-5 {
      background-color: #DDA0DD; /* Roxo Claro */
  }
  .matter-cell-6 {
      background-color: #FFFAF0; /* Ivory */
  }
  .matter-cell-7 {
      background-color: #F5F5DC; /* Bege */
  }
  .matter-cell-8 {
      background-color: #D8BFD8; /* Thistle */
  }
  .matter-cell-9 {
      background-color: #FFDAB9; /* Pêssego Claro */
  }
  .matter-cell-10 {
      background-color: #FFEFD5; /* PapayaWhip */
  }
  .matter-cell-11 {
      background-color: #F0E68C; /* Khaki Claro */
  }
  .matter-cell-12 {
      background-color: #E0FFE0; /* Verde Pastel Claro */
  }
  .matter-cell-13 {
      background-color: #FAFAD2; /* Luz do Sol Pálida */
  }
  .matter-cell-14 {
      background-color: #E6E6FA; /* Lavanda */
  }
  .matter-cell-15 {
      background-color: #F5DEB3; /* Trigo */
  }
  .matter-cell-16 {
      background-color: #98FB98; /* Verde Pálido */
  }
  .matter-cell-17 {
      background-color: #FFC0CB; /* Rosa Claro */
  }
  .matter-cell-18 {
      background-color: #FFE4E1; /* Salmão Muito Claro */
  }
  .matter-cell-19 {
      background-color: #ADD8E6; /* Azul Claro */
  }

  background-color: #f5f5f5;
  th {
    padding: 4px;
    text-align: center;
    font-size: 0.7em;
    border: 1px solid #ddd;

    &.date-cell {
      
    }
  }
`;

export const TableBody = styled.tbody`

  .matter-cell-0 {
      background-color: #FFFACD; /* Amarelo Claro */
  }
  .matter-cell-1 {
      background-color: #E0FFFF; /* Azul Muito Claro */
  }
  .matter-cell-2 {
      background-color: #F0FFF0; /* Verde Muito Claro */
  }
  .matter-cell-3 {
      background-color: #FFF0F5; /* Rosa Muito Claro */
  }
  .matter-cell-4 {
      background-color: #FFE4E1; /* Salmão Muito Claro */
  }
  .matter-cell-5 {
      background-color: #E6E6FA; /* Lavanda */
  }
  .matter-cell-6 {
      background-color: #FFFAF0; /* Ivory */
  }
  .matter-cell-7 {
      background-color: #F5F5DC; /* Bege */
  }
  .matter-cell-8 {
      background-color: #D8BFD8; /* Thistle */
  }
  .matter-cell-9 {
      background-color: #FFDAB9; /* Pêssego Claro */
  }
  .matter-cell-10 {
      background-color: #FFEFD5; /* PapayaWhip */
  }
  .matter-cell-11 {
      background-color: #F0E68C; /* Khaki Claro */
  }
  .matter-cell-12 {
      background-color: #E0FFE0; /* Verde Pastel Claro */
  }
  .matter-cell-13 {
      background-color: #ADD8E6; /* Azul Claro */
  }
  .matter-cell-14 {
      background-color: #FAFAD2; /* Luz do Sol Pálida */
  }
  .matter-cell-15 {
      background-color: #D3D3D3; /* Cinza Claro */
  }
  .matter-cell-16 {
      background-color: #F5DEB3; /* Trigo */
  }
  .matter-cell-17 {
      background-color: #FFC0CB; /* Rosa Claro */
  }
  .matter-cell-18 {
      background-color: #FFD700; /* Ouro Claro */
  }
  .matter-cell-19 {
      background-color: #98FB98; /* Verde Pálido */
  }


  tr {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
  }

  td {
    padding: 3px;
    text-align: center;
    border: 1px solid #ddd;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & .name-cell {
      font-size: 0.8em;
    }

  & .presence {
    font-size: 0.8em;
    color: green;
  }

  & .absence {
    font-size: 0.8em;
    color: red;
  }

  & .total-presence {
    font-size: 0.8em;
    color: #1d0cc6;
    font-weight: bold;
  }

  & .total-absence {
    font-size: 0.8em;
    color: #f82410;
    font-weight: bold;
  }
`;

export const ToGoBack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  margin-bottom: 20px;
  cursor: pointer;

  @media print {
    display: none; /* Ocultar na impressão */
  }
`;

export const SignMessageButtonText = styled.span`
  color: #333;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SignMessageButtonTextBold = styled.span`
  color: #333;
  font-weight: bold;
  margin-left: 5px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const PrintStyle = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  @media print {
    body { /* Ajuste conforme necessário */
      margin: 0;
      padding: 0;
    }

    

    /* Exclui todo o conteúdo fora da área de impressão */
    .no-print {
      display: none;
    }

    .printable-content {
      visibility: visible; /* Exibe apenas o conteúdo dentro desta classe */
      font-size: 15px;
      //transform: scale(1); /* Ajusta a escala da tabela */
    }

    ${ContTable} {
      overflow-x: hidden; /* Permite rolagem horizontal */
      //width: max-content; /* Garante que a tabela ocupe a largura do conteúdo */
      margin-left: auto; /* Centraliza horizontalmente */
      margin-right: auto; /* Centraliza horizontalmente */
    }

    th, td {
      text-align: center;
      border: 1px solid #ddd;
      page-break-inside: avoid;
      //font-size: 8px;
      padding: auto;
    }
    tr {
      page-break-inside: avoid; /* Evita quebras dentro de linhas da tabela */
    }

    @page {
      size: A4 landscape; /* Define o formato da página como paisagem */
      margin: 0;
    }

    .table-container {
    }
  }
`;

export const InfoText = styled.div`
  color: #777;
  font-size: 16px;
  text-align: center;
  margin-top: 10px;

  @media print {
    display: none;
  }
`;