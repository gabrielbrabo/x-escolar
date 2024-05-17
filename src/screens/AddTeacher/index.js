import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {GetEmployees, EmpInfo, addTchr} from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    //DivNewEmp, 
    User,
    //FormFilter,
    FormSearch,
    //AddMatter,
    Add,
    AddTeacher,
   // Input
} from './style';

import {
    AreaEmp,
    InputEmp,
   // Select
} from '../../components/Inputs'

import {
    Btt01,
   // Btt02 
}from '../../components/Buttons';

const Matter = () => {

    const navigate = useNavigate()
    //const currentYear = new Date().getFullYear();
    //const [year, setYear] = useState([])
    const [teacher, setTeacher] = useState([])
    const [busca, setBusca] = useState("")
    const [serie, setSerie] = useState("")
    const [id_employee, setId_employee] = useState("")
    const [id_class, setId_class] = useState("")
    const [name_teacher, setName_teacher] = useState("")
    const [matter, setMatter] = useState([])
    const [name_matter, setName_Matter] = useState("")
    const [id_matter, setId_Matter] = useState("")
    //const [added] = useState()

    useEffect(() => {
        (async () => {
            const idSchool = sessionStorage.getItem("id-school")
            //const response = await GetStudent(JSON.parse(idSchool))
            const res = await GetEmployees(JSON.parse(idSchool))
            setId_class(sessionStorage.getItem("ClassInformation"))
            //setStudent(response.data.data)
            setTeacher(res.data.data)
            console.log(res.data.data)
        })() 
	}, [])
   
    teacher.sort(function (a, b) {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
    })

    const addTeacher = async (teacher) => {
        //sessionStorage.removeItem('id_matter')
        //sessionStorage.setItem("id_matter", matter._id)
        //setName_employee(sessionStorage.getItem("name"))
        setName_teacher(teacher.name)
        setId_employee(teacher._id)
        setSerie(sessionStorage.getItem("serieClass"))
        const res = await EmpInfo(teacher._id)
        const mttr = await res.data.data.find( res => {
            return res
        }).id_matter.map( res => {
            if (res._id) {
                return (res)   
            } else {
                return (null)
            }
        }).filter( res => {
            if(! null) {
                return (res)
            } else {
                return (null)
            }
        })
        setMatter(mttr)
        console.log("matter", mttr)
    }

    const SignClick = async () => {
        const res = await addTchr(id_employee, id_class, id_matter)
        if(res) {
            alert('Professor Adicionado com sucesso.')
            navigate('/class/info')
        }
        setName_teacher('')
        setId_Matter('')
    }

    const AddMttr = async (matter) => {
        setId_Matter(matter._id)
        setName_Matter(matter.name)
    }

    /*const Finish = async () => {
        navigate('/employees')
    }*/

    const Return = async () => {
        setName_teacher('')
        setId_Matter('')
    }

    return (
        <Container>
            <User>

            </User>
            <Search>
                <FormSearch>
                    <label>Buscar Materia</label>
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
                {/*<FormFilter>
                    <label>Filtra por Ano: </label>
                    <Select id="position" 
                        value={filter} 
                        onChange={ 
                            (e) => setFilter(e.target.value)
                        }
                    >
                        <option value=''>{currentYear}</option>
                        {
                            year.map(c => (
                                <option value={c}>{c}</option>
                            ))
                        }
                    </Select>
                    </FormFilter>*/}
            </Search>
            <>Click para adicionar um Professor a Turma</>
            <List>
                {/*
                <DivNewEmp>
                    <Btt02 onClick={NewMatter}>Nova Materia</Btt02>
                </DivNewEmp>
                */}
                
                {
                    teacher.filter((val) => {
                        if(!busca) {
                            return (val)
                        } else if(val.name.includes(busca.toUpperCase())) {
                            return (val)
                        }
                        return null
                   }).filter((fil) => {
                        if(fil.position_at_school === "PROFESSOR") {
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
                        ! id_matter
                        &&
                        <div>
                            <>Adicionar {name_teacher} a Turma {serie} </>
                           { /*<Btt01 onClick={SignClick}>Adicionar</Btt01>*/}
                        </div>
                    }
                    
                    {
                        ! id_matter
                        &&
                        <div>
                            <>Click na Materia que o Professor ira atuar nessa Turma</>
                            {
                                matter.map(matter => (
                                    <Emp 
                                        onClick={() => 
                                            AddMttr(matter)
                                        } 
                                        key={matter._id} >
                                        <Span>{matter.name}</Span>
                                    </Emp>
                                ))
                            }
                        </div>
                    }
                    {
                        id_matter
                        &&
                        <AddTeacher>
                            <>Voçê ira Adicionar as seguintes configurações:</>
                            <Span>   Professor: {name_teacher}</Span>
                            <Span>   Materia: {name_matter}</Span>
                            <Span>   Turma: {serie}</Span>
                            <Btt01 onClick={SignClick}>Adicionar</Btt01>
                        </AddTeacher>
                    }
                    <Btt01 onClick={Return}>Voltar</Btt01>
                </Add>
            }
        </Container>
    )
}
  
export default Matter