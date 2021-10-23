import { ISubjectsData } from "../types/subjectsTypes";
import { IUserData } from "../types/userTypes";

export enum ActionsTypes {
    AUTH_STATUS = 'AUTH_STATUS',
    USER_DATA_IN_STORE = 'USER_DATA_IN_STORE',
    SUBJECTS_DATA_IN_STORE = 'SUBJECTS_DATA_IN_STORE',
    SET_DATA_AFTER_LOGIN = 'SET_DATA_AFTER_LOGIN',
    STATUS_ADD_MARK_MODAL = 'STATUS_ADD_MARK_MODAL'
}

export interface IInitialState {
    isAuth: boolean;
    userData: IUserData | null;
    subjectsData: ISubjectsData[];
    addMarkModalStatus: string | null;
}

export interface IAuthStatus {
    type: ActionsTypes.AUTH_STATUS;
    data: boolean;
}

export interface IUserDataInStore {
    type: ActionsTypes.USER_DATA_IN_STORE;
    data: IUserData | null;
}

export interface ISubjectsDataInStore {
    type: ActionsTypes.SUBJECTS_DATA_IN_STORE;
    data: any[];
}

export interface ISetDataAfterLogin {
    type: ActionsTypes.SET_DATA_AFTER_LOGIN;
    userData: IUserData | null,
    subjectsData: any[];
}

export interface IAddMarkModalStatus {
    type: ActionsTypes.STATUS_ADD_MARK_MODAL;
    status: string | null
}

export type IAction = IAuthStatus | IUserDataInStore | ISubjectsDataInStore | ISetDataAfterLogin |IAddMarkModalStatus