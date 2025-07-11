import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    EmpInfo,
    DestroyEmp,
    //getIstQuarter,
    //getIIndQuarter,
    //getIIIrdQuarter,
    //getIVthQuarter,
    //getVthQuarter,
    //getVIthQuarter,
} from '../../Api'

import {
    Container,
    Emp,
    EmployeeInfo,
    ProfileInfo,
    DivButtomEdit,
    TitleInfo,
    Pro,
    Matter,
    DivInfo,
    Span,
    //DivAddEmp,
    //AddEmp,
    Btt02,
    //ProfilePhoto,
    LoadingSpinnerContainer,
    ContainerDivs,
    //DivShowMatter,
    // ButtonCancel,
    //Btt01,
    AddMatterSection,
    WarningBox,
    Button,
    ButtonRemove,
    ActionButtons,
    //Input,
    //Label,
    //Select,
    //ErrorMessage,
    Backdrop,
    Modal,
    ClassList,
    ClassItem
} from './style';

//import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";

/*import {
    AreaEmp,
    InputEmp,
    Select
} from '../../components/Inputs'

import {
    Btt02,
} from '../../components/Buttons';*/

import LoadingSpinner from '../../components/Loading'

const EmployeeInformation = () => {

    const navigate = useNavigate()
    const currentYear = new Date().getFullYear().toString();
    //const [year, setYear] = useState([])
    const [Clss, setClss] = useState([])
    const [employee, setEmployee] = useState([])
    const [matter, setMatter] = useState("")
    //const [filter, setFilter] = useState()
    const [position_at_school, setPosition_at_school] = useState([]);
    //const [positionAtSchool, setPositionAtSchool] = useState(null);
    const [loading, setLoading] = useState(false);
    //const [Selectbimonthly, setSelectbimonthly] = useState([])
    //const [id_class, setid_class] = useState([])
    const [Selectclass, setSelectclass] = useState('')
    //const [bimonthly, setbimonthly] = useState([])
    const [school, setSchool] = useState(null);
    const [removeEmp, setRemoveEmp] = useState(false);
    //const [errorMessage, setErrorMessage] = useState();
    const { id_employee } = useParams()

    useEffect(() => {
        (async () => {
            setLoading(true);
            const School = sessionStorage.getItem('School');
            //const position = localStorage.getItem('position_at_school');
            //const idSchool = sessionStorage.getItem("id-school");
            //const year = new Date().getFullYear();
            //setPositionAtSchool(position);
            sessionStorage.setItem("EmployeeInformation", id_employee)
            const res = await EmpInfo(id_employee)
            const position_at_school = res.data.data.map(res => {
                if (res.position_at_school === "SECRETARIO" || res.position_at_school === "DIRETOR/SUPERVISOR") {
                    return res.position_at_school
                } else {
                    return null
                }
            }).filter(res => {
                if (!undefined) {
                    return (res)
                } else {
                    return undefined
                }
            })
            if (position_at_school) {
                setPosition_at_school(position_at_school)
            }
            setEmployee(res.data.data)
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
            console.log("cl", clss)
            const mttr = res.data.data.find(res => {
                return res
            }).id_matter.map(res => {
                if (res._id) {
                    return (res)
                } else {
                    return (null)
                }
            }).filter(res => {
                if (! null) {
                    return (res)
                } else {
                    return (null)
                }
            })
            setClss(clss)
            setMatter(mttr)
            setLoading(false);
            setSchool(School);

            /*const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
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
            */
        })()

    }, [currentYear, id_employee])

    /*const handledaily = () => {
        if (Selectbimonthly.length > 0) {
            const id_cla$$ = Clss.map(clss => {
                return clss
            })
            if (id_cla$$) {
                if (id_cla$$.length <= 1) {
                    const res = Clss.map(clss => {
                        sessionStorage.setItem("Nameclass-daily", JSON.stringify(clss));
                        return clss._id
                    })
                    sessionStorage.setItem("Selectclass-daily", res);
                    navigate('/daily')
                    //console.log('log class', id_cla$$)
                    //setid_class(res); // Passando apenas o primeiro item do array
                } else if (id_cla$$.length >= 2) {
                    console.log('log selctclass', id_cla$$)
                    setSelectclass(id_cla$$);
                    // Passando o array completo se houver mais de um ID
                }
            }

            const id_schll = employee.find(emp => {
                return emp

            })
            console.log("id_schll", id_schll)
            console.log("id_cla$$", id_cla$$)


            sessionStorage.setItem("Selectbimonthly-daily", Selectbimonthly);
            sessionStorage.setItem("Selectteacher-daily", JSON.stringify(id_schll));
            setErrorMessage()
        } else {
            setErrorMessage('Erro, Verifique os dados e tente novamente.');
        }
    };*/

    const handleSelectClas = (clss) => {
        sessionStorage.setItem("Nameclass-daily", JSON.stringify(clss));
        sessionStorage.setItem("Selectclass-daily", clss._id);
        navigate('/daily')
    }

    //console.log("Selectbimonthly", Selectbimonthly)

    //console.log("id_class", id_class)
    console.log("Selectclass", Selectclass)


    /*const add = () => {
        setLoading(true);
        const res = employee.find(employee => {
            return employee
        })
        console.log("res", res._id)
        sessionStorage.removeItem('id_emp')
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('tchrnf')
        sessionStorage.setItem("id_emp", res._id)
        sessionStorage.setItem("name", res.name)
        sessionStorage.setItem("tchrnf", res._id)
        navigate('/add/matter')
        setLoading(false);
    }

    const Remove = async () => {
        navigate('/remove/matter')
    }*/

    const Edit = async () => {
        navigate('/edit-profile')
    }

    const destroyEmp = async () => {
        const idEmployee = sessionStorage.getItem("EmployeeInformation")
        const res = await DestroyEmp(idEmployee)
        if (res) {
            alert('Funcionario removido com sucesso!')
            navigate(-1);
        }
    }

    //const nameEmployee = sessionStorage.getItem("name")
    console.log("clas", matter)
    console.log('posi', Clss)

    return (
        <Container>
            {loading ? (
                <LoadingSpinnerContainer>
                    <LoadingSpinner />
                </LoadingSpinnerContainer>
            ) : (
                <ContainerDivs>
                    {employee.map(emp => (
                        <Emp key={emp._id}>
                            <EmployeeInfo>
                                <Pro>
                                    {/*<ProfilePhoto>

                                    </ProfilePhoto>*/}
                                    < ProfileInfo>
                                    <Span>{emp.name}</Span>
                                        <Span>{emp.position_at_school}(A)</Span>
                                        <Span>{school}</Span>
                                        <Span>Celular: {emp.cellPhone}</Span>
                                        <Span>Email: {emp.email}</Span>
                                        <Span>CPF: {emp.cpf}</Span>
                                        <Span>Nascimento: {new Date(emp.dateOfBirth + "T00:00:00").toLocaleDateString('pt-BR')}</Span>
                                        <Span>Endereço: {emp.address}</Span>
                                    </ProfileInfo>
                                </Pro>
                                <DivButtomEdit>
                                    <Btt02 onClick={Edit}>Editar</Btt02>
                                </DivButtomEdit>
                            </EmployeeInfo>
                        </Emp>
                    ))}
                    {position_at_school.length === 0 && (
                        <>
                            {/*<DivInfo>
                                <TitleInfo>Disciplinas:</TitleInfo>
                                {!showMatter &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowMatter(true) }}>Ver Disciplinas <TiArrowDownThick fontSize={'17px'} /></Btt02>
                                    </DivShowMatter>
                                }
                                {showMatter &&
                                    <>
                                        <DivAddEmp>
                                            <AddEmp>
                                                <Btt02 onClick={add}>Nova Disciplina</Btt02>
                                            </AddEmp>
                                            {matter.length > 0 && (
                                                <AddEmp>
                                                    <Btt02 onClick={Remove}>Remover</Btt02>
                                                </AddEmp>
                                            )}
                                        </DivAddEmp>
                                        <Matter>
                                            {matter.length > 0 ? (
                                                matter.map(matter => (
                                                    <Span key={matter._id}>{matter.name},</Span>
                                                ))
                                            ) : (
                                                <Span>Sem Disciplinas cadastradas</Span>
                                            )}
                                        </Matter>
                                        <DivShowMatter>
                                            <Btt02 onClick={() => { setShowMatter(false) }}>Fecha Disciplinas <TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>
                                    </>
                                }
                            </DivInfo>*/}
                            {/*<Input>
                                <h2>Diario</h2>
                                <Label>Selecione o bimestre e click no botão abaixo.</Label>
                                <Select
                                    id="id-bimonthly"
                                    value={Selectbimonthly}
                                    onChange={(e) => setSelectbimonthly(e.target.value)}
                                >
                                    <option value="">Selecione</option>
                                    {
                                        bimonthly.map(res => (
                                            <option key={res._id} value={JSON.stringify({ _id: res._id, bimonthly: res.bimonthly })}>{res.bimonthly}</option>
                                        ))
                                    }
                                </Select>
                                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                <Button onClick={handledaily}>Ver Diario</Button>
                            </Input>*/}
                            <DivInfo>
                                <TitleInfo>Turmas:</TitleInfo>
                                {/*
                                    !showClass &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowClass(true) }}>Ver Turmas <TiArrowDownThick fontSize={'17px'} /></Btt02>
                                    </DivShowMatter>
                                    */
                                }
                                {
                                    <>
                                        <Matter>
                                            {Clss.length > 0 ? (
                                                Clss.map(clss => (
                                                    <Span key={clss._id}>{clss.serie}</Span>
                                                ))
                                            ) : (
                                                <Span>Este Professor não esta cadastrado em nenhuma turma vá ate turmas selecione a turma e adicione este professor a uma turma</Span>
                                            )}
                                        </Matter>
                                        {/*<DivShowMatter>
                                            <Btt02 onClick={() => { setShowClass(false) }}> Fecha Turmas <TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>*/}
                                    </>
                                }
                            </DivInfo>
                        </>
                    )}
                    {/*positionAtSchool === "DIRETOR/SUPERVISOR"
                        &&
                        <ButtonCancel>
                            <Btt01 onClick={() => { setRemoveEmp(true) }} >Remover Funcionario</Btt01>
                        </ButtonCancel>
                    */}
                    {removeEmp === true && (
                        <AddMatterSection>
                            <WarningBox>
                                {employee.map(emp => (
                                    <Span>Tem certeza que deseja remover o Usuario: {emp.name}?</Span>
                                ))}
                            </WarningBox>
                            <ActionButtons>
                                <div>
                                    <ButtonRemove onClick={destroyEmp} >Remover</ButtonRemove>
                                    <Button onClick={() => { setRemoveEmp(false) }}>Cancelar</Button>
                                </div>
                            </ActionButtons>
                        </AddMatterSection>
                    )}
                    {
                        Selectclass &&
                        <Backdrop>
                            <Modal>
                                <h2>Click em uma turma para ver o diario</h2>
                                <ClassList>
                                    {Clss.map(clss => (
                                        <ClassItem
                                            key={clss.id}
                                            onClick={() => { handleSelectClas(clss) }}
                                        >
                                            {clss.serie}
                                        </ClassItem>
                                    ))}
                                </ClassList>
                                <Btt02 onClick={() => { setSelectclass('') }}>Cancelar</Btt02>
                            </Modal>
                        </Backdrop>
                    }
                </ContainerDivs>
            )}
        </Container>
    );
}

export default EmployeeInformation;