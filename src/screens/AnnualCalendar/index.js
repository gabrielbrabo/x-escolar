import React, { useState, useEffect } from 'react';
import {
  Container,
  ContainerDivs,
  DivAddEmp,
  AddEmp,
  Btt02,
  DivDados
} from './style';

import {
  getIstQuarter,
  getIIndQuarter,
  getIIIrdQuarter,
  getIVthQuarter,
  getVthQuarter,
  getVIthQuarter
} from '../../Api';

import LoadingSpinner from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

const HomeSchool = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [IStQuarter, setIStQuarter] = useState([]);
  const [IIndQuarter, setIIndQuarter] = useState([]);
  const [IIIrdQuarter, setIIIrdQuarter] = useState([]);
  const [IVthQuarter, setIVthQuarter] = useState([]);
  const [VthQuarter, setVthQuarter] = useState([]);
  const [VIthQuarter, setVIthQuarter] = useState([]);
  const [position_at_school, setPosition_at_school] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const idSchool = sessionStorage.getItem("id-school");
      const position = localStorage.getItem('position_at_school');
      setPosition_at_school(position);
      const year = new Date().getFullYear();
      
      const [IstQuarter, IIndQuarter, IIIrdQuarter, IVthQuarter, VthQuarter, VIthQuarter] = await Promise.all([
        getIstQuarter(year, JSON.parse(idSchool)),
        getIIndQuarter(year, JSON.parse(idSchool)),
        getIIIrdQuarter(year, JSON.parse(idSchool)),
        getIVthQuarter(year, JSON.parse(idSchool)),
        getVthQuarter(year, JSON.parse(idSchool)),
        getVIthQuarter(year, JSON.parse(idSchool))
      ]);
      
      setIStQuarter(IstQuarter?.data?.data || []);
      setIIndQuarter(IIndQuarter?.data?.data || []);
      setIIIrdQuarter(IIIrdQuarter?.data?.data || []);
      setIVthQuarter(IVthQuarter?.data?.data || []);
      setVthQuarter(VthQuarter?.data?.data || []);
      setVIthQuarter(VIthQuarter?.data?.data || []);
      setLoading(false);
    })();
  }, []);

  const handleNavigate = (quarter, id, route) => {
    sessionStorage.setItem(quarter, id);
    navigate(route);
  };

  const QuarterSection = ({ title, data, onEdit, onCreate }) => (
    <DivAddEmp>
      {data.length > 0 ? (
        <>
          <AddEmp>
            <h3>{title}</h3>
            {position_at_school !== "PROFESSOR" && (
              <Btt02 onClick={onEdit}>Editar Bimestre</Btt02>
            )}
          </AddEmp>
          <DivDados>
            {data.map(res => (
              <React.Fragment key={res._id}>
                <p>Data de Inicio: {res.startday}/{res.startmonth}/{res.startyear}</p>
                <p>Data de Fim: {res.endday}/{res.endmonth}/{res.endyear}</p>
              </React.Fragment>
            ))}
          </DivDados>
        </>
      ) : position_at_school !== "PROFESSOR" ? (
        <>
          <AddEmp>
            <h3>{title}</h3>
            <Btt02 onClick={onCreate}>Definir Bimestre</Btt02>
          </AddEmp>
          <DivDados>
            <p>Bimestre ainda não definido</p>
          </DivDados>
        </>
      ) : null}
    </DivAddEmp>
  );

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ContainerDivs>
          <h2>Calendário Anual</h2>
          <QuarterSection
            title="1º Bimestre"
            data={IStQuarter}
            onEdit={() => handleNavigate("IstQuarterInformation", IStQuarter[0]?._id, '/updatei-stquarter')}
            onCreate={() => navigate('/createi-stquarter')}
          />
          <QuarterSection
            title="2º Bimestre"
            data={IIndQuarter}
            onEdit={() => handleNavigate("IIndQuarterInformation", IIndQuarter[0]?._id, '/updateii-ndquarter')}
            onCreate={() => navigate('/createii-ndquarter')}
          />
          <QuarterSection
            title="3º Bimestre"
            data={IIIrdQuarter}
            onEdit={() => handleNavigate("IIIrdQuarterInformation", IIIrdQuarter[0]?._id, '/updateiii-rdquarter')}
            onCreate={() => navigate('/createiii-rdquarter')}
          />
          <QuarterSection
            title="4º Bimestre"
            data={IVthQuarter}
            onEdit={() => handleNavigate("IVthQuarterInformation", IVthQuarter[0]?._id, '/updateiv-thquarter')}
            onCreate={() => navigate('/createiv-thquarter')}
          />
          <QuarterSection
            title="5º Bimestre"
            data={VthQuarter}
            onEdit={() => handleNavigate("VthQuarterInformation", VthQuarter[0]?._id, '/updatev-thquarter')}
            onCreate={() => navigate('/createv-thquarter')}
          />
          <QuarterSection
            title="6º Bimestre"
            data={VIthQuarter}
            onEdit={() => handleNavigate("VIthQuarterInformation", VIthQuarter[0]?._id, '/updatevi-thquarter')}
            onCreate={() => navigate('/createvi-thquarter')}
          />
        </ContainerDivs>
      )}
    </Container>
  );
};

export default HomeSchool;
