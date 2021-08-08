import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'
import RegistrationPage from './pages/RegistrationPage'
import AllMarksPage from './pages/AllMarksPage'
import SubjectPage from './pages/SubjectPage'
import {MAIN_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, ALL_MARKS, ONE_SUBJECT_MARKS} from './utils/const'

export const authRoutes = [
    {
        path: ALL_MARKS,
        Component: AllMarksPage,
        exact: true
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage,
        exact: true
    },
]

export const adminRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage,
        exact: true
    },
    ...authRoutes
]

export const doesNotAuthRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
]