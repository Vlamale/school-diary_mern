import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getUserByClassroom } from '../http/userApi'

const UsersByClassroomPage = ({ match }) => {
    const [users, setUsers] = useState([])
    const id = match.url.split('-')[1]

    useEffect(() => {
        let cleanupFunction = false
        if (!cleanupFunction) {
            const setData = async () => {
                const data = await getUserByClassroom(id)
                setUsers(data)
            }
            setData()
        }
        return () => cleanupFunction = true
    }, [])

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <h3 className="user-blocks__title title">Список учеников:</h3>
                {users.length > 0 &&
                    <ul className="user-blocks">
                        {users.map((user, id) => (
                            <li className="user-block" key={user._id}>
                                <Link
                                    className="user-link"
                                    to={'user-' + user._id}
                                >{id + 1}. {user.surName} {user.firstName} {user.middleName}
                                </Link>
                            </li>
                        ))}
                    </ul>}
                {!users.length &&
                    <p>В данном классе нет учеников.</p>}
            </div>
        </div>
    )

}

export default UsersByClassroomPage