import React, { useState, useContext, useEffect } from 'react';

import { registerSchool } from '../../Api'
import { AuthContext, } from '../../contexts/auth'

//import { AuthContext, } from '../../contexts/auth'
//import { useNavigate } from 'react-router-dom'
import { api, createSessionSchool } from '../../Api'

import {
  Container,
  InputArea,
  Area,
  Input,
  Btt
} from './style';

/*import {
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold
} from '../../components/Buttons';*/
import LoadingSpinner from '../../components/Loading'

const SignUpSchool = () => {

  //const navigate = useNavigate()
  const { loginSchool } = useContext(AuthContext)
  const [name, setName] = useState('');
  //const [email, /*setEmail*/] = useState('');
  const [city, setCity] = useState('');
  const [endereço, setEndereço] = useState('');
  const [evaluationType, setEvaluationType] = useState('');
  const [educationDepartment, setEducationDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const password = "g";
  const confirmpassword = "g";

  useEffect(() => {
    const EducationDepartment = sessionStorage.getItem('idDepartment');
    setEducationDepartment(EducationDepartment);
    console.log("id_EducationDepartment", EducationDepartment)
    //setName(name)
  }, [])

  const SignClick = async (e) => {
    e.preventDefault(); // 👉 impede o reload automático do form
    if (
      !name.trim() ||
     // !email.trim() ||
      !city.trim() ||
      !endereço.trim() ||
      !evaluationType.trim() ||
      !password ||
      !confirmpassword ||
      !educationDepartment.trim()
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    const res = await registerSchool(
      name,
      //email,
      city,
      endereço,
      evaluationType,
      password,
      confirmpassword,
      educationDepartment
    )
    console.log("res01", res)

    if (res.data.token || res.data.id) {

      console.log("res", res.data.token)
      //loginSchool(email, password)

      const response = await createSessionSchool(res.data.id, password)
      console.log(response)
      if (response) {
        const IdSchool = response.data._id
        const loggedSchool = response.data._id
        const token = response.data.token
        const name = response.data.name
        const type = response.data.type
        const id_employee = response.data.id_employee
        const id_matter = response.data.id_matter
        const id_class = response.data.id_class
        //const avatar = response.data.avatar
        sessionStorage.setItem("id-school",
          JSON.stringify(IdSchool))
        sessionStorage.setItem("email-school", loggedSchool)
        sessionStorage.setItem("name-school", name)
        sessionStorage.setItem("type", type)
        sessionStorage.setItem("id_employee", id_employee)
        sessionStorage.setItem("id_matter", id_matter)
        sessionStorage.setItem("id_class", id_class)
        sessionStorage.setItem("token", token)

        /*if (avatar) {
            sessionStorage.setItem("avatar", avatar)
        }*/

        api.defaults.headers.Authorization = `Bearer ${token}`
        loginSchool(loggedSchool)
      }
    }
    setLoading(false);
  }

  /*const MessageButtomclick = () => {
    navigate('/')
  }*/

  return (
    <Container>
      {loading ?
        <LoadingSpinner />
        :
        <>
          <h1>Cadastro de Instituição de Ensino</h1>
          <InputArea onSubmit={SignClick}>
            <>Nome da Instituição de Ensino</>
            <Area>
              <Input
                placeholder="Digite seu nome"
                value={name}
                onChange={
                  (e) => setName(e.target.value)
                }
              />
            </Area>
            {/*<>Email da Instituição de Ensino</>
            <Area>
              <Input
                placeholder="Digite seu email"
                value={email}
                onChange={
                  (e) => setEmail(e.target.value)
                }
              />
            </Area>*/}
            <> Município</>
            <Area>
              <Input
                placeholder="Digite o  município"
                value={city}
                onChange={
                  (e) => setCity(e.target.value)
                }
              />
            </Area>
            <> Endereço</>
            <Area>
              <Input
                placeholder="Digite o  endereço"
                value={endereço}
                onChange={
                  (e) => setEndereço(e.target.value)
                }
              />
            </Area>
            <>Forma de Avaliação</>
            <Area>
              <select
                value={evaluationType}
                onChange={(e) => setEvaluationType(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                }}
              >
                <option value="" disabled>Selecione uma opção</option>
                <option value="grade">Notas</option>
                <option value="concept">Conceitos</option>
              </select>
            </Area>
            <Btt type='submit'>Cadastra</Btt>
          </InputArea>
          {/*<SignMessageButton onClick={MessageButtomclick}>
            <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
            <SignMessageButtonTextBold>Faça o login!</SignMessageButtonTextBold>
          </SignMessageButton>*/}
        </>
      }
    </Container>
  )
}
export default SignUpSchool