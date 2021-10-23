import React from 'react'
import { useSelector } from 'react-redux'
import { IInitialState } from '../redux/types'
import Navbar from './Navbar'
import UserData from './UserData'

const Content: React.FC = () => {
    const { userData } = useSelector((state: IInitialState) => state)

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                {userData &&
                    <UserData userData={userData} />
                }
                {!userData &&
                    <React.Fragment>
                        <h3 className="content__table-title title">Вы не авторизованны, <a href="/login">авторизуйтесь</a>!</h3>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default Content