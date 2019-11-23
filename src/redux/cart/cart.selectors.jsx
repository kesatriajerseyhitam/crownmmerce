import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems 
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItem => cartItem.reduce((accumulated, item) => accumulated + item.quantity, 0)
)

export const selectCartTotals = createSelector(
  [selectCartItems],
  cartItem => cartItem.reduce((accumelated, item) => accumelated + item.quantity * item.price, 0)
)