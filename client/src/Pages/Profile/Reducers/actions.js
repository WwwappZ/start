export const SET_PROFILE = "SET_PROFILE";
export const PROFILE_ERROR = "PROFILE_ERROR";
export const SET_PUSH = "SET_PUSH";

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response.statusText;
    throw error;
  }
}

export function resultError(error) {
  return {
    type: PROFILE_ERROR,
    payload: error
  };
}

export function set(results) {
  return {
    type: SET_PROFILE,
    results
  };
}
export function setpush(results) {
  return {
    type: SET_PUSH,
    results
  };
}
export function fetchprofile() {
  return dispatch => {
    return fetch("/api/admin/profile", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => dispatch(set(data.results)))
      .catch(err => dispatch(resultError(err)));
  };
}
export function fetchpush() {
  return dispatch => {
    return fetch("/api/admin/profile/push", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => dispatch(setpush(data.results)))
      .catch(err => dispatch(resultError(err)));
  };
}
export function save(data) {
  return dispatch => {
    return fetch("/api/beheer/bedrijven", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(handleResponse)
      .then(data => dispatch(set(data.results)))
      .catch(err => dispatch(resultError(err)));
  };
}

export function upload_profile_image(data) {
  return dispatch => {
    var formData = new FormData();    
    formData.append("file", data.file);    
    return fetch("/api/admin/profile/upload", {
      method: "post",
      body: formData,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(handleResponse)
      .then(data => dispatch(set(data.results)))
      .catch(err => dispatch(resultError(err)));
  };
}
export function UpdateProfile(data) {
  return dispatch => {
    return fetch("/api/admin/profile", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(handleResponse)
      .then(data => dispatch(set(data.results)))
      .catch(err =>
        dispatch(
          resultError({
            message: "Er is iets fout gegaan bij het opslaan van het profiel",
            error: err
          })
        )
      );
  };
}

export function UpdatePush(data) {
  return dispatch => {
    return fetch("/api/admin/profile/push", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(handleResponse)
      .then(data => dispatch(setpush(data.results)))
      .catch(err =>
        dispatch(
          resultError({
            message: "Er is iets fout gegaan bij het opslaan van het profiel",
            error: err
          })
        )
      );
  };
}
