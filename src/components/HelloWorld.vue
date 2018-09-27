<template>
	<v-container fluid>
		<v-slide-y-transition mode="out-in">
			<v-layout column align-center>
				<a href="http://localhost:8000/music?id=test.flac" target="_blank"> <button class="btn btn-success"> Download </button></a>
				{{ meta ? meta.artist : "?" }}: {{ meta ? meta.title : "?" }}
				<AudioControls :filename="'test.flac'" />

				<UploadForm />

				<blockquote>
					&#8220;First, solve the problem. Then, write the code.&#8221;
					<footer>
						<small>
							<em>&mdash;John Johnson</em>
						</small>
					</footer>
				</blockquote>
			</v-layout>
		</v-slide-y-transition>
	</v-container>
</template>

<script>
	import UploadForm from "@/components/upload-form";
	import AudioControls from "@/components/app-audio-controls";

	export default {
		data () {
			return {
				meta: null,
				format: null
			};
		},

		created () {
			fetch("http://localhost:8000/music?id=test.flac&type=meta").then(response => {
				return response.json();
			}).then(meta => {
				this.meta = meta.common;
				this.format = meta.format;
			}).catch(err => {
				console.error(err);
			});
		},

		components: {
			UploadForm,
			AudioControls
		}
	};
</script>

<style scoped>
	h1, h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
