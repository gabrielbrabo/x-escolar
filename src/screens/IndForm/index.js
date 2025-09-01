import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentIndividualForm, fetchLogo } from '../../Api';
import {
    Container,
    IndividualContainerDivs,
    IndividualPrintStyle,
    IndividualStudentSection,
    IndividualContainerTable,
    IndividualTableRow,
    IndividualDescriptionCell,
    CtnrBtt,
    ButtonPrint,
    ContLogo,
    Preview,
    Span,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './style';

import LoadingSpinner from '../../components/Loading';

const StudentRecordDescription = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [logoUrl, setLogoUrl] = useState('');
    const { idStdt } = useParams();
    const { bim } = useParams();
    const { idBim } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const idSchool = JSON.parse(sessionStorage.getItem("id-school"));
            const form = await getStudentIndividualForm(idStdt, bim, idBim)
            // Filtra os professores que não são o de Educação Física

            if (!form || !form.data) {
                setFormData(null); // não tem ficha
                setLoading(false);
                return;
            }

            const physicalEdId = form.data.id_class?.physicalEducationTeacher?.[0];

            const filteredFormData = {
                ...form.data,
                id_teacher: form.data.id_teacher?._id === physicalEdId ? null : form.data.id_teacher,
            };

            const cachedLogo = localStorage.getItem(`school-logo-${idSchool}`);
            //const cachedLogoId = localStorage.getItem(`school-logo-id-${idSchool}`);

            if (cachedLogo) {
                console.log('busca pelo storage local')
                setLogoUrl(cachedLogo);
                //setlogoId(cachedLogoId);
            } else {

                console.log('busca no s3')
                const logoRes = await fetchLogo(idSchool);

                console.log('busca logo', logoRes)
                if (logoRes?.url) {
                    setLogoUrl(logoRes.url);
                    //setlogoId(logoRes._id);
                    localStorage.setItem(`school-logo-${idSchool}`, logoRes.url);
                    localStorage.setItem(`school-logo-id-${idSchool}`, logoRes._id);

                }
            }

            setFormData(filteredFormData);
            console.log("form", form)
            setLoading(false);
        };

        fetchData();
    }, [bim, idBim, idStdt]);

    const messageButtonClick = () => {
        navigate(-1);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <IndividualContainerDivs id='print-area' >
                    {!formData ? (
                        <IndividualStudentSection>
                            <h2>Nenhuma ficha individual encontrada</h2>
                            <p>Este aluno ainda não possui ficha cadastrada.</p>
                        </IndividualStudentSection>
                    ) : (
                        <IndividualPrintStyle>
                            <CtnrBtt>
                                <ButtonPrint className="no-print" onClick={handlePrint}>Imprimir</ButtonPrint>
                            </CtnrBtt>
                            <IndividualStudentSection id="printable-content-individualRecords">
                                <ContLogo className="cont-logo-individualForm">
                                    {(logoUrl) && (
                                        <Preview className="logo-individualForm" src={logoUrl} alt="Logo da escola" />
                                    )}
                                    <h2>Relatório Individual</h2>
                                </ContLogo>
                                <h3>
                                    {formData?.id_iStQuarter?.bimonthly ||
                                        formData?.id_iiNdQuarter?.bimonthly ||
                                        formData?.id_iiiRdQuarter?.bimonthly ||
                                        formData?.id_ivThQuarter?.bimonthly ||
                                        "Não informado"}
                                </h3>
                                <IndividualContainerTable >
                                    <Span>
                                        <div>Escola: <p>{formData.id_student?.id_school.name || "Não informado"}</p></div>
                                        <div>Aluno: <p>{formData.id_student?.name || "Não informado"}</p></div>
                                        <div>
                                            Professor(a):
                                            <p>{formData?.id_teacher?.name || "Não informado"}</p>
                                        </div>
                                        {formData?.id_teacher02 && (
                                            <div>
                                                Professor(a) 02: <p>{formData.id_teacher02.name}</p>
                                            </div>
                                        )}
                                        <div>Turma: <p>{formData.id_class?.serie || "Não informado"}</p></div>
                                    </Span>
                                    <IndividualTableRow>
                                        <IndividualDescriptionCell>
                                            <div >
                                                {formData ? (
                                                    <div dangerouslySetInnerHTML={{ __html: formData.description }} />
                                                ) : (
                                                    <p>Nenhuma descrição</p>
                                                )}
                                            </div>
                                        </IndividualDescriptionCell>
                                    </IndividualTableRow>
                                </IndividualContainerTable>

                            </IndividualStudentSection>
                        </IndividualPrintStyle>
                    )}
                    <ToGoBack onClick={messageButtonClick}>
                        <SignMessageButtonText>Voltar para a </SignMessageButtonText>
                        <SignMessageButtonTextBold>lista de Alunos</SignMessageButtonTextBold>
                    </ToGoBack>
                </IndividualContainerDivs>
            )}
        </Container>
    );
};

export default StudentRecordDescription;
