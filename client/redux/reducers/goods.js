import axios from 'axios'

const SET_LIST = 'SET_LIST'
const SET_CURRENCY = 'SET_CURRENCY'

const initialState = {
  list: [],
  rates: {
    USD: 1
  },
  currency: 'USD'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST: {
      return {
        ...state,
        list: action.data
      }
    }
    case SET_CURRENCY: {
      return {
        ...state,
        currency: action.currency,
        rates: action.rates
      }
    }
    default:
      return state
  }
}

export function setGoods() {
  return (dispatch) => {
    axios('/api/v1/goods').then(({ data }) => {
      dispatch({
        type: SET_LIST,
        data
      })
    })
  }
}

export function setCurrency(currency) {
  return (dispatch) => {
    axios(`https://api.exchangeratesapi.io/latest?base=USD`).then(({ data }) => {
      dispatch({
        type: SET_CURRENCY,
        currency,
        rates: data.rates
      })
    })
  }
}
