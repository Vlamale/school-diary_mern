import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { authRoutes, doesNotAuthRoutes, teacherRoutes, adminRoutes, pupilRoutes } from '../routes'
import { useSelector } from 'react-redux'
import SubjectPage from '../pages/SubjectPage'
import { IInitialState } from '../redux/types'

const AppRouter: React.FC = () => {
    const { userData, isAuth, subjectsData } = useSelector((state: IInitialState) => state)

    subjectsData?.forEach(subj => {
        pupilRoutes.push({
            path: `/${subj.subjectName}`,
            Component: SubjectPage,
            exact: true
        })
    })

    return (
        <Switch>
            {isAuth && authRoutes.map(({ path, Component, exact }) => (
                <Route key={`${path}`} path={path} component={Component} exact={exact} />
            ))}
            {isAuth && userData?.role === 'ADMIN' && adminRoutes.map(({ path, Component, exact }) => (
                <Route key={`${path}`} path={path} component={Component} exact={exact} />
            ))}
            {isAuth && userData?.role === 'TEACHER' && teacherRoutes.map(({ path, Component, exact }) => (
                <Route key={`${path}`} path={path} component={Component} exact={exact} />
            ))}
            {isAuth && userData?.role === 'PUPIL' && pupilRoutes.map(({ path, Component, exact }) => (
                <Route key={`${path}`} path={path} component={Component} exact={exact} />
            ))}
            {!isAuth && doesNotAuthRoutes.map(({ path, Component }) => (
                <Route key={`${path}`} path={path} component={Component} exact />
            ))}
        </Switch>
    )
}

export default AppRouter