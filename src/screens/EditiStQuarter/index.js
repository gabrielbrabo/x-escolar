import React, { useState, useEffect } from 'react';
import { UpdateIstQuarter, getI_stQuarterDetails } from '../../Api';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    ToGoBack,
    Input,
    DivDados,
    Btt01,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    ErrorMessage
} from './style';
import LoadingSpinner from '../../components/Loading';
//import SelectorDate from '../../components/SelectorOnDate'

const EditProfile = () => {
    const navigate = useNavigate();
    const [id_IstQuarter, setid_IstQuarter] = useState({});
    const [startday, setStartday] = useState('');
    const [startmonth, setStartmonth] = useState('');
    const [endday, setEndday] = useState('');
    const [endmonth, setEndmonth] = useState('');
    const [totalGrade, setTotalGrade] = useState('');
    const [averageGrade, setAverageGrade] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);

            const idIstQuarter = sessionStorage.getItem("IstQuarterInformation");
            const res = await getI_stQuarterDetails(idIstQuarter);

            console.log("idIstQuarter", idIstQuarter)
            console.log("getClass", res)
            setid_IstQuarter(res.data);
            setStartday(res.data.startday || '');
            setStartmonth(res.data.startmonth || '');
            setEndday(res.data.endday || '');
            setEndmonth(res.data.endmonth || '');
            setTotalGrade(res.data.totalGrade || '');
            setAverageGrade(res.data.averageGrade || '');
            setLoading(false);
        })();
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        const res = await UpdateIstQuarter(
            id_IstQuarter._id,
            startday,
            startmonth,
            endday,
            endmonth,
            totalGrade,
            averageGrade
        );

        if (res) {
            alert('Turma atualizado com sucesso!');
            navigate(-1); 
        } else {
            setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
        }
        setLoading(false);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <h2>Edição do 1º Bimestre</h2>
                    <DivDados>
                       {/* <p>Data de Inicio:
                            <SelectorDate
                                setDay={setStartday}
                                setMonth={setStartmonth}
                                setYear={setStartyear}
                            />
                        </p>
                        <p>Data de Fim:
                            <SelectorDate
                                setDay={setEndday}
                                setMonth={setEndmonth}
                                setYear={setEndyear}
                            />
            </p>*/}
                        <p>Data de Inicio:
                            <Input
                                placeholder="Digite a Nota Total"
                                value={startday}
                                onChange={(e) => setTotalGrade(e.target.value)}
                                type='number'
                            />
                        </p>
                        <p>Nota Total:
                            <Input
                                placeholder="Digite a Nota Total"
                                value={totalGrade}
                                onChange={(e) => setTotalGrade(e.target.value)}
                                type='number'
                            />
                        </p>
                        <p>Nota Media:
                            <Input
                                placeholder="Digite a Nota Media"
                                value={averageGrade}
                                onChange={(e) => setAverageGrade(e.target.value)}
                                type='number'
                            />
                        </p>
                    </DivDados>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <Btt01 onClick={handleSubmit}>Salvar Alterações</Btt01>
                    <ToGoBack onClick={handleGoBack}>
                        <SignMessageButtonText>Voltar ao</SignMessageButtonText>
                        <SignMessageButtonTextBold>Dashboard</SignMessageButtonTextBold>
                    </ToGoBack>
                </>
            }
        </Container>
    );
};

export default EditProfile;
