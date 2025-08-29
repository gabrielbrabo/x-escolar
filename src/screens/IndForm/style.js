import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    height: auto;
    width: 100%;
    background-color: #f4f4f9;
    padding: 20px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 0; /* A largura será 100% da tela em dispositivos muito pequenos */
    }
`;

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

export const IndividualStudentSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  word-break: break-word;
  overflow-wrap: break-word;

  h2 {
    margin-bottom: 0px;
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
    background: transparent;
    box-shadow: none;
    padding: 0;
    margin-top: 0;
    
    h2, h3, span {
      font-size: 12pt;
    }
  }
`;

export const IndividualPrintStyle = styled.div`
  @media print {
    body * {
      visibility: hidden;
    }

    #print-area, #print-area * {
      visibility: visible;
    }

    #print-area {
      //position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 0;
    }

    .no-print {
      display: none !important;
    }

    .logo-individualForm {
        width: 120px;
        height: 120px;
    }

    @page {
      size: A4;
      margin: 3mm;
    }
  }
`;

export const CtnrBtt = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
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

/*export const ContLogo = styled.div`
  position: relative;
  display: flex;
  justify-content: center; 
  //width: 100%;
  //padding-bottom: 60px;

  @media (max-width: 600px) {
    padding-bottom: 0px;
    //flex-direction: column;
    align-items: center;
  }

`;

export const Preview = styled.img`
  position: absolute;
  left: 0;
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-left: 20px;

  @media (max-width: 600px) {
    //position: static;
    position: relative;
    width: 80px;
    height: 80px;
    margin: 10px;
    //display: block;
  }
  
`;*/

export const ContLogo = styled.div`
  display: flex;
  align-items: center;     /* alinha verticalmente */
  justify-content: center; /* centraliza o h2 */
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 20px;

  h2 {
    flex: 1;
    text-align: center;    /* garante centralização */
  }

  @media (max-width: 600px) {
    //flex-direction: column;
    h2 {
      //margin-top: 10px;
    }
  }
`;

export const Preview = styled.img`
  position: absolute;  /* tira o absolute */
  left: 0;
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-left: 20px;
  margin-top: 15px;

  @media (max-width: 600px) {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 10px;
    margin-left: 0px;
    margin-bottom: 0px;
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

export const ContainerSpan = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    margin-top: 90px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        margin-top: 0px;
    }

    /* Remova a linha abaixo para que o conteúdo apareça na impressão */
    /* @media print {
        display: none;
    } */
`;














export const RecordContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: 15px;
        width: 90%;
    }
`;

export const RecordHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    
`;

export const RecordTitle = styled.h2`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;

    
`;

export const RecordDescription = styled.div`
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    text-align: justify;
    margin-top: 20px;
    width: 100%;

    p {
        margin: 8px 0;
        text-indent: 1.25cm;
        line-height: 1.5;
        color: black;
    }

`;





export const Span = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    padding: 3px;
    align-items: flex-start;
    gap: 15px;

    div {
        height: 8px;
        display: flex;
        align-items: center;
        font-weight: bold;
    }

    p {
        margin-left: 5px;
        color: #158fa2;
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

    @media print {
        font-size: 14px;
        color: black;
        p {
            font-weight: normal;
            font-weight: bold;
        }
    }
`;
export const BoxButton = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    padding-top: 15px;

    
`;

export const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 345px)  {
      font-size: 12px; /* Smartphones pequenos */
    }
    @media (min-width: 345px) and (max-width: 481px) {
      font-size: 11pt; /* Smartphones pequenos */
    }

    @media print {
        display: none;
    }
`;

export const ButtonEdit = styled(Button)`
    margin: 0;
`;

export const ToGoBack = styled.div`
    margin-top: 70px;
    text-align: center;
    cursor: pointer;
    color: #007bff;

    &:hover {
        color: #0056b3;
    }

    @media print {
        display: none;
    }
`;

export const SignMessageButtonText = styled.span`
    font-size: 14px;
    font-weight: 400;

    @media print {
        display: none;
    }
`;

export const SignMessageButtonTextBold = styled.span`
    font-size: 14px;
    font-weight: 600;

    @media print {
        display: none;
    }
`;

export const Input = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    gap: 20px;

    @media (max-width: 768px) {
        padding: 0;
        gap: 5px;
    }

    @media print {
        display: none;
    }
`;

export const StyledQuillContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;

    .ql-container {
        border-radius: 4px;
    }
    .ql-editor {
        min-height: 200px;
        font-size: 16px;
        line-height: 1.6;
    }
    .ql-toolbar {
        border-radius: 4px 4px 0 0;
    }

    @media (max-width: 768px) {
        .ql-editor {
            min-height: 150px;
            font-size: 14px;
        }
    }

    @media print {
        display: none;
    }
`;

export const EditContainer = styled(RecordContainer)`
    @media (max-width: 768px) {
        width: 100%;
    }

    @media print {
        display: none;
    }
`;

export const PrintButton = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    margin-left: auto;

    &:hover {
        background-color: #218838;
    }

    @media print {
        display: none;
    }
`;