import { Box, Heading, Text } from '@chakra-ui/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import moment from 'moment';
import { urlForImage } from '../libs/client';
import { CompanyLogo } from '../libs/utils';

export type ExperienceType = {
  startingDate: string;
  companyLogo: SanityImageSource;
  company: string;
  position: string;
  desc: string;
};

export type ExperienceProps = {
  exp: ExperienceType;
};

// function to calculate amt of years and mothns between a date and now
const timeSince = (date: string) => {
  const today = new Date();
  const startingDate = new Date(date);

  const m1 = moment(today);
  const m2 = moment(startingDate);
  const timeLeft = moment.duration(m1.diff(m2));
  const monthsLeft = timeLeft.asMonths();

  if (monthsLeft < 12) {
    return `${timeLeft.get('months')} months`;
  }
  let years = timeLeft.get('years');
  let months = timeLeft.get('months');

  // Add 1 to months to show same month as current month (same as LinkedIn)
  months += 1;
  if (months >= 12) {
    months -= 12;
    years += 1;
  }

  return `${years} years ${months} months`;
};

// function to display time as month and year
const displayTime = (date: string) => {
  const startingDate = new Date(date);
  const month = startingDate.toLocaleString('default', { month: 'long' });
  const year = startingDate.getFullYear();
  return `${month} ${year}`;
};

const Experience = ({ exp }: ExperienceProps) => {
  return (
    <Box display={{ md: 'flex' }}>
      <Box flexShrink={0} ml={{ md: 0 }} textAlign="center">
        <CompanyLogo
          src={urlForImage(exp.companyLogo).url()}
          alt="Profile image"
          borderRadius="base"
          width="60px"
          margin={2}
        />
      </Box>
      <Box flexGrow={1}>
        <Heading as="h2" variant="company-title" textAlign="left">
          {exp.company}
        </Heading>
        <Text mb={{ base: 0, md: 1 }} fontSize="xl" align="left">
          {exp.position}
        </Text>
        <Text mb={{ base: 0, md: 1 }} fontSize="lg" align="left">
          {displayTime(exp.startingDate)} - {timeSince(exp.startingDate)}
        </Text>
        <Text mb={{ base: 0, md: 1 }} fontSize="md" align="left">
          {exp.desc}
        </Text>
      </Box>
    </Box>
  );
};

export default Experience;
