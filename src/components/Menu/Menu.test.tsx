/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

// 水平菜单测试参数
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

// 垂直菜单测试参数
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props} data-testid="test-menu">
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const setup = (props: MenuProps) => {
  render(generateMenu(props))
  const menuEle = screen.getByTestId('test-menu')
  const activeEle = screen.getByText('active')
  const disabledEle = screen.getByText('disabled')
  return { menuEle, activeEle, disabledEle }
}

describe('test Menu and MenuItem component', () => {
  it('should render correct Menu and MenuItem based on default props', () => {
    const { menuEle, activeEle, disabledEle } = setup(testProps)
    expect(menuEle).toBeInTheDocument()
    expect(menuEle).toHaveClass('menu test')
    expect(activeEle).toHaveClass('menu-item active')
    expect(disabledEle).toHaveClass('menu-item disabled')
  })

  it('click items should change active and call the right callback', () => {
    const { activeEle, disabledEle } = setup(testProps)
    const thirdItem = screen.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('active')
    expect(activeEle).not.toHaveClass('active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledEle)
    expect(disabledEle).not.toHaveClass('active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('should render vertical mode when mode is set to vertical', () => {
    const { menuEle } = setup(testVerProps)
    expect(menuEle).toHaveClass('menu-vertical')
  })

  it('should show dropdown items when hover on SubMenu', async () => {
    setup(testProps)
    expect(screen.queryByText('drop1')?.parentNode).not.toHaveClass('menu-opened')
    fireEvent.mouseEnter(screen.getByText('dropdown'))
    await waitFor(() => expect(screen.queryByText('drop1')?.parentNode).toHaveClass('menu-opened'))
    fireEvent.click(screen.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(screen.getByText('dropdown'))
    await waitFor(() => expect(screen.queryByText('drop1')?.parentNode).not.toHaveClass('menu-opened'))
  })
})
