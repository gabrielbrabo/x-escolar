import React, {useState, useEffect} from 'react'
import {GetEmployees} from '../../Api'

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

    //const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [busca, setBusca] = useState("")
    const [filter, setFilter] = useState()

    useEffect(() => {
        (async () => {
            const idSchool = sessionStorage.getItem("id-school")
            const response = await GetEmployees(JSON.parse(idSchool))
            setEmployees(response.data.data)
        })()       
	}, [])

    employees.sort(function (a, b) {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
    })

    if(filter) {
        console.log('filter', filter)
    }

    const NewEmoloyee = async () => {
    
    }

    console.log('res', employees)

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
                        <option value="">Selecione</option>
                        <option value="DIRETOR">DIRETOR</option>
                        <option value="GESTOR">GESTOR</option>
                        <option value="PROFESSOR">PROFESSOR</option>
                    </Select>
                </FormFilter>
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
                    }).filter((val) => {
                        if(!busca) {
                            return (val)
                        } else if(val.name.includes(busca.toUpperCase())) {
                            return (val)
                        }
                        return null
                   }).map(employee => (
                        <Emp key={employee._id} >
                            <Span>{employee.name}</Span>
                        </Emp>
                    ))
                }
            </List>
        </Container>
    )
}
  
export default Employees