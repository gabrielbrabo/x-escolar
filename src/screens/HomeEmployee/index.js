import { useEffect, useState } from 'react';
import {
  Container,
} from './style';

import { getSchool } from '../../Api'

const HomeSchool = () => {

  const [assessmentFormat, setAssessmentFormat] = useState(null);
  const [positionAtSchool, setPositionAtSchool] = useState(null);
  const [name, setName] = useState('')

  useEffect(() => {
    async function fetchData() {
      const idSchool = sessionStorage.getItem('id-school');
      const dataSchool = await getSchool(JSON.parse(idSchool))
      console.log('res', dataSchool.data.data.assessmentFormat)
      setAssessmentFormat(dataSchool.data.data.assessmentFormat)
      //sessionStorage.setItem('assessmentFormat', dataSchool.data.data.assessmentFormat)
    }
    fetchData();
    const name = localStorage.getItem("name");
    const position = localStorage.getItem('position_at_school');
    setPositionAtSchool(position);
    setName(name)
  }, [])

  console.log("positionAtSchool", positionAtSchool)
  if (assessmentFormat) {
    console.log("assessmentFormat", assessmentFormat)
    sessionStorage.setItem('assessmentFormat', assessmentFormat)
    if (positionAtSchool === "PROFESSOR") {
      window.location.href = '/myclasses'
      //return null
    } else {
      window.location.href = '/employees'
    }
  }


  return (
    <Container>
      <h1>Ola {name}</h1>
    </Container>
  )
}

export default HomeSchool