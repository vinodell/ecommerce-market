import axios from 'axios'

const ADD_CART = 'ADD_CART'
const UPDATE_AMOUNT = 'UPDATE_AMOUNT'
const SET_SORT_BASKET = 'SET_SORT_BASKET'

const initialState = {
  cart: [],
  totalPrice: 0,
  totalAmount: 0
}

const setCount = (product, amount) => {
  if (typeof product !== 'undefined') {
    const count = product.count + amount
    return count
  }
  return 1
}

const sumOfItems = (cart) => {
  if (typeof cart !== 'undefined') {
    return cart.reduce((acc, rec) => acc + rec.count, 0)
  }
  return 0
}

const globalRePrice = (cart) => {
  const totalAmount = cart.reduce((acc, rec) => acc + rec.count, 0)
  const totalPrice = cart.reduce((acc, rec) => acc + rec.price * rec.count, 0)
  return { totalAmount, totalPrice }
}

const updateCart = (cart, item, payload = 1) => {
  const itemInCart = cart.find((cartItem) => cartItem.id === item.id)
  const newItem = {
    ...(typeof itemInCart !== 'undefined' ? itemInCart : item),
    count: setCount(itemInCart, payload)
  }
  const upCart = typeof itemInCart !== 'undefined' ? [...cart] : [...cart, newItem]
  const newCart = upCart.map((cartItem) => (cartItem.id === item.id ? newItem : cartItem))
  return newCart.filter((cartItem) => cartItem.count !== 0)
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART: {
      return {
        ...state,
        cart: updateCart(state.cart, action.item),
        totalAmount: sumOfItems(state.cart) + 1,
        totalPrice: state.totalPrice + action.item.price
      }
    }
    case UPDATE_AMOUNT: {
      const newCart = updateCart(state.cart, action.item, action.payload)
      const updatedState = {
        ...state,
        cart: [...newCart]
      }
      return {
        ...updatedState,
        ...globalRePrice(updatedState.cart)
      }
    }
    case SET_SORT_BASKET: {
      const sortedList = [...state.cart].sort((a, b) => {
        if (action.name === 'price') {
          if (a.price > b.price) return 1
          if (a.price < b.price) return -1
          return 0
        }
        if (a.title > b.title) return 1
        if (a.title < b.title) return -1
        return 0
      })
      if (action.sortType === false) {
        return {
          ...state,
          cart: sortedList.reverse()
        }
      }
      return {
        ...state,
        cart: sortedList
      }
    }
    default:
      return state
  }
}

export function sendBasket(item) {
  return (dispatch) => {
    dispatch({
      type: ADD_CART,
      item
    })
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `customer added ${item.title} to the cart`
      }
    }).catch((err) => console.log(err))
  }
}

export function updateAmount(item, change) {
  let payload = 1
  if (change === '-') {
    payload = -1
  }
  return (dispatch) => {
    dispatch({
      type: UPDATE_AMOUNT,
      item,
      payload
    })
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: change === '+' ? `customer added 1 ${item.title}` : `customer removed 1 ${item.title}`
      }
    }).catch((err) => console.log(err))
  }
}

export function setSortBasket(name, sortType) {
  return (dispatch) => {
    dispatch({
      type: SET_SORT_BASKET,
      sortType,
      name
    })
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `customer changed sort by ${name}`
      }
    }).catch((err) => console.log(err))
  }
}
