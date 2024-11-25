import { useEffect, useState } from 'react';
import {
  Container,
} from './style';

const HomeSchool = () => {

  const [name, setName] = useState('')

  useEffect(() => {
    const name = localStorage.getItem("name");
    setName(name)
  }, [])

  return (
    <Container>
      <h1>Ola {name}</h1>
    </Container>
  )
}

export default HomeSchool