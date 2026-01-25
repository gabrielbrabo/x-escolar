import styled from 'styled-components'

import { createGlobalStyle } from 'styled-components';

/* =======================
   CONTAINER GERAL
======================= */
export const Container = styled.div`
  padding: 20px;
  background: #fff;
  color: #000;

  max-width: 70%;
  //overflow-x: hidden; /* 🔑 trava qualquer vazamento */

  @media (max-width: 768px) {
    max-width: 95%;
    padding: 5px;
  }
`
export const ContainerHistory = styled.div`
  
`

/* =======================
   HEADER
======================= */
export const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`

export const StudentInfo = styled.div`
  margin-bottom: 16px;
  font-size: 15px;

  .strongAluno{
    font-weight: 700;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`

/* =======================
   BLOCO DA ESCOLA
======================= */
export const SchoolBlock = styled.div`
  border: 2px solid #000;
  padding: 10px;
  margin-bottom: 24px;
  border-radius: 4px;
  box-sizing: border-box;

  max-width: 100%;
  overflow: hidden; /* 🔑 impede tabela estourar o bloco */
`

export const SchoolName = styled.h3`
  margin: 0;
  font-size: 15px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`

export const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap; /* 🔑 quebra corretamente no mobile */
  gap: 12px;
  margin-bottom: 6px;
  font-size: 13px;

  p {
    margin: 0;
    white-space: nowrap;
  }
`

/* =======================
   SCROLL DA TABELA
======================= */
export const TableScroll = styled.div`
  width: 100%;
  max-width: 100vw;

  overflow-x: auto;
  overflow-y: hidden;

  -webkit-overflow-scrolling: touch;
  position: relative;

  /* desktop */
  .action-bar {
    display: grid;
    justify-content: flex-end;
    gap: 10px;
    height: 0px;
  }

  /* mobile */
  @media (max-width: 768px) {
    .action-bar {
      gap: 5px;
      min-height: 80px;
    }
  }
`

/* =======================
   TABELA
======================= */
export const Table = styled.table`
  border-collapse: collapse;

  /* 🔑 ESSENCIAL PARA NÃO QUEBRAR NO MOBILE */
  width: max-content;
  min-width: 100%;

  th,
  td {
    border: 1px solid #000;
    padding: 6px;
    text-align: center;
    font-size: 14px;
    white-space: nowrap;
  }

  th {
    font-weight: bold;
  }

  td:first-child {
    font-weight: bold;
    text-align: left;
  }

  @media (max-width: 480px) {
    th,
    td {
      font-size: 11px;
      padding: 4px;
    }
  }
`

/* =======================
   MODAL
======================= */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 12px;
  z-index: 999;
`

export const ModalContainer = styled.div`
  background: #fff;
  width: 650px;
  max-width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ModalTitle = styled.h3`
  margin: 0;
  text-align: center;
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ExtraSubjectRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 70px 40px;
  gap: 8px;
`

export const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
`

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
`

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
`

export const AddButton = styled.button`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px dashed #1976d2;
  background: #e3f2fd;
  color: #1976d2;
  cursor: pointer;
`

export const RemoveButton = styled.button`
  border-radius: 6px;
  border: 1px solid #f44336;
  background: #ffebee;
  color: #f44336;
  cursor: pointer;
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`

export const CancelButton = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #999;
  background: #f5f5f5;
  cursor: pointer;
`

export const SaveButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: #1976d2;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`

export const ActionButton = styled.button`
  height: 25px;
  padding: 6px 12px;
  cursor: pointer;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;

  /* DESKTOP */
  position: relative;

  /* MOBILE */
  @media (max-width: 768px) {
    position: relative;
    right: 12px;
    //bottom: 12px;
    //z-index: 1000;
    height: 25px;
    //padding: 10px 14px;
    font-size: 12px;
  }
`

/* =======================
   MODAL EXCLUSIVO HISTÓRICO
======================= */

export const HistoryModalContainer = styled.div`
  background: #fff;
  width: 650px;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;

  max-height: calc(100vh - 80px);
`;

export const HistoryForm = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const HistoryFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #eee;

  display: flex;
  justify-content: flex-end;
  gap: 12px;

  background: #fff;
`;

/* ================================
   OVERLAY COM BLUR (EDIÇÃO)
================================ */
export const EditOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`

/* ================================
   MODAL
================================ */
export const EditModal = styled.div`
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  background: #fff;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 12px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 96%;
    padding: 16px;
  }
`

/* ================================
   TÍTULO
================================ */
export const EditTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1565c0;
  margin-bottom: 16px;
`

/* ================================
   FORMULÁRIO
================================ */
export const EditForm = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden; /* 🔑 ESSENCIAL */
`

/* ================================
   SEÇÃO
================================ */
export const EditSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  h4 {
    grid-column: 1 / -1;
    margin-top: 20px;
    color: #1565c0;
    font-size: 15px;
  }
`

/* ================================
   LINHA
================================ */
export const EditRow = styled.div`
  display: block;
  width: 100%;
`

/* ================================
   LABEL
================================ */
export const EditLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
  display: block;
`

/* ================================
   INPUT
================================ */
const baseField = `
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
`

export const EditInput = styled.input`
  ${baseField}
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
`

export const SelectEdit = styled.select`
  ${baseField}
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
`
/* ================================
   SELECT
================================ */
export const EditSelect = styled.select`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #cfcfcf;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #1565c0;
    box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.15);
  }
`

/* ================================
   FOOTER
================================ */
export const EditFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #eee;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

/* ================================
   BOTÕES
================================ */
export const EditCancelButton = styled.button`
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  background: #9e9e9e;
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #757575;
  }
`

export const EditSaveButton = styled.button`
  background: #1565c0;
  color: #fff;
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #0d47a1;
  }
`
export const EditSubjects = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const EditSubjectRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 12px;
  align-items: center;
`

export const EditSubjectName = styled.span`
  font-size: 14px;
  font-weight: 500;
`

export const NewHistoryOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const NewHistoryModal = styled.div`
  background: #fff;
  width: 100%;
  max-width: 760px;
  max-height: 90vh;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const NewHistoryTitle = styled.h2`
  padding: 20px;
  margin: 0;
  text-align: center;
  border-bottom: 1px solid #eee;
`;

export const NewHistoryForm = styled.div`
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const NewHistorySection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 14px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionTitle = styled.h4`
  grid-column: 1 / -1;
  margin: 0;
  color: #1565c0;
`;

export const NewHistoryRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NewHistoryLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
`;

export const NewHistoryInput = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const NewHistorySelect = styled.select`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const SubjectRow = styled.div`
  //grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 12px;
`;

export const SubjectName = styled.span`
  font-weight: 500;
`;

export const SubjectInput = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const NewHistoryFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

/* ============================
   CONTAINER PRINCIPAL
============================ */
export const CertificateContainer = styled.div`
  //width: 100%;

  border: 2px solid #000;
  padding: 20px;

  font-size: 13px;
  box-sizing: border-box;
  background: #fff;

  @media (max-width: 600px) {
    border: none;
    padding: 12px;
    font-size: 12px;
    margin: 0;
    padding: 0px;
  }
`

/* ============================
   HEADER
============================ */
export const CertificateHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

export const Brasao = styled.div`
  //width: 48px;
  //height: 48px;
  border: 1px solid #000;

  @media (max-width: 600px) {
    margin: 0 auto;
  }
`

export const HeaderCenter = styled.div`
  text-align: center;
  font-size: 12px;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`

export const Line = styled.div`
  border-bottom: 1px solid #000;
  margin: 2px 0;
  font-size: 12px;
  word-break: break-word;
`

/* ============================
   TÍTULO
============================ */
export const CertificateTitle = styled.h3`
  text-align: center;
  margin: 16px 0;
  font-size: 16px;
  letter-spacing: 1px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`

/* ============================
   TEXTO PRINCIPAL
============================ */
export const CertificateText = styled.p`
  text-align: justify;
  line-height: 1.6;
  margin: 12px 0;

  word-break: break-word;
  overflow-wrap: break-word;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`

/* ============================
   CAMPOS PREENCHÍVEIS
============================ */
export const Field = styled.span`
  display: inline-block;
  padding: 0 6px;

  min-width: 60px;
  max-width: 100%;

  border-bottom: 1px solid #000;
  text-align: center;

  word-break: break-word;
  overflow-wrap: break-word;
`

/* ============================
   FOOTER
============================ */
export const CertificateFooter = styled.div`
  margin-top: 16px;
  border-top: 1px solid #000;
  padding-top: 8px;
  font-size: 12px;

  display: flex;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 11px;
  }
