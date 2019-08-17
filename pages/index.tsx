import axios from 'axios'
import React, { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import Header from '../src/components/Header'
import FileInput from '../src/components/FileInput'
import { UserProvider, UserConsumer } from '../src/context/UserContext'

const Upload = () => {
  const [formattedFile, setFormattedFile] = useState('')
  const [formattedFileName, setFormattedFileName] = useState('')
  const fileInput = React.createRef()

  const uploadFile = (formData: any) => {
    console.log(formData)
    axios
      .post(`api/files/add`, formData, {
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
        setFormattedFileName('')
        setFormattedFile('')
      })
  }

  return <FileInput inputRef={fileInput} onFileChanged={uploadFile} />
}

export default function Index() {
  let user = {}
  const updateCurrentUser = (newUser: Object) => {
    user = newUser
  }

  return (
    <UserProvider value={{ user, updateCurrentUser }}>
      <UserConsumer>
        {(props: any) => (
          <>
            <Header user={user} updateCurrentUser={updateCurrentUser} />
            <Upload />
          </>
        )}
      </UserConsumer>
    </UserProvider>
  )
}
