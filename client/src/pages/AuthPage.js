import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadDataAfterLogin } from '../redux/actions'
import { MAIN_ROUTE } from '../utils/const'

const AuthPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const signIn = async (event) => {
        try {
            event.preventDefault()
            await dispatch(loadDataAfterLogin(email, password))
            history.push(MAIN_ROUTE)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container">
            <div className="modal-wrapper">
                <div className="modal">
                    <form className="modal__form" onSubmit={signIn}>
                        <div className="modal__header">
                            <p className="modal__title">Авторизация</p>
                        </div>
                        <div className="modal__body">
                            <label className="modal__label" htmlFor="email">Введите Email</label>
                            <input className="modal__input" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                            <label className="modal__label" htmlFor="password">Введите пароль</label>
                            <input className="modal__input" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="modal__footer">
                            <button className="modal__btn" type="submit">Войти</button>
                            {/* onClick={() => signIn(email, password)} */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthPage