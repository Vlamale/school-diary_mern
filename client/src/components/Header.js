import React, { useState, useEffect } from 'react'
import logo from '../logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { authStatus, userDataInStore } from '../redux/actions'
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/const'

const Header = () => {
    const [fullUserName, setFullUserName] = useState('')
    const isAuth = useSelector(state => state.isAuth)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (isAuth) {
            const { fullName } = JSON.parse(localStorage.getItem('user-data'))
            setFullUserName(fullName)
        }
    }, [])
    const signBtnsHandler = () => {
        if (isAuth) {
            dispatch(authStatus(false))
            dispatch(userDataInStore(null))
        } else {
            history.push(LOGIN_ROUTE)
        }
    }
    return (
        <div className="header">
            <a href="/"><img className="header__logo" src={logo} alt="logo" /></a>
            {isAuth &&
                <div className="header__user-block">
                    <a href='/' className="header__user">{fullUserName}</a>
                </div>}
            <div className="header__btn-block">
                {isAuth ?
                    <button className="header__btn" onClick={signBtnsHandler}>Выйти</button> :
                    <button className="header__btn" onClick={signBtnsHandler}>Войти</button>}
            </div>
        </div>
    )
}

export default Header