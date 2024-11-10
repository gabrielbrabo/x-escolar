import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    Container,
    Button,
    ContainerDivs,
    //Label,
    //InputArea,
    Input,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    StyledQuillContainer,
    Span,
    //InputDate,
    ErrorMessage,
    //DescriptionContainer // Novo contêiner para descrição
} from './style';
import LoadingSpinner from '../../components/Loading';
import { createIndividualForm } from '../../Api';

const Form = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectbimonthly, setSelectbimonthly] = useState('');
    const [description, setDescription] = useState('');
    const [id_student, setId_student] = useState('');
    const [year, setYear] = useState([]);
    const [id_teacher, setId_teache] = useState('');
    const [id_class, setId_class] = useState('');
    const [nameStudent, setnameStudent] = useState('');
    const [bimonthly, setbimonthly] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_employee = localStorage.getItem("Id_employee");
            const id_class = sessionStorage.getItem("class-info");
            const id_student = JSON.parse(sessionStorage.getItem("stdt"));
            const Selectbimonthly = JSON.parse(sessionStorage.getItem("Selectbimonthly"));
            const nameStudent = sessionStorage.getItem("nmstdt");
            setnameStudent(nameStudent)
            setbimonthly(Selectbimonthly.bimonthly)
            setSelectbimonthly(Selectbimonthly)
            setId_student(id_student._id)
            setId_teache(JSON.parse(id_employee));
            setId_class(id_class);
            setYear(new Date().getFullYear());
            setLoading(false);
        })();
    }, []);

    const handleClick = async () => {
        if (!selectbimonthly) return;

        const bimestreMapping = {
            "1º BIMESTRE": "id_iStQuarter",
            "2º BIMESTRE": "id_iiNdQuarter",
            "3º BIMESTRE": "id_iiiRdQuarter",
            "4º BIMESTRE": "id_ivThQuarter",
            "5º BIMESTRE": "id_vThQuarter",
            "6º BIMESTRE": "id_viThQuarter",
        };

        const quarterIdKey = bimestreMapping[selectbimonthly.bimonthly];
        if (quarterIdKey) {
            try {
                const idQuarter = selectbimonthly._id;
                const res = await createIndividualForm({ year, id_class, description, id_student, id_teacher, [quarterIdKey]: idQuarter })
                if(res) {
                    navigate(-1)
                }
                console.log("individual form", res);
            } catch (error) {
                setErrorMessage('Erro, Verifique os dados e tente novamente.');
            }

        };
    }
    console.log("id_student", id_student)
    const messageButtonClick = () => {
        navigate(-1);
    };

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ContainerDivs>
                    <h2>Fincha Individual</h2>
                    <Input>
                        <Span>
                            <div>Aluno: <p>{nameStudent}</p></div>
                            <div>Bimestre: <p>{bimonthly}</p></div>
                        </Span>
                        <StyledQuillContainer>
                            <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={setDescription}
                                placeholder="Fincha Individual da Aluno"
                            />
                        </StyledQuillContainer>
                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    </Input>
                    <Button onClick={handleClick}>Cadastrar Aula</Button>
                    <ToGoBack onClick={messageButtonClick}>
                        <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                        <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                    </ToGoBack>
                </ContainerDivs>
            )}
        </Container>
    );

}

export default Form;
