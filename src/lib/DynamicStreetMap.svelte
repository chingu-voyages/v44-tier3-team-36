<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	let Route = [];
	// Streetmap logic
	// initialize the map on the "map" div with a given center and zoom

	async function fetchMap() {
		const data = await d3
			.csv(
				'https://gist.githubusercontent.com/AlexDev404/716394419cee4119f710bbd1c19a7158/raw/shapes.csv'
			)
			.then((data) => {
				const grouped_data = d3.group(data, (d) => d.shape_id);

				let longestArray = null;
				let maxLength = 0;

				for (const [key, value] of grouped_data) {
					if (value.length > maxLength) {
						longestArray = value;
						maxLength = value.length;
					}
				}

				// console.log('Longest Array:', longestArray);
				longestArray?.forEach((row) => {
					const Lat = row.shape_pt_lat;
					const Lon = row.shape_pt_lon;
					// console.log('shape_pt_lat:', Lat);
					// console.log('shape_pt_lon:', Lon);
					Route.push([Lat, Lon]);
				});
			});
	}

	onMount(async () => {
		// Map.setMaxBounds(Map.getBounds()); // Buggy
		// @ts-ignore
		await fetchMap().then(() => {
			// @ts-ignore
			const Map = L.map('Map', {
				center: Route[Route.length - 1],
				zoom: 12
			}); // @ts-ignore
			L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
				attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
	      &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
				subdomains: 'abcd',
				maxZoom: 14
			}).addTo(Map);
			// console.log(Route);
			L.polyline(Route).addTo(Map);
			// L.Routing.control({
			// @ts-ignore
			// waypoints: Route
			// waypoints:  [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)]
			// }).addTo(Map);
		});
	});
</script>

<main id="Map" class="h-full w-full bg-green-300">
	<div
		class="loadingMessage h-full w-full flex justify-center items-center font-semibold text-4xl text-center"
	>
		<div class="title block">
			Loading Content
			<div class="subtitle text-2xl font-light">Please wait</div>
		</div>
	</div>
</main>

<style lang="postcss"></style>
