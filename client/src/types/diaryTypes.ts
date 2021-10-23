export interface IDiaryGetMarkResponse {
    marks: IMarkData[]
}

export interface IDiaryAddMarkResponse {
    createdMark: IMarkData
}

export interface IMarkData {
    _id: string
    classroomId: string
    classroomLetter: string
    classroomNumber: number
    createdAt: string
    mark: number
    subjectId: string
    userId: string
}

export interface IMarkCreateData {
    mark: number,
    userId: string,
    subjectId: string
}