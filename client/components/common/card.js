import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { sendBasket } from '../../redux/reducers/basket'

const Card = (props) => {
  const { info } = props
  const dispatch = useDispatch()
  const currency = useSelector((s) => s.goods.currency)
  const rate = useSelector((s) => s.goods.rates[s.goods.currency])
  const actualPrice = rate * info.price
  const productAmount = useSelector((s) => s.basket.cart).find((item) => item.id === info.id)
  const onClick = () => {
    dispatch(sendBasket(info))
  }
  return (
    <div className="flex flex-col card min-w-full max-w-xs rounded overflow-hidden shadow-lg">
      <img className="card__image w-full object-cover h-40" src={info.image} alt={info.title} />
      <div className="px-6 px-4">
        <div className="flex justify-center items-end">
          <div className="card__price text-gray-700 text-lg">{actualPrice.toFixed(2)}</div>
          <div className="currency text-gray-700 ml-2 text-sm">-{currency}</div>
        </div>
        <div className="card__title text-center font-bold text-xl mb-2">{info.title}</div>
        <div className="card__product-amount text-gray-700">
          {typeof productAmount !== 'undefined' ? productAmount.count : 0}
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          type="button"
          className="card__product-amount inline-block  bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
          onClick={onClick}
        >
          Add +
        </button>
      </div>
    </div>
  )
}

export default Card
