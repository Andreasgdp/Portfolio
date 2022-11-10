import type { NextPage } from 'next';

import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  Heading,
  Image,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useEffect, useState } from 'react';
import { BioSection, BioYear } from '../components/bio';
import Education, { EducationType } from '../components/education';
import Experience, { ExperienceType } from '../components/experience';
import ArticleLayout from '../components/layouts/article';
import Paragraph from '../components/paragraphy';
import Section from '../components/section';
import { client } from '../libs/client';

const ProfileImage = chakra(Image, {
  shouldForwardProp: (prop) => ['width', 'height', 'src', 'alt'].includes(prop)
});

const Home: NextPage = () => {
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [biography, setBiography] = useState([]);

  useEffect(() => {
    const expQuery = '*[_type == "experiences"] | order(startingDate desc)';
    const eduQuery = '*[_type == "education"] | order(startYear desc)';
    const bioQuery = '*[_type == "biography"]';

    client.fetch(expQuery).then((data) => setExperience(data));
    client.fetch(eduQuery).then((data) => setEducation(data));
    client.fetch(bioQuery).then((data) => setBiography(data));
  }, []);

  return (
    <ArticleLayout>
      <Container maxW="container.lg">
        <Box
          borderRadius="lg"
          bg={useColorModeValue('purple.100', 'purple.700')}
          p={3}
          my={12}
        >
          <Text fontSize={['2xl', '4xl', '6xl']} align="center">
            Hello, I&apos;m a Problem Solver.
          </Text>
        </Box>

        <Box display={{ md: 'flex' }}>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Box
              borderColor="purple.800"
              borderWidth={2}
              borderStyle="solid"
              w="236px"
              h="236px"
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
                Student in Denmark currently studying at University of Southern
                Denmark, SDU to gain my bachelor&apos;s degree in Robotics in
                January of 2024.
              </Paragraph>
            </Section>
          </Box>
        </Box>

        <Section delay={0.1}>
          <Paragraph>
            I have a drive for solving real-life problems as it gives me a sense
            of accomplishment seeing the help I can create for others. I have a
            great passion for both Robotics and Software Development, as they
            are different tools to solve real-life problems.
          </Paragraph>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Works
          </Heading>
          <Paragraph>
            Some of my works are open-source projects which either I or my
            friends and I have created and are activly maintaining. The other
            projects are a mix of hobby projects and projects during my study in
            Robotics.
          </Paragraph>
          <Center my={4}>
            <NextLink href="/works" scroll={false} passHref>
              <Button rightIcon={<ChevronRightIcon />} colorScheme="purple">
                My Portfolio
              </Button>
            </NextLink>
          </Center>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Experience
          </Heading>
          {experience.map((exp: ExperienceType, index) => (
            <Experience exp={exp} key={index} />
          ))}
        </Section>

        <Section delay={0.4}>
          <Heading as="h3" variant="section-title">
            Education
          </Heading>
          {education.map((edu: EducationType, index) => (
            <Education edu={edu} key={index} />
          ))}
        </Section>

        <Section delay={0.5}>
          <Heading as="h3" variant="section-title">
            Biography
          </Heading>
          {biography.map((bio: { year: number; content: string }, index) => (
            <BioSection key={bio.content + index}>
              <BioYear>{bio.year}</BioYear>
              {bio.content}
            </BioSection>
          ))}
        </Section>
      </Container>
    </ArticleLayout>
  );
};

export default Home;
