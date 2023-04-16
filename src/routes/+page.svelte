<script lang="ts">
	import { fade } from 'svelte/transition';

	import Auth from '../libs/components/Auth.svelte';

	let showAuth = false;
</script>

<div class="container">
	<h1 class="display-1">Pearchive</h1>
	<h1 class="display-6">Archive Things Worth Archiving</h1>
	<button
		type="button"
		class="btn btn-outline-primary btn-lg my-button"
		on:click={() => {
			showAuth = true;
		}}>ENTER ARCHIVE</button
	>
</div>

{#if showAuth}
	<div transition:fade={{duration: 100}}>
		<Auth
			handleOnClose={() => {
				showAuth = false;
			}}
		/>
	</div>
{/if}

<style scoped>
	.container {
		padding-top: 20%;
	}

	.my-button {
		margin-top: 2%;
	}
</style>
