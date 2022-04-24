import NextLink from 'next/link';
import { Box, Link, Heading } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';

type titleProps = {
  children: ReactNode;
};

export const Title = ({ children }: titleProps) => (
  <Box>
    <NextLink href="/works" passHref>
      <Link>Works</Link>
    </NextLink>
    <span>
      {' '}
      <ChevronRightIcon />{' '}
    </span>
    <Heading display="inline-block" as="h3" fontSize={20} mb={4}>
      {children}
    </Heading>
  </Box>
);
