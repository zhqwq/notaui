import { ComponentMeta, ComponentStory } from "@storybook/react";
import Icon from './Icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default {
  title: 'General/Icon',
  component: Icon
} as ComponentMeta<typeof Icon>

// To use the Controls addon, you need to write your stories using args. 
// Storybook will automatically generate UI controls based on your args and what it can infer about your component.
const Template: ComponentStory<typeof Icon> = (args) => (<Icon {...args}></Icon>)

export const CoffeeIcon = Template.bind({})

CoffeeIcon.args = {
  icon: 'coffee',
}

export const UserScretIcon = Template.bind({})

UserScretIcon.args = {
  icon: 'user-secret',
}

export const CoffeeIconWithTheme = Template.bind({})

CoffeeIconWithTheme.args = {
  icon: 'coffee',
  theme: 'danger'
}

