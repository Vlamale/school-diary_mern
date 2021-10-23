import { ISubjectsData } from "./subjectsTypes";
import { IAuthResponse, IUserData } from "./userTypes";

export type EffectCallback = () => (void | (() => void | undefined));

export interface IModalProps {
    modalStatus: string | null
}

export type storageTypes = IUserData[] | ISubjectsData[] | IAuthResponse