import CART_ACTIONS from "../Actions/Cart_Actions"

export default function reducer(state,action){
    switch(action.type)
    {
      case CART_ACTIONS.ADD_TO_CART:
        return state?[...state,action.id]:[action.id]
      case CART_ACTIONS.REMOVE_FROM_CART:
        return state.filter(val=>val!=action.id)
      case CART_ACTIONS.CLEAR_CART:
        return state=[]
    }
  }