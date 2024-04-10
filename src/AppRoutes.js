import React, { useContext } from 'react'

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom"

import { AuthProvider, AuthContext } from './contexts/auth'

import LoginSelection from "./screens/LoginSelection"
import SignUpSchool from "./screens/SignUpSchool"
import SignInSchool from "./screens/SignInSchool"
import HomeSchool from "./screens/HomeSchool"
import SignInEmployee from "./screens/SignInEmployee"
import HomeEmployee from "./screens/HomeEmployee"
import Employees from "./screens/Employees"
import Student from "./screens/Student"

const AppRoutes = () => {

    const Private = ({children}) => {
        const { authenticated, loading } = useContext(AuthContext)
    
        if(loading) {
          return <div className='loading'>Carregando...</div>
        }
    
        if( !authenticated ) {
          return <Navigate to="/" />
        }
    
        return children
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<LoginSelection/>}/>
                    <Route exact path="/signup/school" element={<SignUpSchool/>}/>
                    <Route exact path="/signin/school" element={<SignInSchool/>}/>
                    <Route exact path="/signin/employee" element={<SignInEmployee/>}/>
                    <Route exact path="/home/school" element={
                        <Private>
                            <HomeSchool/>
                        </Private>
                    }/>
                    <Route exact path="/home/employee" element={
                        <Private>
                            <HomeEmployee/>
                        </Private>
                    }/>
                    <Route exact path="/employees" element={
                        <Private>
                            <Employees/>
                        </Private>
                    }/>
                    <Route exact path="/student" element={
                        <Private>
                            <Student/>
                        </Private>
                    }/>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes