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

import { GetNumGrade, AttendanceBimonthly, indexNumericalGradesCard, GetLogo } from '../../Api';

import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../components/Loading';

const GradeIstquarter = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState([])
  const [grade, setGrade] = useState([])
  const [stdtName, setStdtName] = useState([])
  const [teacherName, setTeacherName] = useState('')
  const [nameSchool, setNameSchool] = useState('')
  const [id_teacher, setId_teacher] = useState('')
  const [id_student, setid_student] = useState('')

  const [totalGrade, setTotalGrade] = useState([]);
  const [averageGrade, setAverageGrade] = useState([]);

  const [startd, setStartd] = useState('')
  const [startm, setStartm] = useState('')
  const [starty, setStarty] = useState('')
  const [endd, setEndd] = useState('')
  const [endm, setEndm] = useState('')
  const [endy, setEndy] = useState('')


  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [highlightedDaysF, setHighlightedDaysF] = React.useState([]);

  //const [iStQuarter, setiStQuarter] = useState([]);
  ////const [iiNdQuarter, setiiNdQuarter] = useState([]);
  ////const [iiiRdQuarter, setIIIrdQuarter] = useState([]);
  ////const [ivThQuarter, setIVthQuarter] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const year = new Date().getFullYear();
      const bimonthly = '1º BIMESTRE'
      const id_student = sessionStorage.getItem("StudentInformation");
      const nameSchool = sessionStorage.getItem("School");
      const stdtName = sessionStorage.getItem("stdt-name");
      const idlogo = sessionStorage.getItem("id_logo");
      setStdtName(stdtName)
      setNameSchool(nameSchool)
      setid_student(id_student)

      if (idlogo && /^[0-9a-fA-F]{24}$/.test(idlogo)) {
        const logo = await GetLogo(idlogo);
        if (logo?.data?.Logo?.url) {
          console.log('getlogo', logo.data.Logo.url);
          setLogo(logo.data.Logo.url);
        }
      } else {
        console.error("idlogo inválido:", idlogo);
      }

      const resGrade = await GetNumGrade(year, bimonthly, id_student)
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
        const grades = await indexNumericalGradesCard(year, id_student)
        if (grades) {
          console.log("grades", grades.data.data);

          // Filtra os objetos para cada bimestre
          //const firstQuarter = grades.data.data.filter(res => res.bimonthly === "1º BIMESTRE");
          //const secondQuarter = grades.data.data.filter(res => res.bimonthly === "2º BIMESTRE");
          //const thirdQuarter = grades.data.data.filter(res => res.bimonthly === "3º BIMESTRE");
          //const fourthQuarter = grades.data.data.filter(res => res.bimonthly === "4º BIMESTRE");

          // Atualiza os estados com os arrays filtrados
          //setiStQuarter(firstQuarter);
          //setiiNdQuarter(secondQuarter);
          //setIIIrdQuarter(thirdQuarter)
          //setIVthQuarter(fourthQuarter)

          //console.log("1º Bimestre", firstQuarter);
          //console.log("2º Bimestre", secondQuarter);
        }
      }

      if (resGrade) {
        const tchr = resGrade.data.data.map(res => res.id_teacher.name);
        const firstTeacher = tchr[0];  // Acessa o primeiro elemento
        console.log("firstTeacher", firstTeacher);
        setTeacherName(firstTeacher);  // Define apenas o primeiro elemento
      }
      if (resGrade && resGrade.data && Array.isArray(resGrade.data.data) && resGrade.data.data.length > 0) {
        const res = resGrade.data.data[0]; // Pega o primeiro item do array

        if (res && res.id_iStQuarter) {

          console.log('totalGrade', res.id_iStQuarter.totalGrade)
          console.log('averageGrade', res.id_iStQuarter.averageGrade)

          const tg = res.id_iStQuarter.totalGrade.replace(',', '.')
          const ag = res.id_iStQuarter.averageGrade.replace(',', '.')

          setTotalGrade(tg)
          setAverageGrade(ag)


          let startd = res.id_iStQuarter.startday || null;
          let startm = res.id_iStQuarter.startmonth || null;
          let starty = res.id_iStQuarter.startyear || null;

          let endd = res.id_iStQuarter.endday || null;
          let endm = res.id_iStQuarter.endmonth || null;
          let endy = res.id_iStQuarter.endyear || null;

          // Atualiza os estados apenas se os valores forem válidos
          setStartd(startd);
          setStartm(startm);
          setStarty(starty);

          setEndd(endd);
          setEndm(endm);
          setEndy(endy);
        } else {
          console.error("Dados de id_iStQuarter estão faltando ou incompletos");
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

            setHighlightedDays(attendance.length ? attendance : []);
            setHighlightedDaysF(attendancef.length ? attendancef : []);
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


  console.log("startd", startd);
  console.log("startm", startm);
  console.log("starty", starty);
  console.log("endd", endd);
  console.log("endm", endm);
  console.log("endy", endy);

  const messageButtonClick = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  const countPresences = highlightedDays.length;
  const countAbsences = highlightedDaysF.length;

  console.log('GetNumGrade', grade)

  const groupedGrades = grade.reduce((acc, grd) => {
    // Verifica se a matéria já existe no acumulador
    const existingMatter = acc.find(item => item.id_matter === grd.id_matter._id);

    if (!existingMatter) {
      // Se a matéria não existir no acumulador, adicionamos ela
      acc.push({
        id_matter: grd.id_matter._id,
        matterName: grd.id_matter.name,
        grade: 0,  // Inicializa a soma das notas
      });
    }

    // Somando as notas, garantindo que sejam números (usando parseFloat)
    const totalGradeForMatter = parseFloat(grd.studentGrade) || 0;

    // Atualiza a soma das notas para a matéria no acumulador
    const updatedMatter = acc.find(item => item.id_matter === grd.id_matter._id);
    if (updatedMatter) {
      updatedMatter.grade += totalGradeForMatter;
    }

    return acc;
  }, []);

  console.log("groupedGrades", groupedGrades)
  return (
    <Container>
      <GlobalStyle /> {/* Adicionando estilos globais */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ContainerDivs>
            {
              logo.length > 0 && (
                <img src={logo} alt="Imagem" />
              )
            }

            <PrintButton className="no-print" onClick={handlePrint}>
              Imprimir
            </PrintButton>
            <DivAddEmp id="containerDivs">
              <h2>Boletim</h2>
              <AddEmp>
                <h3>1º Bimestre</h3>
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
                  <p>Nota Total: <strong style={{ color: '#1d7f14' }}>{totalGrade}</strong></p>
                  <p>Nota Média: <strong style={{ color: 'blue' }}>{averageGrade}</strong></p>
                </LegendBox>
              </DadosStdt>
              <DivDados>
                <List>
                  {
                    groupedGrades
                      .sort((a, b) => {
                        const nameA = a.id_matter.name;// Ignorar maiúsculas e minúsculas
                        const nameB = b.id_matter.name;
                        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0; // Comparação alfabética
                      })
                      .map(grd => (
                        <Emp
                          key={grd._id} >
                          <DivNameMatter>
                            <SpanNameMatter>{grd.matterName}</SpanNameMatter>
                          </DivNameMatter>
                          <Grade>
                            <DivBimTable>
                              <DivBimRow>
                                <DivBimHeader>1º Bim</DivBimHeader>
                                <DivBimCell
                                  grade={parseFloat(grd.grade) || 0}  // Garantir que é um número válido, senão 0
                                  averageGrade={parseFloat(averageGrade) || 0}  // Garantir que a média é válida
                                  totalGrade={parseFloat(totalGrade) || 0}  // Garantir que o total é válido
                                >
                                  {console.log('resultIndex', grd.grade, averageGrade, totalGrade)}
                                  {grd.grade || "N/A"}
                                </DivBimCell>
                              </DivBimRow>
                              <DivBimRow>
                                <DivBimHeader>2º Bim</DivBimHeader>
                                <DivBimCell /*grade={iiNdQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}*/>
                                  {/*iiNdQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade ||*/ "N/A"}
                                </DivBimCell>
                              </DivBimRow>
                              <DivBimRow>
                                <DivBimHeader>3º Bim</DivBimHeader>
                                <DivBimCell /*grade={iiiRdQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}*/>
                                  {/*iiiRdQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade ||*/ "N/A"}
                                </DivBimCell>
                              </DivBimRow>
                              <DivBimRow>
                                <DivBimHeader>4º Bim</DivBimHeader>
                                <DivBimCell /*grade={ivThQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}*/>
                                  {/*ivThQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade ||*/ "N/A"}
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