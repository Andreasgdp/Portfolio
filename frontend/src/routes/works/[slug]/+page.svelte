<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<section class="section-container">
	<div>
		<h1 class="h1">{data.title}</h1>
		<p class="text-gray-500 text-xl">{data.description}</p>

		<div class="flex items-center mt-4">
			<div class="flex items-center mr-4">
				<span class=" w-8">
					<i class="fa-solid fa-layer-group text-lg" />
				</span>
				<p class="text-gray-500 text-sm">{data.category}</p>
			</div>
			<div class="flex items-center">
				<span class=" w-8">
					<i class="fa-solid fa-keyboard text-lg" />
				</span>
				<p class="text-gray-500 text-sm">{data.technologies.join(', ')}</p>
			</div>
		</div>

		<div class="flex items-center mt-4">
			<a
				href={data.link}
				target="_blank"
				class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition ease
				-in-out duration-150"
			>
				<span class=" w-6">
					<i class="fa-solid fa-arrow-up-right-from-square text-lg" />
				</span>
				Visit Website
			</a>
			<!-- link to source -->
			<a
				href={data.sourceUrl}
				target="_blank"
				class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition ease
				-in-out duration-150 ml-4"
			>
				<span class=" w-6">
					<i class="fa-brands fa-github text-lg" />
				</span>
				Source Code
			</a>
		</div>
	</div>
</section>
