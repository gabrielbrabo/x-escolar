import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {clssInfo, removeTeacher} from '../../Api'

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
   // Input
   Add,
   AddTeacher
} from './style';

import {
    AreaEmp,
    InputEmp,
    //Select
} from '../../components/Inputs'

import {
    Btt01, 
}from '../../components/Buttons';

const Student = () => {

    const navigate = useNavigate()
    //const currentYear = new Date().getFullYear();
    const [employee, setEmployee] = useState([])
    const [serie, setSerie] = useState("")
    const [busca, setBusca] = useState("")
    const [name_teacher, setName_Teacher] = useState("")
    const [name_matter, setName_Matter] = useState("")
    const [id_teacher, setId_teacher] = useState("")
    const [id_class, setId_class] = useState("")
    const [id_matter, setId_matter] = useState("")
    const [addTeacher, setId_addTeacher] = useState("")

    useEffect(() => {
        (async () => {
            const id = sessionStorage.getItem("ClassInformation")
            setSerie(sessionStorage.getItem("serieClass"))
            const res = await clssInfo(id)
            //setStudent(response.data.data)
            //setClss(resClass.data.data)

            const employee = res.data.data.find( res => {
                return res
            }).addTeacher.map( res => {
                if (res) {
                    return (res)   
                } else {
                    return (null)
                }
            })
            
            setEmployee(employee)
        })() 
        
	}, [])
   
    employee.sort(function (a, b) {
        if(a.serie < b.serie) return -1
        if(a.serie > b.serie) return 1
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
        const res = await removeTeacher(id_teacher, id_class, id_matter, addTeacher)
        if(res) {
            alert('Professor Removido com sucesso.')
            navigate('/class/info')
        }
        setName_Teacher('')
        setName_Matter('')
    }

    const Remove = async (employee) => {
        setName_Matter(employee.name_matter)
        setName_Teacher(employee.name_teacher)
        setId_teacher(employee.id_teacher)
        setId_class(employee.id_class)
        setId_matter(employee.id_matter)
        setId_addTeacher(employee._id)
    }

    const Return = async () => {
        setName_Teacher('')
        setName_Matter('')
    }

    return (
        <Container>
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
            <List>
                
                {
                    employee.filter((val) => {
                        if(!busca) {
                            return (val)
                        } else if(val.name_teacher.includes(busca.toUpperCase())) {
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
                            <Span>{employee.name_teacher}: {employee.name_matter}</Span>
                        </Emp>
                    ))
                }
            </List>
            {
                name_teacher
                &&
                <Add>
                    
                    {
                        <AddTeacher>
                            <Span>   Professor: {name_teacher}</Span>
                            <Span>   Materia: {name_matter}</Span>
                            <Span>   Turma: {serie}</Span>
                            <>Tem certeza que deseja remover este Professor dessa Turma ?</>
                            <Btt01 onClick={SignClick}>Remover</Btt01>
                        </AddTeacher>
                    }
                    <Btt01 onClick={Return}>Voltar</Btt01>
                </Add>
            }
        </Container>
    )
}
  
export default Student