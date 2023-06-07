<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fileStructure } from '../../libs/store/FileStructure';
	import { MediaType, PearFile } from '../../libs/infrastructure/PearFile';
	import { PearFolder } from '../../libs/infrastructure/PearFolder';

	const fileUrl = $page.url.searchParams.get('id');
	let file: PearFile | null = null;

	onMount(() => {
		let TestFileA = new PearFile(
			{ src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F2559505.jpg&f=1&nofb=1&ipt=f0443e3af4e43e3257dc42f0a5c2586c8656abad2035d12f6661db6a6a4e214b&ipo=images', type: MediaType.Image },
			'2022圣诞',
			'Anzhi',
			'Yasushi',
			'在Providence Downtown的小古着店找到了一张还蛮有圣诞氛围的明信片，想到以前总会在上海街边各种各样的店前驻足，很美好也很想念',
			'bi bi-file-earmark-image-fill',
			false,
			'aaaa'
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

		//fileStructure.set(testFolder);
		
		fileStructure.subscribe((value) => {
			console.log(value)
			if (value) {
				let tempFile = value.files.find((f) => f.id === fileUrl);
				if (tempFile != null && !(tempFile instanceof PearFolder)) {
					file = tempFile;
				}
			}
		});
	});
</script>

<div class="file-container">
	<div class="child1">
		<img
			class="file-image"
			src={file?.media.src}
			alt=""
		/>
		<h2>{file?.name}</h2>
		<p class="name"><span>FROM: {file?.sender}</span><br /><span>TO: {file?.receipient}</span></p>
		<div class="buttons">
			<button type="button" class="btn btn-outline-primary"
				><i class="bi bi-share" style="padding-right: 15px;" />SHARE</button
			>
			<div class="separator">
				<button type="button" class="btn btn-outline-secondary"><i class="bi bi-pencil" /></button>
				<button type="button" class="btn btn-outline-secondary"><i class="bi bi-trash3" /></button>
			</div>
		</div>
	</div>
	<div class="child2">
		<p class="text">
			<span class="first-word">{file?.description.charAt(0)}</span>{file?.description.substring(1)}
		</p>
	</div>
</div>

<style scoped>
	.file-container {
		display: flex;
		flex-basis: 2%;
		padding-left: 2%;
		padding-right: 2%;
		padding-top: 5%;
	}

	.file-image {
		width: 45vw;
		margin-bottom: 20px;
	}

	.first-word {
		font-size: 150%;
	}
	.child2 {
		padding-left: 2%;
	}

	.name {
		color: white;
	}

	.text {
		color: white;
	}

	.separator {
		padding-left: 20px;
	}

	.buttons {
		display: flex;
		padding-top: 8%;
	}
</style>
