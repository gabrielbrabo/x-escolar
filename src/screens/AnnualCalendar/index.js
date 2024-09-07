import React, { useState, useEffect } from 'react';
import {
  Container,
  ContainerDivs,
  DivAddEmp,
  AddEmp,
  Btt02,
  DivDados
} from './style';

import LoadingSpinner from '../../components/Loading';
import { useNavigate} from 'react-router-dom';

const HomeSchool = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      //const idSchool = sessionStorage.getItem("id-school");

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
            <AddEmp>
              <h3>1º Bimestre</h3>
              <Btt02 onClick={e => (navigate('/createi-stquarter'))} >Definir Bimestre</Btt02>
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