import classNames from 'classnames'
import React from 'react'
import { FC, useState, createContext } from 'react'
import { MenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  /**
   * 类名
   */
  className?: string
  /**
   * 样式
   */
  style?: React.CSSProperties
  /**
   * 子元素, MenuItem 或 SubMenu
   */
  children?: React.ReactNode
  /**
   * 默认高亮
   */
  defaultIndex?: string
  /**
   * 配置水平或垂直菜单
   */
  mode?: MenuMode
  /**
   * 点击 MenuItem 的回调函数
   */
  onSelect?: SelectCallback
  /**
   * 默认打开的子菜单
   */
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

/**
 * 为页面和功能提供导航的菜单列表。
 */
const Menu: FC<MenuProps> = ({ className, style, children, defaultIndex = '0', mode = 'horizontal', onSelect, defaultOpenSubMenus = [], ...rest }) => {
  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal'
  })

  const handleSelect = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const context: IMenuContext = {
    index: currentActive,
    onSelect: handleSelect,
    mode: mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={classes} style={style} {...rest}>
      <MenuContext.Provider value={context}>{renderChildren()}</MenuContext.Provider>
    </ul>
  )
}

export default Menu
