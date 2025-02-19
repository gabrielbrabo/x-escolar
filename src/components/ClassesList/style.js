import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 13px;
  box-sizing: border-box;

  @media print {
    padding: 0;
    margin: 0;
  }
`;
export const DataBimonthly = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

export const ContainerDivs = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 15px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media print {
    box-shadow: none;
    padding: 0;
  }
`;

export const CtnrBtt = styled.div`
 display: flex;
 justify-content: end;
  width: 100%;
`;

export const StudentSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  h2 {
    margin-bottom: 10px;
    color: #333;
    //font-size: 12pt; /* Formato ABNT */
  }

  @media print {
    h2 {
      font-size: 12pt;
    }
  }
`;

export const Table = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  @media (max-width: 768px) {
    display: block;
  }

  @media print {
    margin-top: 10px;
    display: table;
  }
`;

export const ContainerTable = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #f0f0f0;
  width: 100%;
  max-width: 100%;

  @media print {
    border-bottom: none;
  }
`;

export const TableRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

export const Span = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 10pt; /* Formato ABNT */
  justify-content: flex-start;
  align-items: flex-start;

  div {
    display: flex;
    align-items: center;
    height: 13px;
  }

  p {
    margin-left: 5px;
    font-weight: bold;
  }

  @media (max-width: 345px)  {
      font-size: 9px; /* Smartphones pequenos */
    }
    @media (min-width: 345px) and (max-width: 481px) {
      font-size: 8pt; /* Smartphones pequenos */
    }

    @media (min-width: 481px) and (max-width: 768px) {
      font-size: 9pt; /* Tablets */
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
      font-size: 11px; /* Smartphones pequenos */
    }
    @media (min-width: 345px) and (max-width: 481px) {
      font-size: 9pt; /* Smartphones pequenos */
    }

    @media (min-width: 481px) and (max-width: 768px) {
      font-size: 10pt; /* Tablets */
    }

  @media print {
    font-size: 12pt;
  }
`;

export const DescriptionCell = styled.div`
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: left;
  flex: 3;
  position: relative;

  .description {
    transition: height 0.3s ease;

    &.collapsed {
      height: 10px;
    }

    &.expanded {
      height: auto;
    }

    @media (max-width: 345px)  {
      font-size: 13px; /* Smartphones pequenos */
    }

    @media print {
      height: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-size: 12pt; /* Formato ABNT */
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px 0;
  }

  > div:last-child {
    margin-top: 10px;
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
export const Button02 = styled.button`
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

export const Register = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media print {
    display: none;
  }
`;

export const ButtonReg = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 20px;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px 15px;
    font-size: 13px;
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

export const PrintStyleClasses = styled.div`
  @media print {
    body * {
      margin: 0;
      padding: 0;
    }

    .no-print {
      display: none;
    }

    ${ContainerTable} {
      //overflow-x: hidden; /* Permite rolagem horizontal */
      page-break-inside: avoid;
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
      line-height: 1.5; /* Espaçamento ABNT */
    }
  }
`;

export const HiddenOnPrint = styled.div`
  display: block;

  @media print {
    display: none;
  }
`;

export const ExpandedDescription = styled.div`
  @media print {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 12pt; /* Formato ABNT */
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

export const EditContainer = styled.div`
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    h3 {
        margin: 0;
        margin-bottom: 10px;
        color: #333;
    }

    input,
    textarea {
        width: 100%;
        margin-bottom: 10px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 14px;
        box-sizing: border-box;
    }

    textarea {
        resize: vertical;
        height: 250px;
    }

    button {
        align-self: flex-start;
        margin-right: 10px;
    }

    @media (max-width: 768px) {
        padding: 10px;

        h3 {
            font-size: 18px;
        }

        button {
            width: 100%;
            margin-bottom: 5px;
        }
    }

    @media print {
        display: none; // Oculta na impressão
    }
`;

