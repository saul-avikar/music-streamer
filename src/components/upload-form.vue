<template>
	<v-form class="box" method="post" action="/upload" enctype="multipart/form-data">
		<br /><br /><FileUploads @statusChange="statusChange" /><br /><br />
		<!-- INITIAL -->
		<div v-if="status === 0">
			<h2>INITIAL</h2>
		</div>
		<!-- SAVING -->
		<div v-if="status === 1">
			<h2>SAVING</h2>
		</div>
		<!-- SUCCESS -->
		<div v-if="status === 2">
			<h2>Uploaded {{ fileCount }} file(s) successfully.</h2>
		</div>
		<!-- FAILED -->
		<div v-if="status === 3">
			<h2>Error: {{ uploadData.error }}</h2>
		</div>
		<v-btn @click="submit">Submit</v-btn>
	</v-form>
</template>

<script>
	import FileUploads from "@/components/app-file-upload";

	export default {
		data () {
			return {
				uploadData: null
			};
		},

		computed: {
			fileCount () {
				if (this.uploadData && this.uploadData.files) {
					console.log(this.uploadData.files);
					return this.uploadData.files.length;
				}

				return 0;
			},

			status () {
				if (this.uploadData && this.uploadData.status) {
					return this.uploadData.status;
				}

				return 0;
			}
		},

		methods: {
			statusChange (form) {
				this.uploadData = form;
			},

			submit () {

				const formData = new FormData();

				if (!this.uploadData) return;

				console.log(this.uploadData.files);

				this.uploadData.files.forEach(file => {
					formData.append("files", file);
				});

				let xhr = new XMLHttpRequest();
				xhr.open("POST", "/upload");
				xhr.send(formData);

			}
		},

		components: {
			FileUploads
		}
	};
</script>
