import { getDummyJson } from '$lib/utils/apis/dummy-json.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const post = await getDummyJson(params.slug);

	if (!post) {
		throw error(404, 'Not found');
	}

	return post;
}
