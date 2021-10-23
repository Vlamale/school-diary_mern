import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
    ALL_ADMINS,
    ALL_TEACHERS,
    ALL_CLASSROOMS
} from '../utils/const'

const AllUsersPage: React.FC = () => {

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <h3 className="user-blocks__title title">Выберите роль пользователя</h3>
                <ul className="user-blocks">
                    <li className="user-block">
                        <Link className="user-link" to={ALL_ADMINS}>1. Администрация</Link>
                    </li>
                    <li className="user-block">
                        <Link className="user-link" to={ALL_TEACHERS}>2. Учителя</Link>
                    </li>
                    <li className="user-block">
                        <Link className="user-link" to={ALL_CLASSROOMS}>3. Ученики</Link>
                    </li>
                </ul>
            </div>
        </div>
    )

}

export default AllUsersPage