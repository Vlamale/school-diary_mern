import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter'
import Header from './components/Header'
import Modal from './components/Modal'
import { useTypedSelector } from './redux/hooks/useTypedSelector';

const App:React.FC = () => {
  const modalStatus = useTypedSelector(state => state.addMarkModalStatus)

  if (modalStatus) {
    return (
      <Modal modalStatus={modalStatus}/>
    )
  }
  
  return (
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
  );
}

export default App;
