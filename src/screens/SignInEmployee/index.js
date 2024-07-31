import React, { useState, useContext } from 'react';
import { AuthContext, } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'
import {api, createSessionEmployee} from '../../Api'

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

const SignInEmployee = () => {

    const navigate = useNavigate()
    const { loginEmployee } = useContext(AuthContext)
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const SignClick = async () => {

        setLoading(true);
        //loginEmployee(cpf, password)
        const response = await createSessionEmployee(cpf, password)
        if(response) {
            const IdEmployee = response.data.id
            const loggedEmployee = response.data.CPF
            const token = response.data.token
            const name = response.data.name
            const type = response.data.type
            const position_at_school = response.data.position_at_school
            const id_school = response.data.id_school
            const id_matter = response.data.id_matter
            const id_class = response.data.id_class
            const id_reporter_cardid_class = response.data.id_reporter_card
            //const avatar = response.data.avatar
            localStorage.setItem("Id_employee", 
            JSON.stringify(IdEmployee))
            sessionStorage.setItem("cpf", loggedEmployee)
            sessionStorage.setItem("name", name)
            localStorage.setItem("name", name)
            localStorage.setItem("type", type)
            localStorage.setItem("position_at_school", position_at_school)
            sessionStorage.setItem("id-school", JSON.stringify(id_school))
            sessionStorage.setItem("id_matter", id_matter)
            sessionStorage.setItem("id_class", id_class)
            sessionStorage.setItem("id_reporter_cardid_class", id_reporter_cardid_class)
            localStorage.setItem("token", token)
            sessionStorage.setItem("token", token)

            /*if (avatar) {
                sessionStorage.setItem("avatar", avatar)
            }*/
            
            api.defaults.headers.Authorization = `Bearer ${token}`
            loginEmployee(loggedEmployee)
            window.location.reload()
        }
        setLoading(false);
    }

    const MessageButtomclick = () => {
        navigate('/signup/school')
    }

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <h1>Login</h1>
                    <InputArea>
                        <>CPF</>
                        <Area>
                            <Input
                                placeholder="Digite seu email"
                                value={cpf}
                                onChange={
                                    (e) => setCpf(e.target.value)
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
                        <Btt onClick={SignClick}>Login</Btt>
                        <SignMessageButton onClick={MessageButtomclick}>
                            <SignMessageButtonText></SignMessageButtonText>
                            <SignMessageButtonTextBold>Selecionar outra forma de Login!</SignMessageButtonTextBold>
                        </SignMessageButton>
                    </InputArea>
                </>
            }
        </Container>
    )
}

export default SignInEmployee