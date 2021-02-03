import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setSort } from '../../redux/reducers/goods'
import { setSortBasket } from '../../redux/reducers/basket'

const Sort = () => {
  const [toggled, setToggle] = useState(true)
  const [icon, setIcon] = useState('')
  const [push, activatePush] = useState('')
  const dispatch = useDispatch()
  const onClick = (sortType) => {
    return () => {
      setToggle(!toggled)
      setIcon(toggled ? '↥' : '↧')
      activatePush(sortType)
      dispatch(setSort(sortType, toggled))
      dispatch(setSortBasket(sortType, toggled))
    }
  }
  return (
    <div className="text-teal 100 font-bold">
      sort by
      <button
        type="button"
        id="sort-price"
        className="mt-2 px-3 mx-2 py-2 bg-gray-600 t border-2 border-gray-200 rounded-lg text-gray-300"
        onClick={onClick('price')}
      >
        price {push === 'price' && icon}
      </button>
      <button
        type="button"
        id="sort-name"
        className="mt-2 px-3 mx-2 py-2 bg-gray-600 t border-2 border-gray-200 rounded-lg text-gray-300"
        onClick={onClick('abc')}
      >
        ABC {push === 'abc' && icon}
      </button>
    </div>
  )
}

export default Sort
