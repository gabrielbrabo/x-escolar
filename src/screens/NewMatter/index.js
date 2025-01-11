import React, { useState, useEffect } from 'react';

import { NewMttr } from '../../Api'

import { useNavigate } from 'react-router-dom'

import {
  Container,
  InputArea,
  ToGoBack,
  Input,
  Btt01,
  SignMessageButtonText,
  SignMessageButtonTextBold
} from './style';

import LoadingSpinner from '../../components/Loading'

const NewMatter = () => {

  const navigate = useNavigate()
  const [idSchool, setIdschool] = useState('');
  //const year = new Date().getFullYear();
  const [name, setName] = useState('');
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
      name
    )

    const res = await NewMttr(
      idSchool,
      name
    )

    if (res) {
      /*if(position_at_school === 'PROFESSOR'){
        // se o cargo for professor navegar 
        //para a pagina de adiçao de materia 
        //na qual o professor da aulas
      } else {
        navigate('/employees')
      }*/
      navigate(-1);
    }
    setLoading(false);
  }

  const MessageButtomclick = () => {
    navigate(-1);
  }

  return (
    <Container>
      {loading ?
        <LoadingSpinner />
        :
        <>
          <InputArea>
            <>Nome da Disciplina</>
            <Input
              placeholder="Digite o nome da disciplina"
              value={name}
              onChange={
                (e) => setName(e.target.value)
              }
            />
            <Btt01 onClick={SignClick}>Cadastra</Btt01>
            <ToGoBack onClick={MessageButtomclick}>
              <SignMessageButtonText>Voltar para a</SignMessageButtonText>
              <SignMessageButtonTextBold>Lista de disciplina</SignMessageButtonTextBold>
            </ToGoBack>
          </InputArea>
        </>
      }
    </Container>
  )
}
export default NewMatter