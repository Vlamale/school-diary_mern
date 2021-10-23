import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getUsersByRole } from '../http/userApi'
import { EffectCallback } from '../types/commonTypes'
import { IUserData } from '../types/userTypes'

const UsersByRolePage: React.FC<any> = ({ match }) => {
    const [users, setUsers] = useState<IUserData[]>([])
    const role: string = match.path.split('-')[1].toUpperCase()

    useEffect((): ReturnType<EffectCallback> => {
        let cleanupFunction = false
        if (!cleanupFunction) {
            const setData = async () => {
                const data = await getUsersByRole(role)
                setUsers(data)
            }
            setData()
        }
        return () => {cleanupFunction = true}
    }, [role])

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <h3 className="user-blocks__title title">Список пользователей:</h3>
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
                </ul>
            </div>
        </div>
    )

}

export default UsersByRolePage