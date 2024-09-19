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
  getIVthQuarter
} from '../../Api';

import LoadingSpinner from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

const HomeSchool = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [IStQuarter, setIStQuarter] = useState([])
  const [IIndQuarter, setIIndQuarter] = useState([])
  const [IIIrdQuarter, setIIIrdQuarter] = useState([])
  const [IVthQuarter, setIVthQuarter] = useState([])

  useEffect(() => {
    (async () => {
      const idSchool = sessionStorage.getItem("id-school");
      const year = new Date().getFullYear();
      const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
      const IIndQuarter = await getIIndQuarter(year, JSON.parse(idSchool))
      const IIIrdQuarter = await getIIIrdQuarter(year, JSON.parse(idSchool))
      const IVthQuarter = await getIVthQuarter(year, JSON.parse(idSchool))
      if (IstQuarter) {
        setIStQuarter(IstQuarter.data.data)
        console.log("IstQuarter", IstQuarter.data.data)
      }
      if (IIndQuarter) {
        setIIndQuarter(IIndQuarter.data.data)
        console.log("IIndQuarter", IIndQuarter.data.data)
      }
      if (IIIrdQuarter) {
        setIIIrdQuarter(IIIrdQuarter.data.data)
        console.log("IIIrdQuarter", IIIrdQuarter.data.data)
      }
      if (IVthQuarter) {
        setIVthQuarter(IVthQuarter.data.data)
        console.log("IVthQuarter", IVthQuarter.data.data)
      }

      setLoading(false);
    })();
  }, []);

  const i_stQuarterInfo = () => {
    setLoading(true);
    const res = IStQuarter.find( result => { return result._id })
    sessionStorage.setItem("IstQuarterInformation", res._id);
    console.log( 'log', res._id)
    navigate('/updatei-stquarter')
    setLoading(false);
  };

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ContainerDivs>
          <h2>Calendario Anual</h2>
          <DivAddEmp>
            {IStQuarter.length > 0 ? (
              <>
                <AddEmp>
                  <h3>1º Bimestre</h3>
                  <Btt02 onClick={i_stQuarterInfo}
                  >Editar Bimestre</Btt02>
                </AddEmp>
                <DivDados>
                  {
                    IStQuarter.map(res => (
                      <>
                        <p>Data de Inicio:  {res.startday}/{res.startmonth}/{res.startyear}</p>
                        <p>Data de Fim:  {res.endday}/{res.endmonth}/{res.endyear}</p>
                        <p>Nota Total: {res.totalGrade} </p>
                        <p>Nota Media: {res.averageGrade}</p>
                      </>
                    ))
                  }

                </DivDados>
              </>
            ) : (
              <>
                <AddEmp>
                  <h3>1º Bimestre</h3>
                  <Btt02 onClick={e => (navigate('/createi-stquarter'))} >Definir Bimestre</Btt02>
                </AddEmp>
                <DivDados>
                  <>Bimestre ainda não definido</>
                </DivDados>
              </>
            )
            }
          </DivAddEmp>
          <DivAddEmp>
            {IIndQuarter.length > 0 ? (
              <>
                <AddEmp>
                  <h3>2º Bimestre</h3>
                  <Btt02 /*onClick={e => (navigate('/createi-stquarter'))}*/ >Editar Bimestre</Btt02>
                </AddEmp>
                <DivDados>
                  {
                    IIndQuarter.map(res => (
                      <>
                        <p>Data de Inicio:  {res.startday}/{res.startmonth}/{res.startyear}</p>
                        <p>Data de Fim:  {res.endday}/{res.endmonth}/{res.endyear}</p>
                        <p>Nota Total: {res.totalGrade} </p>
                        <p>Nota Media: {res.averageGrade}</p>
                      </>
                    ))
                  }

                </DivDados>
              </>
            ) : (
              <>
                <AddEmp>
                  <h3>2º Bimestre</h3>
                  <Btt02 onClick={e => (navigate('/createii-ndquarter'))} >Definir Bimestre</Btt02>
                </AddEmp>
                <DivDados>
                  <>Bimestre ainda não definido</>
                </DivDados>
              </>
            )
            }
          </DivAddEmp>
          <DivAddEmp>
            {IIIrdQuarter.length > 0 ? (
              <>
                <AddEmp>
                  <h3>3º Bimestre</h3>
                  <Btt02 /*onClick={e => (navigate('/createi-stquarter'))}*/ >Editar Bimestre</Btt02>
                </AddEmp>
                <DivDados>
                  {
                    IIIrdQuarter.map(res => (
                      <>
                        <p>Data de Inicio:  {res.startday}/{res.startmonth}/{res.startyear}</p>
                        <p>Data de Fim:  {res.endday}/{res.endmonth}/{res.endyear}</p>
                        <p>Nota Total: {res.totalGrade} </p>
                        <p>Nota Media: {res.averageGrade}</p>
                      </>
                    ))
                  }

                </DivDados>
              </>
            ) : (
              <>
                <AddEmp>
                  <h3>3º Bimestre</h3>
                  <Btt02 onClick={e => (navigate('/createiii-rdquarter'))} >Definir Bimestre</Btt02>
                </AddEmp>
                <DivDados>
                  <>Bimestre ainda não definido</>
                </DivDados>
              </>
            )
            }
          </DivAddEmp>
          <DivAddEmp>
            {IVthQuarter.length > 0 ? (
              <>
                <AddEmp>
                  <h3>4º Bimestre</h3>
                  <Btt02 /*onClick={e => (navigate('/createi-stquarter'))}*/ >Editar Bimestre</Btt02>
                </AddEmp>
                <DivDados>
                  {
                    IVthQuarter.map(res => (
                      <>
                        <p>Data de Inicio:  {res.startday}/{res.startmonth}/{res.startyear}</p>
                        <p>Data de Fim:  {res.endday}/{res.endmonth}/{res.endyear}</p>
                        <p>Nota Total: {res.totalGrade} </p>
                        <p>Nota Media: {res.averageGrade}</p>
                      </>
                    ))
                  }

                </DivDados>
              </>
            ) : (
              <>
                <AddEmp>
                  <h3>4º Bimestre</h3>
                  <Btt02 onClick={e => (navigate('/createiv-thquarter'))} >Definir Bimestre</Btt02>
                </AddEmp>
                <DivDados>
                  <>Bimestre ainda não definido</>
                </DivDados>
              </>
            )
            }
          </DivAddEmp>

        </ContainerDivs>
      )}
    </Container>
  )
}

export default HomeSchool