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

  handleFileChange() {
    const token = localStorage.getItem('paf-user-token')
    if (!token) {
      return
    }
    const files: any = Array.from(this.state.fileInput.current.files)
    const reader = new FileReader()
    reader.onload = (event: any) => {
      this.props.onFileChanged({
        file: event.target.result,
        token
      })
    }
    reader.readAsText(files[0])
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
              onChange={() => this.handleFileChange()}
            />
          </>
        )}
      </UserConsumer>
    )
  }
}

export default FileInput
