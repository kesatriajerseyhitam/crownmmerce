import React, { useContext } from 'react';
import './cart-icon.styles.scss';

import CartContext from '../../context/cart/cart.context';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';


const CartIcon = ({ itemCount }) => {
  const toggleHidden = useContext(CartContext);
  
  return (
    <div className='cart-icon' onClick={ toggleHidden }>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

export default connect(mapStateToProps)(CartIcon);
