import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'
import styles from './Container.scss'

const cx = classNames.bind(styles)

const propTypes = {
  children: PropTypes.node,
  header: PropTypes.node
}

const Container = ({children, header}) => {
  return (
    <div className={cx('container')}>
      {header &&
        <div className={cx('container-header-container')}>
          {header}
        </div>
      }
      <div className={cx('container-content')}>
        {children}
      </div>
    </div>
  )
}

Container.propTypes = propTypes
export default Container
