import React, { useState, useEffect, useContext, } from 'react';
import { AuthContext, } from '../../contexts/auth'

import { api, NewEmpEducationDepartament, createSessionEmployeeEducationDepartment, } from '../../Api'

//import { AuthContext, } from '../../contexts/auth'
//import { useNavigate } from 'react-router-dom'

import {
  Container,
  InputArea,
  Label,
  Input,
  Select,
  Btt01,
  ErrorMessage,
  //ToGoBack
} from './style';

import LoadingSpinner from '../../components/Loading'

const FristEmployee = () => {

  //const navigate = useNavigate();
  const { loginEmployeeEducationDepartment } = useContext(AuthContext)
  const [loggedEducationDepartment, setloggedEducationDepartment] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [rg, setRg] = useState('');
  const [address, setAddress] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [email, setEmail] = useState('');
  const [positionAtSchool, setPositionAtSchool] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  //const [employeeExists, setEmployeeExists] = useState(false);
  //const [registeredEmployeeInfo, setRegisteredEmployeeInfo] = useState(null);
  //const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const loggedEducationDepartment = sessionStorage.getItem("loggedEducationDepartment")
      setloggedEducationDepartment(loggedEducationDepartment)
      setLoading(false);
    })()
  }, [])

  /*const checkIfEmployeeExists = useCallback(async () => {
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
  }, [cpf, checkIfEmployeeExists]);*/

  const signClick = async () => {
    setLoading(true);
    console.log(
      loggedEducationDepartment,
      name,
      cpf,
      positionAtSchool,
      password,
      confirmpassword
    )

    const res = await NewEmpEducationDepartament(
      loggedEducationDepartment,
      name,
      dateOfBirth,
      cpf,
      rg,
      email,
      cellPhone,
      address,
      positionAtSchool,
      password,
      confirmpassword
    )

    if (res) {
      //sessionStorage.removeItem("id-school")
      //sessionStorage.removeItem("email-school")
      //sessionStorage.removeItem("name-school")
      localStorage.removeItem("type")
      localStorage.removeItem("id_employee")
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")
      const response = await createSessionEmployeeEducationDepartment(cpf, password)
      if (response) {

        const IdEmployee = response.data.id
        const loggedEmployee = response.data.CPF
        const token = response.data.token
        const name = response.data.name
        const type = response.data.type
        const positionAtEducationDepartment = response.data.positionAtEducationDepartment
        //const idEducationDepartment = response.data.idEducationDepartment
        //const nameSchool = await NameSchool(JSON.parse(idEducationDepartment))

        //sessionStorage.setItem("School", nameSchool.data.data)
        localStorage.setItem("Id_employee", JSON.stringify(IdEmployee))
        sessionStorage.setItem("cpf", loggedEmployee)
        sessionStorage.setItem("name", name)
        localStorage.setItem("name", name)
        localStorage.setItem("type", type)
        localStorage.setItem("positionAtEducationDepartment", positionAtEducationDepartment)
        localStorage.setItem("token", token)
        sessionStorage.setItem("token", token)

        /*if (avatar) {
            sessionStorage.setItem("avatar", avatar)
        }*/

        api.defaults.headers.Authorization = `Bearer ${token}`
        loginEmployeeEducationDepartment(loggedEmployee)
        window.location.reload()
      }
      setLoading(false);
    } else {
      setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
    setLoading(false);
  }

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

  /*const handleRegister = () => {

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

    navigate('/manager-already-registered');
  };*/

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <InputArea>
          <h1>Cadastro do Gestor</h1>
          <p>A partir desse gestor sera possivel cadastra outros funcionarios e fazer outras configurações para o melhor funcionamento do sistema !!!</p>
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
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Btt01 onClick={signClick}>Cadastrar</Btt01>
        </InputArea>
      )}
    </Container>
  )
}

export default FristEmployee