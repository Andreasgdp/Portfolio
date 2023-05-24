import { getWork } from '$lib/utils/sanity/works';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: { params: { slug: string } }) {
	const work = await getWork(params.slug);

	if (!work) {
		throw error(404, 'Not found');
	}

	return work;
}
