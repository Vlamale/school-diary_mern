import {login, registration} from '../http/userApi'
import {getAllSubjects} from '../http/subjectApi'
import {getUserById} from '../http/userApi'
import {
    AUTH_STATUS,
    USER_DATA_IN_STORE,
    SUBJECTS_DATA_IN_STORE,
    SET_DATA_AFTER_LOGIN,
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

// const setOtherUserData = (data) => {
//     return {
//         type: OTHER_USER_DATA_IN_STORE,
//         data
//     }
// }

// export const loadOtherUserData = (id) => {
//     return async (dispatch) => {
//         const userData = await getUserById(id)
//         console.log(userData)
//         dispatch(setOtherUserData(userData))
//     }
// }