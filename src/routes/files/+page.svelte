<script lang="ts">
	import { onMount } from 'svelte';
	import File from '../../libs/components/File/File.svelte';
	import { MediaType, PearFile } from '../../libs/infrastructure/PearFile';
	import { copyFile } from '../../libs/store/FileStructure';
	import RightClickMenu from '../../libs/components/RightClickMenu.svelte';
	import Folder from '../../libs/components/Folder.svelte';
	import { PearFolder } from '../../libs/infrastructure/PearFolder';
	import Modal from '../../libs/components/Modal.svelte';

	let copyingFile: PearFile | null;

	let showContextMenu = false;
	let contextMenuX = 0;
	let contextMenuY = 0;
	let selectedFile: PearFile | null = null;

	let showModal = false;

	const handleShowContextMenu = (e, file) => {
		e.preventDefault();
		contextMenuX = e.clientX;
		contextMenuY = e.clientY;
		selectedFile = file;
		showContextMenu = true;
	};

	const handleHideContextMenu = () => {
		showContextMenu = false;
	};

	onMount(() => {
		copyFile.subscribe((value) => (copyingFile = value));
	});
</script>

<button
	on:click={() => {
		showModal = !showModal;
	}}>toggle modal</button
>

<div class="file-container">
	<h3>Collections</h3>
	<div class="files">
		<File
			handleContextMenu={handleShowContextMenu}
			handleFileUnSelected={handleHideContextMenu}
			file={new PearFile(
				{ src: '', type: MediaType.Image },
				'Test File',
				'Calen',
				'Yasushi',
				'A test file',
				'bi bi-file-earmark'
			)}
		/>
		<Folder
			handleContextMenu={handleShowContextMenu}
			handleFileUnSelected={handleHideContextMenu}
			folder={new PearFolder(
				'Test Folder',
				'This is a test folder',
				'bi bi-archive-fill',
				[],
				(x, y) => {
					return x.name.length - y.name.length;
				}
			)}
		/>
	</div>

	<RightClickMenu
		visible={showContextMenu}
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
