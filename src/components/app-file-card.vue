<template>
	<v-card class="file-card">
		<v-card-text class="file-card-text">
			<span class="flex font-weight-bold">{{ name }}</span>
			<span class="flex">{{ size | FormatFileSize }}</span>
			<span class="remove-button">
				<v-btn icon flat color="red">
					<v-icon large>remove_circle</v-icon>
				</v-btn>
			</span>
		</v-card-text>
	</v-card>
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
	.file-card {
		width: 250px;
		margin-bottom: 10px;
	}

	.file-card-text {
		display: flex;
		align-items: center;
	}

	.flex {
		flex: 1;
	}

	.remove-button {
		text-align: right;
	}
</style>
