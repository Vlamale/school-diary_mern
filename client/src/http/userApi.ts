import { $host, $authHost } from './index'
import jwt_decode from "jwt-decode"
import { IAuthResponse, IUserCreateData, IUserData } from '../types/userTypes'

export const registration = async (userData: IUserCreateData): Promise<IAuthResponse> => {
    const {data} = await $authHost.post<IAuthResponse>('api/user/registration/', userData)
    return data
}

export const login = async (email: string, password: string): Promise<IUserData> => {
    const {data} = await $host.post<IAuthResponse>('api/user/login/', {email, password})
    const decode = jwt_decode<IUserData>(data.token)
    localStorage.setItem('user-data', JSON.stringify(decode))
    localStorage.setItem('token', JSON.stringify(data.token))
    return decode
}

// export const changeClassN = async (number: number) => {
//     const response = await $authHost.post('api/user/changeclassn/', {number})
//     return response
// }

// export const changeClassL = async (letter: string) => {
//     const response = await $authHost.post('api/user/changeclassl/', {letter})
//     return response
// }

export const checkUser = async () => {
    const response = await $host.get('api/user/auth/')
    return response
}

export const getUsersByRole = async (role: string): Promise<IUserData[]> => {
    const {data} = await $host.get<IUserData[]>(`api/user/all-users/?role=${role}`)
    return data
}

export const getUserById = async (id: number): Promise<IUserData> => {
    const {data} = await $host.get<IUserData>(`api/user/user-${id}`)
    return data
}

export const getUserByClassroom = async (id: string): Promise<IUserData[]> => {
    const {data} = await $host.get<IUserData[]>(`api/user/classroom-${id}`)
    return data
}

export const deleteUser = async (id: number): Promise<string> => {
    const {data} = await $authHost.get<string>(`api/user/delete-user-${id}`)
    return data
}