import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    getIstQuarter,
    getIIndQuarter,
    getIIIrdQuarter,
    getIVthQuarter,
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
    const [I, setI] = useState([])
    //const [II, setII] = useState([])
    //const [III, setIII] = useState([])
    //const [IV, setIV] = useState([])
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
            const year = new Date().getFullYear();
            const IstQuarter = await getIstQuarter(year, JSON.parse(idSchool))
            const IIndQuarter = await getIIndQuarter(year, JSON.parse(idSchool))
            const IIIrdQuarter = await getIIIrdQuarter(year, JSON.parse(idSchool))
            const IVthQuarter = await getIVthQuarter(year, JSON.parse(idSchool))

            const i = IstQuarter.data.data.find(res => res) || null;
            const ii = IIndQuarter.data.data.find(res => res) || null;
            const iii = IIIrdQuarter.data.data.find(res => res) || null;
            const iv = IVthQuarter.data.data.find(res => res) || null;

            const res = await GetMatter(JSON.parse(idSchool));

            setbimonthly([i, ii, iii, iv].filter(res => res !== null));

            if (i !== null) {
                setI(i._id);
            }
            /*if (ii !== null) {
                setII(ii._id);
            }
            if (iii !== null) {
                setIII(iii._id);
            }
            if (iv !== null) {
                setIV(iv._id);
            }*/
            setMatter(res.data.data);
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
        }

        sessionStorage.setItem("Selectmatter", Selectmatter)
        sessionStorage.setItem("yearGrade", new Date().getFullYear().toString())

        if (Selectbimonthly === I) {
            sessionStorage.setItem("id-I", I)
            navigate('/grade-istquarter')
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
                            <Label>Materia</Label>
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