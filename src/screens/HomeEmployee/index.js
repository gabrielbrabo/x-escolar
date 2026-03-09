import { useEffect, useState } from 'react';
import {
  Container,
} from './style';

import { getEmployeeDetails, getSchool, getAssessmentRegime } from '../../Api'

const HomeSchool = () => {

  const [assessmentFormat, setAssessmentFormat] = useState(null);
  const [assessmentRegime, setAssessmentRegime] = useState('');
  const [positionAtSchool, setPositionAtSchool] = useState(null);
  const [secondaryPosition, setSecondaryPosition] = useState(null);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [name, setName] = useState('')

  useEffect(() => {
    async function fetchData() {
      const idSchool = sessionStorage.getItem('id-school');
      const idEmployee = localStorage.getItem("Id_employee");
      const dataSchool = await getSchool(JSON.parse(idSchool))
      console.log('res', dataSchool.data.data.assessmentFormat)
      setAssessmentFormat(dataSchool.data.data.assessmentFormat)
      const response = await getAssessmentRegime(JSON.parse(idSchool))

      if (response?.data?.data) {
        setAssessmentRegime(response.data.data)
      }
      //sessionStorage.setItem('assessmentFormat', dataSchool.data.data.assessmentFormat)
      // 🔎 busca funcionário
      const employee = await getEmployeeDetails(JSON.parse(idEmployee));
      console.log("secudary", employee)

      const primary = employee?.data?.position_at_school;
      const secondary = employee?.data?.position_at_school_secondary;

      setPositionAtSchool(primary);
      setSecondaryPosition(secondary);

      if (secondary) {
        setShowRoleSelector(true);
      } else {
        handleSelectRole(primary);
      }
    }

    fetchData();
    const name = localStorage.getItem("name");
    //const position = localStorage.getItem('position_at_school');
    //setPositionAtSchool(position);
    setName(name)
  }, [])

  console.log("positionAtSchool", positionAtSchool)
  useEffect(() => {

    if (showRoleSelector) return;

    if (!positionAtSchool) return;

    sessionStorage.setItem('assessmentFormat', assessmentFormat)
    sessionStorage.setItem('assessmentRegime', assessmentRegime)

    if (positionAtSchool === "PROFESSOR") {
      window.location.href = '/myclasses'
    } else {
      window.location.href = '/employees'
    }

  }, [assessmentFormat, assessmentRegime, positionAtSchool, showRoleSelector])

  useEffect(() => {

    if (!secondaryPosition) return;
    if (!showRoleSelector) return;

    const timer = setTimeout(() => {
      alert("Você precisa escolher um cargo para continuar.");
      logout();
    }, 30000); // 15 segundos para escolher

    return () => clearTimeout(timer);

  }, [secondaryPosition, showRoleSelector]);

  const handleSelectRole = (role) => {

    localStorage.setItem("position_at_school", role);

    setPositionAtSchool(role);
    setShowRoleSelector(false);

  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <Container>
      <h1>Ola {name}</h1>
      {showRoleSelector && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backdropFilter: "blur(8px)",
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "40px 35px",
              borderRadius: 12,
              textAlign: "center",
              minWidth: 360,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}
          >
            <h2 style={{ marginBottom: 8 }}>Escolha o cargo</h2>

            <p style={{ color: "#666", marginBottom: 25 }}>
              Selecione com qual cargo deseja acessar o sistema
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14
              }}
            >
              <button
                onClick={() => handleSelectRole(positionAtSchool)}
                style={{
                  padding: "14px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  background: "#f8f9fa",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "0.2s"
                }}
                onMouseOver={(e) => (e.target.style.background = "#e9ecef")}
                onMouseOut={(e) => (e.target.style.background = "#f8f9fa")}
              >
                {positionAtSchool}
              </button>

              <button
                onClick={() => handleSelectRole(secondaryPosition)}
                style={{
                  padding: "14px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  background: "#f8f9fa",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "0.2s"
                }}
                onMouseOver={(e) => (e.target.style.background = "#e9ecef")}
                onMouseOut={(e) => (e.target.style.background = "#f8f9fa")}
              >
                {secondaryPosition}
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

export default HomeSchool