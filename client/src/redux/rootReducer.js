import {
    AUTH_STATUS,
    USER_DATA_IN_STORE,
    SUBJECTS_DATA_IN_STORE,
    SET_DATA_AFTER_LOGIN,
    STATUS_ADD_MARK_MODAL,
} from './types'
import { checkExistenceKey, getDataFromLS } from '../utils/utils'

const initialState = {
    isAuth: checkExistenceKey('user-data'),
    userData: getDataFromLS('user-data'),
    subjectsData: getDataFromLS('subjects'),
    addMarkModalStatus: null
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_STATUS:
            return {
                ...state,
                isAuth: action.data
            }
        case USER_DATA_IN_STORE:
            return {
                ...state,
                userData: action.data
            }
        case SUBJECTS_DATA_IN_STORE:
            return {
                ...state,
                subjectsData: action.data
            }
        case SET_DATA_AFTER_LOGIN:
            return {
                ...state,
                isAuth: true,
                userData: action.userData,
                subjectsData: action.subjectsData
            }
        case STATUS_ADD_MARK_MODAL:
            return {
                ...state,
                addMarkModalStatus: action.status
            }
        default:
            return { ...state }
    }
}

export default rootReducer