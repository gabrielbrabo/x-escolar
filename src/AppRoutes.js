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
import NewEmployees from "./screens/NewEmployee"
import NewStudent from "./screens/NewStudent"
import Student from "./screens/Student"
import Class from "./screens/Class"
import NewClass from "./screens/NewClass"
import Matter from "./screens/Matter"
import NewMatter from "./screens/NewMatter"
import AddMatter from "./screens/AddMatter"
import StudentInfo from "./screens/StudentInfo"
import EmployeeInfo from "./screens/EmployeeInfo"

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
                    <Route exact path="/new/employees" element={
                        <Private>
                            <NewEmployees/>
                        </Private>
                    }/>
                    <Route exact path="/new/student" element={
                        <Private>
                            <NewStudent/>
                        </Private>
                    }/>
                    <Route exact path="/student" element={
                        <Private>
                            <Student/>
                        </Private>
                    }/>
                    <Route exact path="/class" element={
                        <Private>
                            <Class/>
                        </Private>
                    }/>
                    <Route exact path="/new/class" element={
                        <Private>
                            <NewClass/>
                        </Private>
                    }/>
                    <Route exact path="/matter" element={
                        <Private>
                            <Matter/>
                        </Private>
                    }/>
                    <Route exact path="/new/matter" element={
                        <Private>
                            <NewMatter/>
                        </Private>
                    }/>
                    <Route exact path="/add/matter" element={
                        <Private>
                            <AddMatter/>
                        </Private>
                    }/>
                    <Route exact path="/student/info" element={
                        <Private>
                            <StudentInfo/>
                        </Private>
                    }/>
                    <Route exact path="/employee/info" element={
                        <Private>
                            <EmployeeInfo/>
                        </Private>
                    }/>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes