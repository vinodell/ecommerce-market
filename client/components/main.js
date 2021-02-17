import React from 'react'
import { useSelector } from 'react-redux'

import Head from './head'
import Header from './header'
import Card from './common/card'

const Main = () => {
  const listStock = useSelector((s) => s.goods.list.slice(0, 10))
  return (
    <div className="flex flex-col items-center bg-gray-400">
      <Head title="Main" />
      <Header />
      <div className="flex flex-wrap justify-evenly w-11/12">
        {listStock.map((item) => {
          return (
            <div key={item.id} className="flex-auto max-w-xs m-2">
              <Card info={item} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
