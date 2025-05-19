import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clssInfo, updateStatus, StdtInfo } from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    FormSearch,
    AreaEmp,
    InputEmp,
    Btt02,
    ButtonCancel,
    Chip,
    Select,
    TableRow,
    ModalOverlay,
    ModalContent,
    Button,
} from './style';

import LoadingSpinner from '../../components/Loading'

const TransStudent = () => {

    const navigate = useNavigate()
    //const currentYear = new Date().getFullYear();
    const [student, setStudent] = useState([])
    const [/*serie*/, setSerie] = useState("")
    const [busca, setBusca] = useState("")

    const [removeStudent, setRemoveStudent] = useState(false);
    const [idStudent, setIdStudent] = useState("")
    const [id_class, setId_class] = useState("")
    const [loading, setLoading] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState({});
    const [exitDate, setExitDate] = useState(null);

    const [StudentTrans, setStudentTrans] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            //const idSchool = sessionStorage.getItem("id-school");

            const id = sessionStorage.getItem("ClassInformation")
            setSerie(sessionStorage.getItem("serieClass"))
            const res = await clssInfo(id)
            //setStudent(response.data.data)
            //setClss(resClass.data.data)

            const student = res.data.data.find(res => {
                return res
            }).id_student.map(res => {
                if (res) {
                    return (res)
                } else {
                    return null
                }
            })
            /*const studentAdded = student.find( res => {
                return res
            })*/
            setStudent(student)
            setId_class(id)
            // setId_student(studentAdded._id)
            setLoading(false);
        })()

    }, [])

    const normalizeString = (str) => {
        return str
            .normalize("NFD") // Separa caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/[^\w\s]/gi, "") // Remove pontuações
            .toUpperCase(); // Converte para maiúsculas
    };

    student.sort((a, b) => normalizeString(a.name).localeCompare(normalizeString(b.name)));

    const Cancel = async () => {
        navigate(-1);
    }

    useEffect(() => {
        const fetchStudent = async () => {
            if (idStudent.length > 0 && removeStudent === true) {
                console.log("idStudent", idStudent);
                try {
                    const res = await StdtInfo(idStudent);
                    if (res?.data?.data) {
                        console.log("resStdtInfo", res.data.data);
                        setStudentTrans(res.data.data);
                    } else {
                        console.error("Resposta inesperada da API:", res);
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do estudante:", error);
                }
            }
        };

        fetchStudent();
    }, [idStudent, removeStudent]);


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

    console.log("id_class", id_class)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <Search>
                        <FormSearch>
                            <label>Buscar</label>
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
                    </Search>
                    <h3>Selecione o aluno a ser transferido!</h3>
                    <List>

                        {
                            student.filter((val) => {
                                if (!busca) {
                                    return (val)
                                } else if (val.name.includes(busca.toUpperCase())) {
                                    return (val)
                                }
                                return null
                            }).map(student => (
                                <Emp
                                    onClick={() => {
                                        setRemoveStudent(true);
                                        setIdStudent(student._id);
                                    }}
                                    key={student._id}
                                >
                                    <Span>{student.name}</Span>
                                    {/* Verificação do status do aluno */}
                                    {student.status === "ativo" && (
                                        <Span style={{ marginLeft: '10px', color: 'green', fontWeight: 'bold' }}>Ativo</Span>
                                    )}
                                    {student.status === "inativo" && (
                                        <Span style={{ marginLeft: '10px', color: 'red', fontWeight: 'bold' }}>Inativo</Span>
                                    )}
                                </Emp>
                            ))
                        }
                    </List>
                    {removeStudent === true && (

                        <ModalOverlay>
                            <ModalContent>
                                {StudentTrans.map((student) => (
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
                                                ⚠ Atenção:
                                                Ao transferir um aluno, ele será removido da turma atual.
                                                Antes de continuar, certifique-se de que todos os dados estão preenchidos corretamente e salvos.
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
            <ButtonCancel>
                <Btt02 onClick={Cancel}>Cancelar</Btt02>
            </ButtonCancel>
        </Container>
    )
}

export default TransStudent