<script lang="ts">
	import type { PearFile } from '../infrastructure/PearFile';
	import { copyFile } from '../../libs/store/FileStructure';

	export let visible = false;
	export let posX = 0;
	export let posY = 0;

	export let file: PearFile | null;
</script>

{#if visible}
	<div class="list-group my-list-group" style={`left: ${posX}px; top: ${posY}px;`}>
		<a href="#" class="list-group-item list-group-item-action" aria-current="true"> Open </a>
		<a href="#" class="list-group-item list-group-item-action">Rename</a>
		<a href="#" class="list-group-item list-group-item-action" on:click={() => {copyFile.copy(file)}}>Copy</a>
		<a href="#" class="list-group-item list-group-item-action">Cut</a>
		<a href="#" class="list-group-item list-group-item-action">Delete</a>
		<a href="#" class="list-group-item list-group-item-action">Properties</a>
	</div>
{/if}

<style scoped>
	.my-list-group {
		padding: 1%;
		width: 12%;
		position: absolute;
		z-index: 100;
	}
</style>
