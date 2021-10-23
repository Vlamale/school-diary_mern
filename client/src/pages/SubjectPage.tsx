import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Table from '../components/Table'
import { IInitialState } from '../redux/types'

const SubjectPage: React.FC<any> = ({match}) => {
    const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date(Date.now()).toISOString().split('T')[0])
    const subjectsData = useSelector((state: IInitialState) => state.subjectsData)
    const subjectHref: string = match.path.slice(1)
    const {_id} = subjectsData.find(data => data.subjectName === subjectHref) || {}

    return (
        <React.Fragment>
            <div className="container">
                <Navbar />
                <div className="content">
                    <h3 className="content__table-title">Ваши оценки по предмету {subjectHref}</h3>
                    <div className="content__period">
                        <p>С:</p>
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        <p>по:</p>
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </div>
                    <Table dateInterval={{startDate, endDate}} subjectId={{_id}} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default SubjectPage