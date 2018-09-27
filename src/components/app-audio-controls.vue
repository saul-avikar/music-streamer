<template>
	<audio :src="'http://localhost:8000/music?id=' + filename + '&type=stream'" controls>
		Your browser does not support the audio element.
	</audio>
</template>

<script>
	export default {
		props: {
			filename: {
				required: true,
				type: String,
				validator: value => {
					return value.length > 0;
				}
			}
		}
	};
</script>

<style scoped>

</style>
