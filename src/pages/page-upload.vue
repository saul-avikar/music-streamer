<template>
	<v-container>
		<h2 class="display-3 text-xs-center">Upload files</h2>
		<UploadForm />
	</v-container>
</template>

<script>
	import UploadForm from "@/components/upload-form";

	export default {
		components: {
			UploadForm
		}
	};
</script>
