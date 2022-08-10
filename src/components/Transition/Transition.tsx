import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

export type TransitionProps = CSSTransitionProps & { animation?: AnimationName;} 

const Transition: FC<TransitionProps> = ({ children, classNames, animation, wrapper, ...rest }) => {
  return (
    <CSSTransition classNames={classNames ? classNames : animation} appear unmountOnExit {...rest}>
      {children}
    </CSSTransition>
  )
}

export default Transition
