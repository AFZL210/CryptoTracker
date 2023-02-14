import React from 'react';
import './App.css';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import CoinPage from './Pages/CoinPage'
import { makeStyles } from '@material-ui/core';

  const useStyle = makeStyles({
    App: {
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh'
    }
  })

function App() {

  const classes = useStyle();

  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/coin/:id' element={<CoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
