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
            window.location.reload()
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
            window.location.reload()
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
            window.location.reload()
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
            window.location.reload()
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
            window.location.reload()
        }
    }, [])
}

/*export const getavatar = async () => {

    return api.get('/avatar')

}*/