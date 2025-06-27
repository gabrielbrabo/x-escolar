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
    DescriptionContainer // Novo contêiner para descrição
} from './style';
import LoadingSpinner from '../../components/Loading';
import {
    RecordClassTaught,
} from '../../Api';

const Grade = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selected, setSelected] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [id_employee, setId_employee] = useState('');
    
    const [RegentTeacher, setclassRegentTeacher] = useState([]);
    const [id_teacher02, setclassRegentTeacher02] = useState([]);
    const [physicalEducationTeacher, setPhysicalEducationTeacher] = useState([]);

    const [id_class, setId_class] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_employee = localStorage.getItem("Id_employee");
            const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
            const classRegentTeacher02 = sessionStorage.getItem("classRegentTeacher02");
            const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");

            setclassRegentTeacher(JSON.parse(classRegentTeacher))
            setclassRegentTeacher02(JSON.parse(classRegentTeacher02))
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
        /*const fetchQuarters = async () => {
            setLoading(true)
            const idSchool = sessionStorage.getItem("id-school");
            const year = new Date().getFullYear();
            const dateSelected = new Date(year, month - 1, day);

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
        }
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
               // console.log(`Bimestre aberto: ${openQuarter}`);
                //setopen("aberto");
                fetchQuarters();
                setSelectedDate(selected)
            } else {
                alert("Bimestre fechado para adiciona aula contate o Diretor ou Supervisor.");
                navigate(-1)
            }

        } catch (error) {
            console.error("Erro ao buscar os trimestres:", error);
            alert("Erro ao buscar informações. Tente novamente mais tarde.");
        }*/
        setLoading(false)
    };

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
                    )}
                    {/* Renderizando a descrição após ser salva */}
                    <DescriptionContainer>
                        <h2>Descrição da Aula</h2>
                        <div style={{ textAlign: 'left', margin: '20px', maxWidth: '800px', overflowWrap: 'break-word' }}>
                            {stripHtml(description)}
                        </div>
                    </DescriptionContainer>
                </>
            )}
        </Container>
    );
};

export default Grade;
