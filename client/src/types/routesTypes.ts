export interface IRoute {
    path: string[] | string
    Component: React.FC<any>
    exact?: boolean
}