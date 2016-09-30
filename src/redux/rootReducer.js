import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import posts from './modules/Posts'
import auth from './modules/Auth'


export default combineReducers({
  router,
  auth,
  posts,
  form: formReducer
})
