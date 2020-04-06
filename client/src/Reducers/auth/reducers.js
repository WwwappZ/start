import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, AUTH_USER_PROFILE, AUTH_VERIFY, AUTH_TOKEN, SET_USERS, AUTH_WEBSITE_CONFIG} from './types';

export default function auth(state = {
  authenticated: false,
  admin_privileges: false,
  user: [],
  users:[],
  error: '',
  signupmsg: '',
  token: [],
  config: {}
}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: '',
        authenticated: true
      };
      case AUTH_TOKEN:
        return {
          ...state,
          token: action.token,
          authenticated: true
        };
    case AUTH_USER_PROFILE:
      return {
        ...state,
        error: '',
        user: action.user,
        authenticated: true
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        admin_privileges: false
      };
    case SET_USERS:
      return { ...state,
        users: action.user
      };
    case AUTH_WEBSITE_CONFIG:
      return { ...state,
        config: action.config
      };
    case AUTH_VERIFY:
      return {
        ...state,
        authenticated: false,
        admin_privileges: false,
        signupmsg: action.msg
      };
 // no default
  }

  return state;

}
