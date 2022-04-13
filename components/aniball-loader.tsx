import React, { forwardRef, useRef } from 'react';

import { Box, Spinner } from '@chakra-ui/react';

export const AniballSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
);

export const AniballContainer = forwardRef<HTMLDivElement>(
  ({ children }, ref) => (
    <Box
      ref={ref}
      m="auto"
      mt={['-20px', '-60px', '-120px']}
      mb={['-40px', '-140px', '-200px']}
      w={[280, 480, 640]}
      h={[280, 480, 640]}
    >
      {children}
    </Box>
  )
);

AniballContainer.displayName = 'AniballContainer';

const Loader = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refProps = {
    ref: refContainer
  };
  return (
    <AniballContainer {...refProps}>
      <AniballSpinner />
    </AniballContainer>
  );
};

export default Loader;
