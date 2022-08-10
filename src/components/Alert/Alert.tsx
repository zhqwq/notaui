import classNames from 'classnames'
import { FC, HTMLAttributes, useState } from 'react'
import Transition from '../Transition/Transition'

interface BaseAlertProps {
  className?: string
  type?: 'success' | 'default' | 'danger' | 'warning'
  message?: string
  title?: string
  closable?: boolean
}

type AlertProps = BaseAlertProps & HTMLAttributes<HTMLElement>

const Alert: FC<AlertProps> = ({ className, type, message, title, closable = true, ...restProps }) => {
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
