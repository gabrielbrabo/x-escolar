import React, { useState, useEffect } from 'react';
import { updateClass, getClassDetails } from '../../Api'; // Funções da API para obter e atualizar os detalhes do funcionário
import { useNavigate } from 'react-router-dom';
import {
    Container,
    InputArea,
    ToGoBack,
    Input,
    Select,
    Btt01,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    ErrorMessage
} from './style';
import LoadingSpinner from '../../components/Loading';

const EditProfile = () => {
    const navigate = useNavigate();
    const [cla$$, setCla$$] = useState({});
    const [serie, setSerie] = useState('');
    const [level, setLevel] = useState('');
    const [shift, setShift] = useState('');
    const [classroom_number, setClassroom_number] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idStudent = sessionStorage.getItem("ClassInformation");
            const res = await getClassDetails(idStudent);
            console.log("getClass", res.data)
            setCla$$(res.data);
            setSerie(res.data.serie || '');
            setLevel(res.data.level || '');
            setShift(res.data.shift || '');
            setClassroom_number(res.data.classroom_number || '');
            setLoading(false);
        })();
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        const res = await updateClass(
            cla$$._id,
            serie.toUpperCase(),
            level.toUpperCase(),
            shift.toUpperCase(),
            classroom_number
        );

        if (res) {
            alert('Turma atualizado com sucesso!');
            navigate(-1); // Redireciona para o dashboard após a atualização
        } else {
            setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
        }
        setLoading(false);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <h2>Edição de Truma</h2>
                    <InputArea>
                        <label>Série</label>
                        <Input
                            placeholder="Digite a série e numero da truma Ex: 3º ano 01"
                            value={serie}
                            onChange={(e) => setSerie(e.target.value)}
                        />
                        {/*<label>Nível</label>
                        <Input
                            placeholder="Digite o nível"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        />*/}
                        <label>Turno</label>
                        <Select
                            id="shift"
                            value={shift}
                            onChange={(e) => setShift(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="MATUTINO">Matutino</option>
                            <option value="VESPERTINO">Vespertino</option>
                            <option value="NOTURNO">Noturno</option>
                        </Select>
                        {/*<label>Número da Sala</label>
                        <Input
                            placeholder="Digite o número da sala"
                            value={classroom_number}
                            onChange={(e) => setClassroom_number(e.target.value)}
                        />*/}
                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        <Btt01 onClick={handleSubmit}>Salvar Alterações</Btt01>
                        <ToGoBack onClick={handleGoBack}>
                            <SignMessageButtonText>Voltar ao</SignMessageButtonText>
                            <SignMessageButtonTextBold>Dashboard</SignMessageButtonTextBold>
                        </ToGoBack>
                    </InputArea>
                </>
            }
        </Container>
    );
};

export default EditProfile;
