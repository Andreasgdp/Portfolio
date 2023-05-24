<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import '../app.postcss';

	// current year function
	const currentYear = () => {
		const date = new Date();
		return date.getFullYear();
	};
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a class="text-xl uppercase" href="/">
					<strong class="text-xl uppercase">Guldberg</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/andreasgdp/Portfolio"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="pageFooter">
		<footer class="bg-gray-800 py-4">
			<div class="container mx-auto flex justify-between items-center">
				<p class="text-gray-400">© {currentYear()} Guldberg Portfolio</p>
				<div class="flex space-x-4">
					<a
						href="https://www.linkedin.com/in/andreasgdp/"
						class="text-gray-400 hover:text-white flex items-center"
						target="_blank"
						rel="noreferrer"
					>
						<span class="badge-icon variant-ghost w-8 h-8"
							><i class="fa-brands fa-linkedin text-xl" /></span
						>
						<span class="ml-2">LinkedIn</span>
					</a>
					<a
						href="https://github.com/andreasgdp/Portfolio"
						class="text-gray-400 hover:text-white flex items-center"
						target="_blank"
						rel="noreferrer"
					>
						<span class="badge-icon variant-ghost w-8 h-8"
							><i class="fa-brands fa-github text-xl" /></span
						>
						<span class="ml-2">GitHub</span>
					</a>
				</div>
			</div>
		</footer>
	</svelte:fragment>
</AppShell>
