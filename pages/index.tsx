import type { NextPage } from 'next';

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
  useColorModeValue,
  chakra,
  Image
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { ChevronRightIcon } from '@chakra-ui/icons';

import ArticleLayout from '../components/layouts/article';
import Section from '../components/section';
import Paragraph from '../components/paragraphy';
import { BioSection, BioYear } from '../components/bio';

const ProfileImage = chakra(Image, {
  shouldForwardProp: (prop) => ['width', 'height', 'src', 'alt'].includes(prop)
});

const Home: NextPage = () => {
  return (
    <ArticleLayout>
      <Container maxW="container.lg">
        <Box
          borderRadius="lg"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          p={3}
          my={12}
        >
          <Text fontSize={['2xl', '4xl', '6xl']} align="center">
            Hello, I&apos;m a full-stack developer.
          </Text>
        </Box>

        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title" textAlign="center">
              Andreas Guldberg Duelund Petersen
            </Heading>
            <Text mb={{ base: 0, md: 1 }} fontSize="xl" align="center">
              Development: Web / App
            </Text>
            <Text mb={{ base: 0, md: 12 }} fontSize="xl" align="center">
              Robotics: Kinematics / Control Systems
            </Text>
            <Section>
              <Paragraph>
                My name is Andreas Petersen, a student in Denmark. I&apos;m
                currently studying at University of Southern Denmark, SDU to
                gain my bachelor&apos;s degree in Robotics.
              </Paragraph>
              <Paragraph>
                I specialize in ???. Also, Web Developement is my hobby. Solving
                real-life problem give me a sense of accomplishment.
              </Paragraph>
            </Section>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Box
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              w="236px"
              h="295px"
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <ProfileImage
                src="/images/photo.jpg"
                alt="Profile image"
                borderRadius="full"
                width="100%"
                height="100%"
              />
            </Box>
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            Some of my work are open-source projects which either I or my friend
            and I have created and are activly maintaining. The other projects
            are a mix of hobby projects and projects during my study in
            Robotics.
          </Paragraph>
          <Center my={4}>
            <NextLink href="/works" scroll={false} passHref>
              <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                My Portfolio
              </Button>
            </NextLink>
          </Center>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Biography
          </Heading>
          <BioSection>
            <BioYear>2000</BioYear>
            Born in Odense, Denmark.
          </BioSection>
          <BioSection>
            <BioYear>2020</BioYear>
            Graduated high school with a grade point average of 11.4.
          </BioSection>
        </Section>
      </Container>
    </ArticleLayout>
  );
};

export default Home;
