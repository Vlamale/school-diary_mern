import {$host, $authHost} from './index'

export const getAllSchool = async () => {
    const {data} = await $host.get('api/school/')
    return data
}

export const createSchool = async (schoolData) => {
    const response = await $authHost.post('api/school/', {schoolData})
    return response
}