import React from 'react';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.component';
import SignAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import {Route, Switch} from 'react-router-dom';

import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={Shop} />
        <Route path="/sign-in" component={SignAndSignUp} />
      </Switch>
    </div>
  );
}

export default App;