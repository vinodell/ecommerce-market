import React from 'react'
import { Link } from 'react-router-dom'

import Sort from './common/sort'
import Order from './common/order'
import Currency from './common/currency'

const Header = () => {
  return (
    <div className="flex bg-gray-800 w-full justify-around p-2 text-gray-200 font-bold">
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
