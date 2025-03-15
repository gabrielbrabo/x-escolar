import React, { useState, useEffect } from 'react';
import { UpdateIVthQuarter, getIV_thQuarterDetails } from '../../Api';
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
import ResponsivePickers from '../../components/Datebimestre';

const EditProfile = () => {
    const navigate = useNavigate();
    const [assessmentFormat, setassessmentFormat] = useState('');
    const [id_IstQuarter, setid_IstQuarter] = useState({});
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
            const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
            setassessmentFormat($assessmentFormat)

            const idIVthQuarter = sessionStorage.getItem("IVthQuarterInformation");
            const res = await getIV_thQuarterDetails(idIVthQuarter);

            console.log("idIstQuarter", idIVthQuarter)
            console.log("getClass", res)
            setid_IstQuarter(res.data._id);
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
        const res = await UpdateIVthQuarter(
            id_IstQuarter,
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
                    <h2>Edição do 4º Bimestre</h2>
                    <DivDados>
                        <ResponsivePickers
                            setSelectedDateStart={setStartSelectedDate}
                            setDayStart={setStartday}
                            setMonthStart={setStartmonth}
                            setYearStart={setStartyear}
                            setSelectedDateEnd={setEndSelectedDate}
                            setDayEnd={setEndday}
                            setMonthEnd={setEndmonth}
                            setYearEnd={setEndyear}
                        />
                        {assessmentFormat === "grade" &&
                            <>
                                <p>Nota Total:
                                    <Input
                                        placeholder="Digite a Nota Total"
                                        value={totalGrade}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(".", ","); // Substitui ponto por vírgula
                                            value = value.replace(/[^0-9,]/g, ""); // Permite apenas números e uma única vírgula

                                            // Garante que tenha apenas uma vírgula e impede valores fora do intervalo
                                            if ((value.match(/,/g) || []).length <= 1) {
                                                const numericValue = parseFloat(value.replace(",", "."));
                                                if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
                                                    setTotalGrade(value);
                                                } else if (value === "") {
                                                    setTotalGrade("");
                                                }
                                            }
                                        }}
                                    />
                                </p>
                                <p>Nota Média:
                                    <Input
                                        placeholder="Digite a Nota Média"
                                        value={averageGrade}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(".", ","); // Substitui ponto por vírgula
                                            value = value.replace(/[^0-9,]/g, ""); // Permite apenas números e uma única vírgula

                                            // Garante que tenha apenas uma vírgula e impede valores fora do intervalo
                                            if ((value.match(/,/g) || []).length <= 1) {
                                                const numericValue = parseFloat(value.replace(",", "."));
                                                if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
                                                    setAverageGrade(value);
                                                } else if (value === "") {
                                                    setAverageGrade("");
                                                }
                                            }
                                        }}
                                    />
                                </p>

                            </>
                        }
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
