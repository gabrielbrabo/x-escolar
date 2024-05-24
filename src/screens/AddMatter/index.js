import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {GetMatter, addMttr} from '../../Api'

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
    AddMatter
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
    const [matter, setMatter] = useState([])
    const [busca, setBusca] = useState("")
    const [id_matter, setId_matter] = useState("")
    const [id_employee, setId_employee] = useState("")
    const [name_matter, setName_matter] = useState("")
    const [name_employee, setName_employee] = useState("")
    const [added, setAdded] = useState()

    useEffect(() => {
        (async () => {
            const idSchool = sessionStorage.getItem("id-school")
            //const response = await GetStudent(JSON.parse(idSchool))
            const res = await GetMatter(JSON.parse(idSchool))
            //setStudent(response.data.data)
            setMatter(res.data.data)
            console.log(res)
        })() 
	}, [])
   
    matter.sort(function (a, b) {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
    })

    const addMatter = async (matter) => {
        sessionStorage.removeItem('id_matter')
        sessionStorage.setItem("id_matter", matter._id)
        setName_employee(sessionStorage.getItem("name"))
        setName_matter(matter.name)
        setId_matter(matter._id)
        setId_employee(sessionStorage.getItem("id_emp"))
    }

    const SignClick = async () => {
        const res = await addMttr(id_employee, id_matter)
        if (res) {
            alert('Materia adicionada com sucesso.')
            setAdded(true)
        }
        console.log(res)
    }
    const removeMattter = async () => {
        setAdded(false)
    }

    const Finish = async () => {
        const auth = sessionStorage.getItem("tchrnf")
        if(auth) {
            sessionStorage.removeItem('tchrnf')
            navigate('/employee/info')
        } else {
            navigate('/employees')
        }
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
            <>Click em uma Materia abaixo para adicionar ao Professor</>
            <List>
                {/*
                <DivNewEmp>
                    <Btt02 onClick={NewMatter}>Nova Materia</Btt02>
                </DivNewEmp>
                */}
                
                {
                    matter/*.filter((fil) => {
                        if(!filter){
                            return (fil)
                        }
                        if(fil.year === filter) {
                            return (fil)
                        }
                        return null
                    })*/.filter((val) => {
                        if(!busca) {
                            return (val)
                        } else if(val.name.includes(busca.toUpperCase())) {
                            return (val)
                        }
                        return null
                   }).map(matter => (
                        <Emp 
                            onClick={() => 
                                addMatter(matter)
                            } 
                            key={matter._id} >
                            <Span>{matter.name}</Span>
                        </Emp>
                    ))
                }
            </List>
            {
                name_matter
                &&
                <AddMatter>
                    {
                        added === true
                        ?
                        <Btt01 onClick={removeMattter}>Adicionar outra Materia para o Professor {name_employee}</Btt01>
                        :
                        <div>
                            <>Adicionar {name_matter} ao professor {name_employee} </>
                            <Btt01 onClick={SignClick}>Adicionar</Btt01>
                        </div>
                    }
                    
                    {
                        added === true
                        &&
                        <Btt01 onClick={Finish}>Finalizar cadastro</Btt01>
                    }
                </AddMatter>
            }
        </Container>
    )
}
  
export default Matter