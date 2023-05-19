<script lang="ts">
	import { Avatar, Paginator } from '@skeletonlabs/skeleton';
	import type { PaginationSettings } from '@skeletonlabs/skeleton/dist/components/Paginator/types';
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import { blur } from 'svelte/transition';
	import type { PageData } from './$types';
	export let data: PageData;

	let ready = false;
	onMount(() => (ready = true));

	function onPageChange(e: CustomEvent): void {
		ready = false;
		setTimeout(() => {
			ready = true;
		}, 100);
	}

	const sourceBody = data.dummyJson.products;
	let page = {
		offset: 0,
		limit: 6,
		size: sourceBody.length,
		amounts: [1, 2, 3, 6, sourceBody.length]
	} as PaginationSettings;

	$: sourceBodySliced = sourceBody.slice(
		page.offset * page.limit,
		page.offset * page.limit + page.limit
	);
</script>

<MetaTags title="Works" description="Works page description" />

<section class="section-container">
	<div class="mb-4">
		<Paginator bind:settings={page} on:page={onPageChange} />
	</div>
	{#if ready}
		<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#if sourceBodySliced.length}
				{#each sourceBodySliced as product, i}
					<a
						in:blur={{ delay: 30 * i }}
						class="card bg-initial card-hover overflow-hidden"
						href="/works/{product.id}"
					>
						<header>
							<!-- image -->
							<div class="relative">
								<img class="w-full h-64 object-cover" src={product.thumbnail} alt={product.title} />
								<div class="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
							</div>
						</header>
						<div class="p-4 space-y-4">
							<h6 class="h6">{product.category}</h6>
							<h3 class="h3 line-clamp-1" data-toc-ignore>{product.title}</h3>
							<article>
								<p class="text-sm text-gray-400 h-10 overflow-hidden">
									{product.description}
								</p>
							</article>
						</div>
						<hr class="opacity-50" />
						<footer class="p-4 flex justify-start items-center space-x-4">
							<Avatar src={product.thumbnail} width="w-8" />
							<div class="flex-auto flex justify-between items-center">
								<h6 class="font-bold">By Alex</h6>
								<small>On {new Date().toLocaleDateString()}</small>
							</div>
						</footer>
					</a>
				{/each}
			{/if}
		</div>
	{/if}
</section>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-16;
	}
</style>
