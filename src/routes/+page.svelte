<script lang="ts">
// let redirButton: HTMLDivElement;
</script>

<main class="overflow-hidden">
	<div class="flex text-center justify-center items-center flex-wrap h-screen w-full">
		<h1 class="text-4xl font-semibold my-2 w-full basis-full">Untitled Application</h1>
		<div on:click={()=>{location = "/app"}} class="button px-4 py-2 bg-transparent text-2xl font-light border border-black w-fit select-none cursor-pointer hover:bg-black hover:bg-opacity-20">
			Login
		</div>
	</div>
</main>
