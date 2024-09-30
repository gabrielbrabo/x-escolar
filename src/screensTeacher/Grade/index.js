import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    getIstQuarter,
    getIIndQuarter,
    getIIIrdQuarter,
    getIVthQuarter,
    GetMatter
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
            setMatter(res.data.data);
            setLoading(false);
        })()

    }, [])

    const messageButtonClick = () => {
        navigate(-1);
    };

    const signClick = async () => {
        setLoading(true);
        
        sessionStorage.setItem("Selectmatter", Selectmatter)
        
        if (Selectbimonthly === "1º BIMESTRE") {
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
                                    <option value={res.bimonthly}>{res.bimonthly}</option>
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