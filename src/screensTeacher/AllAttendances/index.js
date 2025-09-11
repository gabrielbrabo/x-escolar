import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IndexAllAttendance } from "../../Api"; // endpoint do backend
import {
    Container,
    ContainerDivs,
    List,
    Span,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    EmpStdt,
    ModalOverlay,
    ModalContent,
    ModalButton,
    AddButton // vamos criar este styled-component
} from "./style";
import LoadingSpinner from "../../components/Loading";
import { SlActionUndo } from "react-icons/sl";
import { FiCheckCircle } from "react-icons/fi"; // ícone de check

const AllAttendance = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [attendance, setAttendance] = useState([]);
    //const [id_class, setId_class] = useState(null);
    const [searchDate, setSearchDate] = useState("");

    const [id_teacher, setId_teacher] = useState('')
    const [RegentTeacher, setclassRegentTeacher] = useState([]);
    const [physicalEducation, setphysicalEducationTeacher] = useState([]);

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idClass = sessionStorage.getItem("class-info");
            const idTeacher = JSON.parse(localStorage.getItem("Id_employee") || '""'); // Remove aspas extras
            const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
            const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");
            setId_teacher(idTeacher);
            setclassRegentTeacher(JSON.parse(classRegentTeacher))
            setphysicalEducationTeacher(JSON.parse(physicalEducationTeacher))

            //setId_class(idClass);

            try {
                const res = await IndexAllAttendance({ id_class: idClass });
                console.log("res attendance", res)
                if (res && res.data) {
                    setAttendance(res.data.data);
                }
            } catch (err) {
                console.error("Erro ao buscar chamadas:", err);
            } finally {
                setLoading(false);
            }
            sessionStorage.removeItem("selectedDate")
            sessionStorage.removeItem("day")
            sessionStorage.removeItem("month")
            sessionStorage.removeItem("year")
        })();
    }, []);

    const Return = () => navigate(-1);
    const messageButtonClick = () => navigate(-1);

    const handleAddAttendance = () => {
        navigate('/attendance'); // substitua pela rota real de cadastro
    };

    const handleClickAttendance = (item) => {
        if (item.id_teacher !== id_teacher) {
            setShowModal(true); // abre modal em vez de alert
            return;
        }
        // Armazenar os dados da chamada no sessionStorage
        sessionStorage.setItem("selectedDate", item.dateKey);
        sessionStorage.setItem("day", item.day);
        sessionStorage.setItem("month", item.month);
        sessionStorage.setItem("year", item.year);

        // Navegar para a página de chamada
        navigate('/attendance'); // substitua pela rota real da página de chamada
    };

    // Filtrar de acordo com tipo de professor
    const filteredByTeacherType = attendance.filter(item => {
        const isPE = item.isPhysicalEducation; // true/false ou undefined
        if (physicalEducation === id_teacher) {
            // Se for professor de Ed. Física, pega só as chamadas com isPhysicalEducation: true
            return isPE === true;
        } else if (RegentTeacher === id_teacher) {
            // Se for professor regente, pega chamadas com isPhysicalEducation: false ou undefined
            return isPE === false || isPE === undefined;
        }
        return true; // fallback, caso nenhum tipo definido
    });

    // Agora gerar a lista única a partir do filteredByTeacherType
    const uniqueAttendance = [
        ...new Map(
            filteredByTeacherType
                .filter(item => item)
                .sort((a, b) => new Date(b.year, b.month - 1, b.day) - new Date(a.year, a.month - 1, a.day))
                .map((item) => {
                    const day = String(item.day).padStart(2, "0");
                    const month = String(item.month).padStart(2, "0");
                    const dateKey = `${day}/${month}/${item.year}`;
                    return [dateKey, { ...item, dateKey }];
                })
        ).values()
    ];


    const filteredAttendance = searchDate
        ? uniqueAttendance.filter(item => {
            const [year, month, day] = searchDate.split("-");
            const formatted = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
            return item.dateKey === formatted;
        })
        : uniqueAttendance;

    console.log("filteredAttendance", filteredAttendance)

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ContainerDivs>
                    <SlActionUndo fontSize={"30px"} onClick={Return} />
                    <h2>Chamadas realizadas</h2>

                    {/* Campo de busca por data */}
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Buscar chamada
                        </label>
                        <input
                            type="date"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                            style={{ padding: "10px", width: "80%", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "15px" }}
                        />
                    </div>

                    {/* Botão para adicionar nova chamada */}
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
                        <AddButton onClick={handleAddAttendance}>
                            Fazer nova chamada
                        </AddButton>
                    </div>

                    {filteredAttendance.length > 0 ? (
                        <>
                            <div style={{ marginBottom: "15px", fontWeight: "bold" }}>
                                Total de chamadas: {filteredAttendance.length}
                            </div>
                            <List>
                                {filteredAttendance.map((item, idx) => (
                                    <EmpStdt key={idx} onClick={() => handleClickAttendance(item)} style={{ cursor: "pointer" }}>
                                        <Span>📅 {item.dateKey}</Span>
                                        <FiCheckCircle size={20} color="green" style={{ marginLeft: "8px" }} />
                                    </EmpStdt>

                                ))}
                            </List>
                        </>
                    ) : (
                        <p>Nenhuma chamada encontrada para esta data.</p>
                    )}

                    <ToGoBack onClick={messageButtonClick}>
                        <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                        <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                    </ToGoBack>

                    {/* Modal de aviso */}
                    {showModal && (
                        <ModalOverlay>
                            <ModalContent>
                                <h3>⚠️ Acesso restrito</h3>
                                <p>Você não pode acessar essa chamada, pois foi registrada por outro professor.</p>
                                <ModalButton onClick={() => setShowModal(false)}>Entendido</ModalButton>
                            </ModalContent>
                        </ModalOverlay>
                    )}
                </ContainerDivs>
            )}
        </Container>
    );
};

export default AllAttendance;
