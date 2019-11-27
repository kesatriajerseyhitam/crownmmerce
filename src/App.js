import React from 'react';
import './App.css'

import Checkout  from './pages/checkout/checkout.component';
import CollectionPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions'
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentWillUnmount() {
    const { checkUserSession } = this.prop();
    checkUserSession();
  }

  render() {
    return (
      <div className='App'>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={CollectionPage} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/sign-in" render={() => 
            this.props.currentUser ? 
            (<Redirect to='/'/>) : 
            (<SignAndSignUp/>)
          }/>
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(App)