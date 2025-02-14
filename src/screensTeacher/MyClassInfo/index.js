import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { clssInfo } from '../../Api'

import {
    Container,
    ClassDetails,
    ClassInfo,
    ButtonContainer,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
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
            sessionStorage.removeItem("Selectmatt")
            console.log('useParamsClass', id_class)
            console.log('useParamsTeacher', id_teacher)
            const resClass = await clssInfo(id_class)
            console.log("resClass", resClass.data.data)
            //const res = await GetInfoMyClass(id_class, id_teacher)
            //console.log(res.data.data)
            const student = await resClass.data.data.find(res => {
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

            const classRegentTeacher = await resClass.data.data.find(res => {
                return res
            }).classRegentTeacher.map(res => {
                return (res)
            }).find(res => {
                if (res) {
                    sessionStorage.setItem("classRegentTeacher", JSON.stringify(res._id))
                    return (res)
                } else {
                    return null
                }
            })

            const physicalEducationTeacher = await resClass.data.data.find(res => {
                return res
            }).physicalEducationTeacher.map(res => {
                return (res)
            }).find(res => {
                if (res) {
                    sessionStorage.setItem("physicalEducationTeacher", JSON.stringify(res._id))
                    return (res)
                } else {
                    return null
                }
            })

            console.log("classRegentTeacher", classRegentTeacher);
            console.log("physicalEducationTeacher", physicalEducationTeacher);

            sessionStorage.removeItem("attendance_ idmatter")
            sessionStorage.removeItem("selectedDate")
            sessionStorage.removeItem("day")
            sessionStorage.removeItem("month")
            sessionStorage.removeItem("year")

            //console.log("matter", res.data.data)
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

    const messageButtonClick = () => {
        navigate(-1);
    };

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    {
                        clss.map(clss => (
                            <ClassDetails style={{ backgroundColor: "#FF5733", color: "#FFF" }} key={clss._id} >
                                <ClassInfo style={{ color: "#FFF" }}>{clss.serie}</ClassInfo>
                               { /*<ClassInfo>Nivel: {clss.level}</ClassInfo>*/}
                                <ClassInfo style={{ color: "#FFF" }}>Turno: {clss.shift}</ClassInfo>
                                {/*<ClassInfo>Numero da Sala: {clss.classroom_number}</ClassInfo>*/}
                            </ClassDetails>
                        ))
                    }
                    <ButtonContainer>
                        <button onClick={() => { navigate(/*'/test-attendance'*/'/attendance') }}>Frequência</button>
                        <button onClick={() => { navigate('/classes') }}>Aulas</button>
                        <button onClick={() => { navigate('/grade') }}>Conceitos</button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <button onClick={() => { navigate('/individual-form') }}>Ficha Individual</button>
                        <button onClick={() => { navigate('/final-concepts') }}>Conceitos Finais</button>
                    </ButtonContainer>
                    <StudentSection>
                        <h2 style={{ color: "#158fa2" }}>Alunos</h2>
                        <p>Total de alunos: {stdt.length}</p>
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
                    <ToGoBack onClick={messageButtonClick}>
                        <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                        <SignMessageButtonTextBold>Lista de Turmas</SignMessageButtonTextBold>
                    </ToGoBack>
                </ContainerDivs>
            }
        </Container>
    )
}

export default MyCla$$Info