<template>
	<v-form method="post" action="/upload" enctype="multipart/form-data">
		<br /><br /><FileUploads @statusChange="statusChange" /><br /><br />
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
				files: null
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
			statusChange (files) {
				this.files = files;
			},

			submit () {
				const formData = new FormData();

				if (!this.files) return;

				this.files.forEach(file => {
					formData.append("files", file);
				});

				let xhr = new XMLHttpRequest();
				xhr.open("POST", "/upload");
				xhr.send(formData);
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
