import { ComponentStory, ComponentMeta } from '@storybook/react'
import Alert from './Alert'

export default {
  title: 'Feedback/Alert',
  component: Alert
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = args => <Alert {...args} />

export const Default = Template.bind({})

Default.args = {
  type: 'default',
  message: '默认提示'
}

export const Success = Template.bind({})

Success.args = {
  type: 'success',
  message: '成功提示'
}

export const Danger = Template.bind({})

Danger.args = {
  type: 'danger',
  message: '危险提示'
}

export const Warning = Template.bind({})

Warning.args = {
  type: 'warning',
  message: '警告提示'
}

export const DefaultWithTitle = Template.bind({})

DefaultWithTitle.args = {
  ...Default.args,
  title: '默认文本'
}

export const DefaultWithTitleAndClose = Template.bind({})

DefaultWithTitleAndClose.args = {
  ...DefaultWithTitle.args,
  closable: true
}