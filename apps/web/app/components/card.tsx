'use client';

import { motion, useMotionTemplate, useSpring } from 'framer-motion';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

// component to show image if type is image, and show video if type is video of the param given to the component
export const ImageOrVideo: React.FC<{ url: string }> = ({ url }) => {
  if (url.includes('mp4')) {
    return (
      <video
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        style={{ filter: 'brightness(20%)' }}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  return (
    <Image
      src={url}
      alt=""
      layout="fill"
      objectFit="cover"
      style={{ filter: 'brightness(20%)' }}
    />
  );
};

interface CardProps extends PropsWithChildren<{}> {
  imageUrl?: string;
}

export const Card: React.FC<CardProps> = ({ children, imageUrl }) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      onMouseMove={onMouseMove}
      className="group relative overflow-hidden rounded-xl border border-zinc-600 duration-700 hover:border-zinc-400/50 hover:bg-zinc-800/10 md:gap-8 "
    >
      <div className="absolute inset-0">
        <ImageOrVideo url={imageUrl ?? ''} />
      </div>
      <div className="relative z-10 h-full w-full">
        <div className="pointer-events-none">
          <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
          <motion.div
            className="absolute inset-0 z-10  bg-gradient-to-br via-zinc-100/10  opacity-100  transition duration-1000 group-hover:opacity-50 "
            style={style}
          />
          <motion.div
            className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
            style={style}
          />
        </div>

        {children}
      </div>
    </div>
  );
};
