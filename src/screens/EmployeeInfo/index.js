import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmpInfo } from '../../Api'

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
    DivAddEmp,
    AddEmp,
    Btt02,
    ProfilePhoto,
    LoadingSpinnerContainer,
    ContainerDivs,
    DivShowMatter,
    ButtonCancel,
    Btt01
} from './style';

import { TiArrowDownThick, TiArrowUpThick  } from "react-icons/ti";

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
    const [loading, setLoading] = useState(false);
    const [showMatter, setShowMatter] = useState(false);
    const [showClass, setShowClass] = useState(false);
    const { id_employee } = useParams()
    //console.log('posi', position_at_school)

    useEffect(() => {
        (async () => {
            setLoading(true);
            //const id_employee = sessionStorage.getItem("EmployeeInformation")
            const res = await EmpInfo(id_employee)
            const position_at_school = res.data.data.map(res => {
                if (res.position_at_school === "GESTOR") {
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
            const clss = res.data.info.find(res => {
                return res
            }).map(res => {
                if (res.id_class.year === currentYear) {
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
        })()

    }, [currentYear, id_employee])

    const add = () => {
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
    }

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
                                    <ProfilePhoto>

                                    </ProfilePhoto>
                                    < ProfileInfo>
                                        <Span>{emp.name}</Span>
                                        <Span>{emp.position_at_school}</Span>
                                        <Span>CPF: {emp.cpf}</Span>
                                    </ProfileInfo>
                                </Pro>
                                <DivButtomEdit>
                                    <Btt02>Editar</Btt02>
                                </DivButtomEdit>
                            </EmployeeInfo>
                        </Emp>
                    ))}
                    {position_at_school.length === 0 && (
                        <>
                            <DivInfo>
                                <TitleInfo>Materias:</TitleInfo>
                                {!showMatter &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowMatter(true) }}>Ver Materias <TiArrowDownThick fontSize={'17px'} /></Btt02>
                                    </DivShowMatter>
                                }
                                {showMatter &&
                                    <>
                                        <DivAddEmp>
                                            <AddEmp>
                                                <Btt02 onClick={add}>Nova Materia</Btt02>
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
                                                <Span>Sem Materias cadastradas</Span>
                                            )}
                                        </Matter>
                                        <DivShowMatter>
                                            <Btt02 onClick={() => { setShowMatter(false) }}>Fecha Materias <TiArrowUpThick fontSize={'17px'}  /></Btt02>
                                        </DivShowMatter>
                                    </>
                                }
                            </DivInfo>
                            <DivInfo>
                                <TitleInfo>Turmas:</TitleInfo>
                                {!showClass &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowClass(true) }}>Ver Turmas <TiArrowDownThick fontSize={'17px'}  /></Btt02>
                                    </DivShowMatter>
                                }
                                {showClass &&
                                    <>
                                        <Matter>
                                            {Clss.length > 0 ? (
                                                Clss.map(clss => (
                                                    <Span key={clss.id_class._id}>{clss.id_class.serie}: {clss.name_matter}</Span>
                                                ))
                                            ) : (
                                                <Span>Este Professor não esta cadastrado em nenhuma turma vá ate turmas selecione a turma e adicione este professor a uma turma</Span>
                                            )}
                                        </Matter>
                                        <DivShowMatter>
                                            <Btt02 onClick={() => { setShowClass(false) }}> Fecha Turmas <TiArrowUpThick fontSize={'17px'} /></Btt02>
                                        </DivShowMatter>
                                    </>
                                }
                            </DivInfo>
                        </>
                    )}
                    <ButtonCancel>
                        <Btt01 >Remover Funcionario</Btt01>
                    </ButtonCancel>
                </ContainerDivs>
            )}
        </Container>
    );
}

export default EmployeeInformation;