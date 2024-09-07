import React, { useContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import {
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
import Preload from "./screens/Preload"
import HomeEmployee from "./screens/HomeEmployee"
import AnnualCalendar from "./screens/AnnualCalendar"
import Employees from "./screens/Employees"
import NewEmployees from "./screens/NewEmployee"
import FirstEmployee from "./screens/FirstEmployee"
import NewStudent from "./screens/NewStudent"
import Student from "./screens/Student"
import Class from "./screens/Class"
import NewClass from "./screens/NewClass"
import Matter from "./screens/Matter"
import NewMatter from "./screens/NewMatter"
import AddMatter from "./screens/AddMatter"
import AddStudent from "./screens/AddStudent"
import AddTeacher from "./screens/AddTeacher"
import StudentInfo from "./screens/StudentInfo"
import EmployeeInfo from "./screens/EmployeeInfo"
import ClassInfo from "./screens/ClassInfo"
import RemoveTeacher from "./screens/RemoveTeacher"
import RemoveStudent from "./screens/RemoveStudent"
import RemoveMatter from "./screens/RemoveMatter"
import DeleteMatter from "./screens/DeleteMatter"

import EditProfileEmployee from "./screens/EditProfileEmployee"
import EditProfileStudent from "./screens/EditProfileStudent"
import EditClass from "./screens/EditClass"

import CreateiStQuarter from "./screens/CreateiStQuarter"

import MyClasses from "./screensTeacher/MyClasses"
import MyClassesInfo from "./screensTeacher/MyClassInfo"
import Attendance from "./screensTeacher/Attendance"

const AppRoutes = () => {

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <div className='loading'>Carregando...</div>
        }

        if (!authenticated) {
            return <Navigate to="/" />
        }

        return children
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login/selection" element={<LoginSelection />} />
                    <Route exact path="/signup/school" element={<SignUpSchool />} />
                    <Route exact path="/signin/school" element={<SignInSchool />} />
                    <Route exact path="/signin/employee" element={<SignInEmployee />} />
                    <Route exact path="/" element={<Preload />} />
                    <Route exact path="/home/school" element={
                        <Private>
                            <HomeSchool />
                        </Private>
                    } />
                    <Route exact path="/home/employee" element={
                        <Private>
                            <HomeEmployee />
                        </Private>
                    } />
                    <Route exact path="/employees" element={
                        <Private>
                            <Employees />
                        </Private>
                    } />
                    <Route exact path="/first/employee" element={
                        <Private>
                            <FirstEmployee />
                        </Private>
                    } />
                    <Route exact path="/new/employees" element={
                        <Private>
                            <NewEmployees />
                        </Private>
                    } />
                    <Route exact path="/edit-profile" element={
                        <Private>
                            <EditProfileEmployee />
                        </Private>
                    } />
                    <Route exact path="/edit-student" element={
                        <Private>
                            <EditProfileStudent/>
                        </Private>
                    } />
                    <Route exact path="/edit-class" element={
                        <Private>
                            <EditClass/>
                        </Private>
                    } />
                    <Route exact path="/annual-calendar" element={
                        <Private>
                            <AnnualCalendar />
                        </Private>
                    } />
                    <Route exact path="/createi-stquarter" element={
                        <Private>
                            <CreateiStQuarter/>
                        </Private>
                    } />
                    <Route exact path="/new/student" element={
                        <Private>
                            <NewStudent />
                        </Private>
                    } />
                    <Route exact path="/student" element={
                        <Private>
                            <Student />
                        </Private>
                    } />
                    <Route exact path="/class" element={
                        <Private>
                            <Class />
                        </Private>
                    } />
                    <Route exact path="/new/class" element={
                        <Private>
                            <NewClass />
                        </Private>
                    } />
                    <Route exact path="/matter" element={
                        <Private>
                            <Matter />
                        </Private>
                    } />
                    <Route exact path="/new/matter" element={
                        <Private>
                            <NewMatter />
                        </Private>
                    } />
                    <Route exact path="/add/matter" element={
                        <Private>
                            <AddMatter />
                        </Private>
                    } />
                    <Route exact path="/add/student" element={
                        <Private>
                            <AddStudent />
                        </Private>
                    } />
                    <Route exact path="/add/teacher/:id_class" element={
                        <Private>
                            <AddTeacher />
                        </Private>
                    } />
                    <Route exact path="/student/info/:id_student" element={
                        <Private>
                            <StudentInfo />
                        </Private>
                    } />
                    <Route exact path="/employee/info/:id_employee" element={
                        <Private>
                            <EmployeeInfo />
                        </Private>
                    } />
                    <Route exact path="/class/info/:id_class" element={
                        <Private>
                            <ClassInfo />
                        </Private>
                    } />
                    <Route exact path="/remove/teacher" element={
                        <Private>
                            <RemoveTeacher />
                        </Private>
                    } />
                    <Route exact path="/remove/student" element={
                        <Private>
                            <RemoveStudent />
                        </Private>
                    } />
                    <Route exact path="/remove/matter" element={
                        <Private>
                            <RemoveMatter />
                        </Private>
                    } />
                    <Route exact path="/delete/matter" element={
                        <Private>
                            <DeleteMatter />
                        </Private>
                    } />

                    <Route exact path="/myclasses" element={
                        <Private>
                            <MyClasses />
                        </Private>
                    } />
                    <Route exact path="/myclassesinfo/:id_class/:id_teacher" element={
                        <Private>
                            <MyClassesInfo />
                        </Private>
                    } />
                    <Route exact path="/attendance" element={
                        <Private>
                            <Attendance />
                        </Private>
                    } />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes