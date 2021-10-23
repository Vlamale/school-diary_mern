import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { registration } from '../../http/userApi'
import { addMarkModalStatus } from '../../redux/actions'
import { IInitialState } from '../../redux/types'
import { IClassroom, IClassroomsProps } from '../../types/classroomsTypes'
import { ITeacherAddition, IPupleAdditions, IUserCreateData } from '../../types/userTypes'

const RegistrationBody: React.FC<IClassroomsProps> = ({ classrooms }) => {
    const subjects = useSelector((state: IInitialState) => state.subjectsData)
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [classroomName, setUserClassroomName] = useState('--Выберите класс--')
    const [subjectName, setSubjectName] = useState('--Выберите предмет--')
    const [role, setRole] = useState('PUPIL')

    const signUp = async () => {
        let pupleAdditions: IPupleAdditions | null = null
        let teacherAddition: ITeacherAddition | null = null
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
                alert('Выберите класс.')
                return
            }
            const classroom: IClassroom | undefined = classrooms.find(({ classroomNumber, classroomLetter }) => `${classroomNumber} "${classroomLetter}"` === classroomName)

            pupleAdditions = {
                classroomNumber: +classroomName.split(' ')[0],
                classroomLetter: classroomName.split('"')[1],
                classroomId: classroom?._id
            }
        }

        if (role === 'TEACHER') {
            if (classroomName === '--Выберите предмет--') {
                return alert('Выберите предмет учителя.')
            }
            const subject = subjects.find(sub => sub.subjectName === subjectName)

            teacherAddition = {
                subjectId: subject?._id,
                subjectName: subject?.subjectName
            }
        }

        const userData: IUserCreateData = {
            email,
            password,
            firstName: splitName[1],
            surName: splitName[0],
            middleName: splitName[2],
            role
        }

        switch (role) {
            case 'PUPIL':
                await registration({
                    ...userData,
                    ...pupleAdditions,
                })
                break
            case 'TEACHER':
                await registration({
                    ...userData,
                    ...teacherAddition,
                })
                break
            default:
                return await registration({
                    ...userData,
                })
        }

        alert('Пользователь успешно зарегистрирован!')
        dispatch(addMarkModalStatus(null))
    }

    return (
        <React.Fragment>
            <div className="modal__header">
                <p className="modal__title">Регистрация</p>
            </div>
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
                    {classrooms.map(({ _id, classroomNumber, classroomLetter }) => (
                        <option key={_id}>{`${classroomNumber} "${classroomLetter}"`}</option>
                    ))}
                </select>
                <select disabled={role !== 'TEACHER'} className="modal__select" name="cars" id="cars" value={subjectName} onChange={e => setSubjectName(e.target.value)}>
                    <option>--Выберите предмет--</option>
                    {subjects.map(({ _id, subjectName }) => (
                        <option key={_id}>{subjectName}</option>
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