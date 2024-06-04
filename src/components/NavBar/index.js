import { Container } from './styles';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';

export function NavBar({ menuIsVisible, setMenuIsVisible }) {
  /*useEffect(() => {
    document.body.style.overflowY = menuIsVisible ? 'hidden' : 'auto';
  }, [menuIsVisible]);*/
  const [type, setType] = useState();
  const [position_at_school, setPosition_at_school] = useState();

  useEffect(() => {
    document.body.style.overflowY = menuIsVisible ? 'hidden' : 'auto';
    //setLoading(true);
    let Type = sessionStorage.getItem("type")
    let position_at_school = sessionStorage.getItem("position_at_school")
    //let position =  sessionStorage.getItem("position_at_school")

    if (Type) {
      setType(Type)
    }

    if (position_at_school) {
      setPosition_at_school(position_at_school)
    }

  }, [menuIsVisible])

  return (
    <Container isVisible={menuIsVisible}>
      <IoClose size={45} onClick={() => setMenuIsVisible(false)} />
      {
        position_at_school === "GESTOR"
        &&
        <nav>
          <a href="/home/school" >
            Home
          </a>
          <a href="/matter" className="nav__link">
            Materias
          </a>
          <a href="/employees" className="nav__link">
            Funcionarios
          </a>
          <a href="/class" className="nav__link">
            Turmas
          </a>
          <a href="/student" className="nav__link">
            Alunos
          </a>
        </nav>
      }
      {
        type === 'employee' && position_at_school === "PROFESSOR"
        &&
        <nav>
          <a href="/home/school" >
            Home
          </a>
          <a href="/class" className="nav__link">
            Turmas
          </a>
          <a href="/student" className="nav__link">
            Alunos
          </a>
        </nav>
      }
    </Container>
  )
}