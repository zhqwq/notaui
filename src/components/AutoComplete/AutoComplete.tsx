import React, { ChangeEvent, FC, ReactElement, useState, KeyboardEvent, useRef } from 'react'
import Input, { InputProps } from '../Input/Input'
import Icon from '../Icon/Icon'
import { useEffect } from 'react'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import classNames from 'classnames'

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
  /**
   * 获取options的函数, 返回值可以是数组或Promise
   */
  fetchOptions: (inputValue: string) => DataSourceType[] | Promise<DataSourceType[]>
  /**
   * 自定义渲染option-item的函数, 默认为直接显示.value值
   */
  renderOption?: (item: DataSourceType) => ReactElement
  /**
   * Input输入值改变时触发的回调函数
   */
  onChange?: (value: string) => void
  /**
   * 选择option-item时触发的回调函数
   */
  onSelect?: (item: DataSourceType) => void
}

/**
 * 拥有输入提示的输入框
 */
const AutoComplete: FC<AutoCompleteProps> = ({ className, style, value, fetchOptions, renderOption, onSelect, onChange, ...rest }) => {
  const [inputValue, setInputValue] = useState(value as string)
  const [options, setOptions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(inputValue, 300)
  useClickOutside(componentRef, () => {
    setOptions([])
  })

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setLoading(true)
      setOptions([])
      const results = fetchOptions(debouncedValue)
      if (results instanceof Promise) {
        results.then(data => {
          setLoading(false)
          setOptions(data)
        })
      } else {
        setOptions(results)
      }
    } else {
      setOptions([])
    }
    setHighlightIndex(-1)

    if (onChange) {
      onChange(debouncedValue)
    }
  }, [debouncedValue, fetchOptions, onChange])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= options.length) {
      index = options.length - 1
    }
    setHighlightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log('keydown', e.key)
    switch (e.key) {
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break
      case 'Enter':
        if (options[highlightIndex]) {
          handleSelect(options[highlightIndex])
        }
        break
      case 'Escape':
        setOptions([])
        break
    }
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setOptions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const generateDropdown = () => {
    return (
      <ul className="options-list">
        {options.map((item, index) => {
          const classes = classNames('options-item', {
            highlighted: index === highlightIndex
          })
          return (
            <li className={classes} key={index} onClick={() => handleSelect(item)}>
              {renderOption ? renderOption(item) : item.value}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="auto-complete" ref={componentRef}>
      <Input value={inputValue} {...rest} onChange={handleChange} onKeyDown={handleKeyDown} />
      {loading && (
        <div className="loading">
          <Icon icon="spinner" spin />
        </div>
      )}
      {options?.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete
