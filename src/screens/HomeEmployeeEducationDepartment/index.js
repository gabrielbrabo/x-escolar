import { useEffect, useState } from 'react';
import {
  Container,
} from './style';

//import { getSchool } from '../../Api'

const HomeSchool = () => {

  const [/*positionAtEducationDepartment*/, setpositionAtEducationDepartment] = useState(null);
  const [name, setName] = useState('')

  useEffect(() => {
    async function fetchData() {
      //const idSchool = sessionStorage.getItem('loggedEducationDepartment');
      /*const dataSchool = await getSchool(JSON.parse(idSchool))
      console.log('res', dataSchool.data.data.assessmentFormat)*/
    }
    fetchData();
    const name = localStorage.getItem("name");
    const position = localStorage.getItem('positionAtEducationDepartment');
    setpositionAtEducationDepartment(position);
    setName(name)

    const timer = setTimeout(() => {
      window.location.href = '/schools'; // Altere para o caminho desejado
    }, 2000);
  
    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado

  }, [])


  return (
    <Container>
      <h1>Ola {name}</h1>
    </Container>
  )
}

export default HomeSchool