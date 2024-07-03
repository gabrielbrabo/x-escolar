import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {EmpInfo, removeMatter} from '../../Api'

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
   // InputEmp,
    //Select
} from '../../components/Inputs'

import {
    Btt01, 
}from '../../components/Buttons';

const Student = () => {

    const navigate = useNavigate()
    //const currentYear = new Date().getFullYear();
    //const [student, setStudent] = useState([])
    //const [serie, setSerie] = useState("")
    //const [busca, setBusca] = useState("")
    const [employee, setEmployee] = useState([])
    const [name_employee, setName_employee] = useState("")
    const [id_employee, setId_employee] = useState("")
    const [name_matter, setName_matter] = useState("")
    const [id_matter, setId_matter] = useState("")
    //const [id_class, setId_class] = useState("")
    const [matter, setMatter] = useState([])
    //const [addTeacher, setId_addTeacher] = useState("")

    useEffect(() => {
        (async () => {
            const id_employee = sessionStorage.getItem("EmployeeInformation")
            const res = await EmpInfo(id_employee)
            setEmployee(res.data.data)
            setId_employee(id_employee)
            //console.log(res.data.data)
            const mttr = res.data.data.find( res => {
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
        })() 
        
	}, [])
   
    matter.sort(function (a, b) {
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
        const res = await removeMatter(id_matter, id_employee)
        if(res) {
            alert('Aluno Removido com sucesso.')
            navigate(`/employee/info/${id_employee}`)
        }
        //console.log("id_student", id_student)
        //console.log("id_class", id_class)
        setName_matter('')
    }

    const Remove = async (matter) => {
        const nameEmployee = employee.find(emp => {
            return emp
        })
        console.log("nameEmployee", nameEmployee.name)
        setName_matter(matter.name)
        setId_matter(matter._id)
        setName_employee(nameEmployee.name)
    }

    const Return = async () => {
        setName_matter('')
        setName_employee('')
        setId_matter('')
    }

    return (
        <Container>
            <User>

            </User>
            <Search>
                <FormSearch>
                    <label>Buscar Turma</label>
                    <AreaEmp>
                       {/* <InputEmp
                            type="text" 
                            placeholder='Buscar por nome'
                            value={busca} 
                            onChange={
                                (e) => setBusca(e.target.value)
                            }
                        />*/}
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
                    matter/*.filter((val) => {
                        if(!busca) {
                            return (val)
                        } else if(val.name.includes(busca.toUpperCase())) {
                            return (val)
                        }
                        return null
                   })*/.map(matter => (
                        <Emp 
                            onClick={() => 
                                Remove(matter)
                            }
                            key={matter._id} 
                        >
                            <Span>{matter.name}</Span>
                        </Emp>
                    ))
                }
            </List>
            {
                name_matter
                &&
                <Add>
                    
                    {
                        <AddTeacher>
                            <>Tem certeza que deseja remover a Materia {name_matter} do Professor {name_employee} ?</>
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