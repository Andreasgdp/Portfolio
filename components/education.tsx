import { Box, Heading, Text } from '@chakra-ui/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlForImage } from '../libs/client';
import { CompanyLogo } from '../libs/utils';

export type EducationType = {
  startYear: string;
  endYear: string;
  institutionLogo: SanityImageSource;
  institution: string;
  focus: string;
  desc: string;
};

export type EducationProps = {
  edu: EducationType;
};

// display date as year
const displayYear = (date: string) => {
  const startingDate = new Date(date);
  const year = startingDate.getFullYear();
  return `${year}`;
};

const Education = ({ edu }: EducationProps) => {
  return (
    <Box display={{ md: 'flex' }}>
      <Box flexShrink={0} ml={{ md: 0 }} textAlign="center">
        <CompanyLogo
          src={urlForImage(edu.institutionLogo).url()}
          alt="Profile image"
          borderRadius="base"
          width="60px"
          margin={2}
        />
      </Box>
      <Box flexGrow={1}>
        <Heading as="h2" variant="company-title" textAlign="left">
          {edu.institution}
        </Heading>
        <Text mb={{ base: 0, md: 1 }} fontSize="xl" align="left">
          {edu.focus}
        </Text>
        <Text mb={{ base: 0, md: 1 }} fontSize="lg" align="left">
          {displayYear(edu.startYear)} - {displayYear(edu.endYear)}
        </Text>
        <Text mb={{ base: 0, md: 1 }} fontSize="md" align="left">
          {edu.desc}
        </Text>
      </Box>
    </Box>
  );
};

export default Education;
