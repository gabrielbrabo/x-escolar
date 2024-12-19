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

import { getFinalConcepts, AttendanceFinalConcepts } from '../../Api';

import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../components/Loading';

const FinalConcepts = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState([])
  const [stdtName, setStdtName] = useState([])
  const [teacherName, setTeacherName] = useState('')
  const [nameSchool, setNameSchool] = useState('')

  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [highlightedDaysF, setHighlightedDaysF] = React.useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const year = new Date().getFullYear();
      //const bimonthly = '1º BIMESTRE'
      const id_student = sessionStorage.getItem("StudentInformation");
      const nameSchool = sessionStorage.getItem("School");
      const stdtName = sessionStorage.getItem("stdt-name");
      setStdtName(stdtName)
      setNameSchool(nameSchool)
      const resGrade = await getFinalConcepts(year, id_student)
      setGrade(resGrade.data.data)
      console.log("resGrade", resGrade.data.data)

      if (resGrade) {
        const tchr = resGrade.data.data.map(res => res.id_employee.name);
        const firstTeacher = tchr[0];  // Acessa o primeiro elemento
        console.log("firstTeacher", firstTeacher);
        setTeacherName(firstTeacher);  // Define apenas o primeiro elemento
      }

      const result = await AttendanceFinalConcepts(year, id_student);
      console.log("result", result)
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

      setLoading(false);
    })();

  }, []);


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
                <h3>Resultado Final</h3>
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
                          <SpanGradeStudent grade={grd.studentGrade} /*average={grd.averageGrade}*/><p>Desempenho</p>{grd.studentGrade}</SpanGradeStudent>
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

export default FinalConcepts