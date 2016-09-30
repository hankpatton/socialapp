import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './CoreLayout.scss'
import '../../styles/core.scss'
import HeaderContainer from 'containers/HeaderContainer/HeaderContainer'
import Footer from 'components/Footer/Footer'

const cx = classNames.bind(styles)

class CoreLayout extends Component {
  static propTypes = {
  }

  render () {
    return (
      <div className={cx('core-layout')}>
        <HeaderContainer />
        <div style={{flex: 1}}>
          <div className={cx('container')}>
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
