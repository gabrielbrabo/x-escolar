// PrintableAttendanceSheet.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding-top: 2rem;
    padding-left: 0;
    padding-right: 0;
  }

  @media print {
    padding: 0;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 95vw;

  @media (min-width: 1200px) {
    max-width: 1200px;
  }

  @media print {
    width: 100%;
    max-width: 100%;
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 1rem;

  h1 {
    font-size: 1.2rem;
    margin: 0;
  }

  h2 {
    font-size: 1rem;
    margin: 0;
    font-weight: normal;
  }

  @media print {
    h1 {
      font-size: 1.1rem;
    }

    h2 {
      font-size: 0.9rem;
    }
  }
`;

const Title = styled.h2`
  text-align: center;
  margin: 1rem 0;
  font-size: 1.1rem;

  @media print {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;

  select {
    padding: 0.4rem;
    font-size: 0.9rem;
  }

  @media print {
    display: none;
  }
`;

const PrintButton = styled.button`
  background-color: #8000ff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: #a64dff;
  }

  @media print {
    display: none;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  @media print {
    overflow: visible;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
  margin: 0 auto;
  min-width: 700px;

  th, td {
    border: 1px solid #000;
    padding: 0.2rem;
    text-align: center;
    word-break: break-word;
  }

  th {
    background-color: #f0f0f0;
    font-size: 0.6rem;
  }

  td.name {
    text-align: left;
    font-weight: 500;
    font-size: 0.7rem;
    white-space: nowrap;
    max-width: 200px;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;

    th, td {
      padding: 0.2rem;
    }
  }

  @media print {
    font-size: 0.6rem;

    th, td {
      padding: 0.1rem;
    }

    td.name {
      font-size: 0.6rem;
    }

    @page {
      size: A4 landscape;
      margin: 1cm;
    }
  }
`;

const PrintableAttendanceSheet = () => {
  const location = useLocation();
  const students = location.state?.students || [];
  const schoolName = location.state?.schoolName || 'Nome da Escola';
  const teacherName = location.state?.teacherName;
  const className = location.state?.className || 'Nome da Turma';

  const readableteacher = teacherName?.map(c => c.name).join(', ') || '';

  const [month, setMonth] = useState(dayjs().month());
  const year = dayjs().year();

  const getDaysInMonth = () => {
    const days = [];
    const daysInMonth = dayjs(`${year}-${month + 1}-01`).daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* estilo inline para esconder elementos fora da impressão */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #print-area, #print-area * {
              visibility: visible;
            }
            #print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>

      <Container id="print-area">
        <ContentWrapper>
          <PrintButton onClick={handlePrint}>Imprimir</PrintButton>

          <Controls>
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
              {Array.from({ length: 12 }).map((_, idx) => (
                <option key={idx} value={idx}>
                  {dayjs().month(idx).format('MMMM')}
                </option>
              ))}
            </select>
            <select value={year} disabled>
              <option value={year}>{year}</option>
            </select>
          </Controls>

          <HeaderInfo>
            <span><strong>Escola:</strong> {schoolName}</span>
            <span><strong>Professor:</strong> {readableteacher}</span>
            <span><strong>Turma:</strong> {className}</span>
          </HeaderInfo>

          <Title>{dayjs().month(month).format('MMMM').toUpperCase()} / {year}</Title>

          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Aluno</th>
                  {getDaysInMonth().map(day => (
                    <th key={day} style={{ width: '20px', fontSize: '0.5rem' }}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student._id}>
                    <td className="name">{student.name}</td>
                    {getDaysInMonth().map(day => (
                      <td key={day}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default PrintableAttendanceSheet;
