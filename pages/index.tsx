import axios from 'axios'
import React, { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Header as SemanticHeader } from 'semantic-ui-react'
import Header from '../src/components/Header'
import FileInput from '../src/components/FileInput'
import { UserProvider, UserConsumer } from '../src/context/UserContext'

const Snippet = (props: any) => {
  const { file, fileName } = props

  if (!file) return null
  return (
    <>
      <SemanticHeader>{fileName}</SemanticHeader>
      <SyntaxHighlighter language="javascript">{file}</SyntaxHighlighter>
    </>
  )
}

const Upload = (props: any) => {
  const { setFormattedFile, setFormattedFileName } = props
  const fileInput = React.createRef()

  const uploadFile = (formData: any) => {
    axios
      .post('https://pret-a-formatter.now.sh/upload', formData, {
        headers: {
          Accept: 'application/json',
          Encoding: 'multipart/form-data'
        }
      })
      .then(res => {
        setFormattedFileName(res.data.fileName)
        setFormattedFile(res.data.file)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return <FileInput inputRef={fileInput} onFileChanged={uploadFile} />
}

export default function Index() {
  const [user, setUser] = useState({})
  const [formattedFile, setFormattedFile] = useState('')
  const [formattedFileName, setFormattedFileName] = useState('')

  return (
    <UserProvider value={{ user, setUser }}>
      <UserConsumer>
        {(props: any) => (
          <>
            <Header user={user} updateCurrentUser={setUser} />
            <Upload
              setFormattedFile={setFormattedFile}
              setFormattedFileName={setFormattedFileName}
            />
            <Snippet file={formattedFile} fileName={formattedFileName} />
          </>
        )}
      </UserConsumer>
    </UserProvider>
  )
}
