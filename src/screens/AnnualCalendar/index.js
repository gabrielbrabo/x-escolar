import React, { useState, useEffect } from 'react';
import {
  Container,
  ContainerDivs,
  DivAddEmp,
  AddEmp,
  Btt02,
  DivDados
} from './style';

import { getIstQuarter } from '../../Api';

import LoadingSpinner from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

const HomeSchool = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [IStQuarter, setIStQuarter] = useState([])

  useEffect(() => {
    (async () => {
      const idSchool = sessionStorage.getItem("id-school");
      const year = new Date().getFullYear();
      const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
      if (IstQuarter) {
        setIStQuarter(IstQuarter.data.data)
        console.log("IstQuarter", IstQuarter.data.data)
      }

      setLoading(false);
    })();
  }, []);

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
                  <Btt02 /*onClick={e => (navigate('/createi-stquarter'))}*/ >Editar Bimestre</Btt02>
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
            <AddEmp>
              <h3>2º Bimestre</h3>
              <Btt02 >Definir Bimestre</Btt02>
            </AddEmp>
            <DivDados>
              <p>Data de Inicio: </p>
              <p>Data de Fim: </p>
              <p>Nota Media: </p>
              <p>Nota Total: </p>
            </DivDados>
          </DivAddEmp>
          <DivAddEmp>
            <AddEmp>
              <h3>3º Bimestre</h3>
              <Btt02 >Definir Bimestre</Btt02>
            </AddEmp>
            <DivDados>
              <p>Data de Inicio: </p>
              <p>Data de Fim: </p>
              <p>Nota Media: </p>
              <p>Nota Total: </p>
            </DivDados>
          </DivAddEmp>
          <DivAddEmp>
            <AddEmp>
              <h3>4º Bimestre</h3>
              <Btt02 >Definir Bimestre</Btt02>
            </AddEmp>
            <DivDados>
              <p>Data de Inicio: </p>
              <p>Data de Fim: </p>
              <p>Nota Media: </p>
              <p>Nota Total: </p>
            </DivDados>
          </DivAddEmp>
        </ContainerDivs>
      )}
    </Container>
  )
}

export default HomeSchool