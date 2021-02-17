import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useBeforeunload } from 'react-beforeunload'

import Sort from './common/sort'
import Order from './common/order'
import Currency from './common/currency'

import { saveCart } from '../redux/reducers/basket'

const Header = () => {
  const dispatch = useDispatch()
  const basket = useSelector((s) => s.basket)
  useEffect(() => {
    dispatch(saveCart(localStorage.getItem('save_cart')))
    return () => {}
  }, [])
  return (
    <div className="flex bg-gray-800 w-full justify-around p-2 text-gray-200 font-bold">
      {useBeforeunload(() => localStorage.setItem('save_cart', JSON.stringify(basket)))}
      <div className="text-gray-200" id="brand-name">
        <Link to="/">vinodel-market</Link>
      </div>
      <Sort />
      <Currency />
      <Order />
    </div>
  )
}

export default Header
