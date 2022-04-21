import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

type MarkdownProps = {
  url: string;
};

const Markdown = ({ url }: MarkdownProps) => {
  // fetch README.md from github e.g. url = https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md

  const [readme, setReadme] = useState<string>('');
  useEffect(() => {
    async function getToken() {
      const readme = await (await fetch(url)).text();
      setReadme(readme);
    }
    getToken();
  }, []);

  console.log(readme);
  return (
    <ReactMarkdown
      components={ChakraUIRenderer()}
      remarkPlugins={[gfm]}
      skipHtml
    >
      {readme}
    </ReactMarkdown>
  );
};

export default Markdown;
