import React, { useEffect, useContext } from 'react';

import { AuthContext, } from '../../contexts/auth'

import { useNavigate } from 'react-router-dom'

import {
    Container,
} from './style';

import { api, Refresh, NameSchool } from '../../Api'

import LoadingSpinner from '../../components/Loading'

const Preload = () => {

    const navigate = useNavigate()
    const { loginEmployee } = useContext(AuthContext)

    useEffect(() => {
        (async () => {
            const id = localStorage.getItem("Id_employee");
            const token = localStorage.getItem("token");
            const lastLogin = localStorage.getItem("lastLogin"); // Obtém o último login salvo
            
            const now = Date.now();
            const expirationTime = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

            //teste
            //const expirationTime = 1 * 60 * 1000; // 1 minuto em milissegundos (60000)

    
            // Se não houver token ou já passou o tempo de expiração, força logout
            if (!token || !lastLogin || now - lastLogin > expirationTime) {
                localStorage.clear();
                sessionStorage.clear();
                navigate('/signin/employee');
                return;
            }
    
            try {
                // Atualiza o token
                const response = await Refresh(JSON.parse(id));
    
                if (response && response.data) {
                    console.log("response", response);
    
                    // Salva novo horário de atividade
                    localStorage.setItem("lastLogin", now);
    
                    // Processa os dados recebidos
                    const IdEmployee = response.data.id;
                    const loggedEmployee = response.data.CPF;
                    const token = response.data.token;
                    const name = response.data.name;
                    const type = response.data.type;
                    const position_at_school = response.data.position_at_school;
                    const id_school = response.data.id_school;
                    const id_matter = response.data.id_matter;
                    const id_class = response.data.id_class;
                    const id_reporter_cardid_class = response.data.id_reporter_card;
    
                    const nameSchool = await NameSchool(id_school);
                    sessionStorage.setItem("School", nameSchool.data.data);
                    localStorage.setItem("Id_employee", JSON.stringify(IdEmployee));
                    sessionStorage.setItem("cpf", loggedEmployee);
                    sessionStorage.setItem("name", name);
                    localStorage.setItem("name", name);
                    localStorage.setItem("type", type);
                    localStorage.setItem("position_at_school", position_at_school);
                    sessionStorage.setItem("id-school", JSON.stringify(id_school));
                    sessionStorage.setItem("id_matter", id_matter);
                    sessionStorage.setItem("id_class", id_class);
                    sessionStorage.setItem("id_reporter_cardid_class", id_reporter_cardid_class);
                    localStorage.setItem("token", token);
                    sessionStorage.setItem("token", token);
    
                    api.defaults.headers.Authorization = `Bearer ${token}`;
                    loginEmployee(loggedEmployee);
                } else {
                    navigate('/signin/employee');
                }
            } catch (error) {
                navigate('/signin/employee');
            }
        })();
    }, [navigate, loginEmployee]);

    return (
        <Container>
            <LoadingSpinner />
        </Container>
    )
}

export default Preload