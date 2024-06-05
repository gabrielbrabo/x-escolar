import React, { useState, useContext } from 'react';

import {registerSchool} from '../../Api'
import { AuthContext, } from '../../contexts/auth'

//import { AuthContext, } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  InputArea,
} from './style';

import {Area, Input }from '../../components/Inputs';

import { 
  Btt01,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold
}from '../../components/Buttons';

const SignUpSchool = () => {

  const navigate = useNavigate()
  const {loginSchool} = useContext(AuthContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const password = "g";
  const confirmpassword = "g";

  const SignClick = async () => {
    
    const res = await registerSchool(
      name, 
      email,
      password, 
      confirmpassword
    )

    if (res.data.token){

      console.log("res", res.data.token)
      loginSchool(email, password)

    }

  }

  const MessageButtomclick = () => {
    navigate('/')
  }

  return (
    <Container>
      <InputArea>
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
        {/*<>Senha</>
        <Area>
          <Input
              placeholder="Digite sua senha"
              value={password}
              onChange={
                (e) => setPassword(e.target.value)
              }
          />
        </Area>
        <>Confirme Senha</>
        <Area>
          <Input
              placeholder="Confirme sua senha"
              value={confirmpassword}
              onChange={
                (e) => setConfirmPassword(e.target.value)
              }
          />
        </Area>*/}
        <Btt01 onClick={SignClick}>Cadastra</Btt01>
        <SignMessageButton onClick={MessageButtomclick}>
          <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
          <SignMessageButtonTextBold>Faça o login!</SignMessageButtonTextBold>
        </SignMessageButton>
      </InputArea>
    </Container>
  )
} 
export default SignUpSchool