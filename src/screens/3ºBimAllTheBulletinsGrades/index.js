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
  const [Istbimonthly, setIstBimonthly] = useState([]);
  const [IIndbimonthly, setIIndBimonthly] = useState([]);
  const [BulletinsIst, setBulletinsIst] = useState([]);
  const [BulletinsIInd, setBulletinsIInd] = useState([]);
  const [Bulletins, setBulletins] = useState([]);
  const [cla$$, setClass] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [nameSchool, setNameSchool] = useState('')
  const [logoUrl, setLogoUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const { idClass } = useParams();
  const { idBim } = useParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log("idClass", idClass, "idBim", idBim)
      const idSchool = JSON.parse(sessionStorage.getItem("id-school"));
      const nameSchool = sessionStorage.getItem("School");
      setNameSchool(nameSchool)
      const res = await allTheBulletinsGrades({
        idClass,
        id_iiiRdQuarter: idBim,
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

      const resClass = await clssInfo(idClass);
      const $yearClass = resClass.data.data.find(clss => {
        return clss.year
      })
      const year = $yearClass.year
      const IstQuarter = await getIstQuarter(year, idSchool)
      const IIndQuarter = await getIIndQuarter(year, idSchool)
      const i = IstQuarter.data.data.find(res => res) || null;
      const ii = IIndQuarter.data.data.find(res => res) || null;
      setIstBimonthly([i].filter(res => res !== null));
      setIIndBimonthly([ii].filter(res => res !== null));

      const resIst = await allTheBulletinsGrades({
        idClass,
        id_iStQuarter: i._id,
      });

      setBulletinsIst(resIst.data.data.boletins);

      console.log("resIst", resIst)

      const resIInd = await allTheBulletinsGrades({
        idClass,
        id_iiNdQuarter: ii._id,
      });

      setBulletinsIInd(resIInd.data.data.boletins);

      console.log("resIInd", resIInd)

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

  }, [idBim, idClass]);

  const messageButtonClick = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  console.log("Bulletins", Bulletins)
  console.log("BulletinsIst", BulletinsIst)
  console.log("cla$$", cla$$)
  console.log("teacher", teacher)
  console.log("bimonthly", Istbimonthly)

  return (
    <Container>
      {<GlobalStyle />}
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
            {Bulletins
              .slice()
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((aluno, index) => {
                const alunoIst = BulletinsIst.find(item => item.id === aluno.id);
                const bim1 = Istbimonthly.find(item => item.bimonthly === "1º BIMESTRE");

                const alunoIInd = BulletinsIInd.find(item => item.id === aluno.id);
                const bim2 = IIndbimonthly.find(item => item.bimonthly === "2º BIMESTRE");

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
                      <h3>3º Bimestre</h3>
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
                            <IoCheckmarkSharp color='#00fa00' fontSize="30px" /> Presenças: {aluno.frequencia.totalPresencas} |{" "}
                            <IoCloseSharp color='#ff050a' fontSize="30px" /> Faltas: {aluno.frequencia.totalFaltas}
                          </span>
                          <span>
                            <FcSurvey fontSize="25px" /> Faltas Justificadas: {aluno.frequencia.totalFaltasJustificadas}
                          </span>
                        </SpanFrequency>
                      </UpContainer>
                      <LegendContainer>
                        <LegendBox>
                          {/*<h3>Legenda</h3>*/}
                          <p>
                            Nota Total:{" "}
                            <strong style={{ color: '#1d7f14' }}>
                              {bimestre.totalGrade ? parseFloat(bimestre.totalGrade).toFixed(1) : '0.0'}
                            </strong>
                          </p>
                          <p>
                            Nota Média:{" "}
                            <strong style={{ color: 'blue' }}>
                              {bimestre.averageGrade ? parseFloat(bimestre.averageGrade).toFixed(1) : '0.0'}
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
                            return (
                              <Emp key={grd.matterName}>
                                <DivNameMatter>
                                  <SpanNameMatter>{grd.matterName}</SpanNameMatter>
                                </DivNameMatter>
                                <Grade>
                                  <DivBimTable>
                                    <DivBimRow>
                                      <DivBimHeader>1º Bim</DivBimHeader>
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
                                      <DivBimHeader>2º Bim</DivBimHeader>
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
                                      <DivBimHeader>3º Bim</DivBimHeader>
                                      <DivBimCell
                                        grade={parseFloat(grd.grade.total) || 0}
                                        averageGrade={parseFloat(bimestre.averageGrade) || 0}
                                        totalGrade={parseFloat(bimestre.totalGrade) || 0}
                                        isHistorico={isHistorico}
                                      >
                                        {parseFloat(grd.grade.total).toFixed(1)}
                                      </DivBimCell>
                                    </DivBimRow>

                                    <DivBimRow>
                                      <DivBimHeader>4º Bim</DivBimHeader>
                                      <DivBimCell>-</DivBimCell>
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
      )}
    </Container>
  );

}

export default AllTheBulletins