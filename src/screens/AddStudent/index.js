import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetStudent, addStdt } from '../../Api';
import {
    Container,
    List,
    Emp,
    Span,
    Search,
    FormSearch,
    Add,
    Btt01,
    AreaEmp,
    InputEmp,
    DivButtonAdd,
    Btt02,
    ButtonCancel,
} from './style';
import LoadingSpinner from '../../components/Loading';

const StudentAdd = () => {
    const navigate = useNavigate();
    const [id_student, setId_student] = useState("");
    const [id_class, setId_class] = useState("");
    const [name_student, setName_student] = useState("");
    const [serie, setSerie] = useState("");
    const [student, setStudent] = useState([]);
    const [busca, setBusca] = useState("");
    const [added, setAdded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school");
            setId_class(sessionStorage.getItem("ClassInformation"));
            const resStudent = await GetStudent(JSON.parse(idSchool));
            setStudent(resStudent.data.data);
            setLoading(false);
        })();
    }, []);

    student.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

    const addStudent = async (student) => {
        setLoading(true);
        sessionStorage.setItem("id_student", student._id);
        setSerie(sessionStorage.getItem("serieClass"));
        setName_student(student.name);
        setId_student(student._id);
        setLoading(false);
    };

    const SignClick = async () => {
        setLoading(true);
        const res = await addStdt(id_student, id_class);
        if (res) {
            setAdded(true);
        }
        setLoading(false);
    };

    const remove = () => {
        setAdded(false);
        setName_student('');
    };

    const Finish = () => {
        navigate(-1); 
    };

    const Return = () => {
        setName_student('');
    };

    const Cancel = async () => {
        navigate(-1); 
    }

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Search>
                        <FormSearch>
                            <label>Buscar Aluno</label>
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
                    {name_student && (
                        <Add>
                            {added ? (
                                <div>
                                    <>Aluno {name_student} foi adicionado ao {serie} </>
                                    <DivButtonAdd>
                                        <Btt01 onClick={remove}>
                                            Adicionar outro aluno ao {serie}
                                        </Btt01>
                                        <Btt01 onClick={Finish}>Finalizar</Btt01>
                                    </DivButtonAdd>
                                </div>
                            ) : (

                                <div>
                                    <>Adicionar {name_student} ao {serie} </>
                                    <DivButtonAdd>
                                        <Btt01 onClick={SignClick}>Adicionar</Btt01>
                                        <Btt01 onClick={Return}>Voltar</Btt01>
                                    </DivButtonAdd>
                                </div>

                            )}
                        </Add>
                    )}
                    { ! name_student && (
                    <List>
                        {student
                            .filter((val) =>
                                busca ? val.name.includes(busca.toUpperCase()) : val
                            )
                            .map((student) => (
                                <Emp key={student._id} onClick={() => addStudent(student)}>
                                    <Span>{student.name}</Span>
                                </Emp>
                            ))}
                    </List>
                    )}
                </>
            )}
            <ButtonCancel>
                <Btt02 onClick={Cancel}>Cancelar</Btt02>
            </ButtonCancel>
        </Container>
    );
};

export default StudentAdd;
