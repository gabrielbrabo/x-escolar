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

export const loginWithSchool = async (
    cpf,
    id_school
) => {
    return api.post('/login-with-school', {
        cpf,
        id_school
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

export const getSchoolsData = async (idSchools) => {
    return api.post('/index-school', {
        idSchools
    })
        .catch((error) => {
            if (error) {
                const result = JSON.stringify(error.response.data.message);
                alert(result);
                window.location.reload();
            }
        });
}


export const Refresh = async (
    id
) => {
    return api.post('/refresh/employee', {
        id
    })
        .catch((error) => {
            if (error) {
                /*const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)*/
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
    //totalGrade,
    //averageGrade,
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
        //totalGrade,
        ////averageGrade,
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
    //totalGrade,
    //averageGrade,
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
        //totalGrade,
        //averageGrade,
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
    //totalGrade,
    //averageGrade,
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
        //totalGrade,
        //averageGrade,
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
    //totalGrade,
    //averageGrade,
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
        //totalGrade,
        //averageGrade,
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
export const getVthQuarter = async (
    year,
    id_school
) => {

    return api.post(`/index/v_thQuarter`, {
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

export const RegisterVthQuarter = async (
    year,
    startday,
    startmonth,
    startyear,
    endday,
    endmonth,
    endyear,
    //totalGrade,
    //averageGrade,
    id_school
) => {

    return api.post(`/register/v_thQuarter`, {
        year,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        //totalGrade,
        //averageGrade,
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

export const getV_thQuarterDetails = async (
    idVthQuarter
) => {

    return api.get(`/details/vthQuarter/${idVthQuarter}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const UpdateVthQuarter = async (
    idVthQuarter,
    startday,
    startmonth,
    endday,
    endmonth,
    totalGrade,
    averageGrade
) => {

    return api.post(`/update/vthQuarter/${idVthQuarter}`, {
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
export const getVIthQuarter = async (
    year,
    id_school
) => {

    return api.post(`/index/vi_thQuarter`, {
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

export const RegisterVIthQuarter = async (
    year,
    startday,
    startmonth,
    startyear,
    endday,
    endmonth,
    endyear,
    //totalGrade,
    //averageGrade,
    id_school
) => {

    return api.post(`/register/vi_thQuarter`, {
        year,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        //totalGrade,
        //averageGrade,
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

export const getVI_thQuarterDetails = async (
    idVIthQuarter
) => {

    return api.get(`/details/vithQuarter/${idVIthQuarter}`)

        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
            }
        }, [])
}

export const UpdateVIthQuarter = async (
    idVIthQuarter,
    startday,
    startmonth,
    endday,
    endmonth,
    totalGrade,
    averageGrade
) => {

    return api.post(`/update/vithQuarter/${idVIthQuarter}`, {
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
    //totalGrade,
    //averageGrade,
    studentGrade,
    id_iStQuarter,
    id_student,
    id_teacher,
    id_matter,
    id_class
) => {

    return api.post(`/register/grade`, {
        year,
        bimonthly,
        //totalGrade,
        //averageGrade,
        studentGrade,
        id_iStQuarter,
        id_student,
        id_teacher,
        id_matter,
        id_class
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

export const GetGradeIstQuarter = async (
    year, id_matter, id_iStQuarter, id_class
) => {

    return api.post(`/index/gradei`, {
        year, id_matter, id_iStQuarter, id_class
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

export const RegisterGradeIIndQuarter = async (
    year,
    bimonthly,
    totalGrade,
    averageGrade,
    studentGrade,
    id_iiNdQuarter,
    id_student,
    id_teacher,
    id_matter,
    id_class
) => {

    return api.post(`/register/grade`, {
        year,
        bimonthly,
        totalGrade,
        averageGrade,
        studentGrade,
        id_iiNdQuarter,
        id_student,
        id_teacher,
        id_matter,
        id_class
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

export const GetGradeIINdQuarter = async (
    year, id_matter, id_iiNdQuarter, id_class
) => {

    return api.post(`/index/gradeii`, {
        year, id_matter, id_iiNdQuarter, id_class
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
export const RegisterGradeIIIrdQuarter = async (
    year,
    bimonthly,
    totalGrade,
    averageGrade,
    studentGrade,
    id_iiiRdQuarter,
    id_student,
    id_teacher,
    id_matter,
    id_class
) => {

    return api.post(`/register/grade`, {
        year,
        bimonthly,
        totalGrade,
        averageGrade,
        studentGrade,
        id_iiiRdQuarter,
        id_student,
        id_teacher,
        id_matter,
        id_class
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

export const GetGradeIIIrdQuarter = async (
    year, id_matter, id_iiiRdQuarter, id_class
) => {

    return api.post(`/index/gradeiii`, {
        year, id_matter, id_iiiRdQuarter, id_class
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
export const RegisterGradeIVthQuarter = async (
    year,
    bimonthly,
    totalGrade,
    averageGrade,
    studentGrade,
    id_ivThQuarter,
    id_student,
    id_teacher,
    id_matter,
    id_class
) => {

    return api.post(`/register/grade`, {
        year,
        bimonthly,
        totalGrade,
        averageGrade,
        studentGrade,
        id_ivThQuarter,
        id_student,
        id_teacher,
        id_matter,
        id_class
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

export const GetGradeIVthQuarter = async (
    year, id_matter, id_ivThQuarter, id_class
) => {

    return api.post(`/index/gradeiv`, {
        year, id_matter, id_ivThQuarter, id_class
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
export const RegisterGradeVthQuarter = async (
    year,
    bimonthly,
    totalGrade,
    averageGrade,
    studentGrade,
    id_vThQuarter,
    id_student,
    id_teacher,
    id_matter,
    id_class
) => {

    return api.post(`/register/grade`, {
        year,
        bimonthly,
        totalGrade,
        averageGrade,
        studentGrade,
        id_vThQuarter,
        id_student,
        id_teacher,
        id_matter,
        id_class
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

export const GetGradeVthQuarter = async (
    year, id_matter, id_vThQuarter, id_class
) => {

    return api.post(`/index/gradev`, {
        year, id_matter, id_vThQuarter, id_class
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
export const RegisterGradeVIthQuarter = async (
    year,
    bimonthly,
    totalGrade,
    averageGrade,
    studentGrade,
    id_viThQuarter,
    id_student,
    id_teacher,
    id_matter,
    id_class
) => {

    return api.post(`/register/grade`, {
        year,
        bimonthly,
        totalGrade,
        averageGrade,
        studentGrade,
        id_viThQuarter,
        id_student,
        id_teacher,
        id_matter,
        id_class
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

export const GetGradeVIthQuarter = async (
    year, id_matter, id_viThQuarter, id_class
) => {

    return api.post(`/index/gradevi`, {
        year, id_matter, id_viThQuarter, id_class
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

export const GetGrades = async (
    year, bimonthly, id_student
) => {

    return api.post(`/get-grade`, {
        year, bimonthly, id_student
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
export const updateGrade = async (
    update_id_grade,
    update_studentGrade
) => {

    return api.post(`/update/grade`, {
        update_id_grade,
        update_studentGrade
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
    //cpf,
    //rg,
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
        //cpf,
        //rg,
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

export const GetMatterDetails = async (
    idMatter
) => {

    return api.get(`/getMatter/${idMatter}`)

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
    //id_matter
) => {

    return api.post(`/add/teacher`, {
        id_employee,
        id_class,
        //id_matter
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
    id_employee
) => {

    return api.post(`/employee/info/${id_employee}`)

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
    //id_matter,
    //addTeacher
) => {

    return api.post(`/remove/teacher`, {
        id_teacher,
        id_class,
        //id_matter,
        //addTeacher
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
) => {

    return api.post(`/attendance/index`, {
        year,
        month,
        id_student,
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
) => {

    return api.post(`/search/frequency`, {
        month,
        year,
        day,
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
export const Attendance = async (
    day,
    month,
    year,
    status,
    id_student,
    id_teacher,
    id_class,
) => {

    return api.post(`/attendance`, {
        day,
        month,
        year,
        status,
        id_student,
        id_teacher,
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

export const AttendanceBimonthly = async (
    startd, startm, starty, endd, endm, endy, id_student
) => {

    return api.post(`/attendance-bimonthly`, {
        startd, startm, starty, endd, endm, endy, id_student
    })
}

export const RecordClassTaught = async (
    day, month, year, description, id_teacher, id_class
) => {

    return api.post(`/record-class-taught`, {
        day, month, year, description, id_teacher, id_class
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

export const indexRecordClassTaught = async (
    year,
    id_class
) => {

    return api.post(`/index-record-class`, {
        year,
        id_class
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

export const updateRecordClassTaught = async (
    editedDescription, day, month, editingId
) => {

    return api.post(`/update-record-class`, {
        editedDescription, day, month, editingId
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

export const updateRecordClassTaughtADM = async (
    editedDescription, editingId
) => {

    return api.post(`/update-record-class/adm`, {
        editedDescription, editingId
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
export const checkEmployee = async (
    cpf
) => {

    return api.get(`/check-employee/${cpf}`)
        .catch((error) => {
            if (error) {
                /*const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)*/
                // window.location.reload()
            }
        }, [])
}

export const checkEmployeeteste = async (cpf) => {
    try {
        const response = await api.get(`/check-employee/${cpf}`);
        return response.data; // Retorna os dados da resposta se a API for chamada com sucesso
    } catch (error) {
        if (error.response) {
            const result = JSON.stringify(error.response.data.msg);
            alert(result);
        } else {
            alert("Erro ao verificar o funcionário."); // Alerta genérico para outros tipos de erro
        }
        return null; // Retorna null ou algum valor padrão em caso de erro
    }
};

export const IndexIndividualForm = async ({
    year,
    id_class,
    id_iStQuarter,
    id_iiNdQuarter,
    id_iiiRdQuarter,
    id_ivThQuarter,
    id_vThQuarter,
    id_viThQuarter,
}) => {
    try {
        // Faz a chamada para a rota com os parâmetros opcionais
        const response = await api.post('/index-individual-form', {
            year,
            id_class,
            id_iStQuarter,
            id_iiNdQuarter,
            id_iiiRdQuarter,
            id_ivThQuarter,
            id_vThQuarter,
            id_viThQuarter,
        });

        return response.data;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
};

export const createIndividualForm = async ({
    year,
    id_class,
    description,
    id_student,
    id_teacher,
    id_iStQuarter,
    id_iiNdQuarter,
    id_iiiRdQuarter,
    id_ivThQuarter,
    id_vThQuarter,
    id_viThQuarter,
}) => {
    try {
        // Faz a chamada para a rota com os parâmetros opcionais
        const response = await api.post('/create-individual-form', {
            year,
            id_class,
            description,
            id_student,
            id_teacher,
            id_iStQuarter,
            id_iiNdQuarter,
            id_iiiRdQuarter,
            id_ivThQuarter,
            id_vThQuarter,
            id_viThQuarter,
        });

        return response.data;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
};

export const GetIndividualForm = async ({
    id_individualForm
}) => {
    try {
        // Faz a chamada para a rota com os parâmetros opcionais
        return api.get(`/get-individual-form/${id_individualForm}`);
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
};

export const FormEdit = async ({
    update_idForm, editedDescription
}) => {
    // Faz a chamada para a rota com os parâmetros opcionais
    return api.post(`/form-edit`, {
        update_idForm, editedDescription
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
};

export const FinalConcepts = async (year, studentGrade, id_matter, id_employee, id_student, id_class) => {
    return api
        .post(`/register/final-concepts`, { year, studentGrade, id_matter, id_employee, id_student, id_class })
        .catch((error) => {
            if (error.response) {
                console.error("Erro na API:", error.response.data.msg);
                alert(error.response.data.msg);
            }
        });
};

export const GetGradeFinalConcepts = async (
    year, id_matter
) => {
    // Faz a chamada para a rota com os parâmetros opcionais
    return api.post(`/get/final-concepts`, {
        year, id_matter
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
};

export const FinalConceptsEdit = async (
    update_id_grade, update_studentGrade
) => {
    // Faz a chamada para a rota com os parâmetros opcionais
    return api.post(`/update/final-concepts`, {
        update_id_grade, update_studentGrade
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
};

export const getFinalConcepts = async (
    year, id_student
) => {
    // Faz a chamada para a rota com os parâmetros opcionais
    return api.post(`/get/card-final-concepts`, {
        year, id_student
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
};

export const AttendanceFinalConcepts = async (
    year, id_student
) => {
    // Faz a chamada para a rota com os parâmetros opcionais
    return api.post(`/attendance-final-concepts`, {
        year, id_student
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
};

export const AttendanceByTeacherAndClass = async (
    year, id_teacher, id_class, startd, startm, starty, endd, endm, endy
) => {
    // Faz a chamada para a rota com os parâmetros opcionais
    return api.post(`/Attendance-by-teacher-class`, {
        year, id_teacher, id_class, startd, startm, starty, endd, endm, endy
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
};

export const IndexGradeDaily = async (
    year,
    id_class,
    id_iStQuarter,
    id_iiNdQuarter,
    id_iiiRdQuarter,
    id_ivThQuarter,
    id_vThQuarter,
    id_viThQuarter,
) => {
    // Faz a chamada para a rota com os parâmetros opcionais
    return api.post(`/grade-daily`, {
        year,
        id_class,
        id_iStQuarter,
        id_iiNdQuarter,
        id_iiiRdQuarter,
        id_ivThQuarter,
        id_vThQuarter,
        id_viThQuarter,
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
};

export const RecordClassTaughtDaily = async (
    year, id_teacher, id_class, startd, startm, starty, endd, endm, endy
) => {
    // Faz a chamada para a rota com os parâmetros opcionais
    return api.post(`/record-class-daily`, {
        year, id_teacher, id_class, startd, startm, starty, endd, endm, endy
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
};

export const FinalConceptsDaily = async (
    year, id_class
) => {
    // Faz a chamada para a rota com os parâmetros opcionais
    return api.post(`/final-concepts/daily`,
        year, id_class
    )
        .catch((error) => {
            if (error) {
                const result = JSON.stringify(
                    error.response.data.msg
                )
                alert(result)
                // window.location.reload()
            }
        }, [])
};

export const ResetPassword = async (
    cpf, id, token, newPassword
) => {
    // Faz a chamada para a rota com os parâmetros opcionais
    return api.post(`/reset-password`, {
        cpf, id, token, newPassword
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
};

export const ForgotPassword = async (
    cpf
) => {
    // Faz a chamada para a rota com os parâmetros opcionais
    return api.post(`/forgot-password`, {
        cpf
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
};

export const indexGrades = async (
    year, id_class, id_matter
) => {
    // Faz a chamada para a rota com os parâmetros opcionais
    return api.post(`/grades`, {
        year, id_class,id_matter
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
};

/*export const getavatar = async () => {

    return api.get('/avatar')

}*/