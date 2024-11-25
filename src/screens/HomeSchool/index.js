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
      <>Ola {name}</>
    </Container>
  )
}

export default HomeSchool