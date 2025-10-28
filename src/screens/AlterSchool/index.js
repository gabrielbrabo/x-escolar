import React, { useEffect, useState, useContext } from 'react';
import { AuthContext, } from '../../contexts/auth'
import {  /*useNavigate*/ useParams } from 'react-router-dom';
import { api, getSchoolsData, loginWithSchool, NameSchool } from '../../Api';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: #f5f5f5;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 2rem;
    color: #333;
    margin-bottom: 10px;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const SubTitle = styled.h2`
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 20px;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const SchoolList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 1000px;

    @media (max-width: 768px) {
        max-width: 90%;
    }
`;

const SchoolButton = styled.button`
    padding: 15px 20px;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #4caf50;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }

    @media (max-width: 768px) {
        padding: 12px 16px;
        font-size: 0.9rem;
    }
`;

const SchoolSelection = () => {
    //const navigate = useNavigate();
    //const location = useLocation();
    //const { schools, cpf } = location.state || {};
    const [schoolData, setSchoolData] = useState([]);
    const { loginEmployee } = useContext(AuthContext)

    const { schools } = useParams();
    const { cpf } = useParams();

    useEffect(() => {
        const fetchSchoolData = async () => {

            console.log("schools", schools)
            console.log("cpf", cpf)

            if (schools && schools.length > 0) {
                try {
                    // transforma string em array de objetos
                    const schoolsArray = schools.split(",").map(id => ({ id }));

                    // envia apenas os IDs para a função getSchoolsData
                    const response = await getSchoolsData(schoolsArray.map(s => s.id));
                    setSchoolData(response.data.data);
                    const now = Date.now();
                    // Salva novo horário de atividade
                    localStorage.setItem("lastLogin", now);
                } catch (error) {
                    console.error("Erro ao buscar dados das escolas:", error);
                }
            }
        };

        fetchSchoolData();
    }, [schools, cpf]);

    const handleSchoolSelect = async (schoolId) => {
        console.log("schoolId", schoolId)
        console.log("cpf", cpf)

        const response = await loginWithSchool(cpf, schoolId)

        if (response) {
            console.log("id_school", response)

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
        //navigate('/home');
    };

    return (
        <Container>
            <Title>Escolha uma Escola</Title>
            <SubTitle>Qual escola deseja acessar?</SubTitle>
            <SchoolList>
                {schoolData.length > 0 ? (
                    schoolData.map((school) => (
                        <SchoolButton
                            key={school.id}
                            onClick={() => handleSchoolSelect(school.id)}
                        >
                            {school.name}
                        </SchoolButton>
                    ))
                ) : (
                    <p>Nenhuma escola disponível.</p>
                )}
            </SchoolList>
        </Container>
    );
};

export default SchoolSelection;
