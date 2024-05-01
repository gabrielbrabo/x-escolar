import React, { useState, useEffect } from 'react';

import {NewStdt} from '../../Api'

//import { AuthContext, } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  InputArea,
  ToGoBack
} from './style';

import {
  /*Area,*/ 
  Input,
  /*Select*/
}from '../../components/Inputs';

import { 
  Btt01,
  SignMessageButtonText,
  SignMessageButtonTextBold
}from '../../components/Buttons';

const NewStudent = () => {

  const navigate = useNavigate()
  const [idSchool, setIdschool] = useState('');
  const [name, setName] = useState('');
  const [rg, setRg] = useState('');
 // const [position_at_school, setPosition_at_school] = useState()
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  useEffect(() => {
    (async () => {
        const idSchool = sessionStorage.getItem("id-school")
        setIdschool(JSON.parse(idSchool))
    })()       
  }, [])

  const SignClick = async () => {
    const registerStudent = (Math.floor(Math.random() * 1111111 + 1000000 ))
    
    console.log(
      registerStudent,
      idSchool,
      name,
      password, 
      confirmpassword
    )
    
    const res = await NewStdt(
      idSchool,
      name, 
      rg,
      registerStudent,
      password, 
      confirmpassword
    )

    if(res){
      navigate('/student')
    }
  }

  const MessageButtomclick = () => {
    navigate('/student')
  }

  return (
    <Container>
      <InputArea>
        <>Nome</>
            <Input
              placeholder="Digite o nome"
              value={name}
              onChange={
                (e) => setName(e.target.value)
              }
            />
        <>RG</>
        <Input
          placeholder="Digite o RG"
          value={rg}
          onChange={
            (e) => setRg(e.target.value)
          }
        />
        <>Senha</>
        <Input
          placeholder="Digite a senha"
          value={password}
          onChange={
            (e) => setPassword(e.target.value)
          }
        />
        <>Confirme Senha</>
        <Input
          placeholder="Confirme a senha"
          value={confirmpassword}
          onChange={
            (e) => setConfirmPassword(e.target.value)
          }
        />
        <Btt01 onClick={SignClick}>Cadastra</Btt01>
        <ToGoBack onClick={MessageButtomclick}>
          <SignMessageButtonText>Voltar para a</SignMessageButtonText>
          <SignMessageButtonTextBold>Lista de Alunos</SignMessageButtonTextBold>
        </ToGoBack>
      </InputArea>
    </Container>
  )
} 
export default NewStudent