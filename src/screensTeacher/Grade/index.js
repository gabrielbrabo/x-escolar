import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    getIstQuarter,
    getIIndQuarter,
    getIIIrdQuarter,
    getIVthQuarter,
    getVthQuarter,
    getVIthQuarter,
    GetMatter,
    GetMatterDetails
} from '../../Api';

import {
    Container,
    ContainerDivs,
    Label,
    Select,
    InputArea,
    Input,
    Button,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    ErrorMessage
} from './style';

import LoadingSpinner from '../../components/Loading'

const Grade = () => {

    const navigate = useNavigate()
    const [assessmentFormat, setassessmentFormat] = useState('');
    const [I, setI] = useState([])
    const [II, setII] = useState([])
    const [III, setIII] = useState([])
    const [IV, setIV] = useState([])
    const [V, setV] = useState([])
    const [VI, setVI] = useState([])
    const [Selectbimonthly, setSelectbimonthly] = useState([])
    const [bimonthly, setbimonthly] = useState([])
    const [Selectmatter, setSelectMatter] = useState([])
    const [matter, setMatter] = useState([])

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school");
            const $assessmentFormat = sessionStorage.getItem('assessmentFormat')
            setassessmentFormat($assessmentFormat)
            const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
            const classRegentTeacher02 = sessionStorage.getItem("classRegentTeacher02");
            const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");
            const Id_employee = localStorage.getItem("Id_employee");
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

            const res = await GetMatter(JSON.parse(idSchool));

            setbimonthly([i, ii, iii, iv, v, vi].filter(res => res !== null));

            if (i !== null) {
                setI(i._id);
            }
            if (ii !== null) {
                setII(ii._id);
            }
            if (iii !== null) {
                setIII(iii._id);
            }
            if (iv !== null) {
                setIV(iv._id);
            }
            if (v !== null) {
                setV(v._id);
            }
            if (vi !== null) {
                setVI(vi._id);
            }
            console.log("disciplinas", res.data.data)
            if (classRegentTeacher === Id_employee) {
                const filterMatter = res.data.data.filter(res => {
                    if (res.name !== 'EDUCAÇÃO FÍSICA') {
                        if (res !== null) {
                            return res
                        }
                    }
                    return null
                })
                setMatter(filterMatter);
                console.log("filterMatter professor regent", filterMatter)
            } else if (classRegentTeacher02 === Id_employee) {
                const filterMatter = res.data.data.filter(res => {
                    if (res.name !== 'EDUCAÇÃO FÍSICA') {
                        if (res !== null) {
                            return res
                        }
                    }
                    return null
                })
                setMatter(filterMatter);
                console.log("filterMatter professor regent", filterMatter)
            } else if (physicalEducationTeacher === Id_employee) {
                const filterMatter = res.data.data.filter(res => {
                    if (res.name === 'EDUCAÇÃO FÍSICA') {
                        if (res !== null) {
                            return res
                        }
                    }
                    return null
                })
                setMatter(filterMatter);
                console.log("filterMatter", filterMatter)
            }
            console.log("classRegentTeache:", classRegentTeacher);
            console.log("Id_employee:", Id_employee);
            console.log("Comparison result:", classRegentTeacher === Id_employee);

            //setMatter(res.data.data);
            setLoading(false);
        })()

    }, [])

    const messageButtonClick = () => {
        navigate(-1);
    };

    const signClick = async () => {
        setLoading(true);

        const Matter = await GetMatterDetails(Selectmatter)
        if (Matter) {
            const nameMatter = Matter.data.name
            sessionStorage.setItem("nameMatter", nameMatter)
            console.log("nameMatter", nameMatter)
        } else {
            setErrorMessage('Erro, Verifique os dados e tente novamente.');
        }

        sessionStorage.setItem("Selectmatter", Selectmatter)
        sessionStorage.setItem("yearGrade", new Date().getFullYear().toString())

        if (Selectbimonthly === I) {
            sessionStorage.setItem("id-I", I)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                //navigate('/$st-quarter-grade') 
                navigate('/$st-activities')
            } else {
                navigate('/grade-istquarter')
            }

        } else if (Selectbimonthly === II) {
            sessionStorage.setItem("id-II", II)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate('/$$st-activities')
            } else {
                navigate('/grade-iindquarter')
            }
        } else if (Selectbimonthly === III) {
            sessionStorage.setItem("id-III", III)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate('/$$$st-activities')
            } else {
                navigate('/grade-iiirdquarter')
            }
        } else if (Selectbimonthly === IV) {
            sessionStorage.setItem("id-IV", IV)
            if (assessmentFormat === "grade") {
                console.log("assessmentFormat", assessmentFormat)
                navigate('/$$$$th-activities')
            } else {
                navigate('/grade-ivthquarter')
            }
        } else if (Selectbimonthly === V) {
            sessionStorage.setItem("id-V", V)
            navigate('/grade-vthquarter')
        } else if (Selectbimonthly === VI) {
            sessionStorage.setItem("id-VI", VI)
            navigate('/grade-vithquarter')
        } else {
            setErrorMessage('Erro, Verifique os dados e tente novamente.');
        }
        setLoading(false);
    };

    console.log('Selectmatter', Selectmatter)
    console.log('Selectbimonthly', Selectbimonthly)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    <h2>Selecione o Bimestre e Disciplina</h2>
                    <InputArea>
                        <Input>
                            <Label>Bimestre</Label>
                            <Select
                                id="id-bimonthly"
                                value={Selectbimonthly}
                                onChange={(e) => setSelectbimonthly(e.target.value)}
                            >
                                <option value="">Selecione</option>
                                {bimonthly.map(res => (
                                    <option key={res._id} value={res._id}>{res.bimonthly}</option>
                                ))
                                }
                            </Select>
                        </Input>
                        <Input>
                            <Label>Disciplina</Label>
                            <Select
                                id="id-matter"
                                value={Selectmatter}
                                onChange={(e) => setSelectMatter(e.target.value)}
                            >
                                <option value="">Selecione</option>
                                {matter.map(res => (
                                    <option value={res._id}>{res.name}</option>
                                ))
                                }
                            </Select>
                        </Input>
                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        <Button onClick={signClick}>Definir</Button>
                        <ToGoBack onClick={messageButtonClick}>
                            <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                            <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                        </ToGoBack>
                    </InputArea>
                </ContainerDivs>
            }
        </Container>
    )
}

export default Grade