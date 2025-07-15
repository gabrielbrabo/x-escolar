import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import {
    indexRecordClassTaught,
    clssInfo,
    updateRecordClassTaught,
    DestroyClass,
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
    ContainerDelet,
    DivButton
} from './style';
import LoadingSpinner from '../../components/Loading';

import { SlActionUndo } from "react-icons/sl";

const Grade = () => {
    const navigate = useNavigate();
    //const [open, setopen] = useState()
    const [loading, setLoading] = useState(false);
    const [/*isTeacher*/, setIsTeacher] = useState([]);
    const [$Class, set$Class] = useState([]);
    const [id_employee, setId_employee] = useState([]);
    const [yearclss, setyearclss] = useState('')
    const [recordClassTaught, setRecordClassTaught] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingId, setEditingId] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [RemoveClass, setRemoveClass] = useState(null);
    const [RemoveDayClass, setDayClass] = useState('');
    const [RemoveMonthClass, setMonthClass] = useState('');
    const [RemoveYearClass, setYearClass] = useState('');
    const [IdClass, setIdClass] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');

    //const [id_class, setId_class] = useState('');
    const [id_teacher, setId_teacher] = useState('')
    const [physicalEducation, setPhysicalEducationTeacher] = useState([]);


    const [errorMessage, setErrorMessage] = useState('');
    const [printing, setPrinting] = useState(false); // Novo estado para controlar o modo de impressão

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_emp = localStorage.getItem("Id_employee");
            const id_class = sessionStorage.getItem("class-info");
            //setId_class(id_class);
            //const year = new Date().getFullYear();

            const resClass = await clssInfo(id_class);
            set$Class(resClass)
            const $yearClass = resClass.data.data.find(clss => {
                return clss.year
            })
            setyearclss($yearClass)

            setId_teacher(id_emp);
            const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");

            //setclassRegentTeacher(JSON.parse(classRegentTeacher))
            //setclassRegentTeacher02(JSON.parse(classRegentTeacher02))
            setPhysicalEducationTeacher(physicalEducationTeacher)

            /*if (id_emp === classRegentTeacher02) {
                const res = await indexRecordClassTaught(year, id_class, JSON.parse(classRegentTeacher));
                console.log("res", res)
                setRecordClassTaught(res.data.data || []);
            } else {*/
            const res = await indexRecordClassTaught($yearClass.year, id_class, JSON.parse(id_emp));
            console.log("res", res)
            setRecordClassTaught(res.data.data || []);
            //}

            setId_employee(JSON.parse(id_emp));

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

    console.log("earclss", yearclss)

    const handleEdit = async (index, res) => {
        setDay(`${res.day}`);
        setMonth(`${res.month}`);

        const fetchQuarters = async () => {
            const idSchool = sessionStorage.getItem("id-school");
            const dateSelected = new Date(yearclss.year, res.month - 1, res.day);

            const IstQuarter = await getIstQuarter(yearclss.year, JSON.parse(idSchool));
            const IIndQuarter = await getIIndQuarter(yearclss.year, JSON.parse(idSchool));
            const IIIrdQuarter = await getIIIrdQuarter(yearclss.year, JSON.parse(idSchool));
            const IVthQuarter = await getIVthQuarter(yearclss.year, JSON.parse(idSchool));

            console.log("IIndQuarter:", IIndQuarter.data.data);

            const getQuarterStatus = (quarterData) => {
                return quarterData.data.data
                    .map((res) => {
                        const startDate = new Date(
                            Number(yearclss.year),
                            Number(res.startmonth) - 1,
                            Number(res.startday)
                        );
                        const endDate = new Date(
                            Number(yearclss.year),
                            Number(res.endmonth) - 1,
                            Number(res.endday)
                        );

                        console.log("Comparando:", { startDate, endDate, dateSelected });

                        if (dateSelected >= startDate && dateSelected <= endDate) {
                            return res.bimonthly;
                        }
                        return null;
                    })
                    .find((res) => res);
            };

            const dataIstQuarter = getQuarterStatus(IstQuarter);
            const dataIIndQuarter = getQuarterStatus(IIndQuarter);
            const dataIIIrdQuarter = getQuarterStatus(IIIrdQuarter);
            const dataIVthQuarter = getQuarterStatus(IVthQuarter);

            return {
                IstQuarter: dataIstQuarter || null,
                IIndQuarter: dataIIndQuarter || null,
                IIIrdQuarter: dataIIIrdQuarter || null,
                IVthQuarter: dataIVthQuarter || null,
            };
        };

        try {
            const result = await fetchQuarters();
            const turma = $Class.data.data[0];

            console.log("result", result)
            console.log("turma", turma)
            console.log("teacher", id_teacher)
            console.log("phydical", physicalEducation)

            let statusAtual = null;

            if (result.IstQuarter) {
                statusAtual = id_teacher !== physicalEducation
                    ? turma.dailyStatus["1º BIMESTRE"].regentTeacher
                    : turma.dailyStatus["1º BIMESTRE"].physicalEducationTeacher;
            }
            if (result.IIndQuarter) {
                statusAtual = id_teacher !== physicalEducation
                    ? turma.dailyStatus["2º BIMESTRE"].regentTeacher
                    : turma.dailyStatus["2º BIMESTRE"].physicalEducationTeacher;
            }
            if (result.IIIrdQuarter) {
                statusAtual = id_teacher !== physicalEducation
                    ? turma.dailyStatus["3º BIMESTRE"].regentTeacher
                    : turma.dailyStatus["3º BIMESTRE"].physicalEducationTeacher;
            }
            if (result.IVthQuarter) {
                statusAtual = id_teacher !== physicalEducation
                    ? turma.dailyStatus["4º BIMESTRE"].regentTeacher
                    : turma.dailyStatus["4º BIMESTRE"].physicalEducationTeacher;
            }

            console.log("Status do bimestre:", statusAtual);

            if (statusAtual === "aberto") {
                setEditingIndex(index);
                setEditingId(res._id);
                setEditedDescription(res.description);
            } else {
                alert("Edição não permitida. Para editar a aula, contate o Diretor ou Supervisor.");
            }

        } catch (error) {
            console.error("Erro ao verificar bimestre:", error);
            alert("Erro ao verificar bimestre. Tente novamente.");
        }
    };

    //console.log("open", open)
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

    const handleDestroy = async (res) => {
        setRemoveClass(res)
        setDayClass(res.day)
        setMonthClass(res.month)
        setYearClass(res.year)
        setIdClass(res._id)
    };
    const Destroy = async () => {
        const res = await DestroyClass(IdClass)
        if (res) {
            window.location.reload()
        }
    };

    const messageButtonClick = () => {
        navigate(-1);
    };

    const Return = () => {
        navigate(-1)
    };

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ContainerDivs>
                    {
                        !RemoveClass &&
                        <StudentSection>
                            <h2>Registros de Aulas Lecionadas</h2>
                            <DivButton>
                                <SlActionUndo fontSize={'30px'} onClick={Return} />
                                <Button onClick={handlePrint} style={{ marginBottom: '15px' }}>Imprimir</Button>
                            </DivButton>
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

                                    <p>Total de aulas: {recordClassTaught.length}</p>
                                    {recordClassTaught.length > 0 ? (
                                        recordClassTaught
                                            .sort((a, b) => new Date(b.year, b.month - 1, b.day) - new Date(a.year, a.month - 1, a.day))
                                            .map((res, index) => (
                                                <React.Fragment key={index}>
                                                    <ContainerTable>
                                                        <Span>
                                                            <div>Professor: <p>{res.id_teacher.name}</p></div>
                                                            {/*<div>Professor 02: <p>{res.id_teacher02?.name || '---'}</p></div>*/}
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
                                                                    {expandedRows.includes(index) && /*isTeacher === id_employee && */(
                                                                        <Button onClick={() => handleDestroy(res)} className={HiddenOnPrint}>
                                                                            Apagar
                                                                        </Button>
                                                                    )}
                                                                    {expandedRows.includes(index) && /*res.id_teacher._id === id_employee || res.id_teacher02 !== null && */(
                                                                        <Button onClick={() => handleEdit(index, res)} className={HiddenOnPrint}>
                                                                            Editar
                                                                        </Button>
                                                                    )}
                                                                    {!printing && (
                                                                        <Button onClick={() => toggleRowExpansion(index)} className={HiddenOnPrint}>
                                                                            {expandedRows.includes(index) ? 'Ver Menos' : 'Ver Mais'}
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </DescriptionCell>
                                                        </TableRow>

                                                        {editingIndex === index && (
                                                            <EditContainer>
                                                                <div className="modal-content">
                                                                    <h3>Editando Aula</h3>

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
                                                                        style={{
                                                                            height: 'auto', // aumentado de 250px para 350px
                                                                            maxHeight: '550px',
                                                                            overflow: 'auto',
                                                                            zIndex: 0,
                                                                            position: 'relative'
                                                                        }}
                                                                    />
                                                                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                                                    <div style={{ position: 'relative', zIndex: 10, marginTop: '30px', }} className='BoxBtt'>
                                                                        <ButtonEdit onClick={handleSaveEdit}>Salvar</ButtonEdit>
                                                                        <ButtonEdit onClick={() => setEditingIndex(null)}>Cancelar</ButtonEdit>
                                                                    </div>

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
                            <ToGoBack className={HiddenOnPrint} onClick={messageButtonClick}>
                                <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                                <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                            </ToGoBack>
                        </StudentSection>
                    }
                    {RemoveClass && (
                        <ContainerDelet>
                            <h2>Apagar aula</h2>
                            <h4>Tem certeza que deseja apagar a aula do dia {RemoveDayClass}/{RemoveMonthClass}/{RemoveYearClass}</h4>
                            {console.log("IdClass", IdClass)}
                            <div style={{ display: 'flex', gap: '100px' }}>
                                <ButtonEdit onClick={Destroy}>Apagar</ButtonEdit>
                                <ButtonEdit onClick={() => setRemoveClass(null)}>Cancelar</ButtonEdit>
                            </div>

                        </ContainerDelet>
                    )}

                </ContainerDivs>
            )}
        </Container>
    );
};

export default Grade;
