import React, { useState, useContext } from 'react';

import { registerSchool } from '../../Api'
import { AuthContext, } from '../../contexts/auth'

//import { AuthContext, } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'
import { api, createSessionSchool } from '../../Api'

import {
  Container,
  InputArea,
  Area,
  Input,
  Btt
} from './style';

import {
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold
} from '../../components/Buttons';
import LoadingSpinner from '../../components/Loading'

const SignUpSchool = () => {

  const navigate = useNavigate()
  const { loginSchool } = useContext(AuthContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const password = "g";
  const confirmpassword = "g";

  const SignClick = async () => {

    setLoading(true);
    const res = await registerSchool(
      name,
      email,
      password,
      confirmpassword
    )
    console.log("res01", res)

    if (res.data.token || res.data.email) {

      console.log("res", res.data.token)
      //loginSchool(email, password)

      const response = await createSessionSchool(email, password)
      console.log(response)
      if (response) {
        const IdSchool = response.data.id
        const loggedSchool = response.data.email
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

  const MessageButtomclick = () => {
    navigate('/')
  }

  return (
    <Container>
      {loading ?
        <LoadingSpinner />
        :
        <>
          <h1>Cadastro de Instituição</h1>
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
            <>Email da Instituição de Ensino</>
            <Area>
              <Input
                placeholder="Digite seu email"
                value={email}
                onChange={
                  (e) => setEmail(e.target.value)
                }
              />
            </Area>
            <Btt type='submit'>Cadastra</Btt>
          </InputArea>
          <SignMessageButton onClick={MessageButtomclick}>
            <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
            <SignMessageButtonTextBold>Faça o login!</SignMessageButtonTextBold>
          </SignMessageButton>
        </>
      }
    </Container>
  )
}
export default SignUpSchool