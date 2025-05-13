import { useEffect, useState } from 'react';
import {
  Container,
  Butons,
  Context,
  Btt02,
  BottomButons,
  UpperButons,
  ButtonGroup
} from './style';

import AttendanceList from '../../components/attendanceList/index';
import Classes from '../../components/ClassesList/index';
import IndividualFormList from '../../components/IndividualFormList/index';
import BimonthlyAssessments from '../../components/BimonthlyAssessments/index';
import NumericalGradeList from '../../components/NumericalGradeList';
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


  const isActive = (component) => activeComponent === component;

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
        return <BimonthlyAssessments />
      case 'numericalGrades':
        return <NumericalGradeList />;
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
          <Btt02
            className={isActive('attendanceList') ? 'active' : ''}
            onClick={() => handleComponentChange('attendanceList')}
          >
            Frequência
          </Btt02>
          <Btt02 className={isActive('classes') ? 'active' : ''}
            onClick={() => handleComponentChange('classes')}
          >
            Aulas Lecionadas
          </Btt02>
          {assessmentFormat !== 'grade' ? (
            <Btt02
              className={isActive('concepts') ? 'active' : ''}
              onClick={() => handleComponentChange('concepts')}
            >
              Conceitos
            </Btt02>
          ) : (
            <ButtonGroup>
              <Btt02 className={isActive('assessments') ? 'active' : ''}
                onClick={() => handleComponentChange('assessments')}
              >
                Avaliações
              </Btt02>
              <Btt02
                className={isActive('numericalGrades') ? 'active' : ''}
                onClick={() => handleComponentChange('numericalGrades')}
              >
                Notas
              </Btt02>
            </ButtonGroup>
          )}

        </UpperButons>

        {assessmentFormat !== "grade"
          &&
          <BottomButons>
            <Btt02
              className={isActive('individualRecords') ? 'active' : ''}
              onClick={() => handleComponentChange('individualRecords')}
            >
              Fichas Individuais
            </Btt02>
            <Btt02
              className={isActive('finalConcepts') ? 'active' : ''}
              onClick={() => handleComponentChange('finalConcepts')}
            >
              Conceitos Finais
            </Btt02>
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
