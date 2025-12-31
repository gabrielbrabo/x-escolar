import React, { useEffect, useState } from "react";
import { clssInfo, AttendanceByTeacherAndClass, getIstQuarter, getIIndQuarter, getIIIrdQuarter, getIVthQuarter, getVthQuarter, getVIthQuarter, getSchoolYear } from "../../Api"; // Simula chamada ao backend
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/Loading';

const AttendanceContainer = styled.div`
  text-align: center;
  width: 100%;
  min-height: 80vh;
`;
const ContInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
/*const CtnrBtt = styled.div`
 display: flex;
 justify-content: end;
  width: 100%;
`;*/

const DataBimonthly = styled.div`
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

const ContTable = styled.table`
  display: flex;
  align-items: center;
  overflow-x: auto; /* Permite rolagem horizontal */
`;

const Table = styled.table`
  border-collapse: collapse;
  margin: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  width: 100%;
`;

const TableHeader = styled.thead`
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

const TableBody = styled.tbody`
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

const InfoText = styled.div`
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

const PrintStyle = styled.div`
  @media print {
    body *{
      display: none; /* Oculta todos os elementos da página */
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

    ${AttendanceContainer} {
      //position: absolute;
      width: 100%; /* Certifique-se de que ocupa toda a largura */
      height: auto; /* Permite o ajuste automático da altura */
      box-sizing: border-box; /* Inclui o padding e a borda na largura total */
    }

    ${ContTable} {
      overflow-x: hidden; /* Permite rolagem horizontal */
      width: max-content; /* Garante que a tabela ocupe a largura do conteúdo */
      margin-left: auto; /* Centraliza horizontalmente */
      margin-right: auto; /* Centraliza horizontalmente */
    }

    th, td {
      text-align: center;
      border: 1px solid #ddd;
      //page-break-inside: avoid;
      font-size: 8px;
      padding: 1px;
    }

    @page {
      size: A4 landscape; /* Define o formato da página como paisagem */
      margin: 0;
    }

    .table-container {
      
    }
  }
`;

