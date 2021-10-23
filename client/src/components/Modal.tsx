import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllClassrooms } from '../http/classroomApi'
import { addMarkModalStatus } from '../redux/actions'
import { IClassroom } from '../types/classroomsTypes';
import { EffectCallback, IModalProps } from '../types/commonTypes';
import AddMarkBody from './modalBodyes/AddMarkBody'
import RegistrationBody from './modalBodyes/RegistrationBody'

const Modal: React.FC<IModalProps> = ({ modalStatus }) => {
    const dispatch = useDispatch()
    const [classrooms, setClassrooms] = useState<IClassroom[]>([])

    useEffect((): ReturnType<EffectCallback> => {
        let cleanupFunction = false
        if (!cleanupFunction) {
            const getData = async (): Promise<void> => {
                const classroomsData = await getAllClassrooms()
                setClassrooms(classroomsData)
            }
            getData()
        }
        return () => { cleanupFunction = true }
    }, [])

    return (
        <div className="modal-wrapper" onClick={(e: React.SyntheticEvent<HTMLDivElement>) => {
            if ((e.target as HTMLDivElement).classList.contains('modal-wrapper')) {
                dispatch(addMarkModalStatus(null))
            }
        }}>
            <div className="modal">
                {modalStatus === 'AddMark' &&
                    <AddMarkBody classrooms={classrooms} />}
                {modalStatus === 'Registration' &&
                    <RegistrationBody classrooms={classrooms} />}
            </div>
        </div>
    )
}

export default Modal