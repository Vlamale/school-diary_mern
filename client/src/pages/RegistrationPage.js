import React, {useEffect, useState} from 'react'
import RegistrationBody from '../components/modalBodyes/RegistrationBody'
import {getAllClassrooms} from '../http/classroomApi'


const RegistrationPage = () => {
    const [classrooms, setClassrooms] = useState([])

    useEffect(() => {
        let cleanupFunction = false
        if (!cleanupFunction) {
            const getData = async () => {
                const classroomsData = await getAllClassrooms()
                setClassrooms(classroomsData)
            }
            getData()
        }
        return () => cleanupFunction = true
    }, [])

    return (
        <div className="container">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal__header">
                        <p className="modal__title">Регистрация</p>
                    </div>
                    <RegistrationBody classrooms={classrooms}/>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage