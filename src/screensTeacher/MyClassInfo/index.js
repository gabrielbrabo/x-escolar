import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetInfoMyClass, clssInfo } from '../../Api'

import {
    Container,
    ClassDetails,
    ClassInfo,
    ButtonContainer,
    //MatterSection,
    //MatterItem,
    StudentSection,
    StudentItem,
    InfoText,
    ContainerDivs
} from './style';
import LoadingSpinner from '../../components/Loading'

const MyCla$$Info = () => {

    const navigate = useNavigate()
    const [clss, setClss] = useState([])
    //const [NameMatter, setNameMatter] = useState([])
    const [stdt, setStdt] = useState([])
    const { id_class } = useParams();
    const { id_teacher } = useParams();
    const [loading, setLoading] = useState(false);
    //console.log(currentYear)

    useEffect(() => {
        (async () => {
            setLoading(true);
            sessionStorage.removeItem("Selectbimonthly");
            console.log('useParamsClass', id_class)
            console.log('useParamsTeacher', id_teacher)
            const resClass = await clssInfo(id_class)
            const res = await GetInfoMyClass(id_class, id_teacher)
            console.log(res.data.data)
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
            setClss(resClass.data.data)
            //setNameMatter(res.data.data)

            sessionStorage.removeItem("attendance_ idmatter")
            sessionStorage.removeItem("selectedDate")
            sessionStorage.removeItem("day")
            sessionStorage.removeItem("month")
            sessionStorage.removeItem("year")

            console.log("matter", res.data.data)
            setLoading(false)
        })()

    }, [id_class, id_teacher])

    const StudentInformation = async (stdt) => {
        setLoading(true);
        navigate(`/student/info/${stdt._id}`)
        setLoading(false);
    }

    console.log("student", stdt)

    stdt.sort(function (a, b) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    })

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    {
                        clss.map(clss => (
                            <ClassDetails key={clss._id} >
                                <ClassInfo>Serie: {clss.serie}</ClassInfo>
                                <ClassInfo>Nivel: {clss.level}</ClassInfo>
                                <ClassInfo>Turno: {clss.shift}</ClassInfo>
                                <ClassInfo>Numero da Sala: {clss.classroom_number}</ClassInfo>
                            </ClassDetails>
                        ))
                    }
                    <ButtonContainer>
                        <button onClick={() => { navigate('/attendance') }}>Chamada</button>
                        <button onClick={() => { navigate('/grade') }}>Registra Redimento</button>
                        <button onClick={() => { navigate('/classes') }}>Aulas</button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <button onClick={() => { navigate('/individual-form') }}>Ficha Individual</button>
                    </ButtonContainer>
                    <StudentSection>
                        <h2>Estudantes</h2>
                        {stdt.length > 0 ? (
                            stdt.map(stdt => (
                                <StudentItem onClick={() => StudentInformation(stdt)}>{stdt.name}</StudentItem>
                            ))
                        )
                        :
                            (
                                <InfoText>Não há nenhum estudante</InfoText>
                            )
                        }
                    </StudentSection>
                    {
                       /* <MatterSection>
                            <h2>Materias</h2>

                            {
                                NameMatter.map(employee => (
                                    <div key={employee._id}>
                                        <MatterItem>{employee.name_matter}</MatterItem>
                                    </div>
                                ))
                            }
                        </MatterSection>*/
                    }
                </ContainerDivs>
            }
        </Container>
    )
}

export default MyCla$$Info