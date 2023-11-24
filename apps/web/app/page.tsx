'use client';

import Link from 'next/link';
import React from 'react';
import Particles from './components/particles';
import Image from 'next/image';
import Experience from './components/experience';

const navigation = [
  { name: 'Projects', href: '/projects' },
  // { name: "Guldberg's Docs", href: '/docs' },
  { name: 'Contact', href: '/contact' },
];

export default function Home() {
  const scrollToExperience = () => {
    const experienceSection = document.getElementById('Experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="overflow-x-hidden">
      <Particles
        className="fixed top-0 bottom-0 right-0 left-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <section
        id="landing"
        className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black"
      >
        <nav className="my-10 animate-fade-in">
          <ul className="flex items-center justify-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base sm:text-lg md:text-xl duration-500 text-zinc-500 hover:text-zinc-300"
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>
        <div className="md:h-40 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-screen ">
            <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text pb-1 font-bold">
              Guldberg
            </h1>
            <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
          </div>
        </div>

        <div className="my-10 text-center animate-fade-in px-4">
          <Image
            src="https://avatars.githubusercontent.com/u/39928082?v=4"
            alt="Profile Image"
            className="w-1/2 sm:w-3/5 md:w-2/3 h-auto mx-auto animate-fade-in rounded-lg mb-10 duration-1000"
            width={500} // Adjust the width as per your requirement
            height={500} // Adjust the height as per your requirement
          />
          <h2 className="text-base sm:text-lg md:text-xl text-zinc-500 ">
            I'm building{' '}
            <Link
              target="_blank"
              href="https://momentmeal.com"
              className="underline duration-500 hover:text-zinc-300"
            >
              momentmeal.com
            </Link>{' '}
            to help people cook more and eat better.
          </h2>
        </div>

        <div className="absolute bottom-5 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-auto text-zinc-500 animate-bounce cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={scrollToExperience} // Add onClick event handler
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>
      <section
        id="Experience"
        className="flex flex-col items-center justify-center w-screen min-h-screen overflow-hidden bg-gradient-to-tr from-black via-zinc-600/20 to-black"
      >
        <div className="!h-40 flex items-center justify-center pt-10">
          <div className="flex flex-col items-center justify-center w-screen ">
            <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text font-bold ">
              Experience
            </h1>
            <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
          </div>
        </div>
        <div className="experienceContainer overflow-y-scroll w-3/4 mb-10 mt-10">
          <Experience />
        </div>
      </section>
    </main>
  );
}
