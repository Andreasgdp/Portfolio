import React, { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

type SectionProps = {
  children: ReactNode;
  delay?: number;
};

const Section = ({ children, delay = 0 }: SectionProps) => {
  return (
    <Box my={6}>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duraion: 0.8, delay }}
      >
        {children}
      </motion.div>
    </Box>
  );
};

export default Section;
