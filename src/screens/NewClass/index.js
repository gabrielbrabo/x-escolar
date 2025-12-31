import React, { useState, useEffect } from 'react';
import { NewClss } from '../../Api';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  InputArea,
  ToGoBack,
  Btt01,
  SignMessageButtonText,
  SignMessageButtonTextBold,
  Input,
  Select
} from './style';
import LoadingSpinner from '../../components/Loading';

const NewClass = () => {
  const navigate = useNavigate();
  const [idSchool, setIdschool] = useState('');
  const year = new Date().getFullYear();
  const [serie, setSerie] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [shift, setShift] = useState('');
  const [classroom_number, /*setClassroom_number*/] = useState('01');
  const [assessmentFormat, setassessmentFormat] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const idSchool = sessionStorage.getItem("id-school");
    const assessmentFormat = sessionStorage.getItem("assessmentFormat");
    setassessmentFormat(assessmentFormat)
    setIdschool(JSON.parse(idSchool));
    setLoading(false);
  }, []);

  const SignClick = async () => {
    setLoading(true);
    const res = await NewClss(
      idSchool,
      year,
      serie,
      name,
      level,
      shift,
      classroom_number
    );
    if (res) {
      navigate('/class');
    }
    setLoading(false);
  };

  const MessageButtomclick = () => {
    navigate('/class');
  };

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2>Cadastro de Turma</h2>
          <InputArea>
            <label>Série</label>
            <Select
              value={serie}
              onChange={(e) => setSerie(e.target.value)}
            >
              <option value="">Selecione a série</option>

              {assessmentFormat === "grade" && (
                <>
                  <option value="1º ANO">1º ANO</option>
                  <option value="2º ANO">2º ANO</option>
                  <option value="3º ANO">3º ANO</option>
                  <option value="4º ANO">4º ANO</option>
                  <option value="5º ANO">5º ANO</option>
                </>
              )}

              {assessmentFormat === "concept" && (
                <>
                  <option value="MATERNAL">MATERNAL</option>
                  <option value="1º PERÍODO">1º PERÍODO</option>
                  <option value="2º PERÍODO">2º PERÍODO</option>
                </>
              )}
            </Select>

            <label>Nome</label>
            <Input
              placeholder="Ex: 5º ANO 01 ZIRALDO MATUT."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Etapa de ensino</label>
            <Select
              id="shift"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Selecione</option>
              {assessmentFormat === "concept" && (
                <option value="EDUCAÇÃO INFANTIL">Educação Infantil</option>
              )}
              {assessmentFormat === "grade" && (
                <option value="ENSINO FUNDAMENTAL">Ensino Fundamental</option>
              )}
            </Select>
            <label>Turno</label>
            <Select
              id="shift"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="MATUTINO">Matutino</option>
              <option value="VESPERTINO">Vespertino</option>
              <option value="NOTURNO">Noturno</option>
            </Select>
            {/*<label>Número da Sala</label>
            <Input
              placeholder="Digite o número da sala"
              value={classroom_number}
              onChange={(e) => setClassroom_number(e.target.value)}
            />*/}
            <Btt01 onClick={SignClick}>Cadastrar</Btt01>
            <ToGoBack onClick={MessageButtomclick}>
              <SignMessageButtonText>Voltar para a</SignMessageButtonText>
              <SignMessageButtonTextBold>Lista de Turmas</SignMessageButtonTextBold>
            </ToGoBack>
          </InputArea>
        </>
      )}
    </Container>
  );
};

export default NewClass;
