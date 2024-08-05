import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetMatter, addMttr } from '../../Api'

import {
    PageContainer,
    SearchSection,
    MatterList,
    MatterItem,
    MatterName,
    SearchForm,
    SearchInputWrapper,
    SearchInput,
    AddMatterSection,
    Button,
    Message,
    LoadingSpinner,
    WarningBox,
    ActionButtons
} from './style';

const MatterAdd = () => {

    const navigate = useNavigate();
    const [matter, setMatter] = useState([]);
    const [search, setSearch] = useState("");
    const [idMatter, setIdMatter] = useState("");
    const [idEmployee, setIdEmployee] = useState("");
    const [nameMatter, setNameMatter] = useState("");
    const [nameEmployee, setNameEmployee] = useState("");
    const [added, setAdded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school");
            const res = await GetMatter(JSON.parse(idSchool));
            setMatter(res.data.data);
            setLoading(false);
        })();
    }, []);

    matter.sort((a, b) => a.name.localeCompare(b.name));

    const handleAddMatter = async (matter) => {
        setLoading(true);
        sessionStorage.setItem("id_matter", matter._id);
        setNameEmployee(sessionStorage.getItem("name"));
        setNameMatter(matter.name);
        setIdMatter(matter._id);
        setIdEmployee(sessionStorage.getItem("id_emp"));
        setLoading(false);
    }

    const handleSignClick = async () => {
        setLoading(true);
        const res = await addMttr(idEmployee, idMatter);
        if (res) {
            alert('Matéria adicionada com sucesso.');
            setAdded(true);
        }
        setLoading(false);
    }

    const handleRemoveMatter = async () => {
        setAdded(false);
        setNameMatter("");
    }

    const handleCancel = async () => {
        setNameMatter("");
    }

    const handleFinish = async () => {
        setLoading(true);
        const auth = sessionStorage.getItem("tchrnf");
        if (auth) {
            sessionStorage.removeItem('tchrnf');
            navigate(`/employee/info/${auth}`);
        } else {
            navigate('/employees');
        }
        setLoading(false);
    }

    return (
        <PageContainer>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h1>Materias</h1>
                    <SearchSection>
                        <SearchForm>
                            <label>Buscar Matéria</label>
                            <SearchInputWrapper>
                                <SearchInput
                                    type="text"
                                    placeholder='Buscar por nome'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </SearchInputWrapper>
                        </SearchForm>
                    </SearchSection>
                    <Message>Clique em uma Matéria abaixo para adicionar ao Professor</Message>
                    <MatterList>
                        {matter.filter((val) => {
                            if (!search) {
                                return val;
                            } else if (val.name.toUpperCase().includes(search.toUpperCase())) {
                                return val;
                            }
                            return null;
                        }).map(matter => (
                            <MatterItem
                                onClick={() => handleAddMatter(matter)}
                                key={matter._id}>
                                <MatterName>{matter.name}</MatterName>
                            </MatterItem>
                        ))}
                    </MatterList>
                    {nameMatter && (
                        <AddMatterSection>
                            <WarningBox>
                                Adicionar {nameMatter} ao professor {nameEmployee}
                            </WarningBox>
                            <ActionButtons>
                                {added ? (
                                    <Button onClick={handleRemoveMatter}>
                                        Adicionar outra Matéria para o Professor {nameEmployee}
                                    </Button>
                                ) : (
                                    <div>
                                        <Button onClick={handleSignClick}>Adicionar</Button>
                                        <Button onClick={handleCancel}>Cancelar</Button>
                                    </div>
                                )}
                                {added && <Button onClick={handleFinish}>Finalizar cadastro</Button>}
                            </ActionButtons>
                        </AddMatterSection>
                    )}
                </>
            )}
        </PageContainer>
    )
}

export default MatterAdd;
