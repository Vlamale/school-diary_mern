import { ISchool } from '../types/schoolTypes'
import {$host, $authHost} from './index'

export const getAllSchool = async (): Promise<ISchool[]> => {
    const {data} = await $host.get<ISchool[]>('api/school/')
    return data
}

export const createSchool = async (schoolData: string): Promise<ISchool> => {
    const {data} = await $authHost.post<ISchool>('api/school/', {schoolData})
    return data
}