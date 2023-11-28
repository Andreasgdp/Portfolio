import Image from 'next/image';
import { FC } from 'react';

export const Logo: FC = () => {
  return <Image src="/favicon.png" alt="Guldberg" width={22} height={24} />;
};
