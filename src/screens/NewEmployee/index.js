import React, { useState, useEffect, useCallback } from 'react';
import { NewEmp, checkEmployee } from '../../Api';
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
  WarningContainer,
  WarningMessage,
  WarningButton
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
  const [employeeExists, setEmployeeExists] = useState(false);
  const [registeredEmployeeInfo, setRegisteredEmployeeInfo] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const fetchSchoolId = async () => {
      setLoading(true);
      const idSchool = sessionStorage.getItem("id-school");
      setIdschool(JSON.parse(idSchool));
      setLoading(false);
    };
    fetchSchoolId();
  }, []);

  const checkIfEmployeeExists = useCallback(async () => {
    const response = await checkEmployee(cpf);
    console.log("response", response);
    setEmployeeExists(response.data.exists);
    if (response.data.exists) {
      setShowWarning(true);
      setRegisteredEmployeeInfo(response.data.data);
    } else {
      setShowWarning(false);
    }
  }, [cpf]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cpf.length === 14) {
        checkIfEmployeeExists();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cpf, checkIfEmployeeExists]);

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
      navigate(-1);
    } else {
      setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
    setLoading(false);
  };

  const messageButtonClick = () => {
    navigate(-1);
  };

  // Modifique a função handleRegister para enviar o registeredEmployeeInfo
  const handleRegister = () => {

    if (registeredEmployeeInfo) {

      // Armazenar os dados no sessionStorage
      const employeeData = registeredEmployeeInfo;
      sessionStorage.setItem('employeeName', employeeData.name);
      sessionStorage.setItem('dateOfBirth', employeeData.dateOfBirth);
      sessionStorage.setItem('employeeCPF', employeeData.cpf);
      sessionStorage.setItem('employeeRG', employeeData.rg);
      sessionStorage.setItem('employeeEmail', employeeData.email);
      sessionStorage.setItem('employeeCellPhone', employeeData.cellPhone);
      sessionStorage.setItem('employeeAddress', employeeData.address);
      sessionStorage.setItem('password', employeeData.password);
      // Adicione mais campos conforme necessário
    } else {
      setShowWarning(false);
    }

    navigate('/employee-already-registered');
  };


  const handleCancel = () => {
    setShowWarning(false);
    setCpf('');
  };

  console.log("response", employeeExists);

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : showWarning ? (
        <WarningContainer>
          <WarningMessage>
            Funcionário já cadastrado em outra escola. Deseja cadastrá-lo nesta escola também?
          </WarningMessage>
          {registeredEmployeeInfo && (
            <div>
              <h3>Informações do Funcionário:</h3>
              <p><strong>Nome:</strong> {registeredEmployeeInfo.name}</p>
              <p><strong>CPF:</strong> {registeredEmployeeInfo.cpf}</p>
            </div>
          )}
          <WarningButton onClick={handleRegister}>Sim</WarningButton>
          <WarningButton onClick={handleCancel}>Não</WarningButton>
        </WarningContainer>
      ) : (
        <InputArea>
          <h1>Cadastro de Funcionário</h1>
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
            <SignMessageButtonTextBold> tela anterior</SignMessageButtonTextBold>
          </ToGoBack>
        </InputArea>
      )}
    </Container>
  );
};

export default NewEmployee;
