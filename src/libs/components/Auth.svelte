<script lang="ts">
	import { onMount } from 'svelte';
	import { SignIn, initGoogleDependencies } from '../googleDrive/Auth';

	export let handleOnClose: () => void;

	onMount(() => {
		initGoogleDependencies();
	});

	let fileStorageOptions = [
		{
			name: 'Google Drive',
			icon: 'bi-google',
			auth: () => {
				SignIn().then(res => {
					console.log(res);
					handleOnClose();
				});
			}
		},
		{
			name: 'This device',
			icon: 'bi-hdd-fill',
			auth: () => {
				console.warn('not implemented yet');
			}
		}
	];
</script>

<div class="card card-container">
	<div class="card-header">
		Connect your archive with: <button
			type="button"
			class="btn-close my-close-button"
			aria-label="Close"
			on:click={handleOnClose}
		/>
	</div>
	<div class="card-body">
		<div class="container">
			{#each fileStorageOptions as option}
				<div class="icon-button-container">
					<button type="button" class="btn btn-outline-secondary btn-lg" on:click={option.auth}
						><i class={option.icon} style="font-size: 2rem;" /></button
					>
					<p>{option.name}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<style scoped>
	.card-container {
		width: 30vw;
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.container {
		display: flex;
		align-items: start;
		justify-content: space-around;
	}

	.icon-button-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}

	.my-close-button {
		position: absolute;
		margin-right: 2%;
		right: 0;
	}
</style>
