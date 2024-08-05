import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetMatter, addMttr } from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    User,
    FormSearch,
    AddMatter,
    AreaEmp,
    InputEmp,
    Btt01,
    LoadingSpinner
} from './style';

const MatterAdd = () => {

    const navigate = useNavigate();
    const [matter, setMatter] = useState([]);
    const [busca, setBusca] = useState("");
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
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <User />
                    <Search>
                        <FormSearch>
                            <label>Buscar Matéria</label>
                            <AreaEmp>
                                <InputEmp
                                    type="text"
                                    placeholder='Buscar por nome'
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                />
                            </AreaEmp>
                        </FormSearch>
                    </Search>
                    <p>Clique em uma Matéria abaixo para adicionar ao Professor</p>
                    <List>
                        {matter.filter((val) => {
                            if (!busca) {
                                return val;
                            } else if (val.name.toUpperCase().includes(busca.toUpperCase())) {
                                return val;
                            }
                            return null;
                        }).map(matter => (
                            <Emp
                                onClick={() => handleAddMatter(matter)}
                                key={matter._id}>
                                <Span>{matter.name}</Span>
                            </Emp>
                        ))}
                    </List>
                    {nameMatter && (
                        <AddMatter>
                            {added ? (
                                <Btt01 onClick={handleRemoveMatter}>
                                    Adicionar outra Matéria para o Professor {nameEmployee}
                                </Btt01>
                            ) : (
                                <div>
                                    <div>
                                        <p>Adicionar {nameMatter} ao professor {nameEmployee}</p>
                                        <Btt01 onClick={handleSignClick}>Adicionar</Btt01>
                                    </div>
                                    <div>
                                        <Btt01 onClick={handleCancel}>Cancelar</Btt01>
                                    </div>
                                </div>
                            )}
                            {added && <Btt01 onClick={handleFinish}>Finalizar cadastro</Btt01>}
                        </AddMatter>
                    )}
                </>
            )}
        </Container>
    )
}

export default MatterAdd;
