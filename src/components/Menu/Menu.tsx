import classNames from 'classnames'
import React from 'react'
import { FC, useState, createContext } from 'react'
import { MenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  defaultIndex?: string
  mode?: MenuMode
  onSelect?: SelectCallback
  defaultOpenSubMenus?: string[] // 默认打开的子菜单
}

interface IMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

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
