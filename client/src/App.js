import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter'
import Header from './components/Header'
import Modal from './components/Modal'

function App() {
  const modalStatus = useSelector(state => state.addMarkModalStatus)

  return (
      <BrowserRouter>
        <Header />
        <AppRouter />
        {modalStatus && 
        <Modal modalStatus={modalStatus}/>}
      </BrowserRouter>
  );
}

export default App;
