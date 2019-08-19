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

  useEffect(() => {
    if (!fileId) {
      console.log('hello')
      return
    }
    console.log(fileId)
    try {
      axios
        .get(`http://localhost:3000/api/files/${fileId}`)
        .then(({ data }) => {
          setFormattedFile(data)
          setFormattedFileName(`${fileId}.js`)
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
