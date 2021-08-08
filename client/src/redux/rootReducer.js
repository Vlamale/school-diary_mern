import {
    AUTH_STATUS,
    USER_DATA_IN_STORE,
    SUBJECTS_DATA_IN_STORE,
    SET_DATA_AFTER_LOGIN
} from './types'
import { checkExistenceKey, getDataFromLS } from '../utils/utils'
// checkExistenceKey('user-data')
const initialState = {
    isAuth: checkExistenceKey('user-data'),
    userData: getDataFromLS('user-data'),
    subjectsData: getDataFromLS('subjects')
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
        default:
            return { ...state }
    }
}

export default rootReducer