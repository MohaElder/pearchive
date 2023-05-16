<script lang="ts">
	import type { PearFile } from '../../infrastructure/PearFile';
	import type { PearFolder } from '../../infrastructure/PearFolder';

	import { copyFile } from '../../store/FileStructure';
	import Rename from '../File/Actions/Rename.svelte';

	export let visible = false;
	export let posX = 0;
	export let posY = 0;

	export let file: PearFile | PearFolder;

	let renamingFile = false;
</script>

{#if visible}
	<div class="list-group my-list-group" style={`left: ${posX}px; top: ${posY}px;`}>
		<a href="#" class="list-group-item list-group-item-action" aria-current="true"
			><i class="bi bi-door-open" />&nbsp;&nbsp; Open
		</a>
		<button
			class="list-group-item list-group-item-action"
			on:click={() => {
				renamingFile = true;
			}}><i class="bi bi-pencil" />&nbsp;&nbsp; Rename</button
		>
		<button
			class="list-group-item list-group-item-action"
			on:click={() => {
				copyFile.copy(file);
			}}><i class="bi bi-layers-fill" />&nbsp;&nbsp; Copy</button
		>
		<a href="#" class="list-group-item list-group-item-action"
			><i class="bi bi-scissors" />&nbsp;&nbsp; Cut</a
		>
		<a href="#" class="list-group-item list-group-item-action"
			><i class="bi bi-info-square" />&nbsp;&nbsp; Properties</a
		>
	</div>
{/if}

<Rename
	visible={renamingFile}
	{file}
	handleSubmit={() => {
		renamingFile = false;
	}}
	handleCancel={() => {
		renamingFile = false;
	}}
/>

<style scoped>
	.my-list-group {
		padding: 1%;
		width: 12%;
		position: absolute;
		z-index: 100;
	}
</style>
