import React, {useState, useEffect, createContext} from 'react'
import {api, createSessionSchool } from '../Api'
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
        const recoveredSchool = sessionStorage.getItem("id-school")
        const token = sessionStorage.getItem('token')

        if(recoveredSchool && token) {
            setUser(JSON.parse(recoveredSchool))
            api.defaults.headers.Authorization = `Bearer ${token}`
        }

        setLoading(false)
    }, [])

    const loginSchool = async (email, password) => {

        const response = await createSessionSchool(email, password)

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
        
        navigate('/home/school')

        window.location.reload()
        
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
                    logout
                }
            }
        >
            {children}
            
        </AuthContext.Provider>
    )
}