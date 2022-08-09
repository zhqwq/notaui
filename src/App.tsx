import Alert from './components/Alert/Alert'
import Button from './components/Button/Button'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
import TabItem from './components/Tabs/TabItem'
import Tabs from './components/Tabs/Tabs'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Icon from './components/Icon/Icon'

library.add(fas)

function App() {
  return (
    <div className="App">
      <Button disabled className="custom">
        Hello
      </Button>
      <Button
        type="primary"
        size="sm"
        onClick={e => {
          console.log(e)
        }}
      >
        Hello
      </Button>
      <Button type="link" href="https://www.baidu.com">
        Hello
      </Button>
      <hr />
      <Alert message="hello" style={{ marginBottom: '10px' }} />
      <Alert message="hello" title="hello" style={{ marginBottom: '10px' }} />
      <Alert message="hello" type="danger" closable={false} style={{ marginBottom: '10px' }} />
      <hr />
      <Menu
        defaultIndex={'0'}
        onSelect={index => {
          alert(index)
        }}
      >
        <MenuItem> 1 </MenuItem>
        <MenuItem disabled> 2 </MenuItem>
        <MenuItem> 3 </MenuItem>
        <SubMenu title="Dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
          <MenuItem>dropdown 3</MenuItem>
        </SubMenu>
      </Menu>
      <Menu
        defaultIndex='0'
        onSelect={index => {
          alert(index)
        }}
        mode="vertical"
        defaultOpenSubMenus={['2']}
      >
        <MenuItem index='0'> 1 </MenuItem>
        <MenuItem index='1' disabled>
          2
        </MenuItem>
        <SubMenu title="Dropdown" index='2'>
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
          <MenuItem>dropdown 3</MenuItem>
        </SubMenu>
      </Menu>
      <hr />
      <Tabs defaultIndex={0} onSelect={(index) => console.log(index)} type='card'>
        <TabItem label='index1'>this is card</TabItem>
        <TabItem label='index2'>this is card 2</TabItem>
        <TabItem label='index3'>this is card 3</TabItem>
        <TabItem label='index4' disabled>this is card 4</TabItem>
      </Tabs>
      <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
        <TabItem label='index1'>this is default</TabItem>
        <TabItem label='index2'>this is default 2</TabItem>
        <TabItem label={<h1>Hello</h1>}>this is default 3</TabItem>
        <TabItem label='index4' disabled>this is default 4</TabItem>
      </Tabs>
      <hr />
      <Icon icon="coffee" theme='danger'/>
      <Icon icon="user-secret" theme='primary' />
    </div>
  )
}

export default App
