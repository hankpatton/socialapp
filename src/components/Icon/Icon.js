import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'
import styles from './Icon.scss'

const cx = classNames.bind(styles)

const SIZES = ['xs', 'sm', 'lg', 'xl']
const COLORS = ['gray-lt', 'danger', 'info']

const propTypes = {
  size: PropTypes.oneOf(SIZES),
  color: PropTypes.oneOf(COLORS),
  icon: PropTypes.string.isRequired,
  isBtn: PropTypes.bool
}

export const Icon = (props) => {
  const {
    size,
    color,
    icon,
    isBtn,
    ...iconProps
  } = props

  const componentClass = cx(
    'material-icons',
    'icon',
    {
      [`m-icon-${size}`]: size,
      [`m-icon-${color}`]: color,
      'icon-btn': isBtn
    }
  )

  return (
    <i className={componentClass} {...iconProps}>{icon}</i>
  )
}

Icon.propTypes = propTypes
export default Icon
