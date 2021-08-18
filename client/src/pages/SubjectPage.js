import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Table from '../components/Table'

const SubjectPage = ({match}) => {
    const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date(Date.now()).toISOString().split('T')[0])
    const subjectsData = useSelector(state => state.subjectsData)
    const subjectHref = match.path.slice(1)
    // decodeURI(window.location.href).split('/')[3];
    const {_id} = subjectsData.find(data => data.subjectName === subjectHref)

    return (
        <React.Fragment>
            <Header />
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
                    <Table dateInterval={{startDate: "2021-07-28", endDate: "2021-08-04"}} subjectId={{_id}} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default SubjectPage