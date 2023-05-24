import { getWorks } from '$lib/utils/sanity/works';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const works = async () => await getWorks();

	if (!works) {
		throw error(404, 'Not found');
	}

	return {
		works: works()
	};
}) satisfies PageServerLoad;
