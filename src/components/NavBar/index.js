import { Container } from './styles';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';

//import { AuthContext, } from '../../contexts/auth'

export function NavBar({ menuIsVisible, setMenuIsVisible }) {
  /*useEffect(() => {
    document.body.style.overflowY = menuIsVisible ? 'hidden' : 'auto';
  }, [menuIsVisible]);*/

  const [position_at_school, setPosition_at_school] = useState();
  const [name, setname] = useState();
  //const { logout } = useContext(AuthContext)

  useEffect(() => {
    document.body.style.overflowY = menuIsVisible ? 'hidden' : 'auto';
    //setLoading(true);
    let position_at_school = localStorage.getItem("position_at_school")

    if (position_at_school) {
      const name = localStorage.getItem("name")
      setPosition_at_school(position_at_school)
      setname(name)
    }

  }, [menuIsVisible])

  const handleLogout = () => {
    //logout()
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload()
  }

  return (
    <Container isVisible={menuIsVisible}>
      <IoClose size={45} onClick={() => setMenuIsVisible(false)} />
      <div className="container-user">
        <div className='user'>
          <p className='name-user'>User: {name}</p>
          <p className='type-user'>Função: {position_at_school}</p>
        </div>
        <button onClick={handleLogout} className='butto-exit'>Sair</button>
      </div>
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
        position_at_school === "PROFESSOR"
        &&
        <nav>
          <a href="/home/school" >
            Home
          </a>
          <a href="/myclasses" className="nav__link">
            Minhas Turmas
          </a>
        </nav>
      }
    </Container>
  )
}