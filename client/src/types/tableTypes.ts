export interface ITableProps {
    dateInterval: IDateInterval
    subjectId?: any
    otherUserId?: string
}

interface IDateInterval {
    startDate: string
    endDate: string
}