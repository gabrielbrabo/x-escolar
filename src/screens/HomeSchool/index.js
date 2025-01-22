import { useEffect, useState } from 'react';
import {
  Container,
} from './style';

const HomeSchool = () => {

  const [positionAtSchool, setPositionAtSchool] = useState(null);
  const [name, setName] = useState('')

  useEffect(() => {
    const name = localStorage.getItem("name");
    const position = localStorage.getItem('position_at_school');
    
    setPositionAtSchool(position);
    setName(name)
  }, [])

  if(positionAtSchool === "PROFESSOR") {
    window.location.href = '/myclasses'
    return null
  }

  return (
    <Container>
      <h1>Ola {name}</h1>
    </Container>
  )
}

export default HomeSchool