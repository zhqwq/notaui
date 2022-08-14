import classNames from 'classnames'
import React, { FC, useContext } from 'react'
import { MenuContext } from './Menu'

export interface MenuItemProps {
  /**
   * 类名
   */
  className?: string
  /**
   * 样式
   */
  style?: React.CSSProperties,
  /**
   * 子元素
   */
  children?: React.ReactNode,
  /**
   * 序号
   */
  index?: string
  /**
   * MenuItem 失效
   */
  disabled?: boolean
}

const MenuItem: FC<MenuItemProps> = ({ className, style, children, index, disabled, ...rest }) => {
  const context = useContext(MenuContext)

  const classes = classNames('menu-item', className, {
    disabled: disabled,
    active: context.index === index
  })

  const handleClick = () => {
    if(context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick} {...rest}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
