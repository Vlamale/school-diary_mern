import { login } from '../http/userApi'
import { getAllSubjects } from '../http/subjectApi'
import {
    AUTH_STATUS,
    USER_DATA_IN_STORE,
    SUBJECTS_DATA_IN_STORE,
    SET_DATA_AFTER_LOGIN,
    STATUS_ADD_MARK_MODAL
} from './types'

export const authStatus = (data) => {
    return {
        type: AUTH_STATUS,
        data
    }
}

export const userDataInStore = (data) => {
    return {
        type: USER_DATA_IN_STORE,
        data
    }
}

export const subjectsDataInStore = (data) => {
    return {
        type: SUBJECTS_DATA_IN_STORE,
        data
    }
}

export const setDataAfterLogin = (userData, subjectsData) => {
    return {
        type: SET_DATA_AFTER_LOGIN,
        userData,
        subjectsData
    }
}

export const loadDataAfterLogin = (email, password) => {
    return async (dispatch) => {
        const userData = await login(email, password)
        const subjectsData = await getAllSubjects()
        await dispatch(setDataAfterLogin(userData, subjectsData))
    }
}

export const addMarkModalStatus = (status) => {
    return {
        type: STATUS_ADD_MARK_MODAL,
        status
    }
}