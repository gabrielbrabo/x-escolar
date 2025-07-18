import React, { useState, useEffect } from 'react';
import { IndexIndividualForm, FormEdit, getIstQuarter, getIIndQuarter, getIIIrdQuarter, getIVthQuarter, getVthQuarter, getVIthQuarter, getSchoolYear } from '../../Api';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    ContainerDivs,
    CtnrBtt,
    StudentSection,
    Table,
    ContainerTable,
    TableRow,
    Span,
    //DateCell,
    InfoText,
    Button,
    Button02,
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

const IndividualFormList = () => {
    const navigate = useNavigate();

    const [startd, setStartd] = useState("");
    const [startm, setStartm] = useState("");
    const [starty, setStarty] = useState("");
    const [endd, setEndd] = useState("");
    const [endm, setEndm] = useState("");
    const [endy, setEndy] = useState("");

    const [positionAtSchool, setPositionAtSchool] = useState(null);

    const [bimonthly, setBimonthly] = useState([])

    const [nameSchool, setnameSchool] = useState("");
    const [id_teacher, setid_teacher] = useState("");
    const [id_class, setid_class] = useState("");
    const [bimonthlyDaily, setbimonthlyDaily] = useState([]);

    const [loading, setLoading] = useState(false);
    //const [isTeacher, setIsTeacher] = useState([]);
    const [IndividualForm, setIndividualForm] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [printing, setPrinting] = useState(false); // Novo estado para controlar o modo de impressão

    const [RegentTeacher, setclassRegentTeacher] = useState([]);
    const [RegentTeacher02, setclassRegentTeacher02] = useState([]);
    //const [physicalEducation, setphysicalEducationTeacher] = useState([]);

    //const [formData, setFormData] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [update_idForm, setEditingId] = useState();
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

            //const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
            //const classRegentTeacher02 = sessionStorage.getItem("classRegentTeacher02");
            //const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");

            //setclassRegentTeacher(JSON.parse(classRegentTeacher))
            //setclassRegentTeacher02(JSON.parse(classRegentTeacher02))

            //if (!classRegentTeacher && !classRegentTeacher02) {
            const Employee02 = await Nameclass.classRegentTeacher02.find(res => {
                return res
            })
            const Employee = await Nameclass.classRegentTeacher.find(res => {
                return res
            })

            setclassRegentTeacher(Employee)
            setclassRegentTeacher02(Employee02)
            //}

            if (SelectbimonthlyDaily.bimonthly === "1º BIMESTRE") {
                const IstQuarter = await getIstQuarter(year, idSchool);
                const res = IstQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
                setBimonthly(SelectbimonthlyDaily.bimonthly)
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
                setBimonthly(SelectbimonthlyDaily.bimonthly)
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
                setBimonthly(SelectbimonthlyDaily.bimonthly)
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
                setBimonthly(SelectbimonthlyDaily.bimonthly)
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
                setBimonthly(SelectbimonthlyDaily.bimonthly)
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
                setBimonthly(SelectbimonthlyDaily.bimonthly)
            }
            console.log("bimonthly", bimonthly)
            if (year && id_class && bimonthly) {
                const bimestreMapping = {
                    "1º BIMESTRE": "id_iStQuarter",
                    "2º BIMESTRE": "id_iiNdQuarter",
                    "3º BIMESTRE": "id_iiiRdQuarter",
                    "4º BIMESTRE": "id_ivThQuarter",
                    "5º BIMESTRE": "id_vThQuarter",
                    "6º BIMESTRE": "id_viThQuarter",
                };

                const quarterIdKey = bimestreMapping[SelectbimonthlyDaily.bimonthly];
                if (quarterIdKey) {
                    try {
                        const idQuarter = SelectbimonthlyDaily._id;
                        if (RegentTeacher02 === id_teacher) {
                            const res = await IndexIndividualForm({
                                year,
                                id_class,
                                id_teacher: RegentTeacher,
                                [quarterIdKey]: idQuarter,
                            });
                            const resForm = res.data.filter(res => {
                                if (! null) {
                                    return (res)
                                } else {
                                    return (null)
                                }
                            })
                            setIndividualForm(resForm)
                        } else {
                            const res = await IndexIndividualForm({
                                year,
                                id_class,
                                id_teacher,
                                [quarterIdKey]: idQuarter,
                            });
                            const resForm = res.data.filter(res => {
                                if (! null) {
                                    return (res)
                                } else {
                                    return (null)
                                }
                            })
                            setIndividualForm(resForm)
                        }
                        //console.log("individual form", res);
                        //console.log("Form", resForm);
                    } catch (error) {
                        console.error("Erro ao buscar dados:", error);
                    }
                }
                setLoading(false);
            }
        })();
    }, [bimonthly, id_class, id_teacher, startd, startm, starty, endd, endm, endy, RegentTeacher, RegentTeacher02]);
    console.log("IndexForm", IndividualForm)
    /*IndividualForm.sort(function (a, b) {
        if (a.id_student.name < b.id_student.name) return -1
        if (a.id_student.name > b.id_student.name) return 1
        return 0
    })*/

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
        setExpandedRows(IndividualForm.map((_, index) => index));

        // Aguarda o estado ser atualizado antes de imprimir
        setTimeout(() => {
            window.print();

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

    const messageButtonClick = () => {
        navigate(-1);
    };

    console.log("res form", IndividualForm)

    const handlePrint = () => {

        // Expande todas as descrições antes de imprimir
        setExpandedRows(IndividualForm.map((_, index) => index));

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
    };

    const handleEdit = async (index, res) => {
        setEditingIndex(index);
        setEditingId(res._id);
        setEditedDescription(res.description);
    }

    const handleSaveEdit = async () => {
        try {
            const res = await FormEdit({ update_idForm, editedDescription });

            if (res) {
                alert('Ficha atualizada com sucesso!');
                setLoading(true);

                setEditingIndex(null);

                setErrorMessage('');
                window.location.reload()
            } else {
                setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            console.error("Erro ao atualizar aula:", error);
            setErrorMessage('Ocorreu um erro ao salvar a edição. Tente novamente.');
        }
    };
    console.log("editingId", update_idForm)
    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ContainerDivs id='print-area'>
                    <PrintStyleClasses>
                        <StudentSection id="printable-content">
                            <h2>Fichas Individuais de Alunos</h2>
                            <h3>{bimonthlyDaily}</h3>
                            <span><strong>Escola:</strong> {nameSchool}</span>
                            <DataBimonthly >
                                <span>
                                    <strong>Início:</strong> {String(startd).padStart(2, '0')}/{String(startm).padStart(2, '0')}/{starty}
                                </span>
                                <span>
                                    <strong>Término:</strong> {String(endd).padStart(2, '0')}/{String(endm).padStart(2, '0')}/{endy}
                                </span>
                            </DataBimonthly>
                            <CtnrBtt>
                                <Button02 className='no-print' onClick={handlePrint} style={{ marginBottom: '15px' }}>Imprimir</Button02>
                            </CtnrBtt>
                            <Table>
                                <>
                                    {IndividualForm.length > 0 ? (
                                        IndividualForm
                                            .sort((a, b) => a.id_student.name.localeCompare(b.id_student.name))
                                            .map((res, index) => (
                                                <React.Fragment key={index}>
                                                    <ContainerTable>
                                                        <Span>
                                                            <div>Professor 01: <p>{res.id_teacher.name}</p></div>
                                                            {res.id_teacher02 && (
                                                                <div>Professor 02: <p>{res.id_teacher02.name}</p></div>
                                                            )}
                                                            <div>Turma: <p>{res.id_class.serie}</p></div>
                                                            <div>Aluno: <p>{res.id_student.name}</p></div>
                                                        </Span>

                                                        <TableRow>
                                                            {/*<DateCell>{`${res.day}/${res.month}/${res.year}`}</DateCell>*/}
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
                    <ToGoBack onClick={messageButtonClick} className="no-print">
                        <SignMessageButtonText>Voltar para o</SignMessageButtonText>
                        <SignMessageButtonTextBold>Perfil do Professor</SignMessageButtonTextBold>
                    </ToGoBack>
                </ContainerDivs>
            )
            }
        </Container >
    );
};

export default IndividualFormList;
