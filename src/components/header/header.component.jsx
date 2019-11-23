import React from 'react';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header.styles';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils'

import { createStructuredSelector } from 'reselect';

import CartIcon from './../cart-icon/cart-icon.component';
import CartDropdown from './../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from './../../redux/user/user.selectors';

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo className="logo"/>
      </LogoContainer>
      <OptionsContainer>
        <OptionLink className="option" to="/shop">
          SHOP
        </OptionLink>
        <OptionLink className="option" to="/contact">
          CONTACT
        </OptionLink>
        {
          currentUser ?
          <OptionDiv className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </OptionDiv>
          :
          <OptionLink className="option" to="/sign-in">
            SIGN IN
          </OptionLink>
        }
        <CartIcon />
      </OptionsContainer>
      {
        hidden ? null : <CartDropdown/>
      }
    </HeaderContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)
