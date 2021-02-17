import axios from 'axios'

const GET_LOGS = 'GET_LOGS'
const SAVE_LOGS = 'SAVE_LOGS'

const initialState = {
  logsList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS: {
      return {
        ...state,
        logsList: action.data
      }
    }
    case SAVE_LOGS: {
      return {
        ...state,
        ...action.info
      }
    }
    default:
      return state
  }
}

export function getLogs() {
  return (dispatch) => {
    axios('/api/v1/logs')
      .then(({ data }) =>
        dispatch({
          type: GET_LOGS,
          data
        })
      )
      .catch(() => {})
  }
}

export function saveLogs(value) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `navigate to ${value} page`
      }
    })
      .then(({ info }) => {
        dispatch({
          type: SAVE_LOGS,
          info
        })
      })
      .catch((err) => console.log(err))}
}