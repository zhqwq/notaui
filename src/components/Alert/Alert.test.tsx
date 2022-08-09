import { render, screen } from '@testing-library/react'
import Alert from './Alert'

describe('test alert component', () => {
  it('shoud render the correct default alert', () => {
    render(<Alert title="testAlert" closable={true} type="default" message="hello" />)
    const ele = screen.getByText('hello')
    expect(ele).toBeInTheDocument()
    expect(ele.tagName).toEqual('DIV')
    expect(ele).toHaveClass('alert-message')

    const eleTitle = screen.getByText('testAlert')
    expect(eleTitle).toBeInTheDocument()
    expect(eleTitle.tagName).toEqual('DIV')
    expect(eleTitle).toHaveClass('alert-title')
  })
})
