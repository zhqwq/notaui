import { ComponentStory, ComponentMeta } from '@storybook/react'
import AutoComplete, { DataSourceType } from './AutoComplete'

export default {
  title: 'Data Entry/AutoComplete',
  component: AutoComplete
} as ComponentMeta<typeof AutoComplete>

const Template: ComponentStory<typeof AutoComplete> = args => <AutoComplete {...args} />

export const Basic = Template.bind({})

interface CarProps {
  value: string
  model: string
}

const cars = [
  {
    value: 'Audi',
    model: 'A4'
  },
  {
    value: 'Benz',
    model: '100'
  },
  {
    value: 'BMW',
    model: '318i'
  },
  {
    value: 'Toyota',
    model: 'i8'
  },
  {
    value: 'Tesla',
    model: 'P100D'
  }
]

const handleFetch = (input: string) => {
  return cars.filter(item => item.value.includes(input))
}

const renderOption = (item: DataSourceType) => {
  const carItem = item as DataSourceType<CarProps>
  return (
    <>
      <h2>Name: {carItem.value}</h2>
      <p>Model: {carItem.model}</p>
    </>
  )
}

Basic.args = {
  fetchOptions: handleFetch,
  renderOption
}

export const Async = Template.bind({})

interface GithubUserProps {
  login: string
  url: string
  avatar_url: string
}

const asyncFetch = (input: string) => {
  return fetch(`https://api.github.com/search/users?q=${input}`)
    .then(res => res.json())
    .then(({ items }) => {
      const formatItems = items?.slice(0, 5).map((item: any) => ({ value: item.login, ...item }))
      return formatItems
    })
}

Async.args = {
  fetchOptions: asyncFetch,
  renderOption: item => {
    const _item = item as DataSourceType<GithubUserProps>
    return (
      <>
        <h3>Name: {_item.login}</h3>
        <p>url: {_item.url}</p>
      </>
    )
  }
}
