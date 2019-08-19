import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import Navbar from '../src/components/Navbar'
import { UserProvider, UserConsumer } from '../src/context/UserContext'

export default function About() {
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
              <Header as="h2">Features</Header>
              <Grid container columns={3} stackable>
                <Grid.Column>
                  <Segment basic padded="very" textAlign="center">
                    <Icon name="handshake outline" size="huge" />
                    <Header as="h3">Automatically Formatted</Header>
                    <p>No more bikeshedding</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment basic padded="very" textAlign="center">
                    <Icon name="key" size="huge" />
                    <Header as="h3">Securely Hosted</Header>
                    <p>No-one else sees your snippets</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment basic padded="very" textAlign="center">
                    <Icon name="user secret" size="huge" />
                    <Header as="h3">Use Anonymously</Header>
                    <p>Or logged in...</p>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Container>
          </>
        )}
      </UserConsumer>
    </UserProvider>
  )
}
