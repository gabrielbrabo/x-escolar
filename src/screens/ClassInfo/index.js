import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    clssInfo,
    getIstQuarter,
    getIIndQuarter,
    getIIIrdQuarter,
    getIVthQuarter,
    getVthQuarter,
    getVIthQuarter,
} from '../../Api'

import {
    Container,
    //List,
    Emp,
    Matter,
    DivInfo,
    Span,
    //Search,
    DivAddEmp,
    AddEmp,
    ContainerDivs,
    TitleInfo,
    DivButtomEdit,
    ProfileInfo,
    Btt02,
    AddImpre,
    Input,
    Label,
    Select,
    ButtonContainer,
    ContainerModal,
    ModalContent,
    //DivShowMatter,
    //ButtonCancel,
    //Btt01
} from './style';

//import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";

import LoadingSpinner from '../../components/Loading'

const Cla$$Info = () => {

    const navigate = useNavigate()
    const currentYear = new Date().getFullYear().toString();
    //const [year, setYear] = useState([])
    const [clss, setClss] = useState([])
    const [positionAtEducationDepartment, setPositionAtEducationDepartment] = useState('')
    const [assessmentFormat, setassessmentFormat] = useState('');
    const [yearclss, setyearclss] = useState('')
    const [classRegentEmployee, setclassRegentEmployee] = useState([])
    const [classRegentEmployee02, setclassRegentEmployee02] = useState([])
    const [physicalEducationTeacher, setphysicalEducationTeacher] = useState([])
    //const [matter, setMatter] = useState("")

    const [studentTransfer, setstudentTransfer] = useState()
    const [studentTransferMap, setstudentTransferMap] = useState([])

    const [nameSchool, setnameSchool] = useState([])

    const [stdt, setStdt] = useState([])

    const [bimonthly, setBimonthly] = useState([]);

    //const [Selectbimonthly, setSelectbimonthly] = useState();

    const [AllBimBull, setBimAllBull] = useState(false);

    const [loading, setLoading] = useState(false);
    //const [showStudent, setShowStudent] = useState(false);
    //const [showTeacher, setShowTeacher] = useState(false);
    const { id_class } = useParams();

    console.log(currentYear)

    useEffect(() => {
        (async () => {
            setLoading(true);
            console.log('useParamsClass', id_class)
            const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
            setassessmentFormat($assessmentFormat)
            const idSchool = sessionStorage.getItem("id-school");
            const nameSchool = sessionStorage.getItem('School')
            const positionAtEducationDepartment = localStorage.getItem("positionAtEducationDepartment")
            setnameSchool(nameSchool)
            setPositionAtEducationDepartment(positionAtEducationDepartment)
            const res = await clssInfo(id_class)
            setClss(res.data.data)
            console.log('reposta', res.data.data)
            const transferStdtMap = res.data.data.find(res => {
                return res
            }).transferStudents
            setstudentTransferMap(transferStdtMap)
            const Transfer = transferStdtMap.map(res => {
                return res._id
            })
            setstudentTransfer(Transfer)
            const yearClass = res.data.data.find(clss => {
                return clss.year
            })
            console.log("yearClass", yearClass)
            setyearclss(yearClass)
            const student = [
                ...new Map(
                    res.data.data.find(res => res)
                        .id_student
                        .filter(res => res.id_class.includes(id_class))
                        .map(res => [res._id, res]) // Usa _id como chave para garantir unicidade
                ).values()
            ];
            console.log("student", student)
            const classRegentEmployee = res.data.data.find(res => {
                return res
            }).classRegentTeacher.map(res => {
                if (res) {
                    return (res)
                } else {
                    return (null)
                }
            })

            const classRegentEmployee02 = res.data.data.find(res => {
                return res
            }).classRegentTeacher02.map(res => {
                if (res) {
                    return (res)
                } else {
                    return (null)
                }
            })

            const physicalEducationTeacher = res.data.data.find(res => {
                return res
            }).physicalEducationTeacher.map(res => {
                if (res) {
                    return (res)
                } else {
                    return (null)
                }
            })
            //RegentTeacher
            setclassRegentEmployee(classRegentEmployee)
            setclassRegentEmployee02(classRegentEmployee02)
            setphysicalEducationTeacher(physicalEducationTeacher)
            setStdt(student)
            //setMatter(matter)
            console.log("classRegentEmployee", classRegentEmployee)
            console.log("physicalEducationTeacher", physicalEducationTeacher)

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

            setBimonthly([i, ii, iii, iv, v, vi].filter(res => res !== null));

            //console.log("matter", matter)
            setLoading(false);
        })()

    }, [id_class,])


    console.log("studentTransfer", studentTransfer)
    console.log("studentTransferMap", studentTransferMap)

    const addStudent = async () => {
        sessionStorage.setItem("studentTransfer", studentTransfer)
        navigate('/add/student')
    }
    const ReassignStdt = async () => {
        sessionStorage.setItem("idClassTransfer", id_class)
        navigate('/reassign-student')
    }

    const TransferStdt = async () => {
        //sessionStorage.setItem("idClassTransfer", id_class)
        navigate('/transfer-student')
    }

    const addTeacher = async () => {
        navigate(`/add/teacher/${id_class}`)
    }
    const addTeacher02 = async () => {
        navigate(`/add/teacher02/${id_class}`)
    }
    const addPhysicalTeacher = async () => {
        navigate(`/add/physicalteacher/${id_class}`)
    }
    const RemoveTeacher = async () => {
        navigate('/remove/teacher')
    }
    const RemovephysicalTeacher = async () => {
        navigate('/remove/physicalteacher')
    }
    const RemoveStudent = async () => {
        navigate('/remove/student')
    }

    const Edit = async () => {
        navigate('/edit-class')
    }

    const handleEmployee = async (emp) => {
        sessionStorage.setItem("EmployeeInformation", emp._id)
        navigate(`/employee/info/${emp._id}`)
    }

    const handlephysicalEmp = async (physicalEmp) => {
        sessionStorage.setItem("EmployeeInformation", physicalEmp._id)
        navigate(`/employee/info/${physicalEmp._id}`)
    }

    const StudentInformation = async (stdt) => {
        setLoading(true);
        navigate(`/student/info/${stdt._id}`)
        setLoading(false);
    }

    const PrintableAttendanceSheet = async () => {
        setLoading(true);
        const serie = clss.map(clss => {
            return clss.serie
        })
        console.log("resutado a ser eviado", stdt)
        navigate('/printable-attendance-sheet', {
            state: {
                students: stdt,
                schoolName: nameSchool,
                className: serie,
                teacherName: classRegentEmployee
            }
        });
        setLoading(false);
    }

    const PrintableAllTheBulletinsGrades = async () => {
        setBimAllBull(true)
    }

    const handleBimonthlyChange = (e) => {

        const selectedBimonthly = JSON.parse(e.target.value);
        const idBim = selectedBimonthly._id
        console.log("selectedBimonthly", selectedBimonthly)
        console.log("assessmentFormat", assessmentFormat)

        if (assessmentFormat === 'grade') {
            if (selectedBimonthly.bimonthly === "1º BIMESTRE") {
                navigate(`/Ist-allTheBulletins-grades/${id_class}/${idBim}`)
            }
            if (selectedBimonthly.bimonthly === "2º BIMESTRE") {
                navigate(`/IInd-allTheBulletins-grades/${id_class}/${idBim}`)
            }
            if (selectedBimonthly.bimonthly === "3º BIMESTRE") {
                navigate(`/IIIrd-allTheBulletins-grades/${id_class}/${idBim}`)
            }
            if (selectedBimonthly.bimonthly === "4º BIMESTRE") {
                navigate(`/IVth-allTheBulletins-grades/${id_class}/${idBim}`)
            }
        }

        if (assessmentFormat === 'concept') {
            if (selectedBimonthly.bimonthly === "1º BIMESTRE") {
                navigate(`/Ist-allTheBulletins-concept/${id_class}/${idBim}`)
            }
            if (selectedBimonthly.bimonthly === "2º BIMESTRE") {
                navigate(`/IInd-allTheBulletins-concept/${id_class}/${idBim}`)
            }
            if (selectedBimonthly.bimonthly === "3º BIMESTRE") {
                navigate(`/IIIrd-allTheBulletins-concept/${id_class}/${idBim}`)
            }
            if (selectedBimonthly.bimonthly === "4º BIMESTRE") {
                navigate(`/IVth-allTheBulletins-concept/${id_class}/${idBim}`)
            }
        }
    };

    console.log("student", stdt)
    //console.log("employee", employee)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    {
                        clss.map(clss => (
                            <Emp key={clss._id} >
                                <ProfileInfo>
                                    <Span>Serie: {clss.serie}</Span>
                                    {/*<Span>Nivel: {clss.level}</Span>*/}
                                    <Span>Turno: {clss.shift}</Span>
                                    {/*<Span>Numero da Sala: {clss.classroom_number}</Span>*/}
                                </ProfileInfo>
                                {clss.year === currentYear && !positionAtEducationDepartment && (
                                    <DivButtomEdit>
                                        <Btt02 onClick={Edit}>Editar</Btt02>
                                    </DivButtomEdit>
                                )}


                            </Emp>
                        ))
                    }

                    {
                        classRegentEmployee.length > 0 ? (
                            <DivInfo>
                                <TitleInfo>Professor Regente de Truma:</TitleInfo>
                                {/*!showTeacher &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowTeacher(true) }}>Ver Professores <TiArrowDownThick fontSize={'17px'} /></Btt02>
                                    </DivShowMatter>
                                    */
                                }
                                {
                                    <>
                                        {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                            <DivAddEmp>
                                                {/*<AddEmp>
                                                    <Btt02 onClick={addTeacher}>Add Prefessor</Btt02>
                                                </AddEmp>*/}
                                                <AddEmp>
                                                    <Btt02 onClick={RemoveTeacher}>Remover</Btt02>
                                                </AddEmp>
                                            </DivAddEmp>
                                        )}
                                        <Matter>

                                            {
                                                classRegentEmployee.map(emp => (
                                                    <div onClick={() => handleEmployee(emp)} key={emp._id}>
                                                        <Span>{emp.name}</Span>
                                                    </div>
                                                ))
                                            }
                                        </Matter>
                                        {
                                            /*<DivShowMatter>
                                            <Btt02 onClick={() => { setShowTeacher(false) }}>Fecha<TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>
                                        */
                                        }
                                    </>
                                }
                            </DivInfo>
                        ) : (
                            <DivInfo>
                                <TitleInfo>Professor Regente de Turma:</TitleInfo>
                                {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                    <DivAddEmp>
                                        <AddEmp>
                                            <Btt02 onClick={addTeacher}>Adicionar</Btt02>
                                        </AddEmp>
                                    </DivAddEmp>
                                )}
                                <Matter>
                                    <>Não há nenhum Professor</>
                                </Matter>
                            </DivInfo>
                        )
                    }
                    {
                        classRegentEmployee02.length > 0 ? (
                            <DivInfo>
                                <TitleInfo>Professor Regente de Turma 02:</TitleInfo>
                                {/*!showTeacher &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowTeacher(true) }}>Ver Professores <TiArrowDownThick fontSize={'17px'} /></Btt02>
                                    </DivShowMatter>
                                    */
                                }
                                {
                                    <>
                                        {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                            <DivAddEmp>
                                                {/*<AddEmp>
                                                    <Btt02 onClick={addTeacher}>Add Prefessor</Btt02>
                                                </AddEmp>*/}
                                                <AddEmp>
                                                    <Btt02 onClick={RemoveTeacher}>Remover</Btt02>
                                                </AddEmp>
                                            </DivAddEmp>
                                        )}
                                        <Matter>

                                            {
                                                classRegentEmployee02.map(emp => (
                                                    <div onClick={() => handleEmployee(emp)} key={emp._id}>
                                                        <Span>{emp.name}</Span>
                                                    </div>
                                                ))
                                            }
                                        </Matter>
                                        {
                                            /*<DivShowMatter>
                                            <Btt02 onClick={() => { setShowTeacher(false) }}>Fecha<TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>
                                        */
                                        }
                                    </>
                                }
                            </DivInfo>
                        ) : (
                            <DivInfo>
                                <TitleInfo>Professor Regente de Turma 02:</TitleInfo>
                                {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                    <DivAddEmp>
                                        <AddEmp>
                                            <Btt02 onClick={addTeacher02}>Adicionar</Btt02>
                                        </AddEmp>
                                    </DivAddEmp>
                                )}
                                <Matter>
                                    <>Não há nenhum Professor</>
                                </Matter>
                            </DivInfo>
                        )
                    }

                    {
                        physicalEducationTeacher.length > 0 ? (
                            <DivInfo>
                                <TitleInfo>Professor de Educação Fisica:</TitleInfo>
                                {
                                    <>
                                        {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                            <DivAddEmp>
                                                {/*<AddEmp>
                                                    <Btt02 onClick={addTeacher}>Add Prefessor</Btt02>
                                                </AddEmp>*/}
                                                <AddEmp>
                                                    <Btt02 onClick={RemovephysicalTeacher}>Remover</Btt02>
                                                </AddEmp>
                                            </DivAddEmp>
                                        )}
                                        <Matter>

                                            {
                                                physicalEducationTeacher.map(physicalEmp => (
                                                    <div onClick={() => handlephysicalEmp(physicalEmp)} key={physicalEmp._id}>
                                                        <Span>{physicalEmp.name}</Span>
                                                    </div>
                                                ))
                                            }
                                        </Matter>
                                        {
                                            /*<DivShowMatter>
                                            <Btt02 onClick={() => { setShowTeacher(false) }}>Fecha<TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>
                                        */
                                        }
                                    </>
                                }
                            </DivInfo>
                        ) : (
                            <DivInfo>
                                <TitleInfo>Professor de Educação Fisica:</TitleInfo>
                                {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                    <DivAddEmp>
                                        <AddEmp>
                                            <Btt02 onClick={addPhysicalTeacher}>Adicionar</Btt02>
                                        </AddEmp>
                                    </DivAddEmp>
                                )}
                                <Matter>
                                    <>Não há nenhum Professor</>
                                </Matter>
                            </DivInfo>
                        )
                    }

                    {
                        stdt.length > 0
                            ?
                            <DivInfo>
                                <TitleInfo>Alunos:</TitleInfo>
                                <AddImpre>
                                    <p onClick={PrintableAttendanceSheet}>Imprimir Lista de alunos</p>
                                </AddImpre>
                                <AddImpre>
                                    <p onClick={PrintableAllTheBulletinsGrades}>Emitir boletins da turma</p>
                                </AddImpre>
                                <p>Total de Alunos: {stdt.length}</p>
                                {studentTransferMap.length > 0 && <p>Total de Alunos Transferidos: {studentTransferMap.length}</p>}
                                {/*!showStudent &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowStudent(true) }}>Ver Alunos <TiArrowDownThick fontSize={'17px'} /></Btt02>
                                    </DivShowMatter>
                                    */
                                }
                                {
                                    <>
                                        {yearclss.year === currentYear && !positionAtEducationDepartment && (
                                            <DivAddEmp>
                                                <AddEmp>
                                                    <Btt02 onClick={addStudent}>Adicionar</Btt02>
                                                </AddEmp>
                                                <AddEmp>
                                                    <Btt02 onClick={ReassignStdt}>Remanejar</Btt02>
                                                </AddEmp>
                                                <AddEmp>
                                                    <Btt02 onClick={TransferStdt}>Transferir</Btt02>
                                                </AddEmp>
                                                <AddEmp>
                                                    <Btt02 onClick={RemoveStudent}>Remover</Btt02>
                                                </AddEmp>
                                            </DivAddEmp>
                                        )}
                                        <Matter>
                                            {
                                                stdt
                                                    .sort((a, b) => a.name.localeCompare(b.name)) // Ordena em ordem alfabética
                                                    .map(stdt => {
                                                        return (
                                                            <div key={stdt.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                <Span onClick={() => StudentInformation(stdt)}>{stdt.name}</Span>
                                                                {stdt.status === "inativo" && (
                                                                    <Span style={{ color: 'red', fontWeight: 'bold' }}>Inativo</Span>
                                                                )}
                                                            </div>
                                                        );
                                                    })
                                            }

                                        </Matter>
                                        {studentTransferMap.length > 0 && (
                                            <Matter>
                                                <TitleInfo>⚠️ Alunos Transferidos e Remanejados</TitleInfo>
                                                {studentTransferMap
                                                    .sort((a, b) => a.name.localeCompare(b.name)) // Ordena em ordem alfabética
                                                    .map(stdt => {
                                                        return (
                                                            <div key={stdt.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                <Span onClick={() => StudentInformation(stdt)}>{stdt.name}</Span>
                                                                {stdt.status === "ativo" && (
                                                                    <Span style={{ color: 'blue', fontWeight: 'bold' }}>Remanejado</Span>
                                                                )}
                                                                {stdt.status === "inativo" && (
                                                                    <Span style={{ color: 'blue', fontWeight: 'bold' }}>Remanejado</Span>
                                                                )}
                                                                {stdt.status === "transferido" && (
                                                                    <Span style={{ color: 'orange', fontWeight: 'bold' }}>Transferido</Span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                            </Matter>
                                        )}

                                        {
                                            /*<DivShowMatter>
                                            <Btt02 onClick={() => { setShowStudent(false) }}>Fecha<TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>
                                        */
                                        }
                                    </>
                                }
                            </DivInfo>
                            :
                            <DivInfo>
                                <TitleInfo>Alunos:</TitleInfo>
                                {yearclss.year === currentYear
                                    &&
                                    <DivAddEmp>
                                        <AddEmp>
                                            <Btt02 onClick={addStudent}>Add Aluno</Btt02>
                                        </AddEmp>
                                    </DivAddEmp>
                                }
                                <Matter>
                                    <>Não há nenhum estudante</>
                                </Matter>
                            </DivInfo>
                    }

                    {AllBimBull && (
                        <ContainerModal>
                            <ModalContent>
                                <h2>Selecione o Bimestre</h2>
                                <Input>
                                    <Label>Bimestres</Label>
                                    <Select
                                        id="id-bimonthly"
                                        //value={Selectbimonthly ? JSON.stringify(Selectbimonthly) : ""}
                                        onChange={handleBimonthlyChange}
                                    >
                                        <option value="">Selecione</option>
                                        {bimonthly.map(res => (
                                            <option
                                                key={res._id}
                                                value={JSON.stringify({ _id: res._id, bimonthly: res.bimonthly })}
                                            >
                                                {res.bimonthly}
                                            </option>
                                        ))}
                                    </Select>
                                    <ButtonContainer>
                                        <button onClick={() => setBimAllBull(false)}>Cancelar</button>
                                    </ButtonContainer>
                                </Input>
                            </ModalContent>
                        </ContainerModal>
                    )}

                    {/* <ButtonCancel>
                        <Btt01 >Remover Turma</Btt01>
                    </ButtonCancel>*/}
                </ContainerDivs>
            }
        </Container >
    )
}

export default Cla$$Info
