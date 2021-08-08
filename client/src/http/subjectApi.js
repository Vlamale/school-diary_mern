import {$host, $authHost} from './index'

export const getAllSubjects = async () => {
    const {data} = await $host.get('api/subject/')
    localStorage.setItem('subjects', JSON.stringify(data))
    return data
}

export const createSubject = async (subjectData) => {
    const response = await $authHost.post('api/subject/', {subjectData})
    return response
}