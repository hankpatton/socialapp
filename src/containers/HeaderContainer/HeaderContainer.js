import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  selectors as postSelectors,
  actions as postActions
} from 'redux/modules/Posts'
import {
  selectors as authSelectors,
  actions as authActions
} from 'redux/modules/Auth'

import Header from 'components/Header/Header'

class HeaderContainer extends Component {
  static propTypes = {
    handleLogin: PropTypes.func,
    handleLogout: PropTypes.func,
    loggedIn: PropTypes.bool,
    profile: PropTypes.object,
    postCount: PropTypes.number,
    getPostCount: PropTypes.func
  }

  componentWillMount () {
    this.props.getPostCount()
  }

  render () {
    return (
      <Header {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  return {
    loggedIn: authSelectors.loggedIn(state),
    profile: authSelectors.profile(state),
    postCount: postSelectors.postCount(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    handleLogin: authActions.login,
    handleLogout: authActions.logout,
    getPostCount: postActions.getPostCount
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
