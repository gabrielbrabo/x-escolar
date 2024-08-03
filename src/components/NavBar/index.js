import { Container } from './styles';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';

export function NavBar({ menuIsVisible, setMenuIsVisible }) {
  const [positionAtSchool, setPositionAtSchool] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    document.body.style.overflowY = menuIsVisible ? 'hidden' : 'auto';

    const position = localStorage.getItem("position_at_school");
    const userName = localStorage.getItem("name");

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
      <div className="container-user">
        <div className='user'>
          <p className='name-user'>User: {name}</p>
          <p className='type-user'>Função: {positionAtSchool}</p>
        </div>
        <button onClick={handleLogout} className='button-exit'>Sair</button>
      </div>
      {positionAtSchool === "GESTOR" && (
        <nav>
          <a href="/home/school">Home</a>
          <a href="/matter" className="nav__link">Materias</a>
          <a href="/employees" className="nav__link">Funcionarios</a>
          <a href="/class" className="nav__link">Turmas</a>
          <a href="/student" className="nav__link">Alunos</a>
        </nav>
      )}
      {positionAtSchool === "PROFESSOR" && (
        <nav>
          <a href="/home/school">Home</a>
          <a href="/myclasses" className="nav__link">Minhas Turmas</a>
        </nav>
      )}
    </Container>
  );
}