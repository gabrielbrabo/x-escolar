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

  //const [selectedDate, setSelectedDate] = useState(null);


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
    //setSelectedDate(null);
  };
  const renderCalendarMonths = () => {
    if (!selectedSchoolDays || selectedSchoolDays.length === 0) return null;

    const schoolDates = selectedSchoolDays.map(d =>
      new Date(d.date).toISOString().split("T")[0]
    );

    const months = {};

    selectedSchoolDays.forEach(d => {
      const date = new Date(d.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;

      if (!months[key]) {
        months[key] = {
          year: date.getFullYear(),
          month: date.getMonth()
        };
      }
    });

    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

    return Object.values(months).map(({ year, month }) => {

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const days = [];

      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={"empty-" + i}></div>);
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = new Date(year, month, d)
          .toISOString()
          .split("T")[0];

        const isSchoolDay = schoolDates.includes(dateStr);

        days.push(
          <div
            key={d}
            style={{
              padding: 8,
              textAlign: "center",
              borderRadius: 6,
              background: isSchoolDay ? "#2e7d32" : "#f1f1f1",
              color: isSchoolDay ? "#fff" : "#666",
              fontWeight: isSchoolDay ? "bold" : "normal"
            }}
          >
            {d}
          </div>
        );
      }

      return (
        <div key={`${year}-${month}`} style={{ marginBottom: 30 }}>

          <h4 style={{ textAlign: "center", marginBottom: 10 }}>
            {monthNames[month]} {year}
          </h4>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7,1fr)",
              gap: 5,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 6
            }}
          >
            {weekDays.map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7,1fr)",
              gap: 5
            }}
          >
            {days}
          </div>

        </div>
      );
    });
  };

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
            <h1>Período Avaliativo</h1>

            <h2>Ano Letivo: {anoLetivo}</h2>
          </ContainerYear>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginBottom: 20
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 0, paddingTop: 0 }}> Regime de Avaliação: {assessmentRegime} </h2>
            <span
              style={{
                fontSize: '12px',
                color: '#666',
              }}
            >
              Para alterar o regime de avaliação, o <strong>Diretor</strong> ou <strong>Supervisor</strong> deve acessar
              <strong> Controle → Regime de Avaliação</strong>, selecionar o novo regime e salvar a alteração.
              <br />
              Caso você não seja <strong>Diretor</strong> ou <strong>Supervisor</strong>, solicite a alteração
              a um responsável com esse perfil.
            </span>
          </div>

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
              <ModalContent
                style={{
                  maxWidth: 900,
                  width: "95%",
                  maxHeight: "85vh",
                  overflowY: "auto",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <h3>📅 Dias Letivos — {selectedPeriodTitle}</h3>

                <p>
                  Total de dias letivos: <b>{selectedSchoolDays.length}</b>
                </p>

                {selectedSchoolDays.length === 0 ? (
                  <p>Nenhum dia letivo cadastrado.</p>
                ) : (
                  <div style={{ marginTop: 20 }}>
                    {renderCalendarMonths()}
                  </div>
                )}

                {/* BOTÃO FLUTUANTE */}
                <div
                  style={{
                    position: "sticky",
                    bottom: 0,
                    background: "transparent",
                    padding: "15px",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                    zIndex: 10
                  }}
                >
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
