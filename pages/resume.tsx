import type { NextPage } from 'next';

import { Badge, Button, Center, Container, Heading } from '@chakra-ui/react';
import { client, urlForFile } from '../libs/client';

import { DownloadIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import ArticleLayout from '../components/layouts/article';
import Section from '../components/section';
import { Title } from '../components/works';

export type resumeType = {
  _id: string;
  title: string;
  resume: any;
};

const Notes: NextPage = () => {
  const [resumes, setResumes] = useState([] as Array<resumeType>);

  // get current year
  const year = new Date().getFullYear();

  useEffect(() => {
    const query = '*[_type == "resume"]';
    client.fetch(query).then((data) => setResumes(data));
  }, []);

  return (
    <ArticleLayout title={'Resume'}>
      <Container maxW="container.md">
        <Title>
          Resume <Badge>{year}</Badge>
        </Title>
        {resumes.map((resume: resumeType, index) => (
          <Section delay={0.1} key={index}>
            <object
              data={urlForFile(resume.resume.asset._ref)}
              type="application/pdf"
              width="100%"
              height="800px"
            >
              {' '}
              <Heading>
                Displaying PDF is not supported by your browser/device.
                Please...
              </Heading>
              <Center my={4}>
                <NextLink
                  href={urlForFile(resume.resume.asset._ref)}
                  scroll={false}
                  passHref
                >
                  <Button leftIcon={<DownloadIcon />} colorScheme="purple">
                    Download Resume
                  </Button>
                </NextLink>{' '}
              </Center>
            </object>
          </Section>
        ))}
      </Container>
    </ArticleLayout>
  );
};

export default Notes;
