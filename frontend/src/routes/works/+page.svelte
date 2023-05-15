<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<MetaTags title="Works" description="Works page description" />

<section>
	<h1>Works</h1>
	<p>Works page works!</p>
</section>
