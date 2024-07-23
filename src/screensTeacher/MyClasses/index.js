import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmpInfo } from '../../Api'

import {
    Container,
    List,
    Emp,
    //Matter,
    //DivInfo,
    Span,
    Search,
    //DivNewEmp,
    //DivAddEmp,
    User,
    //AddEmp,
    FormFilter,
    FormSearch
    // Input
} from './style';

import {
    AreaEmp,
    InputEmp,
    Select
} from '../../components/Inputs'

/*import {
    Btt02,
} from '../../components/Buttons';*/
import LoadingSpinner from '../../components/Loading'

const Student = () => {

    const navigate = useNavigate()
    const currentYear = new Date().getFullYear().toString();
    //const [year, setYear] = useState([])
    const [Clss, setClss] = useState([])
    //const [employee, setEmployee] = useState([])
    //const [id, setId] = useState("")
    const [filter, setFilter] = useState()
    const [busca, setBusca] = useState()
    const [loading, setLoading] = useState(false);
    //console.log('posi', position_at_school)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_employee = sessionStorage.getItem("Id_employee")
            const res = await EmpInfo(JSON.parse(id_employee))
            //setEmployee(res.data.data)
            //console.log(res.data.data)
            const clss = res.data.info.find(res => {
                return res
            }).map(res => {
                if (res.id_class.year === currentYear) {
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
            /*const cl = clss.map(c => {
                return c.id_class.serie
            }).filter((valor, indice, self) => {
                if(self.indexOf(valor) === indice) {
                    return valor
                }
            })*/
            //console.log("cl", cl)
            /*const mttr = res.data.data.find(res => {
                return res
            }).id_matter.map(res => {
                if (res._id) {
                    return (res)
                } else {
                    return (null)
                }
            }).filter(res => {
                if (! null) {
                    return (res)
                } else {
                    return (null)
                }
            })*/
            setClss(clss)
            //setMatter(mttr)
            setLoading(false);
        })()

    }, [currentYear])

    const MyClassInformation = (clss) => {
        setLoading(true);
        const id_teacher = JSON.parse(sessionStorage.getItem("Id_employee"))
        if (clss) {
            const map = Clss.map(res => {
                if (res.id_class.serie === clss) {
                    return res.id_class._id
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
            })
            sessionStorage.setItem("class-info", map)
            navigate(`/myclassesinfo/${map}/${id_teacher}`)
            console.log("clss", map)
        }
        setLoading(false);
    }

    /*const Remove = async () => {
        navigate('/remove/matter')
    }*/

    //console.log("clas", matter)
    //console.log('posi', Clss)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <User>

                    </User>
                    <Search>
                        <FormSearch>
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
                        </FormSearch>
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
                    <List>
                        {/*<DivNewEmp>
                    <Btt02 onClick={NewClass}>Nova Turma</Btt02>
                </DivNewEmp>*/}

                        {
                            Clss.filter((fil) => {
                                if (!filter) {
                                    return (fil)
                                }
                                if (fil.id_class.shift === filter) {
                                    return (fil)
                                }
                                return null
                            }).filter((val) => {
                                if (!busca) {
                                    return (val)
                                } else if (val.id_class.serie.includes(busca.toUpperCase())) {
                                    return (val)
                                }
                                return null
                            }).map(c => {
                                return c.id_class.serie
                            }).filter((valor, indice, self) => {
                                return self.indexOf(valor) === indice
                            }).map(clss => (
                                <Emp
                                    onClick={() =>
                                        MyClassInformation(clss)
                                    }

                                    /*const clss = cl.map(c => {
                                            return c.id_class.serie
                                        }).filter((valor, indice, self) => {
                                            if(self.indexOf(valor) === indice) {
                                                return valor
                                            }
                                        })*/
                                    key={clss}
                                >
                                    <Span>{clss}</Span>,
                                    { }
                                </Emp>
                            ))
                        }
                    </List>
                </>
            }
        </Container>
    )
}

export default Student