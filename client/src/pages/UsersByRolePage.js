import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getUsersByRole } from '../http/userApi'

const UsersByRolePage = ({ match }) => {
    const [users, setUsers] = useState([])
    const role = match.path.split('-')[0].slice(1).toUpperCase()

    useEffect(() => {
        let cleanupFunction = false
        if (!cleanupFunction) {
            const setData = async () => {
                const data = await getUsersByRole(role)
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
                <h3 className="user-blocks__title title">{role}</h3>
                <ul className="user-blocks">
                    {users.map((user, id) => (
                        <li className="user-block"  key={user._id}>
                            <Link className="user-link" to={'user-' + user._id} >{id + 1}. {user.surName} {user.firstName} {user.middleName}</Link>
                            {/* реализовать переходы по ссылкам пользователей */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default UsersByRolePage