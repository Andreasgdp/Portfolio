import type { NextPage } from 'next';

import { Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';

import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useEffect, useState } from 'react';
import { WorkGridItem } from '../components/grid-item';
import ArticleLayout from '../components/layouts/article';
import Paragraph from '../components/paragraphy';
import Section from '../components/section';
import { client } from '../libs/client';

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
      <Container maxW="container.xxl" p={4}>
        <SimpleGrid
          columns={[1, null, 2]}
          column="1"
          gap={6}
          minChildWidth="49%"
        >
          <Container maxW="container.xxl">
            <Heading as="h2" fontSize={20} my={4}>
              Web Development
            </Heading>
            <Divider />
            <Section>
              <Paragraph>
                I have worked on a number of projects in the web development
                field. I like to work with the latest technologies and
                frameworks in my hobby projects, which I feel is the best way to
                keep up with the latest trends as well as expand the knowledge
                pool I have as a developer.
              </Paragraph>
            </Section>

            <SimpleGrid
              columns={[1, null, 2, null, 3, null, 4, null, 5]}
              minChildWidth="10rem"
              gap={6}
            >
              {works
                .filter((workData) => workData.category === 'Web Development')
                .map((workData, index) => (
                  <Section delay={0.1 * index} key={index}>
                    <WorkGridItem work={workData}>
                      {workData.abstract}
                    </WorkGridItem>
                  </Section>
                ))}
            </SimpleGrid>
          </Container>
          <Container maxW="container.xxl">
            <Heading as="h2" fontSize={20} my={4}>
              Kinematics
            </Heading>
            <Divider />
            <Section>
              <Paragraph>
                I have a keen interest in Kinematics and I have created one
                large project in this field (3rd semester project).
              </Paragraph>
            </Section>

            <SimpleGrid
              columns={[1, null, 2, null, 3, null, 4, null, 5]}
              minChildWidth="10rem"
              gap={6}
            >
              {works
                .filter((workData) => workData.category === 'Kinematics')
                .map((workData, index) => (
                  <Section delay={0.1 * index} key={index}>
                    <WorkGridItem work={workData}>
                      {workData.abstract}
                    </WorkGridItem>
                  </Section>
                ))}
            </SimpleGrid>
          </Container>
          <Container maxW="container.xxl">
            <Heading as="h2" fontSize={20} my={4}>
              Control Systems
            </Heading>
            <Divider />
            <Section>
              <Paragraph>
                I think Control Systems is an interesting and large topic. I
                think it is a good idea to learn about it as it is a very useful
                tool in many fields. The first explenation I got of Control
                Systems was in the 4th semester of my education as the cruise
                control in a car is a good example of a control system.
              </Paragraph>
              <Paragraph>
                I have created one large project in this field (4th semester
                project).
              </Paragraph>
            </Section>

            <SimpleGrid
              columns={[1, null, 2, null, 3, null, 4, null, 5]}
              minChildWidth="10rem"
              gap={6}
            >
              {works
                .filter((workData) => workData.category === 'Control Systems')
                .map((workData, index) => (
                  <Section delay={0.1 * index} key={index}>
                    <WorkGridItem work={workData}>
                      {workData.abstract}
                    </WorkGridItem>
                  </Section>
                ))}
            </SimpleGrid>
          </Container>
          <Container maxW="container.xxl">
            <Heading as="h2" fontSize={20} my={4}>
              General Robotics
            </Heading>
            <Divider />
            <Section>
              <Paragraph>
                This section is a collection of projects I have created in the
                field of robotics.
              </Paragraph>
            </Section>

            <SimpleGrid
              columns={[1, null, 2, null, 3, null, 4, null, 5]}
              minChildWidth="10rem"
              gap={6}
            >
              {works
                .filter((workData) => workData.category === 'General Robotics')
                .map((workData, index) => (
                  <Section delay={0.1 * index} key={index}>
                    <WorkGridItem work={workData}>
                      {workData.abstract}
                    </WorkGridItem>
                  </Section>
                ))}
            </SimpleGrid>
          </Container>
          <Container maxW="container.xxl">
            <Heading as="h2" fontSize={20} my={4}>
              App Development
            </Heading>
            <Divider />
            <Section>
              <Paragraph>
                I have worked on a couple of mobile applications in the past. I
                have a keen interest in mobile development and I am open for
                opportunities to work on mobile applications although I am not
                an expert in this field.
              </Paragraph>
              <Paragraph>
                For most of the projects I have created it has made sense to
                just convert them to a PWA and host them on the web as this is
                the most cost effective way to do it, that said I have created a
                couple of mobile applications both Native (Android) and Cross
                Platform (Flutter).
              </Paragraph>
            </Section>

            <SimpleGrid
              columns={[1, null, 2, null, 3, null, 4, null, 5]}
              minChildWidth="10rem"
              gap={6}
            >
              {works
                .filter((workData) => workData.category === 'App Development')
                .map((workData, index) => (
                  <Section delay={0.1 * index} key={index}>
                    <WorkGridItem work={workData}>
                      {workData.abstract}
                    </WorkGridItem>
                  </Section>
                ))}
            </SimpleGrid>
          </Container>

          <Container maxW="container.xxl">
            <Heading as="h2" fontSize={20} my={4}>
              Automation
            </Heading>
            <Divider />
            <Section>
              <Paragraph>
                I have created a couple of projects in the field of automation.
                This rages from bots to scripts.
              </Paragraph>
            </Section>

            <SimpleGrid
              columns={[1, null, 2, null, 3, null, 4, null, 5]}
              minChildWidth="10rem"
              gap={6}
            >
              {works
                .filter((workData) => workData.category === 'Automation')
                .map((workData, index) => (
                  <Section delay={0.1 * index} key={index}>
                    <WorkGridItem work={workData}>
                      {workData.abstract}
                    </WorkGridItem>
                  </Section>
                ))}
            </SimpleGrid>
          </Container>
        </SimpleGrid>
      </Container>
    </ArticleLayout>
  );
};

export default Works;
