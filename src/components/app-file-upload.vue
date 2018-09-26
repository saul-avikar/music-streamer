<template>
	<v-hover close-delay="50" open-delay="50" class="file-upload-container">
			<v-layout  column align-center
				slot-scope="{ hover }"
				:class="`elevation-${hover ? 4 : 1}`"
				v-ripple
				class="file-upload"
			>
				<input
					type="file"
					@change="filesChange($event.target.files)"
					multiple
					class="file-upload-input"
					:style="'margin-bottom: ' + height + 'px;'"
				/>
				<v-layout column align-center>
					<v-icon x-large>cloud_upload</v-icon>
					<span class="font-weight-thin">Drag and drop files here or click.</span>
				</v-layout>
			</v-layout>
	</v-hover>
</template>

<script>
	const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

	export default {
		data() {
			return {
				height: 0,

				uploadedFiles: [],
				uploadError: null,
				currentStatus: STATUS_INITIAL
			};
		},

		watch: {
			currentStatus (currentStatus) {
				console.log(currentStatus);
				this.$emit("statusChange", {status: currentStatus, files: this.uploadedFiles, error: this.uploadError});
			}
		},

		methods: {
			reset() {
				// reset form to initial state
				this.uploadedFiles = [];
				this.uploadError = null;
				this.currentStatus = STATUS_INITIAL;
			},

			save(formData) {
				// upload data to the server
				this.uploadedFiles = formData.getAll("files");
				this.currentStatus = STATUS_SAVING;

				console.log(formData.getAll("files"));

				this.currentStatus = STATUS_SUCCESS;

				/*
					upload(formData).then(x => {
						this.uploadedFiles = [].concat(x);
						this.currentStatus = STATUS_SUCCESS;
					}).catch(err => {
						this.uploadError = err.response;
						this.currentStatus = STATUS_FAILED;
					});
				*/
			},

			filesChange(fileList) {
				if (!fileList.length) return;

				this.uploadedFiles = Object.keys(fileList).map((key) => fileList[key]);
				this.currentStatus = STATUS_SUCCESS;
			}
		},

		mounted() {
			this.reset();
			this.height = -(this.$el.offsetHeight / 2 + 35);
		}
	};
</script>

<style scoped>
	.file-upload-container {
		height: 100px;
		min-height: 100px;
	}

	.file-upload {
		border: 1px dashed;
		border-radius: 20px;

		cursor: pointer;

		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.file-upload-input {
		opacity: 0;
		width: 100%;
		height: 100%;
		margin-bottom: 0%;
		cursor: pointer;
	}
</style>
