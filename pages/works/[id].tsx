import {
  Badge,
  Center,
  Container,
  Grid,
  GridItem,
  Link,
  List,
  ListItem,
  Text
} from '@chakra-ui/react';

import ArticleLayout from '../../components/layouts/article';
import Markdown from '../../components/markdown';
import Video from '../../components/video';
import { Title } from '../../components/works';
import { client } from '../../libs/client';
import { workType } from '../works';

export async function getAllWorkIds() {
  const query = `*[_type == "works"]`;

  const workData: workType[] = await client.fetch(query);

  return workData.map((work) => {
    return {
      params: {
        id: work._id
      }
    };
  });
}

export function getReadmeFromRepoUrl(url: string) {
  // if url contains "https://" remove
  if (url.includes('https://')) {
    url = url.replace('https://', '');
  }

  const readmeUrl = url.replace('github.com', 'raw.githubusercontent.com');
  return `https://${readmeUrl}/master/README.md`;
}

export async function getStaticPaths() {
  const paths = await getAllWorkIds();
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

export async function getStaticProps({
  params
}: staticProps): Promise<{ props: { workData: workType } }> {
  const query = `*[_type == "works" && _id == "${params.id}"]`;

  // selecting first element as the return value from Sanity is always
  // even tho this query will allways produce 1 item.
  const workData: workType = (await client.fetch(query))[0];
  return {
    props: {
      workData
    }
  };
}

type workProps = {
  workData: workType;
};

export default function Work({ workData }: workProps) {
  const listitems: Array<keyof workType> = [
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
        <List ml={4} my={4}>
          {listitems.map((listitem) => {
            return (
              listitem in workData && (
                <ListItem key={listitem}>
                  <Grid templateColumns="repeat(12, 1fr)">
                    <GridItem colSpan={{ base: 12, md: 2 }}>
                      <Badge colorScheme="purple" mr={4}>
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
        {/* TODO Implement the comments below */}
        {/* If the content is a link to github project -> get readme and display using react-markdown */}
        {/* If the content is written on Sanity CMS -> display content */}
        <Markdown url={getReadmeFromRepoUrl(workData.source)}></Markdown>
        {workData.videos &&
          workData.videos.map((video) => {
            return (
              <Center mt={12} key={video}>
                <Video video={video} />
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
