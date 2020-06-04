<script>
	import Tailwindcss from "./Tailwindcss.svelte";
</script>

<style>
	.description {
		@apply text-xl text-gray-700;
	}
</style>

<main>
	<div class="text-6xl text-orange-500">Hello there!</div>
	<div class="description">Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</div>
</main>

<Tailwindcss />