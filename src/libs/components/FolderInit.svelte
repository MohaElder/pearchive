<script lang="ts">
	import Modal from './Modal.svelte';
    import { initializePearchiveFolder } from '../googleDrive/Auth';

	export let visible = false;

	export let handleSubmit: (param: any) => any;
	export let handleCancel: () => any;
</script>

<Modal
	{visible}
	options={{
		title: 'Pearchive data not detected, would you like to initialize it?',
		body: 'Upon initialization, a folder named "Pearchive" will be created in your Google Drive.',
		submitText: 'Initialize'
	}}
	handleSubmit={() => {
		initializePearchiveFolder().then(res => {
            handleSubmit(res.id);
        });
	}}
	{handleCancel}
>
</Modal>
