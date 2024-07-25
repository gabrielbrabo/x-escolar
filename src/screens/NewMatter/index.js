import React, { useState, useEffect } from 'react';

import { NewMttr } from '../../Api'

import { useNavigate } from 'react-router-dom'

import {
  Container,
  InputArea,
  ToGoBack
} from './style';

import {
  /*Area,*/
  Input,
  //Select
} from '../../components/Inputs';

import {
  Btt01,
  SignMessageButtonText,
  SignMessageButtonTextBold
} from '../../components/Buttons';

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
      navigate('/matter')
    }
    setLoading(true);
  }

  const MessageButtomclick = () => {
    navigate('/matter')
  }

  return (
    <Container>
      {loading ?
        <LoadingSpinner />
        :
        <>
          <InputArea>
            <>Nome da Materia</>
            <Input
              placeholder="Digite o nome da Materia"
              value={name}
              onChange={
                (e) => setName(e.target.value)
              }
            />
            {/*<>Nivel</>
        <Input
          placeholder="Digite o nivel"
          value={level}
          onChange={
            (e) => setLevel(e.target.value)
          }
        />
        <label>Turno: </label>
        <Select id="position" 
          value={shift}
          onChange={ 
            (e) => setShift(e.target.value)
          }
        >
          <option value="">Selecione</option>
          <option value="MATUTINO">MATUTINO</option>
          <option value="VESPERTINO">VESPERTINO</option>
          <option value="NOTURNO">NOTURNO</option>
        </Select>
        <>Numero da Sala</>
        <Input
          placeholder="Digite o numero da sala"
          value={classroom_number}
          onChange={
            (e) => setClassroom_number(e.target.value)
          }
        />*/}
            <Btt01 onClick={SignClick}>Cadastra</Btt01>
            <ToGoBack onClick={MessageButtomclick}>
              <SignMessageButtonText>Voltar para a</SignMessageButtonText>
              <SignMessageButtonTextBold>Lista de Materia</SignMessageButtonTextBold>
            </ToGoBack>
          </InputArea>
        </>
      }
    </Container>
  )
}
export default NewMatter