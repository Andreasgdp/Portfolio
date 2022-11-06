import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Divider, Link, Wrap } from '@chakra-ui/react';
import { CSSProperties } from 'react';
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io5';

const socialsStyle: CSSProperties = { marginTop: '0.5rem' };

const Footer = () => {
  return (
    <Container mt={12} maxW="container.lg">
      <Divider />
      <Wrap justify="right" spacing={1} style={socialsStyle}>
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
      </Wrap>
      <Wrap justify="center">
        <Link href="https://andreasgdp-backend.sanity.studio" target="_blank">
          <Button leftIcon={<EditIcon />} colorScheme="purple" variant="ghost">
            Edit Portfolio
          </Button>
        </Link>
      </Wrap>
      <Box mt={4} textAlign="center" opacity={0.4} fontSize="sm">
        &copy; 2022.
      </Box>
    </Container>
  );
};

export default Footer;
