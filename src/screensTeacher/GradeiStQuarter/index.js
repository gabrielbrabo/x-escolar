import React, { useState, useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
import { clssInfo } from '../../Api'

import {
    Container,
    ContainerDivs,
    List,
    Emp,
    Span,
    InputGrade,
    Btt02,
    Grade,
    ContainerStudent
} from './style';

import {
} from '../../components/Inputs'
import LoadingSpinner from '../../components/Loading'

const IndexAttendance = () => {

    //const navigate = useNavigate()
    const [matter, setMatter] = useState([]);
    const [grades, setGrades] = useState({});
    const [stdt, setStdt] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_matter = sessionStorage.getItem("Selectmatter")
            const id_class = sessionStorage.getItem("class-info")
            const resClass = await clssInfo(id_class)
            const student = resClass.data.data.find(res => {
                return res
            }).id_student.map(res => {
                if (res) {
                    return (res)
                } else {
                    return null
                }
            })
            setStdt(student)
            setMatter(id_matter)
            setLoading(false);
        })()

    }, [])

    /*const handleAttendance = async () => {
        setLoading(true)

        setLoading(false)
    }*/

    console.log("matter", matter, grades)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    <h2>Grade 1º Bimestre</h2>
                    <ContainerStudent>
                        <List>

                            {
                                stdt.map(stdt => (
                                    <Emp
                                        key={stdt._id}
                                    >
                                        <Span>{stdt.name}</Span>
                                        <Grade>
                                            <p>nota:</p>
                                            <InputGrade
                                                type='number'
                                                onChange={(e) => setGrades(e)}
                                                maxLength={3}
                                            />
                                            <span>pts</span>
                                        </Grade>
                                        <Btt02>Definir</Btt02>
                                    </Emp>
                                ))
                            }
                        </List>
                    </ContainerStudent>
                </ContainerDivs>
            }
        </Container>
    )
}

export default IndexAttendance