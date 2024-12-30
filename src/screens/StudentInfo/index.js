import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    StdtInfo,
    DestroyStudent,
    getIstQuarter,
    getIIndQuarter,
    getIIIrdQuarter,
    getIVthQuarter,
    getVthQuarter,
    getVIthQuarter,
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
    AddMatterSection,
    WarningBox,
    Button,
    ButtonRemove,
    ActionButtons,
    //FormFilter,
    //FormSearch
    Input,
    Label,
    Select,
    ErrorMessage,
    ContainerCalendar
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
    const [positionAtSchool, setPositionAtSchool] = useState(null);
    const [loading, setLoading] = useState(false);
    const [removeStudent, setRemoveStudent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id_student } = useParams()
    console.log(currentYear)

    useEffect(() => {
        (async () => {
            setLoading(true);

            const idSchool = sessionStorage.getItem("id-school");
            const year = new Date().getFullYear();
            const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
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

            const position = localStorage.getItem('position_at_school');
            setPositionAtSchool(position);
            sessionStorage.removeItem('StudentInformation')
            sessionStorage.setItem("StudentInformation", id_student)
            const res = await StdtInfo(id_student)
            setStudent(res.data.data)

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
            setLoading(false);
        })()

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

    const destroyStudent = async () => {
        const idStudent = sessionStorage.getItem("StudentInformation")
        const res = await DestroyStudent(idStudent)
        if (res) {
            alert('Aluno removido com sucesso!')
            navigate(-1);
        }
    }

    const signClick = async () => {
        setLoading(true);

        if (Selectbimonthly === I) {
            sessionStorage.setItem("id-I", I)
            navigate('/ist-quarter-report-card')
        } else if (Selectbimonthly === II) {
            sessionStorage.setItem("id-II", II)
            navigate('/iind-quarter-report-card')
        } else if (Selectbimonthly === III) {
            sessionStorage.setItem("id-III", III)
            navigate('/iiird-quarter-report-card')
        } else if (Selectbimonthly === IV) {
            sessionStorage.setItem("id-IV", IV)
            navigate('/ivth-quarter-report-card')
        } else if (Selectbimonthly === V) {
            sessionStorage.setItem("id-V", V)
            navigate('/vth-quarter-report-card')
        } else if (Selectbimonthly === VI) {
            sessionStorage.setItem("id-VI", VI)
            navigate('/vith-quarter-report-card')
        } else if (Selectbimonthly === 'FinalConcepts') {
            console.log("boletim final", Selectbimonthly)
            //sessionStorage.setItem("id-VI", VI)
            navigate('/final-concepts-report-card')
        } else {
            setErrorMessage('Erro, Verifique os dados e tente novamente.');
        }
        setLoading(false);
    };

    console.log("clas", Clss)
    console.log("Selectbimonthly", Selectbimonthly)

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
                                            {/*<ProfilePhoto>

                                            </ProfilePhoto>*/}
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
                        <Input>
                            <Label>Selecione o bimestre e click no botão abaixo para ver o boletim</Label>
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
                        <ContainerCalendar>
                            <Calendar />
                        </ContainerCalendar>
                    </ContainerDivs>
                    {/*positionAtSchool === "DIRETOR/SUPERVISOR"
                        &&
                        <ButtonCancel>
                            <Btt01 onClick={() => { setRemoveStudent(true) }}>Remover Estudante</Btt01>
                        </ButtonCancel>
                    */}
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