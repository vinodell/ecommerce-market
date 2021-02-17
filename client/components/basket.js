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
      return dispatch(updateAmount(item, '+'))
    }
    return dispatch(updateAmount(item, '-'))
  }
  return (
    <div className="bg-gray-300">

        <Header />
      {cart.map((item, index) => {
        return (
          <div key={item.id} className="m-2 border-4 border-gray-400">
            <div className="border-2 mx-2 my-2 rounded-full">{index + 1}</div>
            <div className="product__image">{item.image}</div>
            <div className="product__title">{item.title}</div>
            <div className="product__price">
              {(item.price * rate).toFixed(2)} {currency}
            </div>
            <div className="product__amount">
              amount:{typeof item === 'undefined' ? 0 : item.count}
            </div>
            <div className="product__total_price">
              sum: {(item.price * rate * item.count).toFixed(2)}
            </div>
            <button
              type="button"
              className="card__product-amount inline-block  bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              onClick={() => onClick(item, '-')}
            >
              remove
            </button>
            <button
              type="button"
              className="card__product-amount inline-block  bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              onClick={() => onClick(item, '+')}
            >
              add
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Basket
