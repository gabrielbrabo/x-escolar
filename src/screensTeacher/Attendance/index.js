import React, { useState, useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
import { GetInfoMyClass, clssInfo, GetAttendanceFinalized, Attendance, updateAttendance } from '../../Api'
import SelectorDate from '../../components/SelectorOnDate'

import {
    Container,
    List,
    Emp,
    //Matter,
    //DivInfo,
    Span,
    ContainerDivs,
    Btt02,
    DivInfoDate,
    ContainerStudent,
    DivButton,
    EditContainer,
    SpanChecked,
    DataSelected,
} from './style';

import {
} from '../../components/Inputs'
import LoadingSpinner from '../../components/Loading'

const IndexAttendance = () => {

    //const navigate = useNavigate()
    //const [matter, setMatter] = useState([])
    //const [Namematter, setNameMatter] = useState([])
    const [id_matter, setclickMatter] = useState([])
    const [id_class, setId_class] = useState([])
    const [id_teacher, setId_teacher] = useState([])
    const [stdt, setStdt] = useState([])
    const [checked, setChecked] = useState([])
    const [selectedDate, setSelectedDate] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [namestudent, setNamestudent] = useState('')
    const [editingStudent, setEditingStudent] = useState(null); // Estado para aluno em edição
    const [editingStatus, setEditingStatus] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_teacher = localStorage.getItem("Id_employee")
            const id_class = sessionStorage.getItem("class-info")
            const Matter = sessionStorage.getItem("attendance_ idmatter")
            const selectedDate = sessionStorage.getItem("selectedDate")
            const Day = sessionStorage.getItem("day")
            const Month = sessionStorage.getItem("month")
            const Year = sessionStorage.getItem("year")
            const res = await GetInfoMyClass(id_class, JSON.parse(id_teacher))
            if (Matter) {
                setclickMatter(Matter)
            }
            if (selectedDate) {
                setSelectedDate(selectedDate)
                setDay(JSON.parse(Day))
                setMonth(JSON.parse(Month))
                setYear(JSON.parse(Year))
            }
            setId_teacher(id_teacher)
            setId_class(id_class)
           // setMatter(res.data.data)
            if (day && month && year && id_class && id_matter) {
                const resAtt = await GetAttendanceFinalized(month, year, day, id_class, id_matter)
                const resClass = await clssInfo(id_class)
                const attRealized = await resAtt.data.data.map(res => {
                    return res.id_student._id
                })
                const checkedStudent = await resAtt.data.data.map(res => {
                    return res
                })
                const student = await resClass.data.data.find(res => {
                    return res
                }).id_student.map(res => {
                    return res
                }).filter(studentId => {
                    if (!attRealized.includes(studentId._id)) {
                        return studentId
                    }
                    return null
                })
                setStdt(student)
                setChecked(checkedStudent)
                console.log('materia de chamada', res.data.data)
                console.log('student', student)
                console.log("attRealized", attRealized)
            }
            setLoading(false);
        })()

    }, [day, id_matter, month, year])
    if (selectedDate) {
        sessionStorage.setItem("selectedDate", selectedDate)
        sessionStorage.setItem("day", day)
        sessionStorage.setItem("month", month)
        sessionStorage.setItem("year", year)
    }
    const clickRemovedate = () => {
        setLoading(true)
        sessionStorage.removeItem("selectedDate")
        sessionStorage.removeItem("day")
        sessionStorage.removeItem("month")
        sessionStorage.removeItem("year")

        setSelectedDate('')
        setDay('')
        setMonth('')
        setYear('')
        setLoading(false)
    }
    /*const clickRemovematter = () => {
        setLoading(true)
        sessionStorage.removeItem("attendance_ idmatter")
        sessionStorage.removeItem("selectedDate")
        sessionStorage.removeItem("day")
        sessionStorage.removeItem("month")
        sessionStorage.removeItem("year")

        setclickMatter([])
        setSelectedDate('')
        setDay('')
        setMonth('')
        setYear('')
        setLoading(false)
    }*/
    /*const click_idMatter = (matter) => {
        setLoading(true)
        sessionStorage.removeItem("attendance_ idmatter")
        sessionStorage.setItem("attendance_ idmatter", matter.id_matter)
        setclickMatter([])
        setclickMatter(matter.id_matter)
        setNameMatter(matter.name_matter)
        setLoading(false)
    }*/
    const Finalyze = () => {
        setLoading(true)
        window.history.back()
    }
    const handleAttendance = async (stdt, status) => {
        setLoading(true)
        const id_student = stdt._id
        const res = await Attendance(day, month, year, status, id_student, JSON.parse(id_teacher), id_class,)
        console.log('chamada', res)
        if (res) {
            const resAtt = await GetAttendanceFinalized(month, year, day, id_class)
            const resClass = await clssInfo(id_class)
            const attRealized = await resAtt.data.data.map(res => {
                return res.id_student._id
            })
            const checkedStudent = await resAtt.data.data.map(res => {
                return res
            })
            const student = await resClass.data.data.find(res => {
                return res
            }).id_student.map(res => {
                return res
            }).filter(studentId => {
                if (!attRealized.includes(studentId._id)) {
                    return studentId
                }
                return null
            })
            setStdt(student)
            setChecked(checkedStudent)
        }
        setLoading(false)
    }
    const handlePresenceClick = (stdt) => handleAttendance(stdt, 'p');
    const handleAbsenceClick = (stdt) => handleAttendance(stdt, 'f');
    const startEditing = (checkedStdt) => {
        setEditingStudent(checkedStdt._id);
        setEditingStatus(checkedStdt.status);
        setNamestudent(checkedStdt)
    };
    const saveEdit = async () => {
        setLoading(true)
        await updateAttendance(editingStudent, editingStatus)
        window.location.reload()
        //setLoading(false)
    };
    console.log("selectedDate", selectedDate)
    console.log("matter", id_matter)
    console.log("day", day)
    console.log("month", month)
    console.log("year", year)
    console.log("checked", checked)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    {
                        /*id_matter.length <= 0
                        &&
                        <DivInfo>
                            <h3>Selecione uma Disciplina</h3>
                            <Matter>

                                {
                                    matter.map(matter => (
                                        <div onClick={() => click_idMatter(matter)} key={matter._id}>
                                            <Span>{matter.name_matter}</Span>
                                        </div>
                                    ))
                                }
                            </Matter>
                        </DivInfo>*/
                    }
                    {
                        !selectedDate 
                        &&
                        <DivInfoDate>
                            <h3>Selecione uma Data</h3>
                            <SelectorDate
                                setDay={setDay}
                                setMonth={setMonth}
                                setYear={setYear}
                                setSelectedDate={setSelectedDate}
                            />
                        </DivInfoDate>
                    }
                    {
                        selectedDate && !editingStudent
                        &&
                        <ContainerStudent>
                            <h2>Chamada</h2>
                            <DataSelected>
                                {/*<p>Disciplina: {Namematter}</p>*/}
                                <p>Data: {day}/{month}/{year}</p>
                            </DataSelected>
                            <DivButton>
                               {/* <Btt02 onClick={clickRemovematter}>
                                    Selecionar outra materia
                                </Btt02>*/}
                                <Btt02 onClick={clickRemovedate}>
                                    Selecionar outra data
                                </Btt02>
                            </DivButton>
                            <List>

                                {
                                    stdt.map(stdt => (
                                        <Emp
                                            /*onClick={() =>
                                                classInformation(stdt)
                                            }*/
                                            key={stdt._id}
                                        >
                                            <Span>{stdt.name}</Span>
                                            <Btt02 onClick={() => handlePresenceClick(stdt)} style={{ backgroundColor: 'green' }}>Presença</Btt02>
                                            <Btt02 onClick={() => handleAbsenceClick(stdt)} style={{ backgroundColor: 'red' }}>Ausência</Btt02>
                                        </Emp>
                                    ))
                                }
                            </List>
                            <List>
                                {
                                    checked.map(checkedStdt => (
                                        <Emp
                                            key={checkedStdt._id}
                                        >
                                            <SpanChecked>{checkedStdt.id_student.name}
                                                <Btt02 style={{
                                                    backgroundColor: checkedStdt.status === 'P' ? 'green' : 'red'
                                                }}>
                                                    {checkedStdt.status}
                                                </Btt02>
                                            </SpanChecked>
                                            <Btt02 onClick={() => startEditing(checkedStdt)} style={{
                                                backgroundColor: 'blue'
                                            }}
                                            >
                                                Editar
                                            </Btt02>
                                        </Emp>
                                    ))
                                }
                            </List>
                            <Btt02 onClick={Finalyze}>
                                Finalizar Chamada
                            </Btt02>
                        </ContainerStudent>
                    }
                    {editingStudent && (
                        <EditContainer>
                            <h3>Editando: {namestudent.id_student.name}</h3>
                            {console.log("editingStudent", namestudent.id_student.name)}
                            <select
                                value={editingStatus}
                                onChange={(e) => setEditingStatus(e.target.value)}
                            >
                                <option value="P">Presença</option>
                                <option value="F">Ausência</option>
                            </select>
                            <Btt02 onClick={saveEdit}>Salvar</Btt02>
                            <Btt02 onClick={() => setEditingStudent(null)}>Cancelar</Btt02>
                        </EditContainer>
                    )}
                </ContainerDivs>
            }
        </Container>
    )
}

export default IndexAttendance