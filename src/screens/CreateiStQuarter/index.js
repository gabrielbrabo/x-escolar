import React, { useState, useEffect } from 'react';
import {
  Container,
  ContainerDivs,
  DivAddEmp,
  AddEmp,
  Btt02,
  DivDados,
  Input,
  ErrorMessage
} from './style';
import { RegisterIstQuarter, RegisterIstQuarter$grade } from '../../Api';

import { useNavigate } from 'react-router-dom';

import ResponsivePickers from '../../components/Datebimestre';

import LoadingSpinner from '../../components/Loading';

const HomeSchool = () => {

  const navigate = useNavigate()
  const year = new Date().getFullYear();
  const [id_school, setIdSchool] = useState('');
  const [assessmentFormat, setassessmentFormat] = useState('');
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
  const [errorMessage, setErrorMessage] = useState('');

  console.log("startselecOnData", startSelectedDate)
  console.log("endSelectedDate", endSelectedDate)
  //console.log("start end", totalGrade, averageGrade)

  useEffect(() => {
    (async () => {
      const idSchool = sessionStorage.getItem("id-school");
      const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
      setassessmentFormat($assessmentFormat)
      setIdSchool(JSON.parse(idSchool))
      setLoading(false);
    })();
  }, []);

  const setBimester = async () => {
    setLoading(true);
    console.log("teste ass", assessmentFormat)
    if (assessmentFormat === "grade") {
      const res = await RegisterIstQuarter$grade(
        year,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        totalGrade,
        averageGrade,
        id_school
      );

      if (res) {
        alert('Bimestre definido com sucesso')
        navigate(-1);;
      } else {
        setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    } else {
      const res = await RegisterIstQuarter(
        year,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        //totalGrade,
        //averageGrade,
        id_school
      );

      if (res) {
        alert('Bimestre definido com sucesso')
        navigate(-1);;
      } else {
        setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    }
    setLoading(false);
  };


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
              <ResponsivePickers
                setSelectedDateStart={setStartSelectedDate}
                setDayStart={setStartDay}
                setMonthStart={setStartMonth}
                setYearStart={setStartYear}
                setSelectedDateEnd={setEndSelectedDate}
                setDayEnd={setEndDay}
                setMonthEnd={setEndMonth}
                setYearEnd={setEndYear}
              />
              {assessmentFormat === "grade" &&
                <>
                  <p>Nota Total:
                    <Input
                      placeholder="Digite a Nota Total"
                      value={totalGrade}
                      onChange={(e) => {
                        let value = e.target.value.replace(".", ","); // Substitui ponto por vírgula
                        value = value.replace(/[^0-9,]/g, ""); // Permite apenas números e uma única vírgula

                        // Garante que tenha apenas uma vírgula e impede valores fora do intervalo
                        if ((value.match(/,/g) || []).length <= 1) {
                          const numericValue = parseFloat(value.replace(",", "."));
                          if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
                            setTotalGrade(value);
                          } else if (value === "") {
                            setTotalGrade("");
                          }
                        }
                      }}
                    />
                  </p>
                  <p>Nota Média:
                    <Input
                      placeholder="Digite a Nota Média"
                      value={averageGrade}
                      onChange={(e) => {
                        let value = e.target.value.replace(".", ","); // Substitui ponto por vírgula
                        value = value.replace(/[^0-9,]/g, ""); // Permite apenas números e uma única vírgula

                        // Garante que tenha apenas uma vírgula e impede valores fora do intervalo
                        if ((value.match(/,/g) || []).length <= 1) {
                          const numericValue = parseFloat(value.replace(",", "."));
                          if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
                            setAverageGrade(value);
                          } else if (value === "") {
                            setAverageGrade("");
                          }
                        }
                      }}
                    />
                  </p>

                </>
              }
            </DivDados>
          </DivAddEmp>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Btt02 onClick={setBimester}>Definir</Btt02>
        </ContainerDivs>
      )}
    </Container>
  )
}

export default HomeSchool