import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Navbar from '../../src/components/Navbar'
import Snippet from '../../src/components/Snippet'
import { UserProvider, UserConsumer } from '../../src/context/UserContext'

export default function FileId() {
  const [formattedFile, setFormattedFile] = useState('')
  const [formattedFileName, setFormattedFileName] = useState('')
  const router = useRouter()
  const { fileId } = router.query
  const stringifiedFileId = fileId ? fileId.toString() : ''

  useEffect(() => {
    if (!stringifiedFileId) {
      return
    }
    try {
      axios
        .get(`http://localhost:3000/api/files/${stringifiedFileId}`)
        .then(({ data }) => {
          setFormattedFile(data)
          setFormattedFileName(stringifiedFileId)
        })
    } catch (error) {
      console.log(new Error(error))
    }
  }, [fileId])

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
              <Snippet file={formattedFile} fileName={formattedFileName} />
            </Container>
          </>
        )}
      </UserConsumer>
    </UserProvider>
  )
}
