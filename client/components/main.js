import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Head from './head'
import Header from './header'
import Card from './common/card'
import { setGoods } from '../redux/reducers/goods'

const Main = () => {
  const dispatch = useDispatch()
  const listStock = useSelector((s) => s.goods.list.slice(0, 10))
  useEffect(() => {
    dispatch(setGoods())
    return () => {}
  }, [dispatch])
  return (
    <div>
      <Head title="Hello" />
      <Header />
      {listStock.map((item) => {
        return (
          <div key={item.id} className="m-2">
            <Card info={item} />
          </div>
        )
      })}
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
