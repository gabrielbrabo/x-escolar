import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetStudent, addStdt, returnedStudent } from '../../Api';
import {
    Container,
    List,
    Emp,
    Span,
    Search,
    FormSearch,
    Add,
    Btt01,
    AreaEmp,
    InputEmp,
    DivButtonAdd,
    Btt02,
    ButtonCancel,
    ModalOverlay,
    ModalContent,
    ButtonContainer,
    ModalContainer,
    //ModalContent,
    Title,
    //DivButtonAdd,
} from './style';
import LoadingSpinner from '../../components/Loading';

const StudentAdd = () => {
    const navigate = useNavigate();
    const [id_student, setId_student] = useState("");
    const [id_class, setId_class] = useState([]);
    const [name_student, setName_student] = useState("");
    const [serie, setSerie] = useState("");
    const [student, setStudent] = useState([]);
    const [busca, setBusca] = useState("");
    const [added, setAdded] = useState(false);
    const [loading, setLoading] = useState(false);


    const [studentTransfer, setstudentTransfer] = useState([])


    // Estado para controlar o modal
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [transferredStudent, setTransferredStudent] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school");
            setId_class(sessionStorage.getItem("ClassInformation"));
            setstudentTransfer(sessionStorage.getItem("studentTransfer"));
            const resStudent = await GetStudent(JSON.parse(idSchool));
            const currentYear = new Date().getFullYear().toString();

            const currentYearClasses = resStudent.data.data.id_class.filter((res) => {
                // Verifica se o ano da turma corresponde ao ano atual
                if (res.year.trim() === currentYear) {
                    return res; // Retorna os estudantes dessa turma
                }
                return null
            }).map(res => res.id_student); // Após o filtro, mapeia para obter um array de estudantes

            const $tudent = await resStudent.data.data.id_student.map(res => {
                return res
            })
            console.log("$tudent", $tudent)

            //esta acontecendo erro ao renderizar alunos disponiveis para adicionar em trumas

            // Passo 1: Criar um array com todos os IDs de estudantes já cadastrados em turmas
            /*const registeredStudentIds = currentYearClasses.flat(); // Isso achata todos os arrays de IDs em um único array

            // Passo 2: Filtrar os estudantes para excluir os que já estão registrados
            const studentsToDisplay = $tudent.filter((val) => {
                // Verifica se o aluno não está cadastrado em nenhuma turma
                if (!registeredStudentIds.includes(val._id)) {
                    return val
                }
                return null
            });*/

            // Passo 3: Exibir os estudantes restantes
            //console.log("Estudantes disponíveis para adicionar:", studentsToDisplay);

            console.log("cla$$", currentYearClasses)

            //esta acontecendo erro ao renderizar alunos disponiveis para adicionar em trumas
            //setStudent(studentsToDisplay);

            setStudent($tudent);
            setLoading(false);
        })();
    }, []);

    const normalizeString = (str) => {
        return str
            .normalize("NFD") // Separa caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/[^\w\s]/gi, "") // Remove pontuações
            .toUpperCase(); // Converte para maiúsculas
    };

    student.sort((a, b) => normalizeString(a.name).localeCompare(normalizeString(b.name)));

    console.log("studentTransfer", studentTransfer)
    const addStudent = async (student) => {
        setLoading(true);
        sessionStorage.setItem("id_student", student._id);
        setSerie(sessionStorage.getItem("serieClass"));
        setName_student(student.name);
        setId_student(student._id);
        // Verifica se o aluno está na lista de transferidos
        if (studentTransfer.includes(student._id)) {
            setName_student(null)
            setShowReturnModal(true); // Exibe a janela de aviso
            setTransferredStudent(student); // Armazena o aluno
        }

        setLoading(false);
    };

    // Função para retornar o aluno à turma
    const returnStudent = () => {
        if (transferredStudent) {
            // Atualiza o status do aluno (implemente conforme sua lógica)
            const id_student = transferredStudent._id
            console.log("id_student", id_student, "id_class", id_class)
            const res = returnedStudent(id_student, id_class)
            if (res) {
                setShowReturnModal(false);
                window.location.reload()
            } else {
                alert('erro ao retornar aluno')
            }
        }
    };

    const SignClick = async () => {
        setLoading(true);
        const res = await addStdt(id_student, id_class);
        if (res) {
            setAdded(true);
        }
        setLoading(false);
    };

    const remove = () => {
        setAdded(false);
        setName_student('');
    };

    const Finish = () => {
        navigate(-1);
    };

    const Return = () => {
        setName_student('');
    };

    const Cancel = async () => {
        navigate(-1);
    }

    console.log("student add", student)

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Search>
                        <FormSearch>
                            <label>Buscar Aluno</label>
                            <AreaEmp>
                                <InputEmp
                                    type="text"
                                    placeholder="Buscar por nome"
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                />
                            </AreaEmp>
                        </FormSearch>
                    </Search>
                    {name_student && !showReturnModal && (
                        <Add>
                            {added ? (
                                <ModalContainer>
                                    <ModalContent>
                                        <Title>Aluno {name_student} foi adicionado ao {serie} </Title>
                                        <DivButtonAdd>
                                            <Btt01 onClick={remove}>
                                                Adicionar outro aluno
                                            </Btt01>
                                            <Btt01 onClick={Finish}>Finalizar</Btt01>
                                        </DivButtonAdd>
                                    </ModalContent>
                                </ModalContainer>
                            ) : (

                                <ModalContainer>
                                    <ModalContent>
                                        <Title>Adicionar {name_student} a turma {serie}</Title>
                                        <DivButtonAdd>
                                            <Btt01 onClick={SignClick}>Adicionar</Btt01>
                                            <Btt01 onClick={Return}>Voltar</Btt01>
                                        </DivButtonAdd>
                                    </ModalContent>
                                </ModalContainer>

                            )}
                        </Add>
                    )}
                    {!name_student && (
                        <List>
                            {student
                                .filter((val) =>
                                    busca ? normalizeString(val.name).includes(normalizeString(busca).toUpperCase()) : val
                                ).sort((a, b) => {
                                    // Colocar alunos com status 'ativo' no início, e 'transferido' ou 'inativo' no final
                                    if (a.status === "ativo" && b.status !== "ativo") {
                                        return -1; // 'ativo' vem antes
                                    } else if (b.status === "ativo" && a.status !== "ativo") {
                                        return 1; // 'ativo' vem depois
                                    } else {
                                        return 0; // Mantém a ordem original para os demais status
                                    }
                                })
                                .map((student) => (
                                    <Emp key={student._id} onClick={() => {
                                        if (student.status === "transferido" || student.status === "inativo") {
                                            alert(`O aluno ${student.name} está ${student.status}. Para adicioná-lo à turma, é necessário ir ate seu prefil e reativá-lo.`);
                                        } else {
                                            addStudent(student);
                                        }
                                    }}>
                                        <Span>{student.name}</Span>

                                        {/* Verificação do status do aluno */}
                                        {student.status === "ativo" && (
                                            <Span style={{ marginLeft: '10px', color: 'green', fontWeight: 'bold' }}>Ativo</Span>
                                        )}
                                        {student.status === "transferido" && (
                                            <Span style={{ marginLeft: '10px', color: 'orange', fontWeight: 'bold' }}>Transferido</Span>
                                        )}
                                        {student.status === "inativo" && (
                                            <Span style={{ marginLeft: '10px', color: 'red', fontWeight: 'bold' }}>Inativo</Span>
                                        )}
                                    </Emp>
                                ))}
                        </List>
                    )}
                    {showReturnModal && (
                        <ModalOverlay>
                            <ModalContent>
                                <p>
                                    O aluno <strong>{transferredStudent?.name}</strong> foi transferido. Deseja retorná-lo à turma?
                                </p>
                                <ButtonContainer>
                                    <button onClick={returnStudent}>Sim</button>
                                    <button onClick={() => setShowReturnModal(false)}>Cancelar</button>
                                </ButtonContainer>
                            </ModalContent>
                        </ModalOverlay>
                    )}


                </>
            )}
            <ButtonCancel>
                <Btt02 onClick={Cancel}>Cancelar</Btt02>
            </ButtonCancel>
        </Container>
    );
};

export default StudentAdd;
