<script lang="ts">
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
</script>

<div>
	<FileLayout files={testFolder} />
</div>
