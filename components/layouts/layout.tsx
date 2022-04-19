import React, { ReactNode } from 'react';

import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Box, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Navbar from '../navbar';
import AniballLoader from '../aniball-loader';
import Footer from '../footer';

const LazyAniball = dynamic(() => import('../aniball'), {
  ssr: false,
  loading: () => <AniballLoader />
});

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Andreas Petersen - Homepage</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.lg" pt={16}>
        {/* In here put some interresting graphic */}
        {/* <LazyAniball /> */}

        {children}
      </Container>

      <Footer />
    </Box>
  );
};

export default Layout;
