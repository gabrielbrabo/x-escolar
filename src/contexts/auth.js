import React, {useState, useEffect, createContext} from 'react'
import {api, createSessionEmployee, createSessionSchool } from '../Api'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const Screen  = (screenName) => {

    console.log(screenName)
    
}

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //const recoveredSchool = sessionStorage.getItem("id-school")
        const recoveredEmployee = sessionStorage.getItem("Id_employee")
        const token = sessionStorage.getItem('token')

        /*if(recoveredSchool && token) {
            setUser(JSON.parse(recoveredSchool))
            api.defaults.headers.Authorization = `Bearer ${token}`
        }*/

        if(recoveredEmployee && token) {
            setUser(JSON.parse(recoveredEmployee))
            api.defaults.headers.Authorization = `Bearer ${token}`
        }

        setLoading(false)
    }, [])

    const loginSchool = async (email, password) => {

        const response = await createSessionSchool(email, password)
        console.log(response)
        if(response) {
            const IdSchool = response.data.id
            const loggedSchool = response.data.email
            const token = response.data.token
            const name = response.data.name
            const type = response.data.type
            const id_employee = response.data.id_employee
            const id_matter = response.data.id_matter
            const id_class = response.data.id_class
            //const avatar = response.data.avatar
            sessionStorage.setItem("id-school", 
            JSON.stringify(IdSchool))
            sessionStorage.setItem("email-school", loggedSchool)
            sessionStorage.setItem("name-school", name)
            sessionStorage.setItem("type", type)
            sessionStorage.setItem("id_employee", id_employee)
            sessionStorage.setItem("id_matter", id_matter)
            sessionStorage.setItem("id_class", id_class)
            sessionStorage.setItem("token", token)

            /*if (avatar) {
                sessionStorage.setItem("avatar", avatar)
            }*/

            api.defaults.headers.Authorization = `Bearer ${token}`
            setUser(loggedSchool)
            
            navigate('/first/employee')

            window.location.reload()
        }
        
    }

    const loginEmployee = async (cpf, password) => {

        const response = await createSessionEmployee(cpf, password)
        if(response) {
            const IdEmployee = response.data.id
            const loggedEmployee = response.data.CPF
            const token = response.data.token
            const name = response.data.name
            const type = response.data.type
            const position_at_school = response.data.position_at_school
            const id_school = response.data.id_school
            const id_matter = response.data.id_matter
            const id_class = response.data.id_class
            const id_reporter_cardid_class = response.data.id_reporter_card
            //const avatar = response.data.avatar
            sessionStorage.setItem("Id_employee", 
            JSON.stringify(IdEmployee))
            sessionStorage.setItem("cpf", loggedEmployee)
            sessionStorage.setItem("name", name)
            sessionStorage.setItem("type", type)
            sessionStorage.setItem("position_at_school", position_at_school)
            sessionStorage.setItem("id-school", JSON.stringify(id_school))
            sessionStorage.setItem("id_matter", id_matter)
            sessionStorage.setItem("id_class", id_class)
            sessionStorage.setItem("id_reporter_cardid_class", id_reporter_cardid_class)
            sessionStorage.setItem("token", token)

            /*if (avatar) {
                sessionStorage.setItem("avatar", avatar)
            }*/
            
            api.defaults.headers.Authorization = `Bearer ${token}`
            setUser(loggedEmployee)
            
            navigate('/home/employee')

            window.location.reload()
        }
        console.log(response)
    }
    
    const logout = () => {

        sessionStorage.removeItem("user")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("patient")
        api.defaults.headers.Authorization = null
        setUser(null)
        
    }

    return (
        <AuthContext.Provider 
            value={
                {
                    authenticated: !!user, 
                    user,
                    loading,
                    loginSchool,
                    loginEmployee,
                    logout
                }
            }
        >
            {children}
            
        </AuthContext.Provider>
    )
}