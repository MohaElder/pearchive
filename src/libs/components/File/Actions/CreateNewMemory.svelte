<script lang="ts">
	import { goto } from '$app/navigation';
	import { send } from 'vite';
	import { createFile, createFolder } from '../../../googleDrive/Auth';
	import Modal from '../../Modal.svelte';
	import Folder from '../Folder.svelte';

	export let visible = false;

	export let handleSubmit: () => any;
	export let handleCancel: () => any;

	enum CreationType {
		MemoryCollection = 1,
		Memory = 2
	}

	let creationType = CreationType.MemoryCollection;
	let name: string;
	let sender: string;
	let receipient: string;

	let files: File[];
</script>

<Modal
	{visible}
	options={{
		title: 'Create new memory',
		body: '',
		submitText: 'Create'
	}}
	handleSubmit={() => {
		if (files == null && name) {
			createFolder(name).then((res) => {
				let folderMetadata = {
					id: res.id,
					name: res.name
				};
				const jsonData = JSON.stringify(folderMetadata, null, 2);
				const blob = new Blob([jsonData], { type: 'application/json' });
				createFile(`${name}.json`, blob).then((res) => {
					handleSubmit();
				});
			});
		} else {
			createFile(name, files[0]).then((res) => {
				if (res.id) {
					let fileMetadata = {
						id: res.id,
						name: res.name
					};
					const jsonData = JSON.stringify(fileMetadata, null, 2);
					const blob = new Blob([jsonData], { type: 'application/json' });
					createFile(`${name}.json`, blob).then((res) => {
						goto(`/file?id=${res.id}`);
					});
				}
			});
		}
	}}
	{handleCancel}
>
	<div class="form-check">
		<input
			checked
			class="form-check-input"
			type="radio"
			name="flexRadioDefault"
			id="flexRadioDefault1"
			bind:group={creationType}
			value={CreationType.MemoryCollection}
		/>
		<label class="form-check-label" for="flexRadioDefault1"> Memory collection </label>
	</div>
	<div class="form-check">
		<input
			class="form-check-input"
			type="radio"
			name="flexRadioDefault"
			id="flexRadioDefault2"
			bind:group={creationType}
			value={CreationType.Memory}
		/>
		<label class="form-check-label" for="flexRadioDefault2"> Memory </label>
	</div>
	{#if creationType == CreationType.MemoryCollection}
		<label for="folderNameInput">Memory collection name</label>
		<input
			id="folderNameInput"
			type="text"
			class="form-control"
			aria-describedby="renameHelpBlock"
			bind:value={name}
		/>
	{:else}
		<label for="fileNameInput">Memory name</label>
		<input
			id="fileNameInput"
			type="text"
			class="form-control"
			aria-describedby="renameHelpBlock"
			bind:value={name}
		/>
		<label for="fileSenderInput">Sent from</label>
		<input
			id="fileSenderInput"
			type="text"
			class="form-control"
			aria-describedby="renameHelpBlock"
			bind:value={sender}
		/>
		<label for="fileReceipientInput">Received by</label>
		<input
			id="fileReceipientInput"
			type="text"
			class="form-control"
			aria-describedby="renameHelpBlock"
			bind:value={receipient}
		/>
		<label for="formFile" class="form-label">Memory</label>
		<input class="form-control" type="file" id="formFile" bind:files />
	{/if}
	<div />
	<div id="renameHelpBlock" class="aria-only">it cannot be empty.</div>
</Modal>
