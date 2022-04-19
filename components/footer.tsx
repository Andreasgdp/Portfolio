import React from 'react';

import {
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Link
} from '@chakra-ui/react';
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io5';

const Footer = () => {
  return (
    <Container mt={12} maxW="container.lg">
      <Divider />
      <HStack justifyContent="end">
        <Link href="https://www.linkedin.com/in/andreasgdp/" target="_blank">
          <Button
            variant="ghost"
            leftIcon={<IoLogoLinkedin />}
            colorScheme="purple"
          >
            Linkedin
          </Button>
        </Link>
        <Link href="https://github.com/Andreasgdp" target="_blank">
          <Button
            variant="ghost"
            leftIcon={<IoLogoGithub />}
            colorScheme="purple"
          >
            Github
          </Button>
        </Link>
        <Link href="https://www.instagram.com/andreasgdp/" target="_blank">
          <Button
            variant="ghost"
            leftIcon={<IoLogoInstagram />}
            colorScheme="purple"
          >
            Instagram
          </Button>
        </Link>
      </HStack>
      <Box mt={4} textAlign="center" opacity={0.4} fontSize="sm">
        &copy; This website is based on Takuya Matsuyama&apos;s tutorial.
      </Box>
    </Container>
  );
};

export default Footer;

