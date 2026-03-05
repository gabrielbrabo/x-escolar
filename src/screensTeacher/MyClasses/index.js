import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmpInfo, getSchoolYear } from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    FormFilter,
    // FormSearch,
    //AreaEmp,
    //InputEmp,
    Select,
    ContainerDivs
} from './style';
import LoadingSpinner from '../../components/Loading'

const MyCla$$ = () => {

    const navigate = useNavigate()
    //const currentYear = new Date().getFullYear().toString();
    const [Clss, setClss] = useState([])
    const [filter, setFilter] = useState()
    // const [busca, setBusca] = useState()
    const [blocked, setBlocked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school");
            const schoolYear = await getSchoolYear(JSON.parse(idSchool))

            const schoolYearValue = schoolYear.data.data; // ano da escola
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth(); // 0-11

            if (
                Number(schoolYearValue) !== currentYear &&
                currentMonth > 1
            ) {
                setBlocked(true);
            }
            console.log("schoolYear", schoolYear)

            const id_employee = localStorage.getItem("Id_employee")
            const res = await EmpInfo(JSON.parse(id_employee))
            const clss = await res.data.data.find(res => {
                return res
            }).id_class.map(res => {
                if (res.year === JSON.stringify(schoolYear.data.data)) {
                    return (res)
                } else {
                    return null
                }
            }).filter(res => {
                if (! null) {
                    return (res)
                } else {
                    return null
                }
            })
            sessionStorage.removeItem("classRegentTeacher", JSON.stringify(res._id))
            sessionStorage.removeItem("classRegentTeacher02", JSON.stringify(res._id))
            sessionStorage.removeItem("physicalEducationTeacher", JSON.stringify(res._id))
            sessionStorage.removeItem("class-info")
            setClss(clss)
            setLoading(false);
            console.log("clss", clss)
        })()

    }, [])

    const MyClassInformation = (clss) => {
        setLoading(true);
        console.log("resultclss", clss)
        const id_teacher = JSON.parse(localStorage.getItem("Id_employee"))
        if (clss) {
            /*const map = Clss.map(res => {
                if (res.serie === clss.serie) {
                    return res._id
                }
                return null
            }).filter(res => {
                if (! null) {
                    return (res)
                } else {
                    return null
                }
            }).filter((valor, indice, self) => {
                if (self.indexOf(valor) === indice) {
                    return valor
                }
                return null
            })*/
            sessionStorage.setItem("class-info", clss._id)
            navigate(`/myclassesinfo/${clss._id}/${id_teacher}`)
            //console.log("clss", map)
        }
        setLoading(false);
    }

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/"); // ou "/login" se for sua rota de login
    };

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    <Search>
                        {/*<FormSearch>
                            <label>Buscar Turma</label>
                            <AreaEmp>
                                <InputEmp
                                    type="text"
                                    placeholder='Buscar por nome'
                                    value={busca}
                                    onChange={
                                        (e) => setBusca(e.target.value)
                                    }
                                />
                            </AreaEmp>
                        </FormSearch>*/}
                        <FormFilter>
                            <label>Filtra por Turno: </label>
                            <Select id="position"
                                value={filter}
                                onChange={
                                    (e) => setFilter(e.target.value)
                                }
                            >
                                <option value="">Todos</option>
                                <option value="MATUTINO">MATUTINO</option>
                                <option value="VESPERTINO">VESPERTINO</option>
                                <option value="NOTURNO">NOTURNO</option>
                            </Select>
                        </FormFilter>
                    </Search>
                    <p> Clique para acessar a turma! 🚀</p>
                    <List>
                        {
                            Clss.filter((fil) => {
                                if (!filter) {
                                    return (fil)
                                }
                                if (fil.shift === filter) {
                                    return (fil)
                                }
                                return null
                            })/*.filter((val) => {
                                if (!busca) {
                                    return (val)
                                } else if (val.serie.includes(busca.toUpperCase())) {
                                    return (val)
                                }
                                return null
                            })*/.map(c => {
                                return c
                            }).filter((valor, indice, self) => {
                                return self.indexOf(valor) === indice
                            }).map(clss => (
                                <Emp
                                    onClick={() =>
                                        MyClassInformation(clss)
                                    }
                                    key={clss._id}
                                >
                                    <Span>{clss.name}</Span>
                                </Emp>
                            ))
                        }
                    </List>
                    {blocked && (
                        <div style={{
                            position: "fixed",
                            inset: 0,
                            backdropFilter: "blur(6px)",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 9999
                        }}>
                            <div style={{
                                background: "#fff",
                                padding: "30px 40px",
                                borderRadius: 12,
                                textAlign: "center",
                                maxWidth: 400,
                                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                            }}>
                                <h3 style={{ marginBottom: 15 }}>
                                    ⚠ Diário indisponível
                                </h3>
                                <p style={{ fontSize: 14, lineHeight: 1.5 }}>
                                    O diário está indisponível no momento.<br /><br />
                                    Para mais informações, entre em contato com a supervisão ou direção da escola.
                                </p>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        marginTop: 20,
                                        padding: "10px 20px",
                                        borderRadius: 8,
                                        border: "none",
                                        backgroundColor: "#d9534f",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        cursor: "pointer"
                                    }}
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    )}
                </ContainerDivs>
            }
        </Container>
    )
}

export default MyCla$$
