import classNames from 'classnames'
import { FC, OptionHTMLAttributes, useContext } from 'react'
import { SelectContext } from './Select'

export interface OptionProps extends OptionHTMLAttributes<HTMLElement> {
  key?: string
  value?: string
  disabled?: boolean
}

const Option: FC<OptionProps> = ({ className, children, value, disabled }) => {
  const context = useContext(SelectContext)

  let isSelected = false

  const { selectedValue, handleSelect } = context

  if (value) {
    if (selectedValue instanceof Array) {
      isSelected = selectedValue.includes(value)
    } else {
      isSelected = selectedValue === value
    }
  }

  const classes = classNames('option-item', className, {
    disabled,
    selected: isSelected
  })

  const handleClick = () => {
    if(handleSelect && !disabled) handleSelect(value)
  }

  return (
    <option className={classes} value={value} onClick={handleClick}>
      {children}
    </option>
  )
}

Option.displayName = 'Option'

export default Option
