import React, { ReactNode } from 'react';

import {
  Box,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { Global } from '@emotion/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { workType } from '../pages/works';
import { urlFor } from '../libs/client';
import { IoHeartSharp } from 'react-icons/io5';

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
            bg={useColorModeValue('gray.800', 'gray.700')}
            borderColor={useColorModeValue('gray.800', 'gray.700')}
            borderWidth={4}
            borderStyle="solid"
            borderRadius={12}
            position="relative"
            p={1}
          >
            <Image
              src={urlFor(work.imgUrl).url()}
              alt={work.title}
              className="grid-item-thumbnail"
              width="460px"
              height="260px"
              objectFit="cover"
            />
            {/* like button */}
            <Box
              position="absolute"
              bottom={10}
              left={6}
              bg={useColorModeValue('gray.700', 'gray.600')}
              borderRadius="50%"
              p={2}
              boxShadow="0px 0px 4px rgba(0, 0, 0, 0.25)"
            >
              <IoHeartSharp />
            </Box>
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
