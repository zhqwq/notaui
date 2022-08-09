import { fireEvent, render, screen } from '@testing-library/react'
import Tabs, { TabsProps } from './Tabs'
import TabItem from './TabItem'

const defaultProps: TabsProps = {
  type: 'default',
  defaultIndex: 0,
  onSelect: jest.fn()
}

const setup = (props: TabsProps) => {
  render(
    <Tabs {...defaultProps} data-testid="test-tabs">
      <TabItem label="label1">content1</TabItem>
      <TabItem label="label2" disabled>
        content2
      </TabItem>
      <TabItem label={<h2>Hello</h2>}>content3</TabItem>
    </Tabs>
  )
}

describe('test Tabs and TabItem component', () => {
  it('should render the correct Tabs and TabItem based on default props', () => {
    setup(defaultProps)
    expect(screen.getByTestId('test-tabs'),).toBeInTheDocument()
    expect(screen.getByText('content1')).toBeInTheDocument()
    const label1 = screen.getByText('label1')
    expect(label1).toHaveClass('tabs-nav-label tabs-nav-label-active')
  })

  it('should render the correct content when tab is clicked', () => {
    setup(defaultProps)
    const label2 = screen.getByText('label2')
    fireEvent.click(label2)
    expect(defaultProps.onSelect).not.toHaveBeenCalled()
    const label1 = screen.getByText('label1')
    fireEvent.click(label1)
    expect(defaultProps.onSelect).toHaveBeenCalled()
    expect(screen.getByText('content1')).toBeInTheDocument()
  })
})
