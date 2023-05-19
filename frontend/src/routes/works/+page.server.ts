import { getDummyJsons } from '$lib/utils/apis/dummy-json';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const dummyJsons = async () => await getDummyJsons();

	if (!dummyJsons) {
		throw error(404, 'Not found');
	}

	return {
		dummyJson: dummyJsons()
	};
}) satisfies PageServerLoad;
