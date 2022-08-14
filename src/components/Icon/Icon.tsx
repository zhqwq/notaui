import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { FC } from 'react'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  /**
   * 颜色主题
   */
  theme?: ThemeProps
}

/**
 * 基于 FontAwesomeIcon 的图标
 */
const Icon: FC<IconProps> = ({className, theme, ...rest}) => {
  const classes = classNames('icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...rest}/>
  )
}

export default Icon