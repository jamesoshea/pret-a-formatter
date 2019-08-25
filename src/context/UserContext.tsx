import axios from 'axios'
import PropTypes from 'prop-types'
import React from 'react'

import { UserModel } from '../../src/server/models/auth'

const UserContext = React.createContext({})

type UserContextProps = {}

type UserContextState = {
  user: Object | null
}

export class UserProvider extends React.Component<
  UserContextProps,
  UserContextState
> {
  constructor(props: UserContextProps) {
    super(props)
    this.state = {
      user: null
    }
    this.setUser = this.setUser.bind(this)
  }

  static propTypes = {
    children: PropTypes.node
  }

  async componentDidMount() {
    ;(async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/auth/current_user'
        )
        if (response.status === 200) {
          localStorage.setItem('paf-user-token', response.data.token)
          this.setUser(response.data.token)
        }
      } catch (err) {}
    })()
  }

  setUser(newUser: Object | null) {
    this.setState({
      user: newUser
    })
  }

  render() {
    const { children } = this.props
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          setUser: this.setUser
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export const UserConsumer = UserContext.Consumer
