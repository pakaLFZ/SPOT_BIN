import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SAVE_USER_INFO,
  LOGOUT,
  CLOSENOTICE,
  SHOWNOTICE,
  GET_USER_DATA,
  SAVE_USER_LIST,
  CLEAR_USER_ELSE_DATA
} from "actions/user"
 

const initState = {
  loggedIn: false,
  authenticated: false,
  user: null,
  user_else: null,
  userList: null
}

export default function reducer (state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false
      }
    case SAVE_USER_INFO:
      return {
        ...state,
        user: action.data,
      }
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        name: '',
        user: null
      }
    case SHOWNOTICE:
      return {
        ...state,
        notice: [true],
      }
    case CLOSENOTICE:
      return {
        ...state,
        notice: false,
      }
    case GET_USER_DATA:
      return {
        ...state,
        user_else: action.data,
      }
    case CLEAR_USER_ELSE_DATA:
      return {
        ...state,
        user_else: null,
      }
    case SAVE_USER_LIST:
      return {
        ...state,
        userList: action.data,
      }
    default:
      return state
  }
}
