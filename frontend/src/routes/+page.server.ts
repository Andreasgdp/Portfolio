import { getPets } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getGithubUser } from '$lib/utils/apis/github-api';

export const load = (async () => {
	const pets = async () => await getPets();
	const githubProfile = async () =>  await getGithubUser('andreasgdp');

	if (!pets) {
		throw error(404, 'Not found');
	}

	return {
		pets: pets(),
		githubProfile: githubProfile()
	};
}) satisfies PageServerLoad;
