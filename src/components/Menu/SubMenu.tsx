import classNames from 'classnames'
import React, { FC, FunctionComponentElement, useContext, useState } from 'react'
import Icon from '../Icon/Icon'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'
import Transition from '../Transition/Transition'

export interface SubMenuProps {
  className?: string
  index?: string
  title?: string
  children?: React.ReactNode
}

const SubMenu: FC<SubMenuProps> = ({ className, index, title, children, ...rest }) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as string[]
  const isOpened = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpened)

  const classes = classNames('menu-item submenu-item', className, {
    active: context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })

  // 处理垂直子菜单点击
  const handleClick = (e: React.MouseEvent) => {
    setOpen(!menuOpen)
  }
  let timer: any
  // 处理水平子菜单鼠标悬浮
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 200)
  }

  const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}
  const hoverEvents =
    context.mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          }
        }
      : {}

  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen // 使用 类名 + display 控制显示和隐藏
    })

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}` // 为SubMenu中的MenuItem添加二级index
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem')
      }
    })

    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents} {...clickEvents} {...rest}>
      <div className="submenu-title">
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
