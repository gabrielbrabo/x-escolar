import React, { useState, useEffect } from 'react';
import { indexRecordClassTaught, clssInfo, updateRecordClassTaught } from '../../Api';
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
    DescriptionCell,
    Register,
    ButtonReg,
    EditContainer,
    ErrorMessage,
    HiddenOnPrint
} from './style';
import LoadingSpinner from '../../components/Loading';

const Grade = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isTeacher, setIsTeacher] = useState([]);
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
            const id_employee = localStorage.getItem("Id_employee");
            const id_class = sessionStorage.getItem("class-info");
            const year = new Date().getFullYear();
            const res = await indexRecordClassTaught(year, id_class);
            setRecordClassTaught(res.data.data || []);
            setId_employee(JSON.parse(id_employee));

            const resClass = await clssInfo(id_class);
            const isTeacher = resClass.data.data.find(res => res)?.id_employee.find(res => res)?._id;

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

    const handleEdit = (index, res) => {
        setEditingIndex(index);
        setEditingId(res._id);
        setEditedDescription(res.description);
        setDay(`${res.day}`);
        setMonth(`${res.month}`);
    };

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
            
            // Reseta a expansão após a impressão
            setExpandedRows([]);
        }, 0);
    };

    const getDescriptionPreview = (description) => {
        const maxLength = 100;
        return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
    };

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ContainerDivs>
                    <StudentSection>
                        <h2>Registros de Aulas Lecionadas</h2>
                        <Button onClick={handlePrint} style={{ marginBottom: '15px' }}>Imprimir Descrições</Button>
                        <Table>
                            <>
                                {isTeacher === id_employee && (
                                    <Register>
                                        <ButtonReg onClick={() => navigate('/record-class-taught')} className={HiddenOnPrint}>
                                            Registrar Nova Aula
                                        </ButtonReg>
                                    </Register>
                                )}
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
                                                                {expandedRows.includes(index) && isTeacher === id_employee && (
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
                                                            <textarea
                                                                value={editedDescription}
                                                                onChange={(e) => setEditedDescription(e.target.value)}
                                                                placeholder="Descrição da aula"
                                                            />
                                                            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                                            <Button onClick={handleSaveEdit}>Salvar</Button>
                                                            <Button onClick={() => setEditingIndex(null)}>Cancelar</Button>
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
                </ContainerDivs>
            )}
        </Container>
    );
};

export default Grade;
