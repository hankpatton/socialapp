import { fromJS, List, Map } from 'immutable'
import { normalize, Schema, arrayOf } from 'normalizr'
import { createSelector } from 'reselect'
import { get, post, put, del } from 'utils/fetchUtils'

// Schemas
const postSchema = new Schema('posts', { idAttribute: 'id' })
const arrayOfPosts = arrayOf(postSchema)
const commentSchema = new Schema('comments', { idAttribute: 'id' })
const likeSchema = new Schema('likes', { idAttribute: 'id' })
const userSchema = new Schema('users', { idAttribute: 'id' })

postSchema.define({
  comments: arrayOf(commentSchema),
  likes: arrayOf(likeSchema),
  user: userSchema
})

// Constants
export const constants = {
  // Fetch Posts
  POSTS_FETCH: 'Posts/FETCH',
  POSTS_RECEIVE: 'Posts/RECEIVE',
  POSTS_FETCH_FAILURE: 'Posts/FETCH_FAILURE',
  // Fetch Post
  POST_FETCH: 'Posts/POST_FETCH',
  POST_RECEIVE: 'Posts/POST_RECEIVE',
  POST_FETCH_FAILURE: 'Posts/POST_FETCH_FAILURE',
  // Add Post
  POST_ADD: 'Posts/ADD',
  POST_ADD_SUCCESS: 'Posts/ADD_SUCCESS',
  TOGGLE_ADD_POST_FORM: 'Posts/TOGGLE_ADD_POST_FORM',
  // Delete Post
  POST_DELETE: 'Posts/POST_DELETE',
  POST_DELETE_SUCCESS: 'Posts/POST_DELETE_SUCCESS',
  POST_DELETE_FAILURE: 'Posts/POST_DELETE_FAILURE',
  // Add Comment
  COMMENT_ADD: 'Posts/COMMENT_ADD',
  COMMENT_ADD_SUCCESS: 'Posts/COMMENT_ADD_SUCCESS',
  COMMENT_ADD_FAILURE: 'Posts/COMMENT_ADD_FAILURE',
  // Delete Comment
  COMMENT_DELETE: 'Posts/COMMENT_DELETE',
  COMMENT_DELETE_SUCCESS: 'Posts/COMMENT_DELETE_SUCCESS',
  COMMENT_DELETE_FAILURE: 'Posts/COMMENT_DELETE_FAILURE',
  // Add Like
  LIKE_ADD: 'Posts/LIKE_ADD',
  LIKE_ADD_SUCCESS: 'Posts/LIKE_ADD_SUCCESS',
  LIKE_ADD_FAILURE: 'Posts/LIKE_ADD_FAILURE',
  // Delete Like
  LIKE_DELETE: 'Posts/LIKE_DELETE',
  LIKE_DELETE_SUCCESS: 'Posts/LIKE_DELETE_SUCCESS',
  // Edit Post
  POST_TOGGLE_EDIT: 'Posts/POST_TOGGLE_EDIT',
  POST_EDIT: 'POSTS/POST_EDIT',
  POST_EDIT_SUCCESS: 'Posts/POST_EDIT_SUCCESS',
  POST_EDIT_FAILURE: 'Posts/POST_EDIT_FAILURE',
  // Edit Comment// Edit Post
  COMMENT_SET_ID: 'Posts/COMMENT_SET_ID',
  COMMENT_CLEAR_ID: 'Posts/COMMENT_CLEAR_ID',
  COMMENT_EDIT: 'POSTS/COMMENT_EDIT',
  COMMENT_EDIT_SUCCESS: 'Posts/COMMENT_EDIT_SUCCESS',
  COMMENT_EDIT_FAILURE: 'Posts/COMMENT_EDIT_FAILURE',
  // Post Count
  POST_COUNT_SUCCESS: 'Posts/POST_COUNT_SUCCESS'
}

