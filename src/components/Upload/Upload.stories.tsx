import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload, { UploadFile } from './Upload'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'

export default {
  title: 'Data Entry/Upload',
  component: Upload
} as ComponentMeta<typeof Upload>

export const Default: ComponentStory<typeof Upload> = () => (
  <Upload action="https://jsonplaceholder.typicode.com/posts" onChange={action('change')} onSuccess={action('success')} onError={action('error')} onProgress={action('progress')}>
    <Button>Upload File</Button>
  </Upload>
)

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('File size greater than 50kb')
    return false
  }
  return true
}

export const CheckFileSize: ComponentStory<typeof Upload> = () => (
  <Upload beforeUpload={checkFileSize} action="https://jsonplaceholder.typicode.com/posts" onChange={action('change')}>
    <Button>Upload File</Button>
  </Upload>
)

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

export const WithDefaultFileList: ComponentStory<typeof Upload> = () => (
  <Upload action="https://jsonplaceholder.typicode.com/posts" defaultFileList={defaultFileList}>
    <Button>Upload File</Button>
  </Upload>
)

export const Drag: ComponentStory<typeof Upload> = () => (
  <Upload action="https://jsonplaceholder.typicode.com/posts" drag multiple>
    <Icon icon="upload" size="5x" theme="secondary"/>
    <br />
    <p>Drag file over to upload</p>
  </Upload>
)
