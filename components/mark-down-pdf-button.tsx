import { Button } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';

type MarkdownProps = {
  url: string;
};

const MarkDownPdfButton = ({ url }: MarkdownProps) => {
  const [readme, setReadme] = useState<string>('');
  useEffect(() => {
    async function getToken() {
      const fetchedReadme = await (await fetch(url)).text();
      setReadme(fetchedReadme);
    }
    getToken();
  }, []);

  return (
    // Button to download the markdown as pdf
    <>
      <Button
        colorScheme="purple"
        size="md"
        variant="outline"
        onClick={() => {
          const doc = new jsPDF();
          doc.text(readme, 10, 10);
          doc.save('markdown.pdf');
        }}
      >
        Download as PDF
      </Button>
    </>
  );
};

export default MarkDownPdfButton;
