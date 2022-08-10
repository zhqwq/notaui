import classNames from 'classnames'
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react'

interface BaseButtonProps {
  className?: string
  children: React.ReactNode
  href?: string
  disabled?: boolean
  size?: buttonSize
  type?: buttonType
}

type buttonSize = 'lg' | 'sm'
type buttonType = 'primary' | 'default' | 'danger' | 'link'
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<Omit<NativeButtonProps, 'type'> & AnchorButtonProps>

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
