import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Header as SemanticHeader } from 'semantic-ui-react'

const Snippet = (props: any) => {
  const { file, fileName } = props

  if (!file) return null
  return (
    <>
      <SemanticHeader>{fileName}</SemanticHeader>
      <SyntaxHighlighter language="javascript">{file}</SyntaxHighlighter>
    </>
  )
}

export default Snippet
