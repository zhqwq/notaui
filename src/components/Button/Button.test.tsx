import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

const defaultProps = {
  onClick: jest.fn()
}

const disabledProps = {
  onClick: jest.fn()
}

test('first react test case', () => {
  // React Testing Library
  render(<Button>Nice</Button>)
  const element = screen.getByText('Nice')
  // Jest Assert
  expect(element).toBeTruthy()
  expect(element).toBeInTheDocument()
})

describe('test Button component', () => {
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Nice</Button>)
    const element = screen.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should render the correct component based on different props', () => {
    render(<Button type='primary' size='lg' className='custom'>Nice</Button>)
    const element = screen.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg custom')
  })

  it('should render a link when type equals link and href is provided', () => {
    render(<Button type='link' href='https://www.baidu.com' >Link</Button>)
    const element = screen.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })

  it('shoud render disabled button when disabled set to true', () => {
    render(<Button disabled {...disabledProps}>Nice</Button>)
    const element = screen.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
