import { useEffect, useState } from 'react';
import {
  Container,
} from './style';

import { getSchool, getAssessmentRegime } from '../../Api'

const HomeSchool = () => {

  const [assessmentFormat, setAssessmentFormat] = useState(null);
  const [assessmentRegime, setAssessmentRegime] = useState('');
  const [positionAtSchool, setPositionAtSchool] = useState(null);
  const [name, setName] = useState('')

  useEffect(() => {
    async function fetchData() {
      const idSchool = sessionStorage.getItem('id-school');
      const dataSchool = await getSchool(JSON.parse(idSchool))
      console.log('res', dataSchool.data.data.assessmentFormat)
      setAssessmentFormat(dataSchool.data.data.assessmentFormat)
      const response = await getAssessmentRegime(JSON.parse(idSchool))

      if (response?.data?.data) {
        setAssessmentRegime(response.data.data)
      }
      //sessionStorage.setItem('assessmentFormat', dataSchool.data.data.assessmentFormat)
    }
    fetchData();
    const name = localStorage.getItem("name");
    const position = localStorage.getItem('position_at_school');
    setPositionAtSchool(position);
    setName(name)
  }, [])

  console.log("positionAtSchool", positionAtSchool)
  useEffect(() => {
    if (assessmentFormat && assessmentRegime && positionAtSchool) {

      sessionStorage.setItem('assessmentFormat', assessmentFormat)
      sessionStorage.setItem('assessmentRegime', assessmentRegime)

      if (positionAtSchool === "PROFESSOR") {
        window.location.href = '/myclasses'
      } else {
        window.location.href = '/employees'
      }
    }
  }, [assessmentFormat, assessmentRegime, positionAtSchool])



  return (
    <Container>
      <h1>Ola {name}</h1>
    </Container>
  )
}

export default HomeSchool