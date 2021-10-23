import React from 'react'
import { useSelector } from 'react-redux'
import { IInitialState } from '../redux/types'
import { IUserDataCompProps } from '../types/userTypes'


const UserData: React.FC<IUserDataCompProps> = ({ userData }) => {
    const email = useSelector((state: IInitialState) => state.userData?.email)

    return (
        <React.Fragment>
            {
                email === userData.email ?
                    <h3 className="content__table-title title">Ваши данные:</h3> :
                    <h3 className="content__table-title title user-page__title">Данные пользователя:</h3>
            }
            <ol>
                <li>Полное имя: {userData.surName} {userData.firstName} {userData.middleName}</li>
                <li>Email: {userData.email}</li>
                <li>Роль: {userData.role}</li>
                {userData.role === 'TEACHER' &&
                    <li>Предмет: {userData.subjectName}</li>
                }
            </ol>
        </React.Fragment>
    )
}

export default UserData