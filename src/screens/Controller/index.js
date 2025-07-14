import React, { useState, useEffect } from 'react';
import { updateSchoolYear, getSchoolYear } from '../../Api';
import {
    Container,
    ContainerYearControl,
    YearBox,
    ButtonNextYear,
    ModalOverlay,
    ModalContent,
    ModalButtons
} from './style';
import LoadingSpinner from '../../components/Loading';

const Matter = () => {
    const [loading, setLoading] = useState(false);
    const currentYear = new Date().getFullYear();
    const [schoolYear, setSchoolYear] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalPrevious, setShowModalPrevious] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem('id-school');
            const res = await getSchoolYear(JSON.parse(idSchool));
            setSchoolYear(res.data.data);
            setLoading(false);
        })();
    }, []);

    const handleNextYearClick = () => {
        setShowModal(true); // Abre o modal primeiro
    };

    const handlePreviousYearClick = () => {
        setShowModalPrevious(true);
    };


    const handleConfirmNextYear = async () => {
        setLoading(true);
        const idSchool = sessionStorage.getItem('id-school');
        const nextYear = schoolYear + 1;

        await updateSchoolYear(
            JSON.parse(idSchool),
            nextYear
        );
        setLoading(false);
        setShowModal(false);
        alert(`Ano letivo alterado para ${nextYear}`);

        window.location.reload()
    };

    const handleConfirmPreviousYear = async () => {
        setLoading(true);
        const idSchool = sessionStorage.getItem('id-school');
        const previousYear = Number(schoolYear) - 1;

        await updateSchoolYear(
            JSON.parse(idSchool),
            previousYear
        );
        setLoading(false);
        setShowModalPrevious(false);
        alert(`Ano letivo alterado para ${previousYear}`);

        window.location.reload();
    };

    const handleCancel = () => {
        setShowModal(false);
        setShowModalPrevious(false);
    };

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <h2>Controle</h2>
                    </div>

                    <ContainerYearControl>
                        <h2>Ano Letivo</h2>
                        <YearBox>
                            <p>Ano Letivo Atual:</p>
                            <h1>{schoolYear}</h1>
                        </YearBox>
                        {schoolYear !== currentYear &&
                            <ButtonNextYear onClick={handleNextYearClick}>
                                Finalizar e Passar para o Próximo Ano Letivo
                            </ButtonNextYear>
                        }
                        {schoolYear === currentYear &&
                            <ButtonNextYear onClick={handlePreviousYearClick}>
                                Retroceder para o Ano Letivo Anterior
                            </ButtonNextYear>
                        }
                    </ContainerYearControl>
                </>
            )}

            {showModal && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>Atenção!</h3>
                        <p>
                            Verifique se todos os dados do ano letivo atual foram finalizados corretamente.
                            <br />
                            Ao alterar o ano letivo, todos os professores terão acesso apenas às turmas do novo ano letivo configurado,
                            e todas as informações exibidas no sistema serão referentes exclusivamente a este novo ano.
                            <br />
                            Esta alteração impacta todos os usuários do sistema.
                        </p>
                        <ModalButtons>
                            <button onClick={handleConfirmNextYear}>Confirmar</button>
                            <button onClick={handleCancel}>Cancelar</button>
                        </ModalButtons>
                    </ModalContent>
                </ModalOverlay>
            )}

            {showModalPrevious && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>⚠️ Atenção!</h3>
                        <p>
                            Antes de retroceder o ano letivo, verifique se isso é realmente necessário.
                            <br />
                            Essa ação impacta todos os professores e usuários, que verão apenas as turmas e informações do ano letivo configurado.
                        </p>
                        <ModalButtons>
                            <button onClick={handleConfirmPreviousYear}>Confirmar</button>
                            <button onClick={handleCancel}>Cancelar</button>
                        </ModalButtons>
                    </ModalContent>
                </ModalOverlay>
            )}

        </Container>
    );
};

export default Matter;
