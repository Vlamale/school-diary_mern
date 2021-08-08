import React, {useEffect, useState} from 'react'
import RegistrationBody from '../components/modalBodyes/RegistrationBody'
import {getAllSchool} from '../http/schoolApi'
import {getAllClassrooms} from '../http/classroomApi'


const RegistrationPage = () => {
    const [schools, setSchools] = useState([])
    const [classrooms, setClassrooms] = useState([])
    
    useEffect(() => {
        let cleanupFunction = false
        if (!cleanupFunction) {
            const getData = async () => {
                const schoolsData = await getAllSchool()
                const classroomsData = await getAllClassrooms()
                setSchools(schoolsData)
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
                    <RegistrationBody schools={schools} classrooms={classrooms}/>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage