import { useEffect, useState } from 'react';
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
import BimonthlyAssessments from '../../components/BimonthlyAssessments/index';
//import NumericalGradeList from '../../components/NumericalGradeList';
import GradeList from '../../components/GradeList/index';
import FinalGradeList from '../../components/FinalGradeList/index';

const Daily = () => {
  const activeComponent = sessionStorage.getItem('activeComponent') || 'attendanceList';
  const [assessmentFormat, setassessmentFormat] = useState('');

  useEffect(() => {
    (async () => {
      const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
      setassessmentFormat($assessmentFormat)
    })();
  }, []);

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
      case 'assessments':
        return <BimonthlyAssessments/>
      case 'numericalGrades':
        return //<NumericalGradeList/>;
      case 'finalConcepts':
        return <FinalGradeList />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Butons>

        <UpperButons>
          <Btt02 onClick={() => handleComponentChange('attendanceList')}>Frequência</Btt02>
          <Btt02 onClick={() => handleComponentChange('classes')}>Aulas Lecionadas</Btt02>
          {assessmentFormat !== 'grade'
            ?
            (
              <Btt02 onClick={() => handleComponentChange('concepts')}>Conceitos</Btt02>
            ) : (
              <Btt02 onClick={() => handleComponentChange('assessments')}>Avaliações</Btt02>
            )
          }
        </UpperButons>

        {assessmentFormat !== "grade"
          &&
          <BottomButons>
            <Btt02 onClick={() => handleComponentChange('individualRecords')}>Fichas Individuais</Btt02>
            <Btt02 onClick={() => handleComponentChange('finalConcepts')}>Conceitos Finais</Btt02>
          </BottomButons>
        }

      </Butons>
      <Context>
        {renderActiveComponent()} {/* Renderiza o componente ativo */}
      </Context>
    </Container>
  );
};

export default Daily;
