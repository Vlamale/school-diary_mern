import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getAllClassrooms } from '../http/classroomApi'
import { EffectCallback } from '../types/commonTypes'
import { IClassroom } from '../types/classroomsTypes'

const AllClassroomsPage: React.FC = () => {
    const [classrooms, setClassrooms] = useState<IClassroom[]>([])

    useEffect((): ReturnType<EffectCallback> => {
        let cleanupFunction = false
        if (!cleanupFunction) {
            const setData = async () => {
                const classroomsData = await getAllClassrooms()
                setClassrooms(classroomsData)
            }
            setData()
        }
        return () => { cleanupFunction = true }
    }, [])

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <h3 className="user-blocks__title title">Выберите класс пользователя</h3>
                <ul className="user-blocks">
                    {classrooms.sort((a, b) => a.classroomNumber - b.classroomNumber).map(cl => (
                        <li className="user-block" key={cl._id}>
                            <Link className="user-link" to={`classroom-${cl._id}`}>{cl.classroomNumber} "{cl.classroomLetter}"</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AllClassroomsPage