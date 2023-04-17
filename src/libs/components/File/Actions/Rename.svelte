<script lang="ts">
	import { PearFile } from '../../../infrastructure/PearFile';
	import type { PearFolder } from '../../../infrastructure/PearFolder';
	import Modal from '../../Modal.svelte';

	export let visible = false;
	export let file: PearFile | PearFolder;

	export let handleSubmit: () => any;
	export let handleCancel: () => any;
</script>

<Modal
	{visible}
	options={{
		title: `Rename ${file instanceof PearFile ? 'file' : 'folder'}`,
		body: '',
		submitText: 'Rename'
	}}
	handleSubmit={() => {
		file.rename(file.name);
		handleSubmit();
	}}
	{handleCancel}
>
	<label for="renameInput" class="form-label"
		>{file instanceof PearFile ? 'File' : 'Folder'} name</label
	>
	<input
		id="renameInput"
		type="text"
		class="form-control"
		aria-describedby="renameHelpBlock"
		bind:value={file.name}
	/>
	<div id="renameHelpBlock" class="aria-only">
		You are renaming the {file instanceof PearFile ? 'file' : 'folder'}'s name, it cannot be empty.
	</div>
</Modal>
