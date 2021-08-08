import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {registration} from '../../http/userApi'
import { MAIN_ROUTE } from '../../utils/const'

const RegistrationBody = ({schools, classrooms}) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [schoolName, setUserSchoolName] = useState('')
    const [classroomName, setUserClassroomName] = useState('')
    const [role, setRole] = useState('PUPIL')
    const history = useHistory()
    
    const signUp = async () => {
        const splitName = userName.split(' ')
        if (!email || !password || !userName || !schoolName || !classroomName || !role) {
            debugger
            alert('Форма заполнена не полностью.')
            return
        }
        if (splitName.length > 3) {
            alert('Укажите ФИО в соответствии с обрацом: Иванов Иван Иванович')
            return
        }
        const school = schools.find(sc => sc.schoolName === schoolName)
        const classroom = classrooms.find(({classroomNumber, classroomLetter}) => `${classroomNumber} "${classroomLetter}"` === classroomName)

        if (!school || !classroom) {
            alert('Выберите настоящую школу и класс')
        }
        const userData = {
            email,
            password,
            firstname: splitName[1],
            surname: splitName[0],
            middleName: splitName[2],
            schoolName,
            schoolId: school._id,
            classroomNumber: +classroomName.split(' ')[0],
            classroomLetter: classroomName.split('"')[1],
            classroomId: classroom._id
        }
        await registration(userData)
        alert('Пользователь успешно зарегистрирован!')
        history.push(MAIN_ROUTE)
    }

    return (
        <React.Fragment>
            <div className="modal__body">
                <div className="modal__input-block modal__email-block">
                    <label htmlFor="email">Email:</label>
                    <input
                        className="modal__input"
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="modal__input-block modal__password-block">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        className="modal__input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="modal__input-block modal__password-block">
                    <label htmlFor="user-name">ФИО:</label>
                    <input
                        className="modal__input"
                        type="text"
                        id="user-name"
                        value={userName}
                        onChange={e => setUserName(e.target.value)} />
                </div>
                <select className="modal__select" name="cars" id="cars" value={schoolName} onChange={e => setUserSchoolName(e.target.value)}>
                    <option >--Выберите школу--</option>
                    {schools.map(({schoolName}) => (
                        <option key={schoolName}>{schoolName}</option>
                    ))}
                </select>
                <select className="modal__select" name="cars" id="cars" value={classroomName} onChange={e => setUserClassroomName(e.target.value)}>
                    <option >--Выберите класс--</option>
                    {classrooms.map(({_id, classroomNumber, classroomLetter}) => (
                        <option key={_id}>{`${classroomNumber} "${classroomLetter}"`}</option>
                    ))}
                </select>
                <select className="modal__select" name="cars" id="cars" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="volvo">PUPIL</option>
                    <option value="saab">TEACHER</option>
                    <option value="saab">ADMIN</option>
                </select>
            </div>
            <div className="modal__footer">
                <button className="modal__btn" onClick={() => signUp()} >Зарегистрировать</button>
            </div>
        </React.Fragment>
    )
}

export default RegistrationBody