<script>
	import Tailwindcss from "./Tailwindcss.svelte";
	import Form from "./Form.svelte";
</script>

<style>
	:global(body) {
		@apply p-10 bg-gray-300;
	}
</style>

<Tailwindcss />

<main>
	<div class="border border-gray-400 p-4 bg-white">
		<Form />
	</div>
</main>

