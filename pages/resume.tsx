import type { NextPage } from 'next';

import { Badge, Center, Container } from '@chakra-ui/react';

import ArticleLayout from '../components/layouts/article';
import { Title } from '../components/works';
import { getReadmeFromRepoUrl } from './works/[id]';
import Markdown from '../components/markdown';
import MarkDownPdfButton from '../components/mark-down-pdf-button';

const Notes: NextPage = () => {
  // get current year
  const year = new Date().getFullYear();

  return (
    <ArticleLayout title={'Resume'}>
      <Container maxW="container.md">
        <Title>
          Resume <Badge>{year}</Badge>
        </Title>

        <Markdown
          url={getReadmeFromRepoUrl('https://github.com/Andreasgdp/Resume')}
        />
        <Center>
          <MarkDownPdfButton
            url={getReadmeFromRepoUrl('https://github.com/Andreasgdp/Resume')}
          ></MarkDownPdfButton>
        </Center>
      </Container>
    </ArticleLayout>
  );
};

export default Notes;
