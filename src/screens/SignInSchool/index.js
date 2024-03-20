import React, { useState, useContext } from 'react';
import { AuthContext, } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'

import {
    Container,
    InputArea,
} from './style';

import {Area, Input }from '../../components/Inputs';

import {
    Btt01,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold 
}from '../../components/Buttons';

const SignInSchool = () => {

    const navigate = useNavigate()
    const {loginSchool} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [loading, setLoading] = useState(false);
  
    const SignClick = async () => {

        //setLoading(true);
    
        loginSchool(email, password)
    
    }

    const MessageButtomclick = () => {
        navigate('/signup/school')
    }
  
    return (
      <Container>
        <InputArea>
            <>Email da Instituição de Ensino</>
            <Area>
                <Input
                    placeholder="Digite seu email"
                    value={email}
                    onChange={
                      (e) => setEmail(e.target.value)
                    }
                />
            </Area>
            <>Senha</>
            <Area>
                <Input
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={
                      (e) => setPassword(e.target.value)
                    }
                />
            </Area>
            <Btt01 onClick={SignClick}>Login</Btt01>
            <SignMessageButton onClick={MessageButtomclick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre uma Instituição!</SignMessageButtonTextBold>
            </SignMessageButton>
        </InputArea>
      </Container>
    )
}
  
export default SignInSchool