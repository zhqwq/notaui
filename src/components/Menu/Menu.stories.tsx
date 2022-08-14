import { ComponentStory, ComponentMeta } from '@storybook/react'
import Menu from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

export default {
  title: 'Navigation/Menu',
  component: Menu
} as ComponentMeta<typeof Menu>

export const Horizontal: ComponentStory<typeof Menu> = (args) => (
  <Menu
    {...args}
  >
    <MenuItem> MenuItem1 </MenuItem>
    <MenuItem disabled> MenuItem2 disabled</MenuItem>
    <MenuItem> MenuItem3 </MenuItem>
    <SubMenu title="Dropdown">
      <MenuItem>dropdown 1</MenuItem>
      <MenuItem>dropdown 2</MenuItem>
      <MenuItem>dropdown 3</MenuItem>
    </SubMenu>
  </Menu>
)

Horizontal.args = {
  defaultIndex: '0',
  mode: 'horizontal'
}

export const Vertical: ComponentStory<typeof Menu> = (args) => (
  <Menu
    {...args}
  >
    <MenuItem> MenuItem1 </MenuItem>
    <MenuItem disabled> MenuItem2 disabled</MenuItem>
    <MenuItem> MenuItem3 </MenuItem>
    <SubMenu title="Dropdown">
      <MenuItem>dropdown 1</MenuItem>
      <MenuItem>dropdown 2</MenuItem>
      <MenuItem>dropdown 3</MenuItem>
    </SubMenu>
  </Menu>
)

Vertical.args = {
  defaultIndex: '0',
  mode: 'vertical'
}
