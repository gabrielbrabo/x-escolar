import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetEmployees, GetMatter } from '../../Api'

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
    const [filterMatter, setFilterMatter] = useState([])
    const [loading, setLoading] = useState(false);

    //const isNavigatingToEmployeeInfo = useRef(false); // UseRef para persistência
    //const [matter, setMatter] = useState()

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school")
            const positionAtEducationDepartment = localStorage.getItem("positionAtEducationDepartment")
            const response = await GetEmployees(JSON.parse(idSchool))
            setEmployees(response.data.data)
            setPositionAtEducationDepartment(positionAtEducationDepartment)

            const res = await GetMatter(JSON.parse(idSchool))
            //setStudent(response.data.data)
            setFilterMatter(res.data.data)
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

    filterMatter.sort(function (a, b) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    })

    const filteredEmployees = employees
        .filter(emp => !filter || emp.position_at_school === filter) // filtro por cargo
        .filter(emp => !busca || normalizeString(emp.name).includes(normalizeString(busca))) // filtro por nome
        .sort((a, b) =>
            normalizeString(a.name).localeCompare(normalizeString(b.name)) // ordena por nome
        );

    /*if(filter) {
        console.log('filter', filter)
    }*/

    const NewEmoloyee = async () => {
        navigate('/new/employees')
    }

    const employeeInformation = async (employee) => {
        //isNavigatingToEmployeeInfo.current = true; // Define como true antes da navegação
        setLoading(true);
        //  sessionStorage.removeItem('EmployeeInformation')
        //sessionStorage.setItem("EmployeeInformation", employee._id)
        navigate(`/employee/info/${employee._id}`)
        setLoading(false);
    }

    //const loggedInEmployeeId = localStorage.getItem("Id_employee");

    //console.log('res', employees)

    //console.log('matter', matter)

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
                                <option value="DIRETOR/SUPERVISOR">DIRETOR(A)/SUPERVISOR(A)</option>
                                <option value="SECRETARIO">SECRETARIO(A)</option>
                                <option value="PROFESSOR">PROFESSOR(A)</option>
                            </Select>
                        </FormFilter>
                    </Search>
                    {!positionAtEducationDepartment
                        &&
                        <DivNewEmp>
                            <Btt02 onClick={NewEmoloyee}>Novo Funcionario</Btt02>
                        </DivNewEmp>
                    }
                    {positionAtEducationDepartment && employees.length <= 0 &&
                        <DivNewEmp>
                            <Btt02 onClick={() => navigate('/first/employee')}>Primeiro Funcionario</Btt02>
                        </DivNewEmp>
                    }
                    <List>
                        <p>Total de Funcionários Cadastrados: {filteredEmployees.length}</p>
                        {
                            employees.filter((fil) => {
                                if (!filter) {
                                    return (fil)
                                } else if (fil.position_at_school === filter) {
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