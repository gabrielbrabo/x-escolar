import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    EmpEducationDepartmentInfo,
} from '../../Api'

import {
    Container,
    Emp,
    EmployeeInfo,
    ProfileInfo,
    DivButtomEdit,
    //TitleInfo,
    Pro,
    //Matter,
    //DivInfo,
    Span,
    //DivAddEmp,
    //AddEmp,
    Btt02,
    //ProfilePhoto,
    LoadingSpinnerContainer,
    ContainerDivs,
} from './style';

import LoadingSpinner from '../../components/Loading'

const EmployeeInformation = () => {

    const navigate = useNavigate()
    const currentYear = new Date().getFullYear().toString();
    const [employee, setEmployee] = useState([])
    const [loading, setLoading] = useState(false);
    const { id_employee } = useParams()

    useEffect(() => {
        (async () => {
            setLoading(true);
            //setPositionAtSchool(position);
            console.log("id_employee", id_employee)
            const res = await EmpEducationDepartmentInfo(id_employee)

            console.log("res", res)
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
                //setPosition_at_school(position_at_school)
            }
            setEmployee(res.data.data)

            setLoading(false);

        })()

    }, [currentYear, id_employee])

    const Edit = async () => {
        navigate('/edit-my-profile-edu-dep')
    }

    const PasswordReset = async () => {
        const cpf = employee.map(res => {
            return res.cpf
        })
        console.log("id_employee", id_employee, "cpf", cpf)
        navigate(`/password-rest-emp-edu-dep/${cpf}/${id_employee}`)
    }

    //const nameEmployee = sessionStorage.getItem("name")
    //console.log("clas", matter)
    //console.log('posi', Clss)
    console.log('employee', employee)

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
                                        <Span>{emp.positionAtEducationDepartment}</Span>
                                        <Span>Celular: {emp.cellPhone}</Span>
                                        <Span>Email: {emp.email}</Span>
                                        <Span>CPF: {emp.cpf}</Span>
                                        <Span>Nascimento: {new Date(emp.dateOfBirth + "T00:00:00").toLocaleDateString('pt-BR')}</Span>
                                        <Span>Endereço: {emp.address}</Span>
                                    </ProfileInfo>
                                </Pro>
                                <DivButtomEdit>
                                    <Btt02 onClick={Edit}>Editar Perfil</Btt02>
                                    <Btt02 onClick={PasswordReset}>Redefinir Senha</Btt02>
                                </DivButtomEdit>
                            </EmployeeInfo>
                        </Emp>
                    ))}
                    {/*position_at_school.length === 0 && (
                        <>
                            <Input>
                                <h2>Meu Diario</h2>
                                <Label>Selecione o bimestre e click no botão abaixo para ver o Diario do Professor</Label>
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
                            </Input>
                            <DivInfo>
                                <TitleInfo>Turmas:</TitleInfo>
                                {/*
                                    !showClass &&
                                    <DivShowMatter>
                                        <Btt02 onClick={() => { setShowClass(true) }}>Ver Turmas <TiArrowDownThick fontSize={'17px'} /></Btt02>
                                    </DivShowMatter>
                                    
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
                                        </DivShowMatter>}
                                    </>
                                }
                            </DivInfo>
                        </>
                    )*/}
                    {/*positionAtSchool === "DIRETOR/SUPERVISOR"
                        &&
                        <ButtonCancel>
                            <Btt01 onClick={() => { setRemoveEmp(true) }} >Remover Funcionario</Btt01>
                        </ButtonCancel>
                    */}
                    {/*
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
                    */}
                </ContainerDivs>
            )}
        </Container>
    );
}

export default EmployeeInformation;