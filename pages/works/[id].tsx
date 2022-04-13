import {
  Badge,
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  HStack,
  Image,
  Link,
  List,
  ListItem,
  Text
} from '@chakra-ui/react';
import { MDXRemote } from 'next-mdx-remote';

import ArticleLayout from '../../components/layouts/article';
import { Title } from '../../components/works';
import { getAllWorkIds, getWorkData } from '../../libs/works';

export async function getStaticPaths() {
  const paths = getAllWorkIds();
  return {
    paths,
    fallback: false
  };
}

type staticProps = {
  params: {
    id: string;
  };
};

export async function getStaticProps({ params }: staticProps) {
  const workData = await getWorkData(params.id);
  return {
    props: {
      workData
    }
  };
}

type workProps = {
  workData: {
    id: string;
    title: string;
    year: string;
    platform: string;
    stack: string;
    source: string;
    website: string;
    abstract: string;
    image: string;
    video: Array<string>;
    contentHtml: any;
  };
};

const components = {
  Text,
  Box,
  List,
  ListItem,
  Badge,
  Image,
  HStack,
  Container
};

export default function Work({ workData }: workProps) {
  const listitems: Array<keyof typeof workData> = [
    'platform',
    'stack',
    'source',
    'website'
  ];

  return (
    <ArticleLayout title={workData.title}>
      <Container maxW="container.md">
        <Title>
          {workData.title} <Badge>{workData.year}</Badge>
        </Title>
        <MDXRemote {...workData.contentHtml} components={components} />
        <List ml={4} my={4}>
          {listitems.map((listitem) => {
            return (
              listitem in workData && (
                <ListItem key={listitem}>
                  <Grid templateColumns="repeat(12, 1fr)">
                    <GridItem colSpan={{ base: 12, md: 2 }}>
                      <Badge colorScheme="cyan" mr={4}>
                        {listitem}
                      </Badge>
                    </GridItem>
                    <GridItem colSpan={{ base: 12, md: 10 }}>
                      {listitem === 'source' || listitem === 'website' ? (
                        <Link href={workData[listitem]} target="_blank">
                          {workData.title} - {listitem}
                        </Link>
                      ) : (
                        workData[listitem]
                      )}
                    </GridItem>
                  </Grid>
                </ListItem>
              )
            );
          })}
        </List>
        {workData.video &&
          workData.video.map((video) => {
            return (
              <Center mt={12} key={video}>
                <video autoPlay loop muted width="700px">
                  <source src={video} />
                </video>
              </Center>
            );
          })}
        <Center>
          <Text as="i" textAlign="center">
            Demo video
          </Text>
        </Center>
      </Container>
    </ArticleLayout>
  );
}
