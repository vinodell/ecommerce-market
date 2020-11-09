import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { sendBasket } from '../../redux/reducers/basket'

const Card = (props) => {
  const { info } = props
  const dispatch = useDispatch()
  const currency = useSelector((s) => s.goods.currency)
  const rate = useSelector((s) => s.goods.rates[s.goods.currency])
  const actualPrice = rate * info.price
  const productAmount = useSelector((s) => s.basket.cart[info.id])
  const onClick = () => {
    dispatch(sendBasket(info))
  }
  return (
    <div className="card flex flex-wrap h-40 justify-around items-center m-4 border-4 border-gray-500 px-2 py-2">
      <div className="card__image">{info.image}</div>
      <div className="card__price">{actualPrice.toFixed(2)}</div>
      <div className="currency">{currency}</div>
      <div className="card__title">{info.title}</div>
      <div className="card__product-amount text-gray-700">
        {typeof productAmount !== 'undefined' ? productAmount.count : 0}
      </div>
      <button
        type="button"
        className="card__product-amount border-2 border-gray-300 rounded-lg px-2 py-2"
        onClick={onClick}
      >
        Add
      </button>
    </div>
  )
}

export default Card
