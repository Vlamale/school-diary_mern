import React, { useEffect, useState } from 'react'
import RegistrationBody from '../components/modalBodyes/RegistrationBody'
import { getAllClassrooms } from '../http/classroomApi'
import { IClassroom } from '../types/classroomsTypes'
import { EffectCallback } from '../types/commonTypes'


const RegistrationPage: React.FC = () => {
    const [classrooms, setClassrooms] = useState<IClassroom[]>([])

    useEffect((): ReturnType<EffectCallback> => {
        let cleanupFunction = false
        if (!cleanupFunction) {
            const getData = async () => {
                const classroomsData = await getAllClassrooms()
                setClassrooms(classroomsData)
            }
            getData()
        }
        return () => {cleanupFunction = true}
    }, [])

    return (
        <div className="container">
            <div className="modal-wrapper">
                <div className="modal">
                    <RegistrationBody classrooms={classrooms}/>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage