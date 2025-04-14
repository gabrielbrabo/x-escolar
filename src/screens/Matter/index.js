import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMatter, NewMttr, updateMatter } from '../../Api';

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
    EditContainer,
    BoxButtonEdit
} from './style';

import LoadingSpinner from '../../components/Loading';

const Matter = () => {
    const navigate = useNavigate();

    const [matter, setMatter] = useState([]);
    const [name, setname] = useState('');

    const [EditingMatter, setEditingMatter] = useState(null);
    const [EditingName, setEditingName] = useState('');
    const [/*nameMatter*/, setNamesMatter] = useState('');

    const [idSchool, setIdSchool] = useState([]);
    const [busca, setBusca] = useState("");
    const [positionAtSchool, setPositionAtSchool] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_school = sessionStorage.getItem("id-school");
            setIdSchool(JSON.parse(id_school))
            const res = await GetMatter(JSON.parse(id_school));
            const position = localStorage.getItem('position_at_school');
            setPositionAtSchool(position);
            setMatter(res.data.data);
            const nMatter = 'EDUCAÇÃO FÍSICA';
            setname(nMatter)
            setLoading(false);
        })();
    }, []);
    console.log("isSubmitting", isSubmitting)
    useEffect(() => {
        const createMatter = async () => {

            console.log("name", name)
            console.log("idSchool", idSchool)
            console.log("matterTest", matter)
            const resNewMatter = await NewMttr(idSchool, name);
            if (resNewMatter.status === 200) {
                console.log("resposta backend", resNewMatter);
                setIsSubmitting(true)
                window.location.reload()
            } else {
                setIsSubmitting(false)
            }
        }

        if (matter.length <= 0 && !isSubmitting && name && idSchool) {
            createMatter();
        }
    }, [matter, name, idSchool, isSubmitting]);


    /*useEffect(() => {
        const createMatter = async () => {
            const name = 'EDUCAÇÃO FÍSICA';
            if (matter.length <= 0) {
                const resNewMatter = await NewMttr(idSchool, name);
                if (resNewMatter) {
                    window.location.reload()
                }
                console.log("resNewMatter", resNewMatter);
            }
        };

        createMatter();
    }, [matter, idSchool]);*/

    matter.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

    const NewMatter = async () => {
        navigate('/new/matter');
    };

    /*const DeleteMatter = async () => {
        navigate('/delete/matter');
    };*/

    const colors = ["#A5D6A7", "#90CAF9", "#FFCC80", "#CE93D8", "#80DEEA", "#FFAB91", "#DCE775", "#B0BEC5"];

    const startEditing = (matter) => {
        setEditingMatter(matter._id);
        setEditingName(matter.name);
        setNamesMatter(matter)
    };

    const saveEdit = async () => {
        setLoading(true)
        if (!EditingName.trim()) {
            alert("O nome do componente curricular não pode estar vazio.");
            setLoading(false)
            return;
        }

        await updateMatter(EditingMatter, EditingName.toLocaleUpperCase())
        window.location.reload()
        //setLoading(false)
    };

    console.log("matter", matter)
    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h2>Componentes Curriculares</h2>
                    <Search>
                        <FormSearch>
                            <label>Buscar</label>
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

                        {/*<p>Adicione uma disciplina de cada vez !!!</p>*/}
                        <DivAddEmp>
                            {positionAtSchool !== 'PROFESSOR' && (
                                <DivNewEmp>
                                    <Btt02 onClick={NewMatter}>Cadastrar</Btt02>
                                </DivNewEmp>
                            )}
                            {/*positionAtSchool === 'DIRETOR/SUPERVISOR' && (
                                <DivNewEmp>
                                    <Btt02 onClick={DeleteMatter}>Apagar</Btt02>
                                </DivNewEmp>
                            )*/}
                        </DivAddEmp>
                        {matter.length > 0 && !EditingMatter
                            ? (
                                <>
                                    {matter
                                        .filter((val) => {
                                            if (!busca) return val;
                                            if (val.name.toUpperCase().includes(busca.toUpperCase())) return val;
                                            return null;
                                        })
                                        .map((matter, index) => (
                                            <Emp key={matter._id} style={{ backgroundColor: colors[index % colors.length] }}>
                                                <Span>{matter.name}</Span>
                                                {positionAtSchool !== 'PROFESSOR' && matter.name.toUpperCase() !== 'EDUCAÇÃO FÍSICA' && (
                                                    <Btt02
                                                        onClick={() => startEditing(matter)}
                                                        style={{ backgroundColor: 'white', color: 'black' }}
                                                    >
                                                        Editar
                                                    </Btt02>
                                                )}
                                            </Emp>
                                        ))}
                                </>
                            )
                            :
                            (
                                <>
                                    <p>nenhuma componente cadastrada</p>
                                </>
                            )
                        }

                    </List>

                    {EditingMatter && (
                        <EditContainer>
                            <div>
                                <h3>Editando Componente Curricular</h3>
                                <>Nome da Disciplina</>
                                <input
                                    placeholder="Digite o nome da disciplina"
                                    value={EditingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                />
                                <BoxButtonEdit>
                                    <Btt02 onClick={saveEdit}>Salvar</Btt02>
                                    <Btt02 onClick={() => setEditingMatter(null)}>Cancelar</Btt02>
                                </BoxButtonEdit>
                            </div>
                        </EditContainer>
                    )}

                </>
            )}
        </Container>
    );
};

export default Matter;
