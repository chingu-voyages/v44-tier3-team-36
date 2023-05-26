<script lang="ts">
	import Navigation from '$lib/Navigation.svelte';
	import DynamicStreetMap from '$lib/DynamicStreetMap.svelte';
</script>

<main class="flex flex-col h-screen w-full justify-center">
	<Navigation>
		<svelte:fragment slot="Extra">
			<div class="login rounded-md text-white font-semibold px-8 py-1" style="background: #2C8EB5;">
				Login
			</div>
		</svelte:fragment>
	</Navigation>
	<DynamicStreetMap />
</main>

<style lang="postcss"></style>
