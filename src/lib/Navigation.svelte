<script lang="ts">
	import Fa from 'svelte-fa';
	import { faBars } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="navigation flex flex-wrap py-4 px-2 justify-between">
	<div class="groupOne flex items-center justify-center">
		<div class="toggleMenu px-2 mr-4 py-2 hover:opacity-90 hover:bg-white hover:bg-opacity-5 rounded-sm cursor-pointer">
			<Fa icon={faBars} size="20" class="mx-2" />
		</div>
		<div class="title flex">
			App Name — <div class="font-light">Trains</div>
		</div>
	</div>
	<div class="groupTwo flex items-center justify-center">
		<div class="refreshTimeContainer">
			<i class="flex">
				Last Refreshed:
				<div class="font-semibold px-2"><slot name="RefreshTime">SLOT=RefreshTime</slot></div>
			</i>
		</div>
		<slot name="Extra">SLOT=Extra</slot>
	</div>
</div>

<style lang="postcss">
	.navigation {
		background: #0e2127;
		color: #fcfcfc;
	}
</style>
