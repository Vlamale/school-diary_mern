import { IClassroom } from '../types/classroomsTypes'
import { $host } from './index'

export const getAllClassrooms = async (): Promise<IClassroom[]> => {
    const {data} = await $host.get<Promise<IClassroom[]>>('api/classroom/')
    return data
}