`

/* ============================
   ASSINATURAS
============================ */
/*export const SignatureBlock = styled.div`
  text-align: center;
  min-width: 160px;
`

export const SignatureLine = styled.div`
  border-top: 1px solid #000;
  margin-top: 40px;
  padding-top: 4px;
  font-size: 11px;
`*/

export const CertificateOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);

    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 9999;
`;

export const CertificateModal = styled.div`
    background: #fff;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;

    padding: 24px;
    border-radius: 10px;
    overflow-y: auto;

    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
`;

export const SignatureSection = styled.div`
  margin-top: 30px;
  width: 100%;
  page-break-inside: avoid;
`
export const SignatureSectionCert = styled.div`
  display: none;
  margin-top: 30px;
  width: 100%;
  page-break-inside: avoid;
`

export const SignatureRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`

export const SignatureBlock = styled.div`
  flex: 1;
  text-align: center;
`

export const SignatureLine = styled.div`
  border-bottom: 1px solid #000;
  margin-bottom: 6px;
  height: 20px;
`

export const SignatureLabel = styled.span`
  font-size: 9px;
`

export const DateRow = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
  font-size: 9px;
  text-align: right;
`
export const Preview = styled.img`
  //position: absolute;
  //left: 0;
  width: 90px;
  height: 90px;
  object-fit: contain;
  margin: 5px;

  @media (max-width: 600px) {
    //position: static;
    width: 80px;
    height: 80px;
    margin: 5px;
    //display: block;
  }
  
`;


