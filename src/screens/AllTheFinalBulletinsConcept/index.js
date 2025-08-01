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
  ContLogo
} from './style';


import GlobalStyle from './style';

import {
  allTheFinalBulletinsConcept,
  allTheBulletinsConcept,
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
  //const [bimestre, setBimestre] = useState({});
  //const [bimonthly, setBimonthly] = useState([]);
  const [Bulletins, setBulletins] = useState([]);
  const [BulletinsIst, setBulletinsIst] = useState([]);
  const [BulletinsIInd, setBulletinsIInd] = useState([]);
  const [BulletinsIIIrd, setBulletinsIIIrd] = useState([]);
  const [BulletinsIVth, setBulletinsIVth] = useState([]);
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
      const resClass = await clssInfo(idClass);
      const $yearClass = resClass.data.data.find(clss => {
        return clss.year
      })
      const year = $yearClass.year
      const IstQuarter = await getIstQuarter(year, idSchool)
      const IIndQuarter = await getIIndQuarter(year, idSchool)
      const IIIrdQuarter = await getIIIrdQuarter(year, idSchool)
      const IVthQuarter = await getIVthQuarter(year, idSchool)
      const i = IstQuarter.data.data.find(res => res) || null;
      const ii = IIndQuarter.data.data.find(res => res) || null;
      const iii = IIIrdQuarter.data.data.find(res => res) || null;
      const iv = IVthQuarter.data.data.find(res => res) || null;

      const res = await allTheFinalBulletinsConcept({
        idClass,
        //id_ivThQuarter: iv._id,
      });
      console.log("resposta boletins", res);
      // Aqui você pode setar os dados no estado, se quiser
      setBulletins(res.data.data.boletins);
      setClass(res.data.data.turma);
      //setBimestre(res.data.data.bimestre);

      const resIst = await allTheBulletinsConcept({
        idClass,
        id_iStQuarter: i._id,
      });

      setBulletinsIst(resIst.data.data.boletins);

      console.log("resIst", resIst)

      const resIInd = await allTheBulletinsConcept({
        idClass,
        id_iiNdQuarter: ii._id,
      });

      setBulletinsIInd(resIInd.data.data.boletins);

      console.log("resIInd", resIInd)

      const resIIIrd = await allTheBulletinsConcept({
        idClass,
        id_iiiRdQuarter: iii._id,
      });

      setBulletinsIIIrd(resIIIrd.data.data.boletins);

      console.log("resIInd", resIIIrd)

      const resIVth = await allTheBulletinsConcept({
        idClass,
        id_ivThQuarter: iv._id,
      });

      setBulletinsIVth(resIVth.data.data.boletins);

      console.log("resIVth", resIVth)

      const regentTeachers = res.data.data.turma.regente;

      if (regentTeachers.length > 0) {
        setTeacher(regentTeachers[0]); // Se quiser só o primeiro
        // OU
        // setTeacher(regentTeachers); // Se quiser todos em um array
      } else {
        setTeacher(null);
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

  }, [idBim, idClass]);

  const messageButtonClick = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  console.log("Bulletins", Bulletins)
  console.log("cla$$", cla$$)
  console.log("teacher", teacher)

  return (
    <Container>
      {<GlobalStyle />} {/* Adicionando estilos globais */}
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
              .map((aluno, index) => (
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
                      <p><strong style={{ color: '#1d7f14' }}>A</strong> - Alcançou com êxito as capacidades básicas</p>
                      <p><strong style={{ color: 'blue' }}>B</strong> - Alcançou satisfatoriamente as capacidades básicas</p>
                      <p><strong style={{ color: 'orange' }}>C</strong> - Alcançou parcialmente as capacidades básicas</p>
                      <p><strong style={{ color: 'red' }}>D</strong> - Não alcançou as capacidades básicas</p>
                    </LegendBox>
                  </DadosStdt>

                  <DivDados>
                    <List>
                      {Object.entries(aluno.totalPorMateria)
                        .map(([matterName, grade]) => ({ matterName, grade }))
                        .sort((a, b) => a.matterName.localeCompare(b.matterName))
                        .map(grd => {
                          const alunoIst = BulletinsIst.find(a => a.id === aluno.id);
                          const concept1st = alunoIst ? alunoIst.totalPorMateria[grd.matterName] : "";

                          const alunoIInd = BulletinsIInd.find(a => a.id === aluno.id);
                          const concept2nd = alunoIInd ? alunoIInd.totalPorMateria[grd.matterName] : "";

                          const alunoIIIrd = BulletinsIIIrd.find(a => a.id === aluno.id);
                          const concept3rd = alunoIIIrd ? alunoIIIrd.totalPorMateria[grd.matterName] : "";

                          const alunoIVth = BulletinsIVth.find(a => a.id === aluno.id);
                          const concept4th = alunoIVth ? alunoIVth.totalPorMateria[grd.matterName] : "";

                          return (
                            <Emp key={grd.matterName}>
                              <DivNameMatter>
                                <SpanNameMatter>{grd.matterName}</SpanNameMatter>
                              </DivNameMatter>

                              <Grade>
                                <DivBimTable>
                                  <DivBimRow>
                                    <DivBimHeader>1º Bim</DivBimHeader>
                                    <DivBimCell grade={concept1st}>{concept1st || "-"}</DivBimCell>
                                  </DivBimRow>

                                  <DivBimRow>
                                    <DivBimHeader>2º Bim</DivBimHeader>
                                    <DivBimCell grade={concept2nd}>{concept2nd || "-"}</DivBimCell>
                                  </DivBimRow>

                                  <DivBimRow>
                                    <DivBimHeader>3º Bim</DivBimHeader>
                                    <DivBimCell grade={concept3rd}>{concept3rd || "-"}</DivBimCell>
                                  </DivBimRow>

                                  <DivBimRow>
                                    <DivBimHeader>4º Bim</DivBimHeader>
                                    <DivBimCell grade={concept4th}>{concept4th || "-"}</DivBimCell>
                                  </DivBimRow>

                                  <DivBimRow>
                                    <DivBimHeader>Final</DivBimHeader>
                                    <DivBimCell grade={grd.grade}>{grd.grade || "-"}</DivBimCell>
                                  </DivBimRow>
                                </DivBimTable>
                              </Grade>
                            </Emp>
                          );
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
              ))}
          </ContainerDivs>
          <ToGoBack onClick={messageButtonClick}>
            <SignMessageButtonText>Voltar para a</SignMessageButtonText>
            <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
          </ToGoBack>
        </>
      )}
    </Container>
  )
}

export default AllTheBulletins