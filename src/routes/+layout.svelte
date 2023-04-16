<script>
	import '../scss/style.scss';
</script>

<body data-bs-theme="dark">
	<div class="container">
		<slot />
	</div>
</body>

<style scoped>
	.container {
		padding: 2%;
	}
</style>