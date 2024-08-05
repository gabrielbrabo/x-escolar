import React, { useState, useEffect } from 'react';
import { NewEmp } from '../../Api';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  InputArea,
  ToGoBack,
  Label,
  Input,
  Select,
  Btt01,
  SignMessageButtonText,
  SignMessageButtonTextBold,
  ErrorMessage
} from './style';
import LoadingSpinner from '../../components/Loading';

const NewEmployee = () => {
  const navigate = useNavigate();
  const [idSchool, setIdschool] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [positionAtSchool, setPositionAtSchool] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSchoolId = async () => {
      setLoading(true);
      const idSchool = sessionStorage.getItem("id-school");
      setIdschool(JSON.parse(idSchool));
      setLoading(false);
    };
    fetchSchoolId();
  }, []);

  const signClick = async () => {
    setLoading(true);
    const res = await NewEmp(
      idSchool,
      name,
      cpf,
      positionAtSchool,
      password,
      confirmPassword
    );

    if (res) {
      if (positionAtSchool === 'PROFESSOR') {
        sessionStorage.removeItem('id_emp');
        sessionStorage.removeItem('name');
        sessionStorage.setItem("id_emp", res.data.id_employee);
        sessionStorage.setItem("name", res.data.name_employee);
        navigate('/add/matter');
      } else {
        navigate('/employees');
      }
    } else {
      setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
    setLoading(false);
  };

  const messageButtonClick = () => {
    navigate('/employees');
  };

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <InputArea>
          <h1>Cadastro de Funcionario</h1>
          <Label>Nome</Label>
          <Input
            placeholder="Digite o nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label>CPF</Label>
          <Input
            placeholder="Digite o CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <Label>Cargo</Label>
          <Select
            id="position"
            value={positionAtSchool}
            onChange={(e) => setPositionAtSchool(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="GESTOR">GESTOR</option>
            <option value="PROFESSOR">PROFESSOR</option>
          </Select>
          <Label>Senha</Label>
          <Input
            placeholder="Digite a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Label>Confirme a Senha</Label>
          <Input
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Btt01 onClick={signClick}>Cadastrar</Btt01>
          <ToGoBack onClick={messageButtonClick}>
            <SignMessageButtonText>Voltar para a</SignMessageButtonText>
            <SignMessageButtonTextBold>Lista de Funcionários</SignMessageButtonTextBold>
          </ToGoBack>
        </InputArea>
      )}
    </Container>
  );
};

export default NewEmployee;
