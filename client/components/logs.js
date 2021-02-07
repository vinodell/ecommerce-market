import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { getLogs } from '../redux/reducers/logs'

const Logs = () => {
  const dispatch = useDispatch()
  const { logsList } = useSelector((s) => s.logs)
  const onClick = () => {
    axios({
      method: 'delete',
      url: '/api/v1/logs'
    })
  }
  useEffect(() => {
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `navigate to ${window.location.pathname} page`
      }
    }).catch((err) => console.log(err))
    return () => {}
  }, [])
  useEffect(() => {
    dispatch(getLogs())
    return () => {}
  }, [dispatch])
  return (
    <div>
      <div className="flex bg-teal-800 justify-around p-2 text-teal-200 font-bold text-xl">
        <Link to="/">vinodel-market</Link>
        <div id="brand-name">
          <Link to="/basket">order</Link>
        </div>
        <div>
          <button type="button" onClick={onClick}>
            delete logs
          </button>
          <div className="text-sm">logs amount: {logsList.length}</div>
        </div>
      </div>
      <div className="flex justify-center font-bold text-gray-800">this is Logs page</div>
      {logsList.map((item) => {
        return (
          <div key={item.time} className="flex flex-col bg-gray-100 mx-4">
            customer at {new Date(item.time).toISOString()} - {item.action}
          </div>
        )
      })}
    </div>
  )
}

export default Logs
