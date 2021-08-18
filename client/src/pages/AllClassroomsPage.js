import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getAllClassrooms } from '../http/classroomApi'

const AllClassroomsPage = () => {
    const [classrooms, setClassrooms] = useState([])
    useEffect(() => {
        let cleanupFunction = false
        if (!cleanupFunction) {
            const setData = async () => {
                const classroomsData = await getAllClassrooms()
                setClassrooms(classroomsData)
            }
            setData()
        }
        return () => cleanupFunction = true
    }, [])
    console.log(classrooms.sort((a, b) => a.classroomNumber - b.classroomNumber))
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