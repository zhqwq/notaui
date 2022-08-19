import { ComponentStory, ComponentMeta } from '@storybook/react'
import Select from './Select'
import Option from './Option'

export default {
  title: 'Data Entry/Select',
  component: Select
} as ComponentMeta<typeof Select>

export const Basic: ComponentStory<typeof Select> = () => (
  <Select >
    <Option value={'1'}>1</Option>
    <Option value={'2'}>2</Option>
    <Option value={'3'}>3</Option>
    <Option value={'4'} disabled>4</Option>
  </Select>
)
