import { $host } from "./index"

export const getUserMarks = async (id) => {
    const {data} = await $host.get('api/diary/' + id)
    return data.marks
}

export const getSubjectMarks = async (subjectId) => {
    const {data} = await $host.get('api/diary/?subjectId=' + subjectId)
    return data.marks
}

export const getClassromMarks = async () => {
    const response = await $host.get('api/diary/')
    return response
}

export const addMark = async (markData) => {
    const response = await $host.post('api/diary/', {markData})
    return response
}