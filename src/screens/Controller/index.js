import React, { useState, useEffect } from 'react';
import { updateSchoolYear, getSchoolYear, uploadLogoSchool, fetchLogo, deleteLogoSchool, hasOpenDiary, generateStudentsHistory } from '../../Api';
import {
    Container,
    ContainerYearControl,
    YearBox,
    ButtonNextYear,
    ModalOverlay,
    ModalContent,
    ModalButtons,
    UploadContainer,
    Preview,
    FileInput,
    ButtonUpload,
    ButtonDelete,
    ModalOverlayDelete,
    ModalBox,
    ModalButtonsDelete,
    TurmaList,
    TurmaItem,
    Button,
} from './style';
import LoadingSpinner from '../../components/Loading';

const Matter = () => {
    const [loading, setLoading] = useState(false);
    const currentYear = new Date().getFullYear();
    const [schoolYear, setSchoolYear] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalPrevious, setShowModalPrevious] = useState(false);

    const [showWarning, setShowWarning] = useState(false);
    const [turmasPendentes, setTurmasPendentes] = useState([]);

    const [logoFile, setLogoFile] = useState(null);
    const [logoUrl, setLogoUrl] = useState('');
    const [logoId, setlogoId] = useState('');
    const [uploading, setUploading] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const [previewUrl, setPreviewUrl] = useState('');

    const [finalizingYear, setFinalizingYear] = useState(false);
    const [finalizingMessage, setFinalizingMessage] = useState("");

    const [notification, setNotification] = useState("");

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = JSON.parse(sessionStorage.getItem('id-school'));
            const res = await getSchoolYear(idSchool);
            setSchoolYear(res.data.data);

            const cachedLogo = localStorage.getItem(`school-logo-${idSchool}`);
            const cachedLogoId = localStorage.getItem(`school-logo-id-${idSchool}`);

            if (cachedLogo && cachedLogoId) {
                console.log('busca pelo storage local')
                setLogoUrl(cachedLogo);
                setlogoId(cachedLogoId);
            } else {

                console.log('busca no s3')
                const logoRes = await fetchLogo(idSchool);

                console.log('busca logo', logoRes)
                if (logoRes?.url) {
                    setLogoUrl(logoRes.url);
                    setlogoId(logoRes._id);
                    localStorage.setItem(`school-logo-${idSchool}`, logoRes.url);
                    localStorage.setItem(`school-logo-id-${idSchool}`, logoRes._id);

                }
            }
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        const message = sessionStorage.getItem("notification");
        if (message) {
            showNotification(message);
            sessionStorage.removeItem("notification"); // limpa após exibir
        }
    }, []);

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(""), 4000); // desaparece depois de 4 segundos
    };

    const handleNextYearClick = () => {
        setShowModal(true);
    };

    const handlePreviousYearClick = () => {
        setShowModalPrevious(true);
    };

    const handleConfirmNextYear = async () => {

        setShowModal(false);
        setFinalizingYear(true);
        setFinalizingMessage("Verificando diários e preparando finalização do ano letivo...");
        const idSchool = JSON.parse(sessionStorage.getItem('id-school'));

        try {
            const hasOpen = await hasOpenDiary(idSchool, schoolYear);
            console.log("res has diary", hasOpen);

            // Se não existir nenhuma turma registrada → avançar normalmente
            if (!hasOpen?.data || !hasOpen.data.turmasComDiarioAberto) {
                const nextYear = schoolYear + 1;
                setFinalizingMessage("Finalizando ano letivo...");
                await updateSchoolYear(idSchool, nextYear);
                setFinalizingYear(false);
                setShowModal(false);
                // 🔹 Salva mensagem antes do reload
                sessionStorage.setItem("notification", `Ano letivo alterado para ${nextYear}`);
                window.location.reload();
                return;
            }

            // Se todos os diários estiverem fechados → avançar
            if (hasOpen.data.podeAvancar) {
                const nextYear = schoolYear + 1;

                setFinalizingMessage("Criando histórico anual dos alunos, aguarde...");
                // 🔹 1. Gera e salva históricos dos alunos
                await generateStudentsHistory(idSchool, schoolYear);

                setFinalizingMessage("Finalizando e atualizando ano letivo...");
                // 🔹 2. Avança o ano letivo
                await updateSchoolYear(idSchool, nextYear);

                setFinalizingYear(false);
                setShowModal(false);
                // 🔹 Salva mensagem antes do reload
                sessionStorage.setItem("notification", `Ano letivo alterado para ${nextYear}`);
                window.location.reload();
            } else {
                // ⚠️ Existem diários em aberto → abre modal de aviso
                setTurmasPendentes(hasOpen.data.turmasComDiarioAberto || []);
                setShowModal(false);
                setShowWarning(true);
                setFinalizingYear(false);
                setFinalizingMessage("");
            }
        } catch (err) {
            console.error("Erro ao verificar diário:", err);
            setFinalizingYear(false);
            setFinalizingMessage("");
            alert("Ocorreu um erro ao tentar avançar o ano letivo.");
        }
    };

    const handleConfirmPreviousYear = async () => {
        setLoading(true);
        const idSchool = JSON.parse(sessionStorage.getItem('id-school'));
        const previousYear = Number(schoolYear) - 1;

        await updateSchoolYear(idSchool, previousYear);
        setLoading(false);
        setShowModalPrevious(false);
        sessionStorage.setItem("notification", `Ano letivo alterado para ${previousYear}`);
        window.location.reload();
    };

    const handleCancel = () => {
        setShowModal(false);
        setShowModalPrevious(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type === "image/png") {
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);
            img.src = objectUrl;

            img.onload = () => {
                if (img.width > 500 || img.height > 500) {
                    alert("A imagem deve ter no máximo 500x500 pixels.");
                    setLogoFile(null);
                    setPreviewUrl('');
                    e.target.value = null;
                    URL.revokeObjectURL(objectUrl);
                    return;
                }

                setLogoFile(file);
                setPreviewUrl(objectUrl); // <- Adiciona preview temporário
            };
        } else {
            alert("Envie apenas arquivos PNG.");
            e.target.value = null;
            setLogoFile(null);
            setPreviewUrl('');
        }
    };

    const handleUploadLogo = async () => {
        if (logoUrl) {
            alert("Já existe uma logo enviada. Exclua ou substitua manualmente no sistema se necessário.");
            return;
        }

        if (!logoFile) {
            alert("Selecione uma imagem para enviar.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", logoFile); // campo 'file' para bater com backend

        try {
            // Passa o id da escola na URL (req.params)
            const idSchool = JSON.parse(sessionStorage.getItem("id-school"));
            const res = await uploadLogoSchool(idSchool, formData);
            if (res) {
                alert("Logo enviada com sucesso!");
                window.location.reload()
            }
        } catch (err) {
            console.error("Erro ao enviar logo:", err);
            alert("Erro ao enviar a logo.");
        }
        setUploading(false);
    };
    console.log("logourl", logoUrl)

    const handleConfirmDelete = async () => {
        setShowConfirm(false);
        await handleDeleteLogo(); // chama a função real
    };

    const handleDeleteLogo = async () => {
        // if (!window.confirm("Tem certeza que deseja remover a logo?")) return;

        const idSchool = JSON.parse(sessionStorage.getItem("id-school"));

        try {
            await deleteLogoSchool(logoId, idSchool); // logoId = ID do logo salvo
            localStorage.removeItem(`school-logo-${idSchool}`);
            localStorage.removeItem(`school-logo-id-${idSchool}`);
            setLogoUrl(""); // Remove visualmente
            alert("Logo removida com sucesso!");
        } catch (err) {
            console.error("Erro ao remover logo:", err);
            alert("Erro ao remover a logo.");
        }
    };

    return (
        <Container>

            {finalizingYear && (
                <ModalOverlay>
                    <ModalContent
                        style={{
                            width: '500px',
                            height: '150px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '20px',
                            background: 'white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        }}
                    >
                        <LoadingSpinner />
                        <p
                            style={{
                                marginTop: '25px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: '16px',
                                color: '#333',
                            }}
                        >
                            {finalizingMessage}
                        </p>
                    </ModalContent>
                </ModalOverlay>
            )}

            {loading ? (
                <LoadingSpinner />
            ) : (
                <>

                    {notification && (
                        <div
                            style={{
                                position: "fixed",
                                top: "70px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                backgroundColor: "#4caf50",
                                color: "white",
                                padding: "12px 24px",
                                borderRadius: "8px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                fontWeight: "bold",
                                zIndex: 9999,
                                transition: "opacity 0.5s",
                            }}
                        >
                            {notification}
                        </div>
                    )}
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <h2>Controle</h2>
                    </div>

                    <ContainerYearControl>
                        <h2>Ano Letivo</h2>
                        <YearBox>
                            <p>Ano Letivo Atual:</p>
                            <h1>{schoolYear}</h1>
                        </YearBox>
                        {schoolYear !== currentYear && (
                            <ButtonNextYear onClick={handleNextYearClick}>
                                Finalizar e Passar para o Próximo Ano Letivo
                            </ButtonNextYear>
                        )}
                        {schoolYear === currentYear && (
                            <ButtonNextYear onClick={handlePreviousYearClick}>
                                Voltar para o Ano Letivo Anterior
                            </ButtonNextYear>
                        )}
                    </ContainerYearControl>

                    {/* Upload da logo da escola */}
                    <UploadContainer>
                        <h2>Logo da Escola</h2>
                        {(logoUrl || previewUrl) && (
                            <Preview src={previewUrl || logoUrl} alt="Logo da escola" />
                        )}

                        {!logoUrl && (
                            <>
                                <FileInput type="file" accept="image/png" onChange={handleFileChange} />

                                <ButtonUpload
                                    onClick={handleUploadLogo}
                                    disabled={uploading}
                                >
                                    {uploading ? "Enviando..." : "Enviar Logo"}
                                </ButtonUpload>
                            </>
                        )}
                        {logoUrl && (
                            <ButtonDelete onClick={() => setShowConfirm(true)}>
                                Remover Logo
                            </ButtonDelete>
                        )}
                    </UploadContainer>
                </>
            )}

            {/* Modais */}
            {showModal && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>Atenção!</h3>
                        <p>
                            Verifique se todos os dados do ano letivo atual foram finalizados corretamente.
                            <br />
                            Ao alterar o ano letivo, todos os professores terão acesso apenas às turmas do novo ano letivo configurado,
                            e todas as informações exibidas no sistema serão referentes exclusivamente a este novo ano.
                            <br />
                            Esta alteração impacta todos os usuários do sistema.
                        </p>
                        <ModalButtons>
                            <button onClick={handleConfirmNextYear}>Confirmar</button>
                            <button onClick={handleCancel}>Cancelar</button>
                        </ModalButtons>
                    </ModalContent>
                </ModalOverlay>
            )}

            {showModalPrevious && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>⚠️ Atenção!</h3>
                        <p>
                            Antes de retroceder o ano letivo, verifique se isso é realmente necessário.
                            <br />
                            Essa ação impacta todos os professores e usuários, que verão apenas as turmas e informações do ano letivo configurado.
                        </p>
                        <ModalButtons>
                            <button onClick={handleConfirmPreviousYear}>Confirmar</button>
                            <button onClick={handleCancel}>Cancelar</button>
                        </ModalButtons>
                    </ModalContent>
                </ModalOverlay>
            )}

            {showConfirm && (
                <ModalOverlayDelete>
                    <ModalBox>
                        <p>Tem certeza que deseja excluir a logo da escola?</p>
                        <ModalButtonsDelete>
                            <button onClick={handleConfirmDelete}>Sim</button>
                            <button onClick={() => setShowConfirm(false)}>Cancelar</button>
                        </ModalButtonsDelete>
                    </ModalBox>
                </ModalOverlayDelete>
            )}

            {showWarning && (
                <ModalOverlay>
                    <ModalContent>
                        <h2>⚠️ Não é possível avançar</h2>
                        <p>
                            Para finalizar o ano letivo e avançar para o próximo ano, é necessário
                            que todos os diários estejam fechados.
                        </p>
                        <p>As seguintes turmas ainda possuem diários abertos:</p>
                        <TurmaList>
                            {turmasPendentes.map((turma) => (
                                <TurmaItem key={turma._id}>
                                    {turma.serie} - {turma.shift}
                                </TurmaItem>
                            ))}
                        </TurmaList>
                        <Button onClick={() => setShowWarning(false)}>Fechar</Button>
                    </ModalContent>
                </ModalOverlay>
            )}

        </Container>
    );
};

export default Matter;
