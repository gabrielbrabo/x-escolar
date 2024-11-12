import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetIndividualForm, FormEdit } from '../../Api';
import ReactQuill from 'react-quill';
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
    Input,
    StyledQuillContainer,
    EditContainer,
    ContainerSpanEdit,
    ButtonEdit
} from './style';

const StudentRecordDescription = () => {
    const navigate = useNavigate();
    const [nameStudent, setNameStudent] = useState('');
    const [bimonthly, setBimonthly] = useState('');
    const [formData, setFormData] = useState([]);
    const [isTeacher, setIsTeacher] = useState([]);
    const [update_idForm, setUpdateidForm] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
    const { id_form } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const selectBimonthly = JSON.parse(sessionStorage.getItem("Selectbimonthly"));
            const studentName = JSON.parse(sessionStorage.getItem("nmstdt"));
            const id_employee = localStorage.getItem("Id_employee");
            const individualFormId = id_form;

            setNameStudent(studentName || '');
            setBimonthly(selectBimonthly?.bimonthly || '');

            if (individualFormId && individualFormId !== "undefined") {
                const response = await GetIndividualForm({ id_individualForm: individualFormId });
                if (response) {
                    const isTeacher = await response.data.data.id_teacher._id;
                    if (isTeacher === JSON.parse(id_employee)) {
                        setIsTeacher(isTeacher);
                    }
                    setFormData(response.data.data);
                }
            } else {
                console.error("ID da ficha individual inválido ou não encontrado.");
            }
        };

        fetchData();
    }, [id_form]);

    const messageButtonClick = () => {
        navigate(-1);
    };
    const handleCancelEdit = () => {
        setUpdateidForm(null);
    };

    const startEditing = () => {
        setUpdateidForm(formData._id);
        setEditedDescription(formData.description || '');
    };

    const handleSaveEdit = async () => {
        console.log("editedDescription", editedDescription)
        console.log("update_idForm", update_idForm)
        const res = await FormEdit({ update_idForm, editedDescription });

        if (res) {
            console.log("resEditForm", res)
            alert('Ficha atualizada com sucesso!');
            setUpdateidForm(null);
            setFormData((prevData) => ({ ...prevData, description: editedDescription }));
        }
    };

    return (
        <>
            {!update_idForm &&
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
                                <Button onClick={startEditing}>Editar</Button>
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
            }

            {update_idForm && (
                <EditContainer>
                    <h2>Editando Ficha Individual</h2>
                    <Input>
                        <Span>
                            <div>Aluno: <p>{nameStudent}</p></div>
                            <div>Bimestre: <p>{bimonthly}</p></div>
                        </Span>
                        <StyledQuillContainer>
                            <ReactQuill
                                theme="snow"
                                value={editedDescription}
                                onChange={(content) => setEditedDescription(content)}
                                placeholder="Ficha Individual do Aluno"
                            />
                        </StyledQuillContainer>
                        <ContainerSpanEdit>
                            <ButtonEdit onClick={handleCancelEdit}>Cancelar</ButtonEdit>
                            <ButtonEdit onClick={handleSaveEdit}>Salvar</ButtonEdit>
                        </ContainerSpanEdit>
                    </Input>
                </EditContainer>
            )}
        </>
    );
};

export default StudentRecordDescription;
