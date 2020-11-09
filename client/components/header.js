import React from 'react'
import { Link } from 'react-router-dom'

import Sort from './common/sort'
import Order from './common/order'
import Currency from './common/currency'

const Header = () => {
  return (
    <div className="flex bg-teal-800 justify-around p-2 text-teal-200 font-bold">
      <div className="text-teal-200" id="brand-name">
        <Link to="/">vinodel-market</Link>
      </div>
      <Sort />
      <Currency />
      <Order />
      <div id="order-count">
        <Link to="/basket">order</Link>
      </div>
    </div>
  )
}

export default Header
