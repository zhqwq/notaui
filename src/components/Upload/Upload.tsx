import axios from 'axios'
import React, { ChangeEvent, FC, useRef, useState, ReactNode } from 'react'
import Dragger from './Dragger'
import UploadList from './UploadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  /**
   * 原始文件
   */
  raw?: File
  response?: any
  error?: any
}

export interface UploadProps {
  children?: ReactNode
  /**
   * 上传的地址
   */
  action: string
  /**
   * 默认已经上传的文件列表
   */
  defaultFileList?: UploadFile[]
  /**
   * 上传文件之前的回调函数，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，
   */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /**
   * 文件上传过程中的回调函数
   */
  onProgress?: (percentage: number, file: UploadFile) => void
  /**
   * 文件上传成功的回调函数
   */
  onSuccess?: (data: any, file: UploadFile) => void
  /**
   * 文件上传失败的回调函数
   */
  onError?: (err: any, file: UploadFile) => void
  /**
   * 上传文件改变时的回调函数
   */
  onChange?: (file: UploadFile) => void
  /**
   * 删除文件列表中的文件的回调函数
   */
  onRemove?: (file: UploadFile) => void
  /**
   * 自定义 HTTP Request headers
   */
  headers?: { [key: string]: any }
  /**
   * 上传的文件名
   */
  name?: string
  /**
   * 额外需要上传的数据
   */
  data?: { [key: string]: any }
  /**
   * 是否携带Cookie
   */
  withCredentials?: boolean
  /**
   * 可接受的文件类型
   * accept=".png" — 接受 PNG 文件。
   * accept=".png, .jpg, .jpeg" — 接受 PNG 或 JPEG 文件。
   * accept=".doc,.docx,.xml" — 接受 MS Word 文档之类的文件。
   */
  accept?: string
  /**
   * 是否支持多选文件
   */
  multiple?: boolean
  /**
   * 是否支持拖动
   */
  drag?: boolean
}

/**
 * 文件选择上传和拖拽上传组件。
 * 
 * ## 何时使用
 * - 当需要上传一个或多个文件时。
 * - 当需要展现上传的进度时。
 * - 当需要使用拖拽交互时。
 */
const Upload: FC<UploadProps> = ({ children, action, defaultFileList, beforeUpload, onProgress, onSuccess, onError, onChange, onRemove, headers, name = 'file', data, withCredentials, accept, multiple, drag }) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  // 触发fileInput点击事件 - 选择上传文件
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  // 当fileInput选择文件后触发
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  // 发送网络请求上传文件
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files) // 转换类数组
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => post(processedFile))
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + '-upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }

    setFileList(prevList => {
      return [_file, ...prevList]
    })

    const formData = new FormData()
    formData.append(name || file.name, file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials,
        onUploadProgress: e => {
          const percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' })
            if (onProgress) {
              onProgress(percentage, _file)
            }
          }
        }
      })
      .then(resp => {
        console.log(resp)
        updateFileList(_file, { status: 'success', response: resp.data })
        if (onSuccess) {
          onSuccess(resp.data, _file)
        }
        if (onChange) {
          onChange(_file)
        }
      })
      .catch(err => {
        console.log(err)
        updateFileList(_file, { status: 'error', error: err })
        if (onError) {
          onError(err, _file)
        }
        if (onChange) {
          onChange(_file)
        }
      })
  }

  // 更新FileList中单个File的状态和属性
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  console.log(fileList)

  return (
    <div className="upload">
      <div className="upload-input" onClick={handleClick} style={{ display: 'inline-block' }}>
        {drag ? <Dragger onFile={(files) => uploadFiles(files)}>{ children }</Dragger> :  children}
      </div>
      <input className='file-input' type="file" style={{ display: 'none' }} ref={fileInput} onChange={handleFileChange} accept={accept} multiple={multiple} />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

export default Upload
