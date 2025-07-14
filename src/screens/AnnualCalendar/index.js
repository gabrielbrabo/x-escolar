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
  const [IStQuarter, setIStQuarter] = useState([]);
  const [IIndQuarter, setIIndQuarter] = useState([]);
  const [IIIrdQuarter, setIIIrdQuarter] = useState([]);
  const [IVthQuarter, setIVthQuarter] = useState([]);
  //const [position_at_school, setPosition_at_school] = useState('');

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [pendingNavigate, setPendingNavigate] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const idSchool = sessionStorage.getItem("id-school");
      const schoolYear = await getSchoolYear(JSON.parse(idSchool));
      setanoLetivo(schoolYear.data.data);

      //const position = localStorage.getItem('position_at_school');
      const $assessmentFormat = sessionStorage.getItem('assessmentFormat');
      setassessmentFormat($assessmentFormat);
      // setPosition_at_school(position);

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

  const QuarterSection = ({ title, data, onEdit, onCreate }) => (
    <DivAddEmp>
      {data.length > 0 ? (
        <>
          <AddEmp>
            <h3>{title}</h3>
            <Btt02 onClick={onEdit}>Editar Bimestre</Btt02>
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
              </React.Fragment>
            ))}
          </DivDados>
        </>
      ) : (
        <>
          <AddEmp>
            <h3>{title}</h3>
            <Btt03 onClick={onCreate}>Definir Bimestre</Btt03>
          </AddEmp>
          <DivDados>
            <p>Bimestre ainda não definido</p>
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
          <h2>Calendário Bimestral</h2>

          <QuarterSection
            title="1º Bimestre"
            data={IStQuarter}
            onEdit={() => handleEditClick("IstQuarterInformation", IStQuarter[0]?._id, '/updatei-stquarter')}
            onCreate={() => navigate('/createi-stquarter')}
          />
          <QuarterSection
            title="2º Bimestre"
            data={IIndQuarter}
            onEdit={() => handleEditClick("IIndQuarterInformation", IIndQuarter[0]?._id, '/updateii-ndquarter')}
            onCreate={() => navigate('/createii-ndquarter')}
          />
          <QuarterSection
            title="3º Bimestre"
            data={IIIrdQuarter}
            onEdit={() => handleEditClick("IIIrdQuarterInformation", IIIrdQuarter[0]?._id, '/updateiii-rdquarter')}
            onCreate={() => navigate('/createiii-rdquarter')}
          />
          <QuarterSection
            title="4º Bimestre"
            data={IVthQuarter}
            onEdit={() => handleEditClick("IVthQuarterInformation", IVthQuarter[0]?._id, '/updateiv-thquarter')}
            onCreate={() => navigate('/createiv-thquarter')}
          />

          {showModal && (
            <ModalOverlay>
              <ModalContent>
                <h3>⚠️ Atenção!</h3>
                <p>Ao alterar as datas deste bimestre, <strong>os diários já fechados não serão atualizados automaticamente</strong>.</p>
                <p>Para atualizar um diário já fechado, altere as datas do bimestre, depois reabra o diário e feche novamente para aplicar as novas configurações.</p>
                <div className="modal-buttons">
                  <button className="modal-button confirm" onClick={handleConfirmEdit}>Entendi</button>
                  <button className="modal-button cancel" onClick={handleCancelEdit}>Cancelar</button>
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
