import { createSelector } from 'reselect'
import jwtDecode from 'jwt-decode'
import Auth0Lock from 'auth0-lock'

// Constants
export const constants = {
  LOGIN: 'Auth/LOGIN',
  LOGIN_SUCCESS: 'Auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'Auth/LOGIN_FAILURE',
  LOGOUT_SUCCESS: 'Auth/LOGOUT_SUCCESS'
}

function checkTokenExpiry () {
  let jwt = localStorage.getItem('idToken')
  if (jwt) {
    let jwtExp = jwtDecode(jwt).exp
    let expiryDate = new Date(0)
    expiryDate.setUTCSeconds(jwtExp)

    if (new Date() < expiryDate) {
      return true
    }
  }
  localStorage.removeItem('idToken')
  localStorage.removeItem('profile')
  return false
}

function getProfile () {
  return JSON.parse(localStorage.getItem('profile'))
}

// Action Creators
export const actions = {
  login () {
    const lock = new Auth0Lock('qrhOvu54WpqnUPiuhYyQsSlYrzSds7Oa', 'hpatton.auth0.com',
      {
        avatar: null,
        auth: { redirect: false }
      }
    )
    return (dispatch) => {
      lock.show()
      lock.on('authenticated', function (authResult) {
        lock.getProfile(authResult.idToken, function (error, profile) {
          dispatch({ type: constants.LOGIN })
          if (error) { dispatch({ type: constants.LOGIN_FAILURE, error }) }
          localStorage.setItem('idToken', authResult.idToken)
          localStorage.setItem('profile', JSON.stringify(profile))
          dispatch({ type: constants.LOGIN_SUCCESS, profile })
        })
        lock.hide()
      })
    }
  },
  logout () {
    return (dispatch) => {
      localStorage.removeItem('idToken')
      localStorage.removeItem('profile')
      dispatch({ type: constants.LOGOUT_SUCCESS })
    }
  }
}

// Reducer
const initialState = {
  isAuthenticated: checkTokenExpiry(),
  profile: getProfile(),
  loggingIn: false,
  loginError: null
}
export default function (state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN:
      return {
        ...state,
        loggingIn: true
      }
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        profile: action.profile,
        loggingIn: false
      }
    case constants.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        profile: null,
        loggingIn: false,
        loginError: action.error
      }
    case constants.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        profile: null,
        loggingIn: false,
        loginError: null
      }
    default:
      return state
  }
}

// Selectors
const getState = (state) => state.auth

export const selectors = {
  loggedIn: createSelector(getState, (state) =>
    state.isAuthenticated
  ),
  profile: createSelector(getState, (state) =>
    state.profile
  ),
  userId: createSelector(getState, (state) =>
    state.profile && state.profile.user_id
  ),
  userName: createSelector(getState, (state) =>
    state.profile && state.profile.name
  ),
  userImage: createSelector(getState, (state) =>
    state.profile && state.profile.picture
  )

}
