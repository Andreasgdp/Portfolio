'use client';

import Link from 'next/link';
import React from 'react';
import Particles from './components/particles';
import Image from 'next/image';
import Experience from './components/experience';
import { Container } from './components/common/Container';

// TODO make this light mode compatible
// TODO also make projects and contacts page light mode compatible

export default function Home() {
  return (
    <Container transparentBackground={true}>
      <main className="overflow-x-hidden">
        <Particles
          className="fixed top-0 bottom-0 right-0 left-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <section
          id="landing"
          className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-white via-zinc-300 to-white dark:from-black dark:via-zinc-600/20 dark:to-black"
        >
          <div className="md:h-40 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-screen ">
              <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
              <h1 className="z-10 text-4xl text-transparent duration-1000 bg-black dark:bg-white text-black dark:text-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text pb-1 font-bold">
                Guldberg
              </h1>
              <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            </div>
          </div>

          <div className="my-10 text-center animate-fade-in px-4">
            <Image
              src="/profile-pic.png"
              alt="Profile Image"
              className="w-1/2 sm:w-3/5 md:w-2/3 h-auto mx-auto animate-fade-in mb-10 duration-1000 bg-transparent"
              width={500} // Adjust the width as per your requirement
              height={500} // Adjust the height as per your requirement
              priority
            />
            <h2 className="text-base sm:text-lg md:text-xl dark:text-zinc-500 text-zinc-800">
              I'm building{' '}
              <Link
                target="_blank"
                href="https://momentmeal.com"
                className="underline duration-500 dark:hover:text-zinc-300 hover:text-zinc-500"
              >
                momentmeal.com
              </Link>{' '}
              to help people cook more and eat better.
            </h2>
          </div>

          <a href="#Experience" className=" animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto text-zinc-500 animate-bounce"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </section>
        <section
          id="Experience"
          className="flex flex-col items-center justify-center w-screen min-h-screen overflow-hidden bg-gradient-to-tr from-white via-zinc-300 to-white dark:from-black dark:via-zinc-600/20 dark:to-black"
        >
          <div className="!h-40 flex items-center justify-center pt-10">
            <div className="flex flex-col items-center justify-center w-screen ">
              <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
              <h1 className="z-10 text-4xl text-transparent duration-1000 bg-black dark:bg-white text-black dark:text-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text font-bold ">
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
    </Container>
  );
}
