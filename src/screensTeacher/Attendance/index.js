import React, { useState, useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
import { GetInfoMyClass, clssInfo, GetAttendanceFinalized, Attendance, updateAttendance } from '../../Api'
import SelectorDate from '../../components/SelectorOnDate'

import {
    Container,
    List,
    Emp,
    Matter,
    DivInfo,
    Span,
    //Search,
    //DivNewEmp,
    DivAddEmp,
    User,
    //AddEmp,
    //FormFilter,
    //FormSearch
    // Input
} from './style';

import {
    //AreaEmp,
    //InputEmp,
    // Select
} from '../../components/Inputs'

import {
    Btt02,
} from '../../components/Buttons';

const Student = () => {

    //const navigate = useNavigate()
    const [matter, setMatter] = useState([])
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

    useEffect(() => {
        (async () => {
            const id_teacher = sessionStorage.getItem("Id_employee")
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
            setMatter(res.data.data)
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
        })()

    }, [day, id_matter, month, year])
    if (selectedDate) {
        sessionStorage.setItem("selectedDate", selectedDate)
        sessionStorage.setItem("day", day)
        sessionStorage.setItem("month", month)
        sessionStorage.setItem("year", year)
    }
    /*const getAttendance = () => {
        const res = GetAttendanceFinalized( month, year, day, id_class, id_matter )
        console.log("res", res)
    }*/
    const clickRemovedate = () => {
        sessionStorage.removeItem("selectedDate")
        sessionStorage.removeItem("day")
        sessionStorage.removeItem("month")
        sessionStorage.removeItem("year")

        setSelectedDate('')
        setDay('')
        setMonth('')
        setYear('')
    }
    const clickRemovematter = () => {
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
    }
    const click_idMatter = (employee) => {
        sessionStorage.removeItem("attendance_ idmatter")
        sessionStorage.setItem("attendance_ idmatter", employee.id_matter)
        setclickMatter([])
        setclickMatter(employee.id_matter)
    }
    const Finalyze = () => {
        window.history.back()
    }
    const Presence = async (stdt) => {
        //const id_teacher = sessionStorage.getItem("Id_employee")
        const status = 'p'
        const id_student = stdt._id
        const res = await Attendance(day, month, year, status, id_student, JSON.parse(id_teacher), id_class, id_matter)
        console.log('chamada', res)
        if (res) {
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
        }
    }
    const Absence = async (stdt) => {
        //const id_teacher = sessionStorage.getItem("Id_employee")
        const status = 'f'
        const id_student = stdt._id
        const res = await Attendance(day, month, year, status, id_student, JSON.parse(id_teacher), id_class, id_matter)
        console.log('chamada', res)
        if (res) {
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
        }
    }
    const startEditing = (checkedStdt) => {
        setEditingStudent(checkedStdt._id);
        setEditingStatus(checkedStdt.status);
        setNamestudent(checkedStdt)
    };
    const saveEdit = async () => {
        const update = await updateAttendance(editingStudent, editingStatus)
        //await handleAttendance(editingStudent, editingStatus);
        //setEditingStudent(null);
        //setEditingStatus('');
        console.log("edit", update)
        window.location.reload()
    };
    console.log("selectedDate", selectedDate)
    console.log("matter", id_matter)
    console.log("day", day)
    console.log("month", month)
    console.log("year", year)
    console.log("checked", checked)

    return (
        <Container>
            <User>

            </User>
            {
                id_matter.length <= 0
                &&
                <DivInfo>
                    <DivAddEmp>
                    </DivAddEmp>
                    <Emp>Materias em que da aula nessa Turma:</Emp>
                    <Matter>

                        {
                            matter.map(employee => (
                                <div onClick={() => click_idMatter(employee)} key={employee._id}>
                                    <Span>{employee.name_matter}</Span>
                                </div>
                            ))
                        }
                    </Matter>
                </DivInfo>
            }
            {
                !selectedDate && id_matter.length > 0
                &&
                <DivInfo>
                    <SelectorDate
                        setDay={setDay}
                        setMonth={setMonth}
                        setYear={setYear}
                        setSelectedDate={setSelectedDate}
                    />
                </DivInfo>
            }
            {
                selectedDate && !editingStudent
                &&
                <div>
                    <Btt02 onClick={clickRemovematter}>
                        Selecionar outra materia
                    </Btt02>
                    <Btt02 onClick={clickRemovedate}>
                        Selecionar outra data
                    </Btt02>
                    {/*<Search>
                            <FormSearch>
                                <label>Buscar Turma</label>
                                <AreaEmp>
                                    <InputEmp
                                        type="text"
                                        placeholder='Buscar por nome'
                                        value={busca}
                                        onChange={
                                            (e) => setBusca(e.target.value)
                                        }
                                    />
                                </AreaEmp>
                            </FormSearch>
                        </Search>*/}
                    <List>

                        {
                            stdt/*.filter((val) => {
                                    if (!busca) {
                                        return (val)
                                    } else if (val.name.includes(busca.toUpperCase())) {
                                        return (val)
                                    }
                                    return null
                                })*/.map(stdt => (
                                <Emp
                                    /*onClick={() =>
                                        classInformation(stdt)
                                    }*/
                                    key={stdt._id}
                                >
                                    <Span>{stdt.name}</Span>
                                    <Btt02 onClick={() => Presence(stdt)}>Presença</Btt02>
                                    <Btt02 onClick={() => Absence(stdt)}>Falta</Btt02>
                                </Emp>
                            ))
                        }
                    </List>
                    <List>

                        {
                            checked/*.filter((val) => {
                                    if (!busca) {
                                        return (val)
                                    } else if (val.name.includes(busca.toUpperCase())) {
                                        return (val)
                                    }
                                    return null
                                })*/.map(checkedStdt => (
                                <Emp
                                    /*onClick={() =>
                                        classInformation(stdt)
                                    }*/
                                    key={checkedStdt._id}
                                >
                                    <Span>{checkedStdt.id_student.name}
                                        <Btt02 style={{
                                            backgroundColor: checkedStdt.status === 'P' ? 'green' : 'red'
                                        }}>
                                            {checkedStdt.status}
                                        </Btt02>
                                    </Span>
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
                </div>
            }
            {editingStudent && (
                <div>
                    <h3>Editando: {namestudent.id_student.name}</h3>
                    {console.log("editingStudent", namestudent.id_student.name)}
                    <select
                        value={editingStatus}
                        onChange={(e) => setEditingStatus(e.target.value)}
                    >
                        <option value="P">Presença</option>
                        <option value="F">Falta</option>
                    </select>
                    <Btt02 onClick={saveEdit}>Salvar</Btt02>
                    <Btt02 onClick={() => setEditingStudent(null)}>Cancelar</Btt02>
                </div>
            )}
        </Container>
    )
}

export default Student