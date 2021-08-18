import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'
import RegistrationPage from './pages/RegistrationPage'
import AllMarksPage from './pages/AllMarksPage'
import UserPage from './pages/UserPage'
import AllUsersPage from './pages/AllUsersPage'
import AllClassroomsPage from './pages/AllClassroomsPage'
import UsersByClassroomPage from './pages/UsersByClassroomPage'
import {
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    LOGIN_ROUTE,
    ALL_MARKS,
    ALL_USERS_PAGE,
    ALL_ADMINS,
    ALL_TEACHERS,
    ALL_PUPILS,
    USER_ROUTE,
    ALL_CLASSROOMS,
    CLASSROOM_ROUTE
} from './utils/const'
import UsersByRolePage from './pages/UsersByRolePage'

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
    ...authRoutes,
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage,
        exact: true
    },
    {
        path: ALL_USERS_PAGE,
        Component: AllUsersPage,
        exact: true
    },
    {
        path: [ALL_ADMINS, ALL_TEACHERS, ALL_PUPILS],
        Component: UsersByRolePage,
        exact: true
    },
    {
        path: USER_ROUTE,
        Component: UserPage,
        exact: true
    },
    {
        path: ALL_CLASSROOMS,
        Component: AllClassroomsPage,
        exact: true
    },
    {
        path: CLASSROOM_ROUTE,
        Component: UsersByClassroomPage,
        exact: true
    }
]

export const teacherRoutes = [
    ...authRoutes,
    {
        path: ALL_USERS_PAGE,
        Component: AllUsersPage,
        exact: true
    }
]

export const pupilRoutes = [
    ...authRoutes,
]

export const doesNotAuthRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
]

export const publicRoutes = [

]