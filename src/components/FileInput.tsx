import PropTypes from 'prop-types'
import React, { RefObject } from 'react'
import { Button } from 'semantic-ui-react'
import { UserConsumer } from '../context/UserContext'

type FileInputProps = {
  inputRef: RefObject<any>
  onFileChanged: Function
}

type FileInputState = {
  fileInput: RefObject<any>
}

class FileInput extends React.Component<FileInputProps, FileInputState> {
  constructor(props: FileInputProps) {
    super(props)
    this.state = {
      fileInput: React.createRef()
    }
  }

  static propTypes = {
    onFileChanged: PropTypes.func
  }

  handleFileChange(email: string) {
    const files = Array.from(this.state.fileInput.current.files)
    const formData = new FormData()
    files.forEach((file: any, i) => {
      formData.append(i.toString(), file)
    })
    formData.append('email', email)
    this.props.onFileChanged(formData)
  }

  render() {
    return (
      <UserConsumer>
        {(value: any) => (
          <>
            <Button>
              <label htmlFor={'fileInput'}>Upload</label>
            </Button>
            <input
              style={{ display: 'none' }}
              type="file"
              id="fileInput"
              ref={this.state.fileInput}
              onChange={() => this.handleFileChange(value.email)}
            />
          </>
        )}
      </UserConsumer>
    )
  }
}

export default FileInput
