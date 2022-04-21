import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const token: string = process.env.REACT_APP_SANITY_TOKEN as string;

export const client = sanityClient({
  projectId: 'oghw27bl',
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
  token: token
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
