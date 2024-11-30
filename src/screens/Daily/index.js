import { useEffect,  } from 'react';
import {
  Container,
  Butons,
  Context,
  Btt02
} from './style';


import AttendanceList from '../../components/attendanceListId_iStQuarter/index';

const HomeSchool = () => {

  //const [name, setName] = useState('')

  useEffect(() => {
    //const name = localStorage.getItem("name");
    //setName(name)
  }, [])

  return (
    <Container>
      <Butons>
        <Btt02>Lista de Presença</Btt02>
        <Btt02>Conceitos</Btt02>
      </Butons>
      <Context>
        <AttendanceList/>
      </Context>
    </Container>
  )
}

export default HomeSchool