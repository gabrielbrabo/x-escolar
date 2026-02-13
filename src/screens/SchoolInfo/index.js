import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { indexSchool, updateSchool, getAssessmentRegime } from '../../Api'

import {
    Container,
    ContainerDivs,
    Info,
    Details,
    ContDiv,
    ButtonContainer,
    Context,
    LoadingSpinnerContainer,
    EditButtonContainer,
    ModalOverlay,
    ModalContent,
    ModalInput,
    //ModalSelect,
    ModalButtons,
    ModalButton,
} from './style'

import LoadingSpinner from '../../components/Loading'

import Employees from '../Employees/index'
import Student from '../Student/index'
import Class from '../Class/index'
import AnnualCalendar from '../AnnualCalendar/index'
import Matter from '../Matter/index'
import Controller from '../Controller/index'

const SchoolInformation = () => {
    const [School, setSchool] = useState([])
    const [activePage, setActivePage] = useState(() => {
        return localStorage.getItem('activePage') || 'staff'
    })
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [name, setEditedName] = useState('')
    const [assessmentFormat, setEditedAssessmentFormat] = useState('')
    const [address, setEditedAddress] = useState('')
    const [city, setEditedCity] = useState('')


    useEffect(() => {
        ; (async () => {
            setLoading(true)
            const res = await indexSchool(id)
            console.log("escola", res.data.data)
            setSchool(res.data.data)
            sessionStorage.setItem('School', res.data.data.name)
            setEditedName(res.data.data.name)
            setEditedAssessmentFormat(res.data.data.assessmentFormat)
            setEditedAddress(res.data.data.address || '')
            setEditedCity(res.data.data.city || '')

            const response = await getAssessmentRegime(id)

            if (response?.data?.data) {
                sessionStorage.setItem('assessmentRegime', response.data.data)
            }

            setLoading(false)
        })()
    }, [id])

    const handlePageChange = (page) => {
        setActivePage(page)
        localStorage.setItem('activePage', page)
    }

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    const getStoredColor = () => {
        let storedColor = sessionStorage.getItem('backgroundColor')
        if (!storedColor) {
            const color1 = getRandomColor()
            const color2 = getRandomColor()
            const angle = Math.floor(Math.random() * 360)
            storedColor = `linear-gradient(${angle}deg, ${color1}, ${color2})`
            sessionStorage.setItem('backgroundColor', storedColor)
        }
        return storedColor
    }

    const bgColor = getStoredColor()

    const getTextColor = (bgColor) => {
        if (!bgColor) return '#FFF'

        const regex = /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/i
        const matches = bgColor.match(regex)

        if (!matches) return '#FFF'

        const r = parseInt(matches[1], 16)
        const g = parseInt(matches[2], 16)
        const b = parseInt(matches[3], 16)

        const brightness = (r * 299 + g * 587 + b * 114) / 1000
        return brightness > 128 ? '#000' : '#FFF'
    }

    const textColor = getTextColor(bgColor)

    const renderPage = () => {
        switch (activePage) {
            case 'staff':
                return <Employees />
            case 'students':
                return <Student />
            case 'classes':
                return <Class />
            case 'bimesters':
                return <AnnualCalendar />
            case 'components':
                return <Matter />
            case 'controller':
                return <Controller />
            default:
                return null
        }
    }

    const isActive = (component) => activePage === component

    const handleSaveEdit = async () => {
        try {
            // Coloque aqui chamada para atualizar no backend
            const editSchool = await updateSchool(
                School._id,
                name,
                assessmentFormat,
                address,
                city,
            )
            setSchool((prev) => ({
                ...prev,
                name: name,
                assessmentFormat: assessmentFormat,
                address: address,
                city: city
            }))
            if (editSchool) {

                alert('Escola atualizado com sucesso!');
                setIsEditModalOpen(false)
            }
        } catch (error) {
            console.error('Erro ao atualizar a escola:', error)
            alert('Erro ao salvar as alterações.')
        }
    }

    return (
        <Container>
            {loading ? (
                <LoadingSpinnerContainer>
                    <LoadingSpinner />
                </LoadingSpinnerContainer>
            ) : (
                <ContainerDivs>
                    <Details style={{ background: bgColor, color: textColor }}>
                        <Info style={{ color: textColor }}>{School.name}</Info>
                        <Info style={{ color: textColor }}>
                            Forma de Avaliação:{' '}
                            {School.assessmentFormat === 'grade' && 'Notas'}
                            {School.assessmentFormat === 'concept' && 'Conceitos'}
                        </Info>
                        <Info style={{ color: textColor }}>Codigo:{School.SchoolCode}</Info>
                        <EditButtonContainer>
                            <button onClick={() => setIsEditModalOpen(true)}>Editar Escola</button>
                        </EditButtonContainer>
                    </Details>

                    <ContDiv>
                        <ButtonContainer>
                            <button
                                className={isActive('staff') ? 'active' : ''}
                                onClick={() => handlePageChange('staff')}
                            >
                                Funcionário
                            </button>
                            <button
                                className={isActive('students') ? 'active' : ''}
                                onClick={() => handlePageChange('students')}
                            >
                                Alunos
                            </button>
                            <button
                                className={isActive('classes') ? 'active' : ''}
                                onClick={() => handlePageChange('classes')}
                            >
                                Turmas
                            </button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <button
                                className={isActive('bimesters') ? 'active' : ''}
                                onClick={() => handlePageChange('bimesters')}
                            >
                                Período Avaliativo
                            </button>
                            <button
                                className={isActive('components') ? 'active' : ''}
                                onClick={() => handlePageChange('components')}
                            >
                                Componentes curriculares
                            </button>
                            <button
                                className={isActive('controller') ? 'active' : ''}
                                onClick={() => handlePageChange('controller')}
                            >
                                Controle
                            </button>
                        </ButtonContainer>
                    </ContDiv>
                    <Context>{renderPage()}</Context>

                    {isEditModalOpen && (
                        <ModalOverlay>
                            <ModalContent>
                                <h3>Editar Informações da Escola</h3>

                                <label>Nome da Instituição de Ensino:</label>
                                <ModalInput value={name} onChange={(e) => setEditedName(e.target.value)} />

                                <label>Endereço:</label>
                                <ModalInput value={address} onChange={(e) => setEditedAddress(e.target.value)} />

                                <label>Município:</label>
                                <ModalInput value={city} onChange={(e) => setEditedCity(e.target.value)} />

                                {/*<label>Forma de Avaliação:</label>
                                <ModalSelect
                                    value={editedAssessmentFormat}
                                    onChange={(e) => setEditedAssessmentFormat(e.target.value)}
                                >
                                    <option value="grade">Notas</option>
                                    <option value="concept">Conceitos</option>
                                </ModalSelect>*/}

                                <ModalButtons>
                                    <ModalButton style={{ backgroundColor: '#28a745', color: "white" }} onClick={() => setIsEditModalOpen(false)}>Cancelar</ModalButton>
                                    <ModalButton style={{ backgroundColor: '#dc3545', color: "white" }} onClick={handleSaveEdit}>Salvar</ModalButton>
                                </ModalButtons>
                            </ModalContent>
                        </ModalOverlay>
                    )}
                </ContainerDivs>
            )}
        </Container>
    )
}

export default SchoolInformation
