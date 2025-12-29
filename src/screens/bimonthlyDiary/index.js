import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IndexDaily, updateRecordClassTaught, FormEdit, fetchLogo } from "../../Api";
import LoadingSpinner from "../../components/Loading";
import {
  Container,
  AttendanceContainer,
  ContInfo,
  CtnrBtt,
  Button,
  ContTable,
  Table,
  TableHeader,
  TableBody,
  ToGoBack,
  SignMessageButtonText,
  SignMessageButtonTextBold,
  Butons,
  ButtonPrint,
  UpperButons,
  Btt02,
  ButtonGroup,
  BottomButons,
  LessonsContainer,
  ContainerTable,
  Span,
  TableRow,
  DateCell,
  DescriptionCell,
  InfoText,
  HiddenOnPrint,
  StudentSection,
  PrintStyleLessons,
  EditContainer,
  ErrorMessage,
  ButtonEdit,
  AssessmentsContainer,
  GradesTableContainer,
  GradesTable,
  GradesTableHeader,
  GradesTableBody,
  LegendBox,
  ConceptsTableContainer,
  ConceptsTable,
  ConceptsTableHeader,
  ConceptsTableBody,
  IndividualContainerDivs,
  IndividualPrintStyle,
  IndividualStudentSection,
  IndividualContainerTable,
  IndividualTableRow,
  IndividualDescriptionCell,
  ContLogo,
  Preview,
  HeaderWrapper
  //ToggleButton,
} from "./style";

import ReactQuill from 'react-quill';

