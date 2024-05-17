import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {GetStudent, addStdt} from '../../Api'

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
    Add
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
    const [id_student, setId_student] = useState("")
    const [id_class, setId_class] = useState("")
    const [name_student, setName_student] = useState("")
    const [serie, setSerie] = useState("")
    const [student, setStudent] = useState([])
    const [busca, setBusca] = useState("")
    const [added, setAdded] = useState()

    useEffect(() => {
        (async () => {
            const idSchool = sessionStorage.getItem("id-school")
            setId_class(sessionStorage.getItem("ClassInformation"))
            const resStudent = await GetStudent(JSON.parse(idSchool))
            setStudent(resStudent.data.data)
            console.log("resStudents", resStudent.data.data)
        })() 
	}, [])
   
    student.sort(function (a, b) {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
    })

    const addStudent = async (student) => {
        sessionStorage.removeItem('id_student')
        sessionStorage.setItem("id_student", student._id)
        setSerie(sessionStorage.getItem("serieClass"))
        setName_student(student.name)
        setId_student(student._id)
        
        //const res = await addStdt(id_student, id_class)
    }

    console.log('id_class', id_class)
    console.log('id_student', id_student)

    const SignClick = () => {
        const res = addStdt(id_student, id_class)
        if (res) {
            setAdded(true)
        }
        console.log(res)
    }
    const removeMattter = async () => {
        setAdded(false)
        setName_student('')
    }

    const Finish = async () => {
        navigate('/class/info')
    }
    const Return = async () => {
        setName_student('')
    }

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
            </Search>
            {
                name_student
                &&
                <Add>
                    {
                        added === true
                        ?
                        <Btt01 onClick={removeMattter}>Adicionar outro aluno ao {serie}</Btt01>
                        :
                        <div>
                            <>Adicionar {name_student} ao {serie} </>
                            <Btt01 onClick={SignClick}>Adicionar</Btt01>
                        </div>
                    }
                    {
                        added === true
                        &&
                        <Btt01 onClick={Finish}>Finalizar</Btt01>
                    }
                    {
                        added !== true
                        &&
                        <Btt01 onClick={Return}>Voltar</Btt01>
                    }
                </Add>
            }
            <List>
                {
                    student.filter((val) => {
                        if(!busca) {
                            return (val)
                        } else if(val.name.includes(busca.toUpperCase())) {
                            return (val)
                        }
                        return null
                   }).map(student => (
                        <Emp 
                            onClick={() => 
                                addStudent(student)
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
  
export default Matter