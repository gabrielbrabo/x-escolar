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

export const NewEmp = async ( 
    idSchool,
    name, 
    cpf,
    position_at_school,
    password, 
    confirmpassword
) => {
    
    return api.post(`/register/employee/${idSchool}`, {
        name, 
        cpf,
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
    rg,
    registerStudent,
    password, 
    confirmpassword
) => {
    
    return api.post(`/register/student/${idSchool}`, {
        name, 
        rg,
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

/*export const getavatar = async () => {

    return api.get('/avatar')

}*/