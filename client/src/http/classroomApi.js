import {$host} from './index'

export const getAllClassrooms = async () => {
    const {data} = await $host.get('api/classroom/')
    console.log(data)
    return data
}