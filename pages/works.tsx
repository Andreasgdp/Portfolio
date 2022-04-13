import type { NextPage } from 'next';

import {
  Container,
  Divider,
  Heading,
  Link,
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
    <ArticleLayout title="Wroks">
      <Container maxW="container.lg">
        <Heading as="h2" fontSize={20} my={4}>
          Computer Vision
        </Heading>
        <Divider />
        <Section>
          <Paragraph>
            Computer Vision has been achived with Neural Networks. With the
            success of deep learning, our life is more convenient. My Lab
            conduct research on this topic, the below is what I took part in.
          </Paragraph>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {allWorksData
            .filter((data) => data.category === 'Computer Vision')
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
          Web Development
        </Heading>
        <Divider />
        <Section>
          <Paragraph>
            In my spare time, I enjoy learning something new. Web development is
            one of them because the convenience of writing code anywhere without
            setting up environment. In addtion, with PC, labtop, or even mobile
            phone, you can browse the web anytime.
          </Paragraph>
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
          Cocos Creator Project
        </Heading>
        <Divider />
        <Section>
          <Paragraph>
            {' '}
            <Link href="https://www.cocos.com/en/creator" target="_blank">
              Cocos Creator
            </Link>{' '}
            is an engine for building amazing games and software that works on
            phones, tablets, PCs, and the web.
          </Paragraph>
          <Paragraph>
            The following projects were Academia and Industry Collaboration,
            which collaborated with BioxiTech and IGS. The backend server and
            game art design were provided by companies. I was responsible for
            building frontend.
          </Paragraph>
          <Paragraph>
            In the progress of projects, I learned how to version control by git
            and svn, and understood how to call backend API.
          </Paragraph>
        </Section>

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
