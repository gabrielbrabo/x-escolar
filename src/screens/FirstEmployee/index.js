import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, } from '../../contexts/auth'

import { api, NewEmp, createSessionEmployee } from '../../Api'

//import { AuthContext, } from '../../contexts/auth'
//import { useNavigate } from 'react-router-dom'

import {
  Container,
  InputArea,
  Area,
  Btt
  //ToGoBack
} from './style';

import {
  /*Area,*/
  Input,
  // Select
} from '../../components/Inputs';

import LoadingSpinner from '../../components/Loading'

const FristEmployee = () => {

  const { loginEmployee } = useContext(AuthContext)
  const [idSchool, setIdschool] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const position_at_school = "GESTOR"
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
    }
  }
  return (
    <Container>
      {loading ?
        <LoadingSpinner />
        :
        <>
          <h1>Cadastre um Gestor</h1>
          <InputArea onSubmit={SignClick}>
            <>Nome</>
            <Area>
              <Input
                placeholder="Digite o nome"
                value={name}
                onChange={
                  (e) => setName(e.target.value)
                }
              />
            </Area>
            <>cpf</>
            <Area>
              <Input
                placeholder="Digite o cpf"
                value={cpf}
                onChange={
                  (e) => setCpf(e.target.value)
                }
              />
            </Area>
            <>Senha</>
            <Area>
              <Input
                placeholder="Digite a senha"
                value={password}
                onChange={
                  (e) => setPassword(e.target.value)
                }
              />
            </Area>
            <>Confirme Senha</>
            <Area>
              <Input
                placeholder="Confirme a senha"
                value={confirmpassword}
                onChange={
                  (e) => setConfirmPassword(e.target.value)
                }
              />
            </Area>
            <Btt type='submit'>Cadastra</Btt>
          </InputArea>
        </>
      }
    </Container>
  )
}

export default FristEmployee