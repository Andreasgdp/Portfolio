import { Button, useToast } from '@chakra-ui/react';
import React from 'react';

type MarkdownProps = {
  url: string;
};

const MarkDownPdfButton = ({ url }: MarkdownProps) => {
  const toast = useToast();
  console.log(url);

  return (
    // Button to download the markdown as pdf
    <>
      <Button
        colorScheme="purple"
        size="md"
        variant="outline"
        onClick={() =>
          toast({
            title: 'Feature not implemented yet.',
            description: 'Comming soon...',
            status: 'info',
            duration: 9000,
            isClosable: true
          })
        }
      >
        Download as PDF
      </Button>
    </>
  );
};

export default MarkDownPdfButton;
