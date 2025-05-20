import React, { useState, } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { UpdatePasswordEmpEduDep} from '../../Api'

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

import LoadingSpinner from '../../components/Loading'

const SignInEmployee = () => {

    const navigate = useNavigate()
    const [password, setpassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [Info, setInfo] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const { cpf } = useParams()
    const { id } = useParams()

    console.log("cpf id e tokem", cpf, id,)

    const SignClick = async () => {

        setLoading(true);
        if (newPassword === confirmpassword) {
            const res = await UpdatePasswordEmpEduDep(cpf, id, password, newPassword);
            //console.log("res email", res.data)
            if (res) {
                setShowWarning(true);
                setInfo(res.data.message);
            }
        }
        setLoading(false);
    }

    const MessageButtomclick = () => {
        navigate(-1);
    }

    const ClickCancel = () => {
        navigate(-1); // Volta para a página anterior
    }

    console.log('History length:', window.history.length);

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : showWarning ? (
                <WarningContainer>
                    <WarningMessage>
                        <h3>Aviso!</h3>
                    </WarningMessage>
                    <div>
                        <p>{Info}</p>
                    </div>
                    <WarningButton onClick={MessageButtomclick}>ok</WarningButton>
                </WarningContainer>
            ) : (
                <>
                    <h1>Redefinir Senha</h1>
                    <InputArea>
                        <>Senha Atual</>
                        <Area>
                            <Input
                                placeholder="Digite a senha Atual"
                                value={password}
                                type="password"
                                onChange={
                                    (e) => setpassword(e.target.value)
                                }
                            />
                        </Area>
                        <>Nova Senha</>
                        <Area>
                            <Input
                                placeholder="Digite a nova senha"
                                value={newPassword}
                                type="password"
                                onChange={
                                    (e) => setnewPassword(e.target.value)
                                }
                            />
                        </Area>
                        <>Confirme a nova Senha</>
                        <Area>
                            <Input
                                placeholder="Repita a nova senha"
                                value={confirmpassword}
                                type="password"
                                onChange={
                                    (e) => setConfirmpassword(e.target.value)
                                }
                            />
                        </Area>
                        <Btt onClick={SignClick}>Enviar</Btt>
                        <Btt type="button" onClick={ClickCancel}>Cancelar</Btt>
                    </InputArea>
                </>
            )
            }
        </Container>
    )
}

export default SignInEmployee