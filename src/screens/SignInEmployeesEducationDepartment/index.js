import React, { useState, useContext } from 'react';
import { AuthContext, } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'
import { api, createSessionEmployeeEducationDepartment, EducationDepartamentName } from '../../Api'

import {
    Container,
    InputArea,
    Area,
    Input,
    Btt,
    AccessTopButton
} from './style';

import {
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from '../../components/Buttons';

import LoadingSpinner from '../../components/Loading'

const SignInEmployee = () => {

    const navigate = useNavigate()
    const { loginEmployeeEducationDepartment } = useContext(AuthContext)
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const SignClick = async () => {

        setLoading(true);
        //loginEmployee(cpf, password)
        const response = await createSessionEmployeeEducationDepartment(cpf, password)
        if (response) {

            const now = Date.now();
            // Salva novo horário de atividade
            localStorage.setItem("lastLogin", now);

            const IdEmployee = response.data.id
            const loggedEmployee = response.data.CPF
            const token = response.data.token
            const name = response.data.name
            const type = response.data.type
            const positionAtEducationDepartment = response.data.positionAtEducationDepartment
            const idEducationDepartment = response.data.idEducationDepartment
            const educationDepartment = await EducationDepartamentName(idEducationDepartment)

            sessionStorage.setItem("idDepartment", idEducationDepartment)
            sessionStorage.setItem("name-department", educationDepartment.data.data)
            localStorage.setItem("Id_employee", JSON.stringify(IdEmployee))
            sessionStorage.setItem("cpf", loggedEmployee)
            sessionStorage.setItem("name", name)
            localStorage.setItem("name", name)
            localStorage.setItem("type", type)
            localStorage.setItem("positionAtEducationDepartment", positionAtEducationDepartment)
            localStorage.setItem("token", token)
            sessionStorage.setItem("token", token)

            /*if (avatar) {
                sessionStorage.setItem("avatar", avatar)
            }*/

            api.defaults.headers.Authorization = `Bearer ${token}`
            loginEmployeeEducationDepartment(loggedEmployee)
            window.location.reload()
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


    /**/

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>

                    {/* Google tag (gtag.js)*/}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-7W99STL6XT"></script>
                    <AccessTopButton onClick={() => navigate('/signin/employee')}>
                        Acessar Instituição de Ensino
                    </AccessTopButton>

                    <h1>Login SEMEDE</h1>
                    <InputArea onSubmit={SignClick}>
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
                        <>Senha</>
                        <Area>
                            <Input
                                placeholder="Digite sua senha"
                                value={password}
                                type="password"
                                onChange={
                                    (e) => setPassword(e.target.value)
                                }
                            />
                        </Area>
                        <Btt type='submit'>Login</Btt>
                    </InputArea>
                    <SignMessageButton onClick={() => navigate('/forgot-password-education-department')}>
                        <SignMessageButtonText>Esqueceu sua </SignMessageButtonText>
                        <SignMessageButtonTextBold>Senha?</SignMessageButtonTextBold>
                    </SignMessageButton>
                    {/*<SignMessageButton onClick={MessageButtomclick}>
                        <SignMessageButtonText>Cadastre uma </SignMessageButtonText>
                        <SignMessageButtonTextBold>Escola</SignMessageButtonTextBold>
                    </SignMessageButton>*/}
                </>
            }
        </Container>
    )
}

export default SignInEmployee