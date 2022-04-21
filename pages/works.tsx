import type { NextPage } from 'next';

import {
  Container,
  Divider,
  Heading,
  SimpleGrid
} from '@chakra-ui/react';

import { getWorksData } from '../libs/works';
import ArticleLayout from '../components/layouts/article';
import Section from '../components/section';
import { WorkGridItem } from '../components/grid-item';
import Paragraph from '../components/paragraphy';

export async function getStaticProps() {
  const allWorksData = getWorksData();
  return {
    props: {
      allWorksData
    }
  };
}

type allWorksDataProps = {
  allWorksData: [
    {
      id: string;
      title: string;
      category: string;
      abstract: string;
      image: string;
    }
  ];
};

const Works: NextPage<allWorksDataProps> = ({
  allWorksData
}: allWorksDataProps) => {
  return (
    <ArticleLayout title="Works">
      <Container maxW="container.lg">
        <Heading as="h2" fontSize={20} my={4}>
          Web Development
        </Heading>
        <Divider />
        <Section>
          <Paragraph>...</Paragraph>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {allWorksData
            .filter((data) => data.category === 'Web Development')
            .map((data) => {
              return (
                <Section delay={0.1} key={data.id}>
                  <WorkGridItem
                    id={data.id}
                    title={data.title}
                    thumbnail={data.image}
                  >
                    {data.abstract}
                  </WorkGridItem>
                </Section>
              );
            })}
        </SimpleGrid>

        <Heading as="h2" fontSize={20} my={4}>
          App Development
        </Heading>
        <Divider />
        <Section>
          <Paragraph>...</Paragraph>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {allWorksData
            .filter((data) => data.category === 'App Development')
            .map((data) => {
              return (
                <Section delay={0.1} key={data.id}>
                  <WorkGridItem
                    id={data.id}
                    title={data.title}
                    thumbnail={data.image}
                  >
                    {data.abstract}
                  </WorkGridItem>
                </Section>
              );
            })}
        </SimpleGrid>

        <Heading as="h2" fontSize={20} my={4}>
          Kinematics
        </Heading>
        <Divider />
        <Section>
          <Paragraph>...</Paragraph>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {allWorksData
            .filter((data) => data.category === 'Kinematics')
            .map((data) => {
              return (
                <Section delay={0.1} key={data.id}>
                  <WorkGridItem
                    id={data.id}
                    title={data.title}
                    thumbnail={data.image}
                  >
                    {data.abstract}
                  </WorkGridItem>
                </Section>
              );
            })}
        </SimpleGrid>

        <Heading as="h2" fontSize={20} my={4}>
          Control Systems
        </Heading>
        <Divider />
        <Section>
          <Paragraph>...</Paragraph>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {allWorksData
            .filter((data) => data.category === 'Control Systems')
            .map((data) => {
              return (
                <Section delay={0.1} key={data.id}>
                  <WorkGridItem
                    id={data.id}
                    title={data.title}
                    thumbnail={data.image}
                  >
                    {data.abstract}
                  </WorkGridItem>
                </Section>
              );
            })}
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {allWorksData
            .filter((data) => data.category === 'Cocos Creator Project')
            .map((data) => {
              return (
                <Section delay={0.2} key={data.id}>
                  <WorkGridItem
                    id={data.id}
                    title={data.title}
                    thumbnail={data.image}
                  >
                    {data.abstract}
                  </WorkGridItem>
                </Section>
              );
            })}
        </SimpleGrid>
      </Container>
    </ArticleLayout>
  );
};

export default Works;



