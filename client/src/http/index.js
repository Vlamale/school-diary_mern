import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $authHost,
    $host
}