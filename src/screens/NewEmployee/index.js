import React, { useState, useEffect } from 'react';

import { NewEmp } from '../../Api'

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
  Select
} from '../../components/Inputs';

import {
  Btt01,
  SignMessageButtonText,
  SignMessageButtonTextBold
} from '../../components/Buttons';

import LoadingSpinner from '../../components/Loading'

const NewEmployee = () => {

  const navigate = useNavigate()
  const [idSchool, setIdschool] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [position_at_school, setPosition_at_school] = useState()
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

    if (res) {
      if (position_at_school === 'PROFESSOR') {
        sessionStorage.removeItem('id_emp')
        sessionStorage.removeItem('name')
        sessionStorage.setItem("id_emp", res.data.id_employee)
        sessionStorage.setItem("name", res.data.name_employee)
        navigate('/add/matter')
        // se o cargo for professor navegar 
        //para a pagina de adiçao de materia 
        //na qual o professor da aulas
      } else {
        navigate('/employees')
      }
    }
    setLoading(false);
  }

  const MessageButtomclick = () => {
    navigate('/employees')
  }

  return (
    <Container>
      {loading ?
        <LoadingSpinner />
        :
        <>
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
            <label>Cargo: </label>
            <Select id="position"
              value={position_at_school}
              onChange={
                (e) => setPosition_at_school(e.target.value)
              }
            >
              <option value="">Selecione</option>
              <option value="GESTOR">GESTOR</option>
              <option value="PROFESSOR">PROFESSOR</option>
            </Select>
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
              <SignMessageButtonTextBold>Lista de Funcionarios</SignMessageButtonTextBold>
            </ToGoBack>
          </InputArea>
        </>
      }
    </Container>
  )
}
export default NewEmployee