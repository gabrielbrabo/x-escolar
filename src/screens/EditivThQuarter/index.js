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
    const [assessmentRegime, setAssessmentRegime] = useState('');
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
    const [schoolDays, setSchoolDays] = useState([]);

    console.log("startselecOnData", startSelectedDate)
    console.log("endSelectedDate", endSelectedDate)
    console.log("startyear", startyear)
    console.log("endyear", endyear)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
            setassessmentFormat($assessmentFormat)
            setAssessmentRegime(sessionStorage.getItem('assessmentRegime'))

            const idIVthQuarter = sessionStorage.getItem("IVthQuarterInformation");
            const res = await getIV_thQuarterDetails(idIVthQuarter);

            // transforma os dias do backend
            const formattedSchoolDays = res.data.schoolDays.map(day => ({
                _id: day._id,        // mantém se precisar
                date: day.date,
                isSchoolDay: true    // 👈 IMPORTANTÍSSIMO
            }));

            setSchoolDays(formattedSchoolDays);

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

    const generateDaysBetween = (start, end) => {
        const days = [];
        const current = new Date(start);

        while (current <= end) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return days;
    };

    const handleGenerateSchoolDays = () => {
        if (!startyear || !startmonth || !startday || !endyear || !endmonth || !endday) {
            alert('Defina a data inicial e final primeiro');
            return;
        }

        const startDate = new Date(startyear, startmonth - 1, startday);
        const endDate = new Date(endyear, endmonth - 1, endday);

        const generatedDays = generateDaysBetween(startDate, endDate);

        const existingDates = schoolDays.map(d =>
            new Date(d.date).toISOString().split('T')[0]
        );

        const newDays = generatedDays
            .map(d => new Date(d)) // 👈 força Date
            .filter(date =>
                !existingDates.includes(date.toISOString().split('T')[0])
            )
            .map(date => ({
                date: date.toISOString(), // ✅ agora é seguro
                isSchoolDay: false
            }));

        setSchoolDays(prev => [...prev, ...newDays]);
    };

    const handleSubmit = async () => {
        // Verificação dos campos obrigatórios
        if (!totalGrade || !averageGrade) {
            setErrorMessage('Preencha todos os campos de nota antes de continuar.');
            return;
        }

        const selectedSchoolDays = schoolDays
            .filter(day => day.isSchoolDay)
            .map(day => ({
                date: day.date
            }));

        setLoading(true);

        const payload = {
            startday,
            startmonth,
            endday,
            endmonth,
            totalGrade,
            averageGrade,
            schoolDays: selectedSchoolDays,
            assessmentRegime: assessmentFormat // ✅ AGORA NUNCA ERRA
        };

        try {
            const res = await UpdateIVthQuarter(
                id_IstQuarter, payload
            );

            if (res) {
                alert('Bimestre atualizado com sucesso!');
                navigate(-1);
            } else {
                setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            setErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
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
                    {assessmentRegime === 'BIMESTRAL' && (
                        <h3>Edição do 2º Bimestre</h3>
                    )}
                    {assessmentRegime === 'TRIMESTRAL' && (
                        <h3>Edição do 2º Trimestre</h3>
                    )}
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
                        <button
                            type="button"
                            onClick={handleGenerateSchoolDays}
                            style={{
                                marginBottom: 10,
                                padding: '8px 12px',
                                borderRadius: 6,
                                border: '1px solid #ccc',
                                cursor: 'pointer',
                                background: '#f5f5f5'
                            }}
                        >
                            ➕ Gerar / Atualizar Dias Letivos pelo Período
                        </button>

                        <div style={{ marginTop: 20, width: '100%' }}>
                            <h4>Dias Letivos</h4>

                            <div
                                style={{
                                    maxHeight: 300,
                                    overflowY: 'auto',
                                    border: '1px solid #ddd',
                                    borderRadius: 6,
                                    padding: 10
                                }}
                            >
                                {[...schoolDays]
                                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                                    .map(day => (
                                        <label
                                            key={day._id || day.date}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 10,
                                                padding: '6px',
                                                background: day.isSchoolDay ? '#e6f4ea' : 'transparent',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={day.isSchoolDay}
                                                onChange={() => {
                                                    setSchoolDays(prev =>
                                                        prev.map(d =>
                                                            d.date === day.date
                                                                ? { ...d, isSchoolDay: !d.isSchoolDay }
                                                                : d
                                                        )
                                                    );
                                                }}
                                            />
                                            <span>
                                                {new Date(day.date).toLocaleDateString('pt-BR', {
                                                    weekday: 'long',
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </label>
                                    ))}

                            </div>
                        </div>
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
