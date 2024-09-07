import React, { useState, useEffect } from 'react';
import {
  Container,
  ContainerDivs,
  DivAddEmp,
  AddEmp,
  Btt02,
  DivDados,
  Input,
} from './style';

import SelectorDate from '../../components/SelectorOnDate'

import LoadingSpinner from '../../components/Loading';

const HomeSchool = () => {

  const [loading, setLoading] = useState(true);
  const [startSelectedDate, setStartSelectedDate] = useState('')
  const [startday, setStartDay] = useState('')
  const [startmonth, setStartMonth] = useState('')
  const [startyear, setStartYear] = useState('')
  const [endSelectedDate, setEndSelectedDate] = useState('')
  const [endday, setEndDay] = useState('')
  const [endmonth, setEndMonth] = useState('')
  const [endyear, setEndYear] = useState('')
  const [totalGrade, setTotalGrade] = useState('')
  const [averageGrade, setAverageGrade] = useState('')

  console.log("startselecOnData", startday, startmonth, startyear)
  console.log("endselecOnData", endday, endmonth, endyear)
  console.log("start end", totalGrade, averageGrade)

  useEffect(() => {
    (async () => {
      //const idSchool = sessionStorage.getItem("id-school");

      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ContainerDivs>
          <h2>Calendario Anual</h2>
          <DivAddEmp>
            <AddEmp>
              <h3>1º Bimestre</h3>
            </AddEmp>
            <DivDados>
              <p>Data de Inicio:
                <SelectorDate
                  setDay={setStartDay}
                  setMonth={setStartMonth}
                  setYear={setStartYear}
                  setSelectedDate={setStartSelectedDate}
                />
              </p>
              <p>Data de Fim:
                <SelectorDate
                  setDay={setEndDay}
                  setMonth={setEndMonth}
                  setYear={setEndYear}
                  setSelectedDate={setEndSelectedDate}
                />
              </p>
              <p>Nota Total:
                <Input
                  placeholder="Digite a Nota Total"
                  value={totalGrade}
                  onChange={(e) => setTotalGrade(e.target.value)}
                  type='number'
                />
              </p>
              <p>Nota Media:
                <Input
                  placeholder="Digite a Nota Media"
                  value={averageGrade}
                  onChange={(e) => setAverageGrade(e.target.value)}
                  type='number'
                />
              </p>
            </DivDados>
          </DivAddEmp>
          <Btt02 >Definir</Btt02>
        </ContainerDivs>
      )}
    </Container>
  )
}

export default HomeSchool