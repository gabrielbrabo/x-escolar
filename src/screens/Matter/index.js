import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMatter } from '../../Api';

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    DivNewEmp,
    DivAddEmp,
    FormSearch,
    Btt02,
    AreaEmp,
    InputEmp,
} from './style';

import LoadingSpinner from '../../components/Loading';

const Matter = () => {
    const navigate = useNavigate();
    const [matter, setMatter] = useState([]);
    const [busca, setBusca] = useState("");
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

    matter.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

    const NewMatter = async () => {
        navigate('/new/matter');
    };

    const DeleteMatter = async () => {
        navigate('/delete/matter');
    };

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h1>Materias</h1>
                    <Search>
                        <FormSearch>
                            <label>Buscar Matéria</label>
                            <AreaEmp>
                                <InputEmp
                                    type="text"
                                    placeholder="Buscar por nome"
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                />
                            </AreaEmp>
                        </FormSearch>
                    </Search>
                    <List>
                        <DivAddEmp>
                            <DivNewEmp>
                                <Btt02 onClick={NewMatter}>Nova Matéria</Btt02>
                            </DivNewEmp>
                            <DivNewEmp>
                                <Btt02 onClick={DeleteMatter}>Apagar Matéria</Btt02>
                            </DivNewEmp>
                        </DivAddEmp>
                        {matter
                            .filter((val) => {
                                if (!busca) return val;
                                if (val.name.toUpperCase().includes(busca.toUpperCase())) return val;
                                return null;
                            })
                            .map((matter) => (
                                <Emp key={matter._id}>
                                    <Span>{matter.name}</Span>
                                </Emp>
                            ))}
                    </List>
                </>
            )}
        </Container>
    );
};

export default Matter;
