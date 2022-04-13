# Tsao Chia-Cheng Protfolio Website

[https://portfolio-website-eta-three.vercel.app/](https://portfolio-website-eta-three.vercel.app/)

## Notes

This website is based on [Takuya Matsuyama](https://github.com/craftzdog/craftzdog-homepage)'s tutorial.

What's different:

- JavaScript to TypeScript.
- Rather than create pages for every works, use dynamic routes by `works/[id].tsx`.
- Parse markdown file as contents of works.
- Replace voxel dog with my own blender works.

## Stack

- [Next.js](https://nextjs.org/) - A React framework with hybrid static & server rendering, and route pre-fetching, etc.
- [Chakra UI](https://chakra-ui.com/) - A simple, modular and accessible component library for React
- [Three.js](https://threejs.org/) - 3D library for JavaScript
- [Framer Motion](https://www.framer.com/motion/) - An animation library for React
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Parse front-matter from a string or file.
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - A set of light utilities allowing MDX to be loaded within getStaticProps or getServerSideProps and hydrated correctly on the client
