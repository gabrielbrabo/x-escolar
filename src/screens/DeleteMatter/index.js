import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {GetMatter, deleteMatter} from '../../Api'

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
    const [matter, setMatter] = useState([])
    //const [serie, setSerie] = useState("")
    const [busca, setBusca] = useState("")
    //const [name_teacher, setName_Teacher] = useState("")
    const [name_matter, setName_Matter] = useState("")
    const [id_matter, setId_Matter] = useState("")
    //const [id_class, setId_class] = useState("")

    useEffect(() => {
        (async () => {
            const idSchool = sessionStorage.getItem("id-school")
            const res = await GetMatter(JSON.parse(idSchool))
            setMatter(res.data.data)
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
        const res = await deleteMatter(id_matter)
        if(res) {
            alert('Materia Removida com sucesso.')
            navigate('/matter')
        }
        setName_Matter('')
        
        console.log("id_matter", id_matter)
    }

    const Remove = async (student) => {
        setName_Matter(student.name)
        setId_Matter(student._id)
        //setName_Teacher(employee.name_teacher)
    }

    const Return = async () => {
       // setName_Teacher('')
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
            <>Selecione a Materia a ser deletada!</>
            <List>
                
                {
                    matter.filter((val) => {
                        if(!busca) {
                            return (val)
                        } else if(val.name.includes(busca.toUpperCase())) {
                            return (val)
                        }
                        return null
                   }).map(matter => (
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
                            <>Essa Materia sera apaga de todos os Professores e turmas em que ela esta cadastrada</>
                            <>Tem certeza que deseja remover a Materia {name_matter} ?</>
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