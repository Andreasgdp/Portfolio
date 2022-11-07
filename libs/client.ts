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

export const urlForImage = (source: SanityImageSource) => builder.image(source);

export const urlForFile = (source: string) => {
  const endOfUrl = source.split('file-')[1].replace('-pdf', '.pdf');
  const url = `https://cdn.sanity.io/files/oghw27bl/production/${endOfUrl}`;

  return url;
};
