import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import {
    Route,
    Routes,
    Navigate,
    useLocation
} from "react-router-dom"

import { AuthProvider, AuthContext } from './contexts/auth'

import LoginSelection from "./screens/LoginSelection"
import SignUpEducationDepartment from "./screens/SignUpEducationDepartment"
import SignUpSchool from "./screens/SignUpSchool"
import SignInSchool from "./screens/SignInSchool"
import HomeSchool from "./screens/HomeSchool"
import SignInEmployeesEducationDepartment from "./screens/SignInEmployeesEducationDepartment"
import SignInEmployee from "./screens/SignInEmployee"
import ForgotPasswordEducationDepartment from "./screens/ForgotPasswordEducationDepartment"
import ForgotPassword from "./screens/ForgotPassword"
import PasswordRecoveryEducationDepartment from "./screens/PasswordRecoveryEducationDepartment"
import PasswordRecovery from "./screens/PasswordRecovery"
import PasswordReset from "./screens/PasswordReset"
import PasswordResetEmpEduDep from "./screens/PasswordResetEmpEduDep"
import SchoolSelection from "./screens/SchoolSelection"
import Preload from "./screens/Preload"

import HomeEmployeeEducationDepartment from "./screens/HomeEmployeeEducationDepartment"
import Schools from "./screens/Schools"
import SchoolInfo from "./screens/SchoolInfo"

import HomeEmployee from "./screens/HomeEmployee"
import AnnualCalendar from "./screens/AnnualCalendar"
import Controller from "./screens/Controller"
import Employees from "./screens/Employees"
import EmployeesEduDep from "./screens/EmployeesEduDep"
import NewEmployees from "./screens/NewEmployee"
import NewEmployeeEduDep from "./screens/NewEmployeeEduDep"
import EmployeeAlreadyRegistered from "./screens/EmployeeAlreadyRegistered"
import ManagerAlreadyRegistered from "./screens/ManagerAlreadyRegistered"

import FirstEmployeeEducationDepartment from "./screens/FirstEmployeeEducationDepartment"
import FirstEmployee from "./screens/FirstEmployee"

import NewStudent from "./screens/NewStudent"
import Student from "./screens/Student"

import Class from "./screens/Class"
import NewClass from "./screens/NewClass"

import Matter from "./screens/Matter"
import NewMatter from "./screens/NewMatter"

import AddMatter from "./screens/AddMatter"
import AddStudent from "./screens/AddStudent"
import ReassignStudent from "./screens/ReassignStudent"
import TransferStudent from "./screens/TransferStudent"
import AddTeacher from "./screens/AddTeacher"
import AddRegentTeacher02 from "./screens/AddRegentTeacher02"
import AddphysicalTeacher from "./screens/AddphysicalTeacher"

import StudentInfo from "./screens/StudentInfo"
import EmployeeInfo from "./screens/EmployeeInfo"
import EmployeeInfoEduDep from "./screens/EmployeeInfoEduDep"
import PerfilEmployeeEducationDepartment from "./screens/PerfilEmployeeEducationDepartment"
import PerfilEmployee from "./screens/PerfilEmployee"
import ClassInfo from "./screens/ClassInfo"
import RemoveTeacher from "./screens/RemoveTeacher"
import RemoveTeacher02 from "./screens/RemoveTeacher02"
import RemovephysicalTeacher from "./screens/RemovephysicalTeacher"
import RemoveStudent from "./screens/RemoveStudent"
import RemoveMatter from "./screens/RemoveMatter"
import DeleteMatter from "./screens/DeleteMatter"

import EditMyProfile from "./screens/EditMyProfile"
import EditMyProfileEduDep from "./screens/EditMyProfileEduDep"
import EditProfileEmployee from "./screens/EditProfileEmployee"
import EditProfileEmployeeEduDep from "./screens/EditProfileEmployeeEduDep"
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
import TestAttendance from "./screensTeacher/TestAttendance"

import Grade from "./screensTeacher/Grade"

import IstEvaluativeActivities from "./screensTeacher/1stEvaluativeActivities"
import IIndEvaluativeActivities from "./screensTeacher/2ndEvaluativeActivities"
import IIIrdEvaluativeActivities from "./screensTeacher/3rdEvaluativeActivities"
import IVthEvaluativeActivities from "./screensTeacher/4thEvaluativeActivities"

import IstQuarterGrade from "./screensTeacher/1stQuarterGrade"
import IIndQuarterGrade from "./screensTeacher/2ndQuarterGrade"
import IIIrdQuarterGrade from "./screensTeacher/3rdQuarterGrade"
import IVthQuarterGrade from "./screensTeacher/4thQuarterGrade"

import NumQuarterGrade from "./screensTeacher/NumQuarterGrade"

import GradeiStQuarter from "./screensTeacher/GradeiStQuarter"
import GradeiiNdQuarter from "./screensTeacher/GradeiiNdQuarter"
import GradeiiiRdQuarter from "./screensTeacher/GradeiiiRdQuarter"
import GradeivThQuarter from "./screensTeacher/GradeivThQuarter"
import GradevThQuarter from "./screensTeacher/GradevThQuarter"
import GradeviThQuarter from "./screensTeacher/GradeviThQuarter"

import IStNumericalGradeCard from "./screens/I-StNumericalGradeCard"
import IINdNumericalGradeCard from "./screens/II-NdNumericalGradeCard"
import IIIRdNumericalGradeCard from "./screens/III-RdNumericalGradeCard"
import IVThNumericalGradeCard from "./screens/IV-ThNumericalGradeCard"
import FinalNumericalGradescard from "./screens/FinalNumericalGradescard"

import IstBimAllTheBulletinsGrades from "./screens/1ºBimAllTheBulletinsGrades"
import IIndBimAllTheBulletinsGrades from "./screens/2ºBimAllTheBulletinsGrades"
import IIIrdBimAllTheBulletinsGrades from "./screens/3ºBimAllTheBulletinsGrades"
import IVthBimAllTheBulletinsGrades from "./screens/4ºBimAllTheBulletinsGrades"
import AllTheFinalBulletinsGrades from "./screens/AllTheFinalBulletinsGrades"

import IstBimAllTheBulletinsConcept from "./screens/1ºBimAllTheBulletinsConcept"
import IIndBimAllTheBulletinsConcept from "./screens/2ºBimAllTheBulletinsConcept"
import IIIrdBimAllTheBulletinsConcept from "./screens/3ºBimAllTheBulletinsConcept"
import IVthBimAllTheBulletinsConcept from "./screens/4ºBimAllTheBulletinsConcept"
import AllTheFinalBulletinsConcept from "./screens/AllTheFinalBulletinsConcept"

import IStQuarterReportCard from "./screens/I-StQuarterReportCard"
import IINdQuarterReportCard from "./screens/II-NdQuarterReportCard"
import IIIRdQuarterReportCard from "./screens/III-RdQuarterReportCard"
import IVThQuarterReportCard from "./screens/IV-ThQuarterReportCard"
import VThQuarterReportCard from "./screens/V-ThQuarterReportCard"
import VIThQuarterReportCard from "./screens/Vi-ThQuarterReportCard"
import FinalConceptscard from "./screens/FinalConceptscard"

import RecordClassTaught from "./screensTeacher/RecordClassTaught"
import Classes from "./screensTeacher/Classes"
import IndividualForm from "./screensTeacher/IndividualForm"
import Form from "./screensTeacher/Form"
import ExistForm from "./screensTeacher/ExistForm"
import GradeFinalConcepts from "./screensTeacher/GradeFinalConcepts"

import Daily from "./screens/Daily"
import BimonthlyDiary from "./screens/bimonthlyDiary"
import AnnualDiary from "./screens/annualDiary"

import NumQuarterGradeDaily from "./components/NumQuarterGradeDaily"

import PrintableAttendanceSheet from "./screens/PrintableAttendanceSheet"

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

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    };

    return (
        <Router>
            <ScrollToTop />
            <AuthProvider>
                <Routes>
                    <Route exact path="/login/selection" element={<LoginSelection />} />
                    <Route exact path="/signup/education-department" element={<SignUpEducationDepartment />} />
                    <Route exact path="/signup/school" element={<SignUpSchool />} />
                    <Route exact path="/signin/school" element={<SignInSchool />} />
                    <Route exact path="/signin/employee-education-department" element={<SignInEmployeesEducationDepartment />} />
                    <Route exact path="/signin/employee" element={<SignInEmployee />} />
                    <Route exact path="/forgot-password-education-department" element={<ForgotPasswordEducationDepartment />} />
                    <Route exact path="/forgot-password" element={<ForgotPassword />} />
                    <Route exact path="/reset-password-education-department/:cpf/:id/:reset_token" element={<PasswordRecoveryEducationDepartment />} />
                    <Route exact path="/reset-password/:cpf/:id/:reset_token" element={<PasswordRecovery />} />
                    <Route exact path="/school/selection" element={<SchoolSelection />} />
                    <Route exact path="/" element={<Preload />} />
                    <Route exact path="/home/school" element={
                        <Private>
                            <HomeSchool />
                        </Private>
                    } />
                    <Route exact path="/home/employee-education-department" element={
                        <Private>
                            <HomeEmployeeEducationDepartment />
                        </Private>
                    } />
                    <Route exact path="/schools" element={
                        <Private>
                            <Schools />
                        </Private>
                    } />
                    <Route exact path="/school/info/:id" element={
                        <Private>
                            <SchoolInfo />
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
                    <Route exact path="/employees-edu-dep" element={
                        <Private>
                            <EmployeesEduDep />
                        </Private>
                    } />
                    <Route exact path="/first/employee-education-department" element={
                        <Private>
                            <FirstEmployeeEducationDepartment />
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
                    <Route exact path="/new/employees-edu-dep" element={
                        <Private>
                            <NewEmployeeEduDep />
                        </Private>
                    } />
                    <Route exact path="/edit-my-profile" element={
                        <Private>
                            <EditMyProfile />
                        </Private>
                    } />
                    <Route exact path="/edit-my-profile-edu-dep" element={
                        <Private>
                            <EditMyProfileEduDep />
                        </Private>
                    } />
                    <Route exact path="/edit-profile" element={
                        <Private>
                            <EditProfileEmployee />
                        </Private>
                    } />
                    <Route exact path="/edit-profile-edu-dep" element={
                        <Private>
                            <EditProfileEmployeeEduDep />
                        </Private>
                    } />
                    <Route exact path="/edit-student" element={
                        <Private>
                            <EditProfileStudent />
                        </Private>
                    } />
                    <Route exact path="/edit-class" element={
                        <Private>
                            <EditClass />
                        </Private>
                    } />
                    <Route exact path="/controller" element={
                        <Private>
                            <Controller />
                        </Private>
                    } />
                    <Route exact path="/annual-calendar" element={
                        <Private>
                            <AnnualCalendar />
                        </Private>
                    } />
                    <Route exact path="/createi-stquarter" element={
                        <Private>
                            <CreateiStQuarter />
                        </Private>
                    } />
                    <Route exact path="/updatei-stquarter" element={
                        <Private>
                            <EditiStQuarter />
                        </Private>
                    } />
                    <Route exact path="/createii-ndquarter" element={
                        <Private>
                            <CreateiiNdQuarter />
                        </Private>
                    } />
                    <Route exact path="/updateii-ndquarter" element={
                        <Private>
                            <EditiiNdQuarter />
                        </Private>
                    } />
                    <Route exact path="/createiii-rdquarter" element={
                        <Private>
                            <CreateiiiRdQuarter />
                        </Private>
                    } />
                    <Route exact path="/updateiii-rdquarter" element={
                        <Private>
                            <EditiiiRdQuarter />
                        </Private>
                    } />
                    <Route exact path="/createiv-thquarter" element={
                        <Private>
                            <CreateivThQuarter />
                        </Private>
                    } />
                    <Route exact path="/updateiv-thquarter" element={
                        <Private>
                            <EditivThQuarter />
                        </Private>
                    } />
                    <Route exact path="/createv-thquarter" element={
                        <Private>
                            <CreatevThQuarter />
                        </Private>
                    } />
                    <Route exact path="/updatev-thquarter" element={
                        <Private>
                            <EditvThQuarter />
                        </Private>
                    } />
                    <Route exact path="/createvi-thquarter" element={
                        <Private>
                            <CreateviThQuarter />
                        </Private>
                    } />
                    <Route exact path="/updatevi-thquarter" element={
                        <Private>
                            <EditviThQuarter />
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
                    <Route exact path="/reassign-student" element={
                        <Private>
                            <ReassignStudent />
                        </Private>
                    } />
                    <Route exact path="/transfer-student" element={
                        <Private>
                            <TransferStudent />
                        </Private>
                    } />
                    <Route exact path="/add/teacher/:id_class" element={
                        <Private>
                            <AddTeacher />
                        </Private>
                    } />
                    <Route exact path="/add/teacher02/:id_class" element={
                        <Private>
                            <AddRegentTeacher02 />
                        </Private>
                    } />
                    <Route exact path="/add/physicalteacher/:id_class" element={
                        <Private>
                            <AddphysicalTeacher />
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
                    <Route exact path="/employee/info-edu-dep/:id_employee" element={
                        <Private>
                            <EmployeeInfoEduDep />
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
                    <Route exact path="/remove/teacher02" element={
                        <Private>
                            <RemoveTeacher02 />
                        </Private>
                    } />
                    <Route exact path="/remove/physicalteacher" element={
                        <Private>
                            <RemovephysicalTeacher />
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
                    <Route exact path="/test-attendance" element={
                        <Private>
                            <TestAttendance />
                        </Private>
                    } />
                    <Route exact path="/grade" element={
                        <Private>
                            <Grade />
                        </Private>
                    } />

                    <Route exact path="/$st-activities" element={
                        <Private>
                            <IstEvaluativeActivities />
                        </Private>
                    } />
                    <Route exact path="/$$st-activities" element={
                        <Private>
                            <IIndEvaluativeActivities />
                        </Private>
                    } />
                    <Route exact path="/$$$st-activities" element={
                        <Private>
                            <IIIrdEvaluativeActivities />
                        </Private>
                    } />
                    <Route exact path="/$$$$th-activities" element={
                        <Private>
                            <IVthEvaluativeActivities />
                        </Private>
                    } />
                    
                    <Route exact path="/$num-quarter-grade" element={
                        <Private>
                            <NumQuarterGrade />
                        </Private>
                    } />
                    
                    <Route exact path="/$st-quarter-grade" element={
                        <Private>
                            <IstQuarterGrade />
                        </Private>
                    } />
                    <Route exact path="/$$nd-quarter-grade" element={
                        <Private>
                            <IIndQuarterGrade />
                        </Private>
                    } />
                    <Route exact path="/$$$rd-quarter-grade" element={
                        <Private>
                            <IIIrdQuarterGrade />
                        </Private>
                    } />
                    <Route exact path="/$$$$th-quarter-grade" element={
                        <Private>
                            <IVthQuarterGrade />
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

                    <Route exact path="/ist-numerical-grade-card" element={
                        <Private>
                            <IStNumericalGradeCard />
                        </Private>
                    } />
                    <Route exact path="/iind-numerical-grade-card" element={
                        <Private>
                            <IINdNumericalGradeCard />
                        </Private>
                    } />
                    <Route exact path="/iiird-numerical-grade-card" element={
                        <Private>
                            <IIIRdNumericalGradeCard />
                        </Private>
                    } />
                    <Route exact path="/ivth-numerical-grade-card" element={
                        <Private>
                            <IVThNumericalGradeCard />
                        </Private>
                    } />
                    <Route exact path="/final-numerical-grade-card" element={
                        <Private>
                            <FinalNumericalGradescard />
                        </Private>
                    } />

                    <Route exact path="/ist-quarter-report-card" element={
                        <Private>
                            <IStQuarterReportCard />
                        </Private>
                    } />
                    <Route exact path="/iind-quarter-report-card" element={
                        <Private>
                            <IINdQuarterReportCard />
                        </Private>
                    } />
                    <Route exact path="/iiird-quarter-report-card" element={
                        <Private>
                            <IIIRdQuarterReportCard />
                        </Private>
                    } />
                    <Route exact path="/ivth-quarter-report-card" element={
                        <Private>
                            <IVThQuarterReportCard />
                        </Private>
                    } />
                    <Route exact path="/vth-quarter-report-card" element={
                        <Private>
                            <VThQuarterReportCard />
                        </Private>
                    } />
                    <Route exact path="/vith-quarter-report-card" element={
                        <Private>
                            <VIThQuarterReportCard />
                        </Private>
                    } />
                    <Route exact path="/final-concepts-report-card" element={
                        <Private>
                            <FinalConceptscard />
                        </Private>
                    } />

                    <Route exact path="/Ist-allTheBulletins-grades/:idClass/:idBim" element={
                        <Private>
                            <IstBimAllTheBulletinsGrades />
                        </Private>
                    } />
                    <Route exact path="/IInd-allTheBulletins-grades/:idClass/:idBim" element={
                        <Private>
                            <IIndBimAllTheBulletinsGrades />
                        </Private>
                    } />
                    <Route exact path="/IIIrd-allTheBulletins-grades/:idClass/:idBim" element={
                        <Private>
                            <IIIrdBimAllTheBulletinsGrades />
                        </Private>
                    } />
                    <Route exact path="/IVth-allTheBulletins-grades/:idClass/:idBim" element={
                        <Private>
                            <IVthBimAllTheBulletinsGrades />
                        </Private>
                    } />
                    <Route exact path="/allTheFinalBulletins-grades/:idClass" element={
                        <Private>
                            <AllTheFinalBulletinsGrades />
                        </Private>
                    } />
                    
                    <Route exact path="/Ist-allTheBulletins-concept/:idClass/:idBim" element={
                        <Private>
                            <IstBimAllTheBulletinsConcept/>
                        </Private>
                    } />
                    <Route exact path="/IInd-allTheBulletins-concept/:idClass/:idBim" element={
                        <Private>
                            <IIndBimAllTheBulletinsConcept/>
                        </Private>
                    } />
                    <Route exact path="/IIIrd-allTheBulletins-concept/:idClass/:idBim" element={
                        <Private>
                            <IIIrdBimAllTheBulletinsConcept/>
                        </Private>
                    } />
                    <Route exact path="/IVth-allTheBulletins-concept/:idClass/:idBim" element={
                        <Private>
                            <IVthBimAllTheBulletinsConcept/>
                        </Private>
                    } />
                    <Route exact path="/allTheFinalBulletins-concept/:idClass" element={
                        <Private>
                            <AllTheFinalBulletinsConcept/>
                        </Private>
                    } />

                    <Route exact path="/record-class-taught" element={
                        <Private>
                            <RecordClassTaught />
                        </Private>
                    } />
                    <Route exact path="/classes" element={
                        <Private>
                            <Classes />
                        </Private>
                    } />
                    <Route exact path="/employee-already-registered" element={
                        <Private>
                            <EmployeeAlreadyRegistered />
                        </Private>
                    } />
                    <Route exact path="/manager-already-registered" element={
                        <Private>
                            <ManagerAlreadyRegistered />
                        </Private>
                    } />
                    <Route exact path="/individual-form" element={
                        <Private>
                            <IndividualForm />
                        </Private>
                    } />
                    <Route exact path="/form" element={
                        <Private>
                            <Form />
                        </Private>
                    } />
                    <Route exact path="/exist-form/:id_form" element={
                        <Private>
                            <ExistForm />
                        </Private>
                    } />
                    <Route exact path="/final-concepts" element={
                        <Private>
                            <GradeFinalConcepts />
                        </Private>
                    } />
                    <Route exact path="/daily" element={
                        <Private>
                            <Daily />
                        </Private>
                    } />
                    <Route exact path="/bimonthly-diary/:bimonthly/:idClass/:idBimonthly" element={
                        <Private>
                            <BimonthlyDiary/>
                        </Private>
                    } />
                    <Route exact path="/annual-diary/:idClass/:yearClass" element={
                        <Private>
                            <AnnualDiary/>
                        </Private>
                    } />

                    <Route exact path="/perfil-education-department/:id_employee" element={
                        <Private>
                            <PerfilEmployeeEducationDepartment />
                        </Private>
                    } />
                    <Route exact path="/perfil/:id_employee" element={
                        <Private>
                            <PerfilEmployee />
                        </Private>
                    } />

                    <Route exact path="/password-rest/:cpf/:id" element={
                        <Private>
                            <PasswordReset />
                        </Private>
                    } />
                    <Route exact path="/password-rest-emp-edu-dep/:cpf/:id" element={
                        <Private>
                            <PasswordResetEmpEduDep/>
                        </Private>
                    } />
                    
                    <Route exact path="/num-quarter-grade-daily" element={
                        <Private>
                            <NumQuarterGradeDaily/>
                        </Private>
                    } />
                    
                    <Route exact path="/printable-attendance-sheet" element={
                        <Private>
                            <PrintableAttendanceSheet/>
                        </Private>
                    } />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes