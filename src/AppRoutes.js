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
import SchoolSelection from "./screens/SchoolSelection"
import Preload from "./screens/Preload"
import HomeEmployee from "./screens/HomeEmployee"
import AnnualCalendar from "./screens/AnnualCalendar"
import Employees from "./screens/Employees"
import NewEmployees from "./screens/NewEmployee"
import EmployeeAlreadyRegistered from "./screens/EmployeeAlreadyRegistered"
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
import EditiStQuarter from "./screens/EditiStQuarter"
import CreateiiNdQuarter from "./screens/CreateiiNdQuarter"
import EditiiNdQuarter from "./screens/EditiiNdQuarter"
import CreateiiiRdQuarter from "./screens/CreateiiiRdQuarter"
import EditiiiRdQuarter from "./screens/EditiiiRdQuarter"
import CreateivThQuarter from "./screens/CreateivThQuarter"
import EditivThQuarter from "./screens/EditivThQuarter"
import CreatevThQuarter from "./screens/CreatevThQuarter"
import EditvThQuarter from "./screens/EditvThQuarter"
import CreateviThQuarter from "./screens/CreateviThQuarter"
import EditviThQuarter from "./screens/EditviThQuarter"

import MyClasses from "./screensTeacher/MyClasses"
import MyClassesInfo from "./screensTeacher/MyClassInfo"
import Attendance from "./screensTeacher/Attendance"
import Grade from "./screensTeacher/Grade"
import GradeiStQuarter from "./screensTeacher/GradeiStQuarter"
import GradeiiNdQuarter from "./screensTeacher/GradeiiNdQuarter"
import GradeiiiRdQuarter from "./screensTeacher/GradeiiiRdQuarter"
import GradeivThQuarter from "./screensTeacher/GradeivThQuarter"
import GradevThQuarter from "./screensTeacher/GradevThQuarter"
import GradeviThQuarter from "./screensTeacher/GradeviThQuarter"

import IStQuarterReportCard from "./screens/I-StQuarterReportCard"
import IINdQuarterReportCard from "./screens/II-NdQuarterReportCard"
import IIIRdQuarterReportCard from "./screens/III-RdQuarterReportCard"
import IVThQuarterReportCard from "./screens/IV-ThQuarterReportCard"
import VThQuarterReportCard from "./screens/V-ThQuarterReportCard"
import VIThQuarterReportCard from "./screens/Vi-ThQuarterReportCard"

import RecordClassTaught from "./screensTeacher/RecordClassTaught"
import Classes from "./screensTeacher/Classes"
import IndividualForm from "./screensTeacher/IndividualForm"
import Form from "./screensTeacher/Form"
import ExistForm from "./screensTeacher/ExistForm"
import GradeFinalConcepts from "./screensTeacher/GradeFinalConcepts"

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
                    <Route exact path="/school/selection" element={<SchoolSelection />} />
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
                    <Route exact path="/updatei-stquarter" element={
                        <Private>
                            <EditiStQuarter/>
                        </Private>
                    } />
                    <Route exact path="/createii-ndquarter" element={
                        <Private>
                            <CreateiiNdQuarter/>
                        </Private>
                    } />
                    <Route exact path="/updateii-ndquarter" element={
                        <Private>
                            <EditiiNdQuarter/>
                        </Private>
                    } />
                    <Route exact path="/createiii-rdquarter" element={
                        <Private>
                            <CreateiiiRdQuarter/>
                        </Private>
                    } />
                    <Route exact path="/updateiii-rdquarter" element={
                        <Private>
                            <EditiiiRdQuarter/>
                        </Private>
                    } />
                    <Route exact path="/createiv-thquarter" element={
                        <Private>
                            <CreateivThQuarter/>
                        </Private>
                    } />
                    <Route exact path="/updateiv-thquarter" element={
                        <Private>
                            <EditivThQuarter/>
                        </Private>
                    } />
                    <Route exact path="/createv-thquarter" element={
                        <Private>
                            <CreatevThQuarter/>
                        </Private>
                    } />
                    <Route exact path="/updatev-thquarter" element={
                        <Private>
                            <EditvThQuarter/>
                        </Private>
                    } />
                    <Route exact path="/createvi-thquarter" element={
                        <Private>
                            <CreateviThQuarter/>
                        </Private>
                    } />
                    <Route exact path="/updatevi-thquarter" element={
                        <Private>
                            <EditviThQuarter/>
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
                    <Route exact path="/grade" element={
                        <Private>
                            <Grade />
                        </Private>
                    } />
                    <Route exact path="/grade-istquarter" element={
                        <Private>
                            <GradeiStQuarter />
                        </Private>
                    } />
                    <Route exact path="/grade-iindquarter" element={
                        <Private>
                            <GradeiiNdQuarter />
                        </Private>
                    } />
                    <Route exact path="/grade-iiirdquarter" element={
                        <Private>
                            <GradeiiiRdQuarter />
                        </Private>
                    } />
                    <Route exact path="/grade-ivthquarter" element={
                        <Private>
                            <GradeivThQuarter />
                        </Private>
                    } />
                    <Route exact path="/grade-vthquarter" element={
                        <Private>
                            <GradevThQuarter />
                        </Private>
                    } />
                    <Route exact path="/grade-vithquarter" element={
                        <Private>
                            <GradeviThQuarter />
                        </Private>
                    } />
                    <Route exact path="/ist-quarter-report-card" element={
                        <Private>
                            <IStQuarterReportCard/>
                        </Private>
                    } />
                    <Route exact path="/iind-quarter-report-card" element={
                        <Private>
                            <IINdQuarterReportCard/>
                        </Private>
                    } />
                    <Route exact path="/iiird-quarter-report-card" element={
                        <Private>
                            <IIIRdQuarterReportCard/>
                        </Private>
                    } />
                    <Route exact path="/ivth-quarter-report-card" element={
                        <Private>
                            <IVThQuarterReportCard/>
                        </Private>
                    } />
                    <Route exact path="/vth-quarter-report-card" element={
                        <Private>
                            <VThQuarterReportCard/>
                        </Private>
                    } />
                    <Route exact path="/vith-quarter-report-card" element={
                        <Private>
                            <VIThQuarterReportCard/>
                        </Private>
                    } />
                    <Route exact path="/record-class-taught" element={
                        <Private>
                            <RecordClassTaught/>
                        </Private>
                    } />
                    <Route exact path="/classes" element={
                        <Private>
                            <Classes/>
                        </Private>
                    } />
                    <Route exact path="/employee-already-registered" element={
                        <Private>
                            <EmployeeAlreadyRegistered/>
                        </Private>
                    } />
                    <Route exact path="/individual-form" element={
                        <Private>
                            <IndividualForm/>
                        </Private>
                    } />
                    <Route exact path="/form" element={
                        <Private>
                            <Form/>
                        </Private>
                    } />
                    <Route exact path="/exist-form/:id_form" element={
                        <Private>
                            <ExistForm/>
                        </Private>
                    } />
                    <Route exact path="/final-concepts" element={
                        <Private>
                            <GradeFinalConcepts/>
                        </Private>
                    } />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes