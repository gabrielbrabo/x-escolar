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
  SpanGradeStudent,
  SpanNameMatter,
  DadosStdt,
  ToGoBack,
  SignMessageButtonText,
  SignMessageButtonTextBold,
  PrintButton,
  SpanFrequency,
  LegendBox,
  DivBimTable,
  DivBimRow,
  DivBimHeader,
  DivBimCell,
  DivNameMatter
} from './style';

import GlobalStyle from './style';

import { getFinalConcepts, AttendanceFinalConcepts, indexGradesCard } from '../../Api';

import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

import { FcSurvey } from "react-icons/fc";

import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../components/Loading';

const FinalConcepts = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState([])
  const [stdtName, setStdtName] = useState([])
  const [teacherName, setTeacherName] = useState('')
  const [nameSchool, setNameSchool] = useState('')
  const [year, setyear] = useState('')
  const [id_teacher, setId_teacher] = useState('')
  const [id_student, setid_student] = useState('')

  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [highlightedDaysF, setHighlightedDaysF] = React.useState([]);
  const [highlightedDaysFJ, setHighlightedDaysFJ] = React.useState([]);

  const [iStQuarter, setiStQuarter] = useState([]);
  const [iiNdQuarter, setiiNdQuarter] = useState([]);
  const [iiiRdQuarter, setIIIrdQuarter] = useState([]);
  const [ivThQuarter, setIVthQuarter] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const year = new Date().getFullYear();
      //const bimonthly = '1º BIMESTRE'
      const id_student = sessionStorage.getItem("StudentInformation");
      const nameSchool = sessionStorage.getItem("School");
      const stdtName = sessionStorage.getItem("stdt-name");
      setStdtName(stdtName)
      setyear(year)
      setNameSchool(nameSchool)
      setid_student(id_student)
      const resGrade = await getFinalConcepts(year, id_student)
      setGrade(resGrade.data.data)
      console.log("resGrade", resGrade.data.data)

      if (resGrade.data.data) {
        const idTeacher = resGrade.data.data.map(res => {
          return res.id_class.classRegentTeacher
        })
        const Teacher = idTeacher[0];
        setId_teacher(Teacher)
        console.log("idTeacher", Teacher)
      }

      if (year && id_student) {
        const grades = await indexGradesCard(year, id_student)
        if (grades) {
          console.log("grades", grades.data.data);

          // Filtra os objetos para cada bimestre
          const firstQuarter = grades.data.data.filter(res => res.bimonthly === "1º BIMESTRE");
          const secondQuarter = grades.data.data.filter(res => res.bimonthly === "2º BIMESTRE");
          const thirdQuarter = grades.data.data.filter(res => res.bimonthly === "3º BIMESTRE");
          const fourthQuarter = grades.data.data.filter(res => res.bimonthly === "4º BIMESTRE");

          // Atualiza os estados com os arrays filtrados
          setiStQuarter(firstQuarter);
          setiiNdQuarter(secondQuarter);
          setIIIrdQuarter(thirdQuarter)
          setIVthQuarter(fourthQuarter)

          console.log("1º Bimestre", firstQuarter);
          console.log("2º Bimestre", secondQuarter);
        }
      }

      if (resGrade) {
        const allGrades = resGrade.data.data;

        // Verifica se há pelo menos uma matéria com o nome "EDUCAÇÃO FÍSICA"
        const hasPE = allGrades.some(res => res.id_matter.name === "EDUCAÇÃO FÍSICA");

        // Se tiver, move para o final; senão, mantém a ordem original
        const sortedResGrade = hasPE
          ? [
            ...allGrades.filter(res => res.id_matter.name !== "EDUCAÇÃO FÍSICA"),
            ...allGrades.filter(res => res.id_matter.name === "EDUCAÇÃO FÍSICA"),
          ]
          : allGrades;
        const tchr = sortedResGrade.map(res => res.id_employee.name);
        const firstTeacher = tchr[0];  // Acessa o primeiro elemento
        console.log("firstTeacher", firstTeacher);
        setTeacherName(firstTeacher);  // Define apenas o primeiro elemento
      }

      setLoading(false);
    })();

  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (year && id_student && id_teacher) {
        try {
          const result = await AttendanceFinalConcepts(year, id_student, id_teacher);
          console.log("result", result)
          const data = result?.data?.data || [];

          // Verifique se os dados estão disponíveis e não estão vazios
          if (data.length > 0) {
            // Filtrando e mapeando as presenças (P)
            const attendance = data.filter(res => res.status === "P");

            // Filtrando e mapeando as faltas (F)
            const attendancef = data.filter(res => res.status === "F");
            const attendancefj = data.filter(res => res.status === "FJ");

            // Garantir que as variáveis não sejam nulas ou indefinidas
            setHighlightedDays(attendance.length ? attendance : []);
            setHighlightedDaysF(attendancef.length ? attendancef : []);
            setHighlightedDaysFJ(attendancefj.length ? attendancefj : []);
          } else {
            console.warn("Nenhum dado de frequência disponível.");
          }
        } catch (error) {
          console.error("Erro ao obter dados de frequência", error);
        }
      }
    };

    fetchAttendance();
  }, [year, id_student, id_teacher]);



  const messageButtonClick = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  const countPresences = highlightedDays.length;
  const countAbsences = highlightedDaysF.length;
  const countjustifiedAbsence = highlightedDaysFJ.length;

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
                  <span><IoCheckmarkSharp color='#00fa00' font-size="30px" />Presenças: {countPresences} | <IoCloseSharp color='#ff050a' font-size="30px" />Faltas: {countAbsences}</span>
                  <span><FcSurvey font-size="25px" />Faltas justificada: {countjustifiedAbsence}</span>
                </SpanFrequency>
                <LegendBox>
                  <h3>Legenda</h3>
                  <p><strong style={{ color: '#1d7f14' }}>A</strong> - Alcançou com êxito as capacidades básicas</p>
                  <p><strong style={{ color: 'blue' }}>B</strong> - Alcançou satisfatoriamente as capacidades básicas</p>
                  <p><strong style={{ color: 'orange' }}>C</strong> - Alcançou parcialmente as capacidades básicas</p>
                  <p><strong style={{ color: 'red' }}>D</strong> - Não alcançou as capacidades básicas</p>
                </LegendBox>
              </DadosStdt>
              <DivDados>
                <List>
                  {
                    grade
                      .sort((a, b) => {
                        const nameA = a.id_matter.name.toUpperCase(); // Ignorar maiúsculas e minúsculas
                        const nameB = b.id_matter.name.toUpperCase();
                        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0; // Comparação alfabética
                      })
                      .map(grd => (
                        <Emp
                          key={grd._id} >
                          <DivNameMatter>
                            <SpanNameMatter>{grd.id_matter.name}</SpanNameMatter>
                          </DivNameMatter>
                          <Grade>
                            <DivBimTable>
                              <DivBimRow>
                                <DivBimHeader>1º Bim</DivBimHeader>
                                <DivBimCell grade={iStQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}>
                                  {iStQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}
                                </DivBimCell>
                              </DivBimRow>
                              <DivBimRow>
                                <DivBimHeader>2º Bim</DivBimHeader>
                                <DivBimCell grade={iiNdQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}>
                                  {iiNdQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}
                                </DivBimCell>
                              </DivBimRow>
                              <DivBimRow>
                                <DivBimHeader>3º Bim</DivBimHeader>
                                <DivBimCell grade={iiiRdQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}>
                                  {iiiRdQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}
                                </DivBimCell>
                              </DivBimRow>
                              <DivBimRow>
                                <DivBimHeader>4º Bim</DivBimHeader>
                                <DivBimCell grade={ivThQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}>
                                  {ivThQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}
                                </DivBimCell>
                              </DivBimRow>
                              <DivBimRow>
                                <DivBimHeader>Final</DivBimHeader>
                                <DivBimCell><SpanGradeStudent grade={grd.studentGrade}>{grd.studentGrade}</SpanGradeStudent></DivBimCell>
                              </DivBimRow>
                            </DivBimTable>
                            {/*<SpanTotalGrade><p>Total</p>{grd.totalGrade}</SpanTotalGrade>
                          <SpanAverageGrade><p>Media</p>{grd.averageGrade}</SpanAverageGrade>*/}
                            {/*<SpanGradeStudent grade={grd.studentGrade} /*average={grd.averageGrade}><p>Desempenho</p>{grd.studentGrade}</SpanGradeStudent>*/}
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