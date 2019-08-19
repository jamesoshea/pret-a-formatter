import axios from 'axios'
import { useState } from 'react'
import { Button, Form, Header as StyledHeader, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

import { UserModel } from '../../src/server/models/auth'

const HeaderContainer = styled.div`
  align-items: center;
  background: #444;
  display: flex;
  justify-content: space-between;
  line-height: 36px;
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
`

export default (props: any) => {
  const { user, updateCurrentUser } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <HeaderContainer>
      <StyledHeader as="p" color="grey" inverted size="large">
        pàf
      </StyledHeader>
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
                onClick={async e => {
                  e.preventDefault()
                  const response = await axios.post<UserModel>(
                    'http://localhost:3000/api/auth/login',
                    { email, password }
                  )
                  if (response.status === 200) {
                    setEmail('')
                    setPassword('')
                    updateCurrentUser(response.data)
                  } else {
                    window.alert(response.data)
                  }
                }}
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      ) : (
        <>
          <div style={{ display: 'flex' }}>
            <StyledHeader as="h6" color="grey" inverted>
              {user.email}
            </StyledHeader>
            <Button
              content="Logout"
              onClick={async () => {
                await axios.post('http://localhost:3000/api/auth/logout')
                updateCurrentUser(null)
              }}
            />
          </div>
        </>
      )}
    </HeaderContainer>
  )
}
