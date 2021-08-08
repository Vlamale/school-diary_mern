import {$host, $authHost} from './index'
import jwt_decode from "jwt-decode"

export const registration = async (userData) => {
    const {data} = await $authHost.post('api/user/registration/', userData)
    return data
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login/', {email, password})
    const decode = jwt_decode(data.token)
    localStorage.setItem('user-data', JSON.stringify(decode))
    localStorage.setItem('token', JSON.stringify(data.token))
    return decode
}

export const changeClassN = async (letter) => {
    const response = await $authHost.post('api/user/changeclassn/', {letter})
    return response
}

export const changeClassL = async (letter) => {
    const response = await $authHost.post('api/user/changeclassl/', {letter})
    return response
}

export const checkUser = async () => {
    const response = await $host.get('api/user/auth/')
    return response
}