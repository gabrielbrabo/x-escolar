import React, { useState, useEffect } from 'react';
import { NewEmpEducationDepartament, } from '../../Api';
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
  ErrorMessage,
} from './style';
import LoadingSpinner from '../../components/Loading';

const NewEmployee = () => {
  const navigate = useNavigate();
  const [IdDepartment, setidDepartment] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [email, setEmail] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [address, setAddress] = useState('');
  const [positionAtEducationDepartment, setpositionAtEducationDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSchoolId = async () => {
      setLoading(true);
      const idDepartment = sessionStorage.getItem("idDepartment");
      setidDepartment(idDepartment);
      setLoading(false);
    };
    fetchSchoolId();
  }, []);

  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  const maskRG = (value) => {
    return value.replace(/\D/g, '');
  };

  const maskcellPhone = (value) => {
    return value.replace(/\D/g, '');
  };

  const handleChange = (e) => {
    setCpf(maskCPF(e.target.value));
  };

  const handleChangeRg = (e) => {
    setRg(maskRG(e.target.value));
  };

  const handleChangecellPhone = (e) => {
    setCellPhone(maskcellPhone(e.target.value));
  };

  const signClick = async () => {
    setLoading(true);

    const res = await NewEmpEducationDepartament(
      IdDepartment,
      name,
      dateOfBirth,
      cpf,
      rg,
      email,
      cellPhone,
      address,
      positionAtEducationDepartment,
      password,
      confirmPassword
    )

    if (res) {
      navigate(-1);
    } else {
      setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
    setLoading(false);
  };

  const messageButtonClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <InputArea>
          <h2>Cadastro de Funcionário</h2>
          <p>Ao finalizar o cadastro forneça as informações de CPF e senha ao funcionario para que possa acessar sua conta na pagina de login !!!</p>
          <Label>Nome Completo</Label>
          <Input
            placeholder="Digite o nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label>Data de Nascimento</Label>
          <Input
            placeholder="Data de nascimento"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            type='date'
          />
          <Label>CPF</Label>
          <Input
            placeholder="Digite o CPF"
            value={cpf}
            onChange={handleChange}
            type="text"
            maxLength="14"
          />
          {/*
            employeeExists && 
            <ErrorMessage>
              Funcionário já cadastrado. Deseja cadastrar sem modificações?
            </ErrorMessage>*/
          }
          <Label>RG</Label>
          <Input
            placeholder="Digite o RG"
            value={rg}
            onChange={handleChangeRg}
            type="text"
          />
          <Label>Email</Label>
          <Input
            placeholder="Digite o Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <Label>Celular</Label>
          <Input
            placeholder="Digite o celular"
            value={cellPhone}
            onChange={handleChangecellPhone}
            type="text"
          />
          <Label>Endereço</Label>
          <Input
            placeholder="Rua, bairro, número"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
          />
          <Label>Cargo</Label>
          <Select
            id="position"
            value={positionAtEducationDepartment}
            onChange={(e) => setpositionAtEducationDepartment(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="SECRETÁRIO(A) DE EDUCAÇÃO">SECRETÁRIO(A) DE EDUCAÇÃO</option>
            <option value="ASSISTENTE ADMINISTRATIVO">ASSISTENTE ADMINISTRATIVO</option>
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
            <SignMessageButtonTextBold> tela anterior</SignMessageButtonTextBold>
          </ToGoBack>
        </InputArea>
      )}
    </Container>
  );
};

export default NewEmployee;
