export const SET_BEDRIJVEN = 'SET_BEDRIJVEN';
export const ADD_BEDRIJVEN = 'ADD_BEDRIJVEN';
export const BEDRIJF_ERROR = 'BEDRIJF_ERROR';
export const SET_BEDRIJF = 'SET_BEDRIJF'

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
export function itemError(error) {
  return {
    type: BEDRIJF_ERROR,
    payload: error
  };
}

export function Savebedrijf(data) {
  return dispatch => {
    return fetch('/api/admin/bedrijven', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token')
      }
    }).then(handleResponse).then(results => {
      return dispatch(add(results));
    }).catch((err) => {
      return dispatch(itemError('Er is een fout opgetreden bij het insert database'));
    });
  };
}

export function editbedrijf(id, data) {
  return dispatch => {
    return fetch('/api/admin/bedrijven/'+id, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token')
      }
    }).then(handleResponse).then(results => {
      return dispatch(add(results));
    }).catch((err) => {
      return dispatch(itemError('Er is een fout opgetreden bij het insert database'));
    });
  };
}

export function fetchbedrijven() {
  return dispatch => {
    return fetch('/api/admin/bedrijven/', {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token')
      }
    }).then(handleResponse).then(results => {
      return dispatch(set(results.results));
    }).catch((err) => {
      return dispatch(itemError('Er is een fout opgetreden bij het insert database'));
    });
  };
}

export function getbedrijf(id) {
  return dispatch => {
    return fetch('/api/admin/bedrijven/'+id, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token')
      }
    }).then(handleResponse).then(results => {
      return dispatch(setone(results.results));
    }).catch((err) => {
      return dispatch(itemError('Er is een fout opgetreden bij het insert database'));
    });
  };
}
