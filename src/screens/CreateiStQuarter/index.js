import React, { useState, useEffect } from 'react';
import {
  Container,
  ContainerDivs,
  DivAddEmp,
  AddEmp,
  Btt02,
  DivDados
} from './style';

import SelectorDate from '../../components/SelectorOnDate'

import LoadingSpinner from '../../components/Loading';

const HomeSchool = () => {

  const [loading, setLoading] = useState(true);
  const [startSelectedDate, setStartSelectedDate] = useState('')
  const [startday, setStartDay] = useState('')
  const [startmonth, setStartMonth] = useState('')
  const [startyear, setStartYear] = useState('')

  console.log("selecOnData", startday, startmonth, startyear)

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
              <p>Data de Fim: </p>
              <p>Nota Media: </p>
              <p>Nota Total: </p>
            </DivDados>
          </DivAddEmp>
          <Btt02 >Definir</Btt02>
        </ContainerDivs>
      )}
    </Container>
  )
}

export default HomeSchool