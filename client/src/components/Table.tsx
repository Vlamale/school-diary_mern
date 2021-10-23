import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserMarks } from '../http/diaryApi'
import { getDateInterval } from '../utils/utils'
import { ITableProps } from '../types/tableTypes'
import { ISubjectsData } from '../types/subjectsTypes'
import { IInitialState } from '../redux/types'
import { EffectCallback } from '../types/commonTypes'
import { IMarkData } from '../types/diaryTypes'

const Table: React.FC<ITableProps> = ({ dateInterval, subjectId, otherUserId }) => {
    const [subjects, setSubjects] = useState<ISubjectsData[]>([])
    const [marks, setMarks] = useState<IMarkData[]>([])
    const { isAuth, subjectsData, userData } = useSelector((state: IInitialState) => state)
    const dateArray = getDateInterval(dateInterval.startDate, dateInterval.endDate)

    useEffect((): ReturnType<EffectCallback> => {
        let cleanupFunction = false
        if (isAuth) {
            if (!cleanupFunction) {
                const setData = async () => {
                    let data: IMarkData[]
                    if (!subjectId) {
                        otherUserId ?
                            data = await getUserMarks(otherUserId) :
                            data = await getUserMarks(userData?._id || '')
                        setSubjects(subjectsData)
                    } else {
                        data = await getUserMarks(userData?._id || '')
                        const subjectData = subjectsData.filter(subj => subj._id === subjectId._id)
                        setSubjects(subjectData)
                    }
                    setMarks(data)
                }
                setData()

            }
        }
        return () => { cleanupFunction = true }
    }, [])

    return (
        <div className="content__table">
            <table>
                <tbody>
                    <tr>
                        <td>&nbsp;</td>
                        {dateArray.map(date => (<td key={date}>{date.split('-')[2] + '.' + date.split('-')[1]}</td>))}
                    </tr>

                    {subjects.map(({ subjectName, _id }) => (
                        <tr key={_id}>
                            <td key={subjectName}>{subjectName}</td>
                            {dateArray.map(date => {
                                const markInThisDay = marks.find((m) => m.createdAt.split('T')[0] === date && m.subjectId === _id)

                                return (
                                    <td key={date}>{
                                        markInThisDay ?
                                            markInThisDay.mark :
                                            ''
                                    }</td>
                                )
                            })}
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Table