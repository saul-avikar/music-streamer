<template>
	<div>
		{{ name }} {{ size | FormatFileSize }}
	</div>
</template>

<script>
	export default {
		props: {
			name: {
				required: true,
				type: String,
				validator: value => {
					return value.length > 0;
				}
			},

			size: {
				required: true,
				type: Number,
				validator: value => {
					return value > 0;
				}
			}
		}
	};
</script>

<style scoped>

</style>
