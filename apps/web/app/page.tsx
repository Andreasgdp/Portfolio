'use client';

import Link from 'next/link';
import React from 'react';
import { Container } from './components/common/Container';
import Experience from './components/experience';
import Particles from './components/particles';

export default function Home() {
  return (
    <Container transparentBackground={true}>
      <main className="overflow-x-hidden">
        <Particles
          className="animate-fade-in fixed bottom-0 left-0 right-0 top-0 -z-10"
          quantity={100}
        />
        <section
          id="landing"
          className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-white via-zinc-300 to-white dark:from-black dark:via-zinc-600/20 dark:to-black"
        >
          <div className="flex items-center justify-center md:h-40">
            <div className="flex w-screen flex-col items-center justify-center ">
              <div className="animate-glow animate-fade-left hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
              <h1 className="text-edge-outline animate-title font-display z-10 cursor-default whitespace-nowrap bg-black bg-clip-text pb-1 text-4xl font-bold text-black text-transparent duration-1000 dark:bg-white dark:text-white sm:text-6xl md:text-9xl">
                Guldberg
              </h1>
              <div className="animate-glow animate-fade-right hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
            </div>
          </div>

          <div className="animate-fade-in my-10 px-4 text-center">
            <h2 className="text-base text-zinc-800 dark:text-zinc-500 sm:text-lg md:text-xl">
              I'm building{' '}
              <Link
                target="_blank"
                href="https://momentmeal.com"
                className="underline duration-500 hover:text-zinc-500 dark:hover:text-zinc-300"
              >
                momentmeal.com
              </Link>{' '}
              to help people cook more and eat better.
            </h2>
          </div>

          <a href="#Experience" className=" animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-6 w-6 animate-bounce text-zinc-500"
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
          className="flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-white via-zinc-300 to-white dark:from-black dark:via-zinc-600/20 dark:to-black"
        >
          <div className="flex !h-40 items-center justify-center pt-10">
            <div className="flex w-screen flex-col items-center justify-center ">
              <div className="animate-glow animate-fade-left hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
              <h1 className="text-edge-outline animate-title font-display z-10 cursor-default whitespace-nowrap bg-black bg-clip-text text-4xl font-bold text-black text-transparent duration-1000 dark:bg-white dark:text-white sm:text-6xl md:text-9xl ">
                Experience
              </h1>
              <div className="animate-glow animate-fade-right hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
            </div>
          </div>
          <div className="experienceContainer mb-10 mt-10 w-3/4 overflow-y-scroll">
            <Experience />
          </div>
        </section>
      </main>
    </Container>
  );
}
