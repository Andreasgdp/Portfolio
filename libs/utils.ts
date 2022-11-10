import { chakra, Image } from '@chakra-ui/react';

export const CompanyLogo = chakra(Image, {
  shouldForwardProp: (prop) => ['width', 'height', 'src', 'alt'].includes(prop)
});
