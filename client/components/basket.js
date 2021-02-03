import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from './header'
import { updateAmount } from '../redux/reducers/basket'

const Basket = () => {
  useEffect(() => {
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `navigate to ${window.location.pathname} page`
      }
    }).catch((err) => console.log(err))
    return () => {}
  }, [])
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
    <div>
      <div className="px-16 py-4 bg-gray-800 text-gray-200 font-bold">
        {' '}
        basket-page
        <Header />
      </div>
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
              className="bg-red-300 border-2 border-gray-400 text-gray-900 font-bold rounded-full flex-justify-center px-2"
              onClick={() => onClick(item, '-')}
            >
              remove
            </button>
            <button
              type="button"
              className="bg-red-300 border-2 border-gray-400 text-gray-900 font-bold rounded-full flex-justify-center px-2"
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
