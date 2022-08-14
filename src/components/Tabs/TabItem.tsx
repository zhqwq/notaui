import classNames from 'classnames'
import React, { FC, useContext } from 'react'
import { TabsContext } from './Tabs'

export interface TabItemProps {
  className?: string
  children?: React.ReactNode
  /**
   * TabItem 标签名
   */
  label?: React.ReactNode
  /**
   * TabItem 失效
   */
  disabled?: boolean
  /**
   * TabItem 序号
   */
  index?: number
}

const TabItem: FC<TabItemProps> = ({className, children, label, disabled, index, ...rest}) => {
  const context = useContext(TabsContext)

  const classes = classNames('tab-item', className)

  return (
    <div className={classes} {...rest}>
      {context.index === index && <div className='tab-item-content'>{children}</div>}
    </div>
  )
}

TabItem.displayName = 'TabItem'

export default TabItem