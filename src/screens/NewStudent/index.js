import React, { useState, useEffect } from 'react';

import { NewStdt } from '../../Api'

//import { AuthContext, } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  InputArea,
  Btt01,
  SignMessageButtonText,
  SignMessageButtonTextBold,
  Input,
  ToGoBack,
  Label,
  ErrorMessage
} from './style';

/*import {
  /*Area,
  Input,
  /*Select
} from '../../components/Inputs';

import {
  Btt01,
  SignMessageButtonText,
  SignMessageButtonTextBold
} from '../../components/Buttons';*/

import LoadingSpinner from '../../components/Loading'

const NewStudent = () => {

  const navigate = useNavigate()
  const [idSchool, setIdschool] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [cpf, /*setCpf*/] = useState('0');
  const [cellPhoneOfParentsOrGuardians, setCellPhoneOfParentsOrGuardians] = useState('');
  const [address, setAddress] = useState('');
  const [rg, /*setRg*/] = useState('0');
  const [cellPhone, setCellPhone] = useState()
  const [password, /*setPassword*/] = useState('g');
  const [confirmpassword, /*setConfirmPassword*/] = useState('g');
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

  const SignClick = async () => {
    setLoading(true);
    const registerStudent = (Math.floor(Math.random() * 1111111 + 1000000))

    console.log(
      idSchool,
      name,
      dateOfBirth,
      cpf,
      rg,
      cellPhone,
      cellPhoneOfParentsOrGuardians,
      address,
      registerStudent,
      password,
      confirmpassword
    )

    const res = await NewStdt(
      idSchool,
      name,
      dateOfBirth,
      //cpf,
      //rg,
      cellPhone,
      cellPhoneOfParentsOrGuardians,
      address,
      registerStudent.toString(),
      password,
      confirmpassword
    )

    if (res) {
      navigate(-1);
    } else {
      setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
    setLoading(false);
  }

  const MessageButtomclick = () => {
    navigate(-1);
  }

  /*const maskCPF = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o primeiro ponto
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca o traço
      .slice(0, 14); // Limita para 14 caracteres
  };

  const handleChange = (e) => {
    setCpf(maskCPF(e.target.value));
  };*/

  const maskcellPhone = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
  };

  const handleChangecellPhoneOfParentsOrGuardians = (e) => {
    setCellPhoneOfParentsOrGuardians(maskcellPhone(e.target.value));
  };
  
  const handleChangecellPhone = (e) => {
    setCellPhone(maskcellPhone(e.target.value));
  };


  return (
    <Container>
      {loading ?
        <LoadingSpinner />
        :
        <>
          <h1>Cadastro de Aluno</h1>
          <>
            <InputArea>
              <Label>Nome</Label>
              <Input
                placeholder="Digite o nome"
                value={name}
                onChange={
                  (e) => setName(e.target.value)
                }
              />
              <Label>Data de Nascimento</Label>
              <Input
                placeholder="Data de nascimento"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                type='date'
              />
              {/*<Label>CPF</Label>
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
                onChange={
                  (e) => setRg(e.target.value)
                }
              />*/}
              <Label>Celular</Label>
              <Input
                placeholder="Digite o celular"
                value={cellPhone}
                onChange={handleChangecellPhone}
                type="text"
              />
              <Label>Celular do Responsavel</Label>
              <Input
                placeholder="Digite o celular"
                value={cellPhoneOfParentsOrGuardians}
                onChange={handleChangecellPhoneOfParentsOrGuardians}
                type="text"
              />
              <Label>Endereço</Label>
              <Input
                placeholder="Rua, bairro, numero"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
              />
             { /*<Label>Senha</Label>
              <Input
                placeholder="Digite a senha"
                value={password}
                onChange={
                  (e) => setPassword(e.target.value)
                }
              />
              <Label>Confirme Senha</Label>
              <Input
                placeholder="Confirme a senha"
                value={confirmpassword}
                onChange={
                  (e) => setConfirmPassword(e.target.value)
                }
              />*/}
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <Btt01 onClick={SignClick}>Cadastra</Btt01>
              <ToGoBack onClick={MessageButtomclick}>
                <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                <SignMessageButtonTextBold>Lista de Alunos</SignMessageButtonTextBold>
              </ToGoBack>
            </InputArea>
          </>
        </>
      }
    </Container>
  )
}
export default NewStudent