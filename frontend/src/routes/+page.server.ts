import { getPets } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const pets = await getPets();

	if (!pets) {
		throw error(404, 'Not found');
	}

	return {
		pets
	};
}) satisfies PageServerLoad;
