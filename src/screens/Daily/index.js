import { useEffect, } from 'react';
import {
  Container,
  Butons,
  Context,
  Btt02,
  BottomButons,
  UpperButons
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
        <UpperButons>
          <Btt02 >Lista de Presença</Btt02>
          <Btt02>Aulas Lecionadas</Btt02>
          <Btt02>Conceitos</Btt02>
        </UpperButons>
        <BottomButons>
          <Btt02 >Fichas Indeviduais</Btt02>
          <Btt02>ConceitosFinais</Btt02>
        </BottomButons>
      </Butons>
      <Context>
        <AttendanceList />
      </Context>
    </Container>
  )
}

export default HomeSchool