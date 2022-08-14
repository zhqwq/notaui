import classNames from 'classnames'
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react'

interface BaseButtonProps {
  /**
   * 类名
   */
  className?: string
  /**
   * 子元素
   */
  children: React.ReactNode
  /**
   * Link类型按钮的超链接
   */
  href?: string
  /**
   * 按钮失效
   */
  disabled?: boolean
  /**
   * 按钮大小
   */
  size?: buttonSize
  /**
   * 按钮类型
   */
  type?: buttonType
}

type buttonSize = 'lg' | 'sm'
type buttonType = 'primary' | 'default' | 'danger' | 'link'
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<Omit<NativeButtonProps, 'type'> & AnchorButtonProps>

/**
 * 按钮用于触发一个即时操作。
 */
const Button: FC<ButtonProps> = ({ className, type = 'default', disabled = false, size, children, href, ...restProps }) => {
  const classes = classNames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disabled: disabled && type === 'link'
  })

  if (type === 'link') {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  )
}

export default Button
