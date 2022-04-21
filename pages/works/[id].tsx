import {
  Badge,
  Center,
  Container,
  Grid,
  GridItem,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react';

import ArticleLayout from '../../components/layouts/article';
import Markdown from '../../components/markdown';
import Video from '../../components/video';
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
        {/* Content goes in between here */}
        {/* If the content is a link to github project -> get readme and display using react-markdown */}
        {/* If the content is written on Sanity CMS -> display content */}
        <Markdown url="https://raw.githubusercontent.com/Andreasgdp/Portfolio/master/README.md"></Markdown>
        {/* Content goes in between here */}
        {workData.video &&
          workData.video.map((video) => {
            return (
              <Center mt={12} key={video}>
                <Video video={video} />
              </Center>
            );
          })}
      </Container>
    </ArticleLayout>
  );
}
