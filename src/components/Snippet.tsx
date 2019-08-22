import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Header } from 'semantic-ui-react'

const Snippet = (props: any) => {
  const { file, fileName } = props

  if (!file) return null
  return (
    <>
      <Link href={`/files/${fileName}`}>
        <a>
          <Header>{`${fileName}.js`}</Header>
        </a>
      </Link>
      <SyntaxHighlighter language="javascript">{file}</SyntaxHighlighter>
    </>
  )
}

export default Snippet
