import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Upload, { UploadProps } from './Upload'
import axios from 'axios'

// jext.mock 接管图标实现
jest.mock('../Icon/Icon', () => {
  return ({ icon, onClick }: any) => {
    return <span onClick={onClick}>{icon}</span>
  }
})

// jest.mock 接管axios实现
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios> // 类型断言

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

let fileInput: HTMLInputElement, uploadArea: HTMLElement

// 初始化setup, 相当于beforeEach生命周期函数
const setup = () => {
  render(<Upload {...testProps}>Click to upload</Upload>)
  fileInput = document.querySelector('.file-input')!
  uploadArea = screen.queryByText('Click to upload')!
}

describe('test upload component', () => {
  setup()
  it('upload process should works fine', async () => {
    // 模拟方法实现
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({ data: 'cool' })
    // })
    mockedAxios.post.mockResolvedValueOnce({ data: 'test' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    // 触发事件
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    expect(screen.getByText('spinner')).toBeInTheDocument()
    // 异步：等待一段时间(不超过timeout), 然后执行回调函数
    await waitFor(() => {
      expect(screen.getByText('test.png')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByText('check-circle')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'test',
      expect.objectContaining({
        raw: testFile
      })
    )
    expect(testProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile
      })
    )

    // remove the uploaded file
    expect(screen.getByText('times')).toBeInTheDocument()
    fireEvent.click(screen.queryByText('times')!)
    expect(screen.queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png'
      })
    )
  })
  it('drag and drop files should works fine', async () => {
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('upload-dragger is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } })
    await waitFor(() => {
      expect(screen.getByText('test.png')).toBeInTheDocument()
    })
  })
})
