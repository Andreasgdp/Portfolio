<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<section class="section-container">
	<div>
		<h1 class="h1">{data.title}</h1>
		<p class="text-gray-500 text-xl">{data.description}</p>

		<!-- price and discount -->
		<div class="flex items-center mt-4">
			<p class="text-2xl font-bold text-gray-800">${data.price}</p>
			<p class="text-xl text-gray-500 ml-2">
				${data.price - (data.price * data.discountPercentage) / 100}
			</p>
			<p class="text-xl text-gray-500 ml-2">
				{data.discountPercentage}% off
			</p>
            <p>
            this is a test
            </p>
	</div>
</section>
