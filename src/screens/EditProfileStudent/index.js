import React, { useState, useEffect } from 'react';
import { updateStudent, getStudentDetails } from '../../Api'; // Funções da API para obter e atualizar os detalhes do funcionário
import { useNavigate } from 'react-router-dom';
import {
    Container,
    InputArea,
    ToGoBack,
    Input,
    Btt01,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    ErrorMessage,
    Select
} from './style';
import LoadingSpinner from '../../components/Loading';

const EditProfile = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({});
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [sex, setSex] = useState('');
    const [race, setRace] = useState('');
    const [Registration, setRegistration] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [fatherCellPhone, setFatherCellPhone] = useState('');
    const [entryDate, setentryDate] = useState('');
    const [departureDate, setdepartureDate] = useState('');
    const [admissionDate, setadmissionDate] = useState('');
    const [motherName, setmotherName] = useState()
    const [fatherName, setfatherName] = useState()
    const [motherCellPhone, setmotherCellPhone] = useState()
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idStudent = sessionStorage.getItem("StudentInformation");
            const res = await getStudentDetails(idStudent);
            console.log("getStudent", res.data)
            setStudent(res.data);
            setName(res.data.name || '');
            setDateOfBirth(res.data.dateOfBirth || '');
            setSex(res.data.sex || '');
            setRace(res.data.race || '');
            setCpf(res.data.cpf || '');
            setRg(res.data.rg || '');
            setRegistration(res.data.Registration || '');
            setCpf(res.data.cpf || '');
            setRg(res.data.rg || '');
            setFatherCellPhone(res.data.fatherCellPhone || '')
            setentryDate(res.data.entryDate || '')
            setdepartureDate(res.data.departureDate || '')
            setadmissionDate(res.data.admissionDate || '')
            setmotherName(res.data.motherName || '')
            setfatherName(res.data.fatherName || '')
            setmotherCellPhone(res.data.motherCellPhone || '')
            setAddress(res.data.address || '');
            setLoading(false);
        })();
    }, []);

    const handleSubmit = async () => {
        if (!name || !dateOfBirth || !sex || !race) {
            setErrorMessage('Todos os campos devem ser preenchidos.');
            return;
        }
        setLoading(true);
        const res = await updateStudent(
            student._id,
            name.toUpperCase(),
            dateOfBirth,
            sex,
            race,
            cpf,
            rg,
            Registration,
            motherName,
            fatherName,
            motherCellPhone,
            fatherCellPhone,
            address.toUpperCase(),
            admissionDate,
            entryDate,
            departureDate
        );
        console.log(
            "name", name, "dateofBirth", dateOfBirth, "cpf", cpf
        )

        if (res) {
            alert('Perfil atualizado com sucesso!');
            navigate(-1); // Redireciona para o dashboard após a atualização
        } else {
            setErrorMessage('Erro ao cadastrar. Verifique os dados e tente novamente.');
        }
        setLoading(false);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const maskcellPhone = (value) => {
        return value
            .replace(/\D/g, '') // Remove tudo o que não é dígito
    };


    const handleChangeFatherCellPhone = (e) => {
        setFatherCellPhone(maskcellPhone(e.target.value));
    };

    const handleChangemotherCellPhone = (e) => {
        setmotherCellPhone(maskcellPhone(e.target.value));
    };

    const maskCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 14);
    };

    const maskRG = (value) => {
        return value.replace(/\D/g, '');
    };

    const handleChange = (e) => {
        setCpf(maskCPF(e.target.value));
    };

    const handleChangeRg = (e) => {
        setRg(maskRG(e.target.value));
    };

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <h2>Edição de Aluno</h2>
                    <InputArea>
                        <label>Nome</label>
                        <Input
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Data de Nascimento</label>
                        <Input
                            placeholder="Data de nascimento"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            type='date'
                        />
                        <label>CPF</label>
                        <Input
                            placeholder="Digite o CPF"
                            value={cpf}
                            onChange={handleChange}
                            type="text"
                            maxLength="14"
                        />
                        <label>RG</label>
                        <Input
                            placeholder="Digite o RG"
                            value={rg}
                            onChange={handleChangeRg}
                            type="text"
                        />
                        <>*Sexo</>
                        <Select
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </Select>
                        <>*Cor</>
                        <Select value={race} onChange={(e) => setRace(e.target.value)}>
                            <option value="">Selecione</option>
                            <option value="Branca">Branca</option>
                            <option value="Preta">Preta</option>
                            <option value="Negra">Negra</option>
                            <option value="Parda">Parda</option>
                            <option value="Indígena">Indígena</option>
                            <option value="Outra">Outra</option>
                        </Select>
                        <label>Matrícula</label>
                        <Input
                            placeholder="Digite o numero da Matrícula"
                            value={Registration}
                            onChange={
                                (e) => setRegistration(e.target.value)
                            }
                        />
                        <label>Nome da Mãe</label>
                        <Input
                            placeholder="Nome da Mãe"
                            value={motherName}
                            onChange={
                                (e) => setmotherName(e.target.value)
                            }
                        />
                        <label>Nome do Pai</label>
                        <Input
                            placeholder="Digite o RGNome do Pai"
                            value={fatherName}
                            onChange={
                                (e) => setfatherName(e.target.value)
                            }
                        />
                        <label>Celular da Mãe</label>
                        <Input
                            placeholder="Digite o celular da Mãe"
                            value={motherCellPhone}
                            onChange={handleChangemotherCellPhone}
                            type="text"
                        />
                        <label>Celular do pai</label>
                        <Input
                            placeholder="Digite o celular do Pai"
                            value={fatherCellPhone}
                            onChange={handleChangeFatherCellPhone}
                            type="text"
                        />
                        <label>Endereço</label>
                        <Input
                            placeholder="Rua, bairro, número"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                        />
                        <label>Data de Ingresso na Escola</label>
                        <Input
                            placeholder="Data de ingresso"
                            value={entryDate}
                            onChange={(e) => setentryDate(e.target.value)}
                            type='date'
                        />
                        <label>Data de Admissão</label>
                        <Input
                            placeholder="Data de admissão"
                            value={admissionDate}
                            onChange={(e) => setadmissionDate(e.target.value)}
                            type='date'
                        />
                        <label>Data de Saida</label>
                        <Input
                            placeholder="Data de admissão"
                            value={departureDate}
                            onChange={(e) => setdepartureDate(e.target.value)}
                            type='date'
                        />
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