export default function AttendanceList() {
  const navigate = useNavigate()

  const [startd, setStartd] = useState("");
  const [startm, setStartm] = useState("");
  const [starty, setStarty] = useState("");
  const [endd, setEndd] = useState("");
  const [endm, setEndm] = useState("");
  const [endy, setEndy] = useState("");

  const [stdt, setStdt] = useState([]);
  const [studentTransferMap, setstudentTransferMap] = useState([]);

  const [id_teacher, setid_teacher] = useState("");
  const [nameSchool, setnameSchool] = useState("");
  const [id_class, setid_class] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [bimonthlyDaily, setbimonthlyDaily] = useState([]);
  const [nameTeacher, setnameTeacher] = useState([]);
  const [nameClass, setnameClass] = useState([]);
  const [serie, setSerie] = useState([]);

  const [loading, setLoading] = useState(false);

  const [RegentTeacher, setclassRegentTeacher] = useState([]);
  const [RegentTeacher02, setclassRegentTeacher02] = useState([]);
  const [physicalEducationTeacher, setphysicalEducationTeacher] = useState([]);


  useEffect(() => {
    const fetchAttendanceData = async () => {

      setLoading(true);
      const SelectbimonthlyDaily = JSON.parse(sessionStorage.getItem("Selectbimonthly-daily"));
      const SelectteacherDaily = JSON.parse(sessionStorage.getItem("Selectteacher-daily"));
      const Nameclass = JSON.parse(sessionStorage.getItem("Nameclass-daily"));
      const SelectclassDaily = sessionStorage.getItem("Selectclass-daily");
      const idSchool = SelectteacherDaily.id_school;
      const schoolYear = await getSchoolYear(idSchool._id)
      const year = schoolYear.data.data

      setid_teacher(SelectteacherDaily._id);
      setnameSchool(SelectteacherDaily.id_school.name);
      setid_class(SelectclassDaily);
      setbimonthlyDaily(SelectbimonthlyDaily.bimonthly);
      setnameTeacher(SelectteacherDaily.name);
      setnameClass(Nameclass.name);
      setSerie(Nameclass.serie);
        
      const Employee02 = await Nameclass.classRegentTeacher02.find(res => {
        return res
      })
      const Employee = await Nameclass.classRegentTeacher.find(res => {
        return res
      })
      const physicalEducationTeacher = await Nameclass.physicalEducationTeacher.find(res => {
        return res
      })

      setclassRegentTeacher(Employee)
      setclassRegentTeacher02(Employee02)
      setphysicalEducationTeacher(physicalEducationTeacher)

      //console.log(selec)

      if (SelectbimonthlyDaily.bimonthly === "1º BIMESTRE") {
        const IstQuarter = await getIstQuarter(year, idSchool);
        const res = IstQuarter.data.data.find((res) => res);
        setStartd(res.startday);
        setStartm(res.startmonth);
        setStarty(res.startyear);
        setEndd(res.endday);
        setEndm(res.endmonth);
        setEndy(res.endyear);
      }
      if (SelectbimonthlyDaily.bimonthly === "2º BIMESTRE") {
        const IIndQuarter = await getIIndQuarter(year, idSchool);
        const res = IIndQuarter.data.data.find((res) => res);
        setStartd(res.startday);
        setStartm(res.startmonth);
        setStarty(res.startyear);
        setEndd(res.endday);
        setEndm(res.endmonth);
        setEndy(res.endyear);
      }
      if (SelectbimonthlyDaily.bimonthly === "3º BIMESTRE") {
        const IIIrdQuarter = await getIIIrdQuarter(year, idSchool);
        const res = IIIrdQuarter.data.data.find((res) => res);
        setStartd(res.startday);
        setStartm(res.startmonth);
        setStarty(res.startyear);
        setEndd(res.endday);
        setEndm(res.endmonth);
        setEndy(res.endyear);
      }
      if (SelectbimonthlyDaily.bimonthly === "4º BIMESTRE") {
        const IVthQuarter = await getIVthQuarter(year, idSchool);
        const res = IVthQuarter.data.data.find((res) => res);
        setStartd(res.startday);
        setStartm(res.startmonth);
        setStarty(res.startyear);
        setEndd(res.endday);
        setEndm(res.endmonth);
        setEndy(res.endyear);
      }
      if (SelectbimonthlyDaily.bimonthly === "5º BIMESTRE") {
        const VthQuarter = await getVthQuarter(year, idSchool);
        const res = VthQuarter.data.data.find((res) => res);
        setStartd(res.startday);
        setStartm(res.startmonth);
        setStarty(res.startyear);
        setEndd(res.endday);
        setEndm(res.endmonth);
        setEndy(res.endyear);
      }
      if (SelectbimonthlyDaily.bimonthly === "6º BIMESTRE") {
        const VIthQuarter = await getVIthQuarter(year, idSchool);
        const res = VIthQuarter.data.data.find((res) => res);
        setStartd(res.startday);
        setStartm(res.startmonth);
        setStarty(res.startyear);
        setEndd(res.endday);
        setEndm(res.endmonth);
        setEndy(res.endyear);
      }

      if (year && id_teacher && id_class && startd && startm && starty && endd && endm && endy) {
        const resClass = await clssInfo(id_class);
        const student = resClass.data.data.find((res) => res).id_student.map((res) => {
          return res || null;
        });
        setStdt(student);
        const transferStdtMap = resClass.data.data.find(res => {
          return res
        }).transferStudents
        setstudentTransferMap(transferStdtMap)

        if (RegentTeacher02 === id_teacher) {
          const res = await AttendanceByTeacherAndClass(year, RegentTeacher, id_class, startd, startm, starty, endd, endm, endy);
          if (res) {
            setAttendanceData(res.data.data);
          } else {
            setAttendanceData([]);
          }
          // console.log("resclass", res.data.data)
          setLoading(false);
        } /*else if (physicalEducationTeacher === id_teacher) {
          const res = await AttendanceByTeacherAndClass(year, RegentTeacher, id_class, startd, startm, starty, endd, endm, endy);
          if (res) {
            setAttendanceData(res.data.data);
          } else {
            setAttendanceData([]);
          }
          // console.log("resclass", res.data.data)
          setLoading(false);
        }*/ else {

          const res = await AttendanceByTeacherAndClass(year, id_teacher, id_class, startd, startm, starty, endd, endm, endy);
          if (res) {
            setAttendanceData(res.data.data);
          } else {
            setAttendanceData([]);
          }
          // console.log("resclass", res.data.data)
          setLoading(false);
        }
      }
    };
    fetchAttendanceData();
  }, [id_teacher, id_class, startd, startm, starty, endd, endm, endy, RegentTeacher, RegentTeacher02, physicalEducationTeacher]);
  console.log("attendanceData", attendanceData)
  console.log("studentTransferMap", studentTransferMap)
  const getAttendanceStatus = (studentId, date) => {
    const attendanceForDate = attendanceData.find(
      (attendance) => attendance.id_student._id === studentId && `${attendance.day}/${attendance.month}` === date
    );
    if (attendanceForDate) {
      return (
        <td
          className={`status-cell ${attendanceForDate.status === "P"
            ? "presence"
            : attendanceForDate.status === "FJ"
              ? "justifiedAbsence"
              : "absence"
            }`}
        >
          {attendanceForDate.status}
        </td>
      );
    }
    return <td className="status-cell">-</td>;
  };

  const calculateTotals = (studentId) => {
    const attendanceForStudent = attendanceData.filter(
      (attendance) => attendance.id_student._id === studentId
    );
    const totalPresence = attendanceForStudent.filter((att) => att.status === "P").length;
    const totalAbsence = attendanceForStudent.filter((att) => att.status === "F").length;
    const totaljustifiedAbsence = attendanceForStudent.filter((att) => att.status === "FJ").length;
    return { totalPresence, totalAbsence, totaljustifiedAbsence };
  };

  const uniqueDates = [
    ...new Set(attendanceData.map((attendance) => `${attendance.day}/${attendance.month}`))
  ].sort((a, b) => {
    const [dayA, monthA] = a.split("/").map(Number);
    const [dayB, monthB] = b.split("/").map(Number);

    if (monthA !== monthB) return monthA - monthB;
    return dayA - dayB;
  });

  const formatDisplayDate = (date) => {
    const [day, month] = date.split("/");
    return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}`;
  };

  const messageButtonClick = () => {
    navigate(-1);
  };
/*
  const handlePrint = () => {
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
                size: A4 landscape; /* Define o formato da página como paisagem 
                margin: 0;
              }  
              ContTable {
                overflow-x: hidden; /* Permite rolagem horizontal 
                width: max-content; /* Garante que a tabela ocupe a largura do conteúdo 
                margin-left: auto; /* Centraliza horizontalmente 
                margin-right: auto; /* Centraliza horizontalmente 
              }
                .printable-content {
                  visibility: visible; /* Exibe apenas o conteúdo dentro desta classe 
                  font-size: 15px;
                  //transform: scale(1); /* Ajusta a escala da tabela 
                }
              .data {
                display: flex;
                gap:15px;
              }
              .info {
                display: flex;
                flex-direction: column;
              }
                .no-print {
                  display: none !important;
                }
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
*/
  const normalizeString = (str) => {
    return str
      .normalize("NFD") // Separa caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^\w\s]/gi, "") // Remove pontuações
      .toUpperCase(); // Converte para maiúsculas
  };
  console.log("nameSchool", nameSchool)

  return (
    <PrintStyle>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <AttendanceContainer id="printable-content" className="printable-content">
          <h2>Lista de Presença do {bimonthlyDaily}</h2>
          <DataBimonthly className="data">
            <span>
              <strong>Início:</strong> {String(startd).padStart(2, '0')}/{String(startm).padStart(2, '0')}/{starty}
            </span>
            <span>
              <strong>Término:</strong> {String(endd).padStart(2, '0')}/{String(endm).padStart(2, '0')}/{endy}
            </span>
          </DataBimonthly>

          <ContInfo className="info">
            {/*<CtnrBtt>
              <Button className="no-print" onClick={handlePrint}>Imprimir</Button>
            </CtnrBtt>*/}
            <span><strong>Escola:</strong> {nameSchool}</span>
            <span><strong>Professor:</strong> {nameTeacher}</span>
            <span><strong>Serie:</strong> {serie}</span>
            <span><strong>Turma:</strong> {nameClass}</span>
          </ContInfo>
          <ContTable>
            {attendanceData.length > 0 && !null && !undefined ? (
              <Table>
                <TableHeader>
                  <tr>
                    <th className="name-cell">Nome do Aluno</th>
                    {uniqueDates.map((date, index) => (
                      <th key={index} className="date-cell">
                        {formatDisplayDate(date)}
                      </th>
                    ))}
                    <th className="total-presence">Total P</th>
                    <th className="total-absence">Total F</th>
                    <th className="total-justifiedAbsence">Total FJ</th>
                  </tr>
                </TableHeader>
                <TableBody>
                  {stdt
                    .sort((a, b) => normalizeString(a.name).localeCompare(normalizeString(b.name))) // Ordena alfabeticamente
                    .map((student) => {
                      const totals = calculateTotals(student._id);
                      return (
                        <tr key={student._id}>
                          <td className="name-cell">{student.name}</td>
                          {uniqueDates.map((date) => getAttendanceStatus(student._id, date))}
                          <td className="total-presence">{totals.totalPresence}</td>
                          <td className="total-absence">{totals.totalAbsence}</td>
                          <td className="total-justifiedAbsence">{totals.totaljustifiedAbsence}</td>
                        </tr>
                      );
                    })}
                  {studentTransferMap.length > 0 && (
                    <>
                      <tr>
                        <td colSpan={uniqueDates.length + 3} style={{ textAlign: "left", fontWeight: "bold", padding: "5px", background: "#f8d7da", color: "#721c24" }}>
                          ⚠️ Alunos Transferidos e Remanejados
                        </td>
                      </tr>
                      {studentTransferMap
                        .sort((a, b) => normalizeString(a.name).localeCompare(normalizeString(b.name)))
                        .map((student) => {
                          const totals = calculateTotals(student._id);
                          return (
                            <tr key={student._id}>
                              <td className="name-cell">
                                {student.name}
                                {student.status === "ativo" && (
                                  <span style={{ color: 'blue', fontWeight: 'bold' }}>Remanejado</span>
                                )}
                                {student.status === "inativo" && (
                                  <span style={{ color: 'blue', fontWeight: 'bold' }}>Remanejado</span>
                                )}
                                {student.status === "transferido" && (
                                  <span style={{ color: 'orange', fontWeight: 'bold' }}>Transferido</span>
                                )}
                              </td>
                              {uniqueDates.map((date) => getAttendanceStatus(student._id, date))}
                              <td className="total-presence">{totals.totalPresence}</td>
                              <td className="total-absence">{totals.totalAbsence}</td>
                              <td className="total-justifiedAbsence">{totals.totaljustifiedAbsence}</td>
                            </tr>
                          );
                        })}
                    </>
                  )}

                </TableBody>
              </Table>
            ) : (
              <InfoText>Não há nenhum registro</InfoText>
            )}
          </ContTable>
          <ToGoBack onClick={messageButtonClick} className="no-print">
            <SignMessageButtonText>Voltar para o</SignMessageButtonText>
            <SignMessageButtonTextBold>Perfil do Professor</SignMessageButtonTextBold>
          </ToGoBack>
        </AttendanceContainer>
      )}
    </PrintStyle>
  );
}
