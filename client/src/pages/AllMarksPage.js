import React, {useState} from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Table from '../components/Table'

const AllMarksPage = () => {
    const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date(Date.now()).toISOString().split('T')[0])
    
    const transformAndSetTimeData = (value, type) => {
        switch (type) {
            case 'start':
                return setStartDate(value)
            case 'end':
                return setEndDate(value)
            default:
                return value
        }
    }
    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <Navbar />
                <div className="content">
                    <h3 className="content__table-title">Таблица оценок 5 "Б" класса</h3>
                    <div className="content__period">
                        <p>С:</p>
                        <input type="date" value={startDate} onChange={e => transformAndSetTimeData(e.target.value, 'start')} />
                        <p>по:</p>
                        <input type="date" value={endDate} onChange={e => transformAndSetTimeData(e.target.value, 'end')} />
                    </div>
                    <Table dateInterval={{startDate, endDate}}/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AllMarksPage