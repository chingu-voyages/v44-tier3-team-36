<script lang="ts">
	export let title: string = 'title';
	export let direction: string = 'direction';
	export let arrival_time: string = 'arrival_time';
	export let nextup_time: string = 'nextup_time';
</script>

<div class="card flatnav bg-red block">
	<div class="top-header-container flex flex-wrap justify-center items-center mx-4 my-4">
		<div class="block">
			<div class="rounded-lg title-element border border-card block px-4 pr-12 py-2 my-4 w-full">
				<div class="title text-2xl font-base text-black w-full">{title}</div>
				<div class="title uppercase text-lg font-light text-black w-full">{direction}</div>
			</div>
			<img
				class="preview-image w-full"
				src="/milan-railway-station_0.jpg"
				alt="Subway Station Preview for <STATION_NAME>"
			/>
		</div>
	</div>
	<div class="bottom-footer-container flex flex-wrap justify-center items-center mx-4 my-4">
		<div class="rounded-lg title-element border border-card block px-4 pr-12 py-2 my-4 w-full">
			<div class="title text-2xl font-base text-black w-full">ARRIVAL TIME</div>
			<div class="title text-lg font-base flex text-black w-full">
				<div class="e1 mr-1">ETA:</div>
				<div class="font-light">{arrival_time}</div>
			</div>
			<div
				class="title-rounded text-lg font-base text-black w-full rounded-lg title-element border border-card block px-4 pr-12 py-2 my-4"
			>
				<div class="e1 mr-1">NEXT UP</div>
				<div class="font-light">{nextup_time}</div>
			</div>
		</div>
		<div
			class="title-rounded uppercase flex justify-center track-bg items-center text-lg text-white font-base hover:opacity-90 cursor-pointer w-full rounded-lg title-element border border-card track-bg px-4 pr-12 py-2 my-4"
		>
			Track This Line
		</div>
	</div>
</div>
