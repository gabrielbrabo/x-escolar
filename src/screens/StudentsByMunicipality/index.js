import React, { useEffect, useState } from 'react'
import { IndexInfoDepEdu, GetStudentsBySchools } from '../../Api'
import { useNavigate } from 'react-router-dom'

import {
    Container,
    List,
    Emp,
    Span,
    Search,
    FormFilter,
    FormSearch,
    AreaEmp,
    InputEmp,
    Select,
    ContainerDivs
} from './style'

import LoadingSpinner from '../../components/Loading'

const StudentsMunicipality = () => {

    const navigate = useNavigate()

    const [students, setStudents] = useState([])
    const [schools, setSchools] = useState([])
    const [busca, setBusca] = useState("")
    const [filterSchool, setFilterSchool] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)

            const idEducationDepartment = sessionStorage.getItem("idDepartment")

            // 🔹 escolas
            const response = await IndexInfoDepEdu(idEducationDepartment)
            const schoolsData = response.data.data.id_schools

            setSchools(schoolsData)

            // 🔹 ids
            const idsSchools = schoolsData.map(s => s._id)

            // 🔹 alunos
            const resStudents = await GetStudentsBySchools(idsSchools)

            setStudents(resStudents.data.data)

            setLoading(false)
        })()
    }, [])

    // 🔤 normalizar busca
    const normalizeString = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s]/gi, "")
            .toUpperCase()
    }
    console.log('student', students)
    // 🔥 filtro + ordenação
    const filteredStudents = students
        .filter(s => !filterSchool || s.id_school._id === filterSchool)
        .filter(s => !busca || normalizeString(s.name).includes(normalizeString(busca)))
        .sort((a, b) => {
            if (a.status === "ativo" && b.status !== "ativo") return -1
            if (b.status === "ativo" && a.status !== "ativo") return 1
            return 0
        })

    const StudentInformation = (student) => {

        // ✅ salva a escola do aluno
        sessionStorage.setItem("id-school", JSON.stringify(student.id_school._id))

        // ✅ se você usa isso em outros lugares (já vi no seu código)
        if (student.id_school?.assessmentFormat) {
            sessionStorage.setItem("assessmentFormat", student.id_school.assessmentFormat)
        }

        navigate(`/student/info/${student._id}`)
    }

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ContainerDivs>

                    {/* 🔍 BUSCA + FILTRO */}
                    <Search>
                        <FormSearch>
                            <label>Buscar Aluno</label>
                            <AreaEmp>
                                <InputEmp
                                    type="text"
                                    placeholder="Buscar por nome"
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                />
                            </AreaEmp>
                        </FormSearch>

                        <FormFilter>
                            <label>Filtrar por Escola</label>
                            <Select
                                value={filterSchool}
                                onChange={(e) => setFilterSchool(e.target.value)}
                            >
                                <option value="">Todas</option>
                                {schools.map(s => (
                                    <option key={s._id} value={s._id}>
                                        {s.name}
                                    </option>
                                ))}
                            </Select>
                        </FormFilter>
                    </Search>

                    {/* 📋 LISTA */}
                    <List>
                        <p>Total de Alunos: {filteredStudents.length}</p>

                        {filteredStudents.map(student => (
                            <Emp
                                key={student._id}
                                onClick={() => StudentInformation(student)}
                            >
                                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                                    <Span style={{ color: "#003e4f" }}>
                                        {student.name}
                                    </Span>

                                    {student.id_school?.name && (
                                        <span style={{ color: "#666", fontSize: "13px" }}>
                                            {student.id_school.name}
                                        </span>
                                    )}
                                </div>

                                {/* 🎯 STATUS */}
                                {student.status === "ativo" && (
                                    <span style={{ color: "green", marginLeft: 8, fontWeight: "bold" }}>
                                        ativo
                                    </span>
                                )}

                                {student.status === "transferido" && (
                                    <span style={{ color: "orange", marginLeft: 8, fontWeight: "bold" }}>
                                        transferido
                                    </span>
                                )}

                                {student.status === "inativo" && (
                                    <span style={{ color: "red", marginLeft: 8, fontWeight: "bold" }}>
                                        inativo
                                    </span>
                                )}
                                {student.status === "concluido" && (
                                    <span style={{ color: "blue", marginLeft: "8px", fontWeight: "bold" }}>
                                        {student.status}
                                    </span>
                                )}
                            </Emp>
                        ))}
                    </List>

                </ContainerDivs>
            )}
        </Container>
    )
}

export default StudentsMunicipality