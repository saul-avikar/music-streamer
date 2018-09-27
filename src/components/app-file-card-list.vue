<template>
	<v-layout column align-center>
		<FileCard v-for="file in files" :key="file.name" :name="file.name" :size="file.size" />
	</v-layout>
</template>

<script>
	import FileCard from "@/components/app-file-card.vue";

	export default {
		props: {
			files: {
				required: true,
				type: Array,
				validator: value => {
					value.forEach(element => {
						if (!element || !element.name || !element.size) {
							console.error(`Element '${element.name}', at index '${value.indexOf("element")}' is missing its name or size.`, element);
							return false;
						};
					});

					return true;
				}
			}
		},

		components: {
			FileCard
		}
	};
</script>

<style scoped>

</style>
