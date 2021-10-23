import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addMarkModalStatus } from '../redux/actions'
import { IInitialState } from '../redux/types'
import { EffectCallback } from '../types/commonTypes'
import { ISubjectsData } from '../types/subjectsTypes'

const Navbar = () => {
    const dispatch = useDispatch()
    const [subjects, setSubjects] = useState<ISubjectsData[]>([])
    const { isAuth, userData, subjectsData } = useSelector((state: IInitialState) => state)

    useEffect((): ReturnType<EffectCallback> => {
        let cleanupFunction = false
        if (isAuth) {
            if (!cleanupFunction) setSubjects(subjectsData)
        }
        return () => { cleanupFunction = true }
    }, [])

    return (
        <React.Fragment>
            {isAuth && userData?.role === "ADMIN" &&
                (<div className="navbar">
                    <ul className="navbar__list">
                        <button
                            className="navbar__item"
                            onClick={() => dispatch(addMarkModalStatus('Registration'))}
                        >Зарегистрировать пользователя
                        </button>
                        <Link to="/all-users" className="navbar__item">Все пользователи</Link>
                    </ul>
                </div>)}
            {isAuth && userData?.role === "PUPIL" &&
                (<div className="navbar">
                    <ul className="navbar__list">
                        <Link to="/all-marks" className="navbar__item">Все предметы</Link>
                        {subjects.map(({ subjectName, _id }) => (
                            <Link to={'/' + subjectName} key={_id} className="navbar__item">{subjectName}</Link>
                        ))}
                    </ul>
                </div>)}
            {isAuth && userData?.role === "TEACHER" &&
                (<div className="navbar">
                    <ul className="navbar__list">
                        <button
                            className="navbar__item"
                            onClick={() => dispatch(addMarkModalStatus('AddMark'))}
                        >Поставить оценку
                        </button>
                        <Link to="/all-users" className="navbar__item">Все пользователи</Link>
                    </ul>
                </div>)}
        </React.Fragment>
    )
}

export default Navbar