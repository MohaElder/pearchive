<script>
	import '../scss/style.scss';
</script>

<body data-bs-theme="dark">
	<div class="container">
		<h1 class="title">Pearchive</h1>
		<slot />
	</div>
</body>

<style>
	.title {
		margin-bottom: 50px;
	}

	.container {
		padding: 3%;
	}
</style>