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
  ErrorMessage,
  //CheckboxGroup,
  // CheckboxLabel,
  Select,

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
  const [race, setRace] = useState('');
  const [sex, setSex] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [Registration, setRegistration] = useState('');
  //const [cpf, /*setCpf*/] = useState('0');
  const [fatherCellPhone, setFatherCellPhone] = useState('');
  const [entryDate, setentryDate] = useState('');
  const [address, setAddress] = useState('');
  const [admissionDate, setadmissionDate] = useState('');
  //const [rg, /*setRg*/] = useState('0');
  const [motherName, setmotherName] = useState()
  const [fatherName, setfatherName] = useState()
  const [motherCellPhone, setmotherCellPhone] = useState()
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

    console.log('Sexo antes da requisição:', sex, 'Tipo de sexo:', typeof sex);

    const res = await NewStdt(
      idSchool,
      name,
      dateOfBirth,
      sex,
      race,
      cpf,
      rg,
      Registration,
      fatherCellPhone,
      entryDate,
      admissionDate,
      motherName,
      fatherName,
      motherCellPhone,
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

  const handleChangeFatherCellPhone = (e) => {
    setFatherCellPhone(maskcellPhone(e.target.value));
  };

  const handleChangemotherCellPhone = (e) => {
    setmotherCellPhone(maskcellPhone(e.target.value));
  };
  //console.log("sexo", sex,)
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

  const handleChange = (e) => {
    setCpf(maskCPF(e.target.value));
  };

  const handleChangeRg = (e) => {
    setRg(maskRG(e.target.value));
  };

  return (
    <Container>
      {loading ?
        <LoadingSpinner />
        :
        <>
          <h2>Cadastro de Aluno</h2>
          <p>Itens com * são obrigatorios</p>
          <>
            <InputArea>
              <Label>*Nome Completo</Label>
              <Input
                placeholder="Digite o nome"
                value={name}
                onChange={
                  (e) => setName(e.target.value)
                }
              />
              <Label>*Data de Nascimento</Label>
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
              <Label>*Sexo</Label>
              <Select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </Select>
              <Label>*Cor</Label>
              <Select value={race} onChange={(e) => setRace(e.target.value)}>
                <option value="">Selecione</option>
                <option value="Branca">Branca</option>
                <option value="Preta">Preta</option>
                <option value="Negra">Negra</option>
                <option value="Parda">Parda</option>
                <option value="Indígena">Indígena</option>
                <option value="Outra">Outra</option>
              </Select>
              <Label>Matrícula</Label>
              <Input
                placeholder="Digite o numero da Matrícula"
                value={Registration}
                onChange={
                  (e) => setRegistration(e.target.value)
                }
              />
              <Label>*Nome da Mãe</Label>
              <Input
                placeholder="Nome da Mãe"
                value={motherName}
                onChange={
                  (e) => setmotherName(e.target.value)
                }
              />
              <Label>Nome do Pai</Label>
              <Input
                placeholder="Digite o RGNome do Pai"
                value={fatherName}
                onChange={
                  (e) => setfatherName(e.target.value)
                }
              />
              <Label>*Celular da Mãe</Label>
              <Input
                placeholder="Digite o celular da Mãe"
                value={motherCellPhone}
                onChange={handleChangemotherCellPhone}
                type="text"
              />
              <Label>Celular do pai</Label>
              <Input
                placeholder="Digite o celular do Pai"
                value={fatherCellPhone}
                onChange={handleChangeFatherCellPhone}
                type="text"
              />
              <Label>*Endereço</Label>
              <Input
                placeholder="Cidade, Rua, bairro, numero"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
              />
              <Label>*Data de Ingresso na Escola</Label>
              <Input
                placeholder="Data de ingresso"
                value={entryDate}
                onChange={(e) => setentryDate(e.target.value)}
                type='date'
              />
              <Label>Data de Admissão</Label>
              <Input
                placeholder="Data de admissão"
                value={admissionDate}
                onChange={(e) => setadmissionDate(e.target.value)}
                type='date'
              />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <Btt01 onClick={SignClick}>Cadastrar</Btt01>
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
