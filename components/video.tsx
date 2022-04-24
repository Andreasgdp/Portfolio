import React from 'react';

import { Image } from '@chakra-ui/react';

type VideoProps = {
  video: string;
};

const Video = ({ video }: VideoProps) => {
  if (video.endsWith('.gif')) {
    return (
      <Image
        src={video}
        alt="Unable to fetch gif at the moment"
        maxW="container.sm"
        mx="auto"
      />
    );
  } else if (video.includes('youtube')) {
    video = video.replace('watch?v=', 'embed/');

    return (
      <iframe
        title={video}
        width="560"
        height="315"
        src={video}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  } else {
    return (
      <video autoPlay loop muted width="700px">
        <source src={video} />
      </video>
    );
  }
};

export default Video;
