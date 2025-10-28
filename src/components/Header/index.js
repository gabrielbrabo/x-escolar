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
    Btt02,
    PerfilIndicador
} from "./styles";

//import logo from "../../assests/logo192.png"

import { TiArrowSortedUp } from "react-icons/ti";

import { DiReact } from "react-icons/di";

export function Header({ setMenuIsVisible }) {
    const [positionAtEducationDepartment, setpositionAtEducationDepartment] = useState(null);
    const [position_at_school, setPosition_at_school] = useState();
    const [name, setname] = useState();
    const [department, setDepartment] = useState(null);
    const [school, setSchool] = useState(null);
    const [array, setarray] = useState();
    const [schools, setSchools] = useState();
    const [cpf, setuserCPF] = useState();

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
        const schools = sessionStorage.getItem('schools');
        const userCPF = sessionStorage.getItem('cpf');
        if (schools) {
            setarray(schools)
            const schoolsParam = JSON.parse(schools).map(s => s.id).join(",");
            setSchools(schoolsParam)
        }
        setuserCPF(userCPF)
        setname(name);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    };

    const handleAlterSchool = () => {
        console.log("schools", schools)
        console.log("cpf", cpf)

        window.location.href = `/Alter-school/${schools}/${cpf}`;
        localStorage.clear();
        sessionStorage.clear();
        sessionStorage.setItem("schools", array)
    };

    const handleLogoutEducationDep = () => {
        localStorage.clear();
        sessionStorage.clear();

        window.location.href = `/signin/employee-education-department`;
        //window.location.reload();
    };

    const handlePerfilEducationDepartment = async () => {
        const id_employee = JSON.parse(localStorage.getItem('Id_employee'))
        sessionStorage.setItem("EmployeeInformation", id_employee)
        console.log("id_employee", id_employee)
        // Redireciona para a URL
        window.location.href = `/perfil-education-department/${id_employee}`;
    }

    const handlePerfil = async () => {
        const id_employee = JSON.parse(localStorage.getItem('Id_employee'))
        sessionStorage.setItem("EmployeeInformation", id_employee)
        console.log("id_employee", id_employee)
        // Redireciona para a URL
        window.location.href = `/perfil/${id_employee}`;
    }

    const currentPath = window.location.pathname;

    const isActive = (path) => currentPath === path ? 'active' : '';


    return (
        <Container>
            <div className="logoHome"><DiReact style={{
                //color: "#61dafb", // Cor padrão do React
                filter: "drop-shadow(0 0 5px #ffffff)", // Efeito na bolinha (não é exato)
            }} />{/*<img src={logo} alt="Logo do Sistema" width="150" />*/}
                <span className="text-mobile">Diário Escolar Virtual</span>
                <span className="text-desktop">D.E.V.</span>
            </div>
            <section className="desktop-nav">
                {(position_at_school === "SECRETARIO" || position_at_school === 'DIRETOR/SUPERVISOR') && (
                    <nav>
                        <a href="/employees" className={`nav__link ${isActive('/employees')}`}>Funcionários</a>
                        <a href="/student" className={`nav__link ${isActive('/student')}`}>Alunos</a>
                        <a href="/class" className={`nav__link ${isActive('/class')}`}>Turmas</a>
                        <a href="/annual-calendar" className={`nav__link ${isActive('/annual-calendar')}`}>Bimestres</a>
                        <a href="/matter" className={`nav__link ${isActive('/matter')}`}>Componentes curriculares</a>
                        <a href="/controller" className={`nav__link ${isActive('/controller')}`}>Controle</a>
                    </nav>
                )}
                {position_at_school === "PROFESSOR" && (
                    <nav>
                        <a href="/myclasses" className={`nav__link ${isActive('/myclasses')}`}>Minhas Turmas</a>
                        <a href="/annual-calendar" className={`nav__link ${isActive('/annual-calendar')}`}>Calendário Bimestral</a>
                        <a href="/matter" className={`nav__link ${isActive('/matter')}`}>Componentes curriculares</a>
                    </nav>
                )}
                {positionAtEducationDepartment && (
                    <nav>
                        <a href="/schools" className={`nav__link ${isActive('/schools')}`}>Escolas</a>
                        <a href="/employees-edu-dep" className={`nav__link ${isActive('/employees-edu-dep')}`}>Funcionários</a>
                    </nav>
                )}
            </section>
            {!positionAtEducationDepartment ? (
                <Emp className="desktop-user-info">
                    <EmployeeInfo>
                        <Pro onClick={handlePerfil}>
                            {/*<ProfilePhoto />*/}
                            <ProfileInfo >
                                <Name>{name}</Name>
                                <Span>{position_at_school}(A)</Span>
                                <Span>{school}</Span>
                            </ProfileInfo>
                            {/* Indicador de perfil */}
                            <PerfilIndicador>
                                <TiArrowSortedUp />
                                <p>Perfil</p>
                            </PerfilIndicador>
                        </Pro>
                    </EmployeeInfo>
                </Emp>
            ) : (
                <Emp className="desktop-user-info">
                    <EmployeeInfo>
                        <Pro onClick={handlePerfilEducationDepartment}>
                            {/*<ProfilePhoto />*/}
                            <ProfileInfo >
                                <Name>{name}</Name>
                                <Span>{positionAtEducationDepartment}</Span>
                                <Span>{department}</Span>
                            </ProfileInfo>
                            {/* Indicador de perfil */}
                            <PerfilIndicador>
                                <TiArrowSortedUp />
                                <p>Perfil</p>
                            </PerfilIndicador>
                        </Pro>
                    </EmployeeInfo>
                </Emp>
            )
            }
            {!positionAtEducationDepartment ? (
                <DivButtomEdit>
                    <Btt02 onClick={handleLogout}>Sair</Btt02>
                    {schools &&
                        <Btt02 onClick={handleAlterSchool}>Alternar Escola</Btt02>
                    }
                </DivButtomEdit>
            ) : (
                <DivButtomEdit>
                    <Btt02 onClick={handleLogoutEducationDep}>Sair</Btt02>
                </DivButtomEdit>
            )
            }
            <section>
                <RiMenu3Fill color="black" style={{ strokeWidth: '1px' }} onClick={() => setMenuIsVisible(true)} className="mobile-icon" />
            </section>
        </Container>
    );
}
