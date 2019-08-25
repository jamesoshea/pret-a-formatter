import axios from 'axios'
import React, { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import FileInput from '../src/components/FileInput'
import Navbar from '../src/components/Navbar'
import Snippet from '../src/components/Snippet'
import { UserProvider, UserConsumer } from '../src/context/UserContext'

const Upload = (props: any) => {
  const { setFormattedFile, setFormattedFileName } = props
  const fileInput = React.createRef()

  const uploadFile = (fileData: any) => {
    axios
      .post('/api/files/create', fileData, {})
      .then(res => {
        setFormattedFileName(res.data.fileName.replace('.js', ''))
        setFormattedFile(res.data.file)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return <FileInput inputRef={fileInput} onFileChanged={uploadFile} />
}

export default function Index() {
  const [formattedFile, setFormattedFile] = useState('')
  const [formattedFileName, setFormattedFileName] = useState('')

  return (
    <UserProvider>
      <UserConsumer>
        {(userContext: any) => (
          <>
            <Navbar
              user={userContext.user}
              updateCurrentUser={userContext.setUser}
            />
            <Container>
              <Upload
                setFormattedFile={setFormattedFile}
                setFormattedFileName={setFormattedFileName}
              />
              <Snippet file={formattedFile} fileName={formattedFileName} />
            </Container>
          </>
        )}
      </UserConsumer>
    </UserProvider>
  )
}
