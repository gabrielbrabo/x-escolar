import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Date from '../../components/Date';
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
    DescriptionContainer // Novo contêiner para descrição
} from './style';
import LoadingSpinner from '../../components/Loading';
import { RecordClassTaught } from '../../Api';

const Grade = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [id_employee, setId_employee] = useState('');
    const [id_class, setId_class] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_employee = localStorage.getItem("Id_employee");
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

        const res = await RecordClassTaught(day, month, year, plainDescription, id_employee, id_class);
        
        if(res) {
            navigate(-1);
        } else {
            setErrorMessage('Erro, Verifique os dados e tente novamente.');
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
                <>
                    <ContainerDivs>
                        {!selectedDate && (
                            <>
                                <h2>Selecione a Data da Aula</h2>
                                <InputArea>
                                    <InputDate>
                                        <Label>Data</Label>
                                        <Date
                                            setSelectedDate={setSelectedDate}
                                            setDay={setDay}
                                            setMonth={setMonth}
                                            setYear={setYear}
                                        />
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
                                placeholder="Fincha Individual da Aluno"
                            />
                                </StyledQuillContainer>
                                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            </Input>
                            <Button onClick={handleSubmit}>Cadastrar Aula</Button>
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
