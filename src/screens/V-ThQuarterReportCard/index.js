import React, { useState, useEffect } from 'react';
import {
  Container,
  List,
  Emp,
  ContainerDivs,
  DivAddEmp,
  AddEmp,
  DivDados,
  Grade,
  //SpanTotalGrade,
  SpanGradeStudent,
  //SpanAverageGrade,
  SpanNameMatter,
  DadosStdt,
  ToGoBack,
  SignMessageButtonText,
  SignMessageButtonTextBold,
  PrintButton,
  SpanFrequency,
  LegendBox,
} from './style';

import GlobalStyle from './style';

import { GetGrades, AttendanceBimonthly } from '../../Api';

import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../components/Loading';

const GradeIstquarter = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState([])
  const [stdtName, setStdtName] = useState([])
  const [teacherName, setTeacherName] = useState('')
  const [nameSchool, setNameSchool] = useState('')


  const [startd, setStartd] = useState('')
  const [startm, setStartm] = useState('')
  const [starty, setStarty] = useState('')
  const [endd, setEndd] = useState('')
  const [endm, setEndm] = useState('')
  const [endy, setEndy] = useState('')

  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [highlightedDaysF, setHighlightedDaysF] = React.useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const year = new Date().getFullYear();
      const bimonthly = '5º BIMESTRE'
      const id_student = sessionStorage.getItem("StudentInformation");
      const nameSchool = sessionStorage.getItem("School");
      const stdtName = sessionStorage.getItem("stdt-name");
      setStdtName(stdtName)
      setNameSchool(nameSchool)
      const resGrade = await GetGrades(year, bimonthly, id_student)
      setGrade(resGrade.data.data)
      console.log("resGrade", resGrade.data.data)

      if (resGrade) {
        const tchr = resGrade.data.data.map(res => res.id_teacher.name);
        const firstTeacher = tchr[0];  // Acessa o primeiro elemento
        console.log("firstTeacher", firstTeacher);
        setTeacherName(firstTeacher);  // Define apenas o primeiro elemento
      }

      if (resGrade && resGrade.data && Array.isArray(resGrade.data.data) && resGrade.data.data.length > 0) {
        const res = resGrade.data.data[0]; // Pega o primeiro item do array

        if (res && res.id_vThQuarter) {
          let startd = res.id_vThQuarter.startday || null;
          let startm = res.id_vThQuarter.startmonth || null;
          let starty = res.id_vThQuarter.startyear || null;

          let endd = res.id_vThQuarter.endday || null;
          let endm = res.id_vThQuarter.endmonth || null;
          let endy = res.id_vThQuarter.endyear || null;

          // Atualiza os estados apenas se os valores forem válidos
          setStartd(startd);
          setStartm(startm);
          setStarty(starty);

          setEndd(endd);
          setEndm(endm);
          setEndy(endy);
        } else {
          console.error("Dados de id_ivThQuarter estão faltando ou incompletos");
        }
      } else {
        console.error("resGrade está vazio ou malformado");
      }


      if (startd && startm && starty && endd && endm && endy && id_student) {
        try {
          const result = await AttendanceBimonthly(startd, startm, starty, endd, endm, endy, id_student);
          const data = result?.data?.data || [];

          // Verifique se os dados estão disponíveis e não estão vazios
          if (data.length > 0) {
            // Filtrando e mapeando as presenças (P)
            const attendance = data.filter(res => res.status === "P");

            // Filtrando e mapeando as faltas (F)
            const attendancef = data.filter(res => res.status === "F");

            // Garantir que as variáveis não sejam nulas ou indefinidas
            setHighlightedDays(attendance.length ? attendance : []);
            setHighlightedDaysF(attendancef.length ? attendancef : []);
          } else {
            console.warn("Nenhum dado de frequência disponível.");
          }

        } catch (error) {
          console.error("Erro ao obter dados de frequência", error);
        }
      }

      setLoading(false);
    })();

  }, [startd, startm, starty, endd, endm, endy]);

  const messageButtonClick = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  const countPresences = highlightedDays.length;
  const countAbsences = highlightedDaysF.length;

  return (
    <Container>
      <GlobalStyle /> {/* Adicionando estilos globais */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ContainerDivs>
            <PrintButton className="no-print" onClick={handlePrint}>
              Imprimir
            </PrintButton>
            <DivAddEmp id="containerDivs">
              <h2>Boletim</h2>
              <AddEmp>
                <h3>5º Bimestre</h3>
              </AddEmp>
              <DadosStdt>
                <span><strong>Escola:</strong> {nameSchool}</span>
                <span><strong>Professor:</strong> {teacherName}</span>
                <span><strong>Aluno:</strong> {stdtName}</span>
                <SpanFrequency>
                  <span><IoCheckmarkSharp color='#00fa00' font-size="30px" />Presenças: {countPresences} | <IoCloseSharp color='#ff050a' font-size="30px" />Ausências: {countAbsences}</span>
                </SpanFrequency>
                <LegendBox>
                  <h3>Legenda</h3>
                  <p><strong>A</strong> - Alcançou com êxito as capacidades básicas</p>
                  <p><strong>B</strong> - Alcançou satisfatoriamente as capacidades básicas</p>
                  <p><strong>C</strong> - Alcançou parcialmente as capacidades básicas</p>
                  <p><strong>D</strong> - Não alcançou as capacidades básicas</p>
                </LegendBox>
              </DadosStdt>
              <DivDados>
                <List>
                  {
                    grade.map(grd => (
                      <Emp
                        key={grd._id} >
                        <SpanNameMatter>{grd.id_matter.name}</SpanNameMatter>
                        <Grade>
                          {/*<SpanTotalGrade><p>Total</p>{grd.totalGrade}</SpanTotalGrade>
                          <SpanAverageGrade><p>Media</p>{grd.averageGrade}</SpanAverageGrade>*/}
                          <SpanGradeStudent grade={grd.studentGrade} average={grd.averageGrade}><p>Desempenho</p>{grd.studentGrade}</SpanGradeStudent>
                        </Grade>
                      </Emp>
                    ))
                  }
                </List>
              </DivDados>
            </DivAddEmp>
          </ContainerDivs>
          <ToGoBack onClick={messageButtonClick}>
            <SignMessageButtonText>Voltar para o</SignMessageButtonText>
            <SignMessageButtonTextBold>Perfil do Aluno</SignMessageButtonTextBold>
          </ToGoBack>
        </>
      )}
    </Container>
  )
}

export default GradeIstquarter