import axios from 'axios'

const SET_LIST = 'SET_LIST'
const SET_CURRENCY = 'SET_CURRENCY'
const SET_SORT = 'SET_SORT'

const initialState = {
  list: [],
  rates: {
    USD: 1
  },
  currency: 'USD',
  sortType: true
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
    case SET_SORT: {
      const sortedList = [...state.list].sort((a, b) => {
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
          list: sortedList.reverse()
        }
      }
      return {
        ...state,
        list: sortedList
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

export function setSort(name, sortType) {
  return {
    type: SET_SORT,
    sortType,
    name
  }
}