<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	import Auth from '../libs/components/Auth.svelte';
	import FolderInit from '../libs/components/FolderInit.svelte';
	import { fileStructure } from '../libs/store/FileStructure';
	import { onMount } from 'svelte';
	import { MediaType, PearFile } from '../libs/infrastructure/PearFile';
	import { PearFolder } from '../libs/infrastructure/PearFolder';
	import { openFolder } from '../libs/googleDrive/Auth';

	let showAuth = false;
	let showFolderInit = false;

	onMount(() => {
		let TestFileA = new PearFile(
			{ src: '', type: MediaType.Image },
			'File A',
			'Anzhi',
			'Yasushi',
			'This is file A',
			'bi bi-file-earmark-image-fill'
		);
		let TestFileB = new PearFile(
			{ src: '', type: MediaType.Image },
			'File B',
			'Calen',
			'Anzhi',
			'This is file B',
			'bi bi-file-earmark-image-fill'
		);

		let files = [TestFileA, TestFileB];
		let testFolder = new PearFolder(
			'test collection',
			'This is a test collection',
			'bi bi-archive-fill',
			files,
			(x, y) => x.name.localeCompare(y.name)
		);

		fileStructure.set(testFolder);
		fileStructure.subscribe((value) => console.log(value));
	});
</script>

<h1 class="display-1">Pearchive</h1>
<h1 class="display-6">Archive Things Worth Archiving</h1>
<button
	type="button"
	class="btn btn-outline-primary btn-lg my-button"
	on:click={() => {
		showAuth = true;
	}}>ENTER ARCHIVE</button
>

{#if showAuth}
	<div transition:fade={{ duration: 100 }}>
		<Auth
			handleOnClose={(res) => {
				showAuth = false;
				if (res == null) {
					showFolderInit = true;
				} else {
					openFolder(res.id).then((res) => {
						console.log(res);
						goto('/files')
					});
				}
			}}
		/>
	</div>
{/if}

{#if showFolderInit}
	<div transition:fade={{ duration: 100 }}>
		<FolderInit
			visible={showFolderInit}
			handleSubmit={(id) => {
				if (id != null) {
					openFolder(id).then((res) => {
						console.log(res);
					});
				} else {
					alert('initialization failed');
				}
				showFolderInit = false;
			}}
			handleCancel={() => {
				showFolderInit = false;
			}}
		/>
	</div>
{/if}

<style scoped>
	.container-fluid {
		padding-top: 20%;
	}

	.my-button {
		margin-top: 2%;
	}
</style>
