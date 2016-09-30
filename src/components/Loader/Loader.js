import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'
import styles from './Loader.scss'

const cx = classNames.bind(styles)

const propTypes = {
  children: PropTypes.node,
  header: PropTypes.node,
  loaderStyle: PropTypes.object
}

const Loader = ({loaderStyle}) => {
  return (
    <div className={cx('loader')} style={loaderStyle}>
      <div className={cx('spinner')}>
        <div className={cx('bounce1')} />
        <div className={cx('bounce2')} />
        <div className={cx('bounce3')} />
      </div>
    </div>
  )
}

Loader.propTypes = propTypes
export default Loader
