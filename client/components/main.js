import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Head from './head'
import Header from './header'
import Card from './common/card'
import { setGoods } from '../redux/reducers/goods'

const Main = () => {
  useEffect(() => {
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `navigate to main page`
      }
    }).catch(() => {})
    return () => {}
  }, [])
  const dispatch = useDispatch()
  const listStock = useSelector((s) => s.goods.list.slice(0, 10))
  useEffect(() => {
    dispatch(setGoods())
    return () => {}
  }, [dispatch])
  return (
    <div className="flex flex-col items-center">
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
