export const CONFIG = {
    MAIN_API_ENDPOINT: 'http://localhost:9000'
}

export const mainAPIHeaderOptions = () => ({
    baseURL: CONFIG.MAIN_API_ENDPOINT,
    headers : {
        'x-token' : localStorage.getItem('token')
    }
})

export const mainAPIHeaderUpload = () => ({
    baseURL: CONFIG.MAIN_API_ENDPOINT,
    headers: {
        'Content-Type': 'multipart/form-data',
        'x-token' : localStorage.getItem('token')
    },  
})

export const mainAPIOptions = () => ({
    baseURL: CONFIG.MAIN_API_ENDPOINT
})
