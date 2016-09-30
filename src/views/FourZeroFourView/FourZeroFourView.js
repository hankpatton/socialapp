import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './FourZeroFourView.scss'

import Container from 'components/Container/Container'

const cx = classNames.bind(styles)

class FourZeroFour extends Component {

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-lg-12 col-xl-10 offset-xl-1'>
            <Container>
              <div className={cx('error-container')}>
                <div className={cx('error-status')}>404</div>
                <div className={cx('error-message')}>Tap my photo to return home.</div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}

export default FourZeroFour
