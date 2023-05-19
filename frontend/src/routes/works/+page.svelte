<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import type { PageData } from './$types';
	import { pageLoadStore } from '$lib/stores/page-load-store';

	export let data: PageData;

	let test: boolean

	pageLoadStore.subscribe((value) => {
		test = value;
	});
</script>

<MetaTags title="Works" description="Works page description" />

<section>
	<h1>Works</h1>
	<p>Works page works!</p>
	<p>test: {test}</p>
</section>
