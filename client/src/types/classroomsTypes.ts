export interface IClassroomsProps {
    classrooms: IClassroom[]
}

export interface IClassroom {
    _id: string
    classroomNumber: number
    classroomLetter: string
    schoolId: string
}

