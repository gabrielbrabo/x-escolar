import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, } from '../../contexts/auth'

import {NewEmp} from '../../Api'

//import { AuthContext, } from '../../contexts/auth'
//import { useNavigate } from 'react-router-dom'

import {
  Container,
  InputArea,
  //ToGoBack
} from './style';

import {
  /*Area,*/ 
  Input,
 // Select
}from '../../components/Inputs';

import { 
  Btt01,
  //SignMessageButtonText,
  //SignMessageButtonTextBold
}from '../../components/Buttons';

const NewEmployee = () => {

  const {loginEmployee} = useContext(AuthContext)
  const [idSchool, setIdschool] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const position_at_school = "GESTOR"
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  useEffect(() => {
    (async () => {
        const idSchool = sessionStorage.getItem("id-school")
        setIdschool(JSON.parse(idSchool))
    })()       
  }, [])

  const SignClick = async () => {
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
      cpf,
      position_at_school,
      password, 
      confirmpassword
    )

    if(res){
      sessionStorage.removeItem("id-school")
      sessionStorage.removeItem("email-school")
      sessionStorage.removeItem("name-school")
      sessionStorage.removeItem("type")
      sessionStorage.removeItem("id_employee")
      sessionStorage.removeItem("id_matter")
      sessionStorage.removeItem("id_class")
      sessionStorage.removeItem("token")
      loginEmployee(cpf, password)
    }
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
        <>cpf</>
        <Input
          placeholder="Digite o cpf"
          value={cpf}
          onChange={
            (e) => setCpf(e.target.value)
          }
        />
       {/* <label>Cargo: </label>
        <Select id="position" 
          value={position_at_school} 
          onChange={ 
            (e) => setPosition_at_school(e.target.value)
          }
        >
          <option value="">Selecione</option>
          <option value="GESTOR">GESTOR</option>
          <option value="PROFESSOR">PROFESSOR</option>
        </Select>*/}
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
      </InputArea>
    </Container>
  )
} 
export default NewEmployee