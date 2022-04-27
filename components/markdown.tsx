import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

type MarkdownProps = {
  url: string;
};

const Markdown = ({ url }: MarkdownProps) => {
  const [readme, setReadme] = useState<string>('');
  useEffect(() => {
    async function getToken() {
      const fetchedReadme = await (await fetch(url)).text();
      setReadme(fetchedReadme);
    }
    getToken();
  }, []);

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
