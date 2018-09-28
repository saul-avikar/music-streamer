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
	export default {
		data() {
			return {
				height: 0,
				uploadedFiles: []
			};
		},

		methods: {
			reset() {
				// reset form to initial state
				this.uploadedFiles = [];
			},

			filesChange(fileList) {
				if (!fileList.length) return;
				let newFilesArray = Object.keys(fileList).map((key) => fileList[key]);

				// Check for duplicates
				if (this.uploadedFiles.length) {
					newFilesArray = newFilesArray.filter(file => {
						let hasValue = false;

						this.uploadedFiles.forEach((value) => {
							if (!hasValue) {
								hasValue = value.name === file.name;
							}
						});

						return !hasValue;
					});
				}

				this.uploadedFiles = [...this.uploadedFiles, ...newFilesArray];

				this.$emit("statusChange", this.uploadedFiles);
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
