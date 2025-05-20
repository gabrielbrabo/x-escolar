import React, { useEffect, useContext } from 'react';

import { AuthContext, } from '../../contexts/auth'

import { useNavigate } from 'react-router-dom'

import {
  Container,
} from './style';

import { api, Refresh, NameSchool, RefreshDepEdu, EducationDepartamentName } from '../../Api'

import LoadingSpinner from '../../components/Loading'

const Preload = () => {

  const navigate = useNavigate()
  const { loginEmployee } = useContext(AuthContext)
  const { loginEmployeeEducationDepartment } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      const id = localStorage.getItem("Id_employee");
      const posi = localStorage.getItem("positionAtEducationDepartment");
      const token = localStorage.getItem("token");
      const lastLogin = localStorage.getItem("lastLogin");

      console.log(">>> ID:", id);
      console.log(">>> POSIÇÃO:", posi);
      console.log(">>> TOKEN:", token);
      console.log(">>> LAST LOGIN:", lastLogin);
      
      const now = Date.now();
      const expirationTime = 24 * 60 * 60 * 1000;

      if (!token || !lastLogin || now - lastLogin > expirationTime) {
        localStorage.clear();
        sessionStorage.clear();
        if (posi) {
          navigate('/signin/employee-education-department'); // Login da SEMEDE
        } else {
          navigate('/signin/employee'); // Login da escola
        }
        return;
      }

      try {
        // ✅ Verifica se é funcionário da SEMEDE
        if (posi) {
          const response = await RefreshDepEdu(JSON.parse(id)); // Outra função para SEMEDE
          if (response && response.data) {
            const data = response.data;
            localStorage.setItem("lastLogin", now);


            const educationDepartment = await EducationDepartamentName(data.idEducationDepartment)

            //const loggedEmployee = data.CPF
            sessionStorage.setItem("idDepartment", data.idEducationDepartment);
            sessionStorage.setItem("name-department", educationDepartment.data.data)
            localStorage.setItem("Id_employee", JSON.stringify(data.id))
            sessionStorage.setItem("name", data.name);
            localStorage.setItem("name", data.name)
            sessionStorage.setItem("cpf", data.CPF);
            localStorage.setItem("type", data.type)
            sessionStorage.setItem("token", data.token);
            localStorage.setItem("positionAtEducationDepartment", data.positionAtEducationDepartment);
            localStorage.setItem("token", data.token);
            sessionStorage.setItem("token", data.token)

            api.defaults.headers.Authorization = `Bearer ${data.token}`;

            loginEmployeeEducationDepartment(data.CPF)

            // Redireciona para painel da SEMEDE
            //navigate('/home/education-department');
            return;
          } else {
            navigate('/signin/employee-education-department');
          }
        }

        // 👉 Caso seja funcionário da escola
        const response = await Refresh(JSON.parse(id));
        if (response && response.data) {
          localStorage.setItem("lastLogin", now);

          const data = response.data;
          const Schools = data.schools;

          if (Schools) {
            const userCPF = data.schools.map(res => res.cpf);
            navigate('/school/selection', { state: { schools: Schools, cpf: userCPF } });
            return;
          }

          const nameSchool = await NameSchool(data.id_school);
          sessionStorage.setItem("School", nameSchool.data.data);

          localStorage.setItem("Id_employee", JSON.stringify(data.id));
          sessionStorage.setItem("cpf", data.CPF);
          sessionStorage.setItem("name", data.name);
          localStorage.setItem("name", data.name);
          localStorage.setItem("type", data.type);
          localStorage.setItem("position_at_school", data.position_at_school);
          sessionStorage.setItem("id-school", JSON.stringify(data.id_school));
          sessionStorage.setItem("id_matter", data.id_matter);
          sessionStorage.setItem("id_class", data.id_class);
          sessionStorage.setItem("id_reporter_cardid_class", data.id_reporter_card);
          localStorage.setItem("token", data.token);
          sessionStorage.setItem("token", data.token);

          api.defaults.headers.Authorization = `Bearer ${data.token}`;
          loginEmployee(data.CPF);
        } else {
          navigate('/signin/employee');
        }
      } catch (error) {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/signin/employee');
      }
    })();
  }, [navigate, loginEmployee, loginEmployeeEducationDepartment]);

  return (
    <Container>
      <LoadingSpinner />
    </Container>
  )
}

export default Preload