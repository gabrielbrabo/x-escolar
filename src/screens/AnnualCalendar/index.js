import React, { useState, useEffect } from 'react';
import {
  Container,
  ContainerDivs,
  DivAddEmp,
  AddEmp,
  Btt02,
  Btt03,
  DivDados
} from './style';

import {
  getIstQuarter,
  getIIndQuarter,
  getIIIrdQuarter,
  getIVthQuarter,
  getVthQuarter,
  getVIthQuarter,

  reopenI_stQuarter,
  tocloseI_stQuarter,
  reopenII_ndQuarter,
  tocloseII_ndQuarter,
  reopenIII_rdQuarter,
  tocloseIII_rdQuarter,
  reopenIV_thQuarter,
  tocloseIV_thQuarter
} from '../../Api';

import LoadingSpinner from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

const HomeSchool = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [assessmentFormat, setassessmentFormat] = useState('');
  const [IStQuarter, setIStQuarter] = useState([]);
  const [IIndQuarter, setIIndQuarter] = useState([]);
  const [IIIrdQuarter, setIIIrdQuarter] = useState([]);
  const [IVthQuarter, setIVthQuarter] = useState([]);
  const [/*VthQuarter*/, setVthQuarter] = useState([]);
  const [/*VIthQuarter*/, setVIthQuarter] = useState([]);
  //const [positionAtEducationDepartment, setPositionAtEducationDepartment] = useState('')
  const [position_at_school, setPosition_at_school] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const idSchool = sessionStorage.getItem("id-school");
      const position = localStorage.getItem('position_at_school');
      //const positionAtEducationDepartment = localStorage.getItem('positionAtEducationDepartment');
      const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
      setassessmentFormat($assessmentFormat)
      setPosition_at_school(position);
      //setPositionAtEducationDepartment(positionAtEducationDepartment)
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

  const ReopenI_stQuarter = async (id) => {
    console.log("id reopen", id)
    const res = await reopenI_stQuarter(id)
    if (res) {
      console.log('resOpen', res)
      alert('Bimestre reaberto com sucesso')
      window.location.reload()
    }
  };

  const TocloseI_stQuarter = async (id) => {
    console.log("id reopen", id)
    const res = await tocloseI_stQuarter(id)
    if (res) {
      console.log('resOpen', res)
      alert('Bimestre fechado com sucesso')
      window.location.reload()
    }
  };

  const ReopenII_ndQuarter = async (id) => {
    console.log("id reopen", id)
    const res = await reopenII_ndQuarter(id)
    if (res) {
      console.log('resOpen', res)
      alert('Bimestre reaberto com sucesso')
      window.location.reload()
    }
  };

  const TocloseII_ndQuarter = async (id) => {
    console.log("id reopen", id)
    const res = await tocloseII_ndQuarter(id)
    if (res) {
      console.log('resOpen', res)
      alert('Bimestre fechado com sucesso')
      window.location.reload()
    }
  };

  const ReopenIII_rdQuarter = async (id) => {
    console.log("id reopen", id)
    const res = await reopenIII_rdQuarter(id)
    if (res) {
      console.log('resOpen', res)
      alert('Bimestre reaberto com sucesso')
      window.location.reload()
    }
  };

  const TocloseIII_rdQuarter = async (id) => {
    console.log("id reopen", id)
    const res = await tocloseIII_rdQuarter(id)
    if (res) {
      console.log('resOpen', res)
      alert('Bimestre fechado com sucesso')
      window.location.reload()
    }
  };
  const ReopenIV_thQuarter = async (id) => {
    console.log("id reopen", id)
    const res = await reopenIV_thQuarter(id)
    if (res) {
      console.log('resOpen', res)
      alert('Bimestre reaberto com sucesso')
      window.location.reload()
    }
  };

  const TocloseIV_thQuarter = async (id) => {
    console.log("id reopen", id)
    const res = await tocloseIV_thQuarter(id)
    if (res) {
      console.log('resOpen', res)
      alert('Bimestre fechado com sucesso')
      window.location.reload()
    }
  };

  const QuarterSection = ({ title, data, onEdit, onCreate, onReopen, onToclose }) => (
    <DivAddEmp>
      {data.length > 0 ? (
        <>
          <AddEmp>
            <h3>{title}</h3>
            { /*positionAtEducationDepartment ||*/ position_at_school === "DIRETOR/SUPERVISOR" /*|| position_at_school === "SECRETARIO"*/ ? (
              data.map(res => {
                console.log("_id", res._id)
                console.log("status", res.status)
                //const id = res._id
                if (res.status === "fechado" && (res.statusSupervisor === "fechado" || !res.statusSupervisor)) {
                  return (
                    <Btt02 onClick={onEdit}>Editar Bimestre</Btt02>
                  );
                } else if (res.status === "fechado" && res.statusSupervisor === "aberto") {
                  return (
                    <div style={{ display: "grid", gap: "8px" }}>
                      {/*<Btt02 key={res._id} onClick={() => onToclose(id)}>Fecha Bimestre</Btt02>*/}
                      <Btt02 onClick={onEdit}>Editar Bimestre</Btt02>
                    </div>
                  );
                } else if (res.status !== "fechado") {
                  return (
                    <Btt02 onClick={onEdit}>Editar Bimestre</Btt02>
                  );
                }
                return null // res
              })

            ) : position_at_school === "SECRETARIO" ? (
              data.map(res => {
                if (res.status !== "fechado") {
                  return (
                    <Btt02 onClick={onEdit}>Editar Bimestre</Btt02>
                  );
                }
                return null
              })
            ) : null /* Caso nenhuma condição de posição seja atendida */}
          </AddEmp>
          <DivDados>
            {data.map(res => (
              <React.Fragment key={res._id}>
                {console.log("data", data)}
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
      ) : position_at_school !== "PROFESSOR" ? (
        <>
          <AddEmp>
            <h3>{title}</h3>
            <Btt03 onClick={onCreate}>Definir Bimestre</Btt03>
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
          <h2>Calendário Bimestral</h2>
          {/*<p>Defina somente Bimestres nessecarios para o ano letivo !!!</p>*/}
          <QuarterSection
            title="1º Bimestre"
            data={IStQuarter}
            onEdit={() => handleNavigate("IstQuarterInformation", IStQuarter[0]?._id, '/updatei-stquarter')}
            onCreate={() => navigate('/createi-stquarter')}
            onReopen={ReopenI_stQuarter} // Passando a função aqui
            onToclose={TocloseI_stQuarter} // Passando a função aqui
          />
          <QuarterSection
            title="2º Bimestre"
            data={IIndQuarter}
            onEdit={() => handleNavigate("IIndQuarterInformation", IIndQuarter[0]?._id, '/updateii-ndquarter')}
            onCreate={() => navigate('/createii-ndquarter')}
            onReopen={ReopenII_ndQuarter} // Passando a função aqui
            onToclose={TocloseII_ndQuarter} // Passando a função aqui
          />
          <QuarterSection
            title="3º Bimestre"
            data={IIIrdQuarter}
            onEdit={() => handleNavigate("IIIrdQuarterInformation", IIIrdQuarter[0]?._id, '/updateiii-rdquarter')}
            onCreate={() => navigate('/createiii-rdquarter')}
            onReopen={ReopenIII_rdQuarter} // Passando a função aqui
            onToclose={TocloseIII_rdQuarter} // Passando a função aqui
          />
          <QuarterSection
            title="4º Bimestre"
            data={IVthQuarter}
            onEdit={() => handleNavigate("IVthQuarterInformation", IVthQuarter[0]?._id, '/updateiv-thquarter')}
            onCreate={() => navigate('/createiv-thquarter')}
            onReopen={ReopenIV_thQuarter} // Passando a função aqui
            onToclose={TocloseIV_thQuarter} // Passando a função aqui
          />
          {/*<QuarterSection
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
          />*/}
        </ContainerDivs>
      )}
    </Container>
  );
};

export default HomeSchool;
