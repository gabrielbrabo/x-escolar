import React, { useEffect, useState } from "react";
import { clssInfo, AttendanceByTeacherAndClass, getIstQuarter, getIIndQuarter, getIIIrdQuarter, getIVthQuarter, getVthQuarter, getVIthQuarter } from "../../Api"; // Simula chamada ao backend
import styled from "styled-components";

const AttendanceContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const ContTable = styled.table`
  display: flex;
  align-items: center;
  overflow-x: auto; /* Permite rolagem horizontal */
`;

const Table = styled.table`
  border-collapse: collapse; /* Garante que a tabela ocupe todo o espaço disponível */
  margin: 20px 0;
  background-color: #fff;
  border: 1px solid #ddd;
  width: 100%;
`;

const TableHeader = styled.thead`
  background-color: #f5f5f5;
  th {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
     /* Define uma largura mínima para as colunas */
  }
`;

const TableBody = styled.tbody`
  tr {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
  }

  td {
    padding: 8px;
    text-align: center;
    border: 1px solid #ddd;
    word-wrap: break-word; /* Quebra a palavra se necessário */
    white-space: nowrap; /* Impede a quebra de linha dentro da célula */
   // overflow: hidden; /* Esconde o excesso de conteúdo */
    text-overflow: ellipsis; /* Adiciona "..." se o conteúdo for maior que a célula */
  }

  /* Estilos específicos para presença e ausência */
  & .presence {
    color: green;
    font-weight: bold;
  }
 
  & .absence {
    color: red;
    font-weight: bold;
  }

  /* Ajustando a largura das células de status */
  & .status-cell { /* Definindo uma largura menor para as células de status */
  }

  /* Ajustando a largura da célula do nome do aluno */
  & .name-cell { /* Definindo uma largura mínima para a célula do nome */
  }
`;

export default function AttendanceList() {
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

  useEffect(() => {
    // Simula uma chamada ao backend para obter os dados de presença
    const fetchAttendanceData = async () => {
      const year = new Date().getFullYear().toString();
      const SelectbimonthlyDaily = JSON.parse(sessionStorage.getItem("Selectbimonthly-daily"));
      const SelectteacherDaily = JSON.parse(sessionStorage.getItem("Selectteacher-daily"));
      const SelectclassDaily = sessionStorage.getItem("Selectclass-daily");
      const idSchool = SelectteacherDaily.id_school;

      setid_teacher(SelectteacherDaily._id);
      setid_class(SelectclassDaily);

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
      }
    };

    fetchAttendanceData();
  }, [id_teacher, id_class, startd, startm, starty, endd, endm, endy]);

  // Função para mapear status de presença para cada aluno
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
    return <td className="status-cell">-</td>; // Caso não haja dado de presença para o aluno na data
  };

  // Extrair datas únicas
  const uniqueDates = [
    ...new Set(attendanceData.map((attendance) => `${attendance.day}/${attendance.month}`))
  ].sort((a, b) => {
    const [dayA, monthA] = a.split("/").map(Number);
    const [dayB, monthB] = b.split("/").map(Number);

    if (monthA !== monthB) return monthA - monthB; // Ordena primeiro pelo mês
    return dayA - dayB; // Depois ordena pelo dia
  });

  // Função para formatar data para exibição no formato DD/MM
  const formatDisplayDate = (date) => {
    const [day, month] = date.split("/");
    return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}`;
  };

  return (
    <AttendanceContainer>
      <h2>Lista de Presença</h2>
      <ContTable>
        <Table>
          <TableHeader>
            <tr>
              <th className="name-cell">Nome do Aluno</th>
              {uniqueDates.map((date, index) => (
                <th key={index}>{formatDisplayDate(date)}</th>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            {stdt.map((student) => (
              <tr key={student._id}>
                <td className="name-cell">{student.name}</td>
                {uniqueDates.map((date) => getAttendanceStatus(student._id, date))}
              </tr>
            ))}
          </TableBody>
        </Table>
      </ContTable>
    </AttendanceContainer>
  );
}
