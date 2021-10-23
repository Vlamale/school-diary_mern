import axios, { AxiosRequestConfig } from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

const authInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem('token')
    config.headers.authorization = `Bearer ${JSON.parse(token || '')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $authHost,
    $host
}