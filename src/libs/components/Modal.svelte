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
				<div class="my-submit-buttons">
					<button class="btn btn-primary my-submit-button" on:click={handleSubmit}
						>{options.submitText ?? 'Save'}</button
					>
					<button class="btn btn-secondary my-submit-button" on:click={handleCancel}
						>{options.cancelText ?? 'Cancel'}</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}

<style scoped>
	.my-submit-buttons {
		position: absolute;
		display: flex;
		justify-content: flex-start; /* Align children from the left */
		bottom: 5%;
		gap: 10px; /* Add 10px gap between each child element */
	}

	@media only screen and (max-width: 600px) {
		.my-submit-buttons {
			flex-wrap: wrap;
			justify-content: center;
			bottom: 10px;
		}
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
		margin-top: -15%;
		display: inline-block;
		width: 50%;
		height: 15vh;
		padding: 0% 0% 2% 0%;
		font-size: 1.2em;
	}

	@media only screen and (max-width: 1000px) {
		.my-card {
			margin-top: -10%;
			width: 80%;
			height: 50vh;
			font-size: 1em;
		}
	}
</style>
