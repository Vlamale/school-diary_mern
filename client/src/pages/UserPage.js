import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import score from '../img/score.svg'
import deleteIcon from '../img/deleteIcon.svg'
import Navbar from '../components/Navbar'
import { getUserById, deleteUser } from '../http/userApi'
import Table from '../components/Table'
import UserData from '../components/UserData'
import { addMarkModalStatus } from '../redux/actions'

const UserPage = ({ match }) => {
    const dispatch = useDispatch()
    const authUserRole = useSelector(state => state.userData.role)
    const [userData, setUserData] = useState({})
    const [showMarks, setShowMarks] = useState(false)
    const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date(Date.now()).toISOString().split('T')[0])

    const userId = match.url.split('-')[1]

    useEffect(() => {
        let cleanupFunction = false
        if (!cleanupFunction) {
            const setData = async () => {
                const data = await getUserById(userId)
                setUserData(data)
            }
            setData()
        }
    }, [])

    const defineAndSetTimeData = (value, type) => {
        switch (type) {
            case 'start':
                return setStartDate(value)
            case 'end':
                return setEndDate(value)
            default:
                return value
        }
    }

    const deleteBtnHandler = async () => {
        const result = window.confirm('Вы действительно хотите удалить пользователя?')
        if (result) {
            const message = await deleteUser(userId)
            alert(message)
        }
    }

    return (
        <React.Fragment>
            <div className="container">
                <Navbar />
                <div className="content">
                    <div className="img-panel">
                        {userData.role === 'PUPIL' &&
                            <img
                                className="img"
                                onClick={() => setShowMarks(!showMarks)}
                                alt="Score"
                                title="Смотреть оценки пользователя"
                                src={score} />
                        }
                        {authUserRole === 'ADMIN' &&
                            <img
                                className="img"
                                onClick={() => deleteBtnHandler()}
                                alt="Delete"
                                title="Удалить пользователя"
                                src={deleteIcon} />
                        }
                        {authUserRole === 'TEACHER' &&
                            <button
                                className="add-mark__btn"
                                onClick={() => dispatch(addMarkModalStatus('AddMark'))}
                                >Добавить оценку
                            </button>
                        }
                    </div>
                    <UserData userData={userData} />
                    {showMarks &&
                        <React.Fragment>
                            <div className="content__period">
                                <p>С:</p>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={e => defineAndSetTimeData(e.target.value, 'start')}
                                />
                                <p>по:</p>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={e => defineAndSetTimeData(e.target.value, 'end')}
                                />
                            </div>
                            <Table dateInterval={{ startDate, endDate }} otherUserId={userId} />
                        </React.Fragment>}
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserPage