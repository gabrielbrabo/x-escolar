import React, { useState, useEffect, } from 'react';
import {
  Container,
  ContainerDivs,
  InputArea,
  Input,
  Label,
  Select,
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
  SignMessageButtonText,
  SignMessageButtonTextBold
} from './style';

import {
  getIstQuarter,
  getIIndQuarter,
  getIIIrdQuarter,
  getIVthQuarter,
  getVthQuarter,
  getVIthQuarter,
  allTheBulletinsGrades
} from '../../Api';

//import GlobalStyle from './style';

import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

import { FcSurvey } from "react-icons/fc";

import { useNavigate, useParams } from 'react-router-dom';

import LoadingSpinner from '../../components/Loading';

const AllTheBulletins = () => {

  const navigate = useNavigate()
  const [Selectbimonthly, setSelectbimonthly] = useState();
  const [bimestre, setBimestre] = useState({});
  const [bimonthly, setBimonthly] = useState([]);
  const [Bulletins, setBulletins] = useState([]);
  const [cla$$, setClass] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [nameSchool, setNameSchool] = useState('')
  const [loading, setLoading] = useState(true);

  const { idClass } = useParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const idSchool = sessionStorage.getItem("id-school");
      const nameSchool = sessionStorage.getItem("School");
      setNameSchool(nameSchool)
      const year = new Date().getFullYear();
      const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
      const IIndQuarter = await getIIndQuarter(year, JSON.parse(idSchool))
      const IIIrdQuarter = await getIIIrdQuarter(year, JSON.parse(idSchool))
      const IVthQuarter = await getIVthQuarter(year, JSON.parse(idSchool))
      const VthQuarter = await getVthQuarter(year, JSON.parse(idSchool))
      const VIthQuarter = await getVIthQuarter(year, JSON.parse(idSchool))

      const i = IstQuarter.data.data.find(res => res) || null;
      const ii = IIndQuarter.data.data.find(res => res) || null;
      const iii = IIIrdQuarter.data.data.find(res => res) || null;
      const iv = IVthQuarter.data.data.find(res => res) || null;
      const v = VthQuarter.data.data.find(res => res) || null;
      const vi = VIthQuarter.data.data.find(res => res) || null;

      setBimonthly([i, ii, iii, iv, v, vi].filter(res => res !== null));

      setLoading(false);
    })();

  }, []);

  useEffect(() => {
    const fetchBulletins = async () => {
      setLoading(true);

      if (Selectbimonthly) {
        console.log("Bimestre selecionado:", Selectbimonthly);

        const bimestreMapping = {
          "1º BIMESTRE": "id_iStQuarter",
          "2º BIMESTRE": "id_iiNdQuarter",
          "3º BIMESTRE": "id_iiiRdQuarter",
          "4º BIMESTRE": "id_ivThQuarter",
          "5º BIMESTRE": "id_vThQuarter",
          "6º BIMESTRE": "id_viThQuarter",
        };

        const quarterIdKey = bimestreMapping[Selectbimonthly.bimonthly];

        console.log('quarterIdKey', quarterIdKey);
        console.log('Selectbimonthly', Selectbimonthly);

        if (quarterIdKey) {
          const idQuarter = Selectbimonthly._id;
          try {
            const res = await allTheBulletinsGrades({
              idClass,
              [quarterIdKey]: idQuarter,
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
          } catch (error) {
            console.error("Erro ao buscar boletins:", error);
          }
        }
      }

      setLoading(false);
    };

    fetchBulletins();
  }, [Selectbimonthly, idClass]);

  const messageButtonClick = () => {
    navigate(-1);
  };

  const handleBimonthlyChange = (e) => {
    const selectedBimonthly = JSON.parse(e.target.value);
    setSelectbimonthly(selectedBimonthly);
  };

  console.log("Bulletins", Bulletins)
  console.log("cla$$", cla$$)
  console.log("teacher", teacher)

  return (
    <Container>
      {/*<GlobalStyle />*/} {/* Adicionando estilos globais */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ContainerDivs>
            <InputArea>
              {!Selectbimonthly && (
                <>
                  <h2>Selecione o Bimestre</h2>
                  <Input>
                    <Label>Bimestres</Label>
                    <Select
                      id="id-bimonthly"
                      value={Selectbimonthly ? JSON.stringify(Selectbimonthly) : ""}
                      onChange={handleBimonthlyChange}
                    >
                      <option value="">Selecione</option>
                      {bimonthly.map(res => (
                        <option key={res._id} value={JSON.stringify({ _id: res._id, bimonthly: res.bimonthly, })}>
                          {res.bimonthly}
                        </option>
                      ))}
                    </Select>
                  </Input>
                </>
              )}
              {
                Selectbimonthly &&
                Bulletins.map((aluno, index) => (
                  <DivAddEmp key={aluno.id || index}>
                    <h2>Boletim</h2>
                    <AddEmp>
                      <h3>1º Bimestre</h3>
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
                                      grade={parseFloat(grd.grade) || 0}
                                     averageGrade={parseFloat(bimestre.averageGrade) || 0}
                                     totalGrade={parseFloat(bimestre.totalGrade) || 0}
                                    >
                                      {parseFloat(grd.grade).toFixed(1)}
                                    </DivBimCell>
                                  </DivBimRow>

                                  <DivBimRow>
                                    <DivBimHeader>2º Bim</DivBimHeader>
                                    <DivBimCell>-</DivBimCell>
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
                ))
              }
            </InputArea>
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