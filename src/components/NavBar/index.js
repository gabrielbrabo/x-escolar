import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import {
  Container,
  Emp,
  EmployeeInfo,
  ProfileInfo,
  ProfilePhoto,
  Pro,
  Span,
  DivButtomEdit,
  Btt02,
} from './styles';

export function NavBar({ menuIsVisible, setMenuIsVisible }) {
  const [positionAtSchool, setPositionAtSchool] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    document.body.style.overflowY = menuIsVisible ? 'hidden' : 'auto';

    const position = localStorage.getItem('position_at_school');
    const userName = localStorage.getItem('name');

    setPositionAtSchool(position);
    setName(userName);
  }, [menuIsVisible]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <Container isVisible={menuIsVisible}>
      <IoClose size={45} onClick={() => setMenuIsVisible(false)} />
      <Emp>
        <EmployeeInfo>
          <Pro>
            <ProfilePhoto />
            <ProfileInfo>
              <Span>{name}</Span>
              <Span>{positionAtSchool}</Span>
            </ProfileInfo>
          </Pro>
          <DivButtomEdit>
            <Btt02 onClick={handleLogout}>Sair</Btt02>
          </DivButtomEdit>
        </EmployeeInfo>
      </Emp>
      {positionAtSchool === 'GESTOR' && (
        <nav>
          <a href="/home/school">Home</a>
          <a href="/matter" className="nav__link">Matérias</a>
          <a href="/employees" className="nav__link">Funcionários</a>
          <a href="/class" className="nav__link">Turmas</a>
          <a href="/student" className="nav__link">Alunos</a>
        </nav>
      )}
      {positionAtSchool === 'PROFESSOR' && (
        <nav>
          <a href="/home/school">Home</a>
          <a href="/myclasses" className="nav__link">Minhas Turmas</a>
        </nav>
      )}
    </Container>
  );
}
