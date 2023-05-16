<script lang="ts">
	import { onMount } from 'svelte';
	import File from '../File/File.svelte';
	import { PearFile } from '../../infrastructure/PearFile';
	import { copyFile } from '../../store/FileStructure';
	import FileMenu from '../RightClickMenu/FileMenu.svelte';
	import Folder from '../File/Folder.svelte';
	import type { PearFolder } from '../../infrastructure/PearFolder';
	import LayoutMenu from '../RightClickMenu/LayoutMenu.svelte';

	export let files: PearFolder;

	let copyingFile: PearFile | PearFolder | null;

	let showFileContextMenu = false;
	let showLayoutContextMenu = false;
	let contextMenuX = 0;
	let contextMenuY = 0;
	let selectedFile: PearFile | PearFolder;

	const handleShowContextMenu = (e: MouseEvent, file: PearFolder | PearFile) => {
		e.preventDefault();
		contextMenuX = e.clientX;
		contextMenuY = e.clientY;
		selectedFile = file;
		showFileContextMenu = true;
	};

	const handleShowLayoutContextMenu = (e: MouseEvent, file: PearFolder | PearFile) => {
		e.preventDefault();
		setTimeout(() => {
			if (showFileContextMenu != true) {
				contextMenuX = e.clientX;
				contextMenuY = e.clientY;
				selectedFile = file;
				showLayoutContextMenu = true;
			}
		}, 40);
	};

	const handleHideFileContextMenu = () => {
		showFileContextMenu = false;
	};

	const handleHideLayoutContextMenu = () => {
		showLayoutContextMenu = false;
	};

	onMount(() => {
		copyFile.subscribe((value) => (copyingFile = value));

		window.addEventListener('click', handleOutsideClick);
	});

	const handleOutsideClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		const cardElement = document.getElementById(files.id) as HTMLElement;
		if (!cardElement?.contains(target)) {
			handleHideLayoutContextMenu();
		}
	};
</script>

<div
	id={files.id}
	class="file-container"
	on:contextmenu={(e) => handleShowLayoutContextMenu(e, files)}
	on:click={handleHideLayoutContextMenu}
	on:keypress={handleHideLayoutContextMenu}
>
	<h3>{files.name}</h3>
	<div class="files">
		{#each files.listFiles() as file}
			{#if file instanceof PearFile}
				<File
					handleContextMenu={handleShowContextMenu}
					handleFileUnSelected={handleHideFileContextMenu}
					{file}
				/>
			{:else if file}
				<Folder
					handleContextMenu={handleShowContextMenu}
					handleFileUnSelected={handleHideFileContextMenu}
					folder={file}
				/>
			{/if}
		{/each}
	</div>

	<FileMenu
		visible={showFileContextMenu}
		posX={contextMenuX}
		posY={contextMenuY}
		file={selectedFile}
	/>

	<LayoutMenu
		visible={showLayoutContextMenu}
		posX={contextMenuX}
		posY={contextMenuY}
		file={selectedFile}
	/>

	<button
		on:click={() => {
			console.log(copyingFile);
		}}>Paste</button
	>
</div>

<style scoped>
	.file-container {
		padding: 12% 15% 15% 5%;
	}

	.files {
		margin-top: 2%;
	}
</style>
