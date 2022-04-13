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
        <Link
          href="https://www.linkedin.com/in/chia-cheng-tsao"
          target="_blank"
        >
          <Button
            variant="ghost"
            leftIcon={<IoLogoLinkedin />}
            colorScheme="teal"
          >
            Linkedin
          </Button>
        </Link>
        <Link href="https://github.com/acebenson0704" target="_blank">
          <Button
            variant="ghost"
            leftIcon={<IoLogoGithub />}
            colorScheme="teal"
          >
            Github
          </Button>
        </Link>
        <Link
          href="https://www.instagram.com/aabcd60628891tw5/"
          target="_blank"
        >
          <Button
            variant="ghost"
            leftIcon={<IoLogoInstagram />}
            colorScheme="teal"
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
