import React, { useState, useEffect } from 'react';

import { NewClss } from '../../Api'

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

const NewClass = () => {

  const navigate = useNavigate()
  const [idSchool, setIdschool] = useState('');
  const year = new Date().getFullYear();
  const [serie, setSerie] = useState('');
  const [level, setLevel] = useState('');
  const [shift, setShift] = useState()
  const [classroom_number, setClassroom_number] = useState('');
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
      year,
      serie,
      level,
      shift,
      classroom_number
    )

    const res = await NewClss(
      idSchool,
      year,
      serie,
      level,
      shift,
      classroom_number
    )

    if (res) {
      /*if(position_at_school === 'PROFESSOR'){
        // se o cargo for professor navegar 
        //para a pagina de adiçao de materia 
        //na qual o professor da aulas
      } else {
        navigate('/employees')
      }*/
      navigate('/class')
    }
    setLoading(false);
  }

  const MessageButtomclick = () => {
    navigate('/class')
  }

  return (
    <Container>
      {loading ?
        <LoadingSpinner />
        :
        <>
          <InputArea>
            <>serie</>
            <Input
              placeholder="Digite a serie"
              value={serie}
              onChange={
                (e) => setSerie(e.target.value)
              }
            />
            <>Nivel</>
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
            />
            <Btt01 onClick={SignClick}>Cadastra</Btt01>
            <ToGoBack onClick={MessageButtomclick}>
              <SignMessageButtonText>Voltar para a</SignMessageButtonText>
              <SignMessageButtonTextBold>Lista de Turmas</SignMessageButtonTextBold>
            </ToGoBack>
          </InputArea>
        </>
      }
    </Container>
  )
}
export default NewClass