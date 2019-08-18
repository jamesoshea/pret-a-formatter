import PropTypes from 'prop-types'
import React from 'react'

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

  setUser(newUser: Object) {
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
