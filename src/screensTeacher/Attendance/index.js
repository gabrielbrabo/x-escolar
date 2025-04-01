import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    clssInfo,
    GetAttendanceFinalized,
    Attendance,
    updateAttendance,
    DestroyAttendance,
    getIstQuarter,
    getIIndQuarter,
    getIIIrdQuarter,
    getIVthQuarter,
    //getVthQuarter,
    //getVIthQuarter,
} from '../../Api'

import SelectorDate from '../../components/SelectorOnDate'

import {
    Container,
    List,
    ListChecked,
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
    BoxButton,
    BoxButtonEdit,
    //BoxButtonStatus,
    //EmpEdit,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './style';

import {
} from '../../components/Inputs'
import LoadingSpinner from '../../components/LoadingFrequence'

import { SlActionUndo } from "react-icons/sl";

const IndexAttendance = () => {

    const navigate = useNavigate()
    //const [matter, setMatter] = useState([])
    //const [Namematter, setNameMatter] = useState([])
    const [open, setopen] = useState('aberto')
    //const [id_matter, setclickMatter] = useState([])
    const [id_class, setId_class] = useState([])
    const [id_teacher, setId_teacher] = useState('')
    const [stdt, setStdt] = useState([])
    const [checked, setChecked] = useState([])
    const [selectedDate, setSelectedDate] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [namestudent, setNamestudent] = useState('')
    const [editingStudent, setEditingStudent] = useState(null); // Estado para aluno em edição
    const [editingStatus, setEditingStatus] = useState('');
    //const [Student, setStudent] = useState(null); // Estado para aluno em edição
    //const [Status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const [excludedStudents, setExcludedStudents] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);
    const [RemoveAttendanceList, setRemoveAttendanceList] = useState([]);

    const [RegentTeacher, setclassRegentTeacher] = useState([]);
    const [RegentTeacher02, setclassRegentTeacher02] = useState([]);
    const [physicalEducation, setphysicalEducationTeacher] = useState([]);


    useEffect(() => {
        (async () => {
            setLoading(true);
            const idTeacher = JSON.parse(localStorage.getItem("Id_employee") || '""'); // Remove aspas extras
            setId_teacher(idTeacher);
            const id_class = sessionStorage.getItem("class-info");
            //const Matter = sessionStorage.getItem("attendance_ idmatter");
            const selectedDate = sessionStorage.getItem("selectedDate");

            //const res = await GetInfoMyClass(id_class, JSON.parse(id_teacher));

            /*if (Matter) {
                setclickMatter(Matter);
            }*/
            if (selectedDate) {

                const Day = sessionStorage.getItem("day");
                const Month = sessionStorage.getItem("month");
                const Year = sessionStorage.getItem("year");

                setSelectedDate(selectedDate);
                setDay(JSON.parse(Day));
                setMonth(JSON.parse(Month));
                setYear(JSON.parse(Year));

                const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
                const classRegentTeacher02 = sessionStorage.getItem("classRegentTeacher02");
                const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");

                setclassRegentTeacher(JSON.parse(classRegentTeacher))
                setclassRegentTeacher02(JSON.parse(classRegentTeacher02))
                setphysicalEducationTeacher(JSON.parse(physicalEducationTeacher))

            }

            // setId_teacher(idTeacher || "");
            setId_class(id_class);
            if (day && month && year && id_class && id_teacher) {

                console.log("Payload enviado para o backend:", {
                    month,
                    year,
                    day,
                    id_class,
                    id_teacher, // Deve ser string aqui
                });
                if (RegentTeacher02 === id_teacher) {
                    const resAtt = await GetAttendanceFinalized(month, year, day, id_class, RegentTeacher);
                    console.log("resAtt", resAtt)
                    const resClass = await clssInfo(id_class);
                    const attRealized = await resAtt.data.data.map(res => res.id_student._id);
                    const checkedStudent = await resAtt.data.data;
                    const student = await resClass.data.data.find(res => res).id_student
                        .filter(studentId => !attRealized.includes(studentId._id))
                        .sort((a, b) => a.name.localeCompare(b.name)); // Ordena `stdt` em ordem alfabética

                    setStdt(student);
                    setChecked(checkedStudent.sort((a, b) => a.id_student.name.localeCompare(b.id_student.name))); // Ordena `checked` em ordem alfabética

                } else {
                    const resAtt = await GetAttendanceFinalized(month, year, day, id_class, id_teacher);
                    console.log("resAtt", resAtt)
                    const resClass = await clssInfo(id_class);
                    const attRealized = await resAtt.data.data.map(res => res.id_student._id);
                    const checkedStudent = await resAtt.data.data;
                    const student = await resClass.data.data.find(res => res).id_student
                        .filter(studentId => !attRealized.includes(studentId._id))
                        .sort((a, b) => a.name.localeCompare(b.name)); // Ordena `stdt` em ordem alfabética

                    setStdt(student);
                    setChecked(checkedStudent.sort((a, b) => a.id_student.name.localeCompare(b.id_student.name))); // Ordena `checked` em ordem alfabética

                }
            }

            setLoading(false);
        })();
    }, [day, id_teacher, month, year, RegentTeacher, RegentTeacher02,]);

    // Exemplo de como inicializar todos os alunos com "presença"
    useEffect(() => {
        if (RegentTeacher === id_teacher) {
            const id_teacher02 = RegentTeacher02
            const initialAttendanceList = stdt.map(stdt => ({
                id_student: stdt._id,
                status: "P", // Marca todos os alunos como presença inicialmente
                day: day,
                month: month,
                year: year,
                id_teacher: id_teacher,
                id_teacher02: id_teacher02,
                id_class: id_class
            }));
            setAttendanceList(initialAttendanceList);
        } else if (RegentTeacher02 === id_teacher) {
            const id_teacher02 = RegentTeacher02
            const initialAttendanceList = stdt.map(stdt => ({
                id_student: stdt._id,
                status: "P", // Marca todos os alunos como presença inicialmente
                day: day,
                month: month,
                year: year,
                id_teacher: RegentTeacher,
                id_teacher02: id_teacher02,
                id_class: id_class
            }));
            setAttendanceList(initialAttendanceList);
        } else if (physicalEducation === id_teacher) {
            const id_teacher02 = null;
            const initialAttendanceList = stdt.map(stdt => ({
                id_student: stdt._id,
                status: "P", // Marca todos os alunos como presença inicialmente
                day: day,
                month: month,
                year: year,
                id_teacher: id_teacher,
                id_teacher02: id_teacher02,
                id_class: id_class
            }));
            setAttendanceList(initialAttendanceList);
        }
    }, [stdt,
        day,
        month,
        year,
        id_teacher,
        id_class,
        RegentTeacher,
        RegentTeacher02,
        physicalEducation
    ]); // Isso assume que você tem a lista de alunos em "students"

    if (selectedDate) {
        sessionStorage.setItem("selectedDate", selectedDate)
        sessionStorage.setItem("day", day)
        sessionStorage.setItem("month", month)
        sessionStorage.setItem("year", year)

        const fetchQuarters = async () => {
            const idSchool = sessionStorage.getItem("id-school");

            const dateSelected = new Date(year, month - 1, day);

            const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
            const IIndQuarter = await getIIndQuarter(year, JSON.parse(idSchool))
            const IIIrdQuarter = await getIIIrdQuarter(year, JSON.parse(idSchool))
            const IVthQuarter = await getIVthQuarter(year, JSON.parse(idSchool))
            //const VthQuarter = await getVthQuarter(year, JSON.parse(idSchool))
            //const VIthQuarter = await getVIthQuarter(year, JSON.parse(idSchool))
            const getQuarterStatus = (quarterData) => {
                return quarterData.data.data
                    .map((res) => {
                        const startDate = new Date(res.startyear, res.startmonth - 1, res.startday);
                        const endDate = new Date(res.endyear, res.endmonth - 1, res.endday);
                        if (dateSelected >= startDate && dateSelected <= endDate) {
                            return res.statusSupervisor;
                        }
                        return null;
                    })
                    .find((res) => res); // Retorna o primeiro status válido encontrado
            };

            const dataIstQuarter = getQuarterStatus(IstQuarter);
            const dataIIndQuarter = getQuarterStatus(IIndQuarter);
            const dataIIIrdQuarter = getQuarterStatus(IIIrdQuarter);
            const dataIVthQuarter = getQuarterStatus(IVthQuarter);

            // Retorna os dados encontrados em um objeto
            return {
                IstQuarter: dataIstQuarter || null,
                IIndQuarter: dataIIndQuarter || null,
                IIIrdQuarter: dataIIIrdQuarter || null,
                IVthQuarter: dataIVthQuarter || null,
            };
        };
        // Chamando a função e lidando com o resultado
        fetchQuarters().then((result) => {
            if (result.IstQuarter) {
                console.log("dataIstQuarter", result.IstQuarter);
                setopen(result.IstQuarter)
            }
            if (result.IIndQuarter) {
                console.log("dataIIndQuarter", result.IIndQuarter);
                setopen(result.IIndQuarter)
            }
            if (result.IIIrdQuarter) {
                console.log("dataIIIrdQuarter", result.IIIrdQuarter);
                setopen(result.IIIrdQuarter)
            }
            if (result.IVthQuarter) {
                console.log("dataIVthQuarter", result.IVthQuarter);
                setopen(result.IVthQuarter)
            }
        })
        fetchQuarters();
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

    const Finalyze = async () => {
        setLoading(true)
        const res = await Attendance(attendanceList)
        if (res) {
            console.log("resattendance", res)
            window.location.reload()
        } else {
            console.log("resattendance erro", res)
            window.location.reload()
        }
    }

    const handleCheckAttendance = (id_student, status) => {

        if (RegentTeacher === id_teacher) {
            setAttendanceList(prevList => {
                const id_teacher02 = RegentTeacher02
                const existing = prevList.find(att => att.id_student === id_student);

                // Se já existe um registro e clicou no mesmo status, remove a marcação
                if (existing?.status === status) {
                    return prevList.filter(att => att.id_student !== id_student);
                }

                // Atualiza a lista, garantindo que o aluno tenha apenas um status ativo
                return [
                    ...prevList.filter(att => att.id_student !== id_student),
                    { id_student, status, day, month, year, id_teacher, id_teacher02, id_class }
                ];
            })
        } else if (RegentTeacher02 === id_teacher) {
            setAttendanceList(prevList => {
                const id_teacher02 = RegentTeacher02
                const existing = prevList.find(att => att.id_student === id_student);

                // Se já existe um registro e clicou no mesmo status, remove a marcação
                if (existing?.status === status) {
                    return prevList.filter(att => att.id_student !== id_student);
                }

                // Atualiza a lista, garantindo que o aluno tenha apenas um status ativo
                return [
                    ...prevList.filter(att => att.id_student !== id_student),
                    { id_student, status, day, month, year, id_teacher: RegentTeacher, id_teacher02, id_class }
                ];
            })
        } else if (physicalEducation === id_teacher) {
            setAttendanceList(prevList => {
                const id_teacher02 = null;
                const existing = prevList.find(att => att.id_student === id_student);

                // Se já existe um registro e clicou no mesmo status, remove a marcação
                if (existing?.status === status) {
                    return prevList.filter(att => att.id_student !== id_student);
                }

                // Atualiza a lista, garantindo que o aluno tenha apenas um status ativo
                return [
                    ...prevList.filter(att => att.id_student !== id_student),
                    { id_student, status, day, month, year, id_teacher, id_teacher02, id_class }
                ];
            })
        }
    };

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

    const handleDestroy = (checked) => {
        const attendanceIds = checked.map(stdt => stdt._id); // Extrai somente os _id

        setRemoveAttendanceList(attendanceIds); // Armazena apenas os _id no estado
    };

    const Destroy = async () => {
        setLoading(true);
        const res = await DestroyAttendance(RemoveAttendanceList)
        if (res) {
            console.log("res", res)
            window.location.reload()
        }
    };

    const Return = () => {
        navigate(-1)
    };


    const allStudentsMarked = stdt.every(stdt =>
        attendanceList.some(att => att.id_student === stdt._id)
    );

    const normalizeString = (str) => {
        return str
            .normalize("NFD") // Separa caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/[^\w\s]/gi, "") // Remove pontuações
            .toUpperCase(); // Converte para maiúsculas
    };

    console.log("checked", checked)
    //console.log("RemoveAttendanceList", RemoveAttendanceList)
    console.log("attendanceList", attendanceList)
    //console.log("matter", id_matter)
    /*console.log("day", day)
    console.log("month", month)
    console.log("year", year)
    console.log("stdt", stdt)
    console.log("open", open)
    console.log("Status", Status)*/

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    {
                        !selectedDate
                        &&
                        <DivInfoDate>
                            <h3>Selecione a Data</h3>
                            <SelectorDate
                                setDay={setDay}
                                setMonth={setMonth}
                                setYear={setYear}
                                setSelectedDate={setSelectedDate}
                            />
                        </DivInfoDate>
                    }
                    {
                        selectedDate && !editingStudent && RemoveAttendanceList.length === 0
                        && (
                            open === 'aberto' ? (
                                <ContainerStudent>
                                    <h2>Chamada</h2>
                                    <DivButton>
                                        <SlActionUndo fontSize={'30px'} onClick={Return} />
                                        <Btt02 onClick={clickRemovedate}>
                                            Selecionar outra data
                                        </Btt02>
                                    </DivButton>
                                    <DataSelected>
                                        {/*<p>Disciplina: {Namematter}</p>*/}<p style={{ color: "#158fa2" }}>
                                            Data: {String(day).padStart(2, "0")}/{String(month).padStart(2, "0")}/{year}
                                        </p>

                                    </DataSelected>

                                    {stdt.length > 0 && RemoveAttendanceList.length === 0 &&
                                        <List>

                                            {
                                                stdt
                                                    .sort((a, b) => normalizeString(a.name).localeCompare(normalizeString(b.name))) // Ordena em ordem alfabética
                                                    .map(stdt => {
                                                        const attendance = attendanceList.find(att => att.id_student === stdt._id);
                                                        const isPresent = attendance?.status === "P";
                                                        const isAbsent = attendance?.status === "F";
                                                        const justifiedAbsence = attendance?.status === "FJ";

                                                        return (
                                                            <Emp key={stdt._id}>
                                                                <Span>{stdt.name}</Span>
                                                                <BoxButton>
                                                                    <div className='nota'>
                                                                        <label style={{ color: isPresent ? "green" : "black" }}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={isPresent}
                                                                                disabled={excludedStudents.includes(stdt._id)} // Desativa se marcado
                                                                                onChange={() => handleCheckAttendance(stdt._id, "P")}
                                                                            />
                                                                            Presença
                                                                        </label>
                                                                        <label style={{ color: isAbsent ? "red" : "black" }}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={isAbsent}
                                                                                disabled={excludedStudents.includes(stdt._id)} // Desativa se marcado                                                                
                                                                                onChange={() => handleCheckAttendance(stdt._id, "F")}
                                                                            />
                                                                            Falta
                                                                        </label>
                                                                    </div>
                                                                    <div className='nota'>
                                                                        {/* Checkbox para marcar alunos sem nota */}
                                                                        <label>Falta justificada</label>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={justifiedAbsence}
                                                                            disabled={excludedStudents.includes(stdt._id)} // Desativa se marcado                                                                
                                                                            onChange={() => {
                                                                                handleCheckAttendance(stdt._id, "FJ")

                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className='nota'>
                                                                        {/* Checkbox para marcar alunos sem nota */}
                                                                        <label>Não adicionar</label>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={excludedStudents.includes(stdt._id)}
                                                                            onChange={() => {
                                                                                setExcludedStudents((prev) =>
                                                                                    prev.includes(stdt._id)
                                                                                        ? prev.filter((id) => id !== stdt._id) // Remove da lista
                                                                                        : [...prev, stdt._id] // Adiciona à lista
                                                                                );
                                                                                handleCheckAttendance(stdt._id, "-")

                                                                            }}
                                                                        />
                                                                    </div>
                                                                </BoxButton>
                                                            </Emp>

                                                        );
                                                    })
                                            }
                                            <Btt02 onClick={Finalyze} disabled={!allStudentsMarked}>
                                                Finalizar Chamada
                                            </Btt02>
                                            {!allStudentsMarked && <p style={{ color: "red" }}>Todos os alunos devem ter um status antes de enviar.</p>}

                                        </List>
                                    }

                                    {checked.length > 0 && RemoveAttendanceList.length === 0 &&
                                        <ListChecked>
                                            {checked
                                                .sort((a, b) => normalizeString(a.id_student.name).localeCompare(normalizeString(b.id_student.name))) // Ordena em ordem alfabética
                                                .map(checkedStdt => (
                                                    <Emp key={checkedStdt._id}>
                                                        <SpanChecked>{checkedStdt.id_student.name}</SpanChecked>

                                                        <BoxButton>
                                                            <div className='check'>
                                                                <Btt02 style={{
                                                                    backgroundColor: checkedStdt.status === 'P' ? 'green' :
                                                                        checkedStdt.status === '-' ? 'black' :
                                                                        checkedStdt.status === 'FJ' ? '#158fa2' :
                                                                            'red'
                                                                }}>
                                                                    {checkedStdt.status}
                                                                </Btt02>

                                                                <Btt02 onClick={() => startEditing(checkedStdt)} style={{ backgroundColor: 'blue' }}>
                                                                    Editar
                                                                </Btt02>
                                                            </div>
                                                        </BoxButton>
                                                    </Emp>
                                                ))}
                                            <Btt02 onClick={() => handleDestroy(checked)}>
                                                Apagar Chamada
                                            </Btt02>
                                        </ListChecked>
                                    }
                                    <ToGoBack onClick={Return}>
                                        <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                                        <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                                    </ToGoBack>
                                </ContainerStudent>
                            ) : (
                                <>
                                    <h3> Bimestre fechado, para editar contate o Diretor ou Supervisor.</h3>

                                    <DivButton>
                                        {/* <Btt02 onClick={clickRemovematter}>
                                    Selecionar outra materia
                                </Btt02>*/}
                                        <Btt02 onClick={clickRemovedate}>
                                            Selecionar outra data
                                        </Btt02>
                                    </DivButton>
                                </>
                            )
                        )}
                    {editingStudent && (
                        <EditContainer>
                            <h3>Editando Frequencia de {namestudent.id_student.name}</h3>
                            {console.log("editingStudent", namestudent.id_student.name)}
                            <select
                                value={editingStatus}
                                disabled={excludedStudents.includes(stdt._id)} // Desativa se marcado
                                onChange={(e) => setEditingStatus(e.target.value)}
                            >
                                <option value="P">Presença</option>
                                <option value="F">Falta</option>
                                <option value="FJ">Falta justificada</option>
                            </select>
                            <div className='nota'>
                                {/* Checkbox para marcar alunos sem nota */}
                                <label>Não adicionar</label>
                                <input
                                    type="checkbox"
                                    checked={excludedStudents.includes(stdt._id)}
                                    onChange={() => {
                                        setExcludedStudents((prev) =>
                                            prev.includes(stdt._id)
                                                ? prev.filter((id) => id !== stdt._id) // Remove da lista
                                                : [...prev, stdt._id] // Adiciona à lista
                                        );
                                        setEditingStatus('-')

                                    }}
                                />
                            </div>
                            <BoxButtonEdit>
                                <Btt02 onClick={saveEdit}>Salvar</Btt02>
                                <Btt02 onClick={() => setEditingStudent(null)}>Cancelar</Btt02>
                            </BoxButtonEdit>

                        </EditContainer>
                    )}
                    {RemoveAttendanceList.length > 0 && (
                        <EditContainer>
                            <h3>Tem certeza que deseja apagar a chamada</h3>
                            <BoxButtonEdit>
                                <Btt02 onClick={Destroy}>Apagar</Btt02>
                                <Btt02 onClick={() => setRemoveAttendanceList([])}>Cancelar</Btt02>
                            </BoxButtonEdit>

                        </EditContainer>
                    )}
                </ContainerDivs>
            }
        </Container>
    )
}

export default IndexAttendance
