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
  SignMessageButtonTextBold
} from './style';


import GlobalStyle from './style';

import {
  allTheBulletinsGrades,
  getIstQuarter,
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
  const [BulletinsIst, setBulletinsIst] = useState([]);
  const [Bulletins, setBulletins] = useState([]);
  const [cla$$, setClass] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [nameSchool, setNameSchool] = useState('')
  const [loading, setLoading] = useState(true);

  const { idClass } = useParams();
  const { idBim } = useParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log("idClass", idClass, "idBim", idBim)
      const idSchool = sessionStorage.getItem("id-school");
      const nameSchool = sessionStorage.getItem("School");
      setNameSchool(nameSchool)
      const res = await allTheBulletinsGrades({
        idClass,
        id_iiNdQuarter: idBim,
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

      const year = new Date().getFullYear();
      const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
      const i = IstQuarter.data.data.find(res => res) || null;
      setIstBimonthly([i].filter(res => res !== null));

      const resIst = await allTheBulletinsGrades({
        idClass,
        id_iStQuarter: i._id,
      });

      setBulletinsIst(resIst.data.data.boletins);

      console.log("resIst", resIst)

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
            <PrintButton className="no-print" onClick={handlePrint}>
              Imprimir
            </PrintButton>
            {Bulletins
              .slice()
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((aluno, index) => {
                const alunoIst = BulletinsIst.find(item => item.id === aluno.id);
                const bim1 = Istbimonthly.find(item => item.bimonthly === "1º BIMESTRE");

                console.log('bim1 averageGrade:', bim1?.averageGrade);
                console.log('bim1 totalGrade:', bim1?.totalGrade);

                return (
                  <DivAddEmp id="containerDivs" key={aluno.id || index}>
                    <h2>Boletim</h2>
                    <AddEmp>
                      <h3>2º Bimestre</h3>
                    </AddEmp>
                    <DadosStdt>
                      <span><strong>Escola:</strong> {nameSchool}</span>
                      <span><strong>Professor:</strong> {cla$$.regente.map(prof => prof.nome).join(", ")}</span>
                      <span><strong>Aluno:</strong> {aluno.nome}</span>
                      <SpanFrequency>
                        <span>
                          <IoCheckmarkSharp color='#00fa00' fontSize="30px" /> Presenças: {aluno.frequencia.totalPresencas} |{" "}
                          <IoCloseSharp color='#ff050a' fontSize="30px" /> Faltas: {aluno.frequencia.totalFaltas}
                        </span>
                        <span>
                          <FcSurvey fontSize="25px" /> Faltas Justificadas: {aluno.frequencia.totalFaltasJustificadas}
                        </span>
                      </SpanFrequency>
                      <LegendBox>
                        <h3>Legenda</h3>
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
                    </DadosStdt>

                    <DivDados>
                      <List>
                        {Object.entries(aluno.totalPorMateria)
                          .map(([matterName, grade]) => ({
                            matterName,
                            grade
                          }))
                          .sort((a, b) => a.matterName.localeCompare(b.matterName))
                          .map(grd => (
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
                                          ? parseFloat(alunoIst.totalPorMateria[grd.matterName])
                                          : 0
                                      }
                                      averageGrade={bim1 ? parseFloat(bim1.averageGrade) : 0}
                                      totalGrade={bim1 ? parseFloat(bim1.totalGrade) : 0}
                                    >
                                      {(() => {
                                        const val = alunoIst && alunoIst.totalPorMateria && alunoIst.totalPorMateria[grd.matterName] !== undefined
                                          ? parseFloat(alunoIst.totalPorMateria[grd.matterName]).toFixed(1)
                                          : '-';
                                        return val;
                                      })()}
                                    </DivBimCell>
                                  </DivBimRow>

                                  <DivBimRow>
                                    <DivBimHeader>2º Bim</DivBimHeader>
                                    <DivBimCell
                                      grade={parseFloat(grd.grade) || 0}
                                      averageGrade={parseFloat(bimestre.averageGrade) || 0}
                                      totalGrade={parseFloat(bimestre.totalGrade) || 0}
                                    >
                                      {parseFloat(grd.grade).toFixed(1)}
                                    </DivBimCell>
                                  </DivBimRow>

                                  <DivBimRow>
                                    <DivBimHeader>3º Bim</DivBimHeader>
                                    <DivBimCell>-</DivBimCell>
                                  </DivBimRow>

                                  <DivBimRow>
                                    <DivBimHeader>4º Bim</DivBimHeader>
                                    <DivBimCell>-</DivBimCell>
                                  </DivBimRow>
                                </DivBimTable>
                              </Grade>
                            </Emp>
                          ))}
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