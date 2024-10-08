import { useNavigate } from 'react-router-dom'

import {
    Container,
    InputArea,
    Text,
    Area
} from './style';

import {
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from '../../components/Buttons';

const LoginSelection = () => {

    const navigate = useNavigate()

    /*const LoginInstitution = () => {
        navigate('/signin/school')
    }*/

    const LoginEmployee = () => {
        navigate('/signin/employee')
    }

    const MessageButtomclick = () => {
        navigate('/signup/school')
    }

    return (
        <Container>
            <h1>Como Deseja Acessar</h1>
            <InputArea>
                <Area onClick={LoginEmployee}>
                    <Text>Acessar como Funcionario</Text>
                </Area>
                <Area>
                    <Text>Acessar como Aluno</Text>
                </Area>
                <Area>
                    <Text>Acessar como Pais Resposavel</Text>
                </Area>
            </InputArea>
            <SignMessageButton onClick={MessageButtomclick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre uma Instituição!</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
}

export default LoginSelection