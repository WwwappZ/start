
export const SET_LOADING = 'SET_LOADING'


export function setone(results) {
  return {
    type: SET_LOADING,
    results
  }
}

export function loading (message) {
  return dispatch => {
  return dispatch(setone(message))
  }
}

export function message(time, soort, message) { 
  return dispatch => {
    return new Promise(resolve => {
     dispatch(setone({"message": message, soort:soort, actief: true }))
      setTimeout(() => {
      dispatch(setone({"message": message, soort:soort, actief: false }))
      resolve(true)
    }, time)
    })
    }
    
}
