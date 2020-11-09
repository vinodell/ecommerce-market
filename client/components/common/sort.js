import React from 'react'

const Sort = () => {
  const onClick = () => {}
  return (
    <div className="text-teal 100 font-bold">
      sort by
      <button
        type="button"
        id="sort-price"
        className="mt-2 px-3 mx-2 py-2 bg-gray-600 t border-2 border-gray-200 rounded-lg text-gray-300"
        onClick={onClick}
      >
        price
      </button>
      <button
        type="button"
        id="sort-name"
        className="mt-2 px-3 mx-2 py-2 bg-gray-600 t border-2 border-gray-200 rounded-lg text-gray-300"
        onClick={onClick}
      >
        ABC
      </button>
    </div>
  )
}

export default Sort
