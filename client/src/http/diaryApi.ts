import { IDiaryAddMarkResponse, IDiaryGetMarkResponse, IMarkCreateData, IMarkData } from "../types/diaryTypes"
import { $host, $authHost } from "./index"

export const getUserMarks = async (id: string): Promise<IMarkData[]> => {
    const { data } = await $host.get<IDiaryGetMarkResponse>('api/diary/' + id)
    return data.marks
}

export const getSubjectMarks = async (subjectId: string): Promise<IMarkData[]> => {
    const { data } = await $host.get<IDiaryGetMarkResponse>('api/diary/?subjectId=' + subjectId)
    return data.marks
}

export const getClassromMarks = async (classroomNumber: string, classroomLetter: string): Promise<IMarkData[]> => {
    const {data} = await $host
        .get<IDiaryGetMarkResponse>(`api/diary/classroom?classroomNumber=${classroomNumber}&classroomLetter=${classroomLetter}`)
    return data.marks
}

export const addMark = async (markData: IMarkCreateData): Promise<IMarkData> => {
    const {data} = await $authHost.post<IDiaryAddMarkResponse>('api/diary/', markData)
    return data.createdMark
}