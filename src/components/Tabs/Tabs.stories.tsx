import { ComponentStory, ComponentMeta } from '@storybook/react'
import TabItem from './TabItem'
import Tabs from './Tabs'

export default {
  title: 'Data Display/Tabs',
  component: Tabs
} as ComponentMeta<typeof Tabs>

export const Default: ComponentStory<typeof Tabs> = () => (
  <Tabs defaultIndex={0}>
    <TabItem label="Tab1">Hello, World!</TabItem>
    <TabItem label="Tab2">你好, 世界。</TabItem>
    <TabItem label="Tab3" disabled>
      TabItem 3 is disabled
    </TabItem>
  </Tabs>
)

export const Card: ComponentStory<typeof Tabs> = () => (
  <Tabs defaultIndex={0} type="card">
    <TabItem label="Tab1">Hello, World!</TabItem>
    <TabItem label="Tab2">你好, 世界。</TabItem>
    <TabItem label="Tab3" disabled>
      TabItem 3 disabled
    </TabItem>
  </Tabs>
)
