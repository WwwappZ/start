export const SET_LOGBOEKEN = 'SET_LOGBOEKEN';
export const ADD_LOGBOEKEN = 'ADD_LOGBOEKEN';
export const LOGBOEK_ERROR = 'LOGBOEK_ERROR';
export const SET_LOGBOEK = 'SET_LOGBOEK'

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response.statusText;
    throw error;
  }
}

export function set(results) {
  return {
    type: SET_LOGBOEKEN,
    results
  }
}
export function setone(results) {
  return {
    type: SET_LOGBOEK,
    results
  }
}
export function add(results) {
  return {
    type: ADD_LOGBOEKEN,
    results
  }
}
export function authError(error) {
  return {
    type: LOGBOEK_ERROR,
    payload: error
  };
}
export function save(data) {
  return dispatch => {
    return fetch('/api/admin/logboeken', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        }
      }).then(handleResponse)
      .then(data => dispatch(add(data)))
      .catch(err =>
        dispatch(authError(err)));
  };
}

export function fetch() {
  return dispatch => {
    fetch('/api/admin/logoeken', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(res => res.json())
      .then(data => dispatch(set(data.results)))
      .catch(err =>
        dispatch(authError(err)));
  };
}
