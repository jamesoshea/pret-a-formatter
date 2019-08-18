import PropTypes from 'prop-types'
import React from 'react'
import { Button as SemanticButton } from 'semantic-ui-react'

class FileInput extends React.Component {
  constructor() {
    super()
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
    files.forEach((file, i) => {
      formData.append(i, file)
    })
    this.props.onFileChanged(formData)
  }

  render() {
    return (
      <div>
        <SemanticButton>
          <label htmlFor={'fileInput'}>Upload</label>
        </SemanticButton>
        <input
          style={{ display: 'none' }}
          type="file"
          id="fileInput"
          ref={this.state.fileInput}
          onChange={() => this.handleFileChange()}
        />
      </div>
    )
  }
}

export default FileInput
