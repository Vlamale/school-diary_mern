import {$host, $authHost} from './index'

export const getAllSchool = async () => {
    const {data} = await $host.get('api/school/')
    console.log(data)
    return data
}

export const createSchool = async (schoolData) => {
    const response = await $authHost.post('api/school/', {schoolData})
    return response
}