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
      borderColor={useColorModeValue('gray.800', 'whiteAlpha.800')}
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
  id: string;
  title: string;
  thumbnail: string;
};

export const WorkGridItem = ({
  children,
  id,
  title,
  thumbnail
}: WorkGridItemProps) => (
  <Box w="100%" textAlign="center">
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <NextLink href={`/works/${id}`} passHref>
        <LinkBox cursor="pointer">
          <Box
            borderColor={useColorModeValue('gray.800', 'whiteAlpha.800')}
            borderWidth={2}
            borderStyle="solid"
            borderRadius={12}
            position="relative"
            p={1}
          >
            <Image
              src={thumbnail}
              alt={title}
              className="grid-item-thumbnail"
              width="460px"
              height="260px"
            />
          </Box>
          <LinkOverlay href={`/works/${id}`}>
            <Text mt={2} fontSize={20}>
              {title}
            </Text>
          </LinkOverlay>
          <Text fontSize={14}>{children}</Text>
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
