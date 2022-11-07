import { ReactNode } from 'react';

import {
  Box,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import NextLink from 'next/link';
import { urlForImage } from '../libs/client';
import { workType } from '../pages/works';

type GridItemProps = {
  children?: ReactNode;
  href: string;
  title: string;
};

export const GridItem = ({ children, href, title }: GridItemProps) => (
  <motion.div
    whileHover={{ color: ['', '#ff471a'] }}
    transition={{ duration: 0.2, type: 'easeInOut' }}
  >
    <LinkBox
      cursor="pointer"
      w="100%"
      h="100%"
      borderColor={useColorModeValue('gray.800', 'purple.800')}
      borderWidth={2}
      borderStyle="solid"
      borderRadius={12}
      p={4}
    >
      <LinkOverlay href={href} target="_blank">
        <Text fontSize={20} my={2} textAlign="center">
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize={16}>{children}</Text>
    </LinkBox>
  </motion.div>
);

type WorkGridItemProps = {
  children: ReactNode;
  work: workType;
};

export const WorkGridItem = ({ children, work }: WorkGridItemProps) => (
  <Box w="100%" textAlign="center">
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <NextLink href={`/works/${work._id}`} passHref>
        <LinkBox cursor="pointer">
          <Box
            bg={useColorModeValue('gray.100', 'gray.700')}
            borderColor={useColorModeValue('gray.100', 'gray.700')}
            borderWidth={4}
            borderStyle="solid"
            borderRadius={12}
            position="relative"
            p={1}
          >
            <Image
              src={urlForImage(work.imgUrl).url()}
              alt={work.title}
              className="grid-item-thumbnail"
              width="580px"
              height="300px"
              objectFit="cover"
            />
            <Text mt={2} fontSize={20}>
              {work.title}
            </Text>
            <Text fontSize={14}>{children}</Text>
          </Box>
        </LinkBox>
      </NextLink>
    </motion.div>
  </Box>
);

export const GridItemStyle = () => (
  <Global
    styles={`
    .grid-item-thumbnail {
      border-radius: 12px;
    }
    `}
  />
);