export default function Daily() {
  const { idClass, idBimonthly, bimonthly } = useParams();
  const [data, setData] = useState(null);
  const [activeComponent, setActiveComponent] = useState(() => {
    return sessionStorage.getItem('activeComponent') || 'attendanceList';
  });
  const [assessmentFormat, setassessmentFormat] = useState('');
  //const [selectedTab, setSelectedTab] = useState("attendance"); // "attendance", "lessons", "grades"...

  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const [expandedRows, setExpandedRows] = useState([]);
  const [printing, /*setPrinting*/] = useState(false);

  //const [recordClassTaught, setRecordClassTaught] = useState([]);
  const [positionAtSchool, setPositionAtSchool] = useState(null);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [expandedSections, setExpandedSections] = useState({
    regent: false,
    edfisica: false,
  });

  const [expandedAssessments, setExpandedAssessments] = useState([]);

  const [selectedStudentGrades, setSelectedStudentGrades] = useState(null);

  const [selectedStudentConcept, setSelectedStudentConcept] = useState(null);

  const [logoUrl, setLogoUrl] = useState('');

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      setLoading(true);
      const idSchool = JSON.parse(sessionStorage.getItem("id-school"));
      const position = localStorage.getItem('position_at_school');
      setPositionAtSchool(position);
      const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
      setassessmentFormat($assessmentFormat)

      const cachedLogo = localStorage.getItem(`school-logo-${idSchool}`);
      //const cachedLogoId = localStorage.getItem(`school-logo-id-${idSchool}`);

      if (cachedLogo) {
        console.log('busca pelo storage local')
        setLogoUrl(cachedLogo);
        //setlogoId(cachedLogoId);
      } else {

        console.log('busca no s3')
        const logoRes = await fetchLogo(idSchool);

        console.log('busca logo', logoRes)
        if (logoRes?.url) {
          setLogoUrl(logoRes.url);
          //setlogoId(logoRes._id);
          localStorage.setItem(`school-logo-${idSchool}`, logoRes.url);
          localStorage.setItem(`school-logo-id-${idSchool}`, logoRes._id);

        }
      }

      if (bimonthly === "1º BIMESTRE") {
        const res = await IndexDaily({
          idClass,
          id_iStQuarter: idBimonthly
        });
        setData(res.data.dailies[0]);
        setLoading(false);
      }
      if (bimonthly === "2º BIMESTRE") {
        const res = await IndexDaily({
          idClass,
          id_iiNdQuarter: idBimonthly
        });
        setData(res.data.dailies[0]);
        setLoading(false);
      }
      if (bimonthly === "3º BIMESTRE") {
        const res = await IndexDaily({
          idClass,
          id_iiiRdQuarter: idBimonthly
        });
        setData(res.data.dailies[0]);
        setLoading(false);
      }
      if (bimonthly === "4º BIMESTRE") {
        const res = await IndexDaily({
          idClass,
          id_ivThQuarter: idBimonthly
        });
        setData(res.data.dailies[0]);
        setLoading(false);
      }

    })();
  }, [bimonthly, idClass, idBimonthly]);
  console.log("data", data)
  function handleRowClick(studentId) {
    if (selectedStudentId === studentId) {
      setSelectedStudentId(null); // desmarca se clicar na mesma linha
    } else {
      setSelectedStudentId(studentId); // seleciona nova linha
    }
  }

  const normalizeString = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, "").toUpperCase();

  const formatDisplayDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  };

  const uniqueDates = data
    ? [...new Set(data.attendance.map((att) => formatDisplayDate(att.date)))].sort((a, b) => {
      const [d1, m1] = a.split("/").map(Number);
      const [d2, m2] = b.split("/").map(Number);
      return m1 === m2 ? d1 - d2 : m1 - m2;
    })
    : [];

  const getAttendanceStatus = (studentId, date) => {
    const match = data.attendance.find(
      (a) => a.id_student === studentId && formatDisplayDate(a.date) === date
    );
    if (!match) return <td className="status-cell">-</td>;
    return (
      <td
        className={`status-cell ${match.status === "P"
          ? "presence"
          : match.status === "FJ"
            ? "justifiedAbsence"
            : "absence"
          }`}
      >
        {match.status}
      </td>
    );
  };

  const calculateTotals = (studentId) => {
    const filtered = data.attendance.filter((a) => a.id_student === studentId);
    return {
      totalPresence: filtered.filter((a) => a.status === "P").length,
      totalAbsence: filtered.filter((a) => a.status === "F").length,
      totalJustified: filtered.filter((a) => a.status === "FJ").length
    };
  };

  // 🔹 Datas únicas (Ed. Física)
  const uniqueDatesPhysical = data?.attendancePhysicalEducationTeacher
    ? [...new Set(data.attendancePhysicalEducationTeacher.map((att) => formatDisplayDate(att.date)))]
      .sort((a, b) => {
        const [d1, m1] = a.split("/").map(Number);
        const [d2, m2] = b.split("/").map(Number);
        return m1 === m2 ? d1 - d2 : m1 - m2;
      })
    : [];

  // 🔹 Status da chamada (Ed. Física)
  const getAttendanceStatusPhysical = (studentId, date) => {
    const match = data?.attendancePhysicalEducationTeacher?.find(
      (a) => a.id_student === studentId && formatDisplayDate(a.date) === date
    );
    if (!match) return <td className="status-cell">-</td>;
    return (
      <td
        className={`status-cell ${match.status === "P"
          ? "presence"
          : match.status === "FJ"
            ? "justifiedAbsence"
            : "absence"
          }`}
      >
        {match.status}
      </td>
    );
  };

  // 🔹 Totais (Ed. Física)
  const calculateTotalsPhysical = (studentId) => {
    const filtered = (data?.attendancePhysicalEducationTeacher || []).filter(
      (a) => a.id_student === studentId
    );
    return {
      totalPresence: filtered.filter((a) => a.status === "P").length,
      totalAbsence: filtered.filter((a) => a.status === "F").length,
      totalJustified: filtered.filter((a) => a.status === "FJ").length,
    };
  };

  const handleComponentChange = (component) => {
    if (activeComponent !== component) {
      sessionStorage.setItem('activeComponent', component);
      setActiveComponent(component); // Agora apenas atualiza o estado
    }
  };

  const toggleRowExpansion = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // função para alternar abertura
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getDescriptionPreview = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > 250 ? text.substring(0, 250) + '...' : text;
  };

  const isActive = (component) => activeComponent === component;

  const handlePrintAttendance = () => {
    const printContent = document.getElementById("printable-content-attendance");

    if (printContent) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
          <html>
            <head>
              <title>Impressão</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { 
                  text-align: center;
                  border: 1px solid #ddd;
                  font-size: 8px;
                  padding: 1px; 
                }
                  tr {
                    
                  }
                  .name-cell {
                      text-align: start;
                  }
                @page {
                  size: A4 landscape; /* Define o formato da página como paisagem */
                  margin: 0;
                }  
                ContTable {
                  overflow-x: hidden; /* Permite rolagem horizontal */
                  width: max-content; /* Garante que a tabela ocupe a largura do conteúdo */
                  margin-left: auto; /* Centraliza horizontalmente */
                  margin-right: auto; /* Centraliza horizontalmente */
                }
                  .printable-content-attendance {
                    visibility: visible; /* Exibe apenas o conteúdo dentro desta classe */
                    font-size: 15px;
                    //transform: scale(1); /* Ajusta a escala da tabela */
                  }
                .data {
                  display: flex;
                  gap:15px;
                }
                  .HeaderWrapper {
                    display: flex;
                    gap: 40px
                  }
                .info {
                  display: flex;
                  flex-direction: column;
                }
                  .info span {
                    
                    font-size: 15px;
                  }
                  .no-print {
                    display: none !important;
                  }
                     /* ✅ Classes de status */
                     td.presence { color: green; }
                    td.absence { color: red; }
                    td.justifiedAbsence { color: #6a0dad; }

                    th.total-presence { color: green; }
                    th.total-absence { color: red; }
                    th.total-justifiedAbsence { color: #6a0dad; }
              </style>
            </head>
            <body>
              ${printContent.innerHTML} 
            </body>
          </html>
        `);

      printWindow.document.close();

      // Força um pequeno delay antes de chamar print()
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  const handlePrintAttendancePhysicalEducation = () => {
    const printContent = document.getElementById("printable-content-attendancePhysicalEducation");

    if (printContent) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
          <html>
            <head>
              <title>Impressão</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { 
                  text-align: center;
                  border: 1px solid #ddd;
                  font-size: 8px;
                  padding: 1px; 
                }
                  tr {
                    
                  }
                  .name-cell {
                      text-align: start;
                  }
                @page {
                  size: A4 landscape; /* Define o formato da página como paisagem */
                  margin: 0;
                }  
                ContTable {
                  overflow-x: hidden; /* Permite rolagem horizontal */
                  width: max-content; /* Garante que a tabela ocupe a largura do conteúdo */
                  margin-left: auto; /* Centraliza horizontalmente */
                  margin-right: auto; /* Centraliza horizontalmente */
                }
                  .printable-content-attendance {
                    visibility: visible; /* Exibe apenas o conteúdo dentro desta classe */
                    font-size: 15px;
                    //transform: scale(1); /* Ajusta a escala da tabela */
                  }
                .data {
                  display: flex;
                  gap:15px;
                }
                  .HeaderWrapper {
                    display: flex;
                    gap: 40px
                  }
                .info {
                  display: flex;
                  flex-direction: column;
                }
                  .info span {
                    
                    font-size: 15px;
                  }
                  .no-print {
                    display: none !important;
                  }
                     /* ✅ Classes de status */
                     td.presence { color: green; }
                    td.absence { color: red; }
                    td.justifiedAbsence { color: #6a0dad; }

                    th.total-presence { color: green; }
                    th.total-absence { color: red; }
                    th.total-justifiedAbsence { color: #6a0dad; }
              </style>
            </head>
            <body>
              ${printContent.innerHTML} 
            </body>
          </html>
        `);

      printWindow.document.close();

      // Força um pequeno delay antes de chamar print()
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const handlePrintClasses = async () => {
    toggleSection('regent')
    setExpandedRows(data.id_recordClassTaught.map((_, index) => index));

    // Espera meio segundo para o React aplicar a expansão do DOM
    await sleep(500);

    const printContent = document.getElementById('print-area');
    if (!printContent) return;

    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;

    // Recarrega a página para restaurar estados e eventos React
    window.location.reload();
  };

  const handlePrintClassesEdFisica = async () => {
    toggleSection('edfisica')
    setExpandedRows(data.id_recordClassTaught.map((_, index) => index));

    // Espera meio segundo para o React aplicar a expansão do DOM
    await sleep(500);

    const printContent = document.getElementById('print-areaEdFisica');
    if (!printContent) return;

    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;

    // Recarrega a página para restaurar estados e eventos React
    window.location.reload();
  };

  const handlePrintIndividualForm = async () => {
    setExpandedRows(data.id_individualForm.map((_, index) => index));

    // Espera meio segundo para o React aplicar a expansão do DOM
    await sleep(500);

    const printContent = document.getElementById('print-area');
    if (!printContent) return;

    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;

    // Recarrega a página para restaurar estados e eventos React
    window.location.reload();
  };

  const handleEdit = async (index, res) => {
    setDay(`${res.day}`);
    setMonth(`${res.month}`);

    setEditingIndex(index);
    setEditingId(res._id);
    setEditedDescription(res.description);
  }

  const handleSaveEdit = async () => {
    try {
      const res = await updateRecordClassTaught(editedDescription, day, month, editingId);
      if (res.data) {
        alert('Aula atualizada com sucesso!');
        setLoading(true);
        setEditingIndex(null);
        setErrorMessage('');
        const updatedLessons = data.id_recordClassTaught.map((item) =>
          item._id === editingId
            ? { ...item, description: editedDescription, day, month }
            : item
        );

        // Atualiza `data` com nova lista de aulas
        setData((prev) => ({
          ...prev,
          id_recordClassTaught: updatedLessons
        }));
        setLoading(false);
      } else {
        setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error("Erro ao atualizar aula:", error);
      setErrorMessage('Ocorreu um erro ao salvar a edição. Tente novamente.');
    }
  };
  //if (loading || !data) return <LoadingSpinner />;

  function toggleAssessment(index) {
    setExpandedAssessments(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  }

  function groupGradesByMatter() {
    const grouped = {};

    if (!data?.studentGrade) return grouped;

    data.studentGrade.forEach((grade) => {
      const matter = grade.id_matter;
      const student = grade.id_student;

      if (!matter || !student) return;

      const matterId = matter._id;
      const studentId = student._id;

      const raw = grade.studentGrade;
      const gradeNumber = typeof raw === 'string'
        ? parseFloat(raw.replace(',', '.'))
        : Number(raw);

      const isHistorico = !grade.idActivity; // 🔑 REGRA PRINCIPAL

      if (!grouped[matterId]) {
        grouped[matterId] = {
          name: matter.name,
          students: {},
        };
      }

      if (!grouped[matterId].students[studentId]) {
        grouped[matterId].students[studentId] = {
          name: student.name,
          total: 0,
        };
      }

      if (isHistorico) {
        grouped[matterId].students[studentId].hasHistorico = true;
      }

      grouped[matterId].students[studentId].total += isNaN(gradeNumber) ? 0 : gradeNumber;
    });

    return grouped;
  }

  const groupedGrades = groupGradesByMatter();

  const handlePrintgrades = () => {
    const printContent = document.getElementById("printable-content");

    if (printContent) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Impressão</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { 
                text-align: center;
                border: 1px solid #ddd;
                font-size: 8px;
                padding: 1px; 
              }
                tr {
                  
                }
                .name-cell {
                    text-align: start;
                }
              @page {
                size: A4 landscape; /* Define o formato da página como paisagem */
                margin: 0;
              }  
              ContTable {
                overflow-x: hidden; /* Permite rolagem horizontal */
                width: max-content; /* Garante que a tabela ocupe a largura do conteúdo */
                margin-left: auto; /* Centraliza horizontalmente */
                margin-right: auto; /* Centraliza horizontalmente */
              }
                .printable-content {
                  visibility: visible; /* Exibe apenas o conteúdo dentro desta classe */
                  font-size: 15px;
                  //transform: scale(1); /* Ajusta a escala da tabela */
                }
              .data {
                display: flex;
                gap:15px;
              }
                .HeaderWrapper {
                    display: flex;
                    gap: 40px
                  }
              .info {
                display: flex;
                flex-direction: column;
              }
                /* ✅ NOVO: estilo para a legenda com borda */
            .legendBox {
              border: 1px solid black !important;
              padding-left: 10px;
              border-radius: 5px;
              margin-bottom: 10px;
              margin-top: 10px;
              background: white !important;
              color: black !important;
              box-shadow: none !important;
              max-width: 400px;
              height: 90px;
            }
              .legendBox h3 {
              margin: 0;
              text-align: center;
            }

            .legendBox p {
              margin: 5px 0;
            }
                .no-print {
                  display: none !important;
                }
                  /* ✅ As regras de cor que faltavam */
                .grade-red { color: red; }
                .grade-blue { color: blue; }
                .grade-green { color: #1d7f14; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML} 
          </body>
        </html>
      `);

      printWindow.document.close();

      // Força um pequeno delay antes de chamar print()
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  const handlePrintconcept = () => {
    const printContent = document.getElementById("printable-content-concepts");

    if (printContent) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
      <html>
        <head>
          <title>Impressão de Conceitos</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td {
              text-align: center;
              border: 1px solid #ddd;
              font-size: 8px;
              padding: 1px;
            }
            tr { }

            .name-cell {
              text-align: start;
            }

            @page {
              size: A4 landscape; /* Formato paisagem */
              margin: 0;
            }

            ConceptsTableContainer {
              overflow-x: hidden;
              width: max-content;
              margin-left: auto;
              margin-right: auto;
            }

            .printable-content-concepts {
              visibility: visible;
              font-size: 15px;
            }

            .data {
              display: flex;
              gap: 15px;
            }
            .HeaderWrapper {
                    display: flex;
                    gap: 40px
                  }
            .info {
              display: flex;
              flex-direction: column;
            }

            .no-print {
              display: none !important;
            }

            .legendBox {
              border: 1px solid black !important;
              padding-left: 10px;
              border-radius: 5px;
              margin-bottom: 10px;
              margin-top: 10px;
              background: white !important;
              color: black !important;
              box-shadow: none !important;
              max-width: 400px;
              height: 120px;
            }
              .legendBox h3 {
              margin: 0;
              text-align: center;
            }

            .legendBox p {
              margin: 5px 0;
            }
            .concept-green { color: #1d7f14; }
            .concept-blue { color: blue; }
            .concept-orange { color: orange; }
            .concept-red { color: red; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

      printWindow.document.close();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  const handleSaveEditIndForm = async () => {
    try {
      const res = await FormEdit({ update_idForm: editingId, editedDescription });

      if (res) {
        alert('Ficha atualizada com sucesso!');
        setLoading(true);

        setEditingIndex(null);

        setErrorMessage('');
        window.location.reload()
      } else {
        setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error("Erro ao atualizar aula:", error);
      setErrorMessage('Ocorreu um erro ao salvar a edição. Tente novamente.');
    }
  };

  //console.log("groupGradesByMatter", grouped)

  console.log("daily", data)
  console.log("logoUrl", logoUrl)

  return (
    <Container>
      {loading ?
        <LoadingSpinner />
        :
        <>
          {/* Botões de navegação no topo */}
          <Butons>

            <UpperButons>
              <Btt02
                className={isActive('attendanceList') ? 'active' : ''}
                onClick={() => handleComponentChange('attendanceList')}
              >
                Frequência
              </Btt02>
              <Btt02 className={isActive('classes') ? 'active' : ''}
                onClick={() => handleComponentChange('classes')}
              >
                Aulas Lecionadas
              </Btt02>
              {assessmentFormat !== 'grade' ? (
                <Btt02
                  className={isActive('concepts') ? 'active' : ''}
                  onClick={() => handleComponentChange('concepts')}
                >
                  Conceitos
                </Btt02>
              ) : (
                <ButtonGroup>
                  <Btt02 className={isActive('assessments') ? 'active' : ''}
                    onClick={() => handleComponentChange('assessments')}
                  >
                    Avaliações
                  </Btt02>
                  <Btt02
                    className={isActive('numericalGrades') ? 'active' : ''}
                    onClick={() => handleComponentChange('numericalGrades')}
                  >
                    Notas
                  </Btt02>
                </ButtonGroup>
              )}

            </UpperButons>

            {assessmentFormat !== "grade"
              &&
              <BottomButons>
                <Btt02
                  className={isActive('individualRecords') ? 'active' : ''}
                  onClick={() => handleComponentChange('individualRecords')}
                >
                  Fichas Individuais
                </Btt02>
                <Btt02
                  className={isActive('finalConcepts') ? 'active' : ''}
                  onClick={() => handleComponentChange('finalConcepts')}
                >
                  Conceitos Finais
                </Btt02>
              </BottomButons>
            }

          </Butons>

          {activeComponent === 'attendanceList' && (
            data?.attendance?.length > 0 ? (
              <>
                <AttendanceContainer id="printable-content-attendance" className="printable-content-attendance">
                  <HeaderWrapper className="HeaderWrapper">

                    {(logoUrl) && (
                      <Preview className="" src={logoUrl} alt="Logo da escola" />
                    )}

                    <ContInfo className="info">
                      <span><strong>Escola:</strong> {data.nameSchool}</span>
                      <span><strong>Turma:</strong> {data.nameClass}</span>
                      <span><strong>Ano:</strong> {data.year}</span>
                      <span><strong>Professor Regente Titular:</strong> {data.nameRegentTeacher}</span>
                      {data.nameRegentTeacher02 !== "Professor não definido" && (
                        <span><strong>Professor Regente Adjunto:</strong> {data.nameRegentTeacher02}</span>
                      )}
                      {/*data.namephysicalEducationTeacher !== "Professor não definido" && (
                        <span><strong>Professor de Ed. Física:</strong> {data.namephysicalEducationTeacher}</span>
                      )*/}
                    </ContInfo>
                  </HeaderWrapper>
                  <CtnrBtt>
                    <ButtonPrint className="no-print" onClick={handlePrintAttendance}>Imprimir</ButtonPrint>
                  </CtnrBtt>
                  <h2>Frequências do {bimonthly} (Professor Regente)</h2>
                  <ContTable>
                    <Table>
                      <TableHeader>
                        <tr>
                          <th className="name-cell">Nome do Aluno</th>
                          {uniqueDates.map((date, idx) => (
                            <th key={idx}>{date}</th>
                          ))}
                          <th className="total-presence">Total P</th>
                          <th className="total-absence">Total F</th>
                          <th className="total-justifiedAbsence">Total FJ</th>
                        </tr>
                      </TableHeader>
                      <TableBody>
                        {data.id_student
                          .sort((a, b) =>
                            normalizeString(a.name).localeCompare(normalizeString(b.name))
                          )
                          .map((student) => {
                            const totals = calculateTotals(student._id);
                            return (
                              <tr
                                key={student._id}
                                onClick={() => handleRowClick(student._id)}
                                className={selectedStudentId === student._id ? 'selected-row' : ''}
                              >
                                <td className="name-cell">{student.name}</td>
                                {uniqueDates.map((date) => getAttendanceStatus(student._id, date))}
                                <td className="total-presence">{totals.totalPresence}</td>
                                <td className="total-absence">{totals.totalAbsence}</td>
                                <td className="total-justifiedAbsence">{totals.totalJustified}</td>
                              </tr>
                            );
                          })}
                        {data.transferStudents && data.transferStudents.length > 0 && (
                          <>
                            <tr>
                              <td
                                colSpan={uniqueDates.length + 4}
                                style={{
                                  textAlign: "left",
                                  fontWeight: "bold",
                                  padding: "5px",
                                  background: "#f8d7da",
                                  color: "#721c24",
                                }}
                              >
                                ⚠️ Alunos Transferidos e Remanejados
                              </td>
                            </tr>
                            {data.transferStudents
                              .sort((a, b) =>
                                normalizeString(a.name).localeCompare(normalizeString(b.name))
                              )
                              .map((student) => {
                                const totals = calculateTotals(student._id);
                                return (
                                  <tr key={student._id}
                                    onClick={() => handleRowClick(student._id)}
                                    className={selectedStudentId === student._id ? 'selected-row' : ''}
                                  >
                                    <td className="name-cell">
                                      {student.name}{" "}
                                      {student.status === "ativo" && (
                                        <span style={{ color: "blue", fontWeight: "bold" }}>
                                          Remanejado
                                        </span>
                                      )}
                                      {student.status === "inativo" && (
                                        <span style={{ color: "blue", fontWeight: "bold" }}>
                                          Remanejado
                                        </span>
                                      )}
                                      {student.status === "transferido" && (
                                        <span style={{ color: "orange", fontWeight: "bold" }}>
                                          Transferido
                                        </span>
                                      )}
                                    </td>
                                    {uniqueDates.map((date) =>
                                      getAttendanceStatus(student._id, date)
                                    )}
                                    <td className="total-presence">{totals.totalPresence}</td>
                                    <td className="total-absence">{totals.totalAbsence}</td>
                                    <td className="total-justifiedAbsence">{totals.totalJustified}</td>
                                  </tr>
                                );
                              })}
                          </>
                        )}
                      </TableBody>
                    </Table>
                  </ContTable>
                </AttendanceContainer>
                <AttendanceContainer id="printable-content-attendancePhysicalEducation" className="printable-content-attendance">
                  <HeaderWrapper className="HeaderWrapper">

                    {(logoUrl) && (
                      <Preview className="" src={logoUrl} alt="Logo da escola" />
                    )}

                    <ContInfo className="info">
                      <span><strong>Escola:</strong> {data.nameSchool}</span>
                      <span><strong>Turma:</strong> {data.nameClass}</span>
                      <span><strong>Ano:</strong> {data.year}</span>
                      {/*<span><strong>Professor Regente:</strong> {data.nameRegentTeacher}</span>*/}
                      {/*data.nameRegentTeacher02 !== "Professor não definido" && (
                        <span><strong>Professor Regente 02:</strong> {data.nameRegentTeacher02}</span>
                      )*/}
                      {data.namephysicalEducationTeacher !== "Professor não definido" && (
                        <span><strong>Professor de Ed. Física:</strong> {data.namephysicalEducationTeacher}</span>
                      )}
                    </ContInfo>
                  </HeaderWrapper>
                  <CtnrBtt>
                    <ButtonPrint className="no-print" onClick={handlePrintAttendancePhysicalEducation}>Imprimir</ButtonPrint>
                  </CtnrBtt>
                  {/* Frequência do professor de Educação Física */}
                  <h2>Frequências do {bimonthly} (Professor de Educação Física)</h2>
                  <ContTable>
                    <Table>
                      <TableHeader>
                        <tr>
                          <th className="name-cell">Nome do Aluno</th>
                          {uniqueDatesPhysical.map((date, idx) => (
                            <th key={idx}>{date}</th>
                          ))}
                          <th className="total-presence">Total P</th>
                          <th className="total-absence">Total F</th>
                          <th className="total-justifiedAbsence">Total FJ</th>
                        </tr>
                      </TableHeader>
                      <TableBody>
                        {data.id_student
                          .sort((a, b) =>
                            normalizeString(a.name).localeCompare(normalizeString(b.name))
                          )
                          .map((student) => {
                            const totals = calculateTotalsPhysical(student._id);
                            return (
                              <tr
                                key={student._id}
                                onClick={() => handleRowClick(student._id)}
                                className={selectedStudentId === student._id ? 'selected-row' : ''}
                              >
                                <td className="name-cell">{student.name}</td>
                                {uniqueDatesPhysical.map((date) => getAttendanceStatusPhysical(student._id, date))}
                                <td className="total-presence">{totals.totalPresence}</td>
                                <td className="total-absence">{totals.totalAbsence}</td>
                                <td className="total-justifiedAbsence">{totals.totalJustified}</td>
                              </tr>
                            );
                          })}
                        {/* 🔹 Alunos transferidos/remanejados */}
                        {data.transferStudents && data.transferStudents.length > 0 && (
                          <>
                            <tr>
                              <td
                                colSpan={uniqueDatesPhysical.length + 4}
                                style={{
                                  textAlign: "left",
                                  fontWeight: "bold",
                                  padding: "5px",
                                  background: "#f8d7da",
                                  color: "#721c24",
                                }}
                              >
                                ⚠️ Alunos Transferidos e Remanejados (Ed. Física)
                              </td>
                            </tr>
                            {data.transferStudents
                              .sort((a, b) =>
                                normalizeString(a.name).localeCompare(normalizeString(b.name))
                              )
                              .map((student) => {
                                const totals = calculateTotalsPhysical(student._id);
                                return (
                                  <tr key={student._id}>
                                    <td className="name-cell">
                                      {student.name}{" "}
                                      {student.status === "ativo" && (
                                        <span style={{ color: "blue", fontWeight: "bold" }}>
                                          Remanejado
                                        </span>
                                      )}
                                      {student.status === "inativo" && (
                                        <span style={{ color: "blue", fontWeight: "bold" }}>
                                          Remanejado
                                        </span>
                                      )}
                                      {student.status === "transferido" && (
                                        <span style={{ color: "orange", fontWeight: "bold" }}>
                                          Transferido
                                        </span>
                                      )}
                                    </td>
                                    {uniqueDatesPhysical.map((date) =>
                                      getAttendanceStatusPhysical(student._id, date)
                                    )}
                                    <td className="total-presence">{totals.totalPresence}</td>
                                    <td className="total-absence">{totals.totalAbsence}</td>
                                    <td className="total-justifiedAbsence">{totals.totalJustified}</td>
                                  </tr>
                                );
                              })}
                          </>
                        )}
                      </TableBody>
                    </Table>
                  </ContTable>
                </AttendanceContainer>
              </>
            ) : (
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>Nenhum dado de frequência encontrado para o {bimonthly}.</h2>
                <p>Verifique se a turma teve aulas cadastradas com frequência registrada.</p>
              </div>
            )
          )}

          {activeComponent === 'classes' && (
            <>
              {/* 📘 AULAS DO PROFESSOR REGENTE (TITULAR / ADJUNTO) */}
              <StudentSection id='print-area'>

                <LessonsContainer>
                  <CtnrBtt>
                    <ButtonPrint className="no-print" onClick={handlePrintClasses}>Imprimir</ButtonPrint>
                  </CtnrBtt>
                  <ContLogo className="cont-logo-classes">
                    {logoUrl && <Preview className="logo-classes" src={logoUrl} alt="Logo da escola" />}
                    <h2>Registros de Aulas do {bimonthly} — Professor Regente</h2>
                  </ContLogo>

                  <ContInfo className="info">
                    <span><strong>Escola:</strong> {data.nameSchool}</span>
                  </ContInfo>

                  <h4 className="total-aulas-lecionadas">
                    Total de aulas lecionadas: {
                      data?.id_recordClassTaught?.filter(res =>
                        (Array.isArray(data.idRegentTeacher) &&
                          data.idRegentTeacher.some(id => id.toString() === res?.id_teacher?._id?.toString?.())) ||
                        (Array.isArray(data.idRegentTeacher02) &&
                          data.idRegentTeacher02.some(id => id.toString() === res?.id_teacher?._id?.toString?.()))
                      ).length || 0
                    }
                  </h4>
                  <>
                    {data?.id_recordClassTaught?.length > 0 ? (
                      data.id_recordClassTaught
                        .filter(res =>
                          (Array.isArray(data.idRegentTeacher) &&
                            data.idRegentTeacher.some(id => id.toString() === res?.id_teacher?._id?.toString?.())) ||
                          (Array.isArray(data.idRegentTeacher02) &&
                            data.idRegentTeacher02.some(id => id.toString() === res?.id_teacher?._id?.toString?.()))
                        )
                        .sort((a, b) => new Date(a.year, a.month - 1, a.day) - new Date(b.year, b.month - 1, b.day))
                        .slice(0, expandedSections.regent ? undefined : 3)
                        .map((res, index) => (
                          <React.Fragment key={`regent-${index}`}>
                            <ContainerTable className="print-container-table">
                              <Span>
                                {Array.isArray(data.idRegentTeacher) &&
                                  data.idRegentTeacher.map(id => id.toString()).includes(res?.id_teacher?._id?.toString?.()) ? (
                                  <>
                                    <div>Professor Titular: <p>{res.id_teacher.name}</p></div>
                                    {data.nameRegentTeacher02 &&
                                      data.nameRegentTeacher02 !== "Professor não definido" && (
                                        <div>Professor Adjunto: <p>{data.nameRegentTeacher02}</p></div>
                                      )}
                                  </>
                                ) : (
                                  <>
                                    {data.nameRegentTeacher &&
                                      data.nameRegentTeacher !== "Professor não definido" && (
                                        <div>Professor Titular: <p>{data.nameRegentTeacher}</p></div>
                                      )}
                                    <div>Professor Adjunto: <p>{res.id_teacher.name}</p></div>
                                  </>
                                )}

                                <div>Turma: <p>{data.nameClass}</p></div>
                              </Span>

                              <TableRow>
                                <DateCell>{`${res.day}/${res.month}/${res.year}`}</DateCell>
                                <DescriptionCell>
                                  <div className={`description ${expandedRows.includes(index) ? 'expanded' : 'collapsed'}`}>
                                    <div
                                      style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                                      dangerouslySetInnerHTML={{
                                        __html: expandedRows.includes(index) || printing
                                          ? res.description
                                          : getDescriptionPreview(res.description)
                                      }}
                                    />
                                  </div>

                                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {!printing && (
                                      <Button onClick={() => toggleRowExpansion(index)} className={HiddenOnPrint}>
                                        {expandedRows.includes(index) ? 'Ver Menos' : 'Ver Mais'}
                                      </Button>
                                    )}
                                    {expandedRows.includes(index) && positionAtSchool === 'DIRETOR/SUPERVISOR' && (
                                      <Button onClick={() => handleEdit(index, res)} className={HiddenOnPrint}>
                                        Editar
                                      </Button>
                                    )}
                                  </div>
                                </DescriptionCell>
                              </TableRow>
                              {editingIndex === index && (
                                <EditContainer>
                                  <div className="modal-content">
                                    <h3>Editando Aula</h3>
                                    <ReactQuill
                                      theme="snow"
                                      modules={{
                                        toolbar: [
                                          [{ 'font': [] }],
                                          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                          ['bold', 'italic', 'underline'],
                                          [{ 'color': [] }, { 'background': [] }],
                                          ['clean']
                                        ]
                                      }}
                                      value={editedDescription}
                                      onChange={(e) => setEditedDescription(e)}
                                      placeholder="Descrição da aula"
                                      style={{
                                        height: 'auto', // aumentado de 250px para 350px
                                        maxHeight: '550px',
                                        overflow: 'auto',
                                        zIndex: 0,
                                        position: 'relative'
                                      }}
                                    />
                                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                    <div style={{ position: 'relative', zIndex: 10, marginTop: '30px', }} className='BoxBtt'>
                                      <ButtonEdit onClick={handleSaveEdit}>Salvar</ButtonEdit>
                                      <ButtonEdit onClick={() => setEditingIndex(null)}>Cancelar</ButtonEdit>
                                    </div>
                                  </div>
                                </EditContainer>
                              )}
                            </ContainerTable>
                          </React.Fragment>
                        ))
                    ) : (
                      <InfoText>Nenhum registro de aulas encontrado para os professores regentes.</InfoText>
                    )}
                  </>
                  <h3
                    style={{ cursor: "pointer", textAlign: "center", marginBottom: "1rem" }}
                    onClick={() => toggleSection('regent')}
                    className="no-print"
                  >
                    {expandedSections.regent
                      ? "► Ver menos aulas"
                      : "▼ Ver todas as aulas"}
                  </h3>
                </LessonsContainer>
                <PrintStyleLessons />
              </StudentSection>

              {/* 🏃‍♂️ AULAS DO PROFESSOR DE EDUCAÇÃO FÍSICA */}
              <StudentSection id='print-areaEdFisica'>
                <LessonsContainer>
                  <CtnrBtt>
                    <ButtonPrint className="no-print" onClick={handlePrintClassesEdFisica}>Imprimir</ButtonPrint>
                  </CtnrBtt>
                  <ContLogo className="cont-logo-classes">
                    {logoUrl && <Preview className="logo-classes" src={logoUrl} alt="Logo da escola" />}
                    <h2>Registros de Aulas do {bimonthly} — Educação Física</h2>
                  </ContLogo>

                  <ContInfo className="info">
                    <span><strong>Escola:</strong> {data.nameSchool}</span>
                  </ContInfo>

                  <h4 className="total-aulas-lecionadas">
                    Total de aulas lecionadas: {
                      data?.id_recordClassTaught?.filter(res =>
                        Array.isArray(data.idPhysicalEducationTeacher) &&
                        data.idPhysicalEducationTeacher.some(id => id.toString() === res?.id_teacher?._id?.toString?.())
                      ).length || 0
                    }
                  </h4>
                  <>
                    {data?.id_recordClassTaught?.length > 0 ? (
                      data.id_recordClassTaught
                        .filter(res =>
                          Array.isArray(data.idPhysicalEducationTeacher) &&
                          data.idPhysicalEducationTeacher.some(id => id.toString() === res?.id_teacher?._id?.toString?.())
                        )
                        .sort((a, b) => new Date(a.year, a.month - 1, a.day) - new Date(b.year, b.month - 1, b.day))
                        .slice(0, expandedSections.edfisica ? undefined : 3)
                        .map((res, index) => (
                          <React.Fragment key={`pe-${index}`}>
                            <ContainerTable className="print-container-table">
                              <Span>
                                <div>Professor de Ed. Física: <p>{res.id_teacher.name}</p></div>
                                <div>Turma: <p>{data.nameClass}</p></div>
                              </Span>

                              <TableRow>
                                <DateCell>{`${res.day}/${res.month}/${res.year}`}</DateCell>
                                <DescriptionCell>
                                  <div className={`description ${expandedRows.includes(index) ? 'expanded' : 'collapsed'}`}>
                                    <div
                                      style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                                      dangerouslySetInnerHTML={{
                                        __html: expandedRows.includes(index) || printing
                                          ? res.description
                                          : getDescriptionPreview(res.description)
                                      }}
                                    />
                                  </div>

                                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {!printing && (
                                      <Button onClick={() => toggleRowExpansion(index)} className={HiddenOnPrint}>
                                        {expandedRows.includes(index) ? 'Ver Menos' : 'Ver Mais'}
                                      </Button>
                                    )}
                                    {expandedRows.includes(index) && positionAtSchool === 'DIRETOR/SUPERVISOR' && (
                                      <Button onClick={() => handleEdit(index, res)} className={HiddenOnPrint}>
                                        Editar
                                      </Button>
                                    )}
                                  </div>
                                </DescriptionCell>
                              </TableRow>
                              {editingIndex === index && (
                                <EditContainer>
                                  <div className="modal-content">
                                    <h3>Editando Aula</h3>
                                    <ReactQuill
                                      theme="snow"
                                      modules={{
                                        toolbar: [
                                          [{ 'font': [] }],
                                          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                          ['bold', 'italic', 'underline'],
                                          [{ 'color': [] }, { 'background': [] }],
                                          ['clean']
                                        ]
                                      }}
                                      value={editedDescription}
                                      onChange={(e) => setEditedDescription(e)}
                                      placeholder="Descrição da aula"
                                      style={{
                                        height: 'auto', // aumentado de 250px para 350px
                                        maxHeight: '550px',
                                        overflow: 'auto',
                                        zIndex: 0,
                                        position: 'relative'
                                      }}
                                    />
                                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                    <div style={{ position: 'relative', zIndex: 10, marginTop: '30px', }} className='BoxBtt'>
                                      <ButtonEdit onClick={handleSaveEdit}>Salvar</ButtonEdit>
                                      <ButtonEdit onClick={() => setEditingIndex(null)}>Cancelar</ButtonEdit>
                                    </div>
                                  </div>
                                </EditContainer>
                              )}
                            </ContainerTable>
                          </React.Fragment>
                        ))
                    ) : (
                      <InfoText>Nenhum registro de aulas encontrado para o professor de Educação Física.</InfoText>
                    )}
                  </>
                  <h3
                    className="no-print"
                    style={{ cursor: "pointer", textAlign: "center", marginBottom: "1rem" }}
                    onClick={() => toggleSection('edfisica')}
                  >
                    {expandedSections.edfisica
                      ? "► Ver menos aulas"
                      : "▼ Ver todas as aulas"}
                  </h3>
                </LessonsContainer>

                <PrintStyleLessons />
              </StudentSection>
            </>
            /*<>
              <StudentSection id='print-area' >
                <CtnrBtt>
                  <ButtonPrint className="no-print" onClick={handlePrintClasses}>Imprimir</ButtonPrint>
                </CtnrBtt>
                <LessonsContainer>
                  <ContLogo className="cont-logo-classes">
                    {(logoUrl) && (
                      <Preview className="logo-classes" src={logoUrl} alt="Logo da escola" />
                    )}
                    <h2>Registros de Aulas do {bimonthly}</h2>
                  </ContLogo>
                  <h4 className="total-aulas-lecionadas">
                    Total de aulas lecionadas: {data?.id_recordClassTaught?.length || 0}
                  </h4>

                  <ContInfo className="info">
                    <span><strong>Escola:</strong> {data.nameSchool}</span>
                  </ContInfo>

                  {data?.id_recordClassTaught?.length > 0 ? (
                    data.id_recordClassTaught
                      .sort((a, b) => new Date(a.year, a.month - 1, a.day) - new Date(b.year, b.month - 1, b.day))
                      .map((res, index) => (
                        <React.Fragment key={index}>
                          <ContainerTable className="print-container-table">
                            <Span>
                              {Array.isArray(data.idRegentTeacher) &&
                                data.idRegentTeacher.map(id => id.toString()).includes(res?.id_teacher?._id?.toString?.()) ? (
                                <>
                                  <div>Professor Titular: <p>{res.id_teacher.name}</p></div>
                                  {data.nameRegentTeacher02 &&
                                    data.nameRegentTeacher02 !== "Professor não definido" && (
                                      <div>Professor Adjunto: <p>{data.nameRegentTeacher02}</p></div>
                                    )}
                                </>
                              ) : Array.isArray(data.idRegentTeacher02) &&
                                data.idRegentTeacher02.map(id => id.toString()).includes(res?.id_teacher?._id?.toString?.()) ? (
                                <>
                                  {data.nameRegentTeacher &&
                                    data.nameRegentTeacher !== "Professor não definido" && (
                                      <div>Professor Titular: <p>{data.nameRegentTeacher}</p></div>
                                    )}
                                  <div>Professor Adjunto: <p>{res.id_teacher.name}</p></div>
                                </>
                              ) : Array.isArray(data.idPhysicalEducationTeacher) &&
                                data.idPhysicalEducationTeacher.map(id => id.toString()).includes(res?.id_teacher?._id?.toString?.()) ? (
                                <div>Professor de Ed. Física: <p>{res.id_teacher.name}</p></div>
                              ) : (
                                <div>Professor Titular: <p>{res.id_teacher?.name || "Não definido"}</p></div>
                              )}

                              <div>Turma: <p>{data.nameClass}</p></div>
                            </Span>
                            <TableRow>
                              <DateCell>{`${res.day}/${res.month}/${res.year}`}</DateCell>
                              <DescriptionCell>
                                <div className={`description ${expandedRows.includes(index) ? 'expanded' : 'collapsed'}`}>
                                  <div
                                    style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                                    dangerouslySetInnerHTML={{
                                      __html: expandedRows.includes(index) || printing
                                        ? res.description
                                        : getDescriptionPreview(res.description)
                                    }}
                                  />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                  {!printing && (
                                    <Button onClick={() => toggleRowExpansion(index)} className={HiddenOnPrint}>
                                      {expandedRows.includes(index) ? 'Ver Menos' : 'Ver Mais'}
                                    </Button>
                                  )}
                                  {expandedRows.includes(index) && positionAtSchool === 'DIRETOR/SUPERVISOR' && (
                                    <Button onClick={() => handleEdit(index, res)} className={HiddenOnPrint}>
                                      Editar
                                    </Button>
                                  )}
                                </div>
                              </DescriptionCell>
                            </TableRow>
                            {editingIndex === index && (
                              <EditContainer>
                                <div className="modal-content">
                                  <h3>Editando Aula</h3>
                                  <ReactQuill
                                    theme="snow"
                                    modules={{
                                      toolbar: [
                                        [{ 'font': [] }],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ['bold', 'italic', 'underline'],
                                        [{ 'color': [] }, { 'background': [] }],
                                        ['clean']
                                      ]
                                    }}
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e)}
                                    placeholder="Descrição da aula"
                                    style={{
                                      height: 'auto', // aumentado de 250px para 350px
                                      maxHeight: '550px',
                                      overflow: 'auto',
                                      zIndex: 0,
                                      position: 'relative'
                                    }}
                                  />
                                  {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                  <div style={{ position: 'relative', zIndex: 10, marginTop: '30px', }} className='BoxBtt'>
                                    <ButtonEdit onClick={handleSaveEdit}>Salvar</ButtonEdit>
                                    <ButtonEdit onClick={() => setEditingIndex(null)}>Cancelar</ButtonEdit>
                                  </div>
                                </div>
                              </EditContainer>
                            )}
                          </ContainerTable>
                        </React.Fragment>
                      ))
                  ) : (
                    <InfoText>Nenhum dado de aulas encontrado para o {data.bimonthly}.</InfoText>
                  )}
                </LessonsContainer>
                <PrintStyleLessons />
              </StudentSection>
              <StudentSection id='print-area' >
                <CtnrBtt>
                  <ButtonPrint className="no-print" onClick={handlePrintClasses}>Imprimir</ButtonPrint>
                </CtnrBtt>
                <LessonsContainer>
                  <ContLogo className="cont-logo-classes">
                    {(logoUrl) && (
                      <Preview className="logo-classes" src={logoUrl} alt="Logo da escola" />
                    )}
                    <h2>Registros de Aulas do {bimonthly}</h2>
                  </ContLogo>
                  <h4 className="total-aulas-lecionadas">
                    Total de aulas lecionadas: {data?.id_recordClassTaught?.length || 0}
                  </h4>

                  <ContInfo className="info">
                    <span><strong>Escola:</strong> {data.nameSchool}</span>
                  </ContInfo>

                  {data?.id_recordClassTaught?.length > 0 ? (
                    data.id_recordClassTaught
                      .sort((a, b) => new Date(a.year, a.month - 1, a.day) - new Date(b.year, b.month - 1, b.day))
                      .map((res, index) => (
                        <React.Fragment key={index}>
                          <ContainerTable className="print-container-table">
                            <Span>
                              {Array.isArray(data.idRegentTeacher) &&
                                data.idRegentTeacher.map(id => id.toString()).includes(res?.id_teacher?._id?.toString?.()) ? (
                                <>
                                  <div>Professor Titular: <p>{res.id_teacher.name}</p></div>
                                  {data.nameRegentTeacher02 &&
                                    data.nameRegentTeacher02 !== "Professor não definido" && (
                                      <div>Professor Adjunto: <p>{data.nameRegentTeacher02}</p></div>
                                    )}
                                </>
                              ) : Array.isArray(data.idRegentTeacher02) &&
                                data.idRegentTeacher02.map(id => id.toString()).includes(res?.id_teacher?._id?.toString?.()) ? (
                                <>
                                  {data.nameRegentTeacher &&
                                    data.nameRegentTeacher !== "Professor não definido" && (
                                      <div>Professor Titular: <p>{data.nameRegentTeacher}</p></div>
                                    )}
                                  <div>Professor Adjunto: <p>{res.id_teacher.name}</p></div>
                                </>
                              ) : Array.isArray(data.idPhysicalEducationTeacher) &&
                                data.idPhysicalEducationTeacher.map(id => id.toString()).includes(res?.id_teacher?._id?.toString?.()) ? (
                                <div>Professor de Ed. Física: <p>{res.id_teacher.name}</p></div>
                              ) : (
                                <div>Professor Titular: <p>{res.id_teacher?.name || "Não definido"}</p></div>
                              )}

                              <div>Turma: <p>{data.nameClass}</p></div>
                            </Span>
                            <TableRow>
                              <DateCell>{`${res.day}/${res.month}/${res.year}`}</DateCell>
                              <DescriptionCell>
                                <div className={`description ${expandedRows.includes(index) ? 'expanded' : 'collapsed'}`}>
                                  <div
                                    style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                                    dangerouslySetInnerHTML={{
                                      __html: expandedRows.includes(index) || printing
                                        ? res.description
                                        : getDescriptionPreview(res.description)
                                    }}
                                  />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                  {!printing && (
                                    <Button onClick={() => toggleRowExpansion(index)} className={HiddenOnPrint}>
                                      {expandedRows.includes(index) ? 'Ver Menos' : 'Ver Mais'}
                                    </Button>
                                  )}
                                  {expandedRows.includes(index) && positionAtSchool === 'DIRETOR/SUPERVISOR' && (
                                    <Button onClick={() => handleEdit(index, res)} className={HiddenOnPrint}>
                                      Editar
                                    </Button>
                                  )}
                                </div>
                              </DescriptionCell>
                            </TableRow>
                            {editingIndex === index && (
                              <EditContainer>
                                <div className="modal-content">
                                  <h3>Editando Aula</h3>
                                  <ReactQuill
                                    theme="snow"
                                    modules={{
                                      toolbar: [
                                        [{ 'font': [] }],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ['bold', 'italic', 'underline'],
                                        [{ 'color': [] }, { 'background': [] }],
                                        ['clean']
                                      ]
                                    }}
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e)}
                                    placeholder="Descrição da aula"
                                    style={{
                                      height: 'auto', // aumentado de 250px para 350px
                                      maxHeight: '550px',
                                      overflow: 'auto',
                                      zIndex: 0,
                                      position: 'relative'
                                    }}
                                  />
                                  {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                  <div style={{ position: 'relative', zIndex: 10, marginTop: '30px', }} className='BoxBtt'>
                                    <ButtonEdit onClick={handleSaveEdit}>Salvar</ButtonEdit>
                                    <ButtonEdit onClick={() => setEditingIndex(null)}>Cancelar</ButtonEdit>
                                  </div>
                                </div>
                              </EditContainer>
                            )}
                          </ContainerTable>
                        </React.Fragment>
                      ))
                  ) : (
                    <InfoText>Nenhum dado de aulas encontrado para o {data.bimonthly}.</InfoText>
                  )}
                </LessonsContainer>
                <PrintStyleLessons />
              </StudentSection>
            </>*/
          )}

          {activeComponent === 'assessments' && (
            <>
              {data?.idActivity?.length > 0 ? (
                <AssessmentsContainer>
                  <h2>Avaliações do {data.bimonthly}</h2>

                  {data.idActivity
                    .slice() // cria uma cópia para não mutar o array original
                    .sort((a, b) => {
                      const nameA = a?.id_matter?.name?.toLowerCase() || '';
                      const nameB = b?.id_matter?.name?.toLowerCase() || '';
                      if (nameA < nameB) return -1;
                      if (nameA > nameB) return 1;
                      return 0;
                    })
                    .map((activity, index) => (
                      <div key={index} className="assessment-item">
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <strong style={{ marginRight: '6px' }}>Disciplina:</strong>
                          <span style={{ wordBreak: 'break-word' }}>
                            {activity?.id_matter?.name || 'Não informado'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <strong style={{ marginRight: '6px' }}>Descrição:</strong>
                          <span style={{ wordBreak: 'break-word' }}>
                            {activity.descricao}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <strong style={{ marginRight: '6px' }}>Tipo:</strong>
                          <span style={{ wordBreak: 'break-word' }}>
                            {activity.tipo}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <strong style={{ marginRight: '6px' }}>Valor:</strong>
                          <span style={{ wordBreak: 'break-word' }}>
                            {activity.valor.toFixed(1).replace('.', ',')}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '8px' }}>
                          <strong style={{ marginRight: '6px' }}>Professor:</strong>
                          <span style={{ wordBreak: 'break-word' }}>
                            {activity?.id_teacher?.name || 'Não informado'}
                          </span>
                        </div>
                        <div style={{ marginTop: '8px', textAlign: 'right' }}>
                          <button
                            onClick={() => toggleAssessment(index)}
                            style={{
                              background: '#007bff',
                              color: 'white',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                            }}
                          >
                            {expandedAssessments.includes(index) ? 'Fechar Notas' : 'Ver Notas'}
                          </button>
                        </div>
                        {expandedAssessments.includes(index) && (
                          <>
                            {activity.studentGrades && activity.studentGrades.length > 0 ? (
                              <table>
                                <thead>
                                  <tr>
                                    <th>Aluno</th>
                                    <th>Nota</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {activity.studentGrades.map((grade, idx) => (
                                    <tr key={idx}>
                                      <td>{grade?.id_student?.name || 'Aluno não informado'}</td>
                                      <td>
                                        {grade.studentGrade
                                          ? (typeof grade.studentGrade === 'number'
                                            ? grade.studentGrade.toFixed(1).replace('.', ',')
                                            : Number(grade.studentGrade.replace(',', '.')).toFixed(1).replace('.', ','))
                                          : '-'}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>

                              </table>
                            ) : (
                              <p>Nenhuma nota registrada para esta avaliação.</p>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                </AssessmentsContainer>
              ) : (
                <InfoText>
                  Nenhum dado de Avaliações encontrado para o {data.bimonthly}.
                </InfoText>
              )}
            </>
          )}

          {activeComponent === 'numericalGrades' && (
            <GradesTableContainer id="printable-content">
              <HeaderWrapper className="HeaderWrapper">
                {(logoUrl) && (
                  <Preview className="" src={logoUrl} alt="Logo da escola" />
                )}
                <ContInfo className="info">
                  <h2>Registro de Notas do {bimonthly}</h2>
                  <span><strong>Escola:</strong> {data.nameSchool}</span>
                  <span><strong>Turma:</strong> {data.nameClass}</span>
                  <span><strong>Professor Regente Titular:</strong> {data.nameRegentTeacher}</span>
                  {data.nameRegentTeacher02 !== "Professor não definido" && (
                    <span><strong>Professor Regente Adjunto:</strong> {data.nameRegentTeacher02}</span>
                  )}
                  {data.namephysicalEducationTeacher !== "Professor não definido" && (
                    <span><strong>Professor de Ed. Física:</strong> {data.namephysicalEducationTeacher}</span>
                  )}
                </ContInfo>
              </HeaderWrapper>
              <CtnrBtt>
                <ButtonPrint className="no-print" onClick={handlePrintgrades}>Imprimir</ButtonPrint>
              </CtnrBtt>
              <LegendBox className="legendBox">
                <h3>Legenda</h3>
                <p>
                  Nota Total:{" "}
                  <strong style={{ color: '#1d7f14' }}>
                    {parseFloat(data.totalGrade).toFixed(1)}
                  </strong>
                </p>
                <p>
                  Nota Média:{" "}
                  <strong style={{ color: 'blue' }}>
                    {parseFloat(data.averageGrade).toFixed(1)}
                  </strong>
                </p>
              </LegendBox>
              {Object.entries(groupedGrades).length > 0 ? (
                console.log("groupedGrades", groupedGrades),
                <div style={{ overflowX: 'auto' }}>
                  <GradesTable>
                    <GradesTableHeader>
                      <tr>
                        <th className="name-cell">Nome do Aluno</th>
                        {Object.entries(groupedGrades).map(([matterId, matterData]) => (
                          <th key={matterId} className="matter-cell">
                            {matterData.name}
                          </th>
                        ))}
                      </tr>
                    </GradesTableHeader>
                    <GradesTableBody>
                      {Object.values(
                        Object.entries(groupedGrades).reduce((acc, [, matterData]) => {
                          Object.entries(matterData.students).forEach(([studentId, studentData]) => {
                            if (!acc[studentId]) {
                              acc[studentId] = { name: studentData.name, grades: {} };
                            }
                            acc[studentId].grades[matterData.name] = {
                              total: studentData.total,
                              hasHistorico: studentData.hasHistorico === true
                            };
                          });
                          return acc;
                        }, {})
                      )
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((student) => (
                          <tr
                            key={student.name}
                            className={`grade-row ${selectedStudentGrades === student.name ? 'selected' : ''}`}
                            onClick={() =>
                              setSelectedStudentGrades((prev) =>
                                prev === student.name ? null : student.name
                              )
                            }
                          >
                            <td className="name-cell">{student.name}</td>
                            {Object.entries(groupedGrades).map(([_, matterData]) => {
                              const notaObj = student.grades[matterData.name];
                              let notaClass = '';

                              if (notaObj) {
                                const nota = Number(notaObj.total);
                                const isHistorico = notaObj.hasHistorico === true;

                                const notaTotal = Number(data.totalGrade);
                                const notaMedia = Number(data.averageGrade);

                                if (isHistorico) {
                                  notaClass = 'grade-historico';
                                } else if (nota >= notaTotal * 0.9) {
                                  notaClass = 'grade-green';
                                } else if (nota >= notaMedia) {
                                  notaClass = 'grade-blue';
                                } else {
                                  notaClass = 'grade-red';
                                }
                              }

                              return (
                                <td
                                  key={matterData.name}
                                  className={`matter-cell ${notaClass}`}
                                >
                                  {notaObj
                                    ? notaObj.total.toFixed(1).replace('.', ',')
                                    : '-'}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                    </GradesTableBody>
                  </GradesTable>
                </div>
              ) : (
                <GradesTable>
                  <tr><td>Não há nenhum registro</td></tr>
                </GradesTable>
              )}
            </GradesTableContainer>
          )}

          {activeComponent === 'concepts' && (
            data.studentConcept && data.studentConcept.length > 0 ? (
              <>
                <ConceptsTableContainer id="printable-content-concepts">
                  <HeaderWrapper className="HeaderWrapper">
                    {(logoUrl) && (
                      <Preview className="" src={logoUrl} alt="Logo da escola" />
                    )}
                    <ContInfo className="info">
                      <h2>Registro de Conceitos do {bimonthly}</h2>
                      <span><strong>Escola:</strong> {data.nameSchool}</span>
                      <span><strong>Turma:</strong> {data.nameClass}</span>
                      <span><strong>Professor Regente Titular:</strong> {data.nameRegentTeacher}</span>
                      {data.nameRegentTeacher02 !== "Professor não definido" && (
                        <span><strong>Professor Regente Adjunto:</strong> {data.nameRegentTeacher02}</span>
                      )}
                      {data.namephysicalEducationTeacher !== "Professor não definido" && (
                        <span><strong>Professor de Ed. Física:</strong> {data.namephysicalEducationTeacher}</span>
                      )}
                    </ContInfo>
                  </HeaderWrapper>

                  <CtnrBtt>
                    <ButtonPrint className="no-print" onClick={handlePrintconcept}>Imprimir</ButtonPrint>
                  </CtnrBtt>

                  <LegendBox className="legendBox">
                    <h3>Legenda</h3>
                    <p><strong style={{ color: '#1d7f14' }}>A</strong> - Alcançou com êxito as capacidades básicas</p>
                    <p><strong style={{ color: 'blue' }}>B</strong> - Alcançou satisfatoriamente as capacidades básicas</p>
                    <p><strong style={{ color: 'orange' }}>C</strong> - Alcançou parcialmente as capacidades básicas</p>
                    <p><strong style={{ color: 'red' }}>D</strong> - Não alcançou as capacidades básicas</p>
                  </LegendBox>

                  {/* ✅ Somente a TABELA rola */}
                  <div style={{ overflowX: 'auto' }}>
                    <ConceptsTable>
                      <ConceptsTableHeader>
                        <tr>
                          <th className="name-cell">Nome do Aluno</th>
                          {Array.from(
                            new Map(
                              data.studentConcept.map((c) => [
                                c.id_matter._id,
                                c.id_matter.name
                              ])
                            ).entries()
                          ).map(([matterId, matterName]) => (
                            <th key={matterId} className="matter-cell">{matterName}</th>
                          ))}
                        </tr>
                      </ConceptsTableHeader>

                      <ConceptsTableBody>
                        {Object.values(
                          data.studentConcept.reduce((acc, concept) => {
                            const studentId = concept.id_student._id;
                            if (!acc[studentId]) {
                              acc[studentId] = {
                                _id: studentId,
                                name: concept.id_student?.name || 'Sem nome',
                                concepts: {}
                              };
                            }
                            acc[studentId].concepts[concept.id_matter._id] = concept.studentGrade;
                            return acc;
                          }, {})
                        )
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((student) => (
                            <tr
                              key={student._id}
                              className={`concept-row ${selectedStudentConcept === student._id ? 'selected' : ''}`}
                              onClick={() =>
                                setSelectedStudentConcept((prev) =>
                                  prev === student._id ? null : student._id
                                )
                              }
                            >
                              <td className="name-cell">{student.name}</td>
                              {Array.from(
                                new Map(
                                  data.studentConcept.map((c) => [
                                    c.id_matter._id,
                                    c.id_matter.name
                                  ])
                                ).keys()
                              ).map((matterId) => {
                                const concept = student.concepts[matterId] || '-';
                                let conceptClass = '';
                                if (concept === 'A') conceptClass = 'concept-green';
                                else if (concept === 'B') conceptClass = 'concept-blue';
                                else if (concept === 'C') conceptClass = 'concept-orange';
                                else if (concept === 'D') conceptClass = 'concept-red';

                                return (
                                  <td key={matterId} className={`matter-cell ${conceptClass}`}>
                                    {concept}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                      </ConceptsTableBody>
                    </ConceptsTable>
                  </div>
                </ConceptsTableContainer>
              </>
            ) : (
              <ConceptsTableContainer>
                <div style={{ overflowX: 'auto' }}>
                  <ConceptsTable>
                    <tr>
                      <td>Não há conceitos registrados</td>
                    </tr>
                  </ConceptsTable>
                </div>
              </ConceptsTableContainer>
            )
          )}

          {activeComponent === 'individualRecords' && (
            <IndividualContainerDivs id='print-area' >
              <IndividualPrintStyle>
                <CtnrBtt>
                  <ButtonPrint className="no-print" onClick={handlePrintIndividualForm}>Imprimir</ButtonPrint>
                </CtnrBtt>
                <IndividualStudentSection id="printable-content-individualRecords">
                  <ContLogo className="cont-logo-individualForm">
                    {(logoUrl) && (
                      <Preview className="logo-individualForm" src={logoUrl} alt="Logo da escola" />
                    )}
                    <h2>Fichas Individuais de Alunos</h2>
                  </ContLogo>
                  <h3>{bimonthly}</h3>
                  <span><strong>Escola:</strong> {data.nameSchool}</span>
                  <span><strong>turma:</strong> {data.nameClass}</span>

                  {Array.isArray(data.id_individualForm) && data.id_individualForm.length > 0 ? (
                    data.id_individualForm
                      .sort((a, b) => a.id_student.name.localeCompare(b.id_student.name))
                      .map((res, index) => (
                        <IndividualContainerTable key={res._id}>
                          <Span>
                            {Array.isArray(data.idRegentTeacher) && data.idRegentTeacher.includes(res.id_teacher._id) ? (
                              <>
                                <div>Professor Regente Titular: <p>{res.id_teacher.name}</p></div>
                                {data.nameRegentTeacher02 &&
                                  data.nameRegentTeacher02 !== "Professor não definido" && (
                                    <div>Professor Regente Adjunto: <p>{data.nameRegentTeacher02}</p></div>
                                  )}
                              </>
                            ) : Array.isArray(data.idRegentTeacher02) && data.idRegentTeacher02.includes(res.id_teacher._id) ? (
                              <>
                                {/* Se quem lançou é o Professor 02, mostra os dois */}
                                {data.nameRegentTeacher && data.nameRegentTeacher !== "Professor não definido" && (
                                  <div>Professor Regente Titular: <p>{data.nameRegentTeacher}</p></div>
                                )}
                                <div>Professor Regente Adjunto: <p>{res.id_teacher.name}</p></div>
                              </>
                            ) : Array.isArray(data.idPhysicalEducationTeacher) && data.idPhysicalEducationTeacher.includes(res.id_teacher._id) ? (
                              <div>Professor de Ed. Física: <p>{res.id_teacher.name}</p></div>
                            ) : null}


                            <div>Aluno: <p>{res.id_student.name}</p></div>
                          </Span>

                          <IndividualTableRow>
                            <IndividualDescriptionCell>
                              <div className={`description ${expandedRows.includes(index) ? 'expanded' : 'collapsed'}`}>
                                <div
                                  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                                  dangerouslySetInnerHTML={{
                                    __html: expandedRows.includes(index) || printing
                                      ? res.description
                                      : getDescriptionPreview(res.description),
                                  }}
                                />
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {!printing && (
                                  <Button onClick={() => toggleRowExpansion(index)} className="no-print">
                                    {expandedRows.includes(index) ? 'Ver Menos' : 'Ver Mais'}
                                  </Button>
                                )}
                                {expandedRows.includes(index) && positionAtSchool === 'DIRETOR/SUPERVISOR' && (
                                  <Button onClick={() => handleEdit(index, res)} className="no-print">
                                    Editar
                                  </Button>
                                )}
                              </div>
                            </IndividualDescriptionCell>
                          </IndividualTableRow>

                          {editingIndex === index && (
                            <EditContainer>
                              <div className="modal-content">
                                <h3>Editando Ficha</h3>
                                <ReactQuill
                                  theme="snow"
                                  modules={{
                                    toolbar: [
                                      [{ 'font': [] }],
                                      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                      ['bold', 'italic', 'underline'],
                                      [{ 'color': [] }, { 'background': [] }],
                                      ['clean']
                                    ]
                                  }}
                                  value={editedDescription}
                                  onChange={(e) => setEditedDescription(e)}
                                  placeholder="Descrição da aula"
                                  style={{
                                    height: 'auto', // aumentado de 250px para 350px
                                    maxHeight: '550px',
                                    overflow: 'auto',
                                    zIndex: 0,
                                    position: 'relative'
                                  }}
                                />
                                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                <div style={{ position: 'relative', zIndex: 10, marginTop: '30px', }} className='BoxBtt'>
                                  <ButtonEdit onClick={handleSaveEditIndForm}>Salvar</ButtonEdit>
                                  <ButtonEdit onClick={() => setEditingIndex(null)}>Cancelar</ButtonEdit>
                                </div>
                              </div>
                            </EditContainer>
                          )}
                        </IndividualContainerTable>
                      ))
                  ) : (
                    <InfoText>Não há nenhum registro</InfoText>
                  )}
                </IndividualStudentSection>
              </IndividualPrintStyle>
            </IndividualContainerDivs>
          )}

          {activeComponent === 'finalConcepts' && (
            data.id_FinalConcepts && data.id_FinalConcepts.length > 0 ? (
              <>
                <ConceptsTableContainer id="printable-content-concepts">
                  <HeaderWrapper className="HeaderWrapper">
                    {(logoUrl) && (
                      <Preview className="" src={logoUrl} alt="Logo da escola" />
                    )}
                    <ContInfo className="info">
                      <span><strong>Escola:</strong> {data.nameSchool}</span>
                      <span><strong>Turma:</strong> {data.nameClass}</span>
                      <span><strong>Professor Regente Titular:</strong> {data.nameRegentTeacher}</span>
                      {data.nameRegentTeacher02 !== "Professor não definido" && (
                        <span><strong>Professor Regente Adjunto:</strong> {data.nameRegentTeacher02}</span>
                      )}
                      {data.namephysicalEducationTeacher !== "Professor não definido" && (
                        <span><strong>Professor de Ed. Física:</strong> {data.namephysicalEducationTeacher}</span>
                      )}
                    </ContInfo>
                  </HeaderWrapper>

                  <CtnrBtt>
                    <ButtonPrint className="no-print" onClick={handlePrintconcept}>Imprimir</ButtonPrint>
                  </CtnrBtt>

                  <LegendBox className="legendBox">
                    <h3>Legenda</h3>
                    <p><strong style={{ color: '#1d7f14' }}>A</strong> - Alcançou com êxito as capacidades básicas</p>
                    <p><strong style={{ color: 'blue' }}>B</strong> - Alcançou satisfatoriamente as capacidades básicas</p>
                    <p><strong style={{ color: 'orange' }}>C</strong> - Alcançou parcialmente as capacidades básicas</p>
                    <p><strong style={{ color: 'red' }}>D</strong> - Não alcançou as capacidades básicas</p>
                  </LegendBox>

                  {/* ✅ Somente a TABELA rola */}
                  <div style={{ overflowX: 'auto' }}>
                    <ConceptsTable>
                      <ConceptsTableHeader>
                        <tr>
                          <th className="name-cell">Nome do Aluno</th>
                          {Array.from(
                            new Map(
                              data.studentConcept.map((c) => [
                                c.id_matter._id,
                                c.id_matter.name
                              ])
                            ).entries()
                          ).map(([matterId, matterName]) => (
                            <th key={matterId} className="matter-cell">{matterName}</th>
                          ))}
                        </tr>
                      </ConceptsTableHeader>

                      <ConceptsTableBody>
                        {Object.values(
                          data.id_FinalConcepts.reduce((acc, concept) => {
                            const studentId = concept.id_student._id;
                            if (!acc[studentId]) {
                              acc[studentId] = {
                                _id: studentId,
                                name: concept.id_student?.name || 'Sem nome',
                                concepts: {}
                              };
                            }
                            acc[studentId].concepts[concept.id_matter._id] = concept.studentGrade;
                            return acc;
                          }, {})
                        )
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((student) => (
                            <tr
                              key={student._id}
                              className={`concept-row ${selectedStudentConcept === student._id ? 'selected' : ''}`}
                              onClick={() =>
                                setSelectedStudentConcept((prev) =>
                                  prev === student._id ? null : student._id
                                )
                              }
                            >
                              <td className="name-cell">{student.name}</td>
                              {Array.from(
                                new Map(
                                  data.studentConcept.map((c) => [
                                    c.id_matter._id,
                                    c.id_matter.name
                                  ])
                                ).keys()
                              ).map((matterId) => {
                                const concept = student.concepts[matterId] || '-';
                                let conceptClass = '';
                                if (concept === 'A') conceptClass = 'concept-green';
                                else if (concept === 'B') conceptClass = 'concept-blue';
                                else if (concept === 'C') conceptClass = 'concept-orange';
                                else if (concept === 'D') conceptClass = 'concept-red';

                                return (
                                  <td key={matterId} className={`matter-cell ${conceptClass}`}>
                                    {concept}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                      </ConceptsTableBody>
                    </ConceptsTable>
                  </div>
                </ConceptsTableContainer>
              </>
            ) : (
              <ConceptsTableContainer>
                <div style={{ overflowX: 'auto' }}>
                  <ConceptsTable>
                    <tr>
                      <td>Não há conceitos registrados</td>
                    </tr>
                  </ConceptsTable>
                </div>
              </ConceptsTableContainer>
            )
          )}

          <ToGoBack onClick={() => window.history.back()} className="no-print">
            <SignMessageButtonText>Voltar para a</SignMessageButtonText>
            <SignMessageButtonTextBold>Página Anterior</SignMessageButtonTextBold>
          </ToGoBack>
        </>
      }

    </Container >
  );
}
