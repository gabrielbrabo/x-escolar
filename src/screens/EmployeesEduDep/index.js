import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetEmployeesEduDep, } from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    DivNewEmp,
    FormFilter,
    FormSearch,
    Area,
    Select,
    InputEmp,
    Btt02
} from './style';

/*import {
    InputEmp,
} from '../../components/Inputs'

import {
    Btt02,
} from '../../components/Buttons';*/

import LoadingSpinner from '../../components/Loading'

const Employees = () => {

    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [positionAtEducationDepartment, setPositionAtEducationDepartment] = useState('')
    const [busca, setBusca] = useState("")
    const [filter, setFilter] = useState(sessionStorage.getItem("selectedFilter") || "")
    const [loading, setLoading] = useState(false);

    //const isNavigatingToEmployeeInfo = useRef(false); // UseRef para persistência
    //const [matter, setMatter] = useState()

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idEducationDepartment = sessionStorage.getItem("idDepartment")
            const positionAtEducationDepartment = localStorage.getItem("positionAtEducationDepartment")
            const response = await GetEmployeesEduDep(idEducationDepartment)
            setEmployees(response.data.data)
            setPositionAtEducationDepartment(positionAtEducationDepartment)
            console.log(response)

            sessionStorage.setItem("selectedFilter", filter);

            setLoading(false);
        })()
    }, [filter])

    employees.sort((a, b) =>
        a.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").localeCompare(
            b.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            "pt-BR",
            { sensitivity: "base" }
        )
    );

    const normalizeString = (str) => {
        return str
            .normalize("NFD") // Separa os caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
            .replace(/[^\w\s]/gi, "") // Remove pontuações
            .toUpperCase(); // Converte para maiúsculas
    };

    const NewEmpoloyee = async () => {
        navigate('/new/employees-edu-dep')
    }

    const employeeInformation = async (employee) => {
        //isNavigatingToEmployeeInfo.current = true; // Define como true antes da navegação
        setLoading(true);
        //  sessionStorage.removeItem('EmployeeInformation')
        //sessionStorage.setItem("EmployeeInformation", employee._id)
        navigate(`/employee/info-edu-dep/${employee._id}`)
        setLoading(false);
    }

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <Search>
                        <FormSearch>
                            <label>Buscar Funcionario</label>
                            <Area>
                                <InputEmp
                                    type="text"
                                    placeholder='Buscar'
                                    value={busca}
                                    onChange={
                                        (e) => setBusca(e.target.value)
                                    }
                                />
                            </Area>
                        </FormSearch>
                        <FormFilter>
                            <label>Filtra por cargo: </label>
                            <Select id="position"
                                value={filter}
                                onChange={
                                    (e) => setFilter(e.target.value)
                                }
                            >
                                <option value="">Todos</option>
                                <option value="SECRETÁRIO(A) DE EDUCAÇÃO">SECRETÁRIO(A) DE EDUCAÇÃO</option>
                                <option value="ASSISTENTE ADMINISTRATIVO">ASSISTENTE ADMINISTRATIVO</option>
                            </Select>
                        </FormFilter>
                    </Search>
                    {positionAtEducationDepartment === "SECRETÁRIO(A) DE EDUCAÇÃO"
                        &&
                        <DivNewEmp>
                            <Btt02 onClick={NewEmpoloyee}>Novo Funcionario</Btt02>
                        </DivNewEmp>
                    }
                    <List>
                        <p>Total de Funcionários Cadastrados: {employees.length}</p>
                        {
                            employees.filter((fil) => {
                                if (!filter) {
                                    return (fil)
                                } else if (fil.positionAtEducationDepartment === filter) {
                                    return (fil)
                                }
                                return null
                            }).filter((val) => {
                                if (!busca) return val;
                                return normalizeString(val.name).includes(normalizeString(busca));
                            })/*.filter((employee) => {
                               if(employee._id !== JSON.parse(loggedInEmployeeId)) {
                                    return employee
                               }
                               return null
                            })*/.map(employee => (
                                <Emp
                                    onClick={() =>
                                        employeeInformation(employee)
                                    }
                                    key={employee._id} >
                                    <Span style={{ color: "#003e4f" }}>{employee.name}</Span>
                                </Emp>
                            ))
                        }
                    </List>
                </>
            }
        </Container>
    )
}

export default Employees