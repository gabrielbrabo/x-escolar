import React, { useState, useEffect, createContext } from 'react'
import { api, } from '../Api'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const Screen = (screenName) => {

    console.log(screenName)

}

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredSchool = sessionStorage.getItem("id-school")
        const recoveredEmployee = localStorage.getItem("Id_employee")
        const token = sessionStorage.getItem('token')

        if (recoveredSchool && token) {
            setUser(recoveredSchool)
            api.defaults.headers.Authorization = `Bearer ${token}`
        }

        if (recoveredEmployee && token) {
            setUser(JSON.parse(recoveredEmployee))
            api.defaults.headers.Authorization = `Bearer ${token}`
        }

        setLoading(false)
    }, [])

    const loginSchool = async (loggedSchool) => {
        setUser(loggedSchool)
        navigate('/first/employee')
    }
    
    const loginEducationDepartment = async (loggedEducationDepartment) => {
        setUser(loggedEducationDepartment)
        navigate('/first/employee-education-department')
    }

    const loginEmployeeEducationDepartment = async (loggedEmployee) => {
        setUser(loggedEmployee)
        navigate('/home/employee-education-department')
    }
    
    const loginEmployee = async (loggedEmployee) => {
        setUser(loggedEmployee)
        navigate('/home/employee')
    }

    const logout = () => {

        sessionStorage.removeItem("user")
        sessionStorage.removeItem("token")
        //sessionStorage.removeItem("patient")
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
                    loginEducationDepartment,
                    loginEmployeeEducationDepartment,
                    loginEmployee,
                    logout
                }
            }
        >
            {children}

        </AuthContext.Provider>
    )
}