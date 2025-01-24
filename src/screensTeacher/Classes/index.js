import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import {
    indexRecordClassTaught,
    clssInfo,
    updateRecordClassTaught,
    getIstQuarter,
    getIIndQuarter,
    getIIIrdQuarter,
    getIVthQuarter,
} from '../../Api';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    ContainerDivs,
    StudentSection,
    Table,
    ContainerTable,
    TableRow,
    Span,
    DateCell,
    InfoText,
    Button,
    ButtonEdit,
    DescriptionCell,
    Register,
    ButtonReg,
    EditContainer,
    ErrorMessage,
    HiddenOnPrint,
    ToGoBack,
    SignMessageButtonTextBold,
    SignMessageButtonText,
} from './style';
import LoadingSpinner from '../../components/Loading';

const Grade = () => {
    const navigate = useNavigate();
    const [open, setopen] = useState()
    const [loading, setLoading] = useState(false);
    const [/*isTeacher*/, setIsTeacher] = useState([]);
    const [id_employee, setId_employee] = useState([]);
    const [recordClassTaught, setRecordClassTaught] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingId, setEditingId] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [printing, setPrinting] = useState(false); // Novo estado para controlar o modo de impressão

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_emp = localStorage.getItem("Id_employee");
            const id_class = sessionStorage.getItem("class-info");
            const year = new Date().getFullYear();
            const res = await indexRecordClassTaught(year, id_class, JSON.parse(id_emp));
            console.log("res", res)
            setRecordClassTaught(res.data.data || []);
            setId_employee(JSON.parse(id_emp));

            const resClass = await clssInfo(id_class);
            const isTeacher = resClass.data.data.find(res => res)?.id_employee.find(res => res)?._id;
            console.log("isTeacher", isTeacher)
            console.log("id_emp", id_emp)
            setExpandedRows([]);
            setIsTeacher(isTeacher);
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        const handleBeforePrint = () => {
            setPrinting(true);
        };

        const handleAfterPrint = () => {
            setPrinting(false);
        };

        window.addEventListener('beforeprint', handleBeforePrint);
        window.addEventListener('afterprint', handleAfterPrint);

        return () => {
            window.removeEventListener('beforeprint', handleBeforePrint);
            window.removeEventListener('afterprint', handleAfterPrint);
        };
    }, []);

    const toggleRowExpansion = (index) => {
        if (!printing) { // Expansão manual permitida apenas quando não está no modo de impressão
            setExpandedRows((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
            );
        }
    };

    const handleEdit = async (index, res) => {
        setDay(`${res.day}`);
        setMonth(`${res.month}`);
        const fetchQuarters = async () => {
            const idSchool = sessionStorage.getItem("id-school");
            const year = new Date().getFullYear();
            const dateSelected = new Date(year, res.month - 1, res.day);

            const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
            const IIndQuarter = await getIIndQuarter(year, JSON.parse(idSchool))
            const IIIrdQuarter = await getIIIrdQuarter(year, JSON.parse(idSchool))
            const IVthQuarter = await getIVthQuarter(year, JSON.parse(idSchool))

            const getQuarterStatus = (quarterData) => {
                return quarterData.data.data
                    .map((res) => {
                        const startDate = new Date(year, res.startmonth - 1, res.startday);
                        const endDate = new Date(year, res.endmonth - 1, res.endday);
                        if (dateSelected >= startDate && dateSelected <= endDate) {
                            console.log("startDade:", startDate);
                            console.log("endDate:", endDate);
                            console.log("dateSelected:", dateSelected);
                            return res.statusSupervisor;
                        }
                        return null;
                    })
                    .find((res) => res); // Retorna o primeiro status válido encontrado
            };

            const dataIstQuarter = getQuarterStatus(IstQuarter);
            const dataIIndQuarter = getQuarterStatus(IIndQuarter);
            const dataIIIrdQuarter = getQuarterStatus(IIIrdQuarter);
            const dataIVthQuarter = getQuarterStatus(IVthQuarter);

            // Retorna os dados encontrados em um objeto

            return {
                IstQuarter: dataIstQuarter || null,
                IIndQuarter: dataIIndQuarter || null,
                IIIrdQuarter: dataIIIrdQuarter || null,
                IVthQuarter: dataIVthQuarter || null,
            };
        };
        // Chamando a função e lidando com o resultado
        try {
            // Obtém os resultados de forma assíncrona
            const result = await fetchQuarters();

            // Define `open` com base nos resultados
            const openQuarter =
                result.IstQuarter === "aberto" ? "IstQuarter" :
                    result.IIndQuarter === "aberto" ? "IIndQuarter" :
                        result.IIIrdQuarter === "aberto" ? "IIIrdQuarter" :
                            result.IVthQuarter === "aberto" ? "IVthQuarter" : null;

            if (openQuarter) {
                console.log(`Bimestre aberto: ${openQuarter}`);
                setopen("aberto");
                setEditingIndex(index);
                setEditingId(res._id);
                setEditedDescription(res.description);
            } else {
                alert("Edição não permitida. Para editar a aula, contate o supervisor.");
            }

        } catch (error) {
            console.error("Erro ao buscar os trimestres:", error);
            alert("Erro ao buscar informações. Tente novamente mais tarde.");
        }
        fetchQuarters();

    };
    console.log("open", open)
    console.log("id_employee", id_employee)
    const handleSaveEdit = async () => {
        try {
            const res = await updateRecordClassTaught(editedDescription, day, month, editingId);

            if (res.data) {
                alert('Aula atualizada com sucesso!');
                setLoading(true);
                setRecordClassTaught((prev) =>
                    prev.map((item) =>
                        item._id === editingId ? { ...item, description: editedDescription, day: day, month: month } : item
                    )
                );

                setEditingIndex(null);
                setErrorMessage('');
                setLoading(false);
            } else {
                setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            console.error("Erro ao atualizar aula:", error);
            setErrorMessage('Ocorreu um erro ao salvar a edição. Tente novamente.');
        }
    };

    const handlePrint = () => {
        // Expande todas as descrições antes de imprimir
        setExpandedRows(recordClassTaught.map((_, index) => index));

        // Aguarda o estado ser atualizado antes de imprimir
        setTimeout(() => {
            window.print();

            // Reseta a expansão após 10 segundos da impressão
            setTimeout(() => {
                setExpandedRows([]);
            }, 10000); // 10000ms = 10 segundos
        }, 0);
    };

    const getDescriptionPreview = (description) => {
        const maxLength = 100;
        return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
    };

    const messageButtonClick = () => {
        navigate(-1);
    };

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ContainerDivs>
                    <StudentSection>
                        <h2>Registros de Aulas Lecionadas</h2>
                        <Button onClick={handlePrint} style={{ marginBottom: '15px' }}>Imprimir</Button>
                        <Table>
                            <>
                                {//isTeacher === id_employee && (
                                    <Register>
                                        <ButtonReg onClick={() => navigate('/record-class-taught')} className={HiddenOnPrint}>
                                            Registrar Nova Aula
                                        </ButtonReg>
                                    </Register>
                                    //                                )
                                }
                                {recordClassTaught.length > 0 ? (
                                    recordClassTaught
                                        .sort((a, b) => new Date(b.year, b.month - 1, b.day) - new Date(a.year, a.month - 1, a.day))
                                        .map((res, index) => (
                                            <React.Fragment key={index}>
                                                <ContainerTable>
                                                    <Span>
                                                        <div>Professor: <p>{res.id_teacher.name}</p></div>
                                                        <div>Turma: <p>{res.id_class.serie}</p></div>
                                                    </Span>

                                                    <TableRow>
                                                        <DateCell>{`${res.day}/${res.month}/${res.year}`}</DateCell>
                                                        <DescriptionCell>
                                                            <div className={`description ${expandedRows.includes(index) ? 'expanded' : 'collapsed'}`}>
                                                                <div
                                                                    style={{
                                                                        whiteSpace: 'pre-wrap',
                                                                        wordWrap: 'break-word',
                                                                    }}
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: expandedRows.includes(index) || printing ? res.description : getDescriptionPreview(res.description)
                                                                    }}
                                                                />
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                {!printing && (
                                                                    <Button onClick={() => toggleRowExpansion(index)} className={HiddenOnPrint}>
                                                                        {expandedRows.includes(index) ? 'Ver Menos' : 'Ver Mais'}
                                                                    </Button>
                                                                )}
                                                                {expandedRows.includes(index) && /*isTeacher === id_employee && */(
                                                                    <Button onClick={() => handleEdit(index, res)} className={HiddenOnPrint}>
                                                                        Editar
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </DescriptionCell>
                                                    </TableRow>

                                                    {editingIndex === index && (
                                                        <EditContainer>
                                                            <h3>Editando Aula</h3>
                                                            <input
                                                                type="text"
                                                                value={`${day}/${month}`}
                                                                onChange={(e) => {
                                                                    const [newDay, newMonth] = e.target.value.split('/');
                                                                    setDay(newDay);
                                                                    setMonth(newMonth);
                                                                }}
                                                                placeholder="Data (DD/MM)"
                                                            />
                                                            {/*<textarea
                                                                value={editedDescription}
                                                                onChange={(e) => setEditedDescription(e.target.value)}
                                                                placeholder="Descrição da aula"
                                                            />*/}
                                                            <ReactQuill
                                                                theme="snow"
                                                                modules={{
                                                                    toolbar: [
                                                                        [{ 'font': [] }],
                                                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                                        ['bold', 'italic', 'underline'],
                                                                        [{ 'color': [] }, { 'background': [] }],
                                                                        ['clean']
                                                                    ]
                                                                }}
                                                                value={editedDescription}
                                                                onChange={(e) => setEditedDescription(e)}
                                                                placeholder="Descrição da aula"
                                                                style={{ height: '300px' }}  // Define a altura aqui
                                                            />
                                                            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                                            <div className='BoxBtt'>
                                                                <ButtonEdit onClick={handleSaveEdit}>Salvar</ButtonEdit>
                                                                <ButtonEdit onClick={() => setEditingIndex(null)}>Cancelar</ButtonEdit>
                                                            </div>
                                                        </EditContainer>
                                                    )}
                                                </ContainerTable>
                                            </React.Fragment>
                                        ))
                                ) : (
                                    <InfoText>Não há nenhum registro</InfoText>
                                )}
                            </>
                        </Table>
                    </StudentSection>
                    <ToGoBack className={HiddenOnPrint} onClick={messageButtonClick}>
                        <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                        <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                    </ToGoBack>
                </ContainerDivs>
            )}
        </Container>
    );
};

export default Grade;
