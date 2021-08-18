import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

const Navbar = () => {
    const [subjects, setSubjects] = useState([])
    const {isAuth, userData, subjectsData} = useSelector(state => state)
    useEffect(() => {
        let cleanupFunction = false
        if (isAuth) {
        if (!cleanupFunction) setSubjects(subjectsData)
        }
        return () => cleanupFunction = true
    }, [])
    return (
        <React.Fragment>
        {isAuth && userData.role === "ADMIN" &&
            (<div className="navbar">
            <ul className="navbar__list">
                <a href="/registration" className="navbar__item">Зарегистрировать пользователя</a>
                <a href="/all-users" className="navbar__item">Все пользователи</a>
            </ul>
        </div>)}
        {isAuth && userData.role === "PUPIL" &&
            (<div className="navbar">
            <ul className="navbar__list">
                <a href="/all-marks" className="navbar__item">Все предметы</a>
                {subjects.map(({subjectName, _id}) => (
                    <a href={'/' + subjectName} key={_id} className="navbar__item">{subjectName}</a>
                ))}
            </ul>
        </div>)}
        {isAuth && userData.role === "TEACHER" &&
            (<div className="navbar">
            <ul className="navbar__list">
                <a href="/all-marks" className="navbar__item">Поставить оценку</a>
                <a href="/all-marks" className="navbar__item">Все классы</a>
                <a href="/all-marks" className="navbar__item">Список учителей</a>
            </ul>
        </div>)}
        </React.Fragment>
    )
}

export default Navbar