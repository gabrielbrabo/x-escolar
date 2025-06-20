import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetIndividualForm, FormEdit, DestroyForm } from '../../Api';
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
    ContainerDelet,
    ButtonEdit,
    BoxButton,
    PrintButton // Adicione este estilo para o botão de impressão
} from './style';

const StudentRecordDescription = () => {
    const navigate = useNavigate();
    const [nameStudent, setNameStudent] = useState('');
    const [bimonthly, setBimonthly] = useState('');
    const [formData, setFormData] = useState([]);
    const [/*isTeacher,*/ setIsTeacher] = useState([]);
    const [update_idForm, setUpdateidForm] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
    const [RemoveForm, setRemoveForm] = useState(null);
    const { id_form } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const selectBimonthly = JSON.parse(sessionStorage.getItem("Selectbimonthly"));
            const studentName = JSON.parse(sessionStorage.getItem("nmstdt"));
           // const id_employee = localStorage.getItem("Id_employee");
            const individualFormId = id_form;

            setNameStudent(studentName || '');
            setBimonthly(selectBimonthly?.bimonthly || '');

            if (individualFormId && individualFormId !== "undefined") {
                const response = await GetIndividualForm({ id_individualForm: individualFormId });
                if (response) {
                   /* const isTeacher = await response.data.data.id_teacher._id;
                    if (isTeacher === JSON.parse(id_employee)) {
                        setIsTeacher(isTeacher);
                    }*/
                    setFormData(response.data.data);
                }
            } else {
                console.error("ID da ficha individual inválido ou não encontrado.");
            }
        };

        fetchData();
    }, [id_form, setIsTeacher]);

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
        const res = await FormEdit({ update_idForm, editedDescription });

        if (res) {
            alert('Ficha atualizada com sucesso!');
            setUpdateidForm(null);
            setFormData((prevData) => ({ ...prevData, description: editedDescription }));
        }
    };

    const handleDestroy = async () => {
        setRemoveForm(id_form)
    };

    const Destroy = async () => {
        const res = await DestroyForm(id_form)
        if(res){
            navigate(-1)    
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            {!update_idForm && !RemoveForm &&
                <RecordContainer>
                    <RecordHeader>
                        <RecordTitle>Ficha Individual do Aluno</RecordTitle>
                    </RecordHeader>
                    <ContainerSpan>
                        <Span>
                            <div>Aluno: <p>{nameStudent}</p></div>
                            <div>Bimestre: <p>{bimonthly}</p></div>
                        </Span>
                        <Span>
                            <PrintButton onClick={handlePrint}>Imprimir Ficha</PrintButton> {/* Botão de impressão acima */}
                        </Span>
                        {/*isTeacher.length > 0 && (*/}
                            <BoxButton>
                                <Button onClick={handleDestroy}>Apagar</Button>
                                <Button onClick={startEditing}>Editar</Button>
                            </BoxButton>
                        {/*)*/}
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
                                onChange={(content) => setEditedDescription(content)}
                                placeholder="Ficha Individual do Aluno"
                            />
                        </StyledQuillContainer>
                        <ContainerSpanEdit>
                            <ButtonEdit onClick={handleSaveEdit}>Salvar</ButtonEdit>
                            <ButtonEdit onClick={handleCancelEdit}>Cancelar</ButtonEdit>

                        </ContainerSpanEdit>
                    </Input>
                </EditContainer>
            )}

            {RemoveForm && (
                <ContainerDelet>
                    <h2>Apagar Ficha Individual</h2>
                    <h4>Tem certeza que deseja apaga a ficha do aluno(a): {nameStudent} no {bimonthly}.</h4>
                    <div style={{ display: 'flex', gap: '100px' }}>
                        <ButtonEdit onClick={Destroy}>Apagar</ButtonEdit>
                        <ButtonEdit onClick={() => setRemoveForm(null)}>Cancelar</ButtonEdit>

                    </div>

                </ContainerDelet>
            )}
        </>
    );
};

export default StudentRecordDescription;
