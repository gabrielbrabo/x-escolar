import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clssInfo, removeTeacher } from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    FormSearch,
    Add,
    Btt01,
    AreaEmp,
    InputEmp,
    DivButtonAdd,
    Div,
    Btt02,
    Btt03,
    ButtonCancel,
} from './style';

import LoadingSpinner from '../../components/Loading'

const RemoveTeacher = () => {

    const navigate = useNavigate()
    //const currentYear = new Date().getFullYear();
    const [employee, setEmployee] = useState([])
    const [serie, setSerie] = useState("")
    const [busca, setBusca] = useState("")
    const [name_teacher, setName_Teacher] = useState("")
    //const [name_matter, setName_Matter] = useState("")
    const [id_teacher, setId_teacher] = useState([])
    const [id_class, setId_class] = useState("")
    //const [id_matter, setId_matter] = useState("")
    //const [addTeacher, setId_addTeacher] = useState("")
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id = sessionStorage.getItem("ClassInformation")
            setSerie(sessionStorage.getItem("serieClass"))
            const res = await clssInfo(id)
            //setStudent(response.data.data)
            //setClss(resClass.data.data)

            const employee = res.data.data.find(res => {
                return res
            }).id_employee.map(res => {
                if (res) {
                    return (res)
                } else {
                    return (null)
                }
            })
            setId_class(id)
            setEmployee(employee)
            setLoading(false);
        })()

    }, [])

    employee.sort(function (a, b) {
        if (a.serie < b.serie) return -1
        if (a.serie > b.serie) return 1
        return 0
    })

    /*year.sort(function (a, b) {
        if(a < b) return -1
        if(a > b) return 1
        return 0
    })*/

    /*if(!filter) {
        setFilter(currentYear.toString())
    }*/

    const SignClick = async () => {
        setLoading(true);
        const res = await removeTeacher(id_teacher, id_class, /*id_matter, addTeacher*/)
        if (res) {
            alert('Professor Removido com sucesso.')
            navigate(-1);
        }
        //setName_Teacher([])
        //setName_Matter('')
        setLoading(false);
    }

    const Remove = async (employee) => {
        setLoading(true);
        //setName_Matter(employee.name_matter)
        setName_Teacher(employee.name)
        setId_teacher(employee._id)
        //setId_class(employee.id_class)
        //setId_matter(employee.id_matter)
        //setId_addTeacher(employee._id)
        setLoading(false);
    }

    const Return = async () => {
        setLoading(true);
        setName_Teacher('')
        //setName_Matter('')
        setLoading(false);
    }

    const Cancel = async () => {
        navigate(-1); 
    }

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <Search>
                        <FormSearch>
                            <label>Buscar</label>
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
                    </Search>
                    <List>

                        {
                            employee.filter((val) => {
                                if (!busca) {
                                    return (val)
                                } else if (val.name.includes(busca.toUpperCase())) {
                                    return (val)
                                }
                                return null
                            }).map(employee => (
                                <Emp
                                    onClick={() =>
                                        Remove(employee)
                                    }
                                    key={employee._id}
                                >
                                    <Span>{employee.name}</Span>
                                </Emp>
                            ))
                        }
                    </List>
                    {
                        name_teacher
                        &&
                        <Add>

                            {
                                <Div>
                                    <Span>   Professor: {name_teacher}</Span>
                                    {/*<Span>   Disciplina: {name_matter}</Span>*/}
                                    <Span>   Turma: {serie}</Span>
                                    <>Tem certeza que deseja remover este Professor dessa Turma ?</>
                                    <DivButtonAdd>
                                        <Btt01 onClick={SignClick}>Remover</Btt01>
                                        <Btt03 onClick={Return}>Voltar</Btt03>
                                    </DivButtonAdd>
                                </Div>
                            }
                        </Add>
                    }
                </>
            }
            <ButtonCancel>
                <Btt02 onClick={Cancel}>Cancelar</Btt02>
            </ButtonCancel>
        </Container>
    )
}

export default RemoveTeacher