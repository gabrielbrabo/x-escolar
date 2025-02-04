import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetMatter, deleteMatter } from '../../Api'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    FormSearch,
    // Input
    Add,
    AddTeacher,
    AreaEmp,
    InputEmp,
    Btt01,
    Buttons,
} from './style';

import LoadingSpinner from '../../components/Loading'

const DelMatter = () => {

    const navigate = useNavigate()
    const [matter, setMatter] = useState([])
    const [id_school, setIdSchol] = useState([])
    const [busca, setBusca] = useState("")
    //const [name_teacher, setName_Teacher] = useState("")
    const [name_matter, setName_Matter] = useState("")
    const [id_matter, setId_Matter] = useState("")
    const [loading, setLoading] = useState(false);
    //const [id_class, setId_class] = useState("")

    useEffect(() => {
        (async () => {
            setLoading(true);
            const idSchool = sessionStorage.getItem("id-school")
            const res = await GetMatter(JSON.parse(idSchool))
            setIdSchol(idSchool)
            setMatter(res.data.data)
            setLoading(false);
        })()

    }, [])

    matter.sort(function (a, b) {
        if (a.serie < b.serie) return -1
        if (a.serie > b.serie) return 1
        return 0
    })

    const SignClick = async () => {
        setLoading(true);
        const res = await deleteMatter(id_matter, JSON.parse(id_school))
        if (res) {
            alert('Materia Removida com sucesso.')
            navigate(-1);
        }
        setName_Matter('')

        console.log("id_matter", id_matter)
        setLoading(false);
    }

    const Remove = async (student) => {
        setLoading(true);
        setName_Matter(student.name)
        setId_Matter(student._id)
        //setName_Teacher(employee.name_teacher)
        setLoading(false);
    }

    const Return = async () => {
        // setName_Teacher('')
        setLoading(true);
        setName_Matter('')
        setLoading(false);
    }

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <>
                    <Search>
                        <FormSearch>
                            <label>Buscar Disciplina</label>
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
                    <p>Selecione a Disciplina a ser deletada!</p>
                    <List>

                        {
                            matter.filter((val) => {
                                if (!busca) {
                                    return (val)
                                } else if (val.name.includes(busca.toUpperCase())) {
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
                                    <p>Essa Disciplina sera apaga de todos os Professores e turmas em que ela esta cadastrada</p>
                                    <p>Tem certeza que deseja remover a Disciplina {name_matter} ?</p>
                                    <Buttons>
                                        <Btt01 onClick={SignClick}>Deletar</Btt01>
                                        <Btt01 onClick={Return}>Voltar</Btt01>
                                    </Buttons>
                                </AddTeacher>
                            }
                        </Add>
                    }
                </>
            }
        </Container>
    )
}

export default DelMatter;