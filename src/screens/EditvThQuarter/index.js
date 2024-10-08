import React, { useState, useEffect } from 'react';
import { UpdateVthQuarter, getV_thQuarterDetails } from '../../Api';
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
import SelectorDate from '../../components/SelectorOnDate'

const EditProfile = () => {
    const navigate = useNavigate();
    const [idVthQuarter, setid_VthQuarter] = useState({});
    const [startday, setStartday] = useState('');
    const [startmonth, setStartmonth] = useState('');
    const [startyear, setStartyear] = useState('')
    const [endday, setEndday] = useState('');
    const [endmonth, setEndmonth] = useState('');
    const [endyear, setEndyear] = useState('')
    const [startSelectedDate, setStartSelectedDate] = useState('')
    const [endSelectedDate, setEndSelectedDate] = useState('')
    const [totalGrade, setTotalGrade] = useState('');
    const [averageGrade, setAverageGrade] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    console.log("startselecOnData", startSelectedDate)
    console.log("endSelectedDate", endSelectedDate)
    console.log("startyear", startyear)
    console.log("endyear", endyear)

    useEffect(() => {
        (async () => {
            setLoading(true);

            const idVthQuarter = sessionStorage.getItem("VthQuarterInformation");
            const res = await getV_thQuarterDetails(idVthQuarter);

            console.log("idIstQuarter", idVthQuarter)
            console.log("getClass", res)
            setid_VthQuarter(res.data._id);
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
        const res = await UpdateVthQuarter(
            idVthQuarter,
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
                    <h2>Edição do 5º Bimestre</h2>
                    <DivDados>
                        <p>Data de Inicio:
                            <SelectorDate
                                setDay={setStartday}
                                setMonth={setStartmonth}
                                setYear={setStartyear}
                                setSelectedDate={setStartSelectedDate}
                            />
                        </p>
                        <p>Data de Fim:
                            <SelectorDate
                                setDay={setEndday}
                                setMonth={setEndmonth}
                                setYear={setEndyear}
                                setSelectedDate={setEndSelectedDate}
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
