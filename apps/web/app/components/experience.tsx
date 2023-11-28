'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

// universal robots icon
const URIcon = () => (
  <Image
    src="/urlogo.svg"
    alt="Universal Robots Logo"
    width={100}
    height={100}
    className="rounded-full"
  />
);

const experiencesData = [
  {
    date: '2023 - Present',
    title: 'Student Worker - Software Engineer',
    location: 'Odense, Denmark',
    description: 'Developing the PolyScope X for Universal Robots',
    icon: <URIcon />,
    technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'SCSS', 'Git'],
  },
  {
    date: '2023',
    title: 'Engineering Intern - Control Systems',
    location: 'Odense, Denmark',
    description:
      'Developing improved motion control and internal development tools for Universal Robots',
    icon: <URIcon />,
    technologies: ['C++', 'Python', 'DevOps', 'Git'],
  },
  {
    date: '2021 - 2023',
    title: 'Student Worker - Software Engineer',
    location: 'Odense, Denmark',
    description: 'Developing the PolyScope X for Universal Robots',
    icon: <URIcon />,
    technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'SCSS', 'Git'],
  },
];

export default function Experience() {
  const timelineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    });

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <div ref={timelineRef}>
      <VerticalTimeline lineColor="#141414">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              visible={isVisible}
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.05)',
                boxShadow: 'none',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                textAlign: 'left',
                padding: '1.3rem 2rem',
              }}
              contentArrowStyle={{
                borderRight: '0.4rem solid rgba(255, 255, 255, 0.5)',
              }}
              date={item.date}
              dateClassName="text-zinc-700 dark:text-white/75"
              icon={item.icon}
              iconStyle={{
                background: 'rgba(255, 255, 255, 0.15)',
                fontSize: '1.5rem',
              }}
            >
              <h3 className="font-semibold capitalize dark:text-white">
                {item.title}
              </h3>
              <p className="font-normal !mt-0 dark:text-white/80">
                {item.location}
              </p>
              <p className="!mt-1 !font-normal text-zinc-700 dark:text-white/75">
                {item.description}
              </p>
              <div className="mt-2">
                <div className="flex flex-wrap">
                  {item.technologies.map((technology, index) => (
                    <span
                      key={index}
                      className="text-zinc-700 dark:text-white/75 bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded-full mr-2 mb-2 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors duration-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </div>
  );
}
