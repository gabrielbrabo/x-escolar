import React, {useState, useEffect} from 'react'
import {GetStudent} from '../../Api'
import {GetClass} from '../../Api'
import { useNavigate } from 'react-router-dom'

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

const Student = () => {

    const navigate = useNavigate()
    const [student, setStudent] = useState([])
    const [Clss, setClss] = useState([])
    const [busca, setBusca] = useState("")
    const [filter, setFilter] = useState()

    useEffect(() => {
        (async () => {
            const idSchool = sessionStorage.getItem("id-school")
            const response = await GetStudent(JSON.parse(idSchool))
            const resClass = await GetClass(JSON.parse(idSchool))
            setStudent(response.data.data)
            setClss(resClass.data.data)
        })() 
	}, [])
    console.log("clss",Clss)
    student.sort(function (a, b) {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
    })

    if(filter) {
        console.log('filter', filter)
    }

    const NewStudent = async () => {
        navigate('/new/student')
    }

    const StudentInformation = async (student) => {
        sessionStorage.removeItem('StudentInformation')
        sessionStorage.setItem("StudentInformation", student._id)
        navigate('/student/info')
    }

    console.log('res', student)

    return (
        <Container>
            <User>

            </User>
            <Search>
                <FormSearch>
                    <label>Buscar Aluno</label>
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
                    <label>Filtra por Turma: </label>
                    <Select id="position" 
                        value={filter} 
                        onChange={ 
                            (e) => setFilter(e.target.value)
                        }
                    >
                        <option value="">Todos</option>
                        {
                            Clss.map(c => (
                                <option value={c._id}>{c.serie}</option>
                            ))
                        }
                    </Select>
                </FormFilter>
            </Search>
            <List>
                <DivNewEmp>
                    <Btt02 onClick={NewStudent}>Novo Aluno</Btt02>
                </DivNewEmp>
                
                {
                    student.filter((fil) => {
                        if(!filter){
                            return (fil)
                        } else if(fil.id_class === filter) {
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
                   }).map(student => (
                        <Emp 
                            onClick={() => 
                                StudentInformation(student)
                            } 
                            key={student._id} 
                        >
                            <Span>{student.name}</Span>
                        </Emp>
                    ))
                }
            </List>
        </Container>
    )
}
  
export default Student