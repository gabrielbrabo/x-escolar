import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, } from '../../contexts/auth'

import { api, NewEmp, createSessionEmployee, NameSchool } from '../../Api'

//import { AuthContext, } from '../../contexts/auth'
//import { useNavigate } from 'react-router-dom'

import {
  Container,
  InputArea,
  Label,
  Input,
  Btt01,
  ErrorMessage
  //ToGoBack
} from './style';

import LoadingSpinner from '../../components/Loading'

const FristEmployee = () => {

  const { loginEmployee } = useContext(AuthContext)
  const [idSchool, setIdschool] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [rg, setRg] = useState('');
  const [address, setAddress] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [email, setEmail] = useState('');
  const position_at_school = "SECRETARIO"
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const idSchool = sessionStorage.getItem("id-school")
      setIdschool(JSON.parse(idSchool))
      setLoading(false);
    })()
  }, [])

  const signClick = async () => {
    setLoading(true);
    console.log(
      idSchool,
      name,
      cpf,
      position_at_school,
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
      position_at_school,
      password,
      confirmpassword
    )

    if (res) {
      sessionStorage.removeItem("id-school")
      sessionStorage.removeItem("email-school")
      sessionStorage.removeItem("name-school")
      localStorage.removeItem("type")
      localStorage.removeItem("id_employee")
      sessionStorage.removeItem("id_matter")
      sessionStorage.removeItem("id_class")
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")
      const response = await createSessionEmployee(cpf, password)
      if (response) {
        const IdEmployee = response.data.id
        const loggedEmployee = response.data.CPF
        const token = response.data.token
        const name = response.data.name
        const type = response.data.type
        const position_at_school = response.data.position_at_school
        const id_school = response.data.id_school
        const id_matter = response.data.id_matter
        const id_class = response.data.id_class
        const id_reporter_cardid_class = response.data.id_reporter_card
        //const avatar = response.data.avatar
        const nameSchool = await NameSchool(id_school)
            sessionStorage.setItem("School", nameSchool.data.data)
        localStorage.setItem("Id_employee",
          JSON.stringify(IdEmployee))
        sessionStorage.setItem("cpf", loggedEmployee)
        sessionStorage.setItem("name", name)
        localStorage.setItem("name", name)
        localStorage.setItem("type", type)
        localStorage.setItem("position_at_school", position_at_school)
        sessionStorage.setItem("id-school", JSON.stringify(id_school))
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
          <h1>Cadastre um Secretario</h1>
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