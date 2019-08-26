import React from 'react'
import Link from 'next/link'
import { List } from 'semantic-ui-react'

function dateRepresentation(dateString: string) {
  return new Date(dateString).toLocaleDateString()
}

function cleanFileUrl(url: string) {
  return url.replace('.js', '')
}

export default function FileList(props: any): any {
  const { files } = props
  return (
    <List divided relaxed>
      {files.map((file: any) => (
        <List.Item>
          <List.Icon name="file outline" size="large" verticalAlign="middle" />
          <List.Content>
            <Link href={`/files/${cleanFileUrl(file.fileName)}`}>
              <List.Header as="a">{file.fileName}</List.Header>
            </Link>
            <List.Description as="a">
              Created on {dateRepresentation(file.createdAt)}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  )
}
