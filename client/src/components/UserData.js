import React from 'react'

const UserData = ({userData}) => {
    console.log(userData)
    return (
        <React.Fragment>
            <h3 className="content__table-title title">Ваши данные:</h3>
            <ol>
                <li>Полное имя: {userData.surName} {userData.firstName} {userData.middleName}</li>
                <li>Email: {userData.email}</li>
                <li>Роль: {userData.role}</li>
                {userData.role === 'PUPIL' &&
                    <li>Класс: {userData.classroomNumber} {userData.classroomLetter}</li>
                }
            </ol>
        </React.Fragment>
    )
}

export default UserData