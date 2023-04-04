<script lang="ts">
    export let handleOnClose : () => void;
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
			<div class="icon-button-container">
				<button type="button" class="btn btn-outline-secondary btn-lg"
					><i class="bi bi-google" style="font-size: 2rem;" /></button
				>
				<p>Google Drive</p>
			</div>
			<div class="icon-button-container">
				<button type="button" class="btn btn-outline-secondary btn-lg"
					><i class="bi bi-hdd-fill" style="font-size: 2rem;" /></button
				>
				<p>This device</p>
			</div>
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
