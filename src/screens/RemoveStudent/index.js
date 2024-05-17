import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {clssInfo, removeStudent} from '../../Api'

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
    const [student, setStudent] = useState([])
    const [serie, setSerie] = useState("")
    const [busca, setBusca] = useState("")
    //const [name_teacher, setName_Teacher] = useState("")
    const [name_student, setName_Student] = useState("")
    const [id_student, setId_student] = useState("")
    const [id_class, setId_class] = useState("")
    //const [id_matter, setId_matter] = useState("")
    //const [addTeacher, setId_addTeacher] = useState("")

    useEffect(() => {
        (async () => {
            const id = sessionStorage.getItem("ClassInformation")
            setSerie(sessionStorage.getItem("serieClass"))
            const res = await clssInfo(id)
            //setStudent(response.data.data)
            //setClss(resClass.data.data)

            const student = res.data.data.find( res => {
                return res
            }).id_student.map( res => {
                if (res) {
                    return (res)   
                } else {
                    return null
                }
            })
            /*const studentAdded = student.find( res => {
                return res
            })*/
            setStudent(student)
            setId_class(id)
           // setId_student(studentAdded._id)
        })() 
        
	}, [])
   
    student.sort(function (a, b) {
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
        const res = await removeStudent(id_student, id_class)
        if(res) {
            alert('Aluno Removido com sucesso.')
            navigate('/class/info')
        }
        console.log("id_student", id_student)
        console.log("id_class", id_class)
        setName_Student('')
    }

    const Remove = async (student) => {
        setName_Student(student.name)
        setId_student(student._id)
        //setName_Teacher(employee.name_teacher)
    }

    const Return = async () => {
       // setName_Teacher('')
       setName_Student('')
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
                                Remove(student)
                            }
                            key={student._id} 
                        >
                            <Span>{student.name}</Span>
                        </Emp>
                    ))
                }
            </List>
            {
                name_student
                &&
                <Add>
                    
                    {
                        <AddTeacher>
                            <>Tem certeza que deseja remover {name_student} do {serie} ?</>
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