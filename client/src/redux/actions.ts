import { login } from '../http/userApi'
import { getAllSubjects } from '../http/subjectApi'
import {
    ActionsTypes,
    IAuthStatus,
    IUserDataInStore,
    ISubjectsDataInStore,
    ISetDataAfterLogin,
    IAddMarkModalStatus,
} from './types'
import { Dispatch } from 'redux'
import { IUserData } from '../types/userTypes'

export const authStatus = (data: boolean): IAuthStatus => {
    return {
        type: ActionsTypes.AUTH_STATUS,
        data
    }
}

export const userDataInStore = (data: IUserData | null): IUserDataInStore => {
    return {
        type: ActionsTypes.USER_DATA_IN_STORE,
        data
    }
}

export const subjectsDataInStore = (data: any[]): ISubjectsDataInStore => {
    return {
        type: ActionsTypes.SUBJECTS_DATA_IN_STORE,
        data
    }
}

export const setDataAfterLogin = (userData: IUserData | null, subjectsData: any[]): ISetDataAfterLogin => {
    return {
        type: ActionsTypes.SET_DATA_AFTER_LOGIN,
        userData,
        subjectsData
    }
}

export const loadDataAfterLogin = (email:string, password:string) => {
    return async (dispatch: Dispatch<ISetDataAfterLogin>) => {
        try {
            const userData = await login(email, password)
            const subjectsData = await getAllSubjects()
            dispatch(setDataAfterLogin(userData, subjectsData))
        } catch (err) {
            console.log(err);
        }
    }
}

export const addMarkModalStatus = (status: string | null): IAddMarkModalStatus => {
    return {
        type: ActionsTypes.STATUS_ADD_MARK_MODAL,
        status
    }
}