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
    const [Posi, setPosi] = useState("")
    const [busca, setBusca] = useState("")
    //const [filter, setFilter] = useState(sessionStorage.getItem("selectedFilter") || "")
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);

    //const isNavigatingToEmployeeInfo = useRef(false); // UseRef para persistência
    //const [matter, setMatter] = useState()

    useEffect(() => {
        (async () => {
            setLoading(true);
            const posi = localStorage.getItem("positionAtEducationDepartment")
            setPosi(posi)
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
        setShowModal(true); // Abre o modal primeiro
    }

    const handleConfirm = () => {
        navigate('/signup/school'); // Vai pra tela de cadastro
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };


    const schoolInformation = async (school) => {
        //isNavigatingToEmployeeInfo.current = true; // Define como true antes da navegação
        setLoading(true);
        sessionStorage.setItem("id-school", JSON.stringify(school._id))
        sessionStorage.setItem("assessmentFormat", school.assessmentFormat)
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
                            <label>Buscar Ecola</label>
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
                    {Posi === "SECRETÁRIO(A) DE EDUCAÇÃO" &&
                        <DivNewEmp>
                            <Btt02 onClick={NewEmoloyee}>Cadastrar</Btt02>
                        </DivNewEmp>
                    }
                    <List>
                        <p>Total de Escolas: {Schools.length}</p>
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
                    {showModal && (
                        <div style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(5px)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 9999
                        }}>
                            <div style={{
                                background: '#fff',
                                padding: '2rem',
                                borderRadius: '8px',
                                maxWidth: '400px',
                                textAlign: 'center'
                            }}>
                                <h3>Atenção!</h3>
                                <p>
                                    O cadastro de uma nova escola exige os dados de um <b>Diretor(a)</b>, <b>Supervisor(a)</b> ou <b>Secretário(a)</b>.<br />
                                    Esse profissional será responsável por realizar o primeiro acesso ao sistema, dar continuidade ao cadastro dos demais funcionários e configurar as informações essenciais da escola.
                                </p>
                                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={handleConfirm}
                                        style={{
                                            backgroundColor: '#28a745', // Verde
                                            color: '#fff',
                                            border: 'none',
                                            padding: '0.5rem 1.5rem',
                                            marginRight: '1rem',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Continuar
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        style={{
                                            backgroundColor: '#dc3545', // Vermelho
                                            color: '#fff',
                                            border: 'none',
                                            padding: '0.5rem 1.5rem',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </>
            }
        </Container>
    )
}

export default Employees