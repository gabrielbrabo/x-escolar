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
    setName(userName);
  }, [menuIsVisible]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const handleLogoutEducationDep = () => {
    localStorage.clear();
    sessionStorage.clear();

    window.location.href = `/signin/employee-education-department`;
    //window.location.reload();
  };

  const handlePerfil = async () => {
    const id_employee = JSON.parse(localStorage.getItem('Id_employee'))
    sessionStorage.setItem("EmployeeInformation", id_employee)
    console.log("id_employee", id_employee)
    // Redireciona para a URL
    window.location.href = `/perfil/${id_employee}`;
  }

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
          </DivButtomEdit>
          <TiArrowSortedUp />
          <p>Perfil</p>
        </Emp>
      ) : (
        <Emp>
          <EmployeeInfo>
            <Pro>
              <ProfileInfo onClick={handlePerfil}>
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
      {positionAtSchool === 'DIRETOR/SUPERVISOR' && (
        <nav>
          {/*<a href="/home/school">Home</a>*/}
          <a href="/employees" className="nav__link">Funcionários</a>
          <a href="/student" className="nav__link">Alunos</a>
          <a href="/class" className="nav__link">Turmas</a>
          <a href="/annual-calendar" className="nav__link">Bimestres</a>
          <a href="/matter" className="nav__link">Componentes curriculares</a>
        </nav>
      )}
      {positionAtSchool === 'SECRETARIO' && (
        <nav>
          {/*<a href="/home/school">Home</a>*/}
          <a href="/employees" className="nav__link">Funcionários</a>
          <a href="/student" className="nav__link">Alunos</a>
          <a href="/class" className="nav__link">Turmas</a>
          <a href="/annual-calendar" className="nav__link">Bimestres</a>
          <a href="/matter" className="nav__link">Componentes curriculares</a>
        </nav>
      )}
      {positionAtSchool === 'PROFESSOR' && (
        <nav>
          <nav>
            {/*<a href="/home/school">Home</a>*/}
            <a href="/myclasses" className="nav__link">Minhas Turmas</a>
            <a href="/annual-calendar" className="nav__link">Calendário Bimestral</a>
            <a href="/matter" className="nav__link">Componentes curriculares</a>
          </nav>
        </nav>
      )}
      {positionAtEducationDepartment && (
        <nav>
          {/*<a href="/home/school">Home</a>*/}
          <a href="/schools" className="nav__link">Escolas</a>
          <a href="/myclasses" className="nav__link">Funcionarios</a>
        </nav>
      )}
    </Container>
  );
}
