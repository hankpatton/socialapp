import React from 'react'
import classNames from 'classnames/bind'
import styles from './Footer.scss'

const cx = classNames.bind(styles)

const propTypes = {
}

const Footer = (props) => {
  return (
    <div className={cx('footer')}>
      <div className={cx('copyright')}>
        Copyright © 2016 Sample App made from ReactReduxStarter.
      </div>
    </div>
  )
}

Footer.propTypes = propTypes
export default Footer
