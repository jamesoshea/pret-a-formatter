import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

import { UserModel } from '../../src/server/models/auth'

const HeaderContainer = styled.div`
  align-items: center;
  background: #333;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
`

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState<undefined | UserModel>(undefined)
  const [data, setData] = useState('')
  useEffect(() => {
    ;(async () => {
      const response = await axios.post<UserModel>(
        'http://localhost:3000/api/auth/current_user'
      )
      if (response.status === 200) {
        setUser(response.data)
      }
    })()
  }, [])
  useEffect(() => {
    if (user)
      (async () => {
        const response = await axios.post<string>('http://localhost:3000/api')
        setData(response.data)
      })()
  }, [user])

  return (
    <HeaderContainer>
      <Header color="teal">prêt-à-formatter</Header>
      {!user ? (
        <Modal trigger={<Button>Log In</Button>}>
          <Modal.Header>Log In</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form size="small">
                <Form.Group>
                  <Form.Input
                    label="Email"
                    onChange={({ target: { value } }) => {
                      setEmail(value)
                    }}
                    value={email}
                  />
                  <Form.Input
                    label="Password"
                    type="password"
                    onChange={({ target: { value } }) => {
                      setPassword(value)
                    }}
                    value={password}
                  />
                </Form.Group>
              </Form>
              <Button
                content="Login"
                onClick={async ev => {
                  ev.preventDefault()
                  const response = await axios.post<UserModel>(
                    'http://localhost:3000/api/auth/login',
                    { email, password }
                  )
                  if (response.status === 200) {
                    setEmail('')
                    setPassword('')
                    setUser(response.data)
                  } else {
                    window.alert(response.data)
                  }
                }}
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      ) : (
        <Button
          content="Logout"
          onClick={async () => {
            await axios.post('http://localhost:3000/api/auth/logout')
            setUser(undefined)
          }}
        />
      )}
    </HeaderContainer>
  )
}
