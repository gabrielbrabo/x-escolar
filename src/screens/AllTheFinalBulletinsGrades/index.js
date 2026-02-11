import React, { useState, useEffect, } from 'react';
import {
  Container,
  ContainerDivs,
  Label,
  DivAddEmp,
  AddEmp,
  DadosStdt,
  SpanFrequency,
  LegendBox,
  ToGoBack,
  DivDados,
  List,
  DivBimRow,
  DivBimHeader,
  DivBimCell,
  DivSignatureArea,
  Emp,
  SignatureBlock,
  Line,
  DivBimTable,
  DivNameMatter,
  SpanNameMatter,
  Grade,
  PrintButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
  Preview,
  ContLogo,
  LegendContainer,
  LegendColors,
  InfoContainer,
  UpContainer
} from './style';


import GlobalStyle from './style';

import {
  allTheBulletinsGrades,
  getIstQuarter,
  getIIndQuarter,
  getIIIrdQuarter,
  getIVthQuarter,
  clssInfo,
  fetchLogo
} from '../../Api';

//import GlobalStyle from './style';

import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

import { FcSurvey } from "react-icons/fc";

import { useNavigate, useParams } from 'react-router-dom';

import LoadingSpinner from '../../components/Loading';

const AllTheBulletins = () => {

  const navigate = useNavigate()
  const [bimestre, setBimestre] = useState({});
  const [bimestreIst, setBimestreIst] = useState({});
  const [bimestreIInd, setBimestreIInd] = useState({});
  const [bimestreIIIrd, setBimestreIIIrd] = useState({});
  const [Istbimonthly, setIstBimonthly] = useState([]);
  const [IIndbimonthly, setIIndBimonthly] = useState([]);
  const [IIIrdbimonthly, setIIIrdBimonthly] = useState([]);
  const [BulletinsIst, setBulletinsIst] = useState([]);
  const [BulletinsIInd, setBulletinsIInd] = useState([]);
  const [BulletinsIIIrd, setBulletinsIIIrd] = useState([]);
  const [Bulletins, setBulletins] = useState([]);
  const [cla$$, setClass] = useState([]);
  const [, setTeacher] = useState([]);
  const [nameSchool, setNameSchool] = useState('')
  const [logoUrl, setLogoUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const { idClass } = useParams();
  const { idBim } = useParams();

  const [assessmentRegime, setAssessmentRegime] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log("idClass", idClass, "idBim", idBim)
      const idSchool = JSON.parse(sessionStorage.getItem("id-school"));
      const nameSchool = sessionStorage.getItem("School");
      setNameSchool(nameSchool)
      setAssessmentRegime(sessionStorage.getItem('assessmentRegime'))

      const resClass = await clssInfo(idClass);
      const $yearClass = resClass.data.data.find(clss => {
        return clss.year
      })
      const year = $yearClass.year
      const IstQuarter = await getIstQuarter(year, idSchool)
      const IIndQuarter = await getIIndQuarter(year, idSchool)
      const IIIrdQuarter = await getIIIrdQuarter(year, idSchool)
      const i = IstQuarter.data.data.find(res => res) || null;
      const ii = IIndQuarter.data.data.find(res => res) || null;
      const iii = IIIrdQuarter.data.data.find(res => res) || null;
      setIstBimonthly([i].filter(res => res !== null));
      setIIndBimonthly([ii].filter(res => res !== null));
      setIIIrdBimonthly([iii].filter(res => res !== null));

      if (assessmentRegime === "BIMESTRAL") {
        const IVthQuarter = await getIVthQuarter(year, idSchool)
        const iv = IVthQuarter.data.data.find(res => res) || null;
        const res = await allTheBulletinsGrades({
          idClass,
          id_ivThQuarter: iv._id,
        });
        console.log("resposta boletins", res);
        // Aqui você pode setar os dados no estado, se quiser
        setBulletins(res.data.data.boletins);
        setClass(res.data.data.turma);
        setBimestre(res.data.data.bimestre);

        const regentTeachers = res.data.data.turma.regente;

        if (regentTeachers.length > 0) {
          setTeacher(regentTeachers[0]); // Se quiser só o primeiro
          // OU
          // setTeacher(regentTeachers); // Se quiser todos em um array
        } else {
          setTeacher(null);
        }
      }

      if (assessmentRegime === "TRIMESTRAL") {
        const IIIrdQuarter = await getIIIrdQuarter(year, idSchool)
        const iii = IIIrdQuarter.data.data.find(res => res) || null;
        const res = await allTheBulletinsGrades({
          idClass,
          id_iiiRdQuarter: iii._id,
        });
        console.log("resposta boletins", res);
        // Aqui você pode setar os dados no estado, se quiser
        setBulletins(res.data.data.boletins);
        setClass(res.data.data.turma);
        setBimestre(res.data.data.bimestre);

        const regentTeachers = res.data.data.turma.regente;

        if (regentTeachers.length > 0) {
          setTeacher(regentTeachers[0]); // Se quiser só o primeiro
          // OU
          // setTeacher(regentTeachers); // Se quiser todos em um array
        } else {
          setTeacher(null);
        }

      }

      const resIst = await allTheBulletinsGrades({
        idClass,
        id_iStQuarter: i._id,
      });

      setBulletinsIst(resIst.data.data.boletins);
      setBimestreIst(resIst.data.data.bimestre);

      console.log("resIst", resIst)

      const resIInd = await allTheBulletinsGrades({
        idClass,
        id_iiNdQuarter: ii._id,
      });

      setBulletinsIInd(resIInd.data.data.boletins);
      setBimestreIInd(resIInd.data.data.bimestre);

      console.log("resIInd", resIInd)

      const resIIIrd = await allTheBulletinsGrades({
        idClass,
        id_iiiRdQuarter: iii._id,
      });

      setBulletinsIIIrd(resIIIrd.data.data.boletins);
      setBimestreIIIrd(resIIIrd.data.data.bimestre);

      console.log("resIInd", resIIIrd)

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

  }, [idBim, idClass, assessmentRegime]);

  const messageButtonClick = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  const periodLabel = assessmentRegime === 'TRIMESTRAL' ? 'TRIM' : 'BIM';

  const totalAnual =
    (parseFloat(bimestreIst.totalGrade) || 0) +
    (parseFloat(bimestreIInd.totalGrade) || 0) +
    (parseFloat(bimestreIIIrd.totalGrade) || 0) +
    (assessmentRegime !== 'TRIMESTRAL'
      ? (parseFloat(bimestre.totalGrade) || 0)
      : 0);

  const mediaAnual =
    (parseFloat(bimestreIst.averageGrade) || 0) +
    (parseFloat(bimestreIInd.averageGrade) || 0) +
    (parseFloat(bimestreIIIrd.averageGrade) || 0) +
    (assessmentRegime !== 'TRIMESTRAL'
      ? (parseFloat(bimestre.averageGrade) || 0)
      : 0);

  return (
    <Container>
      {<GlobalStyle />}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ContainerDivs>
            <PrintButton className="no-print" onClick={handlePrint}>
              Imprimir
            </PrintButton>
            {Bulletins
              .slice()
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((aluno, index) => {
                const alunoIst = BulletinsIst.find(item => item.id === aluno.id);
                const bim1 = Istbimonthly.find(item => item.bimonthly === "1º BIMESTRE");

                const alunoIInd = BulletinsIInd.find(item => item.id === aluno.id);
                const bim2 = IIndbimonthly.find(item => item.bimonthly === "2º BIMESTRE");

                const alunoIIIrd = BulletinsIIIrd.find(item => item.id === aluno.id);
                const bim3 = IIIrdbimonthly.find(item => item.bimonthly === "3º BIMESTRE");

                console.log('bim1 averageGrade:', bim1?.averageGrade);
                console.log('bim1 totalGrade:', bim1?.totalGrade);

                return (
                  <DivAddEmp id="containerDivs" key={aluno.id || index}>
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
                          <span><strong>Professor:</strong> {cla$$.regente.map(prof => prof.nome).join(", ")}</span>
                          <span><strong>Aluno:</strong> {aluno.nome}</span>
                        </InfoContainer>
                        <SpanFrequency>
                          <span>
                            <IoCheckmarkSharp color='#00fa00' fontSize="30px" />
                            Presenças: {
                              (alunoIst?.frequencia?.totalPresencas || 0) +
                              (alunoIInd?.frequencia?.totalPresencas || 0) +
                              (alunoIIIrd?.frequencia?.totalPresencas || 0) +
                              (aluno?.frequencia?.totalPresencas || 0)
                            } |{" "}
                            <IoCloseSharp color='#ff050a' fontSize="30px" />
                            Faltas: {
                              (alunoIst?.frequencia?.totalFaltas || 0) +
                              (alunoIInd?.frequencia?.totalFaltas || 0) +
                              (alunoIIIrd?.frequencia?.totalFaltas || 0) +
                              (aluno?.frequencia?.totalFaltas || 0)
                            }
                          </span>
                          <span>
                            <FcSurvey fontSize="25px" />
                            Faltas Justificadas: {
                              (alunoIst?.frequencia?.totalFaltasJustificadas || 0) +
                              (alunoIInd?.frequencia?.totalFaltasJustificadas || 0) +
                              (alunoIIIrd?.frequencia?.totalFaltasJustificadas || 0) +
                              (aluno?.frequencia?.totalFaltasJustificadas || 0)
                            }
                          </span>
                        </SpanFrequency>
                      </UpContainer>
                      <LegendContainer>
                        <LegendBox>
                          {/*<h3>Legenda Anual</h3>*/}
                          <p>
                            Nota Total Anual:{" "}
                            <strong style={{ color: '#1d7f14' }}>
                              {totalAnual.toFixed(1)}
                            </strong>
                          </p>
                          <p>
                            Nota Média Anual:{" "}
                            <strong style={{ color: 'blue' }}>
                              {mediaAnual.toFixed(1)}
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
                        {Object.entries(aluno.totalPorMateria)
                          .map(([matterName, grade]) => ({
                            matterName,
                            grade
                          }))
                          .sort((a, b) => a.matterName.localeCompare(b.matterName))
                          .map(grd => {
                            const isHistorico =
                              !grd.grade?.atividades ||
                              grd.grade.atividades.length === 0 ||
                              grd.grade.atividades.every(a => a.idActivity === null);

                            const isHistorico1Bim =
                              !alunoIst?.totalPorMateria?.[grd.matterName]?.atividades ||
                              alunoIst.totalPorMateria[grd.matterName].atividades.length === 0 ||
                              alunoIst.totalPorMateria[grd.matterName].atividades.every(
                                a => a.idActivity === null
                              );
                            const isHistorico2Bim =
                              !alunoIInd?.totalPorMateria?.[grd.matterName]?.atividades ||
                              alunoIInd.totalPorMateria[grd.matterName].atividades.length === 0 ||
                              alunoIInd.totalPorMateria[grd.matterName].atividades.every(
                                a => a.idActivity === null
                              );
                            const isHistorico3Bim =
                              !alunoIIIrd?.totalPorMateria?.[grd.matterName]?.atividades ||
                              alunoIIIrd.totalPorMateria[grd.matterName].atividades.length === 0 ||
                              alunoIIIrd.totalPorMateria[grd.matterName].atividades.every(
                                a => a.idActivity === null
                              );
                            return (
                              <Emp key={grd.matterName}>
                                <DivNameMatter>
                                  <SpanNameMatter>{grd.matterName}</SpanNameMatter>
                                </DivNameMatter>
                                <Grade>
                                  <DivBimTable>
                                    <DivBimRow>
                                      <DivBimHeader>1º {periodLabel}</DivBimHeader>
                                      <DivBimCell
                                        grade={
                                          alunoIst && alunoIst.totalPorMateria && alunoIst.totalPorMateria[grd.matterName] !== undefined
                                            ? parseFloat(alunoIst.totalPorMateria[grd.matterName].total)
                                            : 0
                                        }
                                        averageGrade={bim1 ? parseFloat(bim1.averageGrade) : 0}
                                        totalGrade={bim1 ? parseFloat(bim1.totalGrade) : 0}
                                        isHistorico={isHistorico1Bim}
                                      >
                                        {(() => {
                                          const val = alunoIst && alunoIst.totalPorMateria && alunoIst.totalPorMateria[grd.matterName] !== undefined
                                            ? parseFloat(alunoIst.totalPorMateria[grd.matterName].total).toFixed(1)
                                            : '-';
                                          return val;
                                        })()}
                                      </DivBimCell>
                                    </DivBimRow>

                                    <DivBimRow>
                                      <DivBimHeader>2º {periodLabel}</DivBimHeader>
                                      <DivBimCell
                                        grade={
                                          alunoIInd && alunoIInd.totalPorMateria && alunoIInd.totalPorMateria[grd.matterName] !== undefined
                                            ? parseFloat(alunoIInd.totalPorMateria[grd.matterName].total)
                                            : 0
                                        }
                                        averageGrade={bim2 ? parseFloat(bim2.averageGrade) : 0}
                                        totalGrade={bim2 ? parseFloat(bim2.totalGrade) : 0}
                                        isHistorico={isHistorico2Bim}
                                      >
                                        {(() => {
                                          const val = alunoIInd && alunoIInd.totalPorMateria && alunoIInd.totalPorMateria[grd.matterName] !== undefined
                                            ? parseFloat(alunoIInd.totalPorMateria[grd.matterName].total).toFixed(1)
                                            : '-';
                                          return val;
                                        })()}
                                      </DivBimCell>
                                    </DivBimRow>

                                    <DivBimRow>
                                      <DivBimHeader>3º {periodLabel}</DivBimHeader>
                                      <DivBimCell
                                        grade={
                                          alunoIIIrd && alunoIIIrd.totalPorMateria && alunoIIIrd.totalPorMateria[grd.matterName] !== undefined
                                            ? parseFloat(alunoIIIrd.totalPorMateria[grd.matterName].total)
                                            : 0
                                        }
                                        averageGrade={bim3 ? parseFloat(bim3.averageGrade) : 0}
                                        totalGrade={bim3 ? parseFloat(bim3.totalGrade) : 0}
                                        isHistorico={isHistorico3Bim}
                                      >
                                        {(() => {
                                          const val = alunoIIIrd && alunoIIIrd.totalPorMateria && alunoIIIrd.totalPorMateria[grd.matterName] !== undefined
                                            ? parseFloat(alunoIIIrd.totalPorMateria[grd.matterName].total).toFixed(1)
                                            : '-';
                                          return val;
                                        })()}
                                      </DivBimCell>
                                    </DivBimRow>

                                    {assessmentRegime !== 'TRIMESTRAL' && (
                                      <DivBimRow>
                                        <DivBimHeader>4º {periodLabel}</DivBimHeader>
                                        <DivBimCell
                                          grade={parseFloat(grd.grade.total) || 0}
                                          averageGrade={parseFloat(bimestre.averageGrade) || 0}
                                          totalGrade={parseFloat(bimestre.totalGrade) || 0}
                                          isHistorico={isHistorico}
                                        >
                                          {parseFloat(grd.grade.total).toFixed(1) || "-"}
                                        </DivBimCell>
                                      </DivBimRow>
                                    )}

                                    <DivBimRow>
                                      <DivBimHeader>Total</DivBimHeader>
                                      <DivBimCell
                                        grade={
                                          (alunoIst?.totalPorMateria?.[grd.matterName]?.total || 0) +
                                          (alunoIInd?.totalPorMateria?.[grd.matterName]?.total || 0) +
                                          (alunoIIIrd?.totalPorMateria?.[grd.matterName]?.total || 0) +
                                          (assessmentRegime !== 'TRIMESTRAL'
                                            ? (parseFloat(grd.grade.total) || 0)
                                            : 0)
                                        }
                                        averageGrade={parseFloat(mediaAnual) || 0}
                                        totalGrade={parseFloat(totalAnual) || 0}
                                      >
                                        {(
                                          (alunoIst?.totalPorMateria?.[grd.matterName]?.total ?? 0) +
                                          (alunoIInd?.totalPorMateria?.[grd.matterName]?.total ?? 0) +
                                          (alunoIIIrd?.totalPorMateria?.[grd.matterName]?.total ?? 0) +
                                          (assessmentRegime !== 'TRIMESTRAL'
                                            ? (parseFloat(grd.grade.total) || 0)
                                            : 0)
                                        ).toFixed(1)}
                                      </DivBimCell>
                                    </DivBimRow>

                                  </DivBimTable>
                                </Grade>
                              </Emp>
                            )
                          })}
                      </List>
                    </DivDados>

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
                );
              })}
          </ContainerDivs>
          <ToGoBack onClick={messageButtonClick}>
            <SignMessageButtonText>Voltar para a</SignMessageButtonText>
            <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
          </ToGoBack>
        </>
      )
      }
    </Container >
  );

}

export default AllTheBulletins