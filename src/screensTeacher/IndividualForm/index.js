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

import { TiArrowSortedDown } from "react-icons/ti";
import { SlActionUndo } from "react-icons/sl";

const IndividualForm = () => {
    const navigate = useNavigate();
    const [open, setopen] = useState('aberto')
    const [Selectbimonthly, setSelectbimonthly] = useState(null);
    const [bimonthly, setBimonthly] = useState([]);
    const [year, setYear] = useState([]);
    const [$Class, set$Class] = useState(null);
    const [id_class, setId_class] = useState([]);
    const [id_teacher, setid_teacher] = useState([]);
    const [stdt, setStdt] = useState([]);
    const [checked, setChecked] = useState([]);
    const [loading, setLoading] = useState(false);

    const [RegentTeacher, setclassRegentTeacher] = useState([]);
    const [RegentTeacher02, setclassRegentTeacher02] = useState([]);
    const [physicalEducation, setphysicalEducationTeacher] = useState([]);


    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school");
            const idClass = sessionStorage.getItem("class-info");
            const selectbi = sessionStorage.getItem("Selectbimonthly");
            const id_employee = localStorage.getItem("Id_employee");

            setSelectbimonthly(selectbi ? JSON.parse(selectbi) : null);
            setId_class(idClass);
            setid_teacher(JSON.parse(id_employee))
            const resClass = await clssInfo(idClass);
            set$Class(resClass)
            const $yearClass = resClass.data.data.find(clss => {
                return clss.year
            })
            setYear($yearClass.year)
            const IstQuarter = await getIstQuarter($yearClass.year, JSON.parse(idSchool))
            const IIndQuarter = await getIIndQuarter($yearClass.year, JSON.parse(idSchool))
            const IIIrdQuarter = await getIIIrdQuarter($yearClass.year, JSON.parse(idSchool))
            const IVthQuarter = await getIVthQuarter($yearClass.year, JSON.parse(idSchool))
            const VthQuarter = await getVthQuarter($yearClass.year, JSON.parse(idSchool))
            const VIthQuarter = await getVIthQuarter($yearClass.year, JSON.parse(idSchool))

            const i = IstQuarter.data.data.find(res => res) || null;
            const ii = IIndQuarter.data.data.find(res => res) || null;
            const iii = IIIrdQuarter.data.data.find(res => res) || null;
            const iv = IVthQuarter.data.data.find(res => res) || null;
            const v = VthQuarter.data.data.find(res => res) || null;
            const vi = VIthQuarter.data.data.find(res => res) || null;

            setBimonthly([i, ii, iii, iv, v, vi].filter(res => res !== null));

            const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
            const classRegentTeacher02 = sessionStorage.getItem("classRegentTeacher02");
            const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");

            setclassRegentTeacher(JSON.parse(classRegentTeacher))
            setclassRegentTeacher02(JSON.parse(classRegentTeacher02))
            setphysicalEducationTeacher(JSON.parse(physicalEducationTeacher))

            setLoading(false);
        })()

    }, [year, id_class]);

    useEffect(() => {
        const loadIndividualFormData = async () => {
            setLoading(true);
            if (!Selectbimonthly) return;

            //setopen(Selectbimonthly.statusSupervisor);
            if (!$Class || !$Class.data || !$Class.data.data) {
                console.warn("⚠️ $Class ainda não chegou");
                setLoading(false);
                return;
            }

            console.log("teste", Selectbimonthly.bimonthly)
            //const resClass = await clssInfo(id_class); // ✅ Aqui você espera a Promise

            const turma = $Class.data.data[0];

            if (Selectbimonthly.bimonthly === "1º BIMESTRE") {
                if (id_teacher !== physicalEducation) {
                    setopen(turma.dailyStatus["1º BIMESTRE"].regentTeacher);
                } else {
                    setopen(turma.dailyStatus["1º BIMESTRE"].physicalEducationTeacher);
                }
            }
            if (Selectbimonthly.bimonthly === "2º BIMESTRE") {
                if (id_teacher !== physicalEducation) {
                    setopen(turma.dailyStatus["2º BIMESTRE"].regentTeacher);
                } else {
                    setopen(turma.dailyStatus["2º BIMESTRE"].physicalEducationTeacher);
                }
            }
            if (Selectbimonthly.bimonthly === "3º BIMESTRE") {
                if (id_teacher !== physicalEducation) {
                    setopen(turma.dailyStatus["3º BIMESTRE"].regentTeacher);
                } else {
                    setopen(turma.dailyStatus["3º BIMESTRE"].physicalEducationTeacher);
                }
            }
            if (Selectbimonthly.bimonthly === "4º BIMESTRE") {
                if (id_teacher !== physicalEducation) {
                    setopen(turma.dailyStatus["4º BIMESTRE"].regentTeacher);
                } else {
                    setopen(turma.dailyStatus["4º BIMESTRE"].physicalEducationTeacher);
                }
            }

            const bimestreMapping = {
                "1º BIMESTRE": "id_iStQuarter",
                "2º BIMESTRE": "id_iiNdQuarter",
                "3º BIMESTRE": "id_iiiRdQuarter",
                "4º BIMESTRE": "id_ivThQuarter",
                "5º BIMESTRE": "id_vThQuarter",
                "6º BIMESTRE": "id_viThQuarter",
            };

            const quarterIdKey = bimestreMapping[Selectbimonthly.bimonthly];
            console.log('quarterIdKey', quarterIdKey);
            console.log('Selectbimonthly', Selectbimonthly);

            if (quarterIdKey) {
                try {
                    const idQuarter = Selectbimonthly._id;
                    console.log("RegentTeacher", RegentTeacher);
                    if (RegentTeacher02 === id_teacher) {
                        
                        const res = await IndexIndividualForm({
                            year,
                            id_class,
                            id_teacher: RegentTeacher,
                            [quarterIdKey]: idQuarter,
                        });

                        console.log("individual form", res);
                        const GradeRealized = res.data.map(res => res?.id_student?._id || []);

                       // const resClass = await clssInfo(id_class);
                        console.log("individual GradeRealized", GradeRealized);

                        const student = $Class.data.data.find(res => res)
                            ?.id_student.filter(student => student && !GradeRealized.includes(student._id));

                        setStdt(student);

                        if (res.data) {
                            const result = res.data.filter(res => res != null);
                            setChecked(result);
                        }

                        //console.log('resposta back', resClass);
                        console.log("individual form", res.data);

                    } else {
                        const res = await IndexIndividualForm({
                            year,
                            id_class,
                            id_teacher,
                            [quarterIdKey]: idQuarter,
                        });

                        console.log("individual form", res);
                        const GradeRealized = res.data.map(res => res?.id_student?._id || []);

                        //const resClass = await clssInfo(id_class);
                        console.log("individual GradeRealized", GradeRealized);

                        const student = $Class.data.data.find(res => res)
                            ?.id_student.filter(student => student && !GradeRealized.includes(student._id));

                        setStdt(student);

                        if (res.data) {
                            const result = res.data.filter(res => res != null);
                            setChecked(result);
                        }

                        console.log('resposta back', $Class.data.data[0]);
                        console.log("individual form", res.data);
                    }

                    sessionStorage.setItem("Selectbimonthly", JSON.stringify(Selectbimonthly));
                } catch (error) {
                    console.error("Erro ao buscar dados:", error);
                } finally {
                    setLoading(false); // Garantindo que sempre será executado
                }
            } else {
                setLoading(false); // Se não houver quarterIdKey, evita travamento
            }
        };

        loadIndividualFormData();
    }, [$Class, Selectbimonthly, year, id_class, id_teacher, RegentTeacher, RegentTeacher02, physicalEducation]);

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

    const Return = () => {
        navigate(-1)
    };

    console.log("open", open)
    console.log("stdt", stdt)
    console.log("checked", checked)
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
                                            <option key={res._id} value={JSON.stringify({ _id: res._id, bimonthly: res.bimonthly, statusSupervisor: res.statusSupervisor })}>
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
                        open === 'aberto' ? (
                            <>
                                <SlActionUndo fontSize={'30px'} onClick={Return} />
                                <h3>Click no aluno para adicionar a ficha individual</h3>
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
                                <TiArrowSortedDown fontSize={'30px'} style={{ width: "100%" }} />
                                {
                                    <List>
                                        {checked
                                            .sort((a, b) => a.id_student.name.localeCompare(b.id_student.name)) // Ordena em ordem alfabética
                                            .map(stdt => (
                                                stdt && stdt.id_student && stdt.id_student._id ? (
                                                    <EmpChecked onClick={() => handleExistForm(stdt)} key={stdt.id_student._id}>
                                                        <Span>{stdt.id_student.name}</Span>
                                                    </EmpChecked>
                                                ) : null
                                            ))
                                        }
                                    </List>}
                                <ToGoBack onClick={messageButtonClick}>
                                    <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                                    <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                                </ToGoBack>
                            </>
                        ) : (
                            <p>{Selectbimonthly.bimonthly} fechado, para editar contate o Diretor ou Supervisor.</p>
                        )
                    )}
                </ContainerDivs>
            )}
        </Container>
    );
};

export default IndividualForm;
