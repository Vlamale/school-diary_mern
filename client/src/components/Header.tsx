import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { authStatus, userDataInStore } from '../redux/actions'
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE, MAIN_ROUTE } from '../utils/const'
import { IInitialState } from '../redux/types'
import { IUserData } from '../types/userTypes'

const Header: React.FC = () => {
    const [fullUserName, setFullUserName] = useState('')
    const isAuth = useSelector((state: IInitialState) => state.isAuth)
    const dispatch = useDispatch()
    const history = useHistory()
    
    useEffect(() => {
        if (isAuth) {
            const { surName, firstName, middleName }: IUserData = JSON.parse(localStorage.getItem('user-data') || '')
            setFullUserName(`${surName} ${firstName} ${middleName}`)
        }
    }, [])

    const signBtnsHandler = () => {
        if (isAuth) {
            localStorage.removeItem('user-data')
            dispatch(authStatus(false))
            dispatch(userDataInStore(null))
            history.push(MAIN_ROUTE)
        } else {
            history.push(LOGIN_ROUTE)
        }
    }
    return (
        <div className="header">
            <a href="/"><img className="header__logo" src={logo} alt="logo" /></a>
            {isAuth &&
                <div className="header__user-block">
                    <Link to='/' className="header__user">{fullUserName}</Link>
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