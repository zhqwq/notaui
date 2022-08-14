import classNames from 'classnames'
import { FC, HTMLAttributes, useState } from 'react'
import Transition from '../Transition/Transition'

interface BaseAlertProps {
  /**
   * 类名
   */
  className?: string
  /**
   * Alert 类型
   */
  type?: 'success' | 'default' | 'danger' | 'warning'
  /**
   * 提示消息
   */
  message?: string
  /**
   * 标题
   */
  title?: string
  /**
   * 是否可以关闭
   */
  closable?: boolean
}

type AlertProps = BaseAlertProps & HTMLAttributes<HTMLElement>

/**
 * 警告提示，展现需要关注的信息。
 */
const Alert: FC<AlertProps> = ({ className, type, message, title, closable = false, ...restProps }) => {
  const [close, setClose] = useState(false)

  const classes = classNames('alert', className, {
    [`alert-${type}`]: type
  })

  return (
    <Transition in={!close} timeout={300} animation="zoom-in-top">
      <div className={classes} {...restProps}>
        <div className="alert-content">
          <div className="alert-title">{title}</div>
          <div className="alert-message">{message}</div>
        </div>
        {closable && (
          <div className="alert-close-icon" onClick={() => setClose(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </div>
    </Transition>
  )
}

export default Alert