// Action Creators
export const actions = {
  fetchPosts () {
    return async (dispatch) => {
      dispatch({ type: constants.POSTS_FETCH })
      try {
        const data = await get('posts')
        dispatch({ type: constants.POSTS_RECEIVE, data: normalize(data, arrayOfPosts) })
      } catch (error) {
        dispatch({ type: constants.POSTS_FETCH_FAILURE, error })
      }
    }
  },
  fetchPost (postId) {
    return async (dispatch) => {
      dispatch({ type: constants.POST_FETCH })
      try {
        const data = await get(`posts/${postId}`)
        dispatch({ type: constants.POST_RECEIVE, data: normalize(data, postSchema) })
      } catch (error) {
        dispatch({ type: constants.POST_FETCH_FAILURE, error })
      }
    }
  },
  addPost (text, user) {
    return async (dispatch) => {
      dispatch({ type: constants.POST_ADD })
      try {
        const payload = {
          'user': { 'id': user.user_id, 'name': user.name },
          text
        }
        const data = await post('posts')(payload)
        dispatch({ type: constants.POST_ADD_SUCCESS, data: normalize(data, postSchema) })
      } catch (error) {
        console.log(error)
      }
    }
  },
  deletePost (id) {
    return async (dispatch) => {
      dispatch({ type: constants.POST_DELETE })
      try {
        const data = await del(`posts/${id}`)
        dispatch({ type: constants.POST_DELETE_SUCCESS, id, data })
      } catch (error) {
        dispatch({ type: constants.POST_DELETE_FAILURE, error })
      }
    }
  },
  toggleAddPostForm () {
    return { type: constants.TOGGLE_ADD_POST_FORM }
  },
  addLike (postId, userId, userName) {
    return async (dispatch) => {
      dispatch({ type: constants.LIKE_ADD })
      try {
        const payload = {
          'post': { 'id': postId },
          'user': { 'id': userId, 'name': userName }
        }
        const data = await post('likes')(payload)
        dispatch({ type: constants.LIKE_ADD_SUCCESS, postId, data })
      } catch (error) {
        dispatch({ type: constants.LIKE_ADD_FAILURE, error })
      }
    }
  },
  deleteLike (id, postId) {
    return async (dispatch) => {
      dispatch({ type: constants.LIKE_DELETE })
      try {
        const data = await del(`likes/${id}`)
        dispatch({ type: constants.LIKE_DELETE_SUCCESS, data, id, postId })
      } catch (error) {
        dispatch({ type: constants.LIKE_DELETE_FAILURE, error })
      }
    }
  },
  toggleEditPost () {
    return { type: constants.POST_TOGGLE_EDIT }
  },
  editPost (text, id) {
    return async (dispatch) => {
      dispatch({ type: constants.POST_EDIT })
      try {
        const data = await put(`posts/${id}`)({text: text})
        dispatch({ type: constants.POST_EDIT_SUCCESS, id, data })
      } catch (error) {
        console.log(error)
        dispatch({ type: constants.POST_EDIT_FAILURE, error })
      }
    }
  },
  getPostCount () {
    return async (dispatch) => {
      try {
        const data = await get('posts/posts/count')
        dispatch({ type: constants.POST_COUNT_SUCCESS, data })
      } catch (error) {
        console.log(error)
      }
    }
  },
  addComment (postId, text, user) {
    return async (dispatch) => {
      dispatch({ type: constants.COMMENT_ADD })
      try {
        const payload = {
          'post': { 'id': postId },
          'user': { 'id': user.user_id, 'name': user.name, 'image': user.picture },
          'text': text
        }
        const data = await post('comments')(payload)
        dispatch({ type: constants.COMMENT_ADD_SUCCESS, postId, data })
      } catch (error) {
        dispatch({ type: constants.COMMENT_ADD_FAILURE, error })
      }
    }
  },
  deleteComment (id, postId) {
    return async (dispatch) => {
      dispatch({ type: constants.COMMENT_DELETE })
      try {
        const data = await del(`comments/${id}`)
        dispatch({ type: constants.COMMENT_DELETE_SUCCESS, postId, data })
      } catch (error) {
        dispatch({ type: constants.COMMENT_DELETE_FAILURE, error })
      }
    }
  },
  editComment (text, id) {
    return async (dispatch) => {
      dispatch({ type: constants.COMMENT_EDIT })
      try {
        const data = await put(`comments/${id}`)({text: text})
        dispatch({ type: constants.COMMENT_EDIT_SUCCESS, id, data })
      } catch (error) {
        dispatch({ type: constants.COMMENT_EDIT_FAILURE, error })
      }
    }
  },
  setEditCommentId (id) {
    return { type: constants.COMMENT_SET_ID, id }
  },
  clearEditCommentId () {
    return { type: constants.COMMENT_CLEAR_ID }
  }
}