export const GlobalPrintStyle = createGlobalStyle`
  @media print {

    /* ================= CONFIGURAÇÃO DA FOLHA ================= */
    @page {
      size: A4 portrait;
      margin: 5mm;
      //margin-top: 0;
      padding-top: 0;
    }

    /* ================= RESET ABSOLUTO ================= */
    body {
    }

    body * {
      visibility: hidden;
      //margin: 0 !important;
      //padding: 0 !important;
    }
    ${StudentInfo} {
      padding-left: 10px;
      margin-bottom: 10px;
    }
    ${CertificateContainer} {
      //border: none;
      height: 100vh;
      //margin-top: 0px;
    }
    ${Header} {
      margin-bottom: 5px;
    }
    ${TableScroll} {
      margin-bottom: 0px;
    }
    ${SchoolBlock} {
      margin-bottom: 5px;
      padding-top: 5px;
      padding-bottom: 10px;
    }
    ${Container} {
      //position: absolute;
      padding: 0;
      margin: 0;
      height: 100% !important;
      width: 100% !important;
      max-width: none !important;
    }

    /* ================= ELEMENTOS DE UI (NUNCA IMPRIMIR) ================= */
    button,
    .action-bar,
    .no-print,
    hr {
      display: none !important;
      margin: 0;
      padding: 0;
    }

    /* =====================================================
       HISTÓRICO APENAS
    ===================================================== */
    body.print-history-only .print-certificate {
      display: none !important;
    }

    body.print-history-only .print-history,
    body.print-history-only .print-signature,
    body.print-history-only .print-history * {
      visibility: visible;
    }

    body.print-history-only .print-history {
      position: absolute;
      inset: 0;
      margin-top: 5px;
    }

    /* =====================================================
       CERTIFICADO + HISTÓRICO (MESMA FOLHA)
    ===================================================== */
    
    body.print-full .print-history {
      display: none !important;
    }

    body.print-full .print-signature {
      display: block;
    }
    
    body.print-full .print-certificate,
    //body.print-full .print-history,
    body.print-full .print-certificate *
     {
      visibility: visible;
    }

    body.print-full .print-certificate,
    body.print-full .print-history {
      //width: 100%;
    }

    /* ================= REDUÇÃO GLOBAL ================= */
    .print-certificate,
    .print-history {
      //font-size: 5px !important;
      //line-height: 1.2 !important;
    }

    /* ================= TÍTULOS ================= */
    h1, h2 {
      font-size: 20px !important;
      margin-top: 0px !important;
      margin-bottom: 0px !important;
      text-align: center;
    }

    h3, h4 {
      font-size: 20px !important;
      margin-bottom: 0px !important;
    }

    /* ================= TEXTOS ================= */
    ${StudentInfo} {
      .strongAluno{
        font-size: 18px;
        font-weight: 700;
      }
    }
    p, span, strong, label {
      color: #000;
      font-size: 15px !important;
      line-height: 1.2 !important;
    }

    /* ================= TABELAS ================= */
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      color: #000;
      font-weight: 500;
      font-size: 14px !important;
      padding: 0px 0px !important;
      line-height: 0 !important;
    }
    /* ================= HISTÓRICO ================= */
    .history-block,
    .school-block {
      break-inside: avoid;
      page-break-inside: avoid;
      margin-bottom: 4px !important;
    }

    /* ================= CERTIFICADO ================= */
    .certificate-header {

    }
    .certificate-footer {
      margin-top: 3px !important;
      padding: 0;
      align-items: center;
      border: none;
    }

    .certificate-title {
      font-size: 18px !important;
    
    }

    /* ================= OBSERVAÇÕES ================= */
    .observations {
      margin-top: 4px !important;
      font-size: 8px !important;
    }

    .observations div {
      height: 10px;
      border-bottom: 1px solid #000;
    }

    /* =====================================================
   CORREÇÃO TOTAL DO CERTIFICADO (SEM ESPAÇOS)
===================================================== */
body.print-full .print-certificate {
 position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;

  //margin-top: 0 !important;
  //padding: 0 !important;
}

body.print-full .print-history {
  //position: relative !important;
  width: 100% !important;
  max-width: none !important;
  padding: 0 !important;
  left: 0 !important;
}


/* REMOVE QUALQUER ESPAÇO INTERNO DO CERTIFICADO */
body.print-full .print-certificate * {
  //margin-top: 0 !important;
  //padding-top: 0 !important;
}

/* CABEÇALHO DO CERTIFICADO */
body.print-full .certificate-header {
  //margin: 0 !important;
  //padding: 0 !important;
  //display: flex;
  //align-items: flex-start !important;
}

/* CENTRALIZA SEM GERAR ESPAÇO */
body.print-full .certificate-header > div {
  margin: 5px 0 !important;
  padding: 0 !important;
}

/* TÍTULO DO CERTIFICADO */
body.print-full .certificate-title {
  margin: 20px 0 !important;
  padding: 0 !important;
}

/* TEXTO */
body.print-full .certificate-text {
  margin: 0 !important;
  padding: 10px !important;
  line-height: 2 !important;
}

/* FOOTER */
body.print-full .certificate-footer {
  margin-top: 4px !important;
  padding-bottom: 200px !important;
  padding: 10 !important;
}

  }
`;
