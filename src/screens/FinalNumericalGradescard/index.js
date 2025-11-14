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
  //SpanGradeStudent,
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
  Preview,
  ContLogo,
  LegendContainer,
  LegendColors,
  InfoContainer,
  UpContainer
} from './style';

import GlobalStyle from './style';

import { GetNumGrade, AttendanceFinalConcepts, indexNumericalGradesCard, getIstQuarter, getIIndQuarter, getIIIrdQuarter, getIVthQuarter, fetchLogo } from '../../Api';

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
  const [logoUrl, setLogoUrl] = useState('');
  const [year, setyear] = useState('')
  const [id_teacher, setId_teacher] = useState('')
  const [id_student, setid_student] = useState('')

  const [totalGrade, setTotalGrade] = useState([]);
  const [averageGrade, setAverageGrade] = useState([]);

  const [totalGradeIst, setTotalGradeIst] = useState([]);
  const [averageGradeIst, setAverageGradeIst] = useState([]);
  const [totalGradeIInd, setTotalGradeIInd] = useState([]);
  const [averageGradeIInd, setAverageGradeIInd] = useState([]);
  const [totalGradeIIIrd, setTotalGradeIIIrd] = useState([]);
  const [averageGradeIIIrd, setAverageGradeIIIrd] = useState([]);
  const [totalGradeIVth, setTotalGradeIVth] = useState([]);
  const [averageGradeIVth, setAverageGradeIVth] = useState([]);
  //const [totalGradeAnnual, setTotalGradeAnnual] = useState([]);
  //const [averageGradeAnnual, setAverageGradeAnnual] = useState([]);

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
      const idSchool = JSON.parse(sessionStorage.getItem("id-school"));

      const IstQuarter = await getIstQuarter(year, idSchool);
      const tgIst = IstQuarter.data.data.reduce((sum, res) => sum + Number(res.totalGrade || 0), 0);
      const agIst = IstQuarter.data.data.reduce((sum, res) => sum + Number(res.averageGrade || 0), 0);
      setTotalGradeIst(tgIst);
      setAverageGradeIst(agIst);

      const IIndQuarter = await getIIndQuarter(year, idSchool);
      const tgIInd = IIndQuarter.data.data.reduce((sum, res) => sum + Number(res.totalGrade || 0), 0);
      const agIInd = IIndQuarter.data.data.reduce((sum, res) => sum + Number(res.averageGrade || 0), 0);
      setTotalGradeIInd(tgIInd);
      setAverageGradeIInd(agIInd);

      const IIIrdQuarter = await getIIIrdQuarter(year, idSchool);
      const tgIIIrd = IIIrdQuarter.data.data.reduce((sum, res) => sum + Number(res.totalGrade || 0), 0);
      const agIIIrd = IIIrdQuarter.data.data.reduce((sum, res) => sum + Number(res.averageGrade || 0), 0);
      setTotalGradeIIIrd(tgIIIrd);
      setAverageGradeIIIrd(agIIIrd);

      const IVthQuarter = await getIVthQuarter(year, idSchool);
      const tgIVth = IVthQuarter.data.data.reduce((sum, res) => sum + Number(res.totalGrade || 0), 0);
      const agIVth = IVthQuarter.data.data.reduce((sum, res) => sum + Number(res.averageGrade || 0), 0);
      setTotalGradeIVth(tgIVth);
      setAverageGradeIVth(agIVth);

      const bimonthly = '1º BIMESTRE'
      const id_student = sessionStorage.getItem("StudentInformation");
      const nameSchool = sessionStorage.getItem("School");
      const stdtName = sessionStorage.getItem("stdt-name");
      setStdtName(stdtName)
      setyear(year)
      setNameSchool(nameSchool)
      setid_student(id_student)
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

        const tchr = sortedResGrade.map(res => res.id_teacher.name);
        const firstTeacher = tchr[0];  // Acessa o primeiro elemento
        console.log("firstTeacher", firstTeacher);
        setTeacherName(firstTeacher);  // Define apenas o primeiro elemento
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

  }, []);

  useEffect(() => {
    if (
      totalGradeIst !== null && totalGradeIInd !== null &&
      totalGradeIIIrd !== null && totalGradeIVth !== null
    ) {
      setTotalGrade(totalGradeIst + totalGradeIInd + totalGradeIIIrd + totalGradeIVth);
    }

    if (
      averageGradeIst !== null && averageGradeIInd !== null &&
      averageGradeIIIrd !== null && averageGradeIVth !== null
    ) {
      setAverageGrade(
        (averageGradeIst + averageGradeIInd + averageGradeIIIrd + averageGradeIVth)
      );
    }
  }, [totalGradeIst, totalGradeIInd, totalGradeIIIrd, totalGradeIVth, averageGradeIst, averageGradeIInd, averageGradeIIIrd, averageGradeIVth]);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (year && id_student && id_teacher) {
        try {
          const result = await AttendanceFinalConcepts(year, id_student, id_teacher);
          console.log("result", result)
          const data = result?.data?.data || [];

          // Verifique se os dados estão disponíveis e não estão vazios
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
  }, [year, id_student, id_teacher]);

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

  const groupedGradesIst = iStQuarter.reduce((acc, grd) => {
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
    const totalGradeForMatter = parseFloat(
      grd.studentGrade.toString().replace(',', '.')
    ) || 0;

    // Atualiza a soma das notas para a matéria no acumulador
    const updatedMatter = acc.find(item => item.id_matter === String(grd.id_matter._id));
    if (updatedMatter) {
      updatedMatter.grade = parseFloat(
        (updatedMatter.grade + totalGradeForMatter).toFixed(2) // Garante duas casas decimais
      );
    }

    return acc;
  }, []);

  const groupedGradesIInd = iiNdQuarter.reduce((acc, grd) => {
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
    const totalGradeForMatter = parseFloat(
      grd.studentGrade.toString().replace(',', '.')
    ) || 0;

    // Atualiza a soma das notas para a matéria no acumulador
    const updatedMatter = acc.find(item => item.id_matter === grd.id_matter._id);
    if (updatedMatter) {
      updatedMatter.grade += totalGradeForMatter;
    }

    return acc;
  }, []);

  const groupedGradesIIIrd = iiiRdQuarter.reduce((acc, grd) => {
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
    const totalGradeForMatter = parseFloat(
      grd.studentGrade.toString().replace(',', '.')
    ) || 0;

    // Atualiza a soma das notas para a matéria no acumulador
    const updatedMatter = acc.find(item => item.id_matter === grd.id_matter._id);
    if (updatedMatter) {
      updatedMatter.grade += totalGradeForMatter;
    }

    return acc;
  }, []);

  const groupedGradesIVth = ivThQuarter.reduce((acc, grd) => {
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
    const totalGradeForMatter = parseFloat(
      grd.studentGrade.toString().replace(',', '.')
    ) || 0;

    // Atualiza a soma das notas para a matéria no acumulador
    const updatedMatter = acc.find(item => item.id_matter === grd.id_matter._id);
    if (updatedMatter) {
      updatedMatter.grade += totalGradeForMatter;
    }

    return acc;
  }, []);

  const messageButtonClick = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  const countPresences = highlightedDays.length;
  const countAbsences = highlightedDaysF.length;
  const countjustifiedAbsence = highlightedDaysFJ.length;

  console.log('nota total anual', totalGrade)
  console.log('nota media anual', averageGrade)

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
                <h3>Resultado Final</h3>
              </AddEmp>
              <DadosStdt>
                <UpContainer>
                  <InfoContainer>
                    <span><strong>Escola:</strong> {nameSchool}</span>
                    <span><strong>Professor:</strong> {teacherName}</span>
                    <span><strong>Aluno:</strong> {stdtName}</span>
                  </InfoContainer>
                  <SpanFrequency>
                    <span><IoCheckmarkSharp color='#00fa00' font-size="30px" />Presenças: {countPresences} | <IoCloseSharp color='#ff050a' font-size="30px" />Ausências: {countAbsences}</span>
                    <span><FcSurvey font-size="25px" />Faltas Justificadas: {countjustifiedAbsence}</span>
                  </SpanFrequency>
                </UpContainer>

                <LegendContainer>
                  <LegendBox>
                    {/*<h3>Legenda</h3>*/}
                    <p>Nota Total Anual: <strong style={{ color: '#1d7f14' }}>{totalGrade}</strong></p>
                    <p>Nota Média Anual: <strong style={{ color: 'blue' }}>{averageGrade}</strong></p>
                  </LegendBox>

                  <LegendColors>
                    <div><span className="red-box" />Notas abaixo da média</div>
                    <div><span className="blue-box" />Notas iguais ou superiores a média</div>
                    <div><span className="green-box" />Notas iguais ou superiores a 90% da nota total</div>
                  </LegendColors>
                </LegendContainer>
              </DadosStdt>
              <DivDados>
                <List>
                  {groupedGrades
                    .sort((a, b) => {
                      const nameA = a.matterName.toUpperCase();
                      const nameB = b.matterName.toUpperCase();
                      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
                    })
                    .map(grd => {
                      const getGrade = (grouped, id) => {
                        return grouped.find(res => String(res.id_matter) === String(id))?.grade || 0;
                      };

                      const gradeIst = getGrade(groupedGradesIst, grd.id_matter);
                      const gradeIInd = getGrade(groupedGradesIInd, grd.id_matter);
                      const gradeIIIrd = getGrade(groupedGradesIIIrd, grd.id_matter);
                      const gradeIVth = getGrade(groupedGradesIVth, grd.id_matter);

                      const totalGrade = gradeIst + gradeIInd + gradeIIIrd + gradeIVth;

                      return (
                        <Emp key={grd._id}>
                          <DivNameMatter>
                            <SpanNameMatter>{grd.matterName}</SpanNameMatter>
                          </DivNameMatter>

                          <Grade>
                            <DivBimTable>

                              <DivBimRow>
                                <DivBimHeader>1º Bim</DivBimHeader>
                                <DivBimCell
                                  grade={gradeIst}
                                  averageGrade={parseFloat(averageGradeIst) || 0}
                                  totalGrade={parseFloat(totalGradeIst) || 0}
                                >
                                  {gradeIst > 0 ? gradeIst.toFixed(1) : '-'}
                                </DivBimCell>
                              </DivBimRow>

                              <DivBimRow>
                                <DivBimHeader>2º Bim</DivBimHeader>
                                <DivBimCell
                                  grade={gradeIInd}
                                  averageGrade={parseFloat(averageGradeIInd) || 0}
                                  totalGrade={parseFloat(totalGradeIInd) || 0}
                                >
                                  {gradeIInd > 0 ? gradeIInd.toFixed(1) : '-'}
                                </DivBimCell>
                              </DivBimRow>

                              <DivBimRow>
                                <DivBimHeader>3º Bim</DivBimHeader>
                                <DivBimCell
                                  grade={gradeIIIrd}
                                  averageGrade={parseFloat(averageGradeIIIrd) || 0}
                                  totalGrade={parseFloat(totalGradeIIIrd) || 0}
                                >
                                  {gradeIIIrd > 0 ? gradeIIIrd.toFixed(1) : '-'}
                                </DivBimCell>
                              </DivBimRow>

                              <DivBimRow>
                                <DivBimHeader>4º Bim</DivBimHeader>
                                <DivBimCell
                                  grade={gradeIVth}
                                  averageGrade={parseFloat(averageGradeIVth) || 0}
                                  totalGrade={parseFloat(totalGradeIVth) || 0}
                                >
                                  {gradeIVth > 0 ? gradeIVth.toFixed(1) : '-'}
                                </DivBimCell>
                              </DivBimRow>

                              <DivBimRow>
                                <DivBimHeader>Total</DivBimHeader>
                                <DivBimCell
                                  grade={parseFloat(totalGrade)}
                                  averageGrade={
                                    parseFloat(averageGradeIst) +
                                    parseFloat(averageGradeIInd) +
                                    parseFloat(averageGradeIIIrd) +
                                    parseFloat(averageGradeIVth)
                                  }
                                  totalGrade={
                                    parseFloat(totalGradeIst) +
                                    parseFloat(totalGradeIInd) +
                                    parseFloat(totalGradeIIIrd) +
                                    parseFloat(totalGradeIVth)
                                  }
                                >
                                  {totalGrade}
                                </DivBimCell>
                              </DivBimRow>

                            </DivBimTable>
                          </Grade>
                        </Emp>
                      );
                    })}
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