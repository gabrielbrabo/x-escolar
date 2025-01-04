import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getIstQuarter,
    getIIndQuarter,
    getIIIrdQuarter,
    getIVthQuarter,
    getVthQuarter,
    getVIthQuarter,
    clssInfo,
    IndexIndividualForm
} from '../../Api';

import {
    Container,
    ContainerDivs,
    Label,
    Select,
    InputArea,
    Input,
    List,
    Span,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    EmpChecked,
    EmpStdt
} from './style';

import LoadingSpinner from '../../components/Loading';

const IndividualForm = () => {
    const navigate = useNavigate();
    const [Selectbimonthly, setSelectbimonthly] = useState();
    const [bimonthly, setBimonthly] = useState([]);
    const [year, setYear] = useState([]);
    const [id_class, setId_class] = useState([]);
    const [stdt, setStdt] = useState([]);
    const [checked, setChecked] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school");
            const idClass = sessionStorage.getItem("class-info");
            const selectbi = sessionStorage.getItem("Selectbimonthly");

            setSelectbimonthly(selectbi ? JSON.parse(selectbi) : null);
            setId_class(idClass);
            setYear(new Date().getFullYear());
            const year = new Date().getFullYear();
            const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
            const IIndQuarter = await getIIndQuarter(year, JSON.parse(idSchool))
            const IIIrdQuarter = await getIIIrdQuarter(year, JSON.parse(idSchool))
            const IVthQuarter = await getIVthQuarter(year, JSON.parse(idSchool))
            const VthQuarter = await getVthQuarter(year, JSON.parse(idSchool))
            const VIthQuarter = await getVIthQuarter(year, JSON.parse(idSchool))

            const i = IstQuarter.data.data.find(res => res) || null;
            const ii = IIndQuarter.data.data.find(res => res) || null;
            const iii = IIIrdQuarter.data.data.find(res => res) || null;
            const iv = IVthQuarter.data.data.find(res => res) || null;
            const v = VthQuarter.data.data.find(res => res) || null;
            const vi = VIthQuarter.data.data.find(res => res) || null;

            setBimonthly([i, ii, iii, iv, v, vi].filter(res => res !== null));
            setLoading(false);
        })()

    }, [year, id_class]);

    useEffect(() => {
        // Carrega dados específicos após a seleção do bimestre
        const loadIndividualFormData = async () => {
            if (!Selectbimonthly) return;

            const bimestreMapping = {
                "1º BIMESTRE": "id_iStQuarter",
                "2º BIMESTRE": "id_iiNdQuarter",
                "3º BIMESTRE": "id_iiiRdQuarter",
                "4º BIMESTRE": "id_ivThQuarter",
                "5º BIMESTRE": "id_vThQuarter",
                "6º BIMESTRE": "id_viThQuarter",
            };

            const quarterIdKey = bimestreMapping[Selectbimonthly.bimonthly];
            if (quarterIdKey) {
                try {
                    const idQuarter = Selectbimonthly._id;
                    const res = await IndexIndividualForm({
                        year,
                        id_class,
                        [quarterIdKey]: idQuarter,
                    });
                        
                    const GradeRealized = res.data.map(res => res.id_student._id);
                    const resClass = await clssInfo(id_class);
                    const student = resClass.data.data.find(res => res)?.id_student
                        .filter(student => student && !GradeRealized.includes(student._id));

                    setStdt(student);
                    setChecked(res.data);
                    console.log('resposta back',resClass)
                    console.log("individual form", res.data);

                    // Salva Selectbimonthly no sessionStorage
                    sessionStorage.setItem("Selectbimonthly", JSON.stringify(Selectbimonthly));
                } catch (error) {
                    console.error("Erro ao buscar dados:", error);
                }
            }
        };

        loadIndividualFormData();
    }, [Selectbimonthly, year, id_class]);

    const handleBimonthlyChange = (e) => {
        const selectedBimonthly = JSON.parse(e.target.value);
        setSelectbimonthly(selectedBimonthly);
        sessionStorage.setItem("Selectbimonthly", JSON.stringify(selectedBimonthly));
    };

    const handleIndividualForm = (stdt) => {
        console.log("stdt", stdt)
        sessionStorage.setItem("stdt", JSON.stringify(stdt));
        sessionStorage.setItem("nmstdt", JSON.stringify(stdt.name));
        navigate('/form')
    };

    const handleExistForm = (stdt) => {
        console.log("stdt", stdt)
        sessionStorage.setItem("nmstdt", JSON.stringify(stdt.id_student.name));
        const IndividualForm = stdt._id;
        console.log("IndividualForm", IndividualForm)
        navigate(`/exist-form/${IndividualForm}`)
    };

    const messageButtonClick = () => {
        navigate(-1);
    };

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ContainerDivs>
                    <InputArea>
                        {!Selectbimonthly && (
                            <>
                                <h2>Selecione o Bimestre</h2>
                                <Input>
                                    <Label>Bimestre</Label>
                                    <Select
                                        id="id-bimonthly"
                                        value={Selectbimonthly ? JSON.stringify(Selectbimonthly) : ""}
                                        onChange={handleBimonthlyChange}
                                    >
                                        <option value="">Selecione</option>
                                        {bimonthly.map(res => (
                                            <option key={res._id} value={JSON.stringify({ _id: res._id, bimonthly: res.bimonthly })}>
                                                {res.bimonthly}
                                            </option>
                                        ))}
                                    </Select>
                                </Input>
                                <ToGoBack onClick={messageButtonClick}>
                                    <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                                    <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                                </ToGoBack>
                            </>
                        )}
                    </InputArea>
                    {Selectbimonthly && (
                        <>
                            <h3>Click no aluno em que deseja adicionar ficha individual</h3>
                            <List>
                                {stdt
                                .sort((a, b) => a.name.localeCompare(b.name)) // Ordena em ordem alfabética
                                .map(stdt => (
                                    stdt && stdt._id ? (
                                        <EmpStdt onClick={() => handleIndividualForm(stdt)} key={stdt._id}>
                                            <Span>{stdt.name}</Span>
                                        </EmpStdt>
                                    ) : null
                                ))}
                            </List>

                            <h3>Alunos que já têm ficha individual</h3>
                            <List>
                                {checked
                                .sort((a, b) => a.id_student.name.localeCompare(b.id_student.name)) // Ordena em ordem alfabética
                                .map(stdt => (
                                    stdt && stdt.id_student && stdt.id_student._id ? (
                                        <EmpChecked onClick={() => handleExistForm(stdt)} key={stdt.id_student._id}>
                                            <Span>{stdt.id_student.name}</Span>
                                        </EmpChecked>
                                    ) : null
                                ))}
                            </List>
                            <ToGoBack onClick={messageButtonClick}>
                                <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                                <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                            </ToGoBack>
                        </>
                    )}
                </ContainerDivs>
            )}
        </Container>
    );
};

export default IndividualForm;
