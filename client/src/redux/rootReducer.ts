import { ActionsTypes, IAction, IInitialState } from './types'
import { checkExistenceKey, getDataFromLS } from '../utils/utils'


const initialState: IInitialState = {
    isAuth: checkExistenceKey('user-data'),
    userData: getDataFromLS('user-data'),
    subjectsData: getDataFromLS('subjects'),
    addMarkModalStatus: null
}

export const rootReducer = (state = initialState, action: IAction): IInitialState => {
    switch (action.type) {
        case ActionsTypes.AUTH_STATUS:
            return {
                ...state,
                isAuth: action.data
            }
        case ActionsTypes.USER_DATA_IN_STORE:
            return {
                ...state,
                userData: action.data
            }
        case ActionsTypes.SUBJECTS_DATA_IN_STORE:
            return {
                ...state,
                subjectsData: action.data
            }
        case ActionsTypes.SET_DATA_AFTER_LOGIN:
            return {
                ...state,
                isAuth: true,
                userData: action.userData,
                subjectsData: action.subjectsData
            }
        case ActionsTypes.STATUS_ADD_MARK_MODAL:
            return {
                ...state,
                addMarkModalStatus: action.status
            }
        default:
            return { ...state }
    }
}

export type RootState = ReturnType<typeof rootReducer>