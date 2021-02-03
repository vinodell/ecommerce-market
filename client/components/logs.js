import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Logs = () => {
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
  return (
    <div>
      <div className="flex bg-teal-800 justify-around p-2 text-teal-200 font-bold text-xl">
        <Link to="/">vinodel-market</Link>
        <div id="brand-name">
          <Link to="/basket">order</Link>
        </div>
      </div>
      <div className="flex justify-center font-bold text-gray-800">this is Logs page</div>
    </div>
  )
}

export default Logs
