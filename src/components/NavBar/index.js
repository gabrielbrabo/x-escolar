import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
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
} from './styles';

import { TiArrowSortedUp } from "react-icons/ti";

export function NavBar({ menuIsVisible, setMenuIsVisible }) {

  const [positionAtEducationDepartment, setpositionAtEducationDepartment] = useState(null);
  const [positionAtSchool, setPositionAtSchool] = useState(null);
  const [name, setName] = useState(null);
  const [department, setDepartment] = useState(null);
  const [school, setSchool] = useState(null);
  const [array, setarray] = useState();
  const [schools, setSchools] = useState();
  const [cpf, setuserCPF] = useState();

  useEffect(() => {
    document.body.style.overflowY = menuIsVisible ? 'hidden' : 'auto';

    const positionAtEducationDepartment = localStorage.getItem('positionAtEducationDepartment');
    const position = localStorage.getItem('position_at_school');
    const userName = localStorage.getItem('name');
    const Department = sessionStorage.getItem('name-department');
    const School = sessionStorage.getItem('School');

    if (positionAtEducationDepartment) {
      setpositionAtEducationDepartment(positionAtEducationDepartment);
      setDepartment(Department);
    } else {
      setPositionAtSchool(position);
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
    setName(userName);
  }, [menuIsVisible]);

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
    <Container isVisible={menuIsVisible}>
      <IoClose size={50} onClick={() => setMenuIsVisible(false)} />
      {!positionAtEducationDepartment ? (
        <Emp>
          <EmployeeInfo>
            <Pro>
              <ProfileInfo onClick={handlePerfil}>
                <Name>{name}</Name>
                <Span>{positionAtSchool}(A)</Span>
                <Span>{school}</Span>
              </ProfileInfo>
            </Pro>
          </EmployeeInfo>
          <DivButtomEdit>
            <Btt02 onClick={handleLogout}>Sair</Btt02>
            {schools &&
              <Btt02 onClick={handleAlterSchool}>Alternar Escola</Btt02>
            }
          </DivButtomEdit>
          <TiArrowSortedUp />
          <p>Perfil</p>
        </Emp>
      ) : (
        <Emp>
          <EmployeeInfo>
            <Pro>
              <ProfileInfo onClick={handlePerfilEducationDepartment}>
                <Name>{name}</Name>
                <Span>{positionAtEducationDepartment}</Span>
                <Span>{department}</Span>
              </ProfileInfo>
            </Pro>
          </EmployeeInfo>
          {!positionAtEducationDepartment ? (
            <DivButtomEdit>
              <Btt02 onClick={handleLogout}>Sair</Btt02>
            </DivButtomEdit>
          ) : (
            <DivButtomEdit>
              <Btt02 onClick={handleLogoutEducationDep}>Sair</Btt02>
            </DivButtomEdit>
          )
          }
          <TiArrowSortedUp />
          <p>Perfil</p>
        </Emp>
      )
      }
      {(positionAtSchool === "SECRETARIO" || positionAtSchool === 'DIRETOR/SUPERVISOR') && (
        <nav>
          <a href="/employees" className={`nav__link ${isActive('/employees')}`}>Funcionários</a>
          <a href="/student" className={`nav__link ${isActive('/student')}`}>Alunos</a>
          <a href="/class" className={`nav__link ${isActive('/class')}`}>Turmas</a>
          <a href="/annual-calendar" className={`nav__link ${isActive('/annual-calendar')}`}>Bimestres</a>
          <a href="/matter" className={`nav__link ${isActive('/matter')}`}>Componentes curriculares</a>
          <a href="/controller" className={`nav__link ${isActive('/controller')}`}>Controle</a>
        </nav>
      )}
      {positionAtSchool === 'PROFESSOR' && (
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
    </Container>
  );
}
