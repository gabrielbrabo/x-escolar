import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom'
import { ForgotPassword } from '../../Api'

import {
    Container,
    InputArea,
    Area,
    Input,
    Btt,
    WarningContainer,
    WarningMessage,
    WarningButton
} from './style';

import {
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from '../../components/Buttons';

import LoadingSpinner from '../../components/Loading'

const SignInEmployee = () => {

    const navigate = useNavigate()
    const [cpf, setCpf] = useState('');
    const [loading, setLoading] = useState(false);
    const [Info, setInfo] = useState(null);
    const [showWarning, setShowWarning] = useState(false);

    const SignClick = async () => {

        setLoading(true);
        const res = await ForgotPassword(cpf);
        console.log("res email", res.data)
        if (res) {
            setShowWarning(true);
            setInfo(res.data);
        } 
        setLoading(false);
    }

    const maskCPF = (value) => {
        return value
            .replace(/\D/g, '') // Remove tudo o que não é dígito
            .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o primeiro ponto
            .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o segundo ponto
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca o traço
            .slice(0, 14); // Limita para 14 caracteres
    };

    const handleChange = (e) => {
        setCpf(maskCPF(e.target.value));
    };


    const MessageButtomclick = () => {
        navigate(-1);
    }

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
             ) : showWarning ? (
                <WarningContainer>
                  <WarningMessage>
                  <h3>Importante!!!</h3>
                  </WarningMessage>
                  
                    <div>
                      <p>{Info.msg}</p>
                    </div>
                  
                  <WarningButton onClick={MessageButtomclick}>ok</WarningButton>
                </WarningContainer>
              ) : (
                <>
                    <h1>Recuperar Senha</h1>
                    <InputArea>
                        <>CPF</>
                        <Area>
                            <Input
                                placeholder="Digite o CPF"
                                value={cpf}
                                onChange={handleChange}
                                type="text"
                                maxLength="14"
                            />
                        </Area>
                        <Btt onClick={SignClick}>Enviar</Btt>
                    </InputArea>
                    <SignMessageButton onClick={MessageButtomclick}>
                        <SignMessageButtonText> </SignMessageButtonText>
                        <SignMessageButtonTextBold>Cancelar</SignMessageButtonTextBold>
                    </SignMessageButton>
                </>
              )
            }
        </Container>
    )
}

export default SignInEmployee