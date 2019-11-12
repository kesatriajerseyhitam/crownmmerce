import { CartActionTypes } from './cart.type';
import { addItemToCart } from './cart.utils';
import { removeItem } from './cart.action';

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      }
    case CartActionTypes.CLEAR_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
      }
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItem(state.cartItems, action.payload)
      }
    case CartActionTypes.TOOGLE_CART:
      return {
        ...state,
        hidden: !state.hidden
      };
    default:
      return state;
  }
}

export default cartReducer