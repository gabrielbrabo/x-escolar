import React, { useEffect, useState } from "react";
import { clssInfo, AttendanceByTeacherAndClass, getIstQuarter, getIIndQuarter, getIIIrdQuarter, getIVthQuarter, getVthQuarter, getVIthQuarter } from "../../Api"; // Simula chamada ao backend
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
const CtnrBtt = styled.div`
 display: flex;
 justify-content: end;
  width: 100%;
`;

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

const PrintStyle = styled.div`
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
    tr {
      //page-break-inside: avoid; /* Evita quebras dentro de linhas da tabela */
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
  const [id_teacher, setid_teacher] = useState("");
  const [id_class, setid_class] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [bimonthlyDaily, setbimonthlyDaily] = useState([]);
  const [nameTeacher, setnameTeacher] = useState([]);
  const [nameClass, setnameClass] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAttendanceData = async () => {

      setLoading(true);
      const year = new Date().getFullYear().toString();
      const SelectbimonthlyDaily = JSON.parse(sessionStorage.getItem("Selectbimonthly-daily"));
      const SelectteacherDaily = JSON.parse(sessionStorage.getItem("Selectteacher-daily"));
      const Nameclass = JSON.parse(sessionStorage.getItem("Nameclass-daily"));
      const SelectclassDaily = sessionStorage.getItem("Selectclass-daily");
      const idSchool = SelectteacherDaily.id_school;

      setid_teacher(SelectteacherDaily._id);
      setid_class(SelectclassDaily);
      setbimonthlyDaily(SelectbimonthlyDaily.bimonthly);
      setnameTeacher(SelectteacherDaily.name);
      setnameClass(Nameclass.serie);

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

        const res = await AttendanceByTeacherAndClass(year, id_teacher, id_class, startd, startm, starty, endd, endm, endy);
        if (res) {
          setAttendanceData(res.data.data);
        }
        setLoading(false);
      }
    };
    fetchAttendanceData();
  }, [id_teacher, id_class, startd, startm, starty, endd, endm, endy]);

  const getAttendanceStatus = (studentId, date) => {
    const attendanceForDate = attendanceData.find(
      (attendance) => attendance.id_student._id === studentId && `${attendance.day}/${attendance.month}` === date
    );
    if (attendanceForDate) {
      return (
        <td className={`status-cell ${attendanceForDate.status === "P" ? "presence" : "absence"}`}>
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
    return { totalPresence, totalAbsence };
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

  return (
    <PrintStyle>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <AttendanceContainer className="printable-content">
          <h2>Lista de Presença do {bimonthlyDaily}</h2>
          <DataBimonthly>
            <span><strong>Inicio:</strong> {startd}/{startm}/{starty}</span>
            <span><strong>Fim:</strong> {endd}/{endm}/{endy}</span>
          </DataBimonthly>
          <ContInfo>
            <CtnrBtt>
              <Button className="no-print" onClick={() => window.print()}>Imprimir</Button>
            </CtnrBtt>
            <span><strong>Professor:</strong> {nameTeacher}</span>
            <span><strong>Turma:</strong> {nameClass}</span>
          </ContInfo>
          <ContTable>
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
                </tr>
              </TableHeader>
              <TableBody>
                {stdt.map((student) => {
                  const totals = calculateTotals(student._id);
                  return (
                    <tr key={student._id}>
                      <td className="name-cell">{student.name}</td>
                      {uniqueDates.map((date) => getAttendanceStatus(student._id, date))}
                      <td className="total-presence">{totals.totalPresence}</td>
                      <td className="total-absence">{totals.totalAbsence}</td>
                    </tr>
                  );
                })}
              </TableBody>
            </Table>
          </ContTable>
          <ToGoBack onClick={messageButtonClick}>
            <SignMessageButtonText>Voltar para o</SignMessageButtonText>
            <SignMessageButtonTextBold>Perfil do Professor</SignMessageButtonTextBold>
          </ToGoBack>
        </AttendanceContainer>
      )}
    </PrintStyle>
  );
}
