import React, { useState, useEffect } from 'react';
import { IndexIndividualForm, getIstQuarter, getIIndQuarter, getIIIrdQuarter, getIVthQuarter, getVthQuarter, getVIthQuarter } from '../../Api';
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
    DescriptionCell,
    HiddenOnPrint,
    PrintStyleClasses,
    ToGoBack,
    SignMessageButtonTextBold,
    SignMessageButtonText,
    DataBimonthly
} from './style';
import LoadingSpinner from '../../components/Loading';

const IndividualFormList = () => {
    const navigate = useNavigate();

    const [startd, setStartd] = useState("");
    const [startm, setStartm] = useState("");
    const [starty, setStarty] = useState("");
    const [endd, setEndd] = useState("");
    const [endm, setEndm] = useState("");
    const [endy, setEndy] = useState("");


    const [bimonthly, setBimonthly] = useState([])

    const [id_teacher, setid_teacher] = useState("");
    const [id_class, setid_class] = useState("");
    const [bimonthlyDaily, setbimonthlyDaily] = useState([]);

    const [loading, setLoading] = useState(false);
    //const [isTeacher, setIsTeacher] = useState([]);
    const [IndividualForm, setIndividualForm] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [printing, setPrinting] = useState(false); // Novo estado para controlar o modo de impressão

    useEffect(() => {
        (async () => {
            setLoading(true);
            const year = new Date().getFullYear().toString();
            const SelectbimonthlyDaily = JSON.parse(sessionStorage.getItem("Selectbimonthly-daily"));
            const SelectteacherDaily = JSON.parse(sessionStorage.getItem("Selectteacher-daily"));
            //const Nameclass = JSON.parse(sessionStorage.getItem("Nameclass-daily"));
            const SelectclassDaily = sessionStorage.getItem("Selectclass-daily");
            const idSchool = SelectteacherDaily.id_school;

            setid_teacher(SelectteacherDaily._id);
            setid_class(SelectclassDaily);
            setbimonthlyDaily(SelectbimonthlyDaily.bimonthly);
            //setnameTeacher(SelectteacherDaily.name);
            //setnameClass(Nameclass.serie);

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
            if ( year && id_class && bimonthly ) {
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
                        const res = await IndexIndividualForm({
                            year,
                            id_class,
                            [quarterIdKey]: idQuarter,
                        });
                        console.log("individual form", res.data);
                        setIndividualForm(res.data)
                    } catch (error) {
                        console.error("Erro ao buscar dados:", error);
                    }
                }
            }
            setLoading(false);
        })();
    }, [bimonthly, id_class, id_teacher, startd, startm, starty, endd, endm, endy]);

    IndividualForm.sort(function (a, b) {
        if (a.id_student.name < b.id_student.name) return -1
        if (a.id_student.name > b.id_student.name) return 1
        return 0
    })

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

    const handlePrint = () => {
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
                    <PrintStyleClasses>
                        <StudentSection>
                            <h2>Fichas Individuais de Alunos</h2>
                            <h3>{bimonthlyDaily}</h3>
                            < DataBimonthly>
                                <span><strong>Inicio:</strong> {startd}/{startm}/{starty}</span>
                                <span><strong>Fim:</strong> {endd}/{endm}/{endy}</span>
                            </DataBimonthly>
                            <CtnrBtt>
                                <Button02 className='no-print' onClick={handlePrint} style={{ marginBottom: '15px' }}>Imprimir</Button02>
                            </CtnrBtt>
                            <Table>
                                <>
                                    {IndividualForm.length > 0 ? (
                                        IndividualForm
                                            .map((res, index) => (
                                                <React.Fragment key={index}>
                                                    <ContainerTable>
                                                        <Span>
                                                            <div>Professor: <p>{res.id_teacher.name}</p></div>
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
                                                                </div>
                                                            </DescriptionCell>
                                                        </TableRow>
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

export default IndividualFormList;
