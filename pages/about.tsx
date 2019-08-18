import 'semantic-ui-css/semantic.min.css'
import {
  Container,
  Grid,
  Header as StyledHeader,
  Icon,
  Segment
} from 'semantic-ui-react'
import Header from '../src/components/Header'

export default function Index() {
  return (
    <>
      <Header />
      <Container>
        <StyledHeader as="h2">Features</StyledHeader>
        <Grid container columns={3} stackable>
          <Grid.Column>
            <Segment basic padded="very" textAlign="center">
              <Icon name="handshake outline" size="huge" />
              <StyledHeader as="h3">Automatically Formatted</StyledHeader>
              <p>No more bikeshedding</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment basic padded="very" textAlign="center">
              <Icon name="key" size="huge" />
              <StyledHeader as="h3">Securely Hosted</StyledHeader>
              <p>No-one else sees your snippets</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment basic padded="very" textAlign="center">
              <Icon name="user secret" size="huge" />
              <StyledHeader as="h3">Use Anonymously</StyledHeader>
              <p>Or logged in...</p>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  )
}
