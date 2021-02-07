import axios from 'axios'

const GET_LOGS = 'GET_LOGS'

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
