import React, { useState, useEffect } from "react";
import { RiMenu3Fill } from 'react-icons/ri';
import {
    Container,
    Emp,
    EmployeeInfo,
    ProfileInfo,
    //ProfilePhoto,
    Pro,
    Name,
    Span,
    DivButtomEdit,
    Btt02
} from "./styles";

import logo from "../../assests/logoDev.png"


export function Header({ setMenuIsVisible }) {
    const [position_at_school, setPosition_at_school] = useState();
    const [name, setname] = useState();
    const [school, setSchool] = useState(null);

    useEffect(() => {
        const position_at_school = localStorage.getItem("position_at_school");
        const name = localStorage.getItem("name");
        const School = sessionStorage.getItem('School');
        setPosition_at_school(position_at_school);
        setname(name);
        setSchool(School);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    };

    const handlePerfil = async () => {
        const id_employee = JSON.parse(localStorage.getItem('Id_employee'))
        sessionStorage.setItem("EmployeeInformation", id_employee)
        console.log("id_employee", id_employee)
        // Redireciona para a URL
        window.location.href = `/perfil/${id_employee}`;
    }

    return (
        <Container>
            <div className="logoHome"><img src={logo} alt="Logo do Sistema" width="150" /> Diario Escolar Virtual</div>
            <section className="desktop-nav">
                {position_at_school === "SECRETARIO" && (
                    <nav>
                        <a href="/home/school">Home</a>
                        <a href="/employees" className="nav__link">Funcionários</a>
                        <a href="/student" className="nav__link">Alunos</a>
                        <a href="/class" className="nav__link">Turmas</a>
                        <a href="/annual-calendar" className="nav__link">Bimestres</a>
                        <a href="/matter" className="nav__link">Componentes curriculares</a>
                    </nav>
                )}
                {position_at_school === 'DIRETOR/SUPERVISOR' && (
                    <nav>
                        <a href="/home/school">Home</a>
                        <a href="/employees" className="nav__link">Funcionários</a>
                        <a href="/student" className="nav__link">Alunos</a>
                        <a href="/class" className="nav__link">Turmas</a>
                        <a href="/annual-calendar" className="nav__link">Bimestres</a>
                        <a href="/matter" className="nav__link">Componentes curriculares</a>
                    </nav>
                )}
                {position_at_school === "PROFESSOR" && (
                    <nav>
                        {/*<a href="/home/school">Home</a>*/}
                        <a href="/myclasses" className="nav__link">Minhas Turmas</a>
                        <a href="/annual-calendar" className="nav__link">Calendário Bimestral</a>
                        <a href="/matter" className="nav__link">Componentes curriculares</a>

                    </nav>
                )}
            </section>
            <Emp className="desktop-user-info">
                <EmployeeInfo>
                    <Pro>
                        {/*<ProfilePhoto />*/}
                        <ProfileInfo onClick={handlePerfil}>
                            <Name>{name}</Name>
                            <Span>{position_at_school}</Span>
                            <Span>{school}</Span>
                        </ProfileInfo>
                    </Pro>
                </EmployeeInfo>
            </Emp>
            <DivButtomEdit>
                <Btt02 onClick={handleLogout}>Sair</Btt02>
            </DivButtomEdit>
            <section>
                <RiMenu3Fill color="black" style={{ strokeWidth: '1px' }} onClick={() => setMenuIsVisible(true)} className="mobile-icon" />
            </section>
        </Container>
    );
}