// Reducer
const initialState = fromJS({
  fetching: false,
  fetchError: null,
  adding: false,
  editing: false,
  deleting: false,
  error: null,
  data: {
    posts: {},
    postsById: [],
    likes: {},
    comments: {}
  },
  postCount: 0,
  addPostFormOpen: false,
  editPostFormOpen: false,
  editCommentId: null
})

export default function (state = initialState, action) {
  switch (action.type) {
    // Posts Fetching
    case constants.POSTS_FETCH:
      return state
        .set('fetching', true)
        .set('fetchError', null)
    case constants.POSTS_RECEIVE:
      return state
        .set('fetching', false)
        .set('adding', false)
        .set('data', fromJS(action.data.entities))
        .setIn(['data', 'postsById'], fromJS(action.data.result))
    case constants.POSTS_FETCH_FAILURE:
      return state
        .set('fetching', false)
        .set('fetchError', action.error)
    // Post Fetching
    case constants.POST_FETCH:
      return state
        .set('fetching', true)
        .set('fetchError', null)
    case constants.POST_RECEIVE:
      return state
        .set('fetching', false)
        .set('adding', false)
        .set('data', fromJS(action.data.entities))
        .setIn(['data', 'postsById'], fromJS([action.data.result]))
    case constants.POST_FETCH_FAILURE:
      return state
        .set('fetching', false)
        .set('fetchError', action.error)
    case constants.POST_COUNT_SUCCESS:
      return state
        .set('postCount', action.data.count)
    // Post Adding
    case constants.POST_ADD:
      return state
        .set('adding', true)
    case constants.POST_ADD_SUCCESS:
      return state
        .set('adding', false)
        .set('addPostFormOpen', false)
        .setIn(['data', 'posts', action.data.result], fromJS(action.data.entities.posts[action.data.result]))
        .updateIn(['data', 'postsById'], (posts) => posts.insert(0, fromJS(action.data.result)))
        .update('postCount', (count) => count + 1)
        .setIn(['data', 'posts', action.data.result, 'comments'], List())
        .setIn(['data', 'posts', action.data.result, 'likes'], List())
    case constants.TOGGLE_ADD_POST_FORM:
      return state
        .update('addPostFormOpen', (isOpen) => !isOpen)
    // Post Editing
    case constants.POST_EDIT:
      return state
        .set('editing', true)
        .set('error', null)
    case constants.POST_EDIT_SUCCESS:
      return state
        .setIn(['data', 'posts', action.id, 'text'], action.data.text)
        .set('editPostFormOpen', false)
    case constants.POST_EDIT_FAILURE:
      return state
        .set('editing', false)
        .set('error', action.error)
    case constants.POST_TOGGLE_EDIT:
      return state
        .update('editPostFormOpen', (isOpen) => !isOpen)
    // Post Deleting
    case constants.POST_DELETE:
      return state
        .set('deleting', true)
    case constants.POST_DELETE_SUCCESS:
      return state
        .set('deleting', false)
        .updateIn(['data', 'postsById'], (posts) => posts.filterNot((post) => post === action.id))
        .update('postCount', (count) => count - 1)
        .deleteIn(['data', 'posts', action.id])
    case constants.POST_DELETE_FAILURE:
      return state
        .set('deleting', false)
        .set('error', action.error)
    // Like Adding
    case constants.LIKE_ADD:
      return state
        .set('adding', true)
        .set('error', null)
    case constants.LIKE_ADD_SUCCESS:
      return state
        .setIn(['data', 'likes', action.data.id], fromJS(action.data))
        .updateIn(['data', 'posts', action.postId, 'likes'], (likes) => likes.insert(0, fromJS(action.data.id)))
        .updateIn(['data', 'posts', action.postId, 'like_count'], (count) => count + 1)
    case constants.LIKE_ADD_FAILURE:
      return state
        .set('adding', false)
        .set('error', action.error)
    // Like Deleting
    case constants.LIKE_DELETE:
      return state
        .set('deleting', true)
        .set('error', null)
    case constants.LIKE_DELETE_SUCCESS:
      return state
        .deleteIn(['data', 'likes', action.id])
        .updateIn(['data', 'posts', action.postId, 'like_count'], (count) => count - 1)
    case constants.LIKE_DELETE_FAILURE:
      return state
        .set('delete', false)
        .set('error', action.error)
    // Comment Adding
    case constants.COMMENT_ADD:
      return state
        .set('adding', true)
        .set('error', null)
    case constants.COMMENT_ADD_SUCCESS:
      return state
        .setIn(['data', 'comments', action.data.id], fromJS(action.data))
        .updateIn(['data', 'posts', action.postId, 'comment_count'], (count) => count + 1)
    case constants.COMMENT_ADD_FAILURE:
      return state
        .set('adding', false)
        .set('error', action.error)
    // Comment Deleting
    case constants.COMMENT_DELETE:
      return state
        .set('deleting', true)
        .set('error', null)
    case constants.COMMENT_DELETE_SUCCESS:
      return state
        .deleteIn(['data', 'comments', action.data.id])
        .updateIn(['data', 'posts', action.postId, 'comment_count'], (count) => count - 1)
    case constants.COMMENT_DELETE_FAILURE:
      return state
        .set('delete', false)
        .set('error', action.error)
      // Comment Editing
    case constants.COMMENT_EDIT:
      return state
        .set('editing', true)
        .set('error', null)
    case constants.COMMENT_EDIT_SUCCESS:
      return state
        .setIn(['data', 'comments', action.data.id, 'text'], action.data.text)
        .set('editCommentId', null)
    case constants.COMMENT_EDIT_FAILURE:
      return state
        .set('editing', false)
        .set('error', action.error)
    case constants.COMMENT_SET_ID:
      return state
        .set('editCommentId', action.id)
    case constants.COMMENT_CLEAR_ID:
      return state
        .set('editCommentId', fromJS(null))
    default:
      return state
  }
}

