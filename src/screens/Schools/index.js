import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IndexInfoDepEdu, } from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    DivNewEmp,
    // FormFilter,
    FormSearch,
    Area,
    //Select,
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
    const [Schools, setSchools] = useState([])
    const [busca, setBusca] = useState("")
    //const [filter, setFilter] = useState(sessionStorage.getItem("selectedFilter") || "")
    const [loading, setLoading] = useState(false);

    //const isNavigatingToEmployeeInfo = useRef(false); // UseRef para persistência
    //const [matter, setMatter] = useState()

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idEducationDepartment = sessionStorage.getItem("idDepartment")
            const response = await IndexInfoDepEdu(idEducationDepartment)
            setSchools(response.data.data.id_schools)

            //const res = await GetMatter(JSON.parse(idSchool))
            //setStudent(response.data.data)
            //setFilterMatter(res.data.data)
            console.log(response)

            //sessionStorage.setItem("selectedFilter", filter);

            setLoading(false);
        })()
    }, [])

    Schools.sort((a, b) =>
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

    const NewEmoloyee = async () => {
        navigate('/signup/school')
    }

    const schoolInformation = async (school) => {
        //isNavigatingToEmployeeInfo.current = true; // Define como true antes da navegação
        setLoading(true);
        //sessionStorage.removeItem('EmployeeInformation')
        //sessionStorage.setItem("EmployeeInformation", school._id)
        navigate(`/school/info/${school._id}`)
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
                        {/*<FormFilter>
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
                        </FormFilter>*/}
                    </Search>
                    <DivNewEmp>
                        <Btt02 onClick={NewEmoloyee}>Cadastrar</Btt02>
                    </DivNewEmp>
                    <List>
                        <p>Total de Funcionários Cadastrados: {Schools.length}</p>
                        {
                            Schools/*.filter((fil) => {
                                if (!filter) {
                                    return (fil)
                                } else if (fil.position_at_school === filter) {
                                    return (fil)
                                }
                                return null
                            })*/.filter((val) => {
                                if (!busca) return val;
                                return normalizeString(val.name).includes(normalizeString(busca));
                            })/*.filter((employee) => {
                               if(employee._id !== JSON.parse(loggedInEmployeeId)) {
                                    return employee
                               }
                               return null
                            })*/.map(school => (
                                <Emp
                                    onClick={() =>
                                        schoolInformation(school)
                                    }
                                    key={school._id} >
                                    <Span style={{ color: "#003e4f" }}>{school.name}</Span>
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