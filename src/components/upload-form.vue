<template>
	<v-form method="post" action="/upload" enctype="multipart/form-data">
		<v-alert
			:value="success"
			type="success"
			transition="scale-transition"
		>
			Success!
		</v-alert>

		<v-alert
			:value="error"
			type="error"
			transition="scale-transition"
		>
			Error: {{ error }}
		</v-alert>
		<br />
		<FileUploads @statusChange="statusChange" /><br />
		<template v-if="files">
			<FileCardList :files="files" @removeFile="removeFile" />
		</template>
		<v-btn @click="submit">Submit</v-btn>
	</v-form>
</template>

<script>
	import FileUploads from "@/components/app-file-upload";
	import FileCardList from "@/components/app-file-card-list";

	export default {
		data () {
			return {
				files: null,
				error: null,
				success: false
			};
		},

		computed: {
			fileCount () {
				if (this.files) {
					return this.files.length;
				}

				return 0;
			}
		},

		methods: {
			reset () {
				this.files = null;
				this.resetAlerts();
			},

			resetAlerts () {
				this.error = null;
				this.success = false;
			},

			statusChange (files) {
				this.files = files;
			},

			submit () {

				const formData = new FormData();

				if (!this.files) return;

				this.resetAlerts();

				this.files.forEach(file => {
					formData.append("files", file);
				});

				fetch("/upload", {
					method: "POST",
					body: formData
				}).then(response => {
					return response.text();
				}).then(html => {
					console.log(html);
					this.success = true;
				}).catch(err => {
					console.error(err);
					this.error = err;
				});

				this.reset();
			},

			removeFile (file) {
				if (this.fileCount) {
					var index = this.files.indexOf(file);

					if (index > -1) {
						this.files.splice(index, 1);
					}
				}
			}
		},

		components: {
			FileUploads,
			FileCardList
		}
	};
</script>
