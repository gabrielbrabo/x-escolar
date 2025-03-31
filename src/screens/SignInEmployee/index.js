import React, { useState, useContext } from 'react';
import { AuthContext, } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'
import { api, createSessionEmployee, NameSchool } from '../../Api'

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
        console.log("response", response)
        if (response) {
            const Schools = response.data.schools

            const now = Date.now();
            // Salva novo horário de atividade
            localStorage.setItem("lastLogin", now);

            if (Schools) {
                const schools = response.data.schools;
                const userCPF = cpf;
                // Verifica se as escolas estão disponíveis e o CPF tem um valor definido
                if (schools && userCPF) {
                    navigate('/school/selection', { state: { schools, cpf: userCPF } });
                    return; // Sai da função aqui para evitar a execução do restante
                }
            }

            const IdEmployee = response.data.id
            const loggedEmployee = response.data.CPF
            const token = response.data.token
            const name = response.data.name
            const type = response.data.type
            const position_at_school = response.data.position_at_school
            const id_school = response.data.id_school
            //console.log("id_school", id_school.join(''))
            const id_matter = response.data.id_matter
            const id_class = response.data.id_class
            const id_reporter_cardid_class = response.data.id_reporter_card
            //const assessmentFormat = response.data.assessmentFormat
            //const idLogo = response.data.logoSchool
            //const avatar = response.data.avatar
            const nameSchool = await NameSchool(id_school)
            sessionStorage.setItem("School", nameSchool.data.data)
            localStorage.setItem("Id_employee", JSON.stringify(IdEmployee))
            sessionStorage.setItem("cpf", loggedEmployee)
            sessionStorage.setItem("name", name)
            localStorage.setItem("name", name)
            localStorage.setItem("type", type)
            localStorage.setItem("position_at_school", position_at_school)
            sessionStorage.setItem("id-school", JSON.stringify(id_school))
            // sessionStorage.setItem("assessmentFormat", assessmentFormat)
            //sessionStorage.setItem("id_logo", idLogo)
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
                    <h1>Login</h1>
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
                    <SignMessageButton onClick={() => navigate('/forgot-password')}>
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