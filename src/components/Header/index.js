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

//import logo from "../../assests/logo192.png"

import { DiReact } from "react-icons/di";

export function Header({ setMenuIsVisible }) {
    const [positionAtEducationDepartment, setpositionAtEducationDepartment] = useState(null);
    const [position_at_school, setPosition_at_school] = useState();
    const [name, setname] = useState();
    const [department, setDepartment] = useState(null);
    const [school, setSchool] = useState(null);

    useEffect(() => {
        const position_at_school = localStorage.getItem("position_at_school");
        const positionAtEducationDepartment = localStorage.getItem('positionAtEducationDepartment');
        const name = localStorage.getItem("name");
        const Department = sessionStorage.getItem('name-department');
        const School = sessionStorage.getItem('School');

        if (positionAtEducationDepartment) {
            setpositionAtEducationDepartment(positionAtEducationDepartment);
            setDepartment(Department);
        } else {
            setPosition_at_school(position_at_school);
            setSchool(School);
        }
        setname(name);
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
            <div className="logoHome"><DiReact style={{
                //color: "#61dafb", // Cor padrão do React
                filter: "drop-shadow(0 0 5px #ffffff)", // Efeito na bolinha (não é exato)
            }} />{/*<img src={logo} alt="Logo do Sistema" width="150" />*/} Diario Escolar Virtual</div>
            <section className="desktop-nav">
                {position_at_school === "SECRETARIO" && (
                    <nav>
                        {/*<a href="/home/school">Home</a>*/}
                        <a href="/employees" className="nav__link">Funcionários</a>
                        <a href="/student" className="nav__link">Alunos</a>
                        <a href="/class" className="nav__link">Turmas</a>
                        <a href="/annual-calendar" className="nav__link">Bimestres</a>
                        <a href="/matter" className="nav__link">Componentes curriculares</a>
                    </nav>
                )}
                {position_at_school === 'DIRETOR/SUPERVISOR' && (
                    <nav>
                        {/*<a href="/home/school">Home</a>*/}
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
            {!positionAtEducationDepartment ? (
                <Emp className="desktop-user-info">
                    <EmployeeInfo>
                        <Pro>
                            {/*<ProfilePhoto />*/}
                            <ProfileInfo onClick={handlePerfil}>
                                <Name>{name}</Name>
                                <Span>{position_at_school}(A)</Span>
                                <Span>{school}</Span>
                            </ProfileInfo>
                        </Pro>
                    </EmployeeInfo>
                </Emp>
            ) : (
                <Emp className="desktop-user-info">
                    <EmployeeInfo>
                        <Pro>
                            {/*<ProfilePhoto />*/}
                            <ProfileInfo onClick={handlePerfil}>
                                <Name>{name}</Name>
                                <Span>{positionAtEducationDepartment}</Span>
                                <Span>{department}</Span>
                            </ProfileInfo>
                        </Pro>
                    </EmployeeInfo>
                </Emp>
            )
            }
            <DivButtomEdit>
                <Btt02 onClick={handleLogout}>Sair</Btt02>
            </DivButtomEdit>
            <section>
                <RiMenu3Fill color="black" style={{ strokeWidth: '1px' }} onClick={() => setMenuIsVisible(true)} className="mobile-icon" />
            </section>
        </Container>
    );
}
