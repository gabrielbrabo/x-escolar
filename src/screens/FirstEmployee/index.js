import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext, } from '../../contexts/auth'

import { api, NewEmp, createSessionEmployee, NameSchool, loginWithSchool, checkEmployee } from '../../Api'

//import { AuthContext, } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  InputArea,
  Label,
  Input,
  Select,
  Btt01,
  ErrorMessage,
  WarningContainer,
  WarningMessage,
  WarningButton
  //ToGoBack
} from './style';

import LoadingSpinner from '../../components/Loading'

const FristEmployee = () => {

  const navigate = useNavigate();
  const { loginEmployee } = useContext(AuthContext)
  const [idSchool, setIdschool] = useState('');
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
  const [employeeExists, setEmployeeExists] = useState(false);
  const [registeredEmployeeInfo, setRegisteredEmployeeInfo] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const idSchool = sessionStorage.getItem("id-school")
      setIdschool(JSON.parse(idSchool))
      setLoading(false);
    })()
  }, [])

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

  const signClick = async () => {
    setLoading(true);
    console.log(
      idSchool,
      name,
      cpf,
      positionAtSchool,
      password,
      confirmpassword
    )

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
      confirmpassword
    )

    if (res) {
      //sessionStorage.removeItem("id-school")
      //sessionStorage.removeItem("email-school")
      //sessionStorage.removeItem("name-school")
      localStorage.removeItem("type")
      localStorage.removeItem("id_employee")
      sessionStorage.removeItem("id_matter")
      sessionStorage.removeItem("id_class")
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")
      const response = await createSessionEmployee(cpf, password)
      if (response) {

        const Schools = response.data.schools

        const id_school = sessionStorage.getItem("id-school")
        console.log("id_school", id_school)
        console.log("response", response)

        if (Schools) {

          console.log("Schools", Schools)
          const schoolId = JSON.parse(id_school);
          const userCPF = cpf;
          // Verifica se as escolas estão disponíveis e o CPF tem um valor definido
          if (schoolId && userCPF) {
            const response = await loginWithSchool(cpf, schoolId)

            if (response) {
              console.log("loginWithSchool", response)

              const IdEmployee = response.data.id
              const loggedEmployee = response.data.CPF
              const token = response.data.token
              const name = response.data.name
              const type = response.data.type
              const position_at_school = response.data.position_at_school
              const id_school = response.data.id_school
              //console.log("id_school", id_school.join(''))
              const id_matter = response.data.id_matter
              const id_class = response.data.id_class
              const id_reporter_cardid_class = response.data.id_reporter_card
              //const avatar = response.data.avatar
              const nameSchool = await NameSchool(id_school)
              sessionStorage.setItem("School", nameSchool.data.data)
              localStorage.setItem("Id_employee", JSON.stringify(IdEmployee))
              sessionStorage.setItem("cpf", loggedEmployee)
              sessionStorage.setItem("name", name)
              localStorage.setItem("name", name)
              localStorage.setItem("type", type)
              localStorage.setItem("position_at_school", position_at_school)
              //sessionStorage.setItem("id-school", JSON.stringify(id_school))
              sessionStorage.setItem("id_matter", id_matter)
              sessionStorage.setItem("id_class", id_class)
              sessionStorage.setItem("id_reporter_cardid_class", id_reporter_cardid_class)
              localStorage.setItem("token", token)
              sessionStorage.setItem("token", token)

              /*if (avatar) {
                  sessionStorage.setItem("avatar", avatar)
              }*/

              api.defaults.headers.Authorization = `Bearer ${token}`
              loginEmployee(loggedEmployee)
              window.location.reload()
            }
            //navigate('/school/selection', { state: { schools, cpf: userCPF } });
            return; // Sai da função aqui para evitar a execução do restante
          }
        }

        const IdEmployee = response.data.id
        const loggedEmployee = response.data.CPF
        const token = response.data.token
        const name = response.data.name
        const type = response.data.type
        const position_at_school = response.data.position_at_school
        //const id_school = response.data.id_school
        //console.log("id_school", id_school)
        const id_matter = response.data.id_matter
        const id_class = response.data.id_class
        const id_reporter_cardid_class = response.data.id_reporter_card
        //const avatar = response.data.avatar
        const nameSchool = await NameSchool(JSON.parse(id_school))
        sessionStorage.setItem("School", nameSchool.data.data)
        localStorage.setItem("Id_employee", JSON.stringify(IdEmployee))
        sessionStorage.setItem("cpf", loggedEmployee)
        sessionStorage.setItem("name", name)
        localStorage.setItem("name", name)
        localStorage.setItem("type", type)
        localStorage.setItem("position_at_school", position_at_school)
        //sessionStorage.setItem("id-school", JSON.stringify(id_school))
        sessionStorage.setItem("id_matter", id_matter)
        sessionStorage.setItem("id_class", id_class)
        sessionStorage.setItem("id_reporter_cardid_class", id_reporter_cardid_class)
        localStorage.setItem("token", token)
        sessionStorage.setItem("token", token)

        /*if (avatar) {
            sessionStorage.setItem("avatar", avatar)
        }*/

        api.defaults.headers.Authorization = `Bearer ${token}`
        loginEmployee(loggedEmployee)
        window.location.reload()
      }
      setLoading(false);
    } else {
      setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
    setLoading(false);
  }

  
  console.log("response", employeeExists);

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

    navigate('/manager-already-registered');
  };


  const handleCancel = () => {
    setShowWarning(false);
    setCpf('');
  };

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
            <option value="DIRETOR/SUPERVISOR">DIRETOR/SUPERVISOR</option>
            <option value="SECRETARIO">SECRETARIO</option>
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