// Selectors
const getState = (state) => state.posts

export const selectors = {
  loading: createSelector(getState, (state) =>
    state.get('fetching')
  ),
  // Get Posts
  posts: createSelector(getState, (state) =>
    state
      .getIn(['data', 'postsById'])
      .map(id => state.getIn(['data', 'posts', id]))
  ),
  // Get Post
  post: (postId) => createSelector(getState, (state) =>
    state
      .getIn(['data', 'posts', postId]) || Map()
  ),
  // Get Post Count
  postCount: createSelector(getState, (state) =>
    state.get('postCount')
  ),
  // Get Post Form Open State
  addPostFormOpen: createSelector(getState, (state) =>
    state.get('addPostFormOpen')
  ),
  // Get Edit Post Form Open State
  editPostFormOpen: createSelector(getState, (state) =>
    state.get('editPostFormOpen')
  ),
  // Get Likes
  likes: createSelector(getState, (state) =>
    state.getIn(['data', 'likes']) || Map()
  ),
  // Get Like IDs
  likeId: (postId, userId) => createSelector(getState, (state) => {
    const likeMap = state.getIn(['data', 'likes']) || Map()
    return likeMap
      .filter((like) => like.getIn(['post', 'id']) === postId && like.getIn(['user', 'id']) === userId).keySeq().first()
  }),
  // Get Users Likes
  userLikedPosts: (userId) => createSelector(getState, (state) => {
    const likes = state.getIn(['data', 'likes']) || Map()
    return likes
      .filter((like) => like.getIn(['user', 'id']) === userId)
      .map((posts) => posts.getIn(['post', 'id']))
      .toSet()
  }),
  // Get Comments
  comments: createSelector(getState, (state) => {
    const comments = state.getIn(['data', 'comments']) || Map()
    return comments.toList()
  }),
  // Get Comment Edit ID
  editCommentId: createSelector(getState, (state) =>
    state.get('editCommentId')
  )
}
