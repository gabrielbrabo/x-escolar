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

export function NavBar({ menuIsVisible, setMenuIsVisible }) {

  const [positionAtSchool, setPositionAtSchool] = useState(null);
  const [name, setName] = useState(null);
  const [school, setSchool] = useState(null);

  useEffect(() => {
    document.body.style.overflowY = menuIsVisible ? 'hidden' : 'auto';

    const position = localStorage.getItem('position_at_school');
    const userName = localStorage.getItem('name');
    const School = sessionStorage.getItem('School');

    setPositionAtSchool(position);
    setName(userName);
    setSchool(School);
  }, [menuIsVisible]);

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
    <Container isVisible={menuIsVisible}>
      <IoClose size={45} onClick={() => setMenuIsVisible(false)} />
      <Emp>
        <EmployeeInfo>
          <Pro>
            {/*<ProfilePhoto />*/}
            <ProfileInfo onClick={handlePerfil}>
              <Name>{name}</Name>
              <Span>{positionAtSchool}</Span>
              <Span>{school}</Span>
            </ProfileInfo>
          </Pro>
          <DivButtomEdit>
            <Btt02 onClick={handleLogout}>Sair</Btt02>
          </DivButtomEdit>
        </EmployeeInfo>
      </Emp>
      {positionAtSchool === 'DIRETOR/SUPERVISOR' && (
        <nav>
          <a href="/home/school">Home</a>
          <a href="/matter" className="nav__link">Disciplinas</a>
          <a href="/annual-calendar" className="nav__link">Calendario</a>
          <a href="/employees" className="nav__link">Funcionários</a>
          <a href="/class" className="nav__link">Turmas</a>
          <a href="/student" className="nav__link">Alunos</a>
        </nav>
      )}
      {positionAtSchool === 'SECRETARIO' && (
        <nav>
          <a href="/home/school">Home</a>
          <a href="/matter" className="nav__link">Disciplinas</a>
          <a href="/annual-calendar" className="nav__link">Calendario Anual</a>
          <a href="/employees" className="nav__link">Funcionários</a>
          <a href="/class" className="nav__link">Turmas</a>
          <a href="/student" className="nav__link">Alunos</a>
        </nav>
      )}
      {positionAtSchool === 'PROFESSOR' && (
        <nav>
          <a href="/home/school">Home</a>
          <a href="/matter" className="nav__link">Disciplinas</a>
          <a href="/annual-calendar" className="nav__link">Calendario Anual</a>
          <a href="/myclasses" className="nav__link">Minhas Turmas</a>
        </nav>
      )}
    </Container>
  );
}
