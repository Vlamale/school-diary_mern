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
        <div className="modal-wrapper">
            <div className="modal">
                <form className="modal__form" onSubmit={signIn}>
                    <div className="modal__header">
                        <p className="modal__title">Авторизация</p>
                    </div>
                    <div className="modal__body">
                        <label htmlFor="email">Введите Email</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="password">Введите пароль</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="modal__footer">
                        <button type="submit">Войти</button>
                        {/* onClick={() => signIn(email, password)} */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthPage