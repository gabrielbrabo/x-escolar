import { useNavigate } from 'react-router-dom'

import {
    Container,
    InputArea,
    Text
} from './style';

import {
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold 
} from '../../components/Buttons';

import { Area }from '../../components/Inputs';

const LoginSelection = () => {

    const navigate = useNavigate()

    const LoginInstitution = () => {
        navigate('/signin/school')
    }

    const LoginEmployee = () => {
        navigate('/signin/employee')
    }

    const MessageButtomclick = () => {
        navigate('/signup/school')
    }
  
    return (
      <Container>
        <InputArea>
            <Area onClick={LoginInstitution}>
                <Text>Fazer login como Instituição</Text>
            </Area>
            <Area onClick={LoginEmployee}>
                <Text>Fazer login como Funcionario</Text>
            </Area>
            <Area>
                <Text>Fazer login como Aluno</Text>
            </Area>
            <Area>
                <Text>Fazer login como Pais Resposavel</Text>
            </Area>
            <SignMessageButton onClick={MessageButtomclick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre uma Instituição!</SignMessageButtonTextBold>
            </SignMessageButton>
        </InputArea>
      </Container>
    )
}
  
export default LoginSelection