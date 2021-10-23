export interface IAuthResponse {
    token: string
}

export interface IUserData {
    email: string
    firstName: string
    middleName: string
    surName: string
    role: string
    subjectName?: string
    _id?: string
}

export interface IUserCreateData {
    email: string
    password: string
    firstName: string
    surName: string
    middleName: string
    role: string
    classroomNumber?: number
    classroomLetter?: string
    classroomId?: string | undefined
    subjectId?: string | undefined
    subjectName?: string | undefined
}

export interface IPupleAdditions {
    classroomNumber: number
    classroomLetter: string
    classroomId: string | undefined
}

export interface ITeacherAddition {
    subjectId: string | undefined
    subjectName: string | undefined
}

export interface IUserDataCompProps {
    userData: IUserData
}