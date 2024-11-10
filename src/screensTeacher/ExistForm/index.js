import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { GetIndividualForm } from '../../Api';
import {
    RecordContainer,
    RecordHeader,
    RecordTitle,
    Span,
    RecordDescription,
    Button,
    ContainerSpan,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './style';

const StudentRecordDescription = () => {
    const navigate = useNavigate();
    const [nameStudent, setNameStudent] = useState('');
    const [bimonthly, setBimonthly] = useState('');
    const [formData, setFormData] = useState(null);
    const [isTeacher, setIsTeacher] = useState([]);
    const { id_form } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            // Recupera dados do session storage

            console.log('useParamsClass', id_form)
            const selectBimonthly = JSON.parse(sessionStorage.getItem("Selectbimonthly"));
            const studentName = JSON.parse(sessionStorage.getItem("nmstdt"));
            const id_employee = localStorage.getItem("Id_employee");
            const individualFormId = id_form

            console.log("individualFormId", individualFormId)

            setNameStudent(studentName || '');
            setBimonthly(selectBimonthly?.bimonthly || '');

            if (individualFormId && individualFormId !== "undefined") {
                const response = await GetIndividualForm({ id_individualForm: individualFormId }); // Busca dados do backend
                if (response) {
                    console.log("response", response.data.data)
                    const isTeacher = await response.data.data.id_teacher._id
                    if (isTeacher === JSON.parse(id_employee)) {
                        setIsTeacher(isTeacher);
                    }
                    console.log("isTeacher", isTeacher)
                    setFormData(response.data.data);
                }// Armazena os dados recebidos

            } else {
                console.error("ID da ficha individual inválido ou não encontrado.");
            }
        };

        fetchData();
    }, [id_form]);

    const messageButtonClick = () => {
        navigate(-1);
    };

    return (
        <RecordContainer>
            <RecordHeader>
                <RecordTitle>Ficha Individual do Aluno</RecordTitle>
            </RecordHeader>
            <ContainerSpan>
                <Span>
                    <div>Aluno: <p>{nameStudent}</p></div>
                    <div>Bimestre: <p>{bimonthly}</p></div>
                </Span>
                {isTeacher.length > 0 && (
                    <Span>
                        <Button >Editar</Button>
                    </Span>
                )}
            </ContainerSpan>
            <RecordDescription>
                {formData ? (
                    <div dangerouslySetInnerHTML={{ __html: formData.description }} />
                ) : (
                    <p>Nenhuma descrição</p>
                )}
            </RecordDescription>
            <ToGoBack onClick={messageButtonClick}>
                <SignMessageButtonText>Voltar para a </SignMessageButtonText>
                <SignMessageButtonTextBold>lista de Alunos</SignMessageButtonTextBold>
            </ToGoBack>
        </RecordContainer>
    );
};

export default StudentRecordDescription;
