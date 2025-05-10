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
  //SpanGradeStudent,
  //SpanAverageGrade,
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

import { GetGrades, AttendanceBimonthly, indexGradesCard } from '../../Api';

import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

import { FcSurvey } from "react-icons/fc";

import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../components/Loading';

const GradeIstquarter = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState([])
  const [stdtName, setStdtName] = useState([])
  const [teacherName, setTeacherName] = useState('')
  const [nameSchool, setNameSchool] = useState('')
  const [id_teacher, setId_teacher] = useState('')
  const [id_student, setid_student] = useState('')


  const [startd, setStartd] = useState('')
  const [startm, setStartm] = useState('')
  const [starty, setStarty] = useState('')
  const [endd, setEndd] = useState('')
  const [endm, setEndm] = useState('')
  const [endy, setEndy] = useState('')

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
      const bimonthly = '3º BIMESTRE'
      const id_student = sessionStorage.getItem("StudentInformation");
      const nameSchool = sessionStorage.getItem("School");
      const stdtName = sessionStorage.getItem("stdt-name");
      setStdtName(stdtName)
      setNameSchool(nameSchool)
      setid_student(id_student)
      const resGrade = await GetGrades(year, bimonthly, id_student)
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

          //console.log("1º Bimestre", firstQuarter);
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

        const tchr = sortedResGrade.map(res => res.id_teacher.name);
        const firstTeacher = tchr[0];  // Acessa o primeiro elemento
        console.log("firstTeacher", firstTeacher);
        setTeacherName(firstTeacher);  // Define apenas o primeiro elemento
      }

      if (resGrade && resGrade.data && Array.isArray(resGrade.data.data) && resGrade.data.data.length > 0) {
        const res = resGrade.data.data[0]; // Pega o primeiro item do array

        if (res && res.id_iiiRdQuarter) {
          let startd = res.id_iiiRdQuarter.startday || null;
          let startm = res.id_iiiRdQuarter.startmonth || null;
          let starty = res.id_iiiRdQuarter.startyear || null;

          let endd = res.id_iiiRdQuarter.endday || null;
          let endm = res.id_iiiRdQuarter.endmonth || null;
          let endy = res.id_iiiRdQuarter.endyear || null;

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

      setLoading(false);
    })();

  }, [startd, startm, starty, endd, endm, endy]);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (startd && startm && starty && endd && endm && endy && id_student && id_teacher) {
        try {
          const result = await AttendanceBimonthly(startd, startm, starty, endd, endm, endy, id_student, id_teacher);
          const data = result?.data?.data || [];

          if (data.length > 0) {
            const attendance = data.filter(res => res.status === "P");
            const attendancef = data.filter(res => res.status === "F");
            const attendancefj = data.filter(res => res.status === "FJ");

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
  }, [startd, startm, starty, endd, endm, endy, id_student, id_teacher]);



  const messageButtonClick = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  const countPresences = highlightedDays.length;
  const countAbsences = highlightedDaysF.length;
  const countjustifiedAbsence = highlightedDaysFJ.length;

  console.log("countAbsences", highlightedDaysF);

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
                <h3>3º Bimestre</h3>
              </AddEmp>
              <DadosStdt>
                <span><strong>Escola:</strong> {nameSchool}</span>
                <span><strong>Professor:</strong> {teacherName}</span>
                <span><strong>Aluno:</strong> {stdtName}</span>
                <SpanFrequency>
                  <span><IoCheckmarkSharp color='#00fa00' font-size="30px" />Presenças: {countPresences} | <IoCloseSharp color='#ff050a' font-size="30px" />Faltas: {countAbsences}</span>
                  <span><FcSurvey font-size="25px" />Faltas Justificadas: {countjustifiedAbsence}</span>
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

export default GradeIstquarter