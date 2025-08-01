import React, { useState, useEffect } from 'react';
import { RecordClassTaughtDaily, updateRecordClassTaught, getSchoolYear, /*updateRecordClassTaughtADM,*/ getIstQuarter, getIIndQuarter, getIIIrdQuarter, getIVthQuarter, getVthQuarter, getVIthQuarter } from '../../Api';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    ContainerDivs,
    //CtnrBtt,
    StudentSection,
    Table,
    ContainerTable,
    TableRow,
    Span,
    DateCell,
    InfoText,
    Button,
    //Button02,
    ButtonEdit,
    DescriptionCell,
    HiddenOnPrint,
    PrintStyleClasses,
    ToGoBack,
    SignMessageButtonTextBold,
    SignMessageButtonText,
    DataBimonthly,
    EditContainer,
    ErrorMessage,
} from './style';
import LoadingSpinner from '../../components/Loading';

import ReactQuill from 'react-quill';

const Grade = () => {
    const navigate = useNavigate();

    const [positionAtSchool, setPositionAtSchool] = useState(null);

    const [startd, setStartd] = useState("");
    const [startm, setStartm] = useState("");
    const [starty, setStarty] = useState("");
    const [endd, setEndd] = useState("");
    const [endm, setEndm] = useState("");
    const [endy, setEndy] = useState("");

    const [nameSchool, setnameSchool] = useState("");
    const [id_teacher, setid_teacher] = useState("");
    const [id_class, setid_class] = useState("");
    const [bimonthlyDaily, setbimonthlyDaily] = useState([]);

    const [loading, setLoading] = useState(false);
    //const [isTeacher, setIsTeacher] = useState([]);
    const [recordClassTaught, setRecordClassTaught] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [printing, setPrinting] = useState(false); // Novo estado para controlar o modo de impressão

    const [RegentTeacher, setclassRegentTeacher] = useState([]);
    const [RegentTeacher02, setclassRegentTeacher02] = useState([]);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingId, setEditingId] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const position = localStorage.getItem('position_at_school');
            const SelectbimonthlyDaily = JSON.parse(sessionStorage.getItem("Selectbimonthly-daily"));
            const SelectteacherDaily = JSON.parse(sessionStorage.getItem("Selectteacher-daily"));
            const Nameclass = JSON.parse(sessionStorage.getItem("Nameclass-daily"));
            const SelectclassDaily = sessionStorage.getItem("Selectclass-daily");
            const idSchool = SelectteacherDaily.id_school;
            const schoolYear = await getSchoolYear(idSchool._id)
            const year = schoolYear.data.data

            setPositionAtSchool(position);
            setnameSchool(SelectteacherDaily.id_school.name);
            setid_teacher(SelectteacherDaily._id);
            setid_class(SelectclassDaily);
            setbimonthlyDaily(SelectbimonthlyDaily.bimonthly);
            //setnameTeacher(SelectteacherDaily.name);
            //setnameClass(Nameclass.serie);

            const Employee02 = await Nameclass.classRegentTeacher02.find(res => {
                return res
            })
            const Employee = await Nameclass.classRegentTeacher.find(res => {
                return res
            })

            setclassRegentTeacher(Employee)
            setclassRegentTeacher02(Employee02)

            if (SelectbimonthlyDaily.bimonthly === "1º BIMESTRE") {
                const IstQuarter = await getIstQuarter(year, idSchool);
                const res = IstQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
            }
            if (SelectbimonthlyDaily.bimonthly === "2º BIMESTRE") {
                const IIndQuarter = await getIIndQuarter(year, idSchool);
                const res = IIndQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
            }
            if (SelectbimonthlyDaily.bimonthly === "3º BIMESTRE") {
                const IIIrdQuarter = await getIIIrdQuarter(year, idSchool);
                const res = IIIrdQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
            }
            if (SelectbimonthlyDaily.bimonthly === "4º BIMESTRE") {
                const IVthQuarter = await getIVthQuarter(year, idSchool);
                const res = IVthQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
            }
            if (SelectbimonthlyDaily.bimonthly === "5º BIMESTRE") {
                const VthQuarter = await getVthQuarter(year, idSchool);
                const res = VthQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
            }
            if (SelectbimonthlyDaily.bimonthly === "6º BIMESTRE") {
                const VIthQuarter = await getVIthQuarter(year, idSchool);
                const res = VIthQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
            }

            if (year && id_teacher && id_class && startd && startm && starty && endd && endm && endy) {

                //const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
                //const classRegentTeacher02 = sessionStorage.getItem("classRegentTeacher02");

                /*if (RegentTeacher02 === id_teacher) {
                    const res = await RecordClassTaughtDaily(year, RegentTeacher, id_class, startd, startm, starty, endd, endm, endy)
                    console.log('classes', res)
                    if (res) {
                        setRecordClassTaught(res.data.data);
                    }
                } else {*/
                    const res = await RecordClassTaughtDaily(year, id_teacher, id_class, startd, startm, starty, endd, endm, endy)
                    console.log('classes', res)
                    if (res) {
                        setRecordClassTaught(res.data.data);
                    }
                //}
                //setId_employee(JSON.parse(id_employee));

                //const resClass = await clssInfo(id_class);
                //const isTeacher = resClass.data.data.find(res => res)?.id_employee.find(res => res)?._id;

                setExpandedRows([]);
                //setIsTeacher(isTeacher);
                setLoading(false);
            }
            setLoading(false);
        })();
    }, [id_class, id_teacher, startd, startm, starty, endd, endm, endy, RegentTeacher, RegentTeacher02]);

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

    /*const handlePrint = () => {

        // Expande todas as descrições antes de imprimir
        setExpandedRows(recordClassTaught.map((_, index) => index));

        const printContent = document.getElementById('print-area');
        //const originalContent = document.body.innerHTML;

        // Aguarda o estado ser atualizado antes de imprimir
        setTimeout(() => {// Substitui o conteúdo do body apenas pelo conteúdo da área de impressão
            document.body.innerHTML = printContent.innerHTML;
            window.print();
            //document.body.innerHTML = originalContent;
            window.location.reload(); // Recarrega a página para restaurar os eventos e estados do React

            // Reseta a expansão após 10 segundos da impressão
            setTimeout(() => {
                setExpandedRows([]);
            }, 10000); // 10000ms = 10 segundos
        }, 0);
    };*/

    const getDescriptionPreview = (description) => {
        const maxLength = 100;
        return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
    };

    const handleEdit = async (index, res) => {
        setDay(`${res.day}`);
        setMonth(`${res.month}`);

        setEditingIndex(index);
        setEditingId(res._id);
        setEditedDescription(res.description);
    }

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

    const messageButtonClick = () => {
        navigate(-1);
    };

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ContainerDivs id='print-area'>
                    <PrintStyleClasses >
                        <StudentSection id="printable-content">
                            <h2>Registros de Aulas Lecionadas</h2>
                            <h3>{bimonthlyDaily}</h3>
                            <span><strong>Escola:</strong> {nameSchool}</span>
                            <DataBimonthly>
                                <span>
                                    <strong>Início:</strong> {String(startd).padStart(2, '0')}/{String(startm).padStart(2, '0')}/{starty}
                                </span>
                                <span>
                                    <strong>Término:</strong> {String(endd).padStart(2, '0')}/{String(endm).padStart(2, '0')}/{endy}
                                </span>
                            </DataBimonthly>

                            {/*<CtnrBtt>
                                <Button02 className='no-print' onClick={handlePrint} style={{ marginBottom: '15px' }}>Imprimir</Button02>
                            </CtnrBtt>*/}
                            <Table>

                                <h4 className='total-aulas-lecionadas'>Total de aulas lecionadas: {recordClassTaught.length}</h4>
                                <>
                                    {recordClassTaught.length > 0 && !null ? (
                                        recordClassTaught
                                            .sort((a, b) => {
                                                const dateA = new Date(a.year, a.month - 1, a.day);
                                                const dateB = new Date(b.year, b.month - 1, b.day);
                                                return dateA - dateB; // ordem crescente
                                            })
                                            .map((res, index) => (
                                                <React.Fragment key={index}>
                                                    <ContainerTable>
                                                        <Span>
                                                            <div>Professor: <p>{res.id_teacher.name}</p></div>
                                                            {/*<div>Professor 02: <p>{res.id_teacher02?.name || '---'}</p></div>*/}
                                                            <div>Turma: <p>{res.id_class.serie}</p></div>
                                                        </Span>

                                                        <TableRow >
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
                                                                    {expandedRows.includes(index) && positionAtSchool === 'DIRETOR/SUPERVISOR' && (
                                                                        <Button onClick={() => handleEdit(index, res)} className={HiddenOnPrint}>
                                                                            Editar
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
                        </StudentSection>
                    </PrintStyleClasses>
                    <ToGoBack onClick={messageButtonClick}>
                        <SignMessageButtonText>Voltar para o</SignMessageButtonText>
                        <SignMessageButtonTextBold>Perfil do Professor</SignMessageButtonTextBold>
                    </ToGoBack>
                </ContainerDivs>
            )
            }
        </Container >
    );
};

export default Grade;
