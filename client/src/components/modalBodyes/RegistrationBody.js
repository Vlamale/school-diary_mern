import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {registration} from '../../http/userApi'
import { MAIN_ROUTE } from '../../utils/const'

const RegistrationBody = ({classrooms}) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [classroomName, setUserClassroomName] = useState('--Выберите класс--')
    const [role, setRole] = useState('PUPIL')
    const history = useHistory()

    const signUp = async () => {
        let classroom = null
        let pupleAdditions = null
        const splitName = userName.split(' ')
        if (!email || !password || !userName || !role) {
            alert('Форма заполнена не полностью.')
            return
        }
        if (splitName.length > 3) {
            alert('Укажите ФИО в соответствии с обрацом: Иванов Иван Иванович')
            return
        }
        if (role === 'PUPIL') {
            if (classroomName === '--Выберите класс--') {
                alert('Ученик без класса, что солдат без автомата! Выберите класс.')
                return
            }
            classroom = classrooms.find(({classroomNumber, classroomLetter}) => `${classroomNumber} "${classroomLetter}"` === classroomName)
    
            if (!classroom) {
                alert('Выберите настоящую школу и класс')
                return
            }
            pupleAdditions = {
                classroomNumber: +classroomName.split(' ')[0],
                classroomLetter: classroomName.split('"')[1],
                classroomId: classroom._id
            }
        }

        const userData = {
            email,
            password,
            firstName: splitName[1],
            surName: splitName[0],
            middleName: splitName[2],
            role
        }
        
        await registration(
            role === 'PUPIL' ? 
            {
                userData,
                ...pupleAdditions
            } : 
            userData)
        
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
                <select className="modal__select" name="cars" id="cars" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="PUPIL">PUPIL</option>
                    <option value="TEACHER">TEACHER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                <select disabled={role !== 'PUPIL'} className="modal__select" name="cars" id="cars" value={classroomName} onChange={e => setUserClassroomName(e.target.value)}>
                    <option>--Выберите класс--</option>
                    {classrooms.map(({_id, classroomNumber, classroomLetter}) => (
                        <option key={_id}>{`${classroomNumber} "${classroomLetter}"`}</option>
                    ))}
                </select>
            </div>
            <div className="modal__footer">
                <button className="modal__btn" onClick={() => signUp()} >Зарегистрировать</button>
            </div>
        </React.Fragment>
    )
}

export default RegistrationBody