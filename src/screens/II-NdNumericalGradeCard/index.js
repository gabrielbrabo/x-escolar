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
  DivNameMatter,
  DivSignatureArea,
  SignatureBlock,
  Line,
  Label,
  Preview,
  ContLogo,
  LegendContainer,
  LegendColors,
  InfoContainer,
  UpContainer
} from './style';

import GlobalStyle from './style';

import { GetNumGrade, AttendanceBimonthly, indexNumericalGradesCard, GetLogo, getIstQuarter, fetchLogo } from '../../Api';

import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

import { FcSurvey } from "react-icons/fc";

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
  const [logoUrl, setLogoUrl] = useState('');
  const [id_teacher, setId_teacher] = useState('')
  const [id_student, setid_student] = useState('')

  const [totalGrade, setTotalGrade] = useState([]);
  const [averageGrade, setAverageGrade] = useState([]);
  const [totalGradeIst, setTotalGradeIst] = useState([]);
  const [averageGradeIst, setAverageGradeIst] = useState([]);

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
  // const [iiNdQuarter, setiiNdQuarter] = useState([]);
  ////const [iiiRdQuarter, setIIIrdQuarter] = useState([]);
  ////const [ivThQuarter, setIVthQuarter] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const year = new Date().getFullYear();
      const idSchool = JSON.parse(sessionStorage.getItem("id-school"));
      const IstQuarter = await getIstQuarter(year, idSchool)

      const tgIst = await IstQuarter.data.data.map(res => {
        return res.totalGrade.replace(',', '.')
      })
      const agIst = await IstQuarter.data.data.map(res => {
        return res.averageGrade.replace(',', '.')
      })
      setTotalGradeIst(tgIst)
      setAverageGradeIst(agIst)
      const bimonthly = '2º BIMESTRE'
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
        //setId_teacher(Teacher)
        console.log("idTeacher", Teacher)
      }

      if (year && id_student) {
        const grades = await indexNumericalGradesCard(year, id_student)
        if (grades) {
          console.log("grades", grades.data.data);

          // Filtra os objetos para cada bimestre
          const firstQuarter = grades.data.data.filter(res => res.bimonthly === "1º BIMESTRE");
          //const secondQuarter = grades.data.data.filter(res => res.bimonthly === "2º BIMESTRE");
          //const thirdQuarter = grades.data.data.filter(res => res.bimonthly === "3º BIMESTRE");
          //const fourthQuarter = grades.data.data.filter(res => res.bimonthly === "4º BIMESTRE");

          // Atualiza os estados com os arrays filtrados
          console.log("firstQuarter", firstQuarter)
          setiStQuarter(firstQuarter);
          //setiiNdQuarter(secondQuarter);
          //setIIIrdQuarter(thirdQuarter)
          //setIVthQuarter(fourthQuarter)

          //console.log("1º Bimestre", firstQuarter);
          //console.log("2º Bimestre", secondQuarter);
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
        const idTchr = sortedResGrade.map(res => res.id_teacher._id);
        setId_teacher(idTchr[0]);
        const firstTeacher = tchr[0];  // Acessa o primeiro elemento
        console.log("firstTeacher", firstTeacher);
        setTeacherName(firstTeacher);  // Define apenas o primeiro elemento
      }
      if (resGrade && resGrade.data && Array.isArray(resGrade.data.data) && resGrade.data.data.length > 0) {
        const res = resGrade.data.data[0]; // Pega o primeiro item do array

        if (res && res.id_iiNdQuarter) {

          console.log('totalGrade', res.id_iiNdQuarter.totalGrade)
          console.log('averageGrade', res.id_iiNdQuarter.averageGrade)

          const tg = res.id_iiNdQuarter.totalGrade.replace(',', '.')
          const ag = res.id_iiNdQuarter.averageGrade.replace(',', '.')

          setTotalGrade(tg)
          setAverageGrade(ag)


          let startd = res.id_iiNdQuarter.startday || null;
          let startm = res.id_iiNdQuarter.startmonth || null;
          let starty = res.id_iiNdQuarter.startyear || null;

          let endd = res.id_iiNdQuarter.endday || null;
          let endm = res.id_iiNdQuarter.endmonth || null;
          let endy = res.id_iiNdQuarter.endyear || null;

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
      const cachedLogo = localStorage.getItem(`school-logo-${idSchool}`);
      //const cachedLogoId = localStorage.getItem(`school-logo-id-${idSchool}`);

      if (cachedLogo) {
        console.log('busca pelo storage local')
        setLogoUrl(cachedLogo);
        //setlogoId(cachedLogoId);
      } else {

        console.log('busca no s3')
        const logoRes = await fetchLogo(idSchool);

        console.log('busca logo', logoRes)
        if (logoRes?.url) {
          setLogoUrl(logoRes.url);
          //setlogoId(logoRes._id);
          localStorage.setItem(`school-logo-${idSchool}`, logoRes.url);
          localStorage.setItem(`school-logo-id-${idSchool}`, logoRes._id);

        }
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
  const countjustifiedAbsence = highlightedDaysFJ.length;

  const groupedGrades = grade.reduce((acc, grd) => {
    // Verifica se a matéria já existe no acumulador
    const existingMatter = acc.find(item => item.id_matter === grd.id_matter._id);

    if (!existingMatter) {
      // Se a matéria não existir no acumulador, adicionamos ela
      acc.push({
        idActivity: grd.idActivity,
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

  const groupedGradesIst = iStQuarter.reduce((acc, grd) => {
    // Verifica se a matéria já existe no acumulador
    const existingMatter = acc.find(item => item.id_matter === grd.id_matter._id);

    if (!existingMatter) {
      // Se a matéria não existir no acumulador, adicionamos ela
      acc.push({
        idActivity: grd.idActivity,
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

  console.log('iStQuarter', iStQuarter)
  console.log('groupedGradesIst', groupedGradesIst)
  console.log('groupedGrades', groupedGrades)
  console.log('grade', grade)

  return (
    <Container>
      <GlobalStyle /> {/* Adicionando estilos globais */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ContainerDivs>
            <div className="no-print">
              <h3>Atenção antes de imprimir</h3>
              <p>
                Caso o boletim possua muitas matérias e não caiba totalmente em uma única folha,
                diminua a <strong>escala de impressão</strong> nas configurações da impressora.
                Sugestão: <strong>90%</strong>, <strong>85%</strong> ou <strong>80%</strong>.
              </p>
            </div>
            {
              logo.length > 0 && (
                <img src={logo} alt="Imagem" />
              )
            }

            <PrintButton className="no-print" onClick={handlePrint}>
              Imprimir
            </PrintButton>
            <DivAddEmp id="containerDivs">
              <ContLogo>
                {(logoUrl) && (
                  <Preview src={logoUrl} alt="Logo da escola" />
                )}
                <h2>Boletim</h2>
              </ContLogo>
              <AddEmp>
                <h3>2º Bimestre</h3>
              </AddEmp>
              <DadosStdt>
                <UpContainer>
                  <InfoContainer>
                    <span><strong>Escola:</strong> {nameSchool}</span>
                    <span><strong>Professor:</strong> {teacherName}</span>
                    <span><strong>Aluno:</strong> {stdtName}</span>
                  </InfoContainer>
                  <SpanFrequency>
                    <span><IoCheckmarkSharp color='#00fa00' font-size="30px" />Presenças: {countPresences} | <IoCloseSharp color='#ff050a' font-size="30px" />Faltas: {countAbsences}</span>
                    <span><FcSurvey font-size="25px" />Faltas Justificadas: {countjustifiedAbsence}</span>
                  </SpanFrequency>
                </UpContainer>
                <LegendContainer>
                  <LegendBox>
                    {/*<h3>Legenda</h3>*/}
                    <p>
                      Nota Total:{" "}
                      <strong style={{ color: '#1d7f14' }}>
                        {parseFloat(totalGrade).toFixed(1)}
                      </strong>
                    </p>
                    <p>
                      Nota Média:{" "}
                      <strong style={{ color: 'blue' }}>
                        {parseFloat(averageGrade).toFixed(1)}
                      </strong>
                    </p>
                  </LegendBox>

                  <LegendColors>
                    <div><span className="red-box" />Notas abaixo da média</div>
                    <div><span className="blue-box" />Notas iguais ou superiores a média</div>
                    <div><span className="green-box" />Notas iguais ou superiores a 90% da nota total</div>
                    <div><span className="history-box" />Nota proveniente de histórico escolar (outra instituição)</div>
                  </LegendColors>
                </LegendContainer>
              </DadosStdt>
              <DivDados>
                <List>
                  {
                    groupedGrades
                      .sort((a, b) => {
                        const nameA = a.matterName;// Ignorar maiúsculas e minúsculas
                        const nameB = b.matterName;
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
                                  grade={
                                    groupedGradesIst.find(res => String(res.id_matter) === String(grd.id_matter))?.grade || 0
                                  }
                                  averageGrade={parseFloat(averageGradeIst) || 0}
                                  totalGrade={parseFloat(totalGradeIst) || 0}
                                >
                                  {groupedGradesIst
                                    .filter(res => String(res.id_matter) === String(grd.id_matter))
                                    .map(res => {
                                      const gradeValue = parseFloat(res.grade?.toString().replace(',', '.'));
                                      const isHistory = !res.idActivity;
                                      if (isNaN(gradeValue)) return "-";

                                      return (
                                        <span
                                          key={res._id}
                                          style={{ color: isHistory ? '#7A6F9B' : 'inherit' }}
                                        >
                                          {gradeValue.toFixed(1)}
                                        </span>
                                      )
                                    })}
                                </DivBimCell>
                              </DivBimRow>
                              <DivBimRow>
                                <DivBimHeader>2º Bim</DivBimHeader>
                                <DivBimCell
                                  grade={parseFloat(grd.grade) || 0}  // Garantir que é um número válido, senão 0
                                  averageGrade={parseFloat(averageGrade) || 0}  // Garantir que a média é válida
                                  totalGrade={parseFloat(totalGrade) || 0}  // Garantir que o total é válido
                                >
                                  {grd.grade !== undefined && grd.grade !== null ? (
                                    <span style={{ color: !grd.idActivity ? '#7A6F9B' : 'inherit' }}>
                                      {parseFloat(grd.grade).toFixed(1)}
                                    </span>
                                  ) : (
                                    "-"
                                  )}
                                </DivBimCell>
                              </DivBimRow>
                              <DivBimRow>
                                <DivBimHeader>3º Bim</DivBimHeader>
                                <DivBimCell /*grade={iiiRdQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}*/>
                                  {/*iiiRdQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade ||*/ "-"}
                                </DivBimCell>
                              </DivBimRow>
                              <DivBimRow>
                                <DivBimHeader>4º Bim</DivBimHeader>
                                <DivBimCell /*grade={ivThQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade || "N/A"}*/>
                                  {/*ivThQuarter.find((q) => q.id_matter === grd.id_matter._id)?.studentGrade ||*/ "-"}
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
              {/* Espaço para assinatura do Professor e dos Pais */}
              <DivSignatureArea>
                <SignatureBlock>
                  <Line />
                  <Label>Assinatura do Professor</Label>
                </SignatureBlock>

                <SignatureBlock>
                  <Line />
                  <Label>Assinatura dos Pais ou Responsável</Label>
                </SignatureBlock>
              </DivSignatureArea>
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