import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Header } from 'semantic-ui-react'

const Snippet = (props: any) => {
  const { file, fileName } = props

  if (!file) return null
  return (
    <>
      <Header>{fileName}</Header>
      <SyntaxHighlighter language="javascript">{file}</SyntaxHighlighter>
    </>
  )
}

export default Snippet
