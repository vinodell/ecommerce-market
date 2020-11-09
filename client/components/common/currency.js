import React from 'react'
import { useDispatch } from 'react-redux'

import { setCurrency } from '../../redux/reducers/goods'

const Currency = () => {
  const dispatch = useDispatch()
  const setNominal = (currency) => dispatch(setCurrency(currency))
  return (
    <div>
      <button
        id="usd-button"
        type="button"
        className="mt-2 px-3 py-2 mx-2 bg-gray-600 border-2 t rounded-lg text-white"
        onClick={() => setNominal('USD')}
      >
        USD
      </button>
      <button
        id="usd-button"
        type="button"
        className="mt-2 px-3 py-2 mx-2 bg-gray-600 border-2 t rounded-lg text-white"
        onClick={() => setNominal('EUR')}
      >
        EUR
      </button>
      <button
        id="usd-button"
        type="button"
        className="mt-2 px-3 py-2 mx-2 bg-gray-600 border-2 t rounded-lg text-white"
        onClick={() => setNominal('CAD')}
      >
        CAD
      </button>
    </div>
  )
}

export default Currency
