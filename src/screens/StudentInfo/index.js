import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StdtInfo, DestroyStudent } from '../../Api'
import Calendar from '../../components/CalendarUI/Calendar'

import {
    Container,
    //List,
    Emp,
    Span,
    ContainerDivs,
    Pro,
    ProfilePhoto,
    ProfileInfo,
    EmployeeInfo,
    DivButtomEdit,
    Btt02,
    Btt01,
    ButtonCancel,
    AddMatterSection,
    WarningBox,
    Button,
    ButtonRemove,
    ActionButtons
    //FormFilter,
    //FormSearch
    // Input
} from './style';

/*import {
AreaEmp,
InputEmp,
Select
} from '../../components/Inputs'

import {
Btt02, 
}from '../../components/Buttons';*/
import LoadingSpinner from '../../components/Loading'

const Student = () => {

    const navigate = useNavigate()
    const currentYear = new Date().getFullYear().toString();
    //const [year, setYear] = useState([])
    const [Clss, setClss] = useState([])
    const [student, setStudent] = useState([])
    //const [busca, setBusca] = useState("")
    //const [filter, setFilter] = useState()
    const [positionAtSchool, setPositionAtSchool] = useState(null);
    const [loading, setLoading] = useState(false);
    const [removeStudent, setRemoveStudent] = useState(false);
    const { id_student } = useParams()
    console.log(currentYear)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const position = localStorage.getItem('position_at_school');
            setPositionAtSchool(position);
            sessionStorage.removeItem('StudentInformation')
            sessionStorage.setItem("StudentInformation", id_student)
            const res = await StdtInfo(id_student)
            setStudent(res.data.data)
            //console.log(res.data.data)
            const clss = res.data.data.find(res => {
                return res
            }).id_class.map(res => {
                if (res.year === currentYear) {
                    return (res)
                } else {
                    return null
                }
            }).filter(res => {
                if (! null) {
                    return (res)
                } else {
                    return null
                }
            })
            setClss(clss)
            setLoading(false);
        })()

    }, [currentYear, id_student])

    const Edit = async () => {
        navigate('/edit-student')
    }

    const destroyStudent = async () => {
        const idStudent = sessionStorage.getItem("StudentInformation")
        const res = await DestroyStudent(idStudent)
        if (res) {
            alert('Aluno removido com sucesso!')
            navigate(-1);
        }
    }

    console.log("clas", Clss)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <ContainerDivs>
                        {
                            student.map(student => (
                                <Emp key={student._id} >
                                    <EmployeeInfo>
                                        <Pro>
                                            <ProfilePhoto>

                                            </ProfilePhoto>
                                            < ProfileInfo>
                                                <Span>Nome: {student.name}</Span>
                                                <Span>RG: {student.rg}</Span>
                                                <Span>RS: {student.registerStudent}</Span>
                                            </ProfileInfo>
                                        </Pro>
                                        <DivButtomEdit>
                                            <Btt02 onClick={Edit}>Editar</Btt02>
                                        </DivButtomEdit>
                                    </EmployeeInfo>
                                </Emp>
                            ))
                        }

                        {
                            Clss.map(clss => (
                                <Emp key={clss._id} >
                                    <Span>Turma: {clss.serie}</Span>
                                    <Span>Nivel: {clss.level}</Span>
                                    <Span>Turno: {clss.shift}</Span>
                                    <Span>Ano: {clss.year}</Span>
                                </Emp>
                            ))
                        }
                        <Calendar />
                    </ContainerDivs>
                    {positionAtSchool === "DIRETOR/SUPERVISOR"
                        &&
                        <ButtonCancel>
                            <Btt01 onClick={() => { setRemoveStudent(true) }}>Remover Estudante</Btt01>
                        </ButtonCancel>
                    }
                    {removeStudent === true && (
                        <AddMatterSection>
                            <WarningBox>
                                {student.map(student => (
                                    <Span>Tem certeza que deseja remover {student.name}?</Span>
                                ))}
                            </WarningBox>
                            <ActionButtons>
                                <div>
                                    <ButtonRemove onClick={destroyStudent} >Remover</ButtonRemove>
                                    <Button onClick={() => { setRemoveStudent(false) }}>Cancelar</Button>
                                </div>
                            </ActionButtons>
                        </AddMatterSection>
                    )}
                </>
            }
        </Container>
    )
}

export default Student