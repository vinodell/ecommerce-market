const ADD_CART = 'ADD_CART'
const UPDATE_AMOUNT = 'UPDATE_AMOUNT'

const initialState = {
  cart: {},
  totalPrice: 0,
  totalAmount: 0,
  count: 0
}

const removeDuplets = (cart) => {
  if (typeof cart !== 'undefined') {
    const count = cart.count + 1
    return count
  }
  return 1
}

const sumAmount = (cart) => {
  if (typeof cart !== 'undefined') {
    return Object.keys(cart).reduce((acc, rec) => acc + cart[rec].count, 0)
  }
  return 0
}

const globalReCount = (cart) => {
  const totalAmount = Object.keys(cart).reduce((acc, rec) => {
    console.log('LOOOK HERE cart[rec]', cart[rec])
    console.log('LOOOK HERE cart[rec].count', cart[rec].count)
    return acc + cart[rec].count
  }, 0)
  const totalPrice = Object.keys(cart).reduce(
    (acc, rec) => acc + cart[rec].price * cart[rec].count,
    0
  )
  return { totalAmount, totalPrice }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART: {
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.item.id]: {
            ...action.item,
            count: removeDuplets(state.cart[action.item.id])
          }
        },
        totalAmount: sumAmount(state.cart) + 1,
        totalPrice: state.totalPrice + action.item.price
      }
    }
    case UPDATE_AMOUNT: {
      const reCount = state.cart[action.id].count + action.payload
      const reCart = Object.keys(state.cart).reduce((acc, rec) => {
        if (rec !== action.id) {
          // console.log('acc:', acc, 'rec:', rec)
          // console.log('Object.keys', Object.keys(state.cart))
          return { ...acc, [rec]: state.cart[rec] }
        }
        return { ...acc }
      }, {})
      if (reCount < 0) {
        return {
          ...state,
          cart: reCart,
          ...globalReCount(state.cart)
        }
      }
        const updatedState = {
        ...state,
        cart: {
          ...state.cart,
          [action.id]: {
            ...state.cart[action.id],
            count: reCount
          }
        }}
        return {
          ...updatedState,
          ...globalReCount(updatedState.cart)
        }
    }
    default:
      return state
  }
}

export function sendBasket(item) {
  return {
    type: ADD_CART,
    item
  }
}

export function updateAmount(id, change) {
  let payload = 0
  if (change === '+') {
    payload = 1
  }
  if (change === '-') {
    payload = -1
  }
  return {
    type: UPDATE_AMOUNT,
    id,
    payload
  }
}
