export function checkExistenceKey(key) {
    if (localStorage.getItem(key) === null) {
        return false
    }
    return true
}

export function getDataFromLS(key) {
    if (localStorage.getItem(key) !== null) {
        const data = JSON.parse(localStorage.getItem(key))
        console.log(data)
        return data
    }
    return null
}

export function getDateInterval(start, end) {
    const interval = []
    for (let i = Date.parse(start); i <= Date.parse(end); i+=24*60*60*1000) {
        const date = new Date(i).toISOString().split('T')[0]
        interval.push(date)
    }
    return interval
}