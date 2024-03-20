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

/*export const getavatar = async () => {

    return api.get('/avatar')

}*/