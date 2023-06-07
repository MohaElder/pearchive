<script lang="ts">
	import CreateNewMemory from '../../libs/components/File/Actions/CreateNewMemory.svelte';
	import FileLayout from '../../libs/components/FileLayout/FileLayout.svelte';
	import { MediaType, PearFile } from '../../libs/infrastructure/PearFile';
	import { PearFolder } from '../../libs/infrastructure/PearFolder';

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

	let showCreateNewMemoryModal = false;

	const handleCreateNewMemory = () => {
		showCreateNewMemoryModal = true;
	};
</script>

<div class="grid-container">
	<div class="center"><FileLayout files={testFolder} /></div>
	<div class="side-bar">
		<ul class="list-group list-group-flush">
			<li class="list-group-item">
				<button type="button" class="btn btn-outline-primary" on:click={handleCreateNewMemory}
					><i class="bi bi-plus-circle icon" />New Memory</button
				>
			</li>
			<li class="list-group-item">A second item</li>
			<li class="list-group-item">A third item</li>
			<li class="list-group-item">A fourth item</li>
			<li class="list-group-item">And a fifth one</li>
		</ul>
	</div>
</div>

<CreateNewMemory
	visible={showCreateNewMemoryModal}
	handleCancel={() => {
		showCreateNewMemoryModal = false;
	}}
	handleSubmit={() => { showCreateNewMemoryModal = false; }}
/>

<style lang="scss">
	.icon {
		margin-right: 10px;
	}

	.grid-container {
		left: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		grid-auto-rows: minmax(100px, auto);
	}

	.center {
		grid-column: 2 / 4; /* Updated grid-column value */
		grid-row: 1 / 5; /* Updated grid-row value */
	}

	.side-bar {
		grid-column: 1; /* No changes needed */
		grid-row: 1 / 5; /* Updated grid-row value */
	}
</style>
