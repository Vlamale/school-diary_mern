import {$host, $authHost} from './index'
import {ISubjectsData} from '../types/subjectsTypes'

export const getAllSubjects = async (): Promise<ISubjectsData[]> => {
    const {data} = await $host.get<ISubjectsData[]>('api/subject/')
    localStorage.setItem('subjects', JSON.stringify(data))
    return data
}

export const createSubject = async (subjectData: string): Promise<ISubjectsData> => {
    const {data} = await $authHost.post<ISubjectsData>('api/subject/', {subjectData})
    return data
}