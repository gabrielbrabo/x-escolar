import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetStudentHistory } from '../../Api'
import LoadingSpinner from '../../components/Loading'

import {
    Container,
    Header,
    SchoolName,
    Title,
    StudentInfo,
    Table,
    SchoolBlock,
    InfoRow   // 👈 novo
} from './style'

const StudentHistory = () => {
    const { id_student } = useParams()

    const [history, setHistory] = useState([])
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadHistory() {
            try {
                const res = await GetStudentHistory(id_student)

                const data = Array.isArray(res.data)
                    ? res.data
                    : Array.isArray(res.data?.data)
                        ? res.data.data
                        : []

                setHistory(data)

                // extrai todas as matérias existentes
                const materias = new Set()

                data.forEach((year) => {
                    year.reportCard?.forEach((bim) => {
                        if (bim.studentGrade) {
                            Object.keys(bim.studentGrade).forEach((m) =>
                                materias.add(m)
                            )
                        }
                    })
                })

                setSubjects([...materias])
            } catch (err) {
                console.error(err)
                setHistory([])
                setSubjects([])
            } finally {
                setLoading(false)
            }
        }

        loadHistory()
    }, [id_student])

    console.log("history", history)

    if (loading) {
        return (
            <Container style={{ width: '100%' }}>
                <LoadingSpinner />
            </Container>
        )
    }

    if (!history.length) {
        return (
            <Container>
                Nenhum histórico encontrado.
            </Container>
        )
    }

    return (
        <Container>
            <Header>
                <Title>HISTÓRICO ESCOLAR - ENSINO FUNDAMENTAL - ANOS INICIAIS</Title>
            </Header>

            <StudentInfo>
                <strong>Aluno:</strong> {history[0].nameStudent}
            </StudentInfo>

            {history.map((year) => (
                <SchoolBlock key={year._id}>

                    {/* BOTÃO EDITAR */}
                    <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end', height: '0px'}}>
                        <button
                            style={{
                                height: '25px',
                                top: '10px',
                                right: '10px',
                                padding: '6px 12px',
                                cursor: 'pointer',
                                background: '#1976d2',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '12px'
                            }}
                        >
                            Editar
                        </button>
                    </div>

                    {/* ANO / SÉRIE ACIMA DO BLOCO */}
                    <div style={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>{year.serie}</div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <p style={{ margin: 0 }}>Ano:</p>
                            <p style={{ margin: 0 }}>{year.year}</p>
                        </div>
                    </div>

                    {/* NOME DA ESCOLA */}
                    <SchoolName>{year.nameSchool}</SchoolName>
                    <SchoolName style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontWeight: 500 }}>Município: {year.municipality}</span>
                        <span style={{ fontWeight: 500 }}>Estado: {year.state}</span>
                    </SchoolName>

                    <InfoRow>
                        <p>
                            Nota Total:{' '}
                            <strong style={{ color: '#1d7f14' }}>
                                {parseFloat(year.totalGrade)}
                            </strong>
                        </p>

                        <p>
                            Nota Média:{' '}
                            <strong style={{ color: 'blue' }}>
                                {parseFloat(year.averageGrade)}
                            </strong>
                        </p>

                        <p>
                            Dias Letivos Anuais: <strong>{year.annualSchoolDays}</strong>
                        </p>

                        <p>
                            CH Anual: <strong>{year.annualSchoolDays * year.dailyWorkload}hrs</strong>
                        </p>
                    </InfoRow>

                    <Table>
                        <thead>
                            <tr style={{ border: '1px solid #000' }}>

                                <th style={{ border: '1px solid #000' }}>Componentes Curriculares</th>
                                {subjects.map((subj) => (
                                    <th
                                        key={subj}
                                        style={{
                                            minWidth: '25px',       // largura mínima da coluna
                                            textAlign: 'center',      // alinha texto à esquerda
                                            justifyContent: 'center',      // alinha texto à esquerda
                                            padding: '10px 5px',    // espaço interno
                                            writingMode: 'vertical-rl', // texto na vertical
                                            transform: 'rotate(180deg)', // rotaciona para ficar diagonal
                                            whiteSpace: 'nowrap',   // impede quebra de linha
                                            border: '1px solid #000', // borda da célula
                                            verticalAlign: 'middle',
                                        }}
                                    >{subj}</th>
                                ))}
                                {/* 5 colunas vazias */}
                                {[...Array(5)].map((_, i) => (
                                    <th key={`extra-${i}`}
                                        style={{ minWidth: '45px', textAlign: 'center' }} // largura mínima para preencher
                                    ></th>
                                ))}

                                {/* Coluna Total de Carga Horária na diagonal */}
                                <th
                                    style={{
                                        minWidth: '30px',
                                        padding: '10px 5px',
                                        writingMode: 'vertical-rl',
                                        transform: 'rotate(180deg)',
                                        whiteSpace: 'nowrap',
                                        border: '1px solid #000',
                                        textAlign: 'center',
                                        verticalAlign: 'middle',
                                    }}
                                >
                                    Total de Carga Horária
                                </th>

                                <th
                                    style={{
                                        minWidth: '30px',
                                        padding: '10px 5px',
                                        writingMode: 'vertical-rl',
                                        transform: 'rotate(180deg)',
                                        whiteSpace: 'nowrap',
                                        border: '1px solid #000',
                                        textAlign: 'center',
                                        verticalAlign: 'middle',
                                    }}
                                >
                                    Situação do Aluno</th> {/* nova coluna */}
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                {/* célula apenas de referência */}
                                <td><strong>Aproveitamento</strong></td>

                                {subjects.map((subj) => (
                                    <td key={subj}>
                                        {renderNotaFinal(year.reportCard, subj)}
                                    </td>
                                ))}
                                {/* 5 colunas extras vazias */}
                                {[...Array(5)].map((_, i) => (
                                    <td key={`extra-${i}`}></td>
                                ))}

                                {/* Total CH */}
                                <td style={{ textAlign: 'center', color: 'green' }}>

                                </td>

                                {/* Coluna Situação com rowSpan */}
                                <td rowSpan={3} style={{ textAlign: 'center', verticalAlign: 'middle', color: 'blue' }}>

                                </td>
                            </tr>
                            {/* Nova linha de Carga Horária */}
                            <tr>
                                <td><strong>Carga Horária</strong></td>
                                <td colSpan={subjects.length} style={{ textAlign: 'center', color: 'green' }}>
                                    {renderCargaHorariaAluno(year.reportCard, year.dailyWorkload)}hrs
                                </td>
                                {[...Array(1)].map((_, i) => (
                                    <td key={`extra-${i}`} colSpan={subjects.length - 1}></td>
                                ))}
                                <td style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Faltas/Horas</strong></td>
                                <td colSpan={subjects.length} style={{ textAlign: 'center', color: 'red' }}>
                                    {renderFaltasHorasAluno(year.reportCard, year.dailyWorkload)}hrs
                                </td>
                                {[...Array(1)].map((_, i) => (
                                    <td key={`extra-${i}`} colSpan={subjects.length - 1}></td>
                                ))}
                                <td style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>
                                </td>
                            </tr>

                        </tbody>
                    </Table>
                </SchoolBlock>
            ))}
        </Container>
    )
}

export default StudentHistory

/* ============================= */
/* CALCULA NOTA FINAL POR MATÉRIA */
/* ============================= */
function renderNotaFinal(reportCard = [], materia) {
    let total = 0
    let encontrou = false

    reportCard.forEach((bim) => {
        const valor = bim.studentGrade?.[materia]?.total
        if (valor !== undefined) {
            total += Number(valor)
            encontrou = true
        }
    })

    return encontrou ? total : '-'
}

function renderCargaHorariaAluno(reportCard = [], dailyWorkload) {
    let totalPresencas = 0

    reportCard.forEach((bim) => {
        totalPresencas += Number(bim.frequencia?.totalPresencas || 0)
    })

    return totalPresencas * Number(dailyWorkload)
}

function renderFaltasHorasAluno(reportCard = [], dailyWorkload) {
    let totalFaltas = 0

    reportCard.forEach((bim) => {
        totalFaltas += Number(bim.frequencia?.totalFaltas || 0)
    })

    return totalFaltas * Number(dailyWorkload)
}


