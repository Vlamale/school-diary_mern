import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserByClassroom } from '../../http/userApi'
import { addMark } from '../../http/diaryApi'
import { addMarkModalStatus } from '../../redux/actions'

const AddMarkBody = ({ classrooms }) => {
    const { userData, subjectsData } = useSelector(state => state)
    const subject = subjectsData.find(s => userData.subjectName === s.subjectName)
    const dispatch = useDispatch()
    const [pupiles, setPupiles] = useState([])
    const [userId, setUserId] = useState('--Выберите ученика--')
    const [mark, setMark] = useState('0')
    const [classroomId, setUserClassroomId] = useState('--Выберите класс--')
    const [subjectId, setSubjectId] = useState(subject._id)

    useEffect(() => {
        let cleanupFunction = false
        if (!cleanupFunction) {
            const getData = async () => {
                const pupilesData = await getUserByClassroom(classroomId)
                setPupiles(pupilesData)
            }
            getData()
        }
        return () => cleanupFunction = true
    }, [classroomId])

    const addMarkHandler = async () => {
        if (classroomId === '--Выберите класс--') {
            alert('Ученик без класса, что солдат без автомата! Выберите класс.')
            return
        }
        if (userId === '--Выберите ученика--') {
            alert('Выберите ученика.')
            return
        }
        if (subjectId === '--Выберите предмет--') {
            alert('Выберите предмет.')
            return
        }
        try {
            await addMark({
                mark: +mark,
                userId,
                subjectId,
                classroomId
            })
        } catch (err) {
            return alert('Ошибка, не удалось поставить оценку!')
        }
        alert('Оценка поставлена')
        dispatch(addMarkModalStatus(null))
    }
    return (
        <React.Fragment>
            <div className="modal__header">
                <p className="modal__title">Поставить оценку</p>
            </div>
            <div className="modal__body">
                <select className="modal__select" name="cars" id="cars" value={classroomId} onChange={e => setUserClassroomId(e.target.value)}>
                    <option>--Выберите класс--</option>
                    {classrooms.map(({ _id, classroomNumber, classroomLetter }) => (
                        <option key={_id} value={_id}>{`${classroomNumber} "${classroomLetter}"`}</option>
                    ))}
                </select>
                <select className="modal__select" name="cars" id="cars" value={userId} onChange={e => setUserId(e.target.value)}>
                    <option>--Выберите ученика--</option>
                    {pupiles.map(({ _id, surName, firstName, middleName }) => (
                        <option key={_id} value={_id}>{`${surName} ${firstName} ${middleName}`}</option>
                    ))}
                </select>
                <select className="modal__select" name="cars" id="cars" value={subjectId} onChange={e => setSubjectId(e.target.value)}>
                    <option value={subject._id}>{subject.subjectName}</option>
                </select>
                <div className="modal__input-block modal__mark-block">
                    <label htmlFor="mark">Оценка:</label>
                    <input
                        className="modal__input"
                        type="number"
                        min="1"
                        max="10"
                        id="mark"
                        value={mark}
                        onChange={e => setMark(e.target.value)} />
                </div>
            </div>
            <div className="modal__footer">
                <button className="modal__btn" onClick={() => addMarkHandler()} >Поставить</button>
            </div>
        </React.Fragment>
    )
}

export default AddMarkBody