import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ButtonPrint = styled.button`
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

  @media print {
    display: none !important;
  }
`;

// style attendance
export const AttendanceContainer = styled.div`
  text-align: center;
  width: 100%;
  min-height: 80vh;
`;

export const ContInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 20px;
  margin-bottom: 1rem;

  span {
    font-size: 1rem;
    margin-bottom: 6px;
    word-break: break-word;
    color: #333;

    strong {
      font-weight: bold;
      margin-right: 5px;
    }
  }

  @media (max-width: 768px) {
    padding: 0.1rem;

    span {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    span {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 360px) {
    span {
      font-size: 0.85rem;
    }
  }

  @media print {
    padding: 0;
    margin-bottom: 0.5rem;

    span {
      font-size: 10pt;
      margin-bottom: 2px;
      line-height: 1.1;
    }
  }
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
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-left: auto;

  &:hover {
    background-color: #0056b3;
  }

  @media print {
    display: none;
  }
`;

export const ContTable = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
`;

export const Table = styled.table`
  border-collapse: collapse;
  margin: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  width: 100%;
`;

export const TableHeader = styled.thead`
  background-color: #f5f5f5;
  th {
    padding: 4px;
    text-align: center;
    font-size: 0.7em;
    border: 1px solid #ddd;
  }
`;

export const TableBody = styled.tbody`
  tr {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
  }
  tr:hover {
    background-color: #e0f0ff;
    cursor: pointer;
  }
  tr.selected-row {
    background-color: #a8d0ff;
  }
  td {
    padding: 3px;
    text-align: center;
    border: 1px solid #ddd;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & .name-cell {
    text-align: start;
    font-size: 0.8em;
  }

  & .presence {
    font-size: 0.8em;
    color: green;
    font-weight: bold;
  }

  & .absence {
    font-size: 0.8em;
    color: red;
    font-weight: bold;
  }

  & .justifiedAbsence {
    font-size: 0.8em;
    color: #6a0dad;
    font-weight: bold;
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

  & .total-justifiedAbsence {
    font-size: 0.8em;
    color: #6a0dad;
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
    display: none;
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

export const InfoText = styled.div`
  display: flex;
  width: 100%;
  color: #777;
  font-size: 16px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  @media print {
    display: none;
  }
`;

export const Butons = styled.div`
    width: 100%;
    display: flex;
    //min-height: 10vh;
    max-height: 10vh;
    background-color: #ced1c0;
    gap: 20px;
    padding-top: 20px;
      padding-bottom: 20px;
    box-shadow: 0px 0px 7px inset black;

    @media screen and (max-width: 768px) {
      padding-top: 20px;
      padding-bottom: 20px;
      flex-direction: column;
    }
`;
export const BottomButons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
export const UpperButons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
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

  &.active {
    background-color: #0056b3;
    border-bottom: 3px solid #d35400;
    color: white;
    border-radius: 4px;
  }

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 360px)  {
      font-size: 10px; /* Smartphones pequenos */
    }

  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

export const ButtonGroup = styled.div`
  width: 30%;
  display: flex;
  gap: 50px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px; /* Pode reduzir o espaço se quiser no mobile */
  }
`;


export const PrintStyle = styled.div`
  @media print {
    body * {
      display: none;
    }

    .no-print {
      display: none;
    }

    .printable-content {
      visibility: visible;
      font-size: 15px;
    }

    ${AttendanceContainer} {
      width: 100%;
      height: auto;
      box-sizing: border-box;
    }

    ${ContTable} {
      overflow-x: hidden;
      width: max-content;
      margin-left: auto;
      margin-right: auto;
    }

    th, td {
      text-align: center;
      border: 1px solid #ddd;
      font-size: 8px;
      padding: 1px;
    }

    @page {
      size: A4 landscape;
      margin: 0;
    }
  }
`;



//style aulas lecionadas
export const StudentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* centraliza horizontalmente */
  justify-content: center; /* centraliza verticalmente se necessário */
  width: 100%;
  //padding: 1rem;
  
  text-align: center;

  h2 {
    margin-bottom: 10px;
    color: #333;
  }

  @media print {
    h2 {
      font-size: 12pt;
      text-align: center;
    }
  }
`;

export const LessonsContainer = styled.div`
   width: 100%;
  max-width: 1300px;
  box-sizing: border-box;
  //overflow-x: hidden;
  padding: 1rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  margin-top: 1.5rem;

  h2 {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
    color: #333;
  }

  .total-aulas-lecionadas {
    color: #333;
    position: relative;
    display: inline-block;
  }

  .total-aulas-lecionadas::after {
    content: "";
    position: absolute;
    left: -15px;
    right: -15px;
    bottom: -2px;
    height: 2px;
    background-color: #37d60a;
  }

  .data {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 1rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 1rem;
    margin-bottom: 1rem;

    span {
      display: block;
    }
  }

  @media (max-width: 768px) {
    padding: 0rem;
    width: 100%;

    h2 {
      font-size: 1.3rem;
    }

    .data {
      flex-direction: column;
      align-items: center;
    }

    .info {
      font-size: 0.9rem;
    }
  }

  @media print {
    background: transparent;
    box-shadow: none;
    padding: 0;
    margin-top: 0;

    h2 {
      font-size: 12pt;
      text-align: center; /* 🔧 Força centralização na impressão */
    }

    .total-aulas-lecionadas {
      text-align: center; /* 🔧 Centraliza texto */
      //margin: 0;     /* 🔧 Garante centralização horizontal */
      display: block;
    }

    .total-aulas-lecionadas::after {
    content: "";
    position: relative;
    display: block;
    height: 2px;
    width: 100%;
    background-color: #37d60a;
    margin-top: 7px;
  }

    .data,
    .info {
      font-size: 12pt;
      margin-bottom: 8px;
    }
  }
`;


export const ContainerTable = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
  padding: 10px;
  border-bottom: 2px solid #6a0dad;
  background-color: #f0f0f0;

  @media print {
    border-bottom: none;
    page-break-inside: avoid;
    break-inside: avoid;
    overflow: visible;
    width: 100%;
    
    display: block;
  }

  @media (max-width: 768px) {
    padding: 0%,5;
    width: 100%;
  }
`;


export const DescriptionCell = styled.div`
  width: 100%;
  max-width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: left;
  flex: 3;
  position: relative;

  .description {
    color: black !important;

    * {
      color: black !important;
    }

    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
    white-space: pre-wrap;
    transition: max-height 0.3s ease;

    &.collapsed {
      -webkit-line-clamp: 3;
      max-height: 4.5em;
    }

    &.expanded {
      -webkit-line-clamp: unset;
      max-height: none;
    }

    @media (max-width: 345px) {
      font-size: 13px;
    }

    @media print {
      -webkit-line-clamp: unset;
      max-height: none;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-size: 12pt;
    }
  }

  @media (max-width: 768px) {
    padding: 8px 0;
  }

  > div:last-child {
    margin-top: 10px;
  }
`;

export const DateCell = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 12pt; /* Formato ABNT */
  text-align: left;
  flex: 1;

  @media (max-width: 345px)  {
      font-size: 11px;
  }
  @media (min-width: 345px) and (max-width: 481px) {
      font-size: 9pt;
  }
  @media (min-width: 481px) and (max-width: 768px) {
      font-size: 10pt;
  }

  @media print {
    font-size: 12pt;
  }
`;

export const Span = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 10pt; /* Formato ABNT */
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;

  div {
    display: flex;
    align-items: center;
    height: 13px;
  }

  p {
    margin-left: 5px;
    font-weight: bold;
  }

  p {
    color: #158fa2;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  @media (max-width: 345px)  {
      font-size: 9px; /* Smartphones pequenos */
      gap: 5px;
    }
    @media (min-width: 345px) and (max-width: 481px) {
      font-size: 8pt; /* Smartphones pequenos */
      gap: 5px;
    }

    @media (min-width: 481px) and (max-width: 768px) {
      font-size: 9pt; /* Tablets */
      gap: 5px;
    }
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const HiddenOnPrint = styled.div`
  display: block;

  @media print {
    display: none;
  }
`;

export const PrintStyleLessons = styled.div`
  @media print {
    body * {
      margin: 0;
      padding: 0;
    }

    .no-print {
      display: none;
    }

    ${ContainerTable} {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }
    ${StudentSection} {
      width: 100%;
      display: flex;
      position: absolute;
      z-index: 99999;
    }

    @page {
      size: A4;
      margin: 0px;
      padding: 20px;
    }

    .table-container {
      font-size: 12pt; /* Formato ABNT */
      line-height: 1.5;
    }
  }
`;

export const EditContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;

    .ql-toolbar.ql-snow {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 0px;
      padding: 0px;
      margin-bottom: 10px;
    }


    .modal-content {
        background-color: #f9f9f9;
        border: 2px solid #FF5733;
        padding: 20px;
        width: 90%;
        max-width: 750px;
        min-height: 500px; /* Aumenta a altura mínima */
        max-height: 90vh; /* Garante que não ultrapasse a tela */
        overflow-y: auto;
        border-radius: 8px;
        display: flex;
        flex-direction: column;

        h3 {
            margin: 0 0 15px 0;
            color: #333;
        }

        .data {
            display: flex;
            padding-left: 5px;
        }

        input,
        textarea {
            width: 100%;
            margin-bottom: 12px;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
            font-size: 14px;
            box-sizing: border-box;
        }

        textarea {
            resize: vertical;
            height: 250px;
        }

        .BoxBtt {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-evenly;
            margin-top: 20px;
        }

        button {
            align-self: flex-start;
            margin-right: 10px;
        }

        @media (max-width: 768px) {
            padding: 12px;

            h3 {
                font-size: 18px;
            }

            button {
                width: 100%;
                margin-bottom: 5px;
            }
        }

        @media print {
            display: none;
        }
    }

    @media print {
        display: none;
    }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media print {
    display: none;
  }
`;

export const ButtonEdit = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background-color: #0056b3;
    }

    @media print {
        display: none; // Oculta na impressão
    }
`;

//Container avaliaçoes

export const AssessmentsContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  box-sizing: border-box;
  padding: 2rem 2rem 3rem; /* mais espaço em cima e embaixo */
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); /* sombra um pouco mais suave e difusa */
  margin-top: 2rem;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-align: center;
    color: #222;
    letter-spacing: 0.05em;
  }

  .assessment-item {
    margin-bottom: 2.5rem;
    padding: 1.5rem 2rem;
    border: 1px solid #ddd;
    border-radius: 12px;
    background-color: #fefefe;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

    strong {
      display: block;
      margin-bottom: 0.75rem;
      font-weight: 600;
      color: #444;
    }

    /* Espaço extra entre as linhas do texto forte */
    & > strong:not(:last-child) {
      margin-bottom: 1rem;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 8px; /* espaçamento entre linhas da tabela */
      margin-top: 1.25rem;
      font-size: 1rem;

      th, td {
        background-color: #f9f9f9;
        padding: 12px 16px;
        text-align: left;
        color: #555;
        border-radius: 8px;
        box-shadow: inset 0 -1px 0 #e0e0e0;
      }

      th {
        background-color: #e6f4ea;
        color: #2e7d32;
        font-weight: 700;
        box-shadow: none;
      }

      tbody tr:hover td {
        background-color: #def0d8; /* highlight leve ao passar o mouse */
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0;
    h2 {
      font-size: 1.3rem;
    }

  }

  @media print {
    background: transparent;
    box-shadow: none;
    padding: 0;
    margin-top: 0;

    h2 {
      font-size: 12pt;
      text-align: center;
    }

    .assessment-item {
      border: none;
      box-shadow: none;
      background-color: transparent;

      strong {
        color: #000;
      }

      table {
        border-spacing: 0;
        border-collapse: collapse;

        th, td {
          background-color: transparent;
          border: 1px solid #000;
          box-shadow: none;
          color: #000;
          padding: 6px 8px;
        }

        tbody tr:hover td {
          background-color: transparent;
        }
      }
    }
  }
`;


export const ToggleButton = styled.button`
  background-color: #28a745; /* verde bootstrap */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: #218838; /* verde escuro no hover */
  }

  &:active {
    background-color: #1e7e34;
  }
`;

// container de notas

export const GradesTableContainer = styled.div`
  width: 100%;
  //overflow-x: auto;  // Permite rolagem horizontal
  -webkit-overflow-scrolling: touch; // Rolagem suave no iOS
  margin-top: 2rem;

  /* Opcional: esconder barra de rolagem no desktop, mas deixar no mobile */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  .grade-row {
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .grade-row:hover {
    background-color: #e0ecff;
  }

  .grade-row.selected {
    background-color: #a8d0ff;
  }

  .grade-red {
    color: red;
    font-weight: bold;
  }

  .grade-blue {
    color: blue;
    font-weight: bold;
  }

  .grade-green {
    color: #1d7f14;
    font-weight: bold;
  }
`;

export const GradesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    white-space: nowrap;        /* Não deixa quebrar */
    overflow: hidden;
    text-overflow: ellipsis;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
    font-size: 0.9rem;          /* Fonte menor no header */
  }

  .name-cell {
    text-align: left;
    min-width: 150px;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  /* 🔑 Mobile: diminui tudo */
  @media (max-width: 768px) {
    font-size: 0.8rem;

    th, td {
      padding: 6px;
      font-size: 0.75rem;
    }

    .name-cell {
      min-width: 120px;
    }
  }
`;

export const GradesTableHeader = styled.thead``;  // 🔑 Nome exclusivo!
export const GradesTableBody = styled.tbody``;    // 🔑 Nome exclusivo!

export const LegendBox = styled.div`
    max-width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        margin: 0px;
        text-align: center;
    }

    p {
        margin: 5px;
    }

    @media (max-width: 375px)  {
      font-size: 9pt; /* Smartphones pequenos */
      padding: 0;
    }
    @media (min-width: 375px) and (max-width: 768px) {
      font-size: 10pt; /* Smartphones pequenos */
      padding: 0;
    }
`;

//container conceitos

export const ConceptsTableContainer = styled.div`
  
  width: 100%;
`;

export const ConceptsTable = styled.table`

  border-collapse: collapse;
  width: 100%;
  min-width: 600px;

  th, td {
    border: 1px solid #ddd;
    padding: 0.5rem;
    text-align: center;
    white-space: nowrap;
    font-size: clamp(0.7rem, 2.5vw, 1rem);
  }

  th.name-cell, td.name-cell {
    text-align: left;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #e0ecff;
  }

  .concept-row.selected {
    background-color: #a8d0ff;
  }

  .concept-green {
    color: #1d7f14;
    font-weight: bold;
  }

  .concept-blue {
    color: blue;
    font-weight: bold;
  }

  .concept-orange {
    color: orange;
    font-weight: bold;
  }

  .concept-red {
    color: red;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 0.4rem;
    }
  }
`;

export const ConceptsTableHeader = styled.thead``;

export const ConceptsTableBody = styled.tbody``;


//container fincha individual

export const IndividualContainerDivs = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
    width: 100%;
  }

  @media (max-width: 400px) {
    padding: 8px;
  }

  @media print {
    box-shadow: none;
    padding: 0;
  }
`;

export const IndividualPrintStyle = styled.div`
  @media print {
    body {
      margin: 0;
      padding: 0;
    }
    .no-print {
      display: none;
    }

    @page {
      size: A4;
      margin: 2cm;
    }
  }
`;

export const IndividualStudentSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  word-break: break-word;
  overflow-wrap: break-word;

  h2 {
    margin-bottom: 10px;
    color: #333;
  }

  h3 {
    margin-top: 0;
    color: #555;
  }

  span {
    margin: 5px 0;
    font-size: 14px;
    color: #333;
  }

  @media (max-width: 400px) {
    h2 {
      font-size: 18px;
    }
    h3 {
      font-size: 16px;
    }
    span {
      font-size: 12px;
    }
  }

  @media print {
    h2, h3, span {
      font-size: 12pt;
    }
  }
`;

export const IndividualCtnrBtt = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media print {
    display: none;
  }
`;

export const IndividualButton = styled.button`
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
    width: 100%;
    padding: 12px;
    font-size: 14px;
  }

  @media (max-width: 400px) {
    width: 100%;
    font-size: 12px;
    padding: 10px;
    margin: 5px 0;
  }

  @media print {
    display: none;
  }
`;

export const IndividualContainerTable = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #f0f0f0;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media print {
    border-bottom: none;
    page-break-inside: avoid;
    break-inside: avoid;
    overflow: visible;
    width: 100%;
    
    display: block;
  }
`;

export const IndividualSpan = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 10pt;
  gap: 3px;
  word-break: break-word;

  div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: auto;
  }

  p {
    margin-left: 5px;
    font-weight: bold;
    word-break: break-word;
  }

  @media (max-width: 400px) {
    font-size: 9pt;
    gap: 2px;
  }
`;

export const IndividualTableRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const IndividualDescriptionCell = styled.div`
  max-width: 100%;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: left;
  flex: 3;
  position: relative;
  box-sizing: border-box;

  .description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-word;
    transition: max-height 0.3s ease;

    &.collapsed {
      -webkit-line-clamp: 3;
      max-height: 4.5em;
    }

    &.expanded {
      -webkit-line-clamp: unset;
      max-height: none;
    }

    @media (max-width: 400px) {
      font-size: 12px;
    }

    @media print {
      font-size: 12pt;
    }
  }

  > div:last-child {
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    padding: 8px 0;
  }
`;

export const IndividualToggleButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 400px) {
    width: 100%;
    padding: 8px;
    font-size: 12px;
  }

  @media print {
    display: none;
  }
`;

export const IndividualErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 400px) {
    font-size: 11px;
  }

  @media print {
    display: none;
  }
`;

export const IndividualButtonEdit = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 400px) {
    width: 100%;
    padding: 8px;
    font-size: 12px;
  }

  @media print {
    display: none;
  }
`;

export const IndividualInfoText = styled.div`
  color: #777;
  font-size: 16px;
  text-align: center;
  margin-top: 10px;

  @media (max-width: 400px) {
    font-size: 14px;
  }

  @media print {
    display: none;
  }
`;