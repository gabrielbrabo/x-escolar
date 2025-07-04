import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import Date from '../../components/Date';
import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from 'react-datepicker';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    Container,
    Button,
    ContainerDivs,
    Label,
    InputArea,
    Input,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    StyledQuillContainer,
    Span,
    InputDate,
    ErrorMessage,
    SaveButton,
   //DescriptionContainer // Novo contêiner para descrição
} from './style';
import LoadingSpinner from '../../components/Loading';
import {
    RecordClassTaught,
    getIstQuarter,
    getIIndQuarter,
    getIIIrdQuarter,
    getIVthQuarter,
    clssInfo,
} from '../../Api';

const Grade = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [open, setopen] = useState('aberto')
    const [id_teacher, setId_teacher] = useState('')
    const [selectedDate, setSelectedDate] = useState('');
    const [selected, setSelected] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [id_employee, setId_employee] = useState('');
    
    //const [RegentTeacher, setclassRegentTeacher] = useState([]);
    //const [id_teacher02, setclassRegentTeacher02] = useState([]);
    const [physicalEducation, setPhysicalEducationTeacher] = useState([]);

    const [id_class, setId_class] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idTeacher = JSON.parse(localStorage.getItem("Id_employee") || '""'); // Remove aspas extras
            setId_teacher(idTeacher);
            const id_employee = localStorage.getItem("Id_employee");
            //const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
            //const classRegentTeacher02 = sessionStorage.getItem("classRegentTeacher02");
            const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");

            //setclassRegentTeacher(JSON.parse(classRegentTeacher))
            //setclassRegentTeacher02(JSON.parse(classRegentTeacher02))
            setPhysicalEducationTeacher(JSON.parse(physicalEducationTeacher))
            

            const id_class = sessionStorage.getItem("class-info");
            setId_employee(JSON.parse(id_employee));
            setId_class(id_class);
            setLoading(false);
        })();
    }, []);

    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    const handleSubmit = async () => {
        const plainDescription = stripHtml(description);
        console.log('Data:', `${day}/${month}/${year}`);
        console.log('Descrição:', plainDescription);
        console.log('id_employee:', id_employee);
        console.log('id_class:', id_class);

       /*if(id_employee === physicalEducationTeacher) {
            const res = await RecordClassTaught(day, month, year, plainDescription, id_employee, id_teacher02, id_class);
            if (res) {
                navigate(-1);
            } else {
                setErrorMessage('Erro, Verifique os dados e tente novamente.');
            }
        } else {
            const res = await RecordClassTaught(day, month, year, plainDescription, RegentTeacher, id_teacher02, id_class);
            if (res) {
                navigate(-1);
            } else {
                setErrorMessage('Erro, Verifique os dados e tente novamente.');
            }
        }*/
        const res = await RecordClassTaught(day, month, year, plainDescription, id_employee, /*id_teacher02,*/ id_class);
        if (res) {
            navigate(-1);
        } else {
            setErrorMessage('Erro, Verifique os dados e tente novamente.');
        }
    };

    const messageButtonClick = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const dateValue = e.target.value; // O valor do input será uma string no formato YYYY-MM-DD
        //const currentYear = new Date().getFullYear(); 
        setSelected(dateValue);
        // Extraindo o dia, mês e ano da data
        const [year, month, day] = dateValue.split('-'); // Desestruturando a data

        console.log('Ano:', year);
        console.log('Mês:', month);
        console.log('Dia:', day);


        setDay(day);
        setMonth(month);
        setYear(year);
    };

    const handleDateChange = async () => {
        setSelectedDate(selected)
        const fetchQuarters = async () => {
            const idSchool = sessionStorage.getItem("id-school");

            const dateSelected = new Date(year, month - 1, day);

            const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
            const IIndQuarter = await getIIndQuarter(year, JSON.parse(idSchool))
            const IIIrdQuarter = await getIIIrdQuarter(year, JSON.parse(idSchool))
            const IVthQuarter = await getIVthQuarter(year, JSON.parse(idSchool))
            //const VthQuarter = await getVthQuarter(year, JSON.parse(idSchool))
            //const VIthQuarter = await getVIthQuarter(year, JSON.parse(idSchool))
            const getQuarterStatus = (quarterData) => {
                return quarterData.data.data
                    .map((res) => {
                        const startDate = new Date(res.startyear, res.startmonth - 1, res.startday);
                        const endDate = new Date(res.endyear, res.endmonth - 1, res.endday);
                        if (dateSelected >= startDate && dateSelected <= endDate) {
                            return res.bimonthly/*.statusSupervisor*/;
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


        const run = async () => {
            const result = await fetchQuarters();
            const resClass = await clssInfo(id_class); // ✅ Aqui você espera a Promise

            const turma = resClass.data.data[0];
            console.log("result class:", resClass.data.data);
            console.log("result turma:", turma.dailyStatus);

            if (result.IstQuarter) {
                console.log("dataIstQuarter", result.IstQuarter);
                if (id_teacher !== physicalEducation) {
                    setopen(turma.dailyStatus["1º BIMESTRE"].regentTeacher);
                } else {
                    setopen(turma.dailyStatus["1º BIMESTRE"].physicalEducationTeacher);
                }
            }
            if (result.IIndQuarter) {
                console.log("dataIIndQuarter", result.IIndQuarter);
                if (id_teacher !== physicalEducation) {
                    setopen(turma.dailyStatus["2º BIMESTRE"].regentTeacher);
                } else {
                    setopen(turma.dailyStatus["2º BIMESTRE"].physicalEducationTeacher);
                }
            }
            if (result.IIIrdQuarter) {
                console.log("dataIIIrdQuarter", result.IIIrdQuarter);
                if (id_teacher !== physicalEducation) {
                    setopen(turma.dailyStatus["3º BIMESTRE"].regentTeacher);
                } else {
                    setopen(turma.dailyStatus["3º BIMESTRE"].physicalEducationTeacher);
                }
            }
            if (result.IVthQuarter) {
                console.log("dataIVthQuarter", result.IVthQuarter);
                if (id_teacher !== physicalEducation) {
                    setopen(turma.dailyStatus["4º BIMESTRE"].regentTeacher);
                } else {
                    setopen(turma.dailyStatus["4º BIMESTRE"].physicalEducationTeacher);
                }
            }
        };

        run();
        setLoading(false)
    };

    console.log('open', open)

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <ContainerDivs>
                        {!selectedDate && (
                            <>
                                <h2>Selecione a Data da Aula</h2>
                                <InputArea>
                                    <InputDate>
                                        <Label>Data</Label>
                                        <input
                                            type="date"
                                            value={selected}
                                            onChange={handleChange}
                                        />
                                        <SaveButton onClick={handleDateChange}>Salvar Data</SaveButton>
                                    </InputDate>
                                    <ToGoBack onClick={messageButtonClick}>
                                        <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                                        <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                                    </ToGoBack>
                                </InputArea>
                            </>
                        )}
                    </ContainerDivs>
                    {selectedDate && (
                        open === 'aberto' ? (
                            <ContainerDivs>
                                <h2>Descrição da Aula</h2>
                                <Input>
                                    <Span>
                                        <div>Data da Aula: <p>{day}/{month}/{year}</p></div>
                                    </Span>
                                    <StyledQuillContainer>
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
                                            value={description}
                                            onChange={setDescription}
                                            placeholder="Descrição da aula lecionada"
                                        />
                                    </StyledQuillContainer>
                                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                </Input>
                                <Button onClick={handleSubmit}>Registrar Aula</Button>
                                <ToGoBack onClick={messageButtonClick}>
                                    <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                                    <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                                </ToGoBack>
                            </ContainerDivs>
                        ) : (
                            <>
                                <h3> Bimestre fechado, para editar contate o Diretor ou Supervisor.</h3>
                            </>
                        )
                    )}
                    {/* Renderizando a descrição após ser salva */}
                   {/* <DescriptionContainer>
                        <h2>Descrição da Aula</h2>
                        <div style={{ textAlign: 'left', margin: '20px', maxWidth: '800px', overflowWrap: 'break-word' }}>
                            {stripHtml(description)}
                        </div>
                    </DescriptionContainer>*/}
                </>
            )}
        </Container>
    );
};

export default Grade;
