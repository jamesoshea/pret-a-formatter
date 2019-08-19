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
        const response = await axios.post<UserModel>(
          'http://localhost:3000/api/auth/current_user'
        )
        this.setUser(response.data)
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
