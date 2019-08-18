import PropTypes from 'prop-types'
import React, { RefObject } from 'react'
import { Button } from 'semantic-ui-react'

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
    const files = Array.from(this.state.fileInput.current.files)
    const formData = new FormData()
    files.forEach((file: any, i) => {
      formData.append(i.toString(), file)
    })
    this.props.onFileChanged(formData)
  }

  render() {
    return (
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
    )
  }
}

export default FileInput
