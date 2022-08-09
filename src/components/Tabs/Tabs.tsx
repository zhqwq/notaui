import classNames from 'classnames'
import React, { createContext, FC, FunctionComponentElement, useState } from 'react'
import { TabItemProps } from './TabItem'

export interface TabsProps {
  className?: string
  children?: React.ReactNode
  defaultIndex?: number
  type?: 'default' | 'card'
  onSelect?: (index: number) => void
}

interface ITabsContext {
  defaultIndex: number
  index: number
  handleClick?: (index: number) => void
}

export const TabsContext = createContext<ITabsContext>({ defaultIndex: 0, index: 0 })

const Tabs: FC<TabsProps> = ({ className, children, defaultIndex = 0, type = 'default', onSelect, ...rest }) => {
  const [currentIndex, setCurrent] = useState(defaultIndex)

  const classes = classNames('tabs', className, {
    'tabs-card': type === 'card',
    'tabs-default': type === 'default',
  })

  const handleClick = (index: number) => {
    setCurrent(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: ITabsContext = {
    defaultIndex,
    index: currentIndex
  }

  const renderNav = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<TabItemProps>
      const { disabled } = childElement.props
      const tabsNavClasses = classNames('tabs-nav-label', {
        'tabs-nav-label-active': currentIndex === i,
        'tabs-nav-label-disabled': disabled
      })

      if (disabled) {
        return <div className={tabsNavClasses}>{childElement.props.label}</div>
      }

      return (
        <div
          className={tabsNavClasses}
          onClick={() => {
            handleClick(i)
          }}
        >
          {childElement.props.label}
        </div>
      )
    })
  }

  const renderContent = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<TabItemProps>
      if (childElement.type.displayName === 'TabItem') {
        return React.cloneElement(childElement, {
          index: i
        })
      } else {
        console.error('Warning: Tabs has a child which is not a TabItem component')
      }
    })
  }

  return (
    <div className={classes} {...rest}>
      <nav className="tabs-nav">{renderNav()}</nav>
      <TabsContext.Provider value={passedContext}>{renderContent()}</TabsContext.Provider>
    </div>
  )
}

export default Tabs
