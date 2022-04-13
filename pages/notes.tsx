import type { NextPage } from 'next';

import { Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';

import ArticleLayout from '../components/layouts/article';
import Section from '../components/section';
import { GridItem } from '../components/grid-item';

const Notes: NextPage = () => {
  return (
    <ArticleLayout>
      <Container maxW="container.lg">
        <Heading as="h2" fontSize={20} my={4}>
          Shortcut Notes
        </Heading>
        <Divider />
        <Section delay={0.1}>
          <SimpleGrid columns={[1, 1, 2]} gap={6}>
            <GridItem
              title="Window Terminal Shortcuts"
              href="https://hackmd.io/@AceBenson/rJO65Gnyq"
            >
              Some useful windows terminal shotcuts, which may help you to
              improve your productivity.
            </GridItem>
            <GridItem
              title="Vim tutorial"
              href="https://hackmd.io/@AceBenson/r1n9C_gnK"
            >
              Basic vim commands and how to config neovim. Including lsp config
              and server for word autocomplete.
            </GridItem>
          </SimpleGrid>
        </Section>
        <Heading as="h2" fontSize={20} my={4}>
          Paper Reading
        </Heading>
        <Divider />
        <Section delay={0.2}>
          <SimpleGrid columns={[1, 1, 2]} gap={6}>
            <GridItem
              title="Generative Model - GAN"
              href="https://hackmd.io/@AceBenson/B15z0fQaK"
            >
              Introduction to GAN
            </GridItem>
            <GridItem
              title="Perceptual Loss"
              href="https://hackmd.io/@AceBenson/SkZgzQJmK"
            >
              Perceptual Losses for Real-Time Style Transfer and
              Super-Resolution
            </GridItem>
          </SimpleGrid>
        </Section>
        <Section delay={0.3}>
          <SimpleGrid columns={[1, 1, 2]} gap={6}>
            <GridItem
              title="VQVAE"
              href="https://hackmd.io/@AceBenson/SyswxlwoK"
            >
              Vector Quantized Diffusion Model for Text-to-Image Synthesis
            </GridItem>
            <GridItem
              title="BEIT"
              href="https://hackmd.io/@AceBenson/B14hSJmvF"
            >
              BEIT: BERT Pre-Training of Image Transformers
            </GridItem>
          </SimpleGrid>
        </Section>
      </Container>
    </ArticleLayout>
  );
};

export default Notes;
