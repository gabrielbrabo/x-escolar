import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetEmployees, EmpInfo, addTchr, } from '../../Api'

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
    Div,
    Btt02,
    ButtonCancel,
} from './style';

import LoadingSpinner from '../../components/Loading'

const TeacherAdd = () => {

    const navigate = useNavigate()
    //const currentYear = new Date().getFullYear();
    //const [year, setYear] = useState([])
    const [teacher, setTeacher] = useState([])
    const [busca, setBusca] = useState("")
    const [serie, setSerie] = useState("")
    const [id_employee, setId_employee] = useState("")
    const [id_class, setId_class] = useState("")
    const [name_teacher, setName_teacher] = useState("")
    //const [matter, setMatter] = useState([])
    //const [name_matter, setName_Matter] = useState("")
    const [id_matter, setId_Matter] = useState("")
    const [loading, setLoading] = useState(false);
    //const [added] = useState()

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school")
            //const response = await GetStudent(JSON.parse(idSchool))
            const res = await GetEmployees(JSON.parse(idSchool))
            setId_class(sessionStorage.getItem("ClassInformation"))
            //setStudent(response.data.data)
            setTeacher(res.data.data)
            console.log(res.data.data)
            setLoading(false);
        })()
    }, [])

    teacher.sort(function (a, b) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    })

    const addTeacher = async (teacher) => {
        setLoading(true);
        //sessionStorage.removeItem('id_matter')
        //sessionStorage.setItem("id_matter", matter._id)
        //setName_employee(sessionStorage.getItem("name"))
        setName_teacher(teacher.name)
        setId_employee(teacher._id)
        setSerie(sessionStorage.getItem("serieClass"))
        const res = await EmpInfo(teacher._id)
        const mttr = await res.data.data.find(res => {
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
        })
        //setMatter(mttr)
        console.log("matter", mttr)
        setLoading(false);
    }

    const SignClick = async () => {
        setLoading(true);
        const res = await addTchr(id_employee, id_class, /*id_matter*/)
        if (res) {
            alert('Professor Adicionado com sucesso.')
            navigate(-1);
        }
        setName_teacher('')
        setId_Matter('')
        setLoading(false);
    }

    /*const AddMttr = async (matter) => {
        setLoading(true);
        setId_Matter(matter._id)
        setName_Matter(matter.name)
        setLoading(false);
    }*/

    /*const Finish = async () => {
        navigate('/employees')
    }*/

    const Return = async () => {
        setLoading(true);
        setName_teacher('')
        setId_Matter('')
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
                    <>Click para adicionar um Professor a Turma</>
                    <List>
                        {
                            teacher.filter((val) => {
                                if (!busca) {
                                    return (val)
                                } else if (val.name.includes(busca.toUpperCase())) {
                                    return (val)
                                }
                                return null
                            }).filter((fil) => {
                                if (fil.position_at_school === "PROFESSOR") {
                                    return (fil)
                                } else {
                                    return null
                                }
                            }).map(teacher => (
                                <Emp
                                    onClick={() =>
                                        addTeacher(teacher)
                                    }
                                    key={teacher._id} >
                                    <Span>{teacher.name}</Span>
                                </Emp>
                            ))
                        }
                    </List>
                    {
                        name_teacher
                        &&
                        <Add>
                            {
                                /* added === true
                                 ?
                                 <Btt01 onClick={removeMattter}>Adicionar outra Materia para o Professor {name_employee}</Btt01>
                                 :*/
                                !id_matter
                                &&
                                <Div>
                                    <p>Adicionar {name_teacher} a Turma {serie} </p>
                                    { /*<Btt01 onClick={SignClick}>Adicionar</Btt01>*/}
                                </Div>
                            }
                            {
                                <Div>
                                    <p>Voçê ira Adicionar as seguintes configurações:</p>
                                    <Span>   Professor: {name_teacher}</Span>
                                   { /*<Span>   Materia: {name_matter}</Span>*/}
                                    <Span>   Turma: {serie}</Span>
                                    <Btt01 onClick={SignClick}>Adicionar</Btt01>
                                </Div>
                            }
                            <ButtonCancel>
                                <Btt02 onClick={Return}>Cancelar</Btt02>
                            </ButtonCancel>
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

export default TeacherAdd;