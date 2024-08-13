import React, { useState, useEffect } from "react";
import { RiMenu3Fill } from 'react-icons/ri';
import {
    Container,
    Emp,
    EmployeeInfo,
    ProfileInfo,
    ProfilePhoto,
    Pro,
    Name,
    Span,
    DivButtomEdit,
    Btt02
} from "./styles";

export function Header({ setMenuIsVisible }) {
    const [position_at_school, setPosition_at_school] = useState();
    const [name, setname] = useState();

    useEffect(() => {
        const position_at_school = localStorage.getItem("position_at_school");
        const name = localStorage.getItem("name");
        setPosition_at_school(position_at_school);
        setname(name);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    };

    return (
        <Container>
            <div className="logo">ESCOLA X</div>
            <section className="desktop-nav">
                {position_at_school === "GESTOR" && (
                    <nav>
                        <a href="/home/school">Home</a>
                        <a href="/matter" className="nav__link">Matérias</a>
                        <a href="/employees" className="nav__link">Funcionários</a>
                        <a href="/class" className="nav__link">Turmas</a>
                        <a href="/student" className="nav__link">Alunos</a>
                    </nav>
                )}
                {position_at_school === "PROFESSOR" && (
                    <nav>
                        <a href="/home/school">Home</a>
                        <a href="/myclasses" className="nav__link">Minhas Turmas</a>
                    </nav>
                )}
            </section>
            <Emp className="desktop-user-info">
                <EmployeeInfo>
                    <Pro>
                        <ProfilePhoto />
                        <ProfileInfo>
                            <Name>{name}</Name>
                            <Span>{position_at_school}</Span>
                        </ProfileInfo>
                    </Pro>
                    <DivButtomEdit>
                        <Btt02 onClick={handleLogout}>Sair</Btt02>
                    </DivButtomEdit>
                </EmployeeInfo>
            </Emp>
            <section>
                <RiMenu3Fill onClick={() => setMenuIsVisible(true)} className="mobile-icon" />
            </section>
        </Container>
    );
}
