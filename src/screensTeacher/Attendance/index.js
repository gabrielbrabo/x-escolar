import React, { useState, useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
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
    BoxButtonStatus,
    EmpEdit
} from './style';

import {
} from '../../components/Inputs'
import LoadingSpinner from '../../components/LoadingFrequence'

const IndexAttendance = () => {

    //const navigate = useNavigate()
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
    const [Student, setStudent] = useState(null); // Estado para aluno em edição
    const [Status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

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
                const resAtt = await GetAttendanceFinalized({ month, year, day, id_class: id_class.trim(), id_teacher: id_teacher.trim(), });
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

            setLoading(false);
        })();
    }, [day, id_teacher, month, year]);


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
        if (stdt.length > 0 && checked.length > 0) {
            alert('Chamada não finalizada por favor adicione a frequencia dos alunos que ainda faltam')
        } else {
            window.history.back()
        }
        setLoading(false)
    }
    const handleAttendance = async (stdt, status) => {
        try {
            setLoading(true);
            const id_student = stdt._id;
    
            // Dispara todas as requisições ao mesmo tempo
            const [resAttendance, resAtt, resClass] = await Promise.allSettled([
                Attendance(day, month, year, status, id_student, id_teacher, id_class),
                GetAttendanceFinalized({ month, year, day, id_class: id_class.trim(), id_teacher: id_teacher.trim() }),
                clssInfo(id_class)
            ]);
    
            // Verifica se a requisição de presença foi bem-sucedida
            if (resAttendance.status === "fulfilled" && resAttendance.value) {
                const checkedStudent = (resAtt.status === "fulfilled" && resAtt.value?.data?.data) ? resAtt.value.data.data : [];
                const classInfo = (resClass.status === "fulfilled" && resClass.value?.data?.data) ? resClass.value.data.data : [];
    
                if (!Array.isArray(checkedStudent) || !Array.isArray(classInfo)) {
                    throw new Error("Dados inválidos recebidos da API");
                }
    
                // Converte os alunos já chamados em um conjunto para busca rápida
                const attRealizedSet = new Set(checkedStudent.map(res => res.id_student?._id).filter(Boolean));
    
                // Filtra os alunos que ainda não foram chamados
                const student = classInfo.length > 0 
                    ? classInfo[0].id_student?.filter(studentId => studentId?._id && !attRealizedSet.has(studentId._id)) || []
                    : [];
    
                // Atualiza os estados de forma segura
                setStdt([...student]);
                setChecked([...checkedStudent]);
            }
        } catch (error) {
            console.error("Erro ao processar a presença:", error);
        } finally {
            setLoading(false);
        }
    };
    
    
    
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

    const handleDestroy = async (checkedStdt) => {
        setStudent(checkedStdt._id)
        setStatus(checkedStdt.status)
        setNamestudent(checkedStdt)
    };

    const Destroy = async () => {
        const idAttendance = Student
        console.log("checkedStdt", idAttendance)
        const res = await DestroyAttendance(idAttendance)
        if (res) {
            console.log("res", res)
            window.location.reload()
        }
    };

    console.log("selectedDate", selectedDate)
    //console.log("matter", id_matter)
    console.log("day", day)
    console.log("month", month)
    console.log("year", year)
    console.log("stdt", stdt)
    console.log("checked", checked)
    console.log("open", open)
    console.log("Status", Status)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    {
                    }
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
                        selectedDate && !editingStudent && !Student
                        && (
                            open === 'aberto' ? (
                                <ContainerStudent>
                                    <h2>Chamada</h2>
                                    <DataSelected>
                                        {/*<p>Disciplina: {Namematter}</p>*/}
                                        <p style={{ color: "#158fa2" }}>Data: {day}/{month}/{year}</p>
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
                                            stdt
                                                .sort((a, b) => a.name.localeCompare(b.name)) // Ordena em ordem alfabética
                                                .map(stdt => (
                                                    <Emp
                                                        /*onClick={() =>
                                                            classInformation(stdt)
                                                        }*/
                                                        key={stdt._id}
                                                    >
                                                        <Span>{stdt.name}</Span>
                                                        <BoxButton>
                                                            <Btt02 onClick={() => handlePresenceClick(stdt)} style={{ backgroundColor: 'green' }}>Presença</Btt02>
                                                            <Btt02 onClick={() => handleAbsenceClick(stdt)} style={{ backgroundColor: 'red' }}>Ausência</Btt02>
                                                        </BoxButton>
                                                    </Emp>
                                                ))
                                        }
                                    </List>
                                    <ListChecked>
                                        {checked
                                            .sort((a, b) => a.id_student.name.localeCompare(b.id_student.name)) // Ordena em ordem alfabética
                                            .map(checkedStdt => (
                                                <Emp key={checkedStdt._id}>
                                                    <SpanChecked>{checkedStdt.id_student.name}</SpanChecked>

                                                    <BoxButton>
                                                        <Btt02 style={{
                                                            backgroundColor: checkedStdt.status === 'P' ? 'green' : 'red'
                                                        }}>
                                                            {checkedStdt.status}
                                                        </Btt02>
                                                        <Btt02 onClick={() => handleDestroy(checkedStdt)} style={{ backgroundColor: 'blue' }}>
                                                            Apagar
                                                        </Btt02>
                                                        <Btt02 onClick={() => startEditing(checkedStdt)} style={{ backgroundColor: 'blue' }}>
                                                            Editar
                                                        </Btt02>
                                                    </BoxButton>
                                                </Emp>
                                            ))}
                                    </ListChecked>
                                    <Btt02 onClick={Finalyze}>
                                        Finalizar Chamada
                                    </Btt02>
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
                                onChange={(e) => setEditingStatus(e.target.value)}
                            >
                                <option value="P">Presença</option>
                                <option value="F">Ausência</option>
                            </select>
                            <BoxButtonEdit>
                                <Btt02 onClick={saveEdit}>Salvar</Btt02>
                                <Btt02 onClick={() => setEditingStudent(null)}>Cancelar</Btt02>
                            </BoxButtonEdit>

                        </EditContainer>
                    )}
                    {Student && (
                        <EditContainer>
                            <h3>Tem certeza que deseja apagar a frequencia do aluno</h3>
                            {console.log("editingStudent", namestudent.id_student.name)}

                            <EmpEdit>
                                <BoxButtonStatus>
                                    <SpanChecked>{namestudent.id_student.name}</SpanChecked>
                                    <Btt02 style={{
                                        backgroundColor: Status === 'P' ? 'green' : 'red'
                                    }}>
                                        {Status}
                                    </Btt02>
                                </BoxButtonStatus>
                            </EmpEdit>
                            <BoxButtonEdit>
                                <Btt02 onClick={Destroy}>Apagar</Btt02>
                                <Btt02 onClick={() => setStudent(null)}>Cancelar</Btt02>
                            </BoxButtonEdit>

                        </EditContainer>
                    )}
                </ContainerDivs>
            }
        </Container>
    )
}

export default IndexAttendance