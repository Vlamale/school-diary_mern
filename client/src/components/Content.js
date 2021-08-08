import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'

const Content = () => {
    const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date(Date.now()).toISOString().split('T')[0])
    const { userData } = useSelector(state => state)

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                {userData && userData.role === 'ADMIN' &&
                    <React.Fragment>
                        <h3 className="content__table-title">Информация о пользователе:</h3>
                        <ol>
                            <li>Полное имя: {userData.fullName}</li>
                            <li>Email: {userData.email}</li>
                            <li>Роль: {userData.role}</li>
                            <li>Класс: {userData.classroomNumber} {userData.classroomLetter}</li>
                        </ol>
                    </React.Fragment>
                }
                {userData && userData.role === 'USER' &&
                    <React.Fragment>
                        <h3 className="content__table-title">Информация о пользователе:</h3>
                        <ol>
                            <li>Полное имя: {userData.fullName}</li>
                            <li>Email: {userData.email}</li>
                        </ol>
                    </React.Fragment>
                }
                {!userData && 
                <React.Fragment>
                <h3 className="content__table-title">Вы не авторизованны, <a href="/login">авторизуйтесь</a>!</h3>
            </React.Fragment>
            }
            </div>
        </div>
    )
}

export default Content