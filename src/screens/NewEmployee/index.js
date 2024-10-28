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
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [email, setEmail] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [address, setAddress] = useState('');
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
      dateOfBirth,
      cpf,
      rg,
      email,
      cellPhone,
      address,
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
        navigate(-1);
      }
    } else {
      setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
    setLoading(false);
  };

  const messageButtonClick = () => {
    navigate(-1);
  };

  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o primeiro ponto
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca o traço
      .slice(0, 14); // Limita para 14 caracteres
  };

  const maskRG = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
  };

  const maskcellPhone = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
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
            placeholder="Rua, bairro, numero"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text" 
          />
          <Label>Cargo</Label>
          <Select
            id="position"
            value={positionAtSchool}
            onChange={(e) => setPositionAtSchool(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="DIRETOR/SUPERVISOR">DIRETOR/SUPERVISOR</option>
            <option value="SECRETARIO">SECRETARIO</option>
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
