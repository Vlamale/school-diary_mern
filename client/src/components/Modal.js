import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import {getAllClassrooms} from '../http/classroomApi'
import { addMarkModalStatus } from '../redux/actions'
import AddMarkBody from './modalBodyes/AddMarkBody'
import RegistrationBody from './modalBodyes/RegistrationBody'

const Modal = ({modalStatus}) => {
    const dispatch = useDispatch()
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
        <div className="modal-wrapper" onClick={(e) => {
            if (e.target.classList.contains('modal-wrapper')) {
              dispatch(addMarkModalStatus(null))
            }
            }}>
              <div className="modal">
                  {modalStatus === 'AddMark' && 
                  <AddMarkBody classrooms={classrooms}/>}
                  {modalStatus === 'Registration' && 
                  <RegistrationBody classrooms={classrooms}/>}
              </div>
          </div>
    )
}

export default Modal