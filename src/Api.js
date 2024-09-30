import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const registerSchool = async (
    name,
    email,
    password,
    confirmpassword
) => {
    return api.post('/register/school', {
        name,
        email,
        password,
        confirmpassword
    })
        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                window.location.reload()
                alert(result)
            }
        }, [])
}

export const createSessionSchool = async (
    email,
    password
) => {
    return api.post('/session/school', {
        email,
        password
    })
        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const createSessionEmployee = async (
    cpf,
    password
) => {
    return api.post('/session/employee', {
        cpf,
        password
    })
        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                window.location.reload()
            }
        }, [])
}

export const Refresh = async (
    id
) => {
    return api.post('/refresh/employee', {
        id
    })
        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                window.location.reload()
            }
        }, [])
}

export const NameSchool = async (
    idSchool
) => {
    return api.post('/school/index', {
        idSchool
    })
        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const GetEmployees = async (
    idSchool
) => {

    return api.post('/employee', {
        idSchool
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const getEmployeeDetails = async (
    idEmployee
) => {

    return api.get(`/employee-details/${idEmployee}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const updateEmployee = async (
    idEmployee,
    name,
    dateOfBirth,
    cpf,
    rg,
    email,
    cellPhone,
    address,
    position_at_school
) => {

    return api.post(`/employee-update/${idEmployee}`, {
        name,
        dateOfBirth,
        cpf,
        rg,
        email,
        cellPhone,
        address,
        position_at_school
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const getStudentDetails = async (
    idStudent
) => {

    return api.get(`/student-details/${idStudent}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const updateStudent = async (
    idStudent,
    name,
    dateOfBirth,
    cpf,
    rg,
    email,
    cellPhone,
    address,
) => {

    return api.post(`/student-update/${idStudent}`, {
        name,
        dateOfBirth,
        cpf,
        rg,
        email,
        cellPhone,
        address,
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const getClassDetails = async (
    idClass
) => {

    return api.get(`/class-details/${idClass}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const updateClass = async (
    cla$$,
    serie,
    level,
    shift,
    classroom_number,
) => {

    return api.post(`/class-update/${cla$$}`, {
        serie,
        level,
        shift,
        classroom_number
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const NewEmp = async (
    idSchool,
    name,
    dateOfBirth,
    cpf,
    rg,
    email,
    cellPhone,
    address,
    position_at_school,
    password,
    confirmpassword
) => {

    return api.post(`/register/employee/${idSchool}`, {
        idSchool,
        name,
        dateOfBirth,
        cpf,
        rg,
        email,
        cellPhone,
        address,
        position_at_school,
        password,
        confirmpassword
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const getIstQuarter = async (
    year,
    id_school
) => {

    return api.post(`/index/istQuarter`, {
        year,
        id_school
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const RegisterIstQuarter = async (
    year,
    startday,
    startmonth,
    startyear,
    endday,
    endmonth,
    endyear,
    totalGrade,
    averageGrade,
    id_school
) => {

    return api.post(`/register/istQuarter`, {
        year,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        totalGrade,
        averageGrade,
        id_school
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const getI_stQuarterDetails = async (
    idIstQuarter
) => {

    return api.get(`/details/istQuarter/${idIstQuarter}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const UpdateIstQuarter = async (
    id_IstQuarter,
    startday,
    startmonth,
    endday,
    endmonth,
    totalGrade,
    averageGrade
) => {

    return api.post(`/update/istQuarter/${id_IstQuarter}`, {
        startday,
        startmonth,
        endday,
        endmonth,
        totalGrade,
        averageGrade
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const getIIndQuarter = async (
    year,
    id_school
) => {

    return api.post(`/index/iindQuarter`, {
        year,
        id_school
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const RegisterIIndQuarter = async (
    year,
    startday,
    startmonth,
    startyear,
    endday,
    endmonth,
    endyear,
    totalGrade,
    averageGrade,
    id_school
) => {

    return api.post(`/register/iindQuarter`, {
        year,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        totalGrade,
        averageGrade,
        id_school
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const getII_ndQuarterDetails = async (
    idIstQuarter
) => {

    return api.get(`/details/iindQuarter/${idIstQuarter}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const UpdateIIndQuarter = async (
    id_IstQuarter,
    startday,
    startmonth,
    endday,
    endmonth,
    totalGrade,
    averageGrade
) => {

    return api.post(`/update/iindQuarter/${id_IstQuarter}`, {
        startday,
        startmonth,
        endday,
        endmonth,
        totalGrade,
        averageGrade
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const getIIIrdQuarter = async (
    year,
    id_school
) => {

    return api.post(`/index/iii_rdQuarter`, {
        year,
        id_school
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const RegisterIIIrdQuarter = async (
    year,
    startday,
    startmonth,
    startyear,
    endday,
    endmonth,
    endyear,
    totalGrade,
    averageGrade,
    id_school
) => {

    return api.post(`/register/iii_rdQuarter`, {
        year,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        totalGrade,
        averageGrade,
        id_school
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const getIII_rdQuarterDetails = async (
    idIstQuarter
) => {

    return api.get(`/details/iiirdQuarter/${idIstQuarter}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const UpdateIIIrdQuarter = async (
    id_IstQuarter,
    startday,
    startmonth,
    endday,
    endmonth,
    totalGrade,
    averageGrade
) => {

    return api.post(`/update/iiirdQuarter/${id_IstQuarter}`, {
        startday,
        startmonth,
        endday,
        endmonth,
        totalGrade,
        averageGrade
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const getIVthQuarter = async (
    year,
    id_school
) => {

    return api.post(`/index/iv_thQuarter`, {
        year,
        id_school
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const RegisterIVthQuarter = async (
    year,
    startday,
    startmonth,
    startyear,
    endday,
    endmonth,
    endyear,
    totalGrade,
    averageGrade,
    id_school
) => {

    return api.post(`/register/iv_thQuarter`, {
        year,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        totalGrade,
        averageGrade,
        id_school
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const getIV_thQuarterDetails = async (
    idIstQuarter
) => {

    return api.get(`/details/ivthQuarter/${idIstQuarter}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const UpdateIVthQuarter = async (
    id_IstQuarter,
    startday,
    startmonth,
    endday,
    endmonth,
    totalGrade,
    averageGrade
) => {

    return api.post(`/update/ivthQuarter/${id_IstQuarter}`, {
        startday,
        startmonth,
        endday,
        endmonth,
        totalGrade,
        averageGrade
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const RegisterGradeIstQuarter = async (
    year,
    bimonthly,
    totalGrade,
    averageGrade,
    studentGrade,
    status,
    id_iStQuarter,
    id_student,
    id_teacher,
    id_matter
) => {

    return api.post(`/register/grade`, {
        year,
        bimonthly,
        totalGrade,
        averageGrade,
        studentGrade,
        status,
        id_iStQuarter,
        id_student,
        id_teacher,
        id_matter
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const DestroyEmp = async (
    idEmployee,
) => {

    return api.post(`/destroy-employee/${idEmployee}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const DestroyStudent = async (
    idStudent,
) => {

    return api.post(`/destroy-student/${idStudent}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const GetStudent = async (
    idSchool
) => {

    return api.post('/student', {
        idSchool
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const NewStdt = async (
    idSchool,
    name,
    dateOfBirth,
    cpf,
    rg,
    cellPhone,
    cellPhoneOfParentsOrGuardians,
    address,
    registerStudent,
    password,
    confirmpassword
) => {

    return api.post(`/register/student/${idSchool}`, {
        name,
        dateOfBirth,
        cpf,
        rg,
        cellPhone,
        cellPhoneOfParentsOrGuardians,
        address,
        registerStudent,
        password,
        confirmpassword
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)

            }
        }, [])
}

export const NewClss = async (
    idSchool,
    year,
    serie,
    level,
    shift,
    classroom_number
) => {

    return api.post(`/register/class/${idSchool}`, {
        year,
        serie,
        level,
        shift,
        classroom_number
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)

            }
        }, [])
}

export const GetClass = async (
    idSchool
) => {

    return api.post('/class', {
        idSchool
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)

            }
        }, [])
}

export const GetMatter = async (
    idSchool
) => {

    return api.post('/matter', {
        idSchool
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)

            }
        }, [])
}

export const NewMttr = async (
    idSchool,
    name
) => {

    return api.post(`/register/matter/${idSchool}`, {
        name
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)

            }
        }, [])
}

export const addMttr = async (
    id_employee,
    id_matter
) => {

    return api.post(`/add/matter`, {
        id_employee,
        id_matter
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const addStdt = async (
    id_student,
    id_class
) => {

    return api.post(`/add/student`, {
        id_student,
        id_class
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                window.location.reload()
            }
        }, [])
}

export const addTchr = async (
    id_employee,
    id_class,
    id_matter
) => {

    return api.post(`/add/teacher`, {
        id_employee,
        id_class,
        id_matter
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const StdtInfo = async (
    id_student
) => {

    return api.post(`/student/info/${id_student}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)

            }
        }, [])
}

export const EmpInfo = async (
    id_student
) => {

    return api.post(`/employee/info/${id_student}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)

            }
        }, [])
}

export const clssInfo = async (
    id_class
) => {

    return api.post(`/class/info/${id_class}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)

            }
        }, [])
}

export const removeTeacher = async (
    id_teacher,
    id_class,
    id_matter,
    addTeacher
) => {

    return api.post(`/remove/teacher`, {
        id_teacher,
        id_class,
        id_matter,
        addTeacher
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const removeStudent = async (
    id_student,
    id_class,
) => {

    return api.post(`/remove/student`, {
        id_student,
        id_class,
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const removeMatter = async (
    id_matter,
    id_employee,
) => {

    return api.post(`/remove/matter`, {
        id_matter,
        id_employee,
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const deleteMatter = async (
    id_matter
) => {

    return api.post(`/delete/matter`, {
        id_matter
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const GetInfoMyClass = async (
    id_class,
    id_teacher
) => {

    return api.post(`/myclass`, {
        id_class,
        id_teacher
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}
export const GetAttendance = async (
    year,
    month,
    id_student,
    id_matter
) => {

    return api.post(`/attendance/index`, {
        year,
        month,
        id_student,
        id_matter
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}

export const GetAttendanceFinalized = async (
    month,
    year,
    day,
    id_class,
    id_matter
) => {

    return api.post(`/search/frequency`, {
        month,
        year,
        day,
        id_class,
        id_matter
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}
export const Attendance = async (
    day,
    month,
    year,
    status,
    id_student,
    id_teacher,
    id_class,
    id_matter
) => {

    return api.post(`/attendance`, {
        day,
        month,
        year,
        status,
        id_student,
        id_teacher,
        id_class,
        id_matter
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}
export const updateAttendance = async (
    update_attendance,
    update_status
) => {

    return api.post(`/update/frequency`, {
        update_attendance,
        update_status
    })

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
}


/*export const getavatar = async () => {

    return api.get('/avatar')

}*/