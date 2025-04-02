import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    StdtInfo,
    //DestroyStudent,
    getIstQuarter,
    getIIndQuarter,
    getIIIrdQuarter,
    getIVthQuarter,
    getVthQuarter,
    getVIthQuarter,
    updateStatus
} from '../../Api'
import Calendar from '../../components/CalendarUI/Calendar'

import {
    Container,
    //List,
    Emp,
    Span,
    ContainerDivs,
    Pro,
    //ProfilePhoto,
    ProfileInfo,
    EmployeeInfo,
    DivButtomEdit,
    Btt02,
    Btt01,
    ButtonCancel,
    //AddMatterSection,
    //WarningBox,
    Button,
    //ButtonRemove,
    //ActionButtons,
    //FormFilter,
    //FormSearch
    Input,
    Label,
    Select,
    ErrorMessage,
    ContainerCalendar,
    TableRow,
    //TableCell,
    Chip,
    //MenuItem,
    //TableBody,
    ModalOverlay,
    ModalContent,
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
//import { DatePicker } from "@mui/x-date-pickers";
//import dayjs from "dayjs";

const Student = () => {

    const navigate = useNavigate()
    const [assessmentFormat, setassessmentFormat] = useState('');
    const currentYear = new Date().getFullYear().toString();
    const [I, setI] = useState([])
    const [II, setII] = useState([])
    const [III, setIII] = useState([])
    const [IV, setIV] = useState([])
    const [V, setV] = useState([])
    const [VI, setVI] = useState([])
    //const [year, setYear] = useState([])
    const [Clss, setClss] = useState([])
    const [student, setStudent] = useState([])
    const [Selectbimonthly, setSelectbimonthly] = useState([])
    const [bimonthly, setbimonthly] = useState([])
    const [Regent, setRegent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [removeStudent, setRemoveStudent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [positionAtSchool, setPositionAtSchool] = useState('');

    const [selectedStatus, setSelectedStatus] = useState({});
    const [exitDate, setExitDate] = useState(null);

    const { id_student } = useParams()
    console.log(currentYear)

    useEffect(() => {
        (async () => {
            setLoading(true);

            const idSchool = sessionStorage.getItem("id-school");
            const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
            setassessmentFormat($assessmentFormat)
            // const id_student = sessionStorage.getItem("StudentInformation");
            const year = new Date().getFullYear();
            console.log("idSchool", idSchool)
            console.log("idStudent", id_student)

            if (!idSchool || !id_student) {
                console.error("Dados faltando: idSchool ou id_student");
                return;
            }

            const position = localStorage.getItem('position_at_school');
            setPositionAtSchool(position);
            //sessionStorage.removeItem('StudentInformation')
            sessionStorage.setItem("StudentInformation", id_student)
            const res = await StdtInfo(id_student)
            if (res && res.data) {
                setStudent(res.data.data);
            } else {
                console.error("Resposta inesperada da API:", res);
            }


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
            console.log("clss", clss)
            setClss(clss)
            const regent = clss.map(res => {
                return res.classRegentTeacher
            })
            console.log('regent', regent)
            if (regent.length > 0) {
                sessionStorage.setItem("RegentTeacher", regent)
                setRegent(true)
            }


            const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
            console.log("IstQuarter", IstQuarter)
            const IIndQuarter = await getIIndQuarter(year, JSON.parse(idSchool))
            const IIIrdQuarter = await getIIIrdQuarter(year, JSON.parse(idSchool))
            const IVthQuarter = await getIVthQuarter(year, JSON.parse(idSchool))
            const VthQuarter = await getVthQuarter(year, JSON.parse(idSchool))
            const VIthQuarter = await getVIthQuarter(year, JSON.parse(idSchool))

            const i = IstQuarter.data.data.find(res => res) || null;
            const ii = IIndQuarter.data.data.find(res => res) || null;
            const iii = IIIrdQuarter.data.data.find(res => res) || null;
            const iv = IVthQuarter.data.data.find(res => res) || null;
            const v = VthQuarter.data.data.find(res => res) || null;
            const vi = VIthQuarter.data.data.find(res => res) || null;

            //const res = await GetMatter(JSON.parse(idSchool));

            setbimonthly([i, ii, iii, iv, v, vi].filter(res => res !== null));

            if (i !== null) {
                setI(i._id);
            }
            if (ii !== null) {
                setII(ii._id);
            }
            if (iii !== null) {
                setIII(iii._id);
            }
            if (iv !== null) {
                setIV(iv._id);
            }
            if (v !== null) {
                setV(v._id);
            }
            if (vi !== null) {
                setVI(vi._id);
            }

            setLoading(false);
        })()
        setLoading(false);
    }, [currentYear, id_student])

    if (student) {
        const stdt = student.map(res => {
            return res.name
        })
        sessionStorage.setItem("stdt-name", stdt)
    }

    const Edit = async () => {
        navigate('/edit-student')
    }

    /*const destroyStudent = async () => {
        const idStudent = sessionStorage.getItem("StudentInformation")
        const res = await DestroyStudent(idStudent)
        if (res) {
            alert('Aluno removido com sucesso!')
            navigate(-1);
        }
    }*/

    const signClick = async () => {
        setLoading(true);

        if (Selectbimonthly === I) {
            sessionStorage.setItem("id-I", I)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate('/ist-numerical-grade-card')
            } else {
                navigate('/ist-quarter-report-card')
            }
        } else if (Selectbimonthly === II) {
            sessionStorage.setItem("id-II", II)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate('/iind-numerical-grade-card')
            } else {
                navigate('/iind-quarter-report-card')
            }
        } else if (Selectbimonthly === III) {
            sessionStorage.setItem("id-III", III)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate('/iiird-numerical-grade-card')
            } else {
                navigate('/iiird-quarter-report-card')
            }
        } else if (Selectbimonthly === IV) {
            sessionStorage.setItem("id-IV", IV)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate('/ivth-numerical-grade-card')
            } else {
                navigate('/ivth-quarter-report-card')
            }
        } else if (Selectbimonthly === V) {
            sessionStorage.setItem("id-V", V)
            navigate('/vth-quarter-report-card')
        } else if (Selectbimonthly === VI) {
            sessionStorage.setItem("id-VI", VI)
            navigate('/vith-quarter-report-card')
        } else if (Selectbimonthly === 'FinalConcepts') {
            console.log("boletim final", Selectbimonthly)
            //sessionStorage.setItem("id-VI", VI)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate('/final-numerical-grade-card')
            } else {
                navigate('/final-concepts-report-card')
            }
        } else {
            setErrorMessage('Erro, Verifique os dados e tente novamente.');
        }
        setLoading(false);
    };

    const upStatus = async () => {
        setLoading(true)
        try {
            const { data } = await updateStatus({
                id_student: selectedStatus.id_student,
                status: selectedStatus.value,
                exitDate: exitDate || null,
            });

            console.log("Status atualizado com sucesso!", data);

            window.location.reload()

        } catch (error) {
            console.error("Erro ao atualizar status:", error.response?.data || error.message);
            throw error; // Repassa o erro para tratamento externo
        }
    };

    const handleChangeStatus = (id, value) => {
        setSelectedStatus({ id_student: id, value: value });
    };


    console.log("clas", Clss)
    console.log("Selectbimonthly", Selectbimonthly)
    console.log("student", student)
    console.log("selectedStatus", selectedStatus)
    console.log("exitDate", exitDate)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    {removeStudent === false &&
                        <ContainerDivs>
                            {
                                student.map(student => (
                                    <Emp key={student._id} >
                                        <EmployeeInfo>
                                            <Pro>
                                                {/*<ProfilePhoto>

                                            </ProfilePhoto>*/}
                                                < ProfileInfo>
                                                    <Span>{student.name}</Span>
                                                    {/*<Span>RG: {student.rg}</Span>*/}
                                                    <Span>Nascimento: {new Date(student.dateOfBirth + "T00:00:00").toLocaleDateString('pt-BR')}</Span>
                                                    <Span>Sexo: {student.sex}</Span>
                                                    <Span>Cor: {student.race}</Span>
                                                    <Span>Nome da Mãe: {student.motherName}</Span>
                                                    <Span>celular da Mãe: {student.motherCellPhone}</Span>
                                                    <Span>Nome do Pai: {student.fatherName}</Span>
                                                    <Span>celular do Pai: {student.fatherCellPhone}</Span>
                                                    <Span>Endereço: {student.address}</Span>
                                                    <Span>RS: {student.registerStudent}</Span>
                                                    {student.admissionDate ? (
                                                        <Span>Data de Admissão: {new Date(student.admissionDate + "T00:00:00").toLocaleDateString('pt-BR')}</Span>
                                                    ) : (
                                                        <Span></Span>
                                                    )}
                                                    <Span style={{ color: "green" }}>Data de Ingresso na Escola: {new Date(student.entryDate + "T00:00:00").toLocaleDateString('pt-BR')}</Span>
                                                    {student.departureDate ? (
                                                        <Span style={{ color: "red" }}>Data de Saida: {new Date(student.departureDate + "T00:00:00").toLocaleDateString('pt-BR')}</Span>
                                                    ) : (
                                                        <Span></Span>
                                                    )}
                                                </ProfileInfo>
                                            </Pro>
                                            {(positionAtSchool === "DIRETOR/SUPERVISOR" || positionAtSchool === "SECRETARIO") &&
                                                <DivButtomEdit>
                                                    <Btt02 onClick={Edit}>Editar</Btt02>
                                                </DivButtomEdit>
                                            }
                                        </EmployeeInfo>
                                    </Emp>
                                ))
                            }

                            {Clss &&
                                Clss.map(clss => (
                                    <Emp key={clss._id} >
                                        <Span>Turma: {clss.serie}</Span>
                                        {/*<Span>Nivel: {clss.level}</Span>*/}
                                        <Span>Turno: {clss.shift}</Span>
                                        <Span>Ano: {clss.year}</Span>
                                    </Emp>
                                ))
                            }
                            <Input>
                                <h3>Boletim</h3>
                                <Label>Selecione o bimestre e click no botão abaixo.</Label>
                                <Select
                                    id="id-bimonthly"
                                    value={Selectbimonthly}
                                    onChange={(e) => setSelectbimonthly(e.target.value)}
                                >
                                    <option value="">Selecione</option>
                                    {bimonthly.map(res => (
                                        <option key={res._id} value={res._id}>{res.bimonthly}</option>
                                    ))
                                    },

                                    <option value="FinalConcepts">Resultado Final</option>
                                </Select>
                                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                <Button onClick={signClick}>Ver boletim</Button>
                            </Input>
                            {Regent &&
                                <ContainerCalendar>
                                    <Calendar />
                                </ContainerCalendar>
                            }
                        </ContainerDivs>
                    }
                    {(positionAtSchool === "DIRETOR/SUPERVISOR" || positionAtSchool === "SECRETARIO") && removeStudent === false &&
                        <ButtonCancel>
                            <Btt01 onClick={() => { setRemoveStudent(true) }}>Alterar Status</Btt01>
                        </ButtonCancel>
                    }

                    {removeStudent === true && (

                        <ModalOverlay>
                            <ModalContent>
                                {student.map((student) => (
                                    <TableRow key={student._id}>
                                        <h3>Alterar Status do Aluno</h3>
                                        <p>{student.name}</p>
                                        <Chip color={student.status}>{student.status}</Chip>
                                        <label>Novo Status: </label>
                                        <Select
                                            value={selectedStatus.status}
                                            onChange={(e) => {
                                                handleChangeStatus(student._id, e.target.value)
                                                setExitDate(e.target.value === "transferido" || e.target.value === "inativo" ? new Date().toISOString().split('T')[0] : null);

                                            }}
                                        >
                                            <option value="">Selecione</option>
                                            {student.status !== "ativo" && <option value="ativo">Ativar</option>}
                                            {student.status !== "transferido" && <option value="transferido">Transferir</option>}
                                            {student.status !== "inativo" && <option value="inativo">Inativar</option>}
                                        </Select>

                                        {selectedStatus.value === "transferido" && (
                                            <p style={{ color: "red", fontWeight: "bold" }}>
                                                ⚠ Se o aluno for transferido, ele será removido da turma atual!
                                            </p>
                                        )}

                                        {(selectedStatus.value === "transferido" || selectedStatus.value === "inativo") && (
                                            <div>
                                                <label>Data de Saída: </label>
                                                <input
                                                    type="date"
                                                    value={exitDate}
                                                    onChange={(e) => setExitDate(e.target.value)}
                                                    min="1900-01-01"
                                                    max={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                        )}

                                        <div>
                                            <Button onClick={() => upStatus()}>Salvar</Button>
                                            <Button onClick={() => setRemoveStudent(false)}>Cancelar</Button>
                                        </div>
                                    </TableRow>
                                ))}
                            </ModalContent>
                        </ModalOverlay>
                    )}
                </>
            }
        </Container>
    )
}

export default Student