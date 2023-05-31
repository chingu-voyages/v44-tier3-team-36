<script lang="ts">
	import Navigation from '$lib/Navigation.svelte';
	import DynamicStreetMap from '$lib/DynamicStreetMap.svelte';
	import Card from '$lib/Card.svelte';
	import { onMount } from 'svelte';
	let StreetMap: DynamicStreetMap;

	// Function to handle class list changes
	const handleClassListChange = () => {
		StreetMap.resizeMap();
	};

	onMount(() => {
		const sidebar = document.getElementById('sidebar');
		// Create a new MutationObserver (WebAPIs) https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
		const observer = new MutationObserver(handleClassListChange);

		// Configure the observer to monitor attribute changes
		const config = {
			attributes: true,
			attributeFilter: ['class']
		};

		// Start observing the sidebar
		observer.observe(sidebar, config);
	});
</script>

<main class="flex flex-col h-screen w-full justify-center">
	<Navigation>
		<svelte:fragment slot="Extra">
			<div class="login rounded-md text-white font-semibold px-8 py-1 cursor-pointer hover:opacity-90" style="background: #2C8EB5;">
				Login
			</div>
		</svelte:fragment>
	</Navigation>
	<div class="container_ flex h-full w-full overflow-hidden">
		<!-- We disable the overflow to hide any weird things from happening to the document (such as the sidebar causing the page to lift up like crazy shit)-->
		<div id="sidebar" class="sidebar inline h-full max-w-sm overflow-y-auto">
			<!-- Instead, we allow scrolling here to take place in the child instead of the parent  -->
			<Card title="96 ST" direction="Uptown" arrival_time="??: ??: ??" nextup_time="??: ??: ??" />
			<Card title="96 ST" direction="Uptown" arrival_time="??: ??: ??" nextup_time="??: ??: ??" />
			<Card title="96 ST" direction="Uptown" arrival_time="??: ??: ??" nextup_time="??: ??: ??" />
			<Card title="96 ST" direction="Uptown" arrival_time="??: ??: ??" nextup_time="??: ??: ??" />
		</div>
		<DynamicStreetMap bind:this={StreetMap} />
	</div>
</main>

<style lang="postcss"></style>
