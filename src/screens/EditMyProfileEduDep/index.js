import React, { useState, useEffect } from 'react';
import { updateEmployeeEduDep, getEmployeeDetailsEduDep } from '../../Api'; // Funções da API para obter e atualizar os detalhes do funcionário
import { useNavigate } from 'react-router-dom';
import {
    Container,
    InputArea,
    ToGoBack,
    Input,
    //Select,
    Btt01,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    ErrorMessage,
} from './style';
import LoadingSpinner from '../../components/Loading';

const EditProfile = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({});
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [email, setEmail] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [address, setAddress] = useState('');
    const [positionAtEducationDepartment, setpositionAtEducationDepartment] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idEmployee = sessionStorage.getItem("EmployeeInformation");
            const res = await getEmployeeDetailsEduDep(idEmployee);
            console.log("getEmployee", res)
            setEmployee(res.data);
            setName(res.data.name || '');
            setDateOfBirth(res.data.dateOfBirth || '');
            setCpf(res.data.cpf || '');
            setRg(res.data.rg || '');
            setEmail(res.data.email || '');
            setCellPhone(res.data.cellPhone || '');
            setAddress(res.data.address || '');
            setpositionAtEducationDepartment(res.data.positionAtEducationDepartment);
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
        if (!name || !dateOfBirth || !cpf || !rg || !email || !cellPhone || !address) {
            setErrorMessage('Todos os campos devem ser preenchidos.');
            return;
        }
        setLoading(true);
        const res = await updateEmployeeEduDep(employee._id, 
            name.toUpperCase(),
            dateOfBirth,
            cpf,
            rg,
            email,
            cellPhone,
            address.toUpperCase(),
            positionAtEducationDepartment.toUpperCase()
        );
        console.log(
            "name", name, "dateofBirth", dateOfBirth,
            "email", email, "cpf", cpf, "Posi", positionAtEducationDepartment            
        )
        if (res) {
            alert('Perfil atualizado com sucesso!');
            navigate(-1); // Redireciona para o dashboard após a atualização
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

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <h2>Edição de Funcionario</h2>
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
                        <label>Email</label>
                        <Input
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <label>Endereço</label>
                        <Input
                            placeholder="Rua, bairro, número"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                        />
                        {/*<label>Cargo</label>
                        <Select
                            id="position_at_school"
                            value={position_at_school}
                            onChange={(e) => setPositionAtSchool(e.target.value)}
                        >
                            <option value={position_at_school}>{`${position_at_school}`}</option>
                            <option value="DIRETOR/SUPERVISOR">DIRETOR/SUPERVISOR</option>
                            <option value="SECRETARIO">SECRETARIO</option>
                            <option value="PROFESSOR">PROFESSOR</option>
                        </Select>*/}
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
