import type { Image } from '@sanity/types';
import groq from 'groq';
import { client } from './sanity';

interface Work {
	title: string;
	description: string;
	img: Image;
	category: string;
	technologies: string[];
	link: string;
	sourceUrl: string;
	date: string;
	featured: boolean;
	client: string;
	role: string;
	team: string[];
}

export async function getWorks(): Promise<Work[]> {
	const works = await client.fetch(groq`*[_type == "work"] | order(_createdAt desc)`);
	return works;
}

export async function getWork(title: string): Promise<Work> {
	return await client.fetch(groq`*[_type == "work" && title == $title][0]`, {
		title: title
	});
}
