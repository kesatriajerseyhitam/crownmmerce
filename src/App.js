import React from 'react';
import './App.css'

import Checkout  from './pages/checkout/checkout.component';
import CollectionPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { setCurrentUser } from './redux/user/user.actions';
class App extends React.Component {
 unsubscribeFromAuth = null;
 
 componentDidMount() {
    const { setCurrentUser } = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //       });
    //     });
    //   }

    //   setCurrentUser(userAuth);
    // });
 }

 componentWillUnmount() {
   this.unsubscribeFromAuth();
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(App)