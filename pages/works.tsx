import type { NextPage } from 'next';

import { Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';

import ArticleLayout from '../components/layouts/article';
import Section from '../components/section';
import { WorkGridItem } from '../components/grid-item';
import Paragraph from '../components/paragraphy';
import { useEffect, useState } from 'react';
import { client } from '../libs/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type workType = {
  _id: string;
  category: string;
  title: string;
  year: string;
  platform: string;
  stack: string[];
  source: string;
  website: string;
  abstract: string;
  imgUrl: SanityImageSource;
  videos: Array<string>;
};

const Works: NextPage = () => {
  const [works, setWorks] = useState([] as Array<workType>);

  useEffect(() => {
    const query = '*[_type == "works"]';
    client.fetch(query).then((data) => setWorks(data));
  }, []);

  return (
    <ArticleLayout title="Works">
      <Container maxW="container.lg">
        <Heading as="h2" fontSize={20} my={4}>
          Web Development
        </Heading>
        <Divider />
        <Section>
          <Paragraph>
            I have worked on a number of projects in the web development field.
            I like to work with the latest technologies and frameworks in my
            hobby projects, which I feel is the best way to keep up with the
            latest trends as well as expand the knowledge pool I have as a
            developer.
          </Paragraph>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {works
            .filter((workData) => workData.category === 'Web Development')
            .map((workData, index) => (
              <Section delay={0.1} key={index}>
                <WorkGridItem work={workData}>{workData.abstract}</WorkGridItem>
              </Section>
            ))}
        </SimpleGrid>
        <Heading as="h2" fontSize={20} my={4}>
          App Development
        </Heading>
        <Divider />
        <Section>
          <Paragraph>...</Paragraph>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {works
            .filter((workData) => workData.category === 'App Development')
            .map((workData, index) => (
              <Section delay={0.1} key={index}>
                <WorkGridItem work={workData}>{workData.abstract}</WorkGridItem>
              </Section>
            ))}
        </SimpleGrid>

        <Heading as="h2" fontSize={20} my={4}>
          Kinematics
        </Heading>
        <Divider />
        <Section>
          <Paragraph>...</Paragraph>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {works
            .filter((workData) => workData.category === 'Kinematics')
            .map((workData, index) => (
              <Section delay={0.1} key={index}>
                <WorkGridItem work={workData}>{workData.abstract}</WorkGridItem>
              </Section>
            ))}
        </SimpleGrid>

        <Heading as="h2" fontSize={20} my={4}>
          Control Systems
        </Heading>
        <Divider />
        <Section>
          <Paragraph>...</Paragraph>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {works
            .filter((workData) => workData.category === 'Control Systems')
            .map((workData, index) => (
              <Section delay={0.1} key={index}>
                <WorkGridItem work={workData}>{workData.abstract}</WorkGridItem>
              </Section>
            ))}
        </SimpleGrid>

        <Heading as="h2" fontSize={20} my={4}>
          MISC
        </Heading>
        <Divider />
        <Section>
          <Paragraph>...</Paragraph>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {works
            .filter((workData) => workData.category === 'MISC')
            .map((workData, index) => (
              <Section delay={0.1} key={index}>
                <WorkGridItem work={workData}>{workData.abstract}</WorkGridItem>
              </Section>
            ))}
        </SimpleGrid>
      </Container>
    </ArticleLayout>
  );
};

export default Works;
