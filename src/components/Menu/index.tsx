import Menu, { MenuProps } from './Menu'
import SubMenu, { SubMenuProps } from './SubMenu'
import MenuItem, { MenuItemProps } from './MenuItem'
import { FC } from 'react'

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
}

const _Menu = Menu as IMenuComponent
_Menu.Item = MenuItem
_Menu.SubMenu = SubMenu

export default _Menu