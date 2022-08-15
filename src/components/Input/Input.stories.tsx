import { ComponentStory, ComponentMeta } from '@storybook/react'
import Input from './Input'

export default {
  title: 'Data Entry/Input',
  component: Input
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = args => <Input {...args} />

export const Basic = Template.bind({})

Basic.args = {
  placeholder: 'Basic Usage'
}

export const PrefixAndSuffix = Template.bind({})

PrefixAndSuffix.args = {
  prefix: '$',
  suffix: 'dollar',
}

export const Disabled = Template.bind({})

Disabled.args = {
  ...PrefixAndSuffix.args,
  disabled: true
}

export const Large = Template.bind({})

Large.args = {
  ...PrefixAndSuffix.args,
  placeholder: 'lg size',
  size: 'lg'
}

export const Small = Template.bind({})

Small.args = {
  ...PrefixAndSuffix.args,
  placeholder: 'sm size',
  size: 'sm'
}
