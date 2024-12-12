//import { useEffect } from 'react';
import {
  Container,
  Butons,
  Context,
  Btt02,
  BottomButons,
  UpperButons
} from './style';

import AttendanceList from '../../components/attendanceList/index';
import Classes from '../../components/ClassesList/index';
import IndividualFormList from '../../components/IndividualFormList/index';
import GradeList from '../../components/GradeList/index';

const Daily = () => {
  const activeComponent = sessionStorage.getItem('activeComponent') || 'attendanceList';

  const handleComponentChange = (component) => {
    if (activeComponent !== component) {
      sessionStorage.setItem('activeComponent', component); // Salva o componente ativo
      window.location.reload(); // Recarrega a página
    }
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'attendanceList':
        return <AttendanceList />;
      case 'classes':
        return <Classes />;
      case 'individualRecords':
        return <IndividualFormList />;
      case 'concepts':
        return <GradeList />;
      /*case 'finalConcepts':
        return <FinalConcepts />;
      */default:
        return null;
    }
  };

  return (
    <Container>
      <Butons>
        <UpperButons>
          <Btt02 onClick={() => handleComponentChange('attendanceList')}>Lista de Presença</Btt02>
          <Btt02 onClick={() => handleComponentChange('classes')}>Aulas Lecionadas</Btt02>
          <Btt02 onClick={() => handleComponentChange('concepts')}>Conceitos</Btt02>
        </UpperButons>
        <BottomButons>
          <Btt02 onClick={() => handleComponentChange('individualRecords')}>Fichas Individuais</Btt02>
          <Btt02 onClick={() => handleComponentChange('finalConcepts')}>Conceitos Finais</Btt02>
        </BottomButons>
      </Butons>
      <Context>
        {renderActiveComponent()} {/* Renderiza o componente ativo */}
      </Context>
    </Container>
  );
};

export default Daily;