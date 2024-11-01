import React, { useState, useEffect } from 'react';
import { /*useLocation,*/ useNavigate } from 'react-router-dom';
import { NewEmp } from '../../Api';
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

const EmployeeAlreadyRegistered = () => {
  //const location = useLocation();
  const navigate = useNavigate();
  ///const { employee } = location.state || {};

  const [idSchool, setIdSchool] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [email, setEmail] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [address, setAddress] = useState('');
  const [position_at_school, setPositionAtSchool] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSchoolId = async () => {
      setLoading(true);
      const IdSchool = sessionStorage.getItem("id-school");
      const Name = sessionStorage.getItem('employeeName');
      const DateOfBirth = sessionStorage.getItem('dateOfBirth');
      const Cpf = sessionStorage.getItem('employeeCPF');
      const Rg = sessionStorage.getItem('employeeRG');
      const Email = sessionStorage.getItem('employeeEmail');
      const CellPhone= sessionStorage.getItem('employeeCellPhone');
      const Address = sessionStorage.getItem('employeeAddress');
      const Password = sessionStorage.getItem('password');
      const Confirmpassword = sessionStorage.getItem('password');

      setIdSchool(JSON.parse(IdSchool))
      setName(Name)
      setDateOfBirth(DateOfBirth)
      setCpf(Cpf)
      setRg(Rg)
      setEmail(Email)
      setCellPhone(CellPhone)
      setAddress(Address)
      setPassword(Password)
      setConfirmpassword(Confirmpassword)

      setLoading(false);
    };
    fetchSchoolId();
  }, []);

  const signClick = async () => {
    setLoading(true);

    if (!idSchool) {
      setErrorMessage('Erro: ID da escola não encontrado. Por favor, tente novamente.');
      setLoading(false);
      return;
    }

    // Verifique se os dados necessários estão definidos
    if (!name || !dateOfBirth || !rg || !email || !cellPhone || !address || !position_at_school) {
      setErrorMessage('Erro: Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    const res = await NewEmp(
      idSchool,
      name,
      dateOfBirth,
      cpf,
      rg,
      email,
      cellPhone,
      address,
      position_at_school,
      password,
      confirmpassword, // Adicione isso
    );

    console.log('Resposta da API:', res);
    console.log(
      "Requisição enviada:",
      idSchool,
      name,
      dateOfBirth,
      cpf,
      rg,
      email,
      cellPhone,
      address,
      position_at_school,
      password,
      confirmpassword,
    );

    if (res) {
      navigate(-2);
    } else {
      setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
      navigate(-1)
    }
  };

  return (
    <Container>
      <InputArea>
        <h1>Funcionário já Cadastrado</h1>
        <Label>Nome</Label>
        <Input
          name="name"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label>Data de Nascimento</Label>
        <Input
          name="dateOfBirth"
          placeholder="Data de nascimento"
          value={dateOfBirth}
          type='date'
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <Label>CPF</Label>
        <Input
          placeholder="CPF"
          value={cpf}
          readOnly
        />
        <Label>RG</Label>
        <Input
          name="rg"
          placeholder="RG"
          value={rg}
          onChange={(e) => setRg(e.target.value)}
        />
        <Label>Email</Label>
        <Input
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label>Celular</Label>
        <Input
          name="cellPhone"
          placeholder="Celular"
          value={cellPhone}
          onChange={(e) => setCellPhone(e.target.value)}
        />
        <Label>Endereço</Label>
        <Input
          name="address"
          placeholder="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Label>Cargo</Label>
        <Select
          name="positionAtSchool"
          id="position"
          value={position_at_school}
          onChange={(e) => setPositionAtSchool(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="DIRETOR/SUPERVISOR">DIRETOR/SUPERVISOR</option>
          <option value="SECRETARIO">SECRETARIO</option>
          <option value="PROFESSOR">PROFESSOR</option>
        </Select>
        <Label>Senha</Label>
        <Input
          placeholder="Senha"
          value={password}
          type="password"
          readOnly
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Btt01 onClick={signClick} disabled={loading}>Cadastrar</Btt01>
        <ToGoBack onClick={() => navigate(-1)}>
          <SignMessageButtonText>Voltar para a</SignMessageButtonText>
          <SignMessageButtonTextBold> tela anterior</SignMessageButtonTextBold>
        </ToGoBack>
      </InputArea>
    </Container>
  );
};

export default EmployeeAlreadyRegistered;
