<script>
	import File from '../../libs/components/File.svelte';
	import { MediaType, PearFile } from '../../libs/infrastructure/PearFile';
</script>

<div class="file-container">
	<h3>Collections</h3>
	<div class="files">
		<File
			file={new PearFile(
				{ src: '', type: MediaType.Image },
				'Test File',
				'Calen',
				'Yasushi',
				'A test file',
				'bi bi-file-earmark'
			)}
		/>
	</div>
</div>

<style scoped>
	.file-container {
		padding: 12% 15% 15% 5%;
	}

    .files{
        margin-top: 2%;
    }
</style>
