import React, { ChangeEvent, FC, InputHTMLAttributes, ReactElement, useState } from 'react'
import classNames from 'classnames'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' | 'prefix'> {
  /**
   * 失效状态
   */
  disabled?: boolean
  /**
   * 输入框大小, 默认为'md'
   */
  size?: 'lg' | 'md' | 'sm'
  /**
   * 添加前缀
   */
  prefix?: string | ReactElement
  /**
   * 添加后缀
   */
  suffix?: string | ReactElement
  /**
   * 用户输入时的回调函数
   */
  onChange?: (e: ChangeEvent) => void
}

/**
 * 获取用户输入的基本组件。
 */
const Input: FC<InputProps> = ({className, style, disabled, size, prefix, suffix, ...rest}) => {
  const [focus, setFocus] = useState(false)

  const handleFocus = {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }

  const classes = classNames('input', className, {
    [`input-${size}`]: size,
    'input-disabled': disabled,
    'input-focus': focus
  })
  
  return (
    <div className={classes} style={style}>
      {prefix && <div className='input-prefix'>{prefix}</div>}
      <input type="text" className='input-itself' disabled={disabled} {...handleFocus} {...rest} />
      {suffix && <div className='input-suffix'>{suffix}</div>}
    </div>
  )
}

export default Input
