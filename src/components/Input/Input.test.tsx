import { render, fireEvent, screen } from '@testing-library/react'
import Input, { InputProps } from './Input'

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test'
}

describe('test Input component', () => {
  it('should render the correct default Input', () => {
    render(<Input {...defaultProps} />)
    const inputElement = screen.getByPlaceholderText('test') as HTMLInputElement
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass('input-itself')
    fireEvent.change(inputElement, { target: {value: '99'}})
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(inputElement.value).toEqual('99')
  })

  it('should render the disabled Input on disabled prop', () => {
    render(<Input disabled placeholder='disabled' />)
    const inputElement = screen.getByPlaceholderText('disabled') as HTMLInputElement
    expect(inputElement.disabled).toBeTruthy()
  })

  it('should render different input sizes on size property', () => {
    const {container} = render(<Input placeholder="sizes" size="lg"/>)
    const input = container.firstChild
    expect(input).toHaveClass('input-lg')
  })
})