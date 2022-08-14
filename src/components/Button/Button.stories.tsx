import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from './Button'

export default {
  title: 'General/Button',
  component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

// Template.bind({}) is a standard JavaScript technique for making a copy of a function. 
// We copy the Template so each exported story can set its own properties on it.
export const Primary = Template.bind({})

Primary.args = {
  type: 'primary',
  children: 'Primary Button'
}

export const Danger = Template.bind({})

Danger.args = {
  type: 'danger',
  children: 'Danger Button'
}

export const Large = Template.bind({})

Large.args = {
  type: 'primary',
  children: 'Large Button',
  size:'lg'
}

export const Small = Template.bind({})

Small.args = {
  type: 'primary',
  children: 'Small Button',
  size:'sm'
}

export const Link = Template.bind({})

Link.args = {
  type: 'link',
  children: 'Link',
  href: 'https://www.example.com'
}