import classNames from 'classnames'
import React, { FC, useState, DragEvent, ReactNode } from 'react'

export interface DraggerProps {
  children?: ReactNode
  onFile: (files: FileList) => void
}

const Dragger: FC<DraggerProps> = ({ children, onFile }) => {
  const [dragOver, setDragOver] = useState(false)

  const classes = classNames('upload-dragger', {
    'is-dragover': dragOver
  })

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }

  return (
    <div className={classes} onDragOver={e => handleDrag(e, true)} onDragLeave={e => handleDrag(e, false)} onDrop={e => handleDrop(e)}>
      {children}
    </div>
  )
}

export default Dragger
