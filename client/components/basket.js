import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from './header'
import { updateAmount } from '../redux/reducers/basket'

const Basket = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector((s) => s.basket)
  const currency = useSelector((s) => s.goods.currency)
  const rate = useSelector((s) => s.goods.rates[s.goods.currency])
  const onClick = (item, ch) => {
    if (ch === '+') {
     return dispatch(updateAmount(item.id, '+'))
    }
     return dispatch(updateAmount(item.id, '-'))
  }
  return (
    <div>
      <div className="px-16 py-4 bg-gray-800 text-gray-200 font-bold"> basket-page
        <Header />
      </div>
      {Object.keys(cart).map((item, index) => {
      return (
        <div key={cart[item].id} className="m-2 border-4 border-gray-400">
          <div className="border-2 mx-2 my-2 rounded-full">{index + 1}</div>
          <div className="product__image">{cart[item].image}</div>
          <div className="product__title">{cart[item].title}</div>
          <div className="product__price">
            {(cart[item].price * rate).toFixed(2)} {currency}
          </div>
          <div className="product__amount">
            amount:{typeof cart[item] === 'undefined' ? 0 : cart[item].count}</div>
          <div className="product__total_price">
            sum: {(cart[item].price * rate * cart[item].count).toFixed(2)}
          </div>
          <button
            type="button"
            className="bg-red-300 border-2 border-gray-400 text-gray-900 font-bold rounded-full flex-justify-center px-2"
            onClick={() => onClick(cart[item], '-')}
          >
            remove
          </button>
          <button
            type="button"
            className="bg-red-300 border-2 border-gray-400 text-gray-900 font-bold rounded-full flex-justify-center px-2"
            onClick={() => onClick(cart[item], '+')}
          >
            add
          </button>
        </div>
      )})}
  </div>
  )
}

export default Basket
