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
    ErrorMessage
} from './style';
import LoadingSpinner from '../../components/Loading';

const EditProfile = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({});
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [cellPhoneOfParentsOrGuardians, setCellPhoneOfParentsOrGuardians] = useState('');
    const [cellPhone, setCellPhone] = useState('');
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
            setCpf(res.data.cpf || '');
            setRg(res.data.rg || '');
            setCellPhoneOfParentsOrGuardians(res.data.cellPhoneOfParentsOrGuardians || '');
            setCellPhone(res.data.cellPhone || '');
            setAddress(res.data.address || '');
            setLoading(false);
        })();
    }, []);

    /*const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };*/

    const handleSubmit = async () => {
        setLoading(true);
        const res = await updateStudent(
            student._id,
            name.toUpperCase(),
            dateOfBirth,
            cpf,
            rg,
            cellPhone,
            cellPhoneOfParentsOrGuardians,
            address.toUpperCase(),
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

    const maskCPF = (value) => {
        return value
            .replace(/\D/g, '') // Remove tudo o que não é dígito
            .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o primeiro ponto
            .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o segundo ponto
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca o traço
            .slice(0, 14); // Limita para 14 caracteres
    };

    const maskRG = (value) => {
        return value
            .replace(/\D/g, '') // Remove tudo o que não é dígito
    };

    const maskcellPhone = (value) => {
        return value
            .replace(/\D/g, '') // Remove tudo o que não é dígito
    };

    const handleChange = (e) => {
        setCpf(maskCPF(e.target.value));
    };

    const handleChangeRg = (e) => {
        setRg(maskRG(e.target.value));
    };

    const handleChangecellPhone = (e) => {
        setCellPhone(maskcellPhone(e.target.value));
    };

    const handleChangecellPhoneOfParentsOrGuardians = (e) => {
        setCellPhoneOfParentsOrGuardians(maskcellPhone(e.target.value));
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
                            name="cpf"
                            value={cpf}
                            onChange={handleChange}
                            type="text"
                            maxLength="14"
                        />
                        <label>RG</label>
                        <Input
                            name="rg"
                            value={rg}
                            onChange={handleChangeRg}
                        />
                        <label>Celular</label>
                        <Input
                            name="cellPhone"
                            value={cellPhone}
                            onChange={handleChangecellPhone}
                            type="text"
                        />
                        <label>Celular do Responsavel</label>
                        <Input
                            name="cellPhone"
                            value={cellPhoneOfParentsOrGuardians}
                            onChange={handleChangecellPhoneOfParentsOrGuardians}
                            type="text"
                        />
                        <label>Endereço</label>
                        <Input
                            placeholder="Rua, bairro, número"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
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
