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
import { RegisterIIIrdQuarter, RegisterIIIrdQuarter$grade, getSchoolYear } from '../../Api';

import { useNavigate } from 'react-router-dom';

import ResponsivePickers from '../../components/Datebimestre';

import LoadingSpinner from '../../components/Loading';

const HomeSchool = () => {

  const navigate = useNavigate()
  //const year = new Date().getFullYear();
  const [year, setyear] = useState('');
  const [id_school, setIdSchool] = useState('');
  const [assessmentFormat, setassessmentFormat] = useState('');
  const [assessmentRegime, setAssessmentRegime] = useState('');
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
  const [schoolDays, setSchoolDays] = useState([]);

  console.log("startselecOnData", startSelectedDate)
  console.log("endSelectedDate", endSelectedDate)
  //console.log("start end", totalGrade, averageGrade)

  useEffect(() => {
    (async () => {
      const idSchool = sessionStorage.getItem("id-school");
      const schoolYear = await getSchoolYear(JSON.parse(idSchool))
      setyear(schoolYear.data.data)
      const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
      setassessmentFormat($assessmentFormat)
      setAssessmentRegime(sessionStorage.getItem('assessmentRegime'))
      setIdSchool(JSON.parse(idSchool))
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (startday && startmonth && startyear && endday && endmonth && endyear) {
      const start = new Date(startyear, startmonth - 1, startday);
      const end = new Date(endyear, endmonth - 1, endday);

      const generatedDays = generateSchoolDays(start, end);
      setSchoolDays(generatedDays);
    }
  }, [startday, startmonth, startyear, endday, endmonth, endyear]);

  const generateSchoolDays = (start, end) => {
    const days = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      //const dayOfWeek = currentDate.getDay(); // 0 = domingo, 6 = sábado

      days.push({
        date: new Date(currentDate),
        isSchoolDay: false,
        description: ''
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const onlySchoolDays = schoolDays.filter(day => day.isSchoolDay);

  const setBimester = async () => {
    setErrorMessage('');

    // Verificação de campos obrigatórios
    if (
      !year || !startday || !startmonth || !startyear ||
      !endday || !endmonth || !endyear || !id_school || !onlySchoolDays
    ) {
      setErrorMessage('Preencha todos os campos obrigatórios do bimestre.');
      return;
    }

    // Validação adicional se for formato de nota
    if (assessmentFormat === "grade") {
      if (!totalGrade || !averageGrade) {
        setErrorMessage('Informe a nota total e a média para o bimestre.');
        return;
      }
    }

    setLoading(true);
    console.log("teste ass", assessmentFormat)
    if (assessmentFormat === "grade") {
      const res = await RegisterIIIrdQuarter$grade(
        year,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        totalGrade,
        averageGrade,
        id_school,
        assessmentRegime,
        onlySchoolDays
      );

      if (res) {
        alert('Bimestre definido com sucesso')
        navigate(-1);;
      } else {
        setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    } else {
      const res = await RegisterIIIrdQuarter(
        year,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        //totalGrade,
        //averageGrade,
        id_school,
        assessmentRegime,
        onlySchoolDays
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
          {/*<h2>Calendario Anual</h2>*/}
          <DivAddEmp>
            <AddEmp>
              {assessmentRegime === 'BIMESTRAL' && (
                <h3>3º Bimestre</h3>
              )}
              {assessmentRegime === 'TRIMESTRAL' && (
                <h3>3º Trimestre</h3>
              )}
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
              <div style={{ marginTop: 20, width: '100%' }}>
                <h4 style={{ marginBottom: 12 }}>Dias Letivos</h4>

                <div
                  style={{
                    maxHeight: 300,
                    overflowY: 'auto',
                    border: '1px solid #ddd',
                    borderRadius: 6,
                    padding: 10,
                    background: '#fafafa'
                  }}
                >
                  {schoolDays.map((day, index) => (
                    <label
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '6px 8px',
                        borderRadius: 4,
                        cursor: 'pointer',
                        background: day.isSchoolDay ? '#e6f4ea' : 'transparent'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={day.isSchoolDay}
                        onChange={() => {
                          const updatedDays = [...schoolDays];
                          updatedDays[index].isSchoolDay = !updatedDays[index].isSchoolDay;
                          setSchoolDays(updatedDays);
                        }}
                      />

                      <span style={{ flex: 1 }}>
                        {new Date(day.date).toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
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