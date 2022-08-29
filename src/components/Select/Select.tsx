import classNames from 'classnames'
import React, { createContext, useRef, useState } from 'react'
import { FC } from 'react'
import { SelectHTMLAttributes } from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import Icon from '../Icon/Icon'
import Input from '../Input/Input'
import { OptionProps } from './Option'

type SelectDefaultValue = string | string[]

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLElement>, 'onChange' | 'defaultValue'> {
  /**
   * 设置 Select 的模式
   */
  mode?: 'single'
  /**
   * 是否禁用 Select
   */
  disabled?: boolean
  /**
   * 默认选中条目, 可以是字符串或字符串数组
   */
  defaultValue?: SelectDefaultValue
  /**
   * 选择框默认文本
   */
  placehoder?: string
  /**
   * 选中 Option 时调用此函数
   */
  onChange?: (value?: string) => void
  /**
   * 当 Option List 被打开或关闭时执行此函数
   */
  onVisibleChange?: () => void
}

interface ISelectContext {
  defaultValue?: SelectDefaultValue
  selectedValue?: SelectDefaultValue
  handleSelect?: (value?: string) => void
}

export const SelectContext = createContext<ISelectContext>({})

/**
 * 下拉选择器
 *
 * ## 何时使用
 * - 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * - 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。
 */
const Select: FC<SelectProps> = ({ className, style, children, mode = 'single', disabled, defaultValue, placeholder, onChange, onVisibleChange, ...rest }) => {
  const componentRef = useRef(null)
  const [showOptionList, setShowOptionList] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  useClickOutside(componentRef, () => {
    setShowOptionList(false)
    if (onVisibleChange) onVisibleChange()
  })

  const classes = classNames('select', className, {
    'select-disabled': disabled,
    [`select-${mode}`]: mode
  })

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const _child = child as React.FunctionComponentElement<OptionProps>
      if (_child.type.displayName !== 'Option') {
        console.error('Warning: Select has a child which is not a Option component')
      }
      return React.cloneElement(_child, {
        key: index.toString()
      })
    })
  }

  const context: ISelectContext = {
    selectedValue,
    handleSelect: value => {
      setSelectedValue(value)
      if (onChange) onChange(value)
    }
  }

  const handleClick = () => {
    setShowOptionList(!showOptionList)
    if (onVisibleChange) onVisibleChange()
  }

  return (
    <div className={classes} ref={componentRef} onClick={handleClick} {...rest}>
      <div className="select-selector">
        <Input className="select-input" value={selectedValue} placeholder={placeholder} />
      </div>
      <div className="select-icon">
        <Icon icon="arrow-down" theme="secondary" size="sm" />
      </div>
      <SelectContext.Provider value={context}>{showOptionList && <div className="option-list">{renderChildren()}</div>}</SelectContext.Provider>
    </div>
  )
}

export default Select
