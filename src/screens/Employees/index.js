import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {GetEmployees, GetMatter} from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    DivNewEmp, 
    User,
    FormFilter,
    FormSearch
   // Input
} from './style';

import {
    AreaEmp,
    InputEmp,
    Select
} from '../../components/Inputs'

import {
    Btt02, 
}from '../../components/Buttons';

const Employees = () => {

    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [busca, setBusca] = useState("")
    const [filter, setFilter] = useState()
    const [filterMatter, setFilterMatter] = useState([])
    //const [matter, setMatter] = useState()

    useEffect(() => {
        (async () => {
            const idSchool = sessionStorage.getItem("id-school")
            const response = await GetEmployees(JSON.parse(idSchool))
            setEmployees(response.data.data)

            const res = await GetMatter(JSON.parse(idSchool))
            //setStudent(response.data.data)
            setFilterMatter(res.data.data)
            console.log(response)

        })()       
	}, [])

    employees.sort(function (a, b) {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
    })

    filterMatter.sort(function (a, b) {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
    })

    /*if(filter) {
        console.log('filter', filter)
    }*/

    const NewEmoloyee = async () => {
        navigate('/new/employees')
    }

    const employeeInformation = async (employee) => {
        sessionStorage.removeItem('EmployeeInformation')
        sessionStorage.setItem("EmployeeInformation", employee._id)
        navigate(`/employee/info/${employee._id}`)
    }

    //console.log('res', employees)

    //console.log('matter', matter)

    return (
        <Container>
            <User>

            </User>
            <Search>
                <FormSearch>
                    <label>Buscar Funcionario</label>
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
                    <label>Filtra por cargo: </label>
                    <Select id="position" 
                        value={filter} 
                        onChange={ 
                            (e) => setFilter(e.target.value)
                        }
                    >
                        <option value="">Todos</option>
                        <option value="DIRETOR">DIRETOR</option>
                        <option value="GESTOR">GESTOR</option>
                        <option value="PROFESSOR">PROFESSOR</option>
                    </Select>
                </FormFilter>
                {
                  /*  filter === "PROFESSOR"
                    &&
                    <FormFilter>
                        <label>Filtra por Materia: </label>
                        <Select id="position" 
                            value={matter} 
                            onChange={ 
                                (e) => setMatter(e.target.value)
                            }
                        >
                           <option value=''>Todos</option>
                        {
                            filterMatter.map(matter => (
                                <option value={matter._id}>{matter.name}</option>
                            ))
                        }
                        </Select>
                    </FormFilter>*/
                }
            </Search>
            <List>
                <DivNewEmp>
                    <Btt02 onClick={NewEmoloyee}>Novo Funcionario</Btt02>
                </DivNewEmp>
                
                {
                    employees.filter((fil) => {
                        if(!filter){
                            return (fil)
                        } else if(fil.position_at_school === filter) {
                            return (fil)
                        }
                        return null
                    })/*.filter((filMttr) => {
                        if(!matter){
                            return (filMttr)
                        } else {
                            const filMatter = filMttr.id_matter.map((m) => {
                                if(m === matter) {
                                    return (filMttr)
                                } else {
                                    return (filMttr)
                                }
                            })    
                            console.log("filMatter", filMatter)  
                            return (filMatter)                    
                        }
                    })*/.filter((val) => {
                        if(!busca) {
                            return (val)
                        } else if(val.name.includes(busca.toUpperCase())) {
                            return (val)
                        }
                        return null
                   }).map(employee => (
                        <Emp 
                            onClick={() => 
                                employeeInformation(employee)
                            } 
                            key={employee._id} >
                            <Span>{employee.name}</Span>
                        </Emp>
                    ))
                }
            </List>
        </Container>
    )
}
  
export default Employees