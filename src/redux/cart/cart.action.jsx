import { CartActionTypes } from './cart.type';

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
}) 

export const toggleCart = () => ({
  type: CartActionTypes.TOOGLE_CART
})