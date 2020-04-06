export const SET_BEDRIJVEN = 'SET_BEDRIJVEN';
export const ADD_BEDRIJVEN = 'ADD_BEDRIJVEN';
export const BEDRIJF_ERROR = 'BEDRIJF_ERROR';
export const SET_BEDRIJF = 'SET_BEDRIJF'

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    console.log(response);
    let error = new Error(response.statusText);
    error.response = response.statusText;
    throw error;
  }
}

export function set(results) {
  return {
    type: SET_BEDRIJVEN,
    results
  }
}
export function setone(results) {
  return {
    type: SET_BEDRIJF,
    results
  }
}
export function add(results) {
  return {
    type: ADD_BEDRIJVEN,
    results
  }
}
export function authError(error) {
  return {
    type: BEDRIJF_ERROR,
    payload: error
  };
}
export function save(data) {
  return dispatch => {
    return fetch('/api/beheer/bedrijven', {
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

export function setfavo(data) {
  return dispatch => {
    return fetch('/api/beheer/bedrijven/setfavo', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        }
      }).then(handleResponse)
      .then(data => dispatch(set(data.data)))
      .catch(err =>
        dispatch(authError(err)));
  };
}

export function fetchbedrijven() {
  return dispatch => {
    fetch('/api/beheer/bedrijven', {
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

export function getfavo() {
  return dispatch => {
    fetch('/api/beheer/bedrijven/getfavo', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(res => res.json())
      .then(data => dispatch(setone(data.results)))
      .catch(err =>
        dispatch(authError(err)));
  };
}
