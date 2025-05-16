import React, { useState, } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { ResetPasswordEducationDepartment} from '../../Api'

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
    const [newPassword, setnewPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [Info, setInfo] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const { cpf } = useParams()
    const { id } = useParams()
    const { reset_token } = useParams()

    console.log("cpf id e tokem", cpf, id, reset_token)

    const SignClick = async () => {

        setLoading(true);
        if (newPassword === confirmpassword) {
            const res = await ResetPasswordEducationDepartment(cpf, id, reset_token, newPassword);
            console.log("res email", res.data)
            if (res) {
                setShowWarning(true);
                setInfo(res.data.message);
            }
        }
        setLoading(false);
    }

    const MessageButtomclick = () => {
        navigate("/signin/employee-education-department");
    }

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
                                placeholder="Digite a nova senha"
                                value={confirmpassword}
                                type="password"
                                onChange={
                                    (e) => setConfirmpassword(e.target.value)
                                }
                            />
                        </Area>
                        <Btt onClick={SignClick}>Enviar</Btt>
                    </InputArea>
                </>
            )
            }
        </Container>
    )
}

export default SignInEmployee