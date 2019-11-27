import React from 'react';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header.styles';

import CartDropdown from './../cart-dropdown/cart-dropdown.component';
import CartIcon from './../cart-icon/cart-icon.component';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { signOutStart } from './../../redux/user/user.actions';

const Header = ({ currentUser, hidden, signOutStart }) => {
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
          <OptionDiv className='option' onClick={() => signOutStart()}>
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

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart()),
})


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
