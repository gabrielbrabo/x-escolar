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
import { createIndividualForm, clssInfo } from '../../Api';

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

    const [RegentTeacher, setclassRegentTeacher] = useState([]);
    const [RegentTeacher02, setclassRegentTeacher02] = useState([]);
    const [physicalEducation, setphysicalEducationTeacher] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_employee = localStorage.getItem("Id_employee");
            const id_class = sessionStorage.getItem("class-info");
            const id_student = JSON.parse(sessionStorage.getItem("stdt"));
            const Selectbimonthly = JSON.parse(sessionStorage.getItem("Selectbimonthly"));
            const nameStudent = sessionStorage.getItem("nmstdt");

            const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
            const classRegentTeacher02 = sessionStorage.getItem("classRegentTeacher02");
            const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");

            setclassRegentTeacher(JSON.parse(classRegentTeacher))
            setclassRegentTeacher02(JSON.parse(classRegentTeacher02))
            setphysicalEducationTeacher(JSON.parse(physicalEducationTeacher))

            setnameStudent(nameStudent)
            setbimonthly(Selectbimonthly.bimonthly)
            setSelectbimonthly(Selectbimonthly)
            setId_student(id_student._id)
            setId_teache(JSON.parse(id_employee));
            setId_class(id_class);
            
            const resClass = await clssInfo(id_class);
            const $yearClass = resClass.data.data.find(clss => {
                return clss.year
            })
            setYear($yearClass.year)
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
                if (RegentTeacher === id_teacher) {
                    const id_teacher02 = RegentTeacher02
                    const res = await createIndividualForm({ year, id_class, description, id_student, id_teacher: RegentTeacher, id_teacher02, [quarterIdKey]: idQuarter })
                    if (res) {
                        navigate(-1)
                    }
                    console.log("individual form regente 01", res);
                } else if (RegentTeacher02 === id_teacher) {
                    const id_teacher02 = RegentTeacher02
                    const res = await createIndividualForm({ year, id_class, description, id_student, id_teacher: RegentTeacher, id_teacher02, [quarterIdKey]: idQuarter })
                    if (res) {
                        navigate(-1)
                    }
                    console.log("individual form regente 02", res);
                } else if (physicalEducation === id_teacher) {
                    const id_teacher02 = null;
                    const res = await createIndividualForm({ year, id_class, description, id_student, id_teacher, id_teacher02, [quarterIdKey]: idQuarter })
                    if (res) {
                        navigate(-1)
                    }
                    console.log("individual form", res);
                }

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
                    <h2>Ficha Individual</h2>
                    <Input>
                        <Span>
                            <div>Aluno: <p>{nameStudent}</p></div>
                            <div>Bimestre: <p>{bimonthly}</p></div>
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
                                placeholder="Ficha Individual da Aluno"
                            />
                        </StyledQuillContainer>
                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    </Input>
                    <Button onClick={handleClick}>Cadastrar Ficha</Button>
                    <ToGoBack onClick={messageButtonClick}>
                        <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                        <SignMessageButtonTextBold>lista de Alunos</SignMessageButtonTextBold>
                    </ToGoBack>
                </ContainerDivs>
            )}
        </Container>
    );

}

export default Form;
