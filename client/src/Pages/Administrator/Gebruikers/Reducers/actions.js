export const SET_GEBRUIKERS = 'SET_GEBRUIKERS';
export const GEBRUIKER_ERROR = 'GEBRUIKER_ERROR';
export const SET_GEBRUIKER = 'SET_GEBRUIKER'
export const ADD_GEBRUIKERS = 'ADD_GEBRUIKERS'
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
    type: SET_GEBRUIKERS,
    results
  }
}
export function setone(results) {
  return {
    type: SET_GEBRUIKER,
    results
  }
}

export function itemError(error) {
  return {
    type: GEBRUIKER_ERROR,
    payload: error
  };
}

export function save(data) {
  return dispatch => {
    return fetch('/api/admin/gebruikers', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token')
      }
    }).then(handleResponse).then(results => {
      return dispatch(setone(results));
    }).catch((err) => {
      return dispatch(itemError('Er is een fout opgetreden bij het insert database'));
    });
  };
}

export function update(id, data) {
  return dispatch => {
    return fetch('/api/admin/gebruikers/'+id, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token')
      }
    }).then(handleResponse).then(results => {
      return dispatch(setone(results));
    }).catch((err) => {
      return dispatch(itemError('Er is een fout opgetreden bij het insert database'));
    });
  };
}

export function get() {
  return dispatch => {
    return fetch('/api/admin/gebruikers/', {
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

export function getone(id) {
  return dispatch => {
    return fetch('/api/admin/gebruikers/'+id, {
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
