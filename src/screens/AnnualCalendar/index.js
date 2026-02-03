import React, { useState, useEffect } from 'react';
import {
  Container,
  ContainerDivs,
  DivAddEmp,
  AddEmp,
  Btt02,
  Btt03,
  DivDados,
  ContainerYear,
  ModalOverlay,
  ModalContent
} from './style';

import {
  getSchoolYear,
  getIstQuarter,
  getIIndQuarter,
  getIIIrdQuarter,
  getIVthQuarter,
  getAssessmentRegime,
  //getVthQuarter,
  //getVIthQuarter,
  //reopenI_stQuarter,
  //tocloseI_stQuarter,
  //reopenII_ndQuarter,
  //tocloseII_ndQuarter,
  //reopenIII_rdQuarter,
  //tocloseIII_rdQuarter,
  //reopenIV_thQuarter,
  //tocloseIV_thQuarter
} from '../../Api';

import LoadingSpinner from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

const HomeSchool = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [anoLetivo, setanoLetivo] = useState([]);
  const [assessmentFormat, setassessmentFormat] = useState('');
  const [assessmentRegime, setAssessmentRegime] = useState('');
  const [IStQuarter, setIStQuarter] = useState([]);
  const [IIndQuarter, setIIndQuarter] = useState([]);
  const [IIIrdQuarter, setIIIrdQuarter] = useState([]);
  const [IVthQuarter, setIVthQuarter] = useState([]);
  const [position_at_school, setPosition_at_school] = useState('');

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [pendingNavigate, setPendingNavigate] = useState(null);

  const [showSchoolDaysModal, setShowSchoolDaysModal] = useState(false);
  const [selectedSchoolDays, setSelectedSchoolDays] = useState([]);
  const [selectedPeriodTitle, setSelectedPeriodTitle] = useState('');

  const [selectedDate, setSelectedDate] = useState(null);


  useEffect(() => {
    (async () => {
      setLoading(true);
      const idSchool = sessionStorage.getItem("id-school");
      const schoolYear = await getSchoolYear(JSON.parse(idSchool));
      setanoLetivo(schoolYear.data.data);

      const position = localStorage.getItem('position_at_school');
      const $assessmentFormat = sessionStorage.getItem('assessmentFormat');
      setassessmentFormat($assessmentFormat);
      setPosition_at_school(position);

      const response = await getAssessmentRegime(JSON.parse(idSchool))

      if (response?.data?.data) {
        setAssessmentRegime(response.data.data)
        sessionStorage.setItem('assessmentRegime', response.data.data);
      }

      const [IstQuarter, IIndQuarter, IIIrdQuarter, IVthQuarter] = await Promise.all([
        getIstQuarter(schoolYear.data.data, JSON.parse(idSchool)),
        getIIndQuarter(schoolYear.data.data, JSON.parse(idSchool)),
        getIIIrdQuarter(schoolYear.data.data, JSON.parse(idSchool)),
        getIVthQuarter(schoolYear.data.data, JSON.parse(idSchool)),
      ]);

      setIStQuarter(IstQuarter?.data?.data || []);
      setIIndQuarter(IIndQuarter?.data?.data || []);
      setIIIrdQuarter(IIIrdQuarter?.data?.data || []);
      setIVthQuarter(IVthQuarter?.data?.data || []);
      setLoading(false);
    })();
  }, [anoLetivo,]);

  const handleEditClick = (quarter, id, route) => {
    setPendingNavigate({ quarter, id, route });
    setShowModal(true);
  };

  const handleConfirmEdit = () => {
    if (pendingNavigate) {
      sessionStorage.setItem(pendingNavigate.quarter, pendingNavigate.id);
      navigate(pendingNavigate.route);
      setShowModal(false);
      setPendingNavigate(null);
    }
  };

  const handleCancelEdit = () => {
    setShowModal(false);
    setPendingNavigate(null);
  };

  const periodLabel =
    assessmentRegime === 'TRIMESTRAL' ? 'Trimestre' : 'Bimestre';

  const handleViewSchoolDays = (schoolDays, title) => {
    setSelectedSchoolDays(schoolDays || []);
    setSelectedPeriodTitle(title);
    setShowSchoolDaysModal(true);
  };

  const handleCloseSchoolDaysModal = () => {
    setShowSchoolDaysModal(false);
    setSelectedSchoolDays([]);
    setSelectedPeriodTitle('');
    setSelectedDate(null);
  };

  console.log("assessmentRegimea", assessmentRegime)
  const QuarterSection = ({ title, data, onEdit, onCreate }) => (
    <DivAddEmp>
      {data.length > 0 ? (
        <>
          <AddEmp>
            <h3>{title}</h3>
            {(position_at_school === 'DIRETOR/SUPERVISOR' || position_at_school === "SECRETARIO") && (
              <Btt02 onClick={onEdit}>Editar</Btt02>
            )}
          </AddEmp>
          <DivDados>
            {data.map(res => (
              <React.Fragment key={res._id}>
                <p>Início: {String(res.startday).padStart(2, '0')}/{String(res.startmonth).padStart(2, '0')}/{res.startyear}</p>
                <p>Término: {String(res.endday).padStart(2, '0')}/{String(res.endmonth).padStart(2, '0')}/{res.endyear}</p>
                {assessmentFormat === "grade" &&
                  <>
                    <p style={{ color: 'green' }}>Nota Total: {String(res.totalGrade)}</p>
                    <p style={{ color: 'blue' }}>Nota Média: {String(res.averageGrade)}</p>
                  </>
                }
                <Btt03
                  style={{ marginTop: 10 }}
                  onClick={() =>
                    handleViewSchoolDays(res.schoolDays, title)
                  }
                >
                  Ver dias letivos
                </Btt03>
              </React.Fragment>
            ))}
          </DivDados>
        </>
      ) : (
        <>
          {(position_at_school === 'DIRETOR/SUPERVISOR' || position_at_school === "SECRETARIO") && (

            <AddEmp>
              <h3>{title}</h3>
              <Btt03 onClick={onCreate}>Definir Período</Btt03>
            </AddEmp>
          )}
          <DivDados>
            <p>Período ainda não definido</p>
          </DivDados>
        </>
      )}
    </DivAddEmp>
  );

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ContainerDivs>
          <ContainerYear>
            <h1>Ano Letivo: {anoLetivo}</h1>
          </ContainerYear>
          <div
            style={{
              display: 'flex',
              marginBottom: 20
            }}
          >
            <h2 style={{ marginTop: 0, paddingTop: 0 }}> Regime de Avaliação: {assessmentRegime} </h2>
          </div>

          <h2>Período Avaliativo</h2>

          <QuarterSection
            title={`1º ${periodLabel}`}
            data={IStQuarter}
            onEdit={() => handleEditClick("IstQuarterInformation", IStQuarter[0]?._id, '/updatei-stquarter')}
            onCreate={() => navigate('/createi-stquarter')}
          />
          <QuarterSection
            title={`2º ${periodLabel}`}
            data={IIndQuarter}
            onEdit={() => handleEditClick("IIndQuarterInformation", IIndQuarter[0]?._id, '/updateii-ndquarter')}
            onCreate={() => navigate('/createii-ndquarter')}
          />
          <QuarterSection
            title={`3º ${periodLabel}`}
            data={IIIrdQuarter}
            onEdit={() => handleEditClick("IIIrdQuarterInformation", IIIrdQuarter[0]?._id, '/updateiii-rdquarter')}
            onCreate={() => navigate('/createiii-rdquarter')}
          />
          {assessmentRegime === 'BIMESTRAL' && (
            <QuarterSection
              title="4º Bimestre"
              data={IVthQuarter}
              onEdit={() => handleEditClick("IVthQuarterInformation", IVthQuarter[0]?._id, '/updateiv-thquarter')}
              onCreate={() => navigate('/createiv-thquarter')}
            />
          )}

          {showModal && (
            <ModalOverlay>
              <ModalContent>
                <h3>⚠️ Atenção!</h3>
                <p>Ao alterar as datas deste periodo, <strong>os diários já fechados não serão atualizados automaticamente</strong>.</p>
                <p>Para atualizar um diário já fechado, altere as datas do periodo, depois reabra o diário e feche novamente para aplicar as novas configurações.</p>
                <div className="modal-buttons">
                  <button className="modal-button confirm" onClick={handleConfirmEdit}>Entendi</button>
                  <button className="modal-button cancel" onClick={handleCancelEdit}>Cancelar</button>
                </div>
              </ModalContent>
            </ModalOverlay>
          )}

          {showSchoolDaysModal && (
            <ModalOverlay>
              <ModalContent style={{
                maxWidth: 800,
                width: '90%',
                maxHeight: '85vh'
              }}>
                <h3>📅 Dias Letivos — {selectedPeriodTitle}</h3>

                {selectedSchoolDays.length === 0 ? (
                  <p>Nenhum dia letivo cadastrado.</p>
                ) : (
                  <div
                    style={{
                      maxHeight: 300,
                      overflowY: 'auto',
                      marginTop: 10,
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      padding: 10
                    }}
                  >
                    {[...selectedSchoolDays]
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map((day, index) => {
                        const isSelected = selectedDate === day.date;

                        return (
                          <div
                            key={day._id || index}
                            onClick={() => setSelectedDate(day.date)}
                            style={{
                              padding: '10px',
                              marginBottom: 4,
                              borderRadius: 6,
                              cursor: 'pointer',
                              backgroundColor: isSelected ? '#e6f4ea' : 'transparent',
                              border: isSelected ? '1px solid #2e7d32' : '1px solid transparent',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {new Date(day.date).toLocaleDateString('pt-BR', {
                              weekday: 'long',
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </div>
                        );
                      })
                    }
                  </div>
                )}

                <div className="modal-buttons">
                  <button
                    className="modal-button cancel"
                    onClick={handleCloseSchoolDaysModal}
                  >
                    Fechar
                  </button>
                </div>
              </ModalContent>
            </ModalOverlay>
          )}

        </ContainerDivs>
      )}
    </Container>
  );
};

export default HomeSchool;
