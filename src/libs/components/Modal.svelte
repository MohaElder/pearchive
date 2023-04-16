<script lang="ts">
	import { fade } from 'svelte/transition';

	export let visible = false;
	export let options: {
		title: string;
		body: string;
		submitText: string;
        cancelText: string;
	};
	export let handleSubmit: () => any;
    export let handleCancel: () => any;
</script>

{#if visible}
	<div class="overlay">
		<div class="card my-card" transition:fade={{ duration: 100 }}>
			<div class="card-body">
				<h5 class="card-title">{options.title}</h5>
				{#if options.body}
					<p class="my-text">{options.body}</p>
				{/if}
				<slot />
				<button class="btn btn-primary my-submit-button" on:click={handleSubmit}
					>{options.submitText ?? 'Save'}</button
				>
				<button class="btn btn-secondary my-submit-button" style="margin-left: 10px;" on:click={handleCancel}
					>{options.cancelText ?? 'Cancel'}</button
				>
			</div>
		</div>
	</div>
{/if}

<style scoped>
	.my-submit-button {
		margin-top: 2%;
	}

	.overlay {
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3); /* Dimmed background color */
		backdrop-filter: blur(5px); /* Apply blur effect */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.my-card {
		margin-top: -25%;
	}
</style>
