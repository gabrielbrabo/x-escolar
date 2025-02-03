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
  const [level, /*setLevel*/] = useState('BASICO');
  const [shift, setShift] = useState('');
  const [classroom_number, /*setClassroom_number*/] = useState('01');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const idSchool = sessionStorage.getItem("id-school");
    setIdschool(JSON.parse(idSchool));
    setLoading(false);
  }, []);

  const SignClick = async () => {
    setLoading(true);
    const res = await NewClss(
      idSchool,
      year,
      serie,
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
            <Input
              placeholder="Digite a série e numero da truma Ex: 3º ano 01"
              value={serie}
              onChange={(e) => setSerie(e.target.value)}
            />
            {/*<label>Nível</label>
            <Input
              placeholder="Digite o nível"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />*/}
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
