import {AUTH_USER, AUTH_VERIFY, AUTH_ERROR, UNAUTH_USER, AUTH_USER_PROFILE, SET_USERS, AUTH_WEBSITE_CONFIG} from './types';

function handleResponse(response) {
  let error = new Error(response);
  if (response.ok) {
    return response.json();
  } else {
    if (response.statusText === "Unauthorized") {
      error.response = response;
    };
 
    error.response = response;
    throw response;
  }
}
export function config() {
  return async dispatch => {
    try {
      const response = await fetch('/api/config', {
        method: 'get',
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await handleResponse(response);
      dispatch({ type: AUTH_WEBSITE_CONFIG, config: data });
      return true;
    }
    catch (err) {
      return dispatch(authError("Om toegang te hebben moet je ingelogd zijn"));
    }
  }
}
export function Login(data) {
  return dispatch => {
    return fetch('/api/signin', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse).then(data => {
      dispatch({type: AUTH_USER, user: data});
      return data;
    }).catch((err) => {    
      dispatch(authError(err.statusText));
    });
  }
}

export function confirmationSms(data) {
  return dispatch => {
    return fetch('/api/signin/verification', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse).then(data => {
      dispatch({type: AUTH_USER, user: data});
      return data;
    }).catch((err) => {
      dispatch(authError(err.statusText));
    });
  }
}

export function signupUser(data) {
  return dispatch => {
    return fetch('/api/signup', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token')
      }
    }).then(handleResponse).then(data => {
      return true;
    }).catch(err => dispatch(authError(err.statusText)));
  }
}
export function getprofile() {
  return async dispatch => {
    try {
      const response = await fetch('/api/user', {
        method: 'get',
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        }
      });
      const data = await handleResponse(response);
      dispatch({ type: AUTH_USER_PROFILE, user: data.user });
      return true;
    }
    catch (err) {
      return dispatch(authError("Om toegang te hebben moet je ingelogd zijn"));
    }
  }
}

export function authError(error) {
  return {type: AUTH_ERROR, payload: error};
}
export function signoutUser() {
  return dispatch => {
    localStorage.removeItem('token');
    return {type: UNAUTH_USER};
  }
}
export function confirmationPost(data) {
  return dispatch => {
    return fetch('/api/signup/verification/' + data.code, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse).then(data => {
      dispatch({type: AUTH_VERIFY, msg: data.msg});
      return true;
    }).catch(err => dispatch(authError(err.statusText)));
  }
}
export function NewPassword(data) {
  return dispatch => {
    return fetch('/api/login/forget/verification', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse).then(data => {
      dispatch({type: AUTH_VERIFY, msg: data.msg});
      return true;
    }).catch(err => dispatch(authError(err.statusText)));
  }
}

export function NewPasswordlog(data) {
  return dispatch => {
    return fetch('/api/admin/profile/changepass', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token')
      }
    }).then(handleResponse).then(data => {
      dispatch({type: AUTH_VERIFY, msg: data.msg});
      return true;
    }).catch(err => dispatch(authError(err.statusText)));
  }
}

export function loginforget(data) {
  return dispatch => {
    return fetch('/api/signin/forget', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse).then(data => {
      dispatch({type: AUTH_VERIFY, msg: data.msg});
      return true;
    }).catch(err => dispatch(authError(err.statusText)));
  }
}

export function Sendmail(data) {
  return dispatch => {
    return fetch('/api/signin/sendvmail', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse).then(data => {
      dispatch({type: AUTH_VERIFY, msg: data.msg});
      return true;
    }).catch(err => dispatch(authError(err.statusText)));
  }
}

export function fetchusers() {
  return dispatch => {
    return fetch('/api/admin/users', {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token')
      }
    }).then(handleResponse).then(data => {
      dispatch({type: SET_USERS, user: data.results});
      return true;
    }).catch(err => dispatch(authError(err.statusText)));
  }
}


