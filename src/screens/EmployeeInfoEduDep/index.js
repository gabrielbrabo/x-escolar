import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    EmpEducationDepartmentInfo
} from '../../Api'

import {
    Container,
    Emp,
    EmployeeInfo,
    ProfileInfo,
    DivButtomEdit,
    Pro,
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
    const [Posi, setPosi] = useState("")
    const [loading, setLoading] = useState(false);
    const { id_employee } = useParams()

    useEffect(() => {
        (async () => {
            setLoading(true);
            console.log("id_employee", id_employee)
            const posi = localStorage.getItem("positionAtEducationDepartment")
            setPosi(posi)
            sessionStorage.setItem("EmployeeInformation", id_employee)
            const res = await EmpEducationDepartmentInfo(id_employee)
            setEmployee(res.data.data)
            setLoading(false);

        })()

    }, [currentYear, id_employee])

    const Edit = async () => {
        navigate('/edit-profile-edu-dep')
    }

    /*const destroyEmp = async () => {
        const idEmployee = sessionStorage.getItem("EmployeeInformation")
        const res = await DestroyEmp(idEmployee)
        if (res) {
            alert('Funcionario removido com sucesso!')
            navigate(-1);
        }
    }*/


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
                                { Posi === "SECRETÁRIO(A) DE EDUCAÇÃO" &&
                                    <DivButtomEdit>
                                        <Btt02 onClick={Edit}>Editar</Btt02>
                                    </DivButtomEdit>
                                }
                            </EmployeeInfo>
                        </Emp>
                    ))}

                    {/*positionAtSchool === "DIRETOR/SUPERVISOR"
                        &&
                        <ButtonCancel>
                            <Btt01 onClick={() => { setRemoveEmp(true) }} >Remover Funcionario</Btt01>
                        </ButtonCancel>
                    */}
                    {/*removeEmp === true && (
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
                    )*/}
                    {
                        /*Selectclass &&
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
                        </Backdrop>*/
                    }
                </ContainerDivs>
            )}
        </Container>
    );
}

export default EmployeeInformation;