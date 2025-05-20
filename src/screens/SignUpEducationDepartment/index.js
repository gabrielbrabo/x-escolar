import React, { useState, useContext } from 'react';

import { api, registerEducationDepartment, createSessionEducationDepartment } from '../../Api'
import { AuthContext, } from '../../contexts/auth'

//import { AuthContext, } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'

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
  const { loginEducationDepartment } = useContext(AuthContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [municipality, setMunicipality] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');

  const [loading, setLoading] = useState(false);

  const SignClick = async () => {

    setLoading(true);
    const res = await registerEducationDepartment(
      name,
      email,
      municipality,
      state,
      address,
    )
    console.log("res01", res)

    if (res.data.token || res.data.id) {

      console.log("res token", res.data.token)
      console.log("res_id", res.data.id)
      //loginSchool(email, password)

      const response = await createSessionEducationDepartment(res.data.id);
      console.log(response)
      if (response) {
        const loggedEducationDepartment = response.data._id
        const token = response.data.token
        const name = response.data.name
        const type = response.data.type
        //const avatar = response.data.avatar
        sessionStorage.setItem("loggedEducationDepartment", loggedEducationDepartment)
        sessionStorage.setItem("name-department", name)
        sessionStorage.setItem("type", type)
        sessionStorage.setItem("token", token)

        api.defaults.headers.Authorization = `Bearer ${token}`
        loginEducationDepartment(loggedEducationDepartment)
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
          <h1>Cadastro SEMEDE</h1>
          <InputArea onSubmit={SignClick}>
            <>Nome da Instituição</>
            <Area>
              <Input
                placeholder="Digite o nome"
                value={name}
                onChange={
                  (e) => setName(e.target.value)
                }
              />
            </Area>
            <>Email da Instituição</>
            <Area>
              <Input
                placeholder="Digite o email"
                value={email}
                onChange={
                  (e) => setEmail(e.target.value)
                }
              />
            </Area>
            <>Estado</>
            <Area>
              <Input
                placeholder="Digite o estado"
                value={state}
                onChange={
                  (e) => setState(e.target.value)
                }
              />
            </Area>
            <>Municipio</>
            <Area>
              <Input
                placeholder="Digite o municipio"
                value={municipality}
                onChange={
                  (e) => setMunicipality(e.target.value)
                }
              />
            </Area>
            <>Endereço</>
            <Area>
              <Input
                placeholder="Digite o endereço